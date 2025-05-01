import { ref, type Ref, watch, type MaybeRefOrGetter, toValue } from "vue";
import { graffitiObjectToFile } from "../converters";
import type { GraffitiFileObject } from "../schemas";

/**
 * A Vue.js [composable](https://vuejs.org/guide/reusability/composables.html)
 * that asynchronously converts a reactive Graffiti object
 * into a [File](https://developer.mozilla.org/en-US/docs/Web/API/File).
 *
 * If the object is loading (`undefined`), or not found (`null`),
 * the `file` and `fileDataUrl` properties will be `undefined` or `null`.
 */
export function useGraffitiObjectToFile(
  object: MaybeRefOrGetter<GraffitiFileObject | undefined | null>,
) {
  const file: Ref<File | undefined | null> = ref();
  const fileDataUrl: Ref<string | undefined | null> = ref();
  watch(
    () => toValue(object),
    async (object) => {
      const outputs = object ? await graffitiObjectToFile(object) : object;
      file.value = outputs ? outputs.file : outputs;
      fileDataUrl.value = outputs ? outputs.fileDataUrl : outputs;
    },
    {
      immediate: true,
    },
  );

  return {
    /**
     * The [File](https://developer.mozilla.org/en-US/docs/Web/API/File)
     * extracted from the Graffiti object.
     */
    file,
    /**
     * The file data as a [data URL](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/data)
     * which can be used as a `src` for an `<img>` tag or other media elements.
     */
    fileDataUrl,
  };
}
