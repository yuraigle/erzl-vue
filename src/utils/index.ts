export const compareByStr = (a: string, b: string) => {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  }
  return 0
}

export const formatDate = (ts: number | null): string => {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('ru-RU');
}
