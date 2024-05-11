<script setup>
        import MarkdownRender from '../MarkdownRender.vue'
</script>

<template>
    <div class="MainTextContaiter">
        <MarkdownRender  :source="markdownContent"></MarkdownRender>
    </div>
</template>

<script>
    export default {
    name: 'MainTextBlock',
    data() {
    return {
        markdownContent: '# Hello World'
    };
  },
  mounted() {
    fetch('/MainText.md')
      .then(response => response.text())
      .then(content => {
        this.markdownContent = content;
      });
  }
}
</script>

<style scoped>
.MainTextContaiter{
  margin-bottom: 100px;
    height: 100%;
    background-color: rgb(18, 17, 17);
    overflow: hidden;
    border-top: 2px solid #858585;
}
</style>