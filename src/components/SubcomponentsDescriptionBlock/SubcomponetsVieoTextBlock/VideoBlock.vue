<script>
    export default {
    name: 'VideoBlock',

}
</script>

<template>
    <div class="VideoContaiter">
        <iframe width="80%" height="75%" src="https://www.youtube.com/embed/Gz5YgrbzABI?si=PnpW6XpLHKMQml3U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
</template>

<style scoped>
/* .VideoContaiter{
    width: 80%;
    height: 70%;
} */
.frame{
    left: 5%;
    width: 80%;
    height: 300px;
}
</style>