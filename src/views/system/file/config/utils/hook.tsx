import editForm from "../form/form.vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import type { FormItemProps } from "./types";
import type { PaginationProps } from "@pureadmin/table";
import { deviceDetection } from "@pureadmin/utils";
import { message as toast } from "@/utils/message";
import { showDialog } from "@/components/HalcyonDialog";
import {
  addConfig,
  listConfig,
  updateConfig,
  deleteConfig,
  updateConfigMaster,
  getConfig
} from "@/api/file/config";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useFileConfig() {
  const searchValue = ref("");
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 12,
    currentPage: 1,
    background: true
  });
  const form = reactive({
    name: "",
    size: pagination.pageSize,
    current: pagination.currentPage
  });
  function handleDeleteItem(row) {
    showDialog("警告", {
      contentRenderer: () => (
        <p style="text-align: center;margin-bottom:20px">
          确认要设置该配置：
          <strong style="color:var(--el-color-danger);margin:0 5px">
            {row.name}
          </strong>
          为主配置吗?
        </p>
      ),
      beforeSure: async done => {
        const res = await deleteConfig({ id: row.id });
        if (res.code == "H200") {
          toast(`已将"${row.name}设为主配置`, {
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
  async function handleManageItem(row) {
    console.log("handleManageItem", row);
    const res = await getConfig({ id: row.id });
    if (res.code == "H200") {
      openDialog("修改", res.data);
    } else {
      toast(res.message, { type: "error" });
    }
  }
  function handleSetMaster(row) {
    showDialog("提示", {
      contentRenderer: () => (
        <p style="text-align: center;margin-bottom:20px">
          确认要设置该配置：
          <strong style="color:var(--el-color-warning);margin:0 5px">
            {row.name}
          </strong>
          为主配置吗?
        </p>
      ),
      beforeSure: async done => {
        const res = await updateConfigMaster({ id: row.id });
        if (res.code == "H200") {
          toast(`已将"${row.name}设为主配置`, {
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
    const { data } = await listConfig(toRaw(form));
    dataList.value = data.records;
    pagination.total = data.total;
    pagination.pageSize = data.size;
    pagination.currentPage = data.current;
    loading.value = false;
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}配置`,
      props: {
        formInline: {
          id: row?.id ?? null,
          name: row?.name ?? "",
          storage: row?.storage ?? null,
          master: row?.master ?? false,
          config: row?.config ?? {
            basePath: "",
            host: "",
            port: null,
            username: "",
            password: "",
            mode: "",
            endpoint: "",
            bucket: "",
            accessKey: "",
            accessSecret: "",
            domain: ""
          },
          remark: row?.remark ?? ""
        }
      },
      width: "40%",
      top: "5vh",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了配置名称为${curData.name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              const res = await addConfig(curData);
              if (res.code == "H200") {
                chores();
              } else {
                toast(res.message, { type: "error" });
              }
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const res = await updateConfig(curData);
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

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    pagination,
    searchValue,
    dataList,
    onSearch,
    resetForm,
    openDialog,
    handleManageItem,
    handleDeleteItem,
    handleSetMaster,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
