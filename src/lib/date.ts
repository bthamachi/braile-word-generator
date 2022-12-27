import { format } from "date-fns";
import { Metadata } from "../types/Post";

export const formatDateFromMetadata = (meta: Metadata) => {
  return format(new Date(meta.date as Date), "MMMM d, yyyy ");
};
