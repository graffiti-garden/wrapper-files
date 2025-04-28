import type { App, Plugin } from "vue";
import type { GraffitiSession } from "@graffiti-garden/api";
import { fileToBase64 } from "./utils";
import { fileSchema } from "./schemas";
import GetFile from "./GetFile.vue";
import { useGraffiti } from "@graffiti-garden/wrapper-vue";

/**
 * Uploads a [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
 * as a [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html).
 *
 * Use in conjuction with {@link useGraffitiGetFile} or
 * {@link GraffitiGetFile} to retrieve files that have been uploaded.
 *
 * @returns A [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html),
 * similar to the one returned by [put](https://api.graffiti.garden/classes/Graffiti.html#put).
 * Share its `url` to link to the file.
 */
export async function graffitiUploadFile(
  /**
   * The [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
   * to upload. It must be less than 4MB in size.
   */
  file: File,
  /**
   * The [session](https://api.graffiti.garden/interfaces/GraffitiSession.html)
   * received from [logging in](https://api.graffiti.garden/classes/Graffiti.html#login).
   * Likely from [useGraffitiSession](https://vue.graffiti.garden/functions/useGraffitiSession.html)
   * or [$graffitiSession](https://vue.graffiti.garden/interfaces/ComponentCustomProperties.html#graffitisession).
   */
  session: GraffitiSession,
  /**
   * Optional Graffiti object properties that can be specified
   * when uploading the file.
   */
  objectProperties?: {
    /**
     * The [channels](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html#channels)
     * the object is posted to. By default, the object
     * is not posted to any channels, meaning that the object
     * can only be accessed by its URL.
     */
    channels?: string[];
    /**
     * The actors [allowed](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html#allowed)
     * to access the object.
     * As with [put](https://api.graffiti.garden/classes/Graffiti.html#put),
     * the allowed list is `undefined` by default, making it accessible
     * to anyone with the URL or one of its channels.
     */
    allowed?: string[];
    /**
     * The URL the object should be uploaded to.
     * As with [put](https://api.graffiti.garden/classes/Graffiti.html#put),
     * if no URL is specified, a random one will be generated.
     * When a URL is specified, it will replace
     * the object at that URL.
     */
    url?: string;
  },
) {
  const putted = await useGraffiti().put<typeof fileSchema>(
    {
      value: await fileToBase64(file),
      channels: objectProperties?.channels ?? [],
      allowed: objectProperties?.allowed ?? undefined,
      url: objectProperties?.url ?? undefined,
    },
    session,
  );
  return putted;
}

declare module "vue" {
  export interface ComponentCustomProperties {
    /**
     * See {@link graffitiUploadFile}.
     */
    $graffitiUploadFile: typeof graffitiUploadFile;
  }

  export interface GlobalComponents {
    GraffitiGetFile: typeof GetFile;
  }
}
export type { ComponentCustomProperties } from "vue";

/**
 * A [Vue.js](https://vuejs.org/) plugin
 * for uploading and retrieving [Files](https://developer.mozilla.org/en-US/docs/Web/API/File)
 * as [Graffiti objects](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html).
 * It builds on top of the [Graffiti Vue plugin](https://vue.graffiti.garden/variables/GraffitiPlugin.html)
 *
 * Files can be uploaded with {@link graffitiUploadFile} which is also accessible
 * in templates as `$graffitiUploadFile`.
 * Files can be retrieved with the [composable](https://vuejs.org/guide/reusability/composables.html)
 * {@link useGraffitiGetFile} or the [renderless component](https://vuejs.org/guide/components/slots#renderless-components)
 * {@link GraffitiGetFile}.
 *
 * [See a running example](../example).
 */
export const GraffitiFilePlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$graffitiUploadFile = graffitiUploadFile;
    app.component("GraffitiGetFile", GetFile);
  },
};

/**
 * A [renderless component](https://vuejs.org/guide/components/slots#renderless-components)
 * version of {@link useGraffitiGetFile}.
 * The props and slots are identitcal to the arguments and return values
 * of {@link useGraffitiGetFile}.
 */
export const GraffitiGetFile = GetFile;
export { useGraffitiGetFile } from "./composables";
