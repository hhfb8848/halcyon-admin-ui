import dayjs from "dayjs";
import editForm from "../form/form.vue";
import { message as toast } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { showDialog } from "@/components/HalcyonDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";

import { reactive, ref, onMounted, h, toRaw, computed } from "vue";
import {
  getNoticeList,
  getNoticeDetail,
  deleteNotice,
  addNotice,
  updateNotice
} from "@/api/notice/notice";
import { listAllSimpleRole } from "@/api/role/role";
export function useSystemNotice() {
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const form = reactive({
    title: "",
    type: "",
    status: "",
    size: pagination.pageSize,
    current: pagination.currentPage
  });
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const isShow = ref(false);
  const loading = ref(true);
  const isLinkage = ref(false);
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });

  const allRoles = ref([]);

  const columns: TableColumnList = [
    {
      label: "标题",
      prop: "title",
      width: 150,
      fixed: "left"
    },
    {
      label: "类型",
      prop: "type",
      width: 100,
      fixed: "left"
    },
    {
      label: "内容",
      prop: "content",
      width: 170
    },
    {
      label: "手机号",
      prop: "phone",
      width: 160
    },

    {
      label: "性别",
      prop: "gender",
      width: 80,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={
            row.gender === 0 ? "info" : row.gender === 1 ? "primary" : "danger"
          }
          effect="plain"
        >
          {row.gender === 0 ? "未知" : row.gender === 1 ? "男" : "女"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      prop: "createTime",
      minWidth: 110,
      width: 120,
      showOverflowTooltip: true,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "简介",
      prop: "remark",
      minWidth: 160
    },

    {
      label: "操作",
      fixed: "right",
      width: 220,
      slot: "operation"
    }
  ];
  function handleDelete(row) {
    showDialog("警告", {
      contentRenderer: () => (
        <p style="text-align: center;margin-bottom:20px">
          确认要删除
          <strong style="color:var(--el-color-danger);margin:0 5px">
            {row.username}
          </strong>
          吗?
        </p>
      ),
      beforeSure: async done => {
        const res = await deleteNotice([row.id]);
        if (res.code == "H200") {
          toast(`已删除"${row.userName}`, {
            type: "success"
          });
        } else {
          toast(res.message, { type: "error" });
        }
        done(); // 关闭弹框
        onSearch();
      }
    });
  }

  function handleSizeChange(val: number) {
    pagination.currentPage = 1;
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    form.current = pagination.currentPage;
    form.size = pagination.pageSize;
    const { code, data, message } = await getNoticeList(toRaw(form));
    if (code != "H200") {
      toast(message, { type: "error" });
    } else {
      dataList.value = data.records;
      pagination.total = data.total;
      pagination.pageSize = data.size;
      pagination.currentPage = data.current;
    }
    loading.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    const rowDetail = ref({} as FormItemProps);
    addDialog({
      title: `${title}通知公告`,
      props: {
        formInline: {
          id: row?.id ?? null,
          title: row?.title ?? "",
          content: row?.content ?? "",
          status: row?.status ?? 0,
          type: row?.type ?? 0,
          allRoles: allRoles.value,
          editorHeight: "300px"
        }
      },
      width: "60%",
      top: "3vh",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      fullscreenCallBack: ({ options }) =>
        options.fullscreen
          ? (options.props.formInline.editorHeight = "400px")
          : (options.props.formInline.editorHeight = "300px"),
      contentRenderer: () => h(editForm, { ref: formRef }),
      open: async ({ options }) => {
        if (title !== "新增") {
          const res = await getNoticeDetail(row.id);
          if (res.code == "H200") {
            rowDetail.value = res.data;
          } else {
            toast(res.message, { type: "error" });
          }
          // 手动更新
          options.props.formInline.content = rowDetail.value.content;
        }
      },
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          toast(`您${title}了通知公告为${curData.title}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              const res = await addNotice(curData);
              if (res.code == "H200") {
                chores();
              } else {
                toast(res.message, { type: "error" });
              }
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const res = await updateNotice(curData);
              if (res.code == "H200") {
                chores();
              } else {
                toast(res.message, { type: "error" });
              }
            }
          }
        });
      }
    });
  }
  async function getRoleList() {
    const res = await listAllSimpleRole();
    if (res.code == "H200") {
      allRoles.value = res.data;
    }
  }
  onMounted(() => {
    onSearch();
    getRoleList();
  });

  return {
    form,
    isShow,
    curRow,
    loading,
    columns,
    dataList,
    isLinkage,
    pagination,
    buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
