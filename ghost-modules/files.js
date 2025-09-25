// files.js
export function download(URL, filename = null) {
  const link = document.createElement("a");
  link.href = URL;

  if (!filename) {
    filename = URL.split("/").pop() || "download";
  }
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}