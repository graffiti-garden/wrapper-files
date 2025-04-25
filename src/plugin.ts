import type { App, Plugin } from "vue";
import type { Graffiti, GraffitiSession } from "@graffiti-garden/api";
import { fileToBase64 } from "./utils";
import { fileSchema } from "./schemas";
import GetFile from "./GetFile.vue";

export async function graffitiUploadFile(
  graffiti: Graffiti,
  file: File,
  session: GraffitiSession,
) {
  const putted = await graffiti.put<typeof fileSchema>(
    {
      value: await fileToBase64(file),
      channels: [],
    },
    session,
  );
  return putted.url;
}

export const GraffitiFilePlugin: Plugin = {
  install(app: App) {
    console.log("installing!!");
    app.component("GraffitiGetFile", GetFile);
    app.config.globalProperties.$graffitiUploadFile = graffitiUploadFile.bind(
      null,
      app.config.globalProperties.$graffiti,
    );
  },
};

export { useGraffitiGetFile } from "./composables";
export const GraffitiGetFile = GetFile;
