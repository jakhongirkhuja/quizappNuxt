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
            <div class="formPage__block--inside" :class="{centered:!form_page.hero_image}">
                <h2>{{ form_page.title=='null'? '': form_page.title }}</h2>
                <p>{{ form_page.title_secondary=='null'? '': form_page.title_secondary }}</p>
                <form @submit.prevent="validateForm">
                  <!-- Name Field -->
                  <label for="name" v-if="form_page.name">
                    <span>Имя <span v-if="form_page.name_required">*</span></span>
                    <input class="form-control"
                      id="name" 
                      type="text" 
                      v-model="form.name" 
                      @input="clearError('name')" 
                    />
                    <small v-if="errors.name">{{ errors.name }}</small>
                  </label>

                  <!-- Phone Field -->
                  <label for="phone" v-if="form_page.phone">
                    <span>Введите телефон <span v-if="form_page.phone_required">*</span></span>
                    <input 
                    class="form-control"
                      id="phone" 
                      type="text" 
                      v-model="form.phone" 
                      @input="clearError('phone')" 
                    />
                    <small v-if="errors.phone">{{ errors.phone }}</small>
                  </label>

                  <!-- Email Field -->
                  <label for="email" v-if="form_page.email">
                    <span>Введите email <span v-if="form_page.email_required">*</span></span>
                    <input 
                      id="email" 
                      type="email" 
                      class="form-control"
                      v-model="form.email" 
                      @input="clearError('email')" 
                    />
                    <small v-if="errors.email">{{ errors.email }}</small>
                  </label>

                  <!-- Submit Button -->
                  <div class="btn btn-primary" @click="validateForm">Отправить</div>

                  <!-- Consent Checkbox -->
                  <label>
                    <input 
                      type="checkbox" 
                      v-model="form.agree" 
                      @change="clearError('agree')" 
                    />
                    <span class="policy">
                      Я соглашаюсь на 
                      <a href="https://www.marquiz.ru/agreement" target="_blank">обработку персональных данных</a>
                      согласно 
                      <a href="https://www.marquiz.ru/policy" target="_blank">политике конфиденциальности</a>
                    </span>
                    <div>
                      <small class="d-block" v-if="errors.agree">{{ errors.agree }}</small>
                    </div>
                   
                  </label>
                 
                </form>
            </div>
          
        </div>
      </div>
      <div class="thankyouPage" v-if="thankyoupage">
        <div class="thankyouPage__inside">
          Спасибо!    👏
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, ref,reactive } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const route = useRoute();
  const router = useRouter();
  const thankyoupage = ref(false);
const form = reactive({
  name: '',
  phone: '',
  email: '',
  agree: false,
});

const errors = reactive({
  name: '',
  phone: '',
  email: '',
  agree: '',
});
const validateForm = () => {
  let valid = true;

  if(props.form_page.name &&  props.form_page.name_required){
    if (!form.name.trim()) {
      errors.name = 'Имя обязательно для заполнения.';
      valid = false;
    }
  }
  
  
  if(props.form_page.phone &&  props.form_page.phone_required){
    
    const phonePattern = /^[0-9\s+()-]+$/;
      if (!form.phone.trim()) {
        errors.phone = 'Введите телефон.';
        valid = false;
      } else if (!phonePattern.test(form.phone)) {
        errors.phone = 'Некорректный номер телефона.';
        valid = false;
      }
  }
 
  if(props.form_page.email &&  props.form_page.email_required){
 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      errors.email = 'Введите email.';
      valid = false;
    } else if (!emailPattern.test(form.email)) {
      errors.email = 'Некорректный email.';
      valid = false;
    }
  }
  

  // Validate Consent Checkbox
  if (!form.agree) {
    errors.agree = 'Вы должны согласиться с условиями.';
    valid = false;
  }

  if (valid) {
    handleSubmit();
  }
};
const clearError = (field) => {
  errors[field] = '';
};

const handleSubmit = async () => {
  alert('Форма успешно отправлена!');
  try {
    console.log('Submitting Form:', form);

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('phone', form.phone);
    formData.append('email', form.email);
    // Simulate API call
    const response = await fetch(import.meta.env.VITE_BASE_URL+'api/submitForm/'+route.params.uuid, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: formData,
    });

    if (response.status === 201) {
      thankyoupage.value  = true;
     
      resetForm();
    } else {
      const errorData = await response.json();
      console.error('Submission Error:', errorData);
      alert('Произошла ошибка при отправке формы.');
    }
  } catch (error) {
    console.error('Unexpected Error:', error);
    alert('Произошла ошибка при отправке формы.');
  }
  // Submit form data here...
};
const resetForm = () => {
  form.name = '';
  form.phone = '';
  form.email = '';
  form.agree = false;

  Object.keys(errors).forEach((key) => {
    errors[key] = '';
  });
};
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
  