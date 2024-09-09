import { useDictStoreHook } from "@/store/modules/dict";
import type { dictDataType } from "@/store/modules/dict";
export enum DictCode {
  // ========== IOT 模块 ==========

  // 设备类型
  DEVICE_TYPE = "device_type"
}

/**
 * 获取字典项列表
 * @param dictCode 字典代码
 * @returns 字典项列表
 */
export function getDictDataByCode(
  dictCode: DictCode
): dictDataType[] | undefined {
  const dictStore = useDictStoreHook();
  const dict = dictStore.dictList.find(d => d.dictCode === dictCode);

  if (dict) {
    return dict.dictValue;
  }

  return undefined;
}

/**
 * 获取字典项对应的名称
 * @param dictCode 字典代码
 * @param value 字典项的值
 * @returns 字典项的名称
 */
export function getDictDataName(
  dictCode: DictCode,
  value: any
): string | undefined {
  const items = getDictDataByCode(dictCode);

  if (items) {
    const dictItem = items.find(item => item.value === value);
    return dictItem ? dictItem.name : undefined;
  }

  return undefined;
}

/**
 * 清除字典缓存
 */
export function clearDictCache() {
  const dictStore = useDictStoreHook();
  dictStore.clearDict();
}
