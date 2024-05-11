<script setup>
    import Menu from './SubcomponentsHeader/Menu.vue'
    import Icon from './SubcomponentsHeader/Icon.vue'
    import OtherList from './SubcomponentsHeader/OtherList.vue';
    const DocList = { ...OtherList };
    const AboutList = { ...OtherList};
    const ModelList = { ...OtherList};
</script>

<template>
   <div class="Header">
    <Menu></Menu>
    <Icon></Icon>
    <ModelList v-if="isHome" @componentChange="changeComponent" v-bind="NameChangeComponentsModel"></ModelList>
    <AboutList v-if="isAbout" @componentChange="changeComponent" v-bind="NameChangeComponentsAbout"></AboutList>
    <DocList v-if="isDoc" @componentChange="changeComponent" v-bind="NameChangeComponentsDoc"></DocList>
    </div>
</template>
<script>
    export default {
      data(){
        return {
          NameChangeComponentsAbout: {
            NameCompA: 'Realization Vue',
            NameCompB: 'Realization Verge3d',
            NameCompC: 'Realization Blender',
              ChangeCompA: 'RealizationVue',
              ChangeCompB: 'RealizationVerge3d',
              ChangeCompC: 'RealizationBlender'
          },
          NameChangeComponentsDoc: {
            NameCompA: 'Vue3',
            NameCompB: 'Verge3D',
            NameCompC: 'Blender',
              ChangeCompA: 'DocVue',
              ChangeCompB: 'DocVerge3d',
              ChangeCompC: 'DocBlender'
          },
          NameChangeComponentsModel:{
            NameCompA: 'Nissan 240SX',
            NameCompB: 'Nissan Skyline',
            NameCompC: 'Nissan 370Z',
              ChangeCompA: 'Nissan240',
              ChangeCompB: 'NissanSkyline',
              ChangeCompC: 'Nissan370Z'
          }
        };
      },
      computed: {
        isHome() {
            return this.$route.name === 'Home'
        },
        isAbout(){
          return this.$route.name === 'About'
        },
        isDoc(){
          return this.$route.name === 'Doc'
        }
        },
  methods: {
    changeComponent(component) {
      console.log(component)
      this.$emit('componentChange', component);
    }
  }
};
</script>
<style>
  .Header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;

    opacity: 0.7;
    color: white;
    padding: 10px;
    z-index: 1000;
}
</style>

