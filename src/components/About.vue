<script setup>
        import MarkdownRender from './MarkdownRender.vue'
       
</script>

<template>
    <div class="RealizationContainer">
        <MarkdownRender  :source="RealizationMarkdownContent"></MarkdownRender>
    </div>
</template>

<script>
export default {
    name: 'About',
    props: {
        realizationType:{
                default(){
                    return {}
                }
            }
        }, 
    data() {
        return {
            CurrentType: {}, 
            RealizationMarkdownContent: '# Загрузка ...'
        };
    },
    mounted() {
        this.loadmd()
    },
    methods:{
        loadmd(){
            fetch(this.Realization.markdownFile)
                .then(response => response.text())
                .then(content => {
                this.RealizationMarkdownContent = content;
            });
        }
    },
    computed:{
        Realization(){
            return this.realizationType 
        }
    },
    watch:{
        Realization:function(){
            this.loadmd()
        }
    }
};
</script>
<style scoped>
.RealizationContainer{
    text-align: justify;
}
</style>


