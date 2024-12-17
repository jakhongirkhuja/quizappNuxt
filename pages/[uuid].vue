<template>
    <QuestionComponents  v-if="questionPage=='true'" :questions="questions"
    :title="title" :progressBarStyle="progressBarStyle" :buttonStyle="buttonStyle"/>
    <FormPageComponents v-else-if="formPage=='true'" :form_page="form_page" />
    <div class="startPage" v-else>
      <div class="startPage__content">
        <div class="hero" :style="{ backgroundImage: `url(${isMobile? hero_image_mobi : hero_image})` }"></div>
        <div class="content">
          <div class="content--header">
            <div class="logo">
              <img
                :src="logo"
                alt=""
              />
            </div>
            <div class="text">{{slogan_text}} </div>
          </div>
          <div class="content--body">
            <div class="content--body__txt">
              <h1>{{ title }}</h1>
              <h2>{{ title_secondary }}</h2>
              <div class="btn btn-primary">{{button_text}}</div>
            </div>
          </div>
          <div class="content--footer">
            <div class="content--footer__txt">
              <div class="phone">{{ phoneNumber }}</div>
              <div class="company">{{companyName_text}}</div>
            </div>
            
            <div class="logo">создай свой  <a href="#">марквиз</a></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import QuestionComponents from '~/components/QuestionComponent.vue';
  import FormPageComponents from '~/components/FormPageComponents.vue';
  const route = useRoute();
  
  // Define reactive variables
  const title = ref('');
  const title_secondary = ref('');
  const slogan_text = ref('');
  const phoneNumber = ref('');
  const button_text = ref('');
  const companyName_text = ref('');
  const hero_image = ref('');
  const hero_image_mobi = ref('');
  const logo = ref('');
  const meta_title = ref('');
  const meta_description = ref('');
  const meta_favicon = ref('');
  const meta_image = ref('');
  const isMobile = ref(false);
  const questions  = ref(null);
  const questionPage = ref(route.query.question);
  const formPage = ref(route.query.form);
  const progressBarStyle = ref(0);
  const buttonStyle = ref(0);
  const form_page = ref();
  const design = ref();
  // Define the async function to fetch data
  const asyncData = async () => {
   
    try {
     
        const { data, status } = await useFetch(
        `${import.meta.env.VITE_BASE_URL}api/qa/${route.params.uuid}`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            accept: 'application/json',
          },
        }
      );
     
      
      meta_title.value = data.value.meta_title;
      meta_description.value = data.value.meta_description;
      meta_favicon.value = import.meta.env.VITE_BASE_URL+data.value.meta_favicon;
      meta_image.value = import.meta.env.VITE_BASE_URL+data.value.meta_image;
      
      let startPage = data.value?.start_page;
      form_page.value = data.value?.form_page;
      design.value = data.value?.design;

      questions.value = data.value.questions;
      if(startPage){
        title.value = startPage.title;
        title_secondary.value = startPage.title_secondary;
        slogan_text.value = startPage.slogan_text;
        phoneNumber.value =startPage.phoneNumber;
        button_text.value = startPage.button_text;
        companyName_text.value = startPage.companyName_text;
        hero_image.value = import.meta.env.VITE_BASE_URL+startPage.hero_image;
        hero_image_mobi.value =import.meta.env.VITE_BASE_URL+startPage.hero_image_mobi;
        logo.value = import.meta.env.VITE_BASE_URL+startPage.logo;
      }
      if(design){
      
        progressBarStyle.value = design.progressBarStyle;
        buttonStyle.value  =design.buttonStyle;
      }
      
      
    } catch (error) {
      console.error('Ошибка:', error);
      title.value = 'Error loading title'; // Fallback title in case of error
    }
  };
  const checkIfMobile = () => {
  // Check window width and update isMobile
  isMobile.value = window.innerWidth <= 768;
  
};
  onMounted(() => {
    checkIfMobile(); // Check on mount
    window.addEventListener('resize', checkIfMobile); // Update on window resize
    });
  
  // Call the function when the component is mounted
  asyncData();
  
  // Set the meta tags dynamically
  useHead({
    title: meta_title || 'MarkQuiz',  // Dynamically set the title based on the fetched data
    meta: [
        {
        name: 'description',
        content: meta_description || '',
        },
        // Open Graph meta tags (Facebook, LinkedIn, etc.)
        {
        property: 'og:title',
        content: meta_title || '',
        },
        {
        property: 'og:description',
        content: meta_description || '',
        },
        {
        property: 'og:image',
        content: meta_image || '/default-image.jpg',  // Fallback image
        },
        {
        property: 'og:type',
        content: 'website',
        },
        // Twitter Card meta tags
        {
        name: 'twitter:title',
        content: meta_title || '',
        },
        {
        name: 'twitter:description',
        content: meta_description || '',
        },
        {
        name: 'twitter:image',
        content: meta_image || '/default-image.jpg',  // Fallback image
        },
        {
        name: 'twitter:card',
        content: 'summary_large_image',  // Ensures a large image is shown on Twitter
        },
        // Favicon link
       
    ],
    link: [
        {
        rel: 'icon',
        href: meta_favicon,  
        type: 'image/png',
        },
    ]
    });
  </script>
  