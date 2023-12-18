<template>
    <div class="flex items-center justify-center ">        
        <div class="flex flex-col items-center p-0 justify-start">
            <ModalNavItem 
                v-for="(item,index) in MenuItems"
                :class="selectedIndex === index ? 'bg-white dark:bg-black text-[#008DD2]' : 'text-white dark:text-black'"
                :icon="selectedIndex === index ? item.iconFocus : (darkMode ? item.iconDark : item.icon)"
                :text="item.name"
                :selected="selectedIndex === index"
                @click="handleSelected(index)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { MenuItems } from '../data/MenuItems';
    import ModalNavItem from './ModalNavItem.vue';
    import useUtilStore from '/src/store/utilStore.ts'
    import { storeToRefs } from 'pinia';
    import { ref } from 'vue'

    const utilStore = useUtilStore()
    const { darkMode, selectedIndex } = storeToRefs(utilStore)

    //const selectedIndex = ref(-1)

    const emit = defineEmits(['change'])

    const handleSelected = (index:number) => {
        if(index === 6 ) {
            return
        } else if(index === 5) {
            darkMode.value = !darkMode.value
            if(darkMode.value) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        }
        else {
            selectedIndex.value = index
            emit('change', index)
        }        
    }    
</script>

<style scoped>

</style>