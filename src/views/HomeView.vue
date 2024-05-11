<script setup>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import Nissan240 from '../components/Nissan240SX.vue';
    import NissanSkyline from '../components/NissanSkyline.vue';
    import Nissan370Z from '../components/Nissan370Z.vue';
    import DescriptionBlock from '../components/DescriptionBlock.vue'

</script>

<template>
    <div class="HomeView" :class="{ expanded: isExpanded }">
        <Header @componentChange="changeComponent"></Header>
        <component :is="currentComponent" />
        <DescriptionBlock></DescriptionBlock>
        <Footer></Footer>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        currentComponent: 'Nissan240'
      };
    },
    components: {
      Nissan240,
      NissanSkyline,
      Nissan370Z
    },
    methods: {
      changeComponent(component) {
        this.currentComponent = component;
      }
    }
  };
</script>

<style scoped>
.v3d-container {
      position: absolute;
      width: 100%;
      height: 50%;
  }
.HomeView{
      position: absolute;
      top: 0%;
      left: 0%;
      right: 0%;
      background-color:rgb(18, 17, 17);
      width: 100%;
      height: 100vh;
}
.DescriptionBlock{
    position: absolute;
    top: 52%;
    left: 0;
    right: 0;
    height: 20%;
    background-color:rgb(18, 17, 17);
    transition: 1s, border-radius 0.5s;
    opacity: 0.55; 
}
.DescriptionBlock.expanded {
  height: auto;
  top: 98px ;
  opacity: 1;
}
</style>