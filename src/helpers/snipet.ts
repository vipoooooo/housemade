import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const djs = dayjs;

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const timeRelative = (date: Date) => {
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const diff = +new Date() - +date;
  const x = formatter.format(-diff / (1000 * 60 * 60 * 24), "days");
  return x;
};
