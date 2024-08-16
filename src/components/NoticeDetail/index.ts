import type { DialogOptions } from "@/components/ReDialog/type";
import { addDialog } from "@/components/ReDialog";
import { h, ref } from "vue";
import dayjs from "dayjs";
import { message as toast } from "@/utils/message";
import { getNoticeDetail } from "@/api/notice/notice";
import NoticeContent from "./Content.vue"; // Adjust the import path as necessary
import { deviceDetection } from "@pureadmin/utils";
import { ElButton } from "element-plus";

export function openDetail(notice: any, options: DialogOptions) {
  const metadataItems = [
    h(
      "span",
      { style: { color: "var(--el-color-primary)" } },
      `发布人: ${notice.creator}`
    ),
    h(
      "span",
      { style: { color: "var(--el-color-primary)" } },
      `发布于: ${dayjs(notice.createTime).format("YYYY-MM-DD HH:mm:ss")}`
    ),
    notice.modifier &&
      h(
        "span",
        { style: { color: "var(--el-color-primary)" } },
        `修改人: ${notice.modifier}`
      ),
    notice.updateTime &&
      h(
        "span",
        { style: { color: "var(--el-color-primary)" } },
        `修改于: ${dayjs(notice.updateTime).format("YYYY-MM-DD HH:mm:ss")}`
      )
  ].filter(Boolean);
  console.log("notice", notice);
  const detail = ref(notice || {});
  const contentHeight = ref("67vh");
  addDialog({
    width: "65%",
    center: true,
    top: "3vh",
    title: detail.value.title,
    closeOnClickModal: true,
    fullscreen: deviceDetection(),
    fullscreenIcon: true,
    open: async ({ options }) => {
      const res = await getNoticeDetail(notice.id);
      if (res.code == "H200") {
        detail.value = res.data;
      } else {
        toast(res.message, { type: "error" });
      }
    },
    contentRenderer({ options, index }) {
      return h(
        "div",
        {
          style: {
            // maxHeight: "75vh", // Limit the height of the content area
            overflowY: "auto" // Add vertical scrollbar if content exceeds max height
          }
        },
        [
          h(
            "div",
            {
              style: {
                marginBottom: "10px",
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "10px",
                padding: "10px",
                display: "flex",
                justifyContent:
                  metadataItems.length > 2 ? "space-between" : "space-around",
                gap: "10px",
                flexWrap: "wrap"
              }
            },
            metadataItems
          ),
          h(NoticeContent, {
            content: detail.value.content,
            contentHeight: contentHeight.value
          })
        ]
      );
    },
    fullscreenCallBack({ options }) {
      console.log("options", options);
      contentHeight.value = options.fullscreen ? "76vh" : "67vh";
    },
    footerRenderer({ options, index }) {
      return h(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "center",
            marginTop: "10px"
          }
        },
        [
          h(
            ElButton,
            {
              type: "success",
              plain: true,
              text: true,
              bg: true,
              onClick: () => {
                toast("设为已读成功", { type: "success" });
              }
            },
            { default: () => "设为已读" }
          )
        ]
      );
    },
    ...options // 其他配置选项
  });
}
