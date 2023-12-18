<template>
    <div class="flex justify-center items-start gap-0">
        <div
            class="flex"
        >
            <HeaderNavItem
                v-for="(item, index) in menuFiltered"
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
    import { ref } from 'vue';
    import HeaderNavItem from './HeaderNavItem.vue';
    import useUtilStore from '/src/store/utilStore.ts'
    import { storeToRefs } from 'pinia';

    const utilStore = useUtilStore()
    const { darkMode, selectedIndex } = storeToRefs(utilStore)

    //const selectedIndex = ref(props.selected)

    const emit = defineEmits(['change'])

    const menuFiltered = MenuItems.filter((element) => element.name !== 'Noticias')

    const handleSelected = (index:number) => {
        if(index === 5 ) {
            return
        } else if(index === 4) {
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