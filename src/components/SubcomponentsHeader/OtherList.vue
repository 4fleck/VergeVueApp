<template>
    <div class="ModelListContainer">
        <button class="ListButton" @click="changeComponent(ChangeCompA)">{{ NameCompA }}</button>
        <button class="ListButton" @click="changeComponent(ChangeCompB)">{{ NameCompB }}</button>
        <button class="ListButton" @click="changeComponent(ChangeCompC)">{{ NameCompC }}</button>
    <component :is="currentComponent" />
    </div>
  </template>
  
  <script>
export default {
    props: ['NameCompA',
            'NameCompB',
            'NameCompC',
            'ChangeCompA',
            'ChangeCompB',
            'ChangeCompC'],
   methods: {
    changeComponent(component) {
      console.log(component)
      this.$emit('componentChange', component);
    }
  }
  };
  </script>
  
<style>
  @import './Styles/MenuIcon.css';
  @import './Styles/HeaderСontainers.css';
</style>