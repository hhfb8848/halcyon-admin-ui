interface FormItemProps {
  /** 菜单类型（0代表目录、1代表菜单、2代表iframe、3代表外链、4代表按钮）*/
  type: number;
  higherMenuOptions: Record<string, unknown>[];
  parentId: number;
  title: string;
  name: string;
  path: string;
  component: string;
  orderNum: number;
  redirect: string;
  icon: string;
  extraIcon: string;
  enterTransition: string;
  leaveTransition: string;
  activePath: string;
  auths: string;
  frameSrc: string;
  frameLoading: number;
  keepAlive: number;
  hiddenTag: boolean;
  fixedTag: boolean;
  visible: number;
  showParent: boolean;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
