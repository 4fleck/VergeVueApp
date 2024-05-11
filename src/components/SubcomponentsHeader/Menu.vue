<script setup>
    import { RouterLink } from 'vue-router';
    import {  ref, computed } from 'vue';

</script>
<template>
    <div class="MenuContainer">
      <RouterLink v-for="(button, index) in buttons" :key="index" :to="button.route">
        <button class="Button">
          {{ button.text }}
        </button>
      </RouterLink>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        buttons: [
          { text: 'Home', route: '/' },
          { text: 'Аbout Project', route: '/about' },
          { text: 'Doc', route: '/doc' }
        ]
      };
    }
  };
  </script>
  
  <style>
  @import './Styles/MenuIcon.css';
  @import './Styles/HeaderСontainers.css';
  </style>