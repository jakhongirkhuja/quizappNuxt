<template>
    <QuestionComponents  v-if="questionPage=='true'" :questions="questions"
    :title="title" 
    :title_uz="title_uz"
    :progressBarStyle="progressBarStyle" 
    :next_question_text="next_question_text" 
    :next_to_form="next_to_form" 
    :buttonStyle="buttonStyle"
    :bgColor="bgColor"
    :textColor="textColor"
    :buttonColor="buttonColor"
    :buttonTextColor="buttonTextColor"
    :currentLocale="currentLocale"
    />
    <FormPageComponents v-else-if="formPage=='true'" 
    :form_page="form_page"
    :bgColor="bgColor"
    :textColor="textColor"
    :buttonColor="buttonColor"
    :buttonTextColor="buttonTextColor"
    :currentLocale="currentLocale"
     />
    <div class="startPage" :style="{backgroundColor: bgColor}" v-else> 
      <div class="startPage__content" :class="{reverse:design_alignment==2}">
        <template v-if="!isMobile && hero_image">
          <div class="hero"  :class="{bg:design_type==1}" :style="{ backgroundImage: `url(${hero_image})` }"></div>
        </template>
        <template v-if="isMobile && hero_image_mobi">
          <div class="hero"  :class="{bg:design_type==1}" :style="{ backgroundImage: `url(${hero_image_mobi})` }"></div>
        </template>
        <div class="bg-overlay" v-if="!isMobile && (design_type==1 && hero_image)" :class="{right:design_alignment==2}"></div>
        <div class="hiddenElement" v-if="design_type==1 || hero_image" ></div>
        <div class="content" :style="design_type === 0 ? { backgroundColor: bgColor, color: textColor } : null"  :class="{fullwidth:hero_image==null, fullwidth:isMobile && hero_image_mobi==null, bg:design_type==1}">
          <div class="content--header"  v-if="slogan_text || logo">
            <div class="logo">
              <img
                :src="logo"
                alt=""
              />
            </div>
            <div class="text">{{currentLocale=='ru'? slogan_text : slogan_text_uz}} </div>
          </div>
          <div class="content--body">
            <div class="content--body__txt">
              <h1 :style="design_type === 0 ? {color: textColor} : null">{{ currentLocale=='ru'?  title : title_uz }}</h1>
              <h2 :style="design_type === 0 ? {color: textColor} : null">{{ currentLocale=='ru'?  title_secondary : title_secondary_uz }}</h2>
              <div class="btn btn-primary" @click="changeRouteParams" :style="{color: buttonTextColor, background: buttonColor, borderColor: buttonColor}">{{currentLocale=='ru'?  button_text: button_text_uz}}</div>
            </div>
          </div>
          <div class="content--footer">
            <div class="content--footer__txt">
              <div class="phone"><a :style="{color: textColor}" :href="`tel:${currentLocale=='ru'?  phoneNumber : phoneNumber_uz}`">{{currentLocale=='ru'?  phoneNumber : phoneNumber_uz }}</a> </div>
              <div class="company">{{currentLocale=='ru'?  companyName_text : companyName_text_uz}}</div>
            </div>
            
            <div class="logo">создай свой  <a href="#">марквиз</a></div>
          </div>
        </div>
      </div>
    </div>
    <LanguageSwitcher :currentLocale="currentLocale" @language-changed="onLanguageChange"/>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import QuestionComponents from '~/components/QuestionComponent.vue';
  import FormPageComponents from '~/components/FormPageComponents.vue';
  import LanguageSwitcher from '~/components/LanguageSwitcher.vue';
  
  const route = useRoute();
  const router = useRouter();
  // Define reactive variables
  const title = ref('');
  const title_secondary = ref('');
  const title_uz = ref('');
  const title_secondary_uz = ref('');
  const slogan_text = ref('');
  const slogan_text_uz = ref('');
  const phoneNumber = ref('');
  const phoneNumber_uz = ref('');
  const button_text = ref('');
  const button_text_uz = ref('');
  const companyName_text = ref('');
  const companyName_text_uz = ref('');
  const hero_image = ref('');
  const hero_image_mobi = ref('');
  const logo = ref('');
  const currentLocale = ref('ru');
  const bgColor = ref('#fff');
  const textColor = ref('#020202');
  const buttonColor = ref('#CB0000');
  const buttonTextColor = ref('#fff');
  const meta_title = ref('');
  const meta_description = ref('');
  const meta_favicon = ref('');
  const meta_image = ref('');
  const isMobile = ref(false);
  const questions  = ref([]);
  const questionPage = ref(route.query.question);
  const formPage = ref(route.query.form);
  const progressBarStyle = ref(0);
  const buttonStyle = ref(0);
  const form_page = ref();
  const design = ref();
  const design_alignment = ref(0);
  const design_type =ref(0);
  const next_question_text  = ref(null);
  const next_to_form  = ref(null);


  const onLanguageChange = (newLocale)  => {
        console.log(`Language changed to: ${newLocale}`);
        currentLocale.value = newLocale;
    };
  // Define the async function to fetch data
  
  const handleVisit = async () => {
    console.log('handle visit');
    try {
      
      const formData = new FormData();
      
      // Simulate API call
      const response = await fetch(import.meta.env.VITE_BASE_URL+'api/visitlog/'+route.params.uuid, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData,
      });

      if (response.status === 200) {
       
      }
    } catch (error) {
      console.error('Unexpected Error:', error);
      // alert('Произошла ошибка при отправке формы.');
    }
    // Submit form data here...
  };
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
      if(data.value==null){
        console.log(data);
        // router.push('/404');
        return;
      }
      console.log(data);
      meta_title.value = data.value.meta_title || '';
      meta_description.value = data.value.meta_description;
      meta_favicon.value = import.meta.env.VITE_BASE_URL+data.value.meta_favicon;
      meta_image.value = import.meta.env.VITE_BASE_URL+data.value.meta_image;
      next_question_text.value  = data.value.next_question_text;
      next_to_form.value = data.value.next_to_form;
      let startPage = data.value?.start_page;
      form_page.value = data.value?.form_page;
      design.value = data.value?.design;
       
      // questions.value = data.value.questions;
      data.value.questions.forEach(question => {
        if(!question.hidden){
          questions.value.push(question);
        }
      });
      
      if(startPage){
       
        title.value = startPage.title=='null'? null : startPage.title;
        title_uz.value = startPage.title_uz=='null'? null : startPage.title_uz;
        design_alignment.value = startPage.design_alignment;
        design_type.value  = startPage.design_type;
        
        title_secondary.value = startPage.title_secondary=='null'? null: startPage.title_secondary;
        title_secondary_uz.value = startPage.title_secondary_uz=='null'? null: startPage.title_secondary_uz;
        slogan_text.value = startPage.slogan_text=='null'? null : startPage.slogan_text;
        slogan_text_uz.value = startPage.slogan_text_uz=='null'? null : startPage.slogan_text_uz;
        phoneNumber.value =startPage.phoneNumber=='null'? null :startPage.phoneNumber;
        phoneNumber_uz.value =startPage.phoneNumber_uz=='null'? null :startPage.phoneNumber_uz;
        button_text.value = startPage.button_text=='null'? 'Начать' :  startPage.button_text;
        button_text_uz.value = startPage.button_text_uz=='null'? 'Начать' :  startPage.button_text_uz;
        companyName_text.value = startPage.companyName_text=='null'? null : startPage.companyName_text;
        companyName_text_uz.value = startPage.companyName_text_uz=='null'? null : startPage.companyName_text_uz;
        hero_image.value =startPage.hero_image==null? null : import.meta.env.VITE_BASE_URL+startPage.hero_image;
        hero_image_mobi.value =startPage.hero_image_mobi==null? null : import.meta.env.VITE_BASE_URL+startPage.hero_image_mobi;
        logo.value = import.meta.env.VITE_BASE_URL+startPage.logo;
      }
      if(design){
       
        
        buttonColor.value = design.value.buttonColor;
        buttonTextColor.value = design.value.buttonTextColor;
        bgColor.value =  design.value.bgColor;
        textColor.value = design.value.textColor;
        progressBarStyle.value = design.value.progressBarStyle;
        
        buttonStyle.value  =design.value.buttonStyle;
      }
      
      if(data.value.startPage==0){
       
        router.push({ name: route.name, query: { question: true } });
        // questionPage.value = true;
      }else{
        router.push({ name: route.name, query: { question: false } });
        // questionPage.value = false;
        
      }
      
      
    } catch (error) {
      console.error('Ошибка:', error);
      
    }
  };
  const changeRouteParams = () => {
    router.replace({ name: route.name, query: { question: true } });
  };
  const checkIfMobile = () => {
  // Check window width and update isMobile
  isMobile.value = window.innerWidth <= 768;
  
};
  onMounted(() => {
    handleVisit();
    checkIfMobile(); // Check on mount
    window.addEventListener('resize', checkIfMobile); // Update on window resize
    });
    asyncData();
  // Call the function when the component is mounted
  
  
  // Set the meta tags dynamically
  useHead({
    title: meta_title || 'QuizLink',  // Dynamically set the title based on the fetched data
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

    watch(
  () => route.query,
  (newQuery) => {
    questionPage.value = newQuery.question;
    formPage.value = newQuery.form;
  }
);
  </script>
  