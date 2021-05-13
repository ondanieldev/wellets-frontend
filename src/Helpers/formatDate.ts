import { format } from 'date-fns';

export default function formatDate(date: string | Date): string | Date {
  try {
    const newDate = new Date(date);
    return format(newDate, 'MM/dd/yyyy');
  } catch (err) {
    return date;
  }
}
