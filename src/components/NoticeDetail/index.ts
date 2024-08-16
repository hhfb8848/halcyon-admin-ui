import type { DialogOptions } from "@/components/ReDialog/type";
import { addDialog } from "@/components/ReDialog";
import { h, ref } from "vue";
import dayjs from "dayjs";
import { message as toast } from "@/utils/message";
import { getNoticeDetail } from "@/api/notice/notice";
import NoticeContent from "./Content.vue"; // Adjust the import path as necessary
import { deviceDetection } from "@pureadmin/utils";
export function openDetail(notice: any, options: DialogOptions) {
  const metadataItems = [
    h(
      "span",
      { style: { color: "var(--el-color-primary)" } },
      `创建人: ${notice.creator}`
    ),
    h(
      "span",
      { style: { color: "var(--el-color-primary)" } },
      `创建时间: ${dayjs(notice.createTime).format("YYYY-MM-DD HH:mm:ss")}`
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
        `修改时间: ${dayjs(notice.updateTime).format("YYYY-MM-DD HH:mm:ss")}`
      )
  ].filter(Boolean);
  console.log("notice", notice);
  const detail = ref(notice || {});
  addDialog({
    width: "65%",
    center: true,
    top: "3vh",
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
    headerRenderer({ titleId }) {
      return h(
        "h3",
        {
          id: titleId,
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }
        },
        [h("span", { style: { marginRight: "10px" } }, `fdsfaf`)]
      );
    },
    contentRenderer({ options, index }) {
      return h(
        "div",
        {
          // style: {
          //   maxHeight: "80vh", // Limit the height of the content area
          //   overflowY: "auto" // Add vertical scrollbar if content exceeds max height
          // }
        },
        [
          h(
            "div",
            {
              style: {
                marginBottom: "20px",
                borderBottom: "1px solid #e0e0e0",
                paddingBottom: "10px",
                display: "flex",
                justifyContent:
                  metadataItems.length > 2 ? "space-between" : "space-around",
                gap: "10px",
                flexWrap: "wrap"
              }
            },
            metadataItems
          ),
          h(NoticeContent, { content: detail.value.content })
        ]
      );
    },

    ...options // 其他配置选项
  });
}
