<script setup lang="ts">
import type { GraffitiObjectUrl, GraffitiSession } from "@graffiti-garden/api";
import { useGraffitiGetFile } from "./composables";
import type { GraffitiFileObject } from "./schemas";

const props = defineProps<{
    url: string | GraffitiObjectUrl;
    session?: GraffitiSession | null;
}>();

const slots = defineSlots<{
    default?(props: {
        object: GraffitiFileObject | null | undefined;
        file: File | undefined | null;
        fileDataUrl: string | undefined | null;
        poll: () => void;
        isInitialPolling: boolean;
    }): any;
}>();

const { object, file, fileDataUrl, poll, isInitialPolling } =
    useGraffitiGetFile(
        () => props.url,
        () => props.session,
    );
</script>

<template>
    <slot
        :object="object"
        :file="file"
        :fileDataUrl="fileDataUrl"
        :poll="poll"
        :isInitialPolling="isInitialPolling"
    ></slot>
</template>
