import type { GraffitiFileObject, GraffitiFilePutObject } from "./schemas";

/**
 * Converts a [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
 * to a [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html)
 * that can be [put](https://api.graffiti.garden/classes/Graffiti.html#put)
 * like a normal Graffiti object.
 */
export async function fileToGraffitiObject(
  /**
   * The [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
   * to be converted to a Graffiti object. It must be less than 4MB in size.
   *
   * This can be a file from an [HTML file input](https://developer.mozilla.org/en-US/docs/Web/API/File).
   */
  file: File,
) {
  // Reject if the file is bigger than 4MB
  if (file.size > 4 * 1024 * 1024) {
    throw new Error("File is too large. Please make sure it is less than 4MB.");
  }

  return new Promise<GraffitiFilePutObject>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Expected a string"));
      } else {
        resolve({
          value: {
            data: reader.result,
            name: file.name,
            mimetype: file.type,
          },
          channels: [],
        });
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Converts a [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html)
 * containing a [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
 * encoded by {@link fileToGraffitiObject} back to a File.
 */
export async function graffitiObjectToFile(object: GraffitiFileObject) {
  const base64 = object.value;
  const response = await fetch(base64.data);
  const blob = await response.blob();
  const file = new File([blob], base64.name, { type: base64.mimetype });
  const fileDataUrl = URL.createObjectURL(file);
  return {
    /**
     * The [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
     * extracted from the Graffiti object.
     */
    file,
    /**
     * The file as a [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data)
     * which can be used as a `src` for an `<img>` tag or other media elements.
     */
    fileDataUrl,
  };
}
