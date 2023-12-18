<template>
    <div class="flex items-center rounded-[10px] cursor-pointer px-[25px] py-[15px] gap-2">
        <img 
            :src="props.icon" 
            :alt="props.text"
            class="w-20 transition-all duration-300 ease-in-out "
            :class="props.selected ? 'm-0 opacity-100 visible' : '-mr-20 opacity-0'"
        >
        <span 
            class="text-6xl w-max font-light -ml-0 transition-all duration-300  ease-in-out"                        
        >
            {{ props.text.toUpperCase() }}
        </span>
    </div>    
</template>

<script setup lang="ts">
    interface Props {
        icon: string
        text: string
        selected: boolean
    }

    const props = defineProps<Props>()
</script>

<style scoped>
    div:hover > img {
        margin: 0px;
        opacity: 1;
        visibility: visible;
    }
</style>