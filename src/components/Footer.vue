<template>
    <div 
        class="flex items-center justify-between px-[4.27%] py-[32px] gradient" 
        :style="{
            height: footerDimensions.height + 'px',
            minHeight: footerDimensions.height + 'px',
            //maxHeight: headerDimensions.height + 'px',      
            paddingTop: (footerDimensions.height * 0.25) + 'px',
            paddingBottom: (footerDimensions.height * 0.25) + 'px',
        }"
    >
        <div class="flex justify-center w-fit cursor-pointer items-center" id="deslizar">
            <img  class="transition-all duration-500 ease-in-out" :src="darkMode ? slide.iconDark : slide.icon" :alt="slide.name">
            <span class="transition-all duration-500 ease-in-out" :class="darkMode ? 'text-black' : 'text-white' " href="#" @click="goBack()">{{slide.name}}</span>
        </div>
        <div class="flex justify-center items-center gap-8">
            <div class="flex justify-center items-center overflow-hidden whitespace-nowrap cursor-pointer" id="phone">
                <img :src="darkMode ? phone.iconDark : phone.icon" :alt="phone.name">
                <span class="text-2xl w-max font-light ml-0 transition-all duration-500 ease-linear opacity-0 max-w-0 invisible" :class="darkMode ? 'text-black' : 'text-white'" >+1 (786) 203 7678</span>
            </div>
            <div class="flex items-center justify-center" :class="darkMode ? 'text-black': 'text-white'">
                <div class="justify-center items-start gap-[5px] inline-flex">
                    <img :src="darkMode ? logoFooter.iconDark : logoFooter.icon" :alt="logoFooter.name">
                    <div :class="darkMode ? 'text-black' : 'text-white'" class="text-right text-xl font-normal font-['Hind']"> 
                        | 2022 © Todos los Derechos Reservados
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, Ref, watch, onMounted } from 'vue';
    import {useMainStore} from '../store/index';
    import { useUtilStore } from '../store/utilStore';
    import { storeToRefs } from 'pinia';
    
    const emit = defineEmits(['changeFooterDimensions'])

    const utilStore = useUtilStore()
    const { width, height, darkMode, selectedIndex } = storeToRefs(utilStore)

    const footerDimensions = ref({
        height: 0,
        width: 0
    })

    watch(
        height,
        (newVal: number) => {
            footerDimensions.value.height = newVal * 0.1185
            emit('changeFooterDimensions', footerDimensions.value.height)
        }
    )

    const slide = reactive({
        name: 'DESLIZAR',
        icon: '/src/assets/slide.svg',
        iconDark: '/src/assets/slideDark.svg',
    });

    const back = reactive({
        name: 'ATRAS',
        icon: '/src/assets/back.svg',
        iconDark: '/src/assets/backDark.svg',
    })

    const phone = reactive({
        name: 'phone',
        icon: '/src/assets/phone.svg',
        iconDark: '/src/assets/phoneDark.svg',
    });
    const logoFooter = reactive({
        name: 'logoFooter',
        icon: '/src/assets/Logo_footer.svg',
        iconDark: '/src/assets/Logo_footerDark.svg',
    });

    onMounted(() => {
        footerDimensions.value.height = height.value * 0.1185
        emit('changeFooterDimensions', footerDimensions.value.height)
    })
</script>

<style scoped>

.gradient {
    background: linear-gradient(-90deg, #008DD2 0%, #0956A8 100%);
}

#deslizar > span {
    opacity: 0;
}

#deslizar:hover > span {
    opacity: 1;
}   

#deslizar:hover > img {
    transform: translateX(-5px);
}

#phone:hover > span {
    opacity: 1;
    visibility: visible;
    max-width: 500px;
}


</style>