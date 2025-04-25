import type { GraffitiFileObject } from "./schemas";

export async function fileToBase64(file: File) {
  // Reject if the file is bigger than 4MB
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("File is too large. Please make sure it is less than 4MB.");
  }

  return new Promise<GraffitiFileObject["value"]>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Expected a string"));
      } else {
        resolve({
          data: reader.result,
          name: file.name,
          mimetype: file.type,
        });
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

export async function fileFromBase64(base64: GraffitiFileObject["value"]) {
  const response = await fetch(base64.data);
  const blob = await response.blob();
  return new File([blob], base64.name, { type: base64.mimetype });
}
