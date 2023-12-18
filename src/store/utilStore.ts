import { defineStore, storeToRefs } from "pinia";
import { onMounted, ref, type Ref } from "vue";
import { useWindowSize } from "@vueuse/core";

export const useUtilStore = defineStore("util", () => {
    const { width, height } = useWindowSize()
    const darkMode = ref(false)
    const selectedIndex = ref(-1)
  return {
    width,
    height,    
    darkMode,
    selectedIndex
  };
});

export default useUtilStore;
