export default function MetricCard({
    title,
    value,
    subtitle,
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
  }) {
    return (
      <div
        style={{
          flex: 1,
          padding: 20,
          borderRadius: 12,
          background: "white",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <h4 style={{ marginBottom: 8 }}>{title}</h4>
        <div style={{ fontSize: 22, fontWeight: 600 }}>
          {value}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: "#666" }}>
            {subtitle}
          </div>
        )}
      </div>
    );
  }
  