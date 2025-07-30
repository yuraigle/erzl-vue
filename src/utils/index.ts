export const compareByStr = (a: string, b: string) => {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  }
  return 0
}

export const ucFirst = (str?: string): string => {
  if (typeof str !== 'string' || str.length === 0) {
    return ''
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const formatDate = (ts: number | null): string => {
  if (!ts) return '';
  return new Date(ts).toLocaleDateString('ru-RU');
}

export const formatDateYmd = (ts: number | null): string => {
  if (!ts) return '';
  return formatDate(ts).replace(/^(\d{2})\.(\d{2})\.(\d{4})/, "$3-$2-$1");
}

export const formatDateTime = (ts: number | null): string => {
  if (!ts) return '';
  return Intl.DateTimeFormat("ru-RU", { dateStyle: "short", timeStyle: "long" }).format(new Date(ts));
}
