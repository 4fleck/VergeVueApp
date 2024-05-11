<script setup>
    import { RouterLink } from 'vue-router';
    import {  ref, computed } from 'vue';

</script>

<template>
    <div class="Footer">
        <div class="herfGit">
            <a href="https://github.com/4fleck/VergeVueApp/tree/develop" target="_blank"> <img src="/github-svgrepo-com.svg" alt="GitHub"></a>
        </div>
        <div class="herfTelegram">
            <a href="https://telegram.org/?1" target="_blank"><img src="/telegram-svgrepo-com.svg" alt="Telegram"></a>
        </div>
        <div class="copywrite">
            <span>Verge3d In Vue</span>
        </div>
    </div>
</template>
<style>
    .Footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5%;
    background-color: rgb(18, 17, 17);
    color: white;
    padding: 10px;
    z-index: 1000;
    border-top: 2px solid #606060;
}
.herfGit{
    position: fixed;
    bottom: 2%;
    right: 60px;
    justify-content: flex-end;
}
.herfTelegram{
    position: fixed;
    bottom: 1.6%;
    right: 100px;
    justify-content: flex-end;
}
.copywrite{
    position: fixed;
    bottom: 0.85%;
    left: 1.5%;
    justify-content: flex-start;
}
</style>