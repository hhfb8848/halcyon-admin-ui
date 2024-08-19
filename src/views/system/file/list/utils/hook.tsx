import dayjs from "dayjs";
import editForm from "../form/form.vue";
import { message as toast } from "@/utils/message";
import { addDialog, closeDialog } from "@/components/ReDialog";
import { showDialog } from "@/components/HalcyonDialog";

import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection, formatBytes } from "@pureadmin/utils";
import { reactive, ref, onMounted, h, toRaw } from "vue";
import { deleteFile, listFile } from "@/api/system/file/file";
import type { FormItemProps } from "./types";
export function useFileList() {
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const queryForm = reactive({
    type: "",
    uploadTimeArr: null,
    size: pagination.pageSize,
    current: pagination.currentPage
  });
  const isShow = ref(false);
  const curRow = ref();
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "文件名",
      prop: "name",
      width: 200,
      fixed: "left",
      showOverflowTooltip: true
    },
    {
      label: "文件内容",
      prop: "url",
      cellRenderer: ({ row }) => (
        <>
          {row.type.includes("image") && (
            <el-image
              lazy
              src={row.url}
              style="width: 100px; height: 100px"
              preview-src-list={[row.url]}
              preview-teleported
              fit="cover"
            />
          )}
          {row.type.includes("video") && (
            <video width="100" height="100" controls>
              <source src={row.url} type="video/mp4" />
            </video>
          )}
          {row.type.includes("pdf") && (
            <el-link
              type="primary"
              href={row.url}
              underline={false}
              target="_blank"
            >
              预览
            </el-link>
          )}
          {!row.type.includes("image") &&
            !row.type.includes("pdf") &&
            !row.type.includes("video") && (
              <el-link
                type="primary"
                download
                href={row.url}
                underline={false}
                target="_blank"
              >
                下载
              </el-link>
            )}
        </>
      )
    },
    {
      label: "文件URL",
      prop: "url",
      minWidth: 300,
      showOverflowTooltip: true,
      cellRenderer: ({ row }) => (
        <el-text type="success" v-copy:click={row.url}>
          {row.url}
        </el-text>
      )
    },
    {
      label: "文件路径",
      prop: "path",
      width: 160,
      showOverflowTooltip: true
    },
    {
      label: "文件类型",
      prop: "type",
      width: 150,
      showOverflowTooltip: true
    },

    {
      label: "文件大小",
      prop: "size",
      width: 100,
      showOverflowTooltip: true,
      cellRenderer: ({ row }) => (
        <el-text type="success">{formatBytes(row.size)}</el-text>
      )
    },
    {
      label: "创建时间",
      prop: "createTime",
      width: 160,
      showOverflowTooltip: true,
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },

    {
      label: "操作",
      fixed: "right",
      width: 100,
      slot: "operation"
    }
  ];

  function handleDelete(row) {
    showDialog("警告", {
      contentRenderer: () => (
        <p style="text-align: center;margin-bottom:20px">
          确认要删除
          <strong style="color:var(--el-color-danger);margin:0 5px">
            {row.name}
          </strong>
          吗?
        </p>
      ),
      beforeSure: async done => {
        const res = await deleteFile(row.id);
        if (res.code == "H200") {
          toast(`已删除"${row.name}`, {
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
    queryForm.current = pagination.currentPage;
    queryForm.size = pagination.pageSize;
    if (
      queryForm.uploadTimeArr !== null &&
      queryForm.uploadTimeArr.length == 2
    ) {
      queryForm.uploadTimeArr[0] = dayjs(queryForm.uploadTimeArr[0]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      queryForm.uploadTimeArr[1] = dayjs(queryForm.uploadTimeArr[1]).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
    const { code, data, message } = await listFile(toRaw(queryForm));
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

  /** 上传 */
  function handleUpload() {
    addDialog({
      title: `上传文件`,
      props: {
        formInline: {
          fileList: []
        }
      },
      width: "40%",
      top: "5vh",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: ({ options, index }) =>
        h(editForm, {
          ref: formRef,
          onUploadResult: isSuccess => {
            console.log("options", options, index);
            if (isSuccess) {
              closeDialog(options, index);
              onSearch();
            } else {
              options.footerButtons.forEach(button => {
                button.loading = false;
              });
            }
          }
        }),
      footerButtons: [
        {
          label: "取消",
          text: true,
          bg: true,
          btnClick: ({ dialog: { options, index } }) => {
            closeDialog(options, index);
          }
        },
        {
          label: "确定",
          text: true,
          bg: true,
          type: "primary",
          btnClick: ({ dialog: { options }, button }) => {
            const FormRef = formRef.value.getRef();
            const curData = options.props.formInline as FormItemProps;
            if (curData.fileList.length == 0) {
              toast(`请选择文件`, {
                type: "error"
              });
              return;
            }
            button.btn.loading = true;

            FormRef.submit();
          }
        }
      ]
    });
  }

  onMounted(() => {
    onSearch();
  });

  return {
    isShow,
    queryForm,
    curRow,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleUpload
  };
}
