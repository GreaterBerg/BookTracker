
const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default async function fetchFn(url: string) {
  const response = await fetch(url, API_OPTIONS);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}