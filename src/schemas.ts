import type { JSONSchema, GraffitiObject } from "@graffiti-garden/api";

export const fileSchema = {
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

export type GraffitiFileObject = GraffitiObject<typeof fileSchema>;
