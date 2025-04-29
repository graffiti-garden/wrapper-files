import type {
  JSONSchema,
  GraffitiObject,
  GraffitiPutObject,
} from "@graffiti-garden/api";

/**
 * A [JSON Schema](https://json-schema.org/) to represent a
 * [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html)
 * that contains an encoded [File](https://developer.mozilla.org/en-US/docs/Web/API/File).
 */
export const graffitiFileSchema = {
  properties: {
    value: {
      required: ["data", "mimetype", "name"],
      properties: {
        name: { type: "string" },
        mimetype: { type: "string" },
        data: { type: "string" },
      },
    },
  },
} as const satisfies JSONSchema;

/**
 * A [GraffitiPutObject](https://api.graffiti.garden/types/GraffitiPutObject.html)
 * satisfying the {@link graffitiFileSchema}.
 */
export type GraffitiFilePutObject = GraffitiPutObject<
  typeof graffitiFileSchema
>;
/**
 * A [Graffiti object](https://api.graffiti.garden/interfaces/GraffitiObjectBase.html)
 * satisfying the {@link graffitiFileSchema}.
 */
export type GraffitiFileObject = GraffitiObject<typeof graffitiFileSchema>;
