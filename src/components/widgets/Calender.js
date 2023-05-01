import { Calendar, ConfigProvider } from "antd";
import uk_UA from "antd/lib/locale/uk_UA";
import dayjs from "dayjs";
import "dayjs/locale/uk"; // import Ukrainian locale data
import dayLocaleData from "dayjs/plugin/localeData";
dayjs.extend(dayLocaleData);
dayjs.locale("uk");

const Calender = ({ onDaySelect }) => {
  const handleDateSelect = (date) => {
    onDaySelect(date);
  };
  const wrapperStyle = {
    width: 300,
    border: "1px solid #e8e8e8",
    borderRadius: "6px",
  };
  return (
    <div style={wrapperStyle}>
      <ConfigProvider locale={uk_UA}>
        <Calendar fullscreen={false} onSelect={handleDateSelect} />
      </ConfigProvider>
    </div>
  );
};

export default Calender;
