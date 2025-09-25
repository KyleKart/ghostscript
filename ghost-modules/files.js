// files.js
export function download(data, filename = "download.txt") {
  let url;

  if (typeof data === "string" && (data.startsWith("http://") || data.startsWith("https://"))) {
    url = data;
  } else if (typeof data === "string") {
    const blob = new Blob([data], { type: "text/plain" });
    url = URL.createObjectURL(blob);
  } else if (data instanceof Blob) {
    url = URL.createObjectURL(data);
  } else if (typeof data === "object") {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    url = URL.createObjectURL(blob);
  } else {
    throw new Error("Unsupported data type for download()");
  }

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (!data.startsWith?.("http")) {
    URL.revokeObjectURL(url);
  }
}