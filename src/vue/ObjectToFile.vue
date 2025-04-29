<script setup lang="ts">
import { useGraffitiObjectToFile } from "./composable";
import type { GraffitiFileObject } from "../schemas";

const props = defineProps<{
    object: GraffitiFileObject | null | undefined;
}>();

const slots = defineSlots<{
    default?(props: {
        file: File | undefined | null;
        fileDataUrl: string | undefined | null;
    }): any;
}>();

const { file, fileDataUrl } = useGraffitiObjectToFile(() => props.object);
</script>

<template>
    <slot :file="file" :fileDataUrl="fileDataUrl"></slot>
</template>
