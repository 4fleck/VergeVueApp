<script setup>
    import VideoBlock from './SubcomponetsVieoTextBlock/VideoBlock.vue';
    import TextContaiterForVideo from './SubcomponetsVieoTextBlock/TextBlockForVideo.vue'

</script>

<template>
    <div class="VideoTextContaiter">
       <VideoBlock></VideoBlock>
       <TextContaiterForVideo></TextContaiterForVideo>
    </div>
</template>

<script>
    export default {
    name: 'VieoTextBlock',

}
</script>

<style scoped>
.VideoContaiter, .TextContaiterForVideo{
    position: absolute;
    top:2.5%;
    height:550px;
}
.VideoContaiter{
    right: 1%;
    width: 50%;
    justify-content: flex-end;
}
.VideoTextContaiter{
    height: 550px;
    background-color: rgb(18, 17, 17)
}
.TextContaiterForVideo{
    width: 50%;
    left: 1%;
    justify-content: flex-start;
}
</style>