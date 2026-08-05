export function formatDateDDMMYYYY(value?: string | Date | null): string {
  if (!value) return '';
  const date = typeof value === 'string' ? new Date(value) : value;
  if (isNaN(date.getTime())) return String(value);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
