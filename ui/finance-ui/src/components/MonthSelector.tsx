import { FiChevronLeft, FiChevronRight, FiCalendar } from "react-icons/fi";

type Props = {
  month: string;
  onChange: (month: string) => void;
};

export default function MonthSelector({
  month,
  onChange,
}: Props) {

  const date = new Date(month + "-01");

  const label = date.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  const previousMonth = () => {
    const d = new Date(month + "-01");
    d.setMonth(d.getMonth() - 1);
    onChange(d.toISOString().slice(0, 7));
  };

  const nextMonth = () => {
    const d = new Date(month + "-01");
    d.setMonth(d.getMonth() + 1);
    onChange(d.toISOString().slice(0, 7));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        background: "white",
        padding: "8px 14px",
        borderRadius: 12,
        boxShadow: "0 1px 3px rgba(0,0,0,.15)",
      }}
    >
      <FiCalendar color="#2563eb" />

      <button
        onClick={previousMonth}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <FiChevronLeft />
      </button>

      <span
        style={{
          minWidth: 120,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {label}
      </span>

      <button
        onClick={nextMonth}
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <FiChevronRight />
      </button>
    </div>
  );
}
