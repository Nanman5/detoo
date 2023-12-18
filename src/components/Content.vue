<template>
    <div :style="{
            minHeight: props.height + 'px',
            height: height + 'px',
            maxHeight: height + 'px'
        }"
    >
        <transition-group name="menu">
            <div class="flex gradient rounded-tl-[300px]" v-for="(menu, index) in displayItems" :key="menu.name">
                <div class="grow flex items-center justify-center flex-col px-[84px] gap-10" >
                    <img class="w-32" :src="darkMode ? menu.iconDark : menu.icon" alt="" v-show="menu.name!=='Home'">
                    <div 
                        class="flex flex-col justify-between items-center h-fit gap-20 text-center"
                        :class="darkMode ? 'text-black' : 'text-white'"
                    >
                        <span class="text-6xl font-bold">{{menu.h1}}</span>
                        <p class="text-4xl">{{menu.p}}</p>
                        <button 
                            :class="darkMode ? 'border-black' : 'border-white'"
                            class="border-2 rounded-[10px] px-7 py-4 bg-[#0956A8]"
                        >
                            <div class="flex gap-0 hover:gap-4 items-center justify-center transition-all duration-500 ease-in-out" id="button">
                                <span class="text-2xl font-bold">{{menu.button}}</span>
                                <img 
                                    :src="darkMode ? arrowb : arrow" 
                                    alt="arrowRight"
                                    class="max-w-0 opacity-0 invisible transition-all duration-500 ease-in-out"
                                >
                            </div>
                        </button>
                    </div>
                </div>
                <div :style="{
                    minHeight: props.height + 'px',
                    height: height + 'px',
                    maxHeight: height + 'px'
                }">
                    <img class="h-full" :src="darkMode ? menu.bgd + '#svgView(preserveAspectRatio(none))' : menu.bg + '#svgView(preserveAspectRatio(none))'" alt="">
                </div>
            </div>
        </transition-group>
<!--<transition name="carouselAnimation">
    <div v-show="mainStore.news">
        <Carousel />
    </div>
</transition>
-->
    </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch, Ref, Prop } from 'vue';
import Carousel from './Carousel.vue';
import { MenuItems,  MainItems } from '../data/MenuItems';
import useUtilStore from '../store/utilStore';
import { storeToRefs } from 'pinia';

interface Props {
    height: number
}

const props = defineProps<Props>()

const utilStore = useUtilStore()
const { selectedIndex, darkMode } = storeToRefs(utilStore)

watch(
    selectedIndex, 
    (newVal) => {
        if(newVal === -1) {
            queueTransition(MainItems[0])
        } else {
            queueTransition(MainItems[selectedIndex.value+1])
        }   
    }
)


    const arrow = '/src/assets/arrow_right.svg'
    const arrowb = '/src/assets/arrow_rightDark.svg'

    const displayItems = ref<any[]>([])
    const transitionQueue: Ref<any[]> = ref([])
    const isTransitioning = ref(false)

    const queueTransition = (item: any) => {
        transitionQueue.value.push(item)
        if(!isTransitioning.value) {
            processTransitionQueue()
        }
    }

    const processTransitionQueue = () => {
        if(transitionQueue.value.length === 0) {
            isTransitioning.value = false
            return
        }
        isTransitioning.value = true
        const item = transitionQueue.value.shift()

        setTimeout(() => {
            displayItems.value = []
            setTimeout(() => {
                displayItems.value = [item]
                isTransitioning.value = false

                if(transitionQueue.value.length > 0) {
                    processTransitionQueue()
                }
            }, 1000)
        }, 1000)
    }

    onMounted(() => {
        queueTransition(MainItems[0])
    })
    
</script>

<style scoped>

    .gradient {
        background: linear-gradient(180deg, #0956A8 0%, #008DD2 100%);
    }

    #button:hover > img {
        opacity: 1;
        visibility: visible;
        max-width: 200px;
    }

    .menu-enter-active,
.menu-leave-active {
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  position: relative;
  transform: translateX(100%);
}
.menu-enter-to,
.menu-leave-from {
  opacity: 1;
  transform: translateX(0);
}

</style>