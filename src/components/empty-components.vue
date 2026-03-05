<template>
    <div>{{ msg }}</div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'EmptyComponents',
})

const { msg = 'hello world' } = defineProps<Props>()

interface Props {
    msg?: string
}
</script>
