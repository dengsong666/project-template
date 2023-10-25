export function usePage(getList: Function, initParams: Record<string, any> = {}) {
  const initPage = () => ({ pageNum: 1, pageSize: 10, len: 10 })
  const initResult = () => ({ list: [] as any[], total: 0, more: true, nodata: false, other: {} as any })
  const params = ref(initParams)
  const page = reactive(initPage())
  const result = reactive(initResult())
  const load = async (reset = false) => {
    reset && Object.assign(page, initPage()) && Object.assign(result, initResult())
    if (result.more) {
      const arr = result.list
      const { dataList, pageIndex, pageSize, totalCount, ...otherRes } = await getList({ ...page, ...params.value })
      result.list = [...arr, ...dataList]
      result.total = totalCount
      result.other = otherRes
      result.more = result.list.length < result.total
      result.nodata = !result.list.length
      page.len = pageIndex * pageSize
      page.pageNum = pageIndex + 1
      page.pageSize = pageSize
    }
    return result
  }
  onReachBottom(() => load())
  watch(params, () => load(true), { deep: true })
  return { load, params, result, page }
}