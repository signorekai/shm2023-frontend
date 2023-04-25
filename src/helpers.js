export const fetchGQL = async (query) => {
  const response = await fetch("https://app.superherome.sg/v2/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query,
    }),
  });
  const result = await response.json();
  return result;
}
