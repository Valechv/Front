export const isEmpty = (v?: string | null) => {
  return typeof v === 'string' ? v?.trim().length === 0 : true
}
