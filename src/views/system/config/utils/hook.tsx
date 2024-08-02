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
  getConfig,
  refreshCache
} from "@/api/config/config";
import { reactive, ref, onMounted, h, toRaw } from "vue";
export function useConfig() {
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
    configName: "",
    size: pagination.pageSize,
    current: pagination.currentPage
  });
  function handleDeleteItem(row) {
    showDialog("警告", {
      contentRenderer: () => (
        <p style="text-align: center;margin-bottom:20px">
          确认要将该配置：
          <strong style="color:var(--el-color-danger);margin:0 5px">
            {row.configName}
          </strong>
          删除吗?
        </p>
      ),
      beforeSure: async done => {
        const res = await deleteConfig(row.id);
        if (res.code == "H200") {
          toast(`已将"${row.configName}删除`, {
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
    openDialog("修改", row);
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
    let rowDetail = ref({} as FormItemProps);

    addDialog({
      title: `${title}配置`,
      props: {
        formInline: {
          id: row?.id ?? null,
          configName: row?.configName ?? "",
          configKey: row?.configKey ?? "",
          configValue: row?.configValue ?? "",
          remark: row?.remark ?? ""
        }
      },
      width: "45%",
      top: "5vh",
      draggable: true,
      fullscreen: deviceDetection(),
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      open: async ({ options }) => {
        if (title !== "新增") {
          const res = await getConfig(row.id);
          if (res.code == "H200") {
            rowDetail.value = res.data;
          } else {
            toast(res.message, { type: "error" });
          }
          // 手动更新
          options.props.formInline.configKey = rowDetail.value.configKey;
          options.props.formInline.configValue = rowDetail.value.configValue;
        }
      },
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了配置名称为${curData.configName}的这条数据`, {
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
  async function handleRefreshCache() {
    const res = await refreshCache();
    if (res.code == "H200") {
      toast("缓存刷新成功", { type: "success" });
    } else {
      toast(res.message, { type: "error" });
    }
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
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleRefreshCache
  };
}
