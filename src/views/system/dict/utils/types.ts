// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 字典名称 */
  name: string;
  /** 字典编码 */
  code: string;
  /** 状态 */
  status: number;
  /** 备注 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

export type { FormItemProps, FormProps };
