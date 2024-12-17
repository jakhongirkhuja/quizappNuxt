<template>
  
    <NuxtRouteAnnouncer />
    <NuxtPage />
  
</template>
<script>
export default {
  watch: {
    $route(to) {
      // document.body.className = '';
      //   document.body.classList.add('about-page');
    }
  },
  mounted() {
    this.updateBodyClass(this.$route);
  },
  methods: {
    updateBodyClass(route) {  
      document.body.classList.add('main-page');
      
    }
  },
};
</script>