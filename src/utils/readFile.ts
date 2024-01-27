export function readFile(
  read: (reader: FileReader) => void
): Promise<FileReader["result"] | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => resolve(e.target?.result));
    reader.addEventListener("error", reject);
    read(reader);
  });
}
