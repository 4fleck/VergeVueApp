<script setup>
        import MarkdownRender from '../../MarkdownRender.vue'
</script>

<template>
    <div class="TextContaiterForVideo">
        <div>
            <MarkdownRender  :source="markdownContent"></MarkdownRender> 
            <!-- <textarea v-model="markdownContent"></textarea>
            <div v-html="markdownToHtml"></div> -->
        </div>
    </div>
</template>

<script>
    export default {
    name: 'TextBlockForVideo',
    data() {
    return {
        markdownContent: '# Hello World'
    };
  },
  mounted() {
    fetch('/VideoText.md')
      .then(response => response.text())
      .then(content => {
        this.markdownContent = content;
      });
  }
};
</script>


<style scoped>
.TextContaiterForVideo{
    background-color: rgb(18, 17, 17);

}
</style>
