<template>
    <div class="formPage" v-if="form_page">
      <div class="formPage__block">
        <div
          class="formPage__block--hero" v-if="form_page.hero_image"
          :style="{
            backgroundImage: `url(${isMobile ? fallbackImage(form_page.hero_image_mobi) : fallbackImage(form_page.hero_image)})`,
          }"
        ></div>
        <div class="formPage__block--content">
          {{ form_page }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref } from 'vue';
  
  const props = defineProps({
    form_page: Object, // Updated to Object since it's not an array in your example JSON.
  });
  
  // State
  const isMobile = ref(false);
  
  // Fallback handling
  const fallbackImage = (image) => {
    return import.meta.env.VITE_BASE_URL+image || 'path/to/default-image.jpg'; // Replace with your fallback image path.
  };
  
  // Extract hero image data from props
  const hero_image = ref(props.form_page?.hero_image || ''); 
  const hero_image_mobi = ref(props.form_page?.hero_image_mobi || '');
  </script>
  