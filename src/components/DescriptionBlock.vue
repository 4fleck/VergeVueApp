<script setup>
    import { ref } from 'vue';
    import VieoTextBlock from './SubcomponentsDescriptionBlock/VieoTextBlock.vue'
    import MainTextBlock from './SubcomponentsDescriptionBlock/MainTextBlock.vue'


    const isExpanded = ref(false);

    const expandDescriptionBlock = () => {
    isExpanded.value = !isExpanded.value;
};
    const collapseDescriptionBlock = () => {
    isExpanded.value = false;
};

</script>

<template>
    <div class="DescriptionBlock" :class="{ expanded: isExpanded }">
        <div class="TopResizeButton" v-if="!isExpanded" @click="expandDescriptionBlock">Развернуть</div>
        <div class="BottomResizeButton" v-else @click="collapseDescriptionBlock">Свернуть</div>
        <VieoTextBlock></VieoTextBlock>
        <MainTextBlock></MainTextBlock>
    </div>
</template>

<style scoped>
.VideoTextContaiter, .MainTextContaiter{
    position: relative;
    left: 0%;
    right: 0%;
}

.VideoTextContaiter{
    top: 2%;
}
.MainTextContaiter{
    top: -140%;
    height: 100%;
    padding: 1%;
    transition: 2s, border-radius 0.5s;
}

.TopResizeButton, .BottomResizeButton  {
  position: absolute;
  /* left: 40%;
  right: 40%; */
  top: -40px;
  width: 100%;
  height: 40px;
  transition: all 0.2s ease;
}
.TopResizeButton{
    opacity: 1;
    background-color: rgb(18, 17, 17);
}
.BottomResizeButton  {
    top: -40px;
    height: 70px;
    background-color:rgb(18, 17, 17);
    
}
.TopResizeButton:hover {
    height: 70px;
    position: absolute;
    top: -70px;
    animation: bounce 2s;
    border-top-left-radius: 100%;
    border-top-right-radius: 100%; 
}

.BottomResizeButton:hover{
    border-bottom: 2px solid #606060;
    background-color: rgb(0, 0, 0);
    opacity: 0.95;
    height: 70px;
    position: absolute;
    border-top: none ;
    animation: bounce 2s;
    border-bottom-left-radius: 100%;
    border-bottom-right-radius: 100%;
}
</style>