<script setup>
    import Header from '../components/Header.vue';
    import Footer from '../components/Footer.vue';
    import About from '../components/About.vue'
</script>

<template>
    <div class="AboutView">
        <Header @componentChange="changeComponent"></Header>
        <About :realizationType="componetData[currentComponent].realizationType"/>
        <Footer></Footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentComponent: 'RealizationVue',
            componetData: {
             'RealizationVue' : {
                    realizationType: {
                        markdownFile: '/RealizsationVue.md',
                        txt: '12312312312'
                }
             },
               'RealizationVerge3d':{
                    realizationType: {
                        markdownFile: '/RealizsationVerge3d.md',
                        txt: '2323232323'
                }
               },
                'RealizationBlender':{
                    realizationType: {
                        markdownFile: '/RealizationBlender.md',
                        txt: '343434343'
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
.AboutView{
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