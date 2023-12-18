<template>
    <div class="flex items-center rounded-[10px] cursor-pointer px-[25px] py-[15px] gap-2 overflow-hidden">
        <img :src="props.icon" :alt="props.text">
        <span 
            class="text-2xl w-max font-light ml-0 transition-all duration-500 ease-linear"
            :class="props.selected ? 'opacity-100 visible max-w-[112px]' : 'opacity-0 max-w-0 invisible'"
        >
            {{ props.text.toUpperCase() }}
        </span>
    </div>
</template>

<script setup lang="ts">
    interface Props {
        icon: string;
        text: string;
        selected: boolean
    }

    const props = defineProps<Props>()
</script>

<style scoped>
    div:hover > span{
        opacity: 1;
        visibility: visible;
        max-width: 112px;
    }
</style>