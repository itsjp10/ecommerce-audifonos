export async function tokenizar(card) {
  const res = await fetch("https://sandbox.wompi.co/v1/tokens/cards", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_WOMPI_PUB}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(card),
  });
  const data = await res.json();

  if (!res.ok) {
    console.error("Error Wompi:", data);
    throw new Error(data.error?.message || "Error tokenizando");
  }

  return data;
}
