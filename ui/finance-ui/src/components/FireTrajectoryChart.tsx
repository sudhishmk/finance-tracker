import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
  } from "recharts";
  
  type TrajectoryPoint = {
    year: number;
    corpus: number;
  };

  export default function FireTrajectoryChart({
    data,
  }: {
    data: TrajectoryPoint[];
  }) {
    const formatted = data.map((value, index) => ({
      year: index,
      corpus: value,
    }));
  
    return (
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.06)",
        }}
      >
        <h3>Growth Trajectory</h3>
  
        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <LineChart data={formatted}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="corpus"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
  