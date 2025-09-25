// csv.js
export function parse(csvText, delimiter = ",") {
  return csvText
    .trim()
    .split("\n")
    .map(row => row.split(delimiter).map(cell => cell.trim()));
}

export function stringify(data, delimiter = ",") {
  return data
    .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(delimiter))
    .join("\n");
}