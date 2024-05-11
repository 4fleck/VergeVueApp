<script setup>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import About from '../components/About.vue'
</script>

<template>
    <div class="DocView">
        <Header @componentChange="changeComponent"></Header>
        <About :realizationType="componetData[currentComponent].realizationType"/>
        <Footer></Footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentComponent: 'DocVue',
            componetData: {
             'DocVue': {
                    realizationType: {
                        markdownFile: '/VueDoc.md',
                }
             },
               'DocVerge3d':{
                    realizationType: {
                        markdownFile: '/VergeDoc.md',
                }
               },
                'DocBlender':{
                    realizationType: {
                        markdownFile: '/BlenderDoc.md',
                 } 
                }
            }
        };
    },
    methods: {
        changeComponent(component) {
            this.currentComponent = component;
        }
    }
};
</script>

<style scoped>
.DocView{
    position: absolute;    
      top: 50px;
      left: 0%;
      right: 0%;
      background-color:rgb(18, 17, 17);
      width: 100%;
      height: 100vh;
}
.RealizationContainer {
    position: absolute;
    top: 20px;
    left: 1%;
    right: 1%;
    height: auto;
    background-color:rgb(18, 17, 17);
    transition: 1s, border-radius 0.5s;
    padding-bottom: 100px;

}
</style>