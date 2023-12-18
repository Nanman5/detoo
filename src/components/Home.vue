<template>
    <div class="bg-[#008DD2] overflow-hidden"
        :style="{
            minHeight: height + 'px',
            height: height + 'px',
            maxHeight: height + 'px'
        }"
    >
        <Header 
            @change-dimensions="onHeaderDimensionsChange"
        />
        <div
            class=""
            :style="{
                minHeight: (height - footerDimensions - headerDimensions) + 'px',
                height: (height - footerDimensions - headerDimensions) + 'px',
                maxHeight: (height - footerDimensions - headerDimensions) + 'px',
            }"
        >
           <Content 
            :height="(height - footerDimensions - headerDimensions)"
           />
        </div>
        <Footer 
        @change-footer-dimensions="onFooterDimensionsChange"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import Header from './Header.vue'
    import Footer from  './Footer.vue'
    import Content from './Content.vue';
    import { useUtilStore } from '../store/utilStore';
    import { storeToRefs } from 'pinia';

    const utilStore = useUtilStore()
    const { width, height, darkMode, selectedIndex } = storeToRefs(utilStore)

    const headerDimensions = ref(0)
    const footerDimensions = ref(0)
    
    const onHeaderDimensionsChange = (height: number) => {
        headerDimensions.value = height
    }

    const onFooterDimensionsChange = (height: number) => {
        footerDimensions.value = height
    }

</script>

<style scoped>
    

</style>