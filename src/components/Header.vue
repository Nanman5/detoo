<template>    
    <div 
        class="flex items-center justify-between px-[4.27%] py-[32px] gradient" 
        :style="{
            height: headerDimensions.height + 'px',
            minHeight: headerDimensions.height + 'px',
            //maxHeight: headerDimensions.height + 'px',      
            paddingTop: (headerDimensions.height * 0.25) + 'px',
            paddingBottom: (headerDimensions.height * 0.25) + 'px',
        }"
    >     
        <div 
            class="flex justify-center w-fit"
        >                                
            <img                 
                :src=" darkMode ? logoTop.logoDark : logoTop.logo" 
                alt="Logo" 
                class="cursor-pointer"
                @click="showModal = true"
                :style="{
                    height: (headerDimensions.height / 2) + 'px',
                    width: (width * 0.02) + 'px'
                }"
            >
                    <!--
                </transition> -->
        </div>            
        <div >         
            <HeaderNav 
                @change="handleSelected"
                :selected="selectedIndex"
            />
        </div>
    </div>    
    <transition>
        <Modal v-show="showModal" @close="showModal = false">
            <div class="modal">                
                <ModalNav 
                    @change="handleSelected"
                />
            </div>
        </Modal>
    </transition>
</template>

<script setup lang="ts">
    import { reactive, ref, Ref, watch, onMounted } from 'vue'
    import { useUtilStore } from '../store/utilStore';
    import { storeToRefs } from 'pinia';
    import Modal from './Modal.vue'
    import { MenuItems } from '../data/MenuItems'
    import HeaderNav from './HeaderNav.vue';    
    import ModalNav from './ModalNav.vue';

    const emit = defineEmits(['changeDimensions'])

    //const selectedIndex = ref(-1)

    const handleSelected = (index:number) => {
        showModal.value = false
        selectedIndex.value = index
    }

    interface logo{
        logo: string,
        logoDark: string,
    }

    const utilStore = useUtilStore()
    const { width, height, darkMode, selectedIndex } = storeToRefs(utilStore)

    const showModal : Ref<boolean> = ref(false);
    
    const headerDimensions = ref({
        height: 0,
        width: 0
    })

    watch(
        height,
        (newVal: number) => {
            headerDimensions.value.height = newVal * 0.1185
            emit('changeDimensions', headerDimensions.value.height)
        }
    )
    

    const logoTop : logo = reactive({
        logo: '/src/assets/Logo_top.svg',
        logoDark: '/src/assets/Logo_topDark.svg',
    })

    onMounted(() => {
        headerDimensions.value.height = height.value * 0.1185
        emit('changeDimensions', headerDimensions.value.height)
    })

</script>

<style scoped>
    .gradient {
        background: linear-gradient(90deg, #008DD2 0%, #0956A8 100%);
    }    

    .v-enter-active,
    .v-leave-active {
        transition: all 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        transform: translateY(-100%);
    }
</style>
