import type { BudgetCategory } from "../../types";

interface Props {
  category: BudgetCategory;

  editing: boolean;

  onChange: (
    id: string,

    field: string,

    value: string | number
  ) => void;
}

export default function CategoryRow({
  category,

  editing,

  onChange,
}: Props) {
  return (
    <div
      style={{
        display: "grid",

        gridTemplateColumns: "30px 1fr 80px",

        alignItems: "center",

        gap: 12,

        padding: "8px 0",

        paddingLeft: 24,
      }}
    >
      <span
        style={{
          color: "#94A3B8",

          fontSize: 14,
        }}
      >
        ↳
      </span>

      {editing ? (
        <input
          value={category.name}
          onChange={(e) =>
            onChange(
              category.id,

              "name",

              e.target.value
            )
          }
          style={{
            padding: 8,

            borderRadius: 8,

            border: "1px solid #CBD5E1",
          }}
        />
      ) : (
        <span
          style={{
            fontSize: 14,
          }}
        >
          {category.name}
        </span>
      )}

      {editing ? (
        <input
          type="number"
          value={category.percentage}
          onChange={(e) =>
            onChange(
              category.id,

              "percentage",

              Number(e.target.value)
            )
          }
          style={{
            width: 70,

            padding: 8,

            borderRadius: 8,

            border: "1px solid #CBD5E1",
          }}
        />
      ) : (
        <div
          style={{
            background: "#F1F5F9",

            borderRadius: 20,

            padding: "4px 10px",

            textAlign: "center",

            fontSize: 13,

            fontWeight: 600,
          }}
        >
          {category.percentage}%
        </div>
      )}
    </div>
  );
}
