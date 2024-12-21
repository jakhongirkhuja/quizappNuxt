<template>
    <div class="questionPage">
        <div class="questionPage--header">
            <h2 class="container--block">{{ props.title }}</h2>
        </div>
        
        <div class="questionPage--body">
            <div class="container--block">
                <div class="questionPage--body__questions" :class="{active:questionIndex===index}" v-for="(question,index) in questions" :key="question.id" >
                    <template v-if="questionIndex===index">
                        <div class="question--title">
                        <h3>{{ question.question }} </h3>
                        </div>
                        <div class="question--body" >
                            <template v-if="question.type=='answer_options'">
                                <div class="answers__block">
                                    <div class="answers__block--each"  :class="{active:answerIndex.includes(index)}" v-for="(answer, index) in question.answers" @click="chooseAnswer(index)">
                                        <div class="icon">
                                            <!-- <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-record-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                            </svg> -->
                                            <svg :class="{active:answerIndex.includes(index)}" xmlns="http://www.w3.org/2000/svg"   width="20" height="20" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="answerIndex.includes(index)" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                <circle v-else cx="8" cy="8" r="8" />
                                                </svg> 
                                                <!-- //filled hole -->
                                        </div>
                                        <div class="txt">
                                            <p>{{ answer.text=='null'? '' : answer.text}}</p>
                                            <small>{{ answer.secondary_text=='null'? '' : answer.secondary_text}}</small>
                                        </div>
                                    </div>
                                    <div class="answers__block--each" v-if="question.self_input" @click="chooseAnswer('self_input')">
                                        <div class="icon">
                                            <svg 
                                            :class="{ active: answerIndex.includes('self_input') }" 
                                             xmlns="http://www.w3.org/2000/svg"   width="20" height="20" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="answerIndex.includes('self_input')"  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                <circle v-else cx="8" cy="8" r="8" />
                                            </svg>
                                        </div>
                                        <div class="txt">
                                            <input type="text" class="others" @input="updateOtherInput" placeholder="Другое">
                                        </div>
                                    </div>
                                </div>    
                            </template>
                            <template v-if="question.type=='answer_image'">
                                <div class="answers__block">
                                    <div class="answers__block--each imageItself" :class="{active:answerIndex.includes(index)}" v-for="(answer, index) in question.answers" @click="chooseAnswer(index)">
                                        <div class="icon">
                                            <!-- <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-record-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                            </svg> -->
                                            <svg :class="{active:answerIndex.includes(index)}" xmlns="http://www.w3.org/2000/svg"   width="20" height="20" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="answerIndex.includes(index)" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                                <circle v-else cx="8" cy="8" r="8" />
                                                </svg> 
                                                <!-- //filled hole -->
                                        </div>
                                        <div class="txt withImage">
                                            <img :src="getImage(answer.image)" alt="">
                                            <p>{{ answer.text}}</p>
                                           
                                        </div>
                                        
                                        
                                    </div>
                                </div>    
                                
                                
                            </template>
                            <template v-if="question.type=='answer_comment'">
                                <div class="answers__block">
                                    <input type="text" class="comment" @focusout="saveAnswer(question, $event.target.value)"  :placeholder="question.answers[0].text=='null'? '' : question.answers[0].text "  >
                                </div>   
                                
                                
                            </template>
                            <template v-if="question.type=='answer_rank'">
                                <div class="answers__block">

                                    <div class="stars">
                                        <div class="stars__icons">
                                            <svg v-for="(star, index) in 5"
                                            :key="index" 
                                            :class="{
                                                'hovered': index <= hoverIndex && hoverIndex >= 0,
                                                'selected': index < selectedIndex
                                            }"
                                            @mouseenter="hoverIndex = index"
                                            @mouseleave="hoverIndex = -1"
                                            @click="selectedIndex = index + 1"
                                                xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                            </svg>
                                           
                                        </div>
                                        <div class="stars__text">
                                            <span>{{question.answers[0].rank_text_min }}</span>
                                            <span>{{question.answers[0].rank_text_max }}</span>
                                        </div>
                                    </div>
                                    
                                </div>
                                
                            </template>
                            
                            <template v-if="question.type=='answer_date'">
                                <div class="answers__block">
                                    <div class="dateTimer">
                                        <VueDatePicker v-model="date"  placeholder="Start Typing ..." text-input />
                                    </div>
                                </div>
                            </template>
                            <template v-if="question.type=='answer_dropdown'">
                                <div class="answers__block">
                                    <div class="select">
                                        <select  v-model="dropdownAnswers[questionIndex]" 
                                           @change="saveDropdownAnswer(question, dropdownAnswers[questionIndex])">
                                            <option style="display:none" selected></option>
                                            <option  v-for="(answer, index) in question.answers">{{ answer.text }}</option>
                                        </select>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>
                   
                    
                </div>
            </div>
        </div>
        <div class="questionPage--footer">
            <div class="container--block questionPage--footer--block">
                <div class="progress__block"> 
                    <template v-if="progressBarStyle==0">
                        <div class="progress__text">
                            <span>Готово:  <span>{{progressIndicator}}%</span></span>
                        </div>
                        <div class="progress__itself">
                            <div class="progress__itself--fill" :style="{width:(progressIndicator+2)+'%'}"></div>
                        </div>
                    </template>
                    <template v-if="progressBarStyle==1">
                       
                        <div class="progress__itself">
                            <div class="progress__itself--fill" :style="{width:(progressIndicator+2)+'%'}"><span class="inside">{{progressIndicator}}%</span></div>
                        </div>
                    </template>
                    <template v-if="progressBarStyle==2">
                        <div class="circle__progress">
                            <div class="circle__progress--self" :style="circleStyle">
                                <div class="value"></div>
                            </div>
                            <div class="circle__progress--text">
                                <span>Готово: </span>
                                <span>{{progressIndicator}}%</span>
                            </div>
                        </div>
                   </template>
                   <template v-if="progressBarStyle==3">
                        <div class="progress__text__stage-circle">
                            <span>Шаг:  <span>{{questionIndex+1}}</span> из {{ questions.length }}</span>
                        </div>
                   </template>
                   <template v-if="progressBarStyle==4">
                        <div class="progress__text__stage">
                            <span>Шаг:  <span>{{questionIndex+1}}</span> из {{ questions.length }}</span>
                        </div>
                   </template>
                   <template v-if="progressBarStyle==5">
                        <div class="progress__text__stage">
                            <span>Шаг  {{questionIndex+1}} из {{ questions.length }}</span>
                        </div>
                        <div class="progress__bar__circles">
                            <div 
                            class="each" 
                            :class="{ active: index <= questionIndex+1 }" 
                            v-for="index in questions.length" 
                            :key="index">
                            
                            </div>
                        </div>  
                   </template>
                </div>
                <div class="action__block">
                    <div class="button__back" @click="prevQuestion"  v-if="questionIndex!=0" :class="{
                        
                        borderRadius:buttonStyle==1 || buttonStyle==3, 
                        
                        }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
                        </svg>
                    </div>
                    <div class="button__next "  @click="nextQuestion" v-if="questions" :class="{
                        active:checkFunction, 
                        borderRadius:buttonStyle==0 || buttonStyle==2, 
                        backgroundColor:buttonStyle==0 || buttonStyle==1,
                        }">
                        {{ nextButton }}
                         <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
                            </svg>
                        
                    </div>
                    
                </div>
                
            </div>
                
        </div>
      
     
    </div>
  </template>
<script setup>
import { defineProps, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
// Define props to receive from the parent
const props = defineProps({
  questions: Array,
  title: String,
  progressBarStyle: Number,
  buttonStyle: Number,
  next_question_text: String,
  next_to_form: String

});
const route = useRoute();
  const router = useRouter();
const date = ref();
 const questionIndex = ref(0);
 const answerIndex = ref([]);
 const hoverIndex = ref(-1);
 const selectedIndex = ref(0);
 const progressIndicator =ref(0);
 const dropdownAnswers = reactive({});
 const choosenAnswers = ref([]);
 const chooseAnswer = (index) => {
  if (props.questions && props.questions[questionIndex.value]?.multiple_answers) {
    // Toggle the selection for multiple answers
    const answerIdx = answerIndex.value.indexOf(index);
    if (answerIdx === -1) {
        answerIndex.value.push(index);
    } else {
        answerIndex.value.splice(answerIdx, 1);
    }
  } else {
    // Single answer selection
    answerIndex.value = [index];
    nextQuestion();
  }
};
 const getImage = (image)=>{
    return import.meta.env.VITE_BASE_URL+image;
 }
 const updateOtherInput = (event) => {
 
  const otherValue = event.target.value.trim();
  
};
 const prevQuestion = () =>{
    if (questionIndex.value > 0) {
            
        progressIndicator.value = props.questions.length>0? Math.floor((questionIndex.value-1) * 100 / props.questions.length) : 0; 
        questionIndex.value -= 1;
        answerIndex.value = []; 
    }
 }
 const nextQuestion = () => {
    
    if(props.questions.length==questionIndex.value+1){
        router.replace({ name: route.name, query: { form: true } });
    }
    if(props.questions && (props.questions[questionIndex.value].type=='answer_comment' || props.questions[questionIndex.value].type=='answer_dropdown')){
          let findIt = choosenAnswers.value.some(
                (item) => item.id === questionIndex.value && item.answer.trim().length > 0
            );
            if(findIt){
                progressIndicator.value = props.questions.length>0? Math.floor((questionIndex.value+1) * 100 / props.questions.length) : 0; 
                questionIndex.value += 1;
                answerIndex.value = []; 
            }
    }else if(answerIndex.value.length>0 || (props.questions && !props.questions[questionIndex.value].required)){
        if (questionIndex.value < props.questions.length) {
            
            progressIndicator.value = props.questions.length>0? Math.floor((questionIndex.value+1) * 100 / props.questions.length) : 0; 
            questionIndex.value += 1;
            answerIndex.value = []; 
            
            
        }
    }
  
};

const saveDropdownAnswer = (question, answer) => {
    if (answer) {
    //    console.log(answer);
        saveAnswer(question, answer);
        nextQuestion();
    }
};
const saveAnswer = (question, answer) => {
    const existingIndex = choosenAnswers.value.findIndex(
        (item) => item.id === questionIndex.value
    );

    if (existingIndex !== -1) {
        choosenAnswers.value[existingIndex].answer = answer;
    } else {
        let newAnswer = {
            id: questionIndex.value,
            question: question,
            answer: answer
        };
        choosenAnswers.value.push(newAnswer);
    }
    
};
 const checkFunction = computed(() =>{
   
   if(props.questions && props.questions[questionIndex.value]?.type=='answer_comment'){
    
     return choosenAnswers.value.some(
                (item) => item.id === questionIndex.value && item.answer.trim().length > 0
            );
   }
    
    return answerIndex.value.length>0 || (props.questions && !props.questions[questionIndex.value]?.required);
 })
 const nextButton = computed(() => {
  if (props.questions && props.questions.length === questionIndex.value + 1) {

    return props.next_to_form=='null'? "Последний шаг": props.next_to_form;
  } else {

    return props.next_question_text=='null'?  "Далее": props.next_question_text;
  }
});
 const circleStyle = computed(() => {
  return {
    background: `conic-gradient(
      #d34085 0% ${progressIndicator.value}%, 
      #c0c0c078 ${progressIndicator.value}% 100%
    )`,
  };
});
</script>

