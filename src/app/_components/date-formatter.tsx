import { parseISO, format } from "date-fns";

interface Props extends React.HTMLProps<HTMLTimeElement> {
  dateString: string;
};

const DateFormatter = ({ dateString, className }: Props) => {
  const date = parseISO(dateString);
  return <time dateTime={dateString} className={className}>{format(date, "LLLL	d, yyyy")}</time>;
};

export default DateFormatter;
