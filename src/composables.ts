import type { GraffitiObjectUrl, GraffitiSession } from "@graffiti-garden/api";
import {
  useGraffitiGet,
  useGraffitiSession,
} from "@graffiti-garden/wrapper-vue";
import { ref, type Ref, watch, computed, type MaybeRefOrGetter } from "vue";
import { fileFromBase64 } from "./utils";
import { fileSchema } from "./schemas";

/**
 * A Vue.js [composable](https://vuejs.org/guide/reusability/composables.html)
 * to retrieve a file from a Graffiti object URL.
 */
export function useGraffitiGetFile(
  /**
   * The [Graffiti object URL](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html#url)
   * to fetch. It can be a reactive variable and the output
   * will be updated when the URL changes.
   */
  url: MaybeRefOrGetter<GraffitiObjectUrl | string>,
  /**
   * The [Graffiti session](https://api.graffiti.garden/interfaces/GraffitiSession.html)
   * to use for authentication. Likely from [useGraffitiSession](https://vue.graffiti.garden/functions/useGraffitiSession.html)
   * or [$graffitiSession](https://vue.graffiti.garden/interfaces/ComponentCustomProperties.html#graffitisession).
   */
  session?: MaybeRefOrGetter<GraffitiSession | undefined | null>,
) {
  const { object, poll, isInitialPolling } = useGraffitiGet(
    url,
    fileSchema,
    session,
  );

  const file: Ref<File | undefined | null> = ref();
  watch(object, async (value) => {
    file.value = value ? await fileFromBase64(value.value) : value;
  });

  const fileDataUrl = computed(() => {
    if (!file.value) return file.value;
    return URL.createObjectURL(file.value);
  });

  return {
    /**
     * The [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html)
     * with the encoded file data.
     * When the object is first being fetched, it will be `undefined`,
     * If the object is not found, it will be `null`.
     */
    object,
    /**
     * The decoded file data as a [File](https://developer.mozilla.org/en-US/docs/Web/API/File).
     * When the file is first being fetched, it will be `undefined`,
     * If the file is not found, it will be `null`.
     */
    file,
    /**
     * The file data as a [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data)
     * which can be used as a `src` for an `<img>` tag or other media elements.
     * When the file is first being fetched, it will be `undefined`,
     * If the file is not found, it will be `null`.
     */
    fileDataUrl,
    /**
     * A function to poll for updates to the object.
     */
    poll,
    /**
     * A reactive boolean that indicates if loading is ocurring.
     */
    isInitialPolling,
  };
}
