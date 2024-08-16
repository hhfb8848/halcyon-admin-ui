export interface ListItem {
  title: string;
  createTime: string;
  type: number;
  id: number;
  content: string;
  creator: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
}

export const noticesType: TabItem[] = [
  {
    key: "1",
    name: "通知",
    list: []
  },
  {
    key: "2",
    name: "公告",
    list: []
  }
];
