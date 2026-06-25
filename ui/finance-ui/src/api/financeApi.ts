export async function getMonthlySummary(month: string) {
    const response = await fetch(
      `http://localhost:8080/api/v1/summary?month=${month}`
    );
    return response.json();
  }
  