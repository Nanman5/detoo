<template>
    <div class="z-10 absolute left-0 right-0 top-0 bottom-0 m-0 h-screen gradient">
        <div 
        class="flex items-center justify-between px-[4.27%] py-[32px]" 
        :style="{
            //height: headerDimensions.height + 'px',
            minHeigth: headerDimensions.height + 'px',
            //maxHeight: headerDimensions.height + 'px',      
            paddingTop: (headerDimensions.height * 0.25) + 'px',
            paddingBottom: (headerDimensions.height * 0.25) + 'px',
        }"
    >    
        <div 
            class="flex justify-center w-fit"
        >                                
            <img                 
                :src=" darkMode ? logoTop.iconDark : logoTop.icon" 
                alt="Logo" 
                class="cursor-pointer"
                @click="close"
                :style="{
                    height: (headerDimensions.height / 2) + 'px',
                    width: (width * 0.02) + 'px'
                }"
            >
                    <!--
                </transition> -->
        </div>   
        <div class="flex justify-end">
            <div 
                class="flex transition-all duration-500 ease-linear items-center justify-center hover:-translate-x-[50px] cursor-pointer" 
                id="cerrar"
                @click="close"
            >
                <img 
                    :src="darkMode ? cerrar.iconDark : cerrar.icon" 
                    alt="cerrar"
                >
                <span 
                    class="opacity-0 transition-all duration-500 ease-linear h-max w-max font-light text-2xl"
                    :class="darkMode ? 'text-black' : 'text-white'" 
                >
                    CERRAR
                </span>
            </div>
        </div>         
        </div>
        <div 
            class="flex items-center justify-center"
            :style="{
                height: (height - headerDimensions.height) + 'px',
            }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, onMounted, ref, watch } from 'vue';
    import { useUtilStore } from '../store/utilStore';
    import { storeToRefs } from 'pinia';

    const utilStore = useUtilStore()
    const { width, height, darkMode } = storeToRefs(utilStore)

    const headerDimensions = ref({
        height: 0,
        width: 0
    })

    watch(
        height,
        (newVal: number) => {
            headerDimensions.value.height = newVal * 0.1185
        }
    )
    


    const emit = defineEmits(["close"]);

    const close = () => emit("close");

    const logoTop = reactive(
        {
            name: 'logoTop',
            icon: '/src/assets/Logo_top.svg',
            iconDark: '/src/assets/Logo_topDark.svg',
        });
    const cerrar = reactive(
        {
            name: 'close',
            icon: '/src/assets/close.svg',
            iconDark: '/src/assets/closeDark.svg'
        });

        onMounted(() => {
        headerDimensions.value.height = height.value * 0.1185
    })
</script>

<style scoped>

    .gradient {
        background: linear-gradient(90deg, #008DD2 0%, #0956A8 100%);
    }

    #cerrar:hover > span { 
        opacity: 1;
    }

  
</style>