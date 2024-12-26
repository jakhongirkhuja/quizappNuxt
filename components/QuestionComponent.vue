<template>
    <div class="questionPage" :style="{ backgroundColor: props.bgColor, color: props.textColor }">
        <div class="questionPage--header" :style="{ borderColor: hexToRgba(props.textColor, 0.2) }">
            <h2 class="container--block">{{ props.currentLocale=='ru'? props.title :  props.title_uz }}</h2>
        </div>

        <div class="questionPage--body">
            <div class="container--block">
                <div class="questionPage--body__questions" :class="{ active: questionIndex === index }"
                    v-for="(question, index) in questions" :key="question.id">
                    <template v-if="questionIndex === index">
                        <div class="question--title">
                            <h3>{{ props.currentLocale=='ru'?  question.question :  question.question_uz }} </h3>

                        </div>
                        <div class="question--body">
                            <template v-if="question.type == 'answer_options'">
                                <div class="answers__block">
                                    <div class="answers__block--each"
                                        :style="{ borderColor: questionSaved.some((q) => q.question.id === question.id && q.answer.some((a) => a.id === answer.id)) ? props.buttonColor : hexToRgba(props.textColor, 0.2) }"
                                        :class="{
                                            active: questionSaved.some((q) => q.question.id === question.id && q.answer.some((a) => a.id === answer.id))
                                        }" v-for="(answer, index) in question.answers"
                                        @click="chooseAnswer(answer, question)">
                                        <div class="icon">
                                           
                                            <svg :class="{
                                                active: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                                )
                                            }"
                                            :style="{ fill: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                                )? props.buttonColor : '' }"
                                            xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                                )" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                <circle v-else cx="8" cy="8" r="8" />
                                            </svg>
                                            <!-- //filled hole -->
                                        </div>
                                        <div class="txt">
                                            <p :style="{ color: textColor }">{{ answer.text == 'null' ? '' : props.currentLocale=='ru'? answer.text :answer.text_uz }}
                                            </p>
                                            
                                            <small  v-if="question.long_text" :style="{ color: textColor }">{{ answer.secondary_text == 'null' ? '' :
                                               props.currentLocale=='ru'?  answer.secondary_text : answer.secondary_text_uz}}</small>
                                        </div>
                                    </div>
                                    <div class="answers__block--each"
                                        :style="{ borderColor: questionSaved.some((q) => q.question.id === question.id && q.answer.some((a) => a.id === answer.id)) ? props.buttonColor : hexToRgba(props.textColor, 0.2) }"
                                        :class="{
                                            active: questionSaved.some((q) =>
                                                q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                            )
                                        }" v-if="question.self_input" @click="chooseAnswer(0, question)">
                                        <div class="icon">
                                            <svg :class="{
                                                active: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                                )
                                            }"  :style="{ fill: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                                )? props.buttonColor : '' }"  xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                                )" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                <circle v-else cx="8" cy="8" r="8" />
                                            </svg>
                                        </div>
                                        <div class="txt">
                                            <input type="text" class="others" @focusout="updateOtherInput(question)"
                                                :value="selfInputText[question.id] || ''" placeholder="Другое">
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-if="question.type == 'answer_image'">
                                <div class="answers__block">
                                    <div class="answers__block--each imageItself"
                                        :style="{ borderColor: questionSaved.some((q) => q.question.id === question.id && q.answer.some((a) => a.id === answer.id)) ? props.buttonColor : hexToRgba(props.textColor, 0.2) }"
                                        :class="{
                                            active: questionSaved.some((q) =>
                                                q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                            )
                                        }" v-for="(answer, index) in question.answers"
                                        @click="chooseAnswer(answer, question)">
                                        <div class="icon">
                                            <!-- <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-record-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                            </svg> -->
                                            <svg :class="{
                                                active: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                                )
                                            }" 
                                             
                                            :style="{ fill: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                                )? props.buttonColor : '' }"
                                            xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === answer.id)
                                                )" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                <circle v-else cx="8" cy="8" r="8" />
                                            </svg>
                                            <!-- //filled hole -->
                                        </div>
                                        <div class="txt withImage">
                                            <img :src="getImage(answer.image)" alt="">
                                            <p :style="{ color: textColor }">{{ props.currentLocale=='ru'? answer.text : answer.text_uz }}</p>

                                        </div>


                                    </div>
                                    <div class="answers__block--each"
                                        :style="{ borderColor: questionSaved.some((q) => q.question.id === question.id && q.answer.some((a) => a.id === answer.id)) ? props.buttonColor : hexToRgba(props.textColor, 0.2) }"
                                        :class="{
                                            active: questionSaved.some((q) =>
                                                q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                            )
                                        }" v-if="question.self_input" @click="chooseAnswer(0, question)">
                                        <div class="icon">
                                            <svg :class="{
                                                active: questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                                )
                                            }" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
                                                <path v-if="questionSaved.some((q) =>
                                                    q.question.id === question.id && q.answer.some((a) => a.id === 0)
                                                )" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                                <circle v-else cx="8" cy="8" r="8" />
                                            </svg>
                                        </div>
                                        <div class="txt">
                                            <input type="text" class="others" @focusout="updateOtherInput(question)"
                                                :value="selfInputText[question.id] || ''" placeholder="Другое">
                                        </div>
                                    </div>
                                </div>


                            </template>
                            <template v-if="question.type == 'answer_comment'">
                                <div class="answers__block">
                                    <input type="text" class="comment"
                                        @focusout="handleClick(question, $event.target.value, false)"
                                        :placeholder="question.answers[0].text == 'null' ? '' : props.currentLocale=='ru'?  question.answers[0].text :  question.answers[0].text_uz">
                                </div>


                            </template>
                            <template v-if="question.type == 'answer_rank'">
                                <div class="answers__block">

                                    <div class="stars">
                                        <div class="stars__icons">
                                            <svg v-for="(star, index) in 5" :key="index" :class="{
                                                'hovered': index <= hoverIndex && hoverIndex >= 0,
                                                'selected': index < selectedIndex
                                            }" @mouseenter="hoverIndex = index"
                                                @click="handleClick(question, index + 1)" @mouseleave="hoverIndex = -1"
                                                xmlns="http://www.w3.org/2000/svg" width="80" height="80"
                                                fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                                <path
                                                    d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                            </svg>

                                        </div>
                                        <div class="stars__text">
                                            <span>{{ question.answers[0].rank_text_min=='null'? '' :   props.currentLocale=='ru'?  question.answers[0].rank_text_min : question.answers[0].rank_text_min_uz }}</span>
                                            <span>{{ question.answers[0].rank_text_max=='null'? '' :  props.currentLocale=='ru'?   question.answers[0].rank_text_max :  question.answers[0].rank_text_max_uz }}</span>
                                        </div>
                                    </div>

                                </div>

                            </template>

                            <template v-if="question.type == 'answer_date'">
                                <div class="answers__block">
                                    <div class="dateTimer">
                                        <VueDatePicker v-model="date" placeholder="Start Typing ..." text-input
                                            @update:model-value="saveDateAnswer(question, date)" />
                                    </div>
                                </div>
                            </template>
                            <template v-if="question.type == 'answer_dropdown'">
                                <div class="answers__block">
                                    <div class="select"  :style="{'--after-border-color': props.buttonColor}">
                                        <select v-model="dropdownAnswers[questionIndex]"
                                        :style="{'--after-border-color': props.buttonColor}"
                                            @change="chooseAnswer(dropdownAnswers[questionIndex], question)">
                                            <option style="display:none" selected></option>
                                            <option v-for="(answer, index) in question.answers" :value="answer">{{
                                               props.currentLocale=='ru'? answer.text :  answer.text_uz }}</option>
                                        </select>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </template>


                </div>
            </div>
        </div>
        <div class="questionPage--footer" :style="{ borderColor: hexToRgba(props.textColor, 0.2) }">
            <div class="container--block questionPage--footer--block">
                <div class="progress__block">
                    <template v-if="progressBarStyle == 0">
                        <div class="progress__text">
                            <span>Готово: <span :style="{ color: props.buttonColor}">{{ progressIndicator }}%</span></span>
                        </div>
                        <div class="progress__itself">
                            <div class="progress__itself--fill"
                                :style="{ width: (progressIndicator + 2) + '%', backgroundColor: props.buttonColor }"></div>
                        </div>
                    </template>
                    <template v-if="progressBarStyle == 1">

                        <div class="progress__itself">
                            <div class="progress__itself--fill"
                                :style="{ width: (progressIndicator + 2) + '%', backgroundColor: props.buttonColor }"><span
                                    class="inside" :style="{ color: props.buttonColor, '--after-bg-color': props.buttonColor }">{{ progressIndicator }}%</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="progressBarStyle == 2">
                        <div class="circle__progress">
                            <div class="circle__progress--self" :style="circleStyle">
                                <div class="value"></div>
                            </div>
                            <div class="circle__progress--text">
                                <span>Готово: </span>
                                <span :style="{ color: props.buttonColor}">{{ progressIndicator }}%</span>
                            </div>
                        </div>
                    </template>
                    <template v-if="progressBarStyle == 3">
                        <div class="progress__text__stage-circle">
                            <span>Шаг: <span :style="{backgroundColor: props.buttonColor, color: props.buttonTextColor}">{{ questionIndex + 1 }}</span> из {{ questions.length }}</span>
                        </div>
                    </template>
                    
                    <template v-if="progressBarStyle == 4">
                        <div class="progress__text__stage">
                            <span>Шаг {{ questionIndex + 1 }} из {{ questions.length }}</span>
                        </div>
                        <div class="progress__bar__circles">
                            <div class="each" :class="{ active: index <= questionIndex + 1 }" 
                            :style="{borderColor : props.buttonColor, backgroundColor: index <= questionIndex + 1? props.buttonColor:'' }"
                                v-for="index in questions.length" :key="index">

                            </div>
                        </div>
                    </template>
                </div>
                <div class="action__block">
                    <div class="button__back" @click="prevQuestion" v-if="questionIndex != 0" :class="{

                        borderRadius: buttonStyle == 1 || buttonStyle == 3,

                    }">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                            class="bi bi-arrow-left-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
                        </svg>
                    </div>
                    <div class="button__next " @click="nextQuestion" v-if="questions" :class="{
                        active: checkFunction,
                        borderRadius: buttonStyle == 0 || buttonStyle == 2,
                        backgroundColor: buttonStyle == 0 || buttonStyle == 1,
                    }" :style="{
                            background: (buttonStyle == 0 || buttonStyle == 1) ? props.buttonColor : '',
                            borderColor: props.buttonColor,
                            color: props.buttonTextColor,
                            boxShadow: '0 3px 10px 0 '+hexToRgba(props.buttonColor, 0.5)
                            // You can add other dynamic styles here
                        }">
                        {{ nextButton }}
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor"
                            class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
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
    title_uz: String,
    progressBarStyle: Number,
    buttonStyle: Number,
    next_question_text: String,
    next_to_form: String,
    bgColor: String,
    textColor: String,
    buttonColor: String,
    buttonTextColor: String,
    currentLocale: String,
});
const route = useRoute();
const router = useRouter();
const date = ref();
const questionIndex = ref(0);
const answerIndex = ref([]);
const answerIndexNew = ref([]);
const questionSaved = ref([]);
const hoverIndex = ref(-1);
const selectedIndex = ref(0);
const progressIndicator = ref(0);
const dropdownAnswers = reactive({});
const choosenAnswers = ref([]);
const selfInputText = ref({});
const hexToRgba = (hex, alpha) => {
    // Convert hex color to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Return RGBA with alpha
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const isActive = computed(() => {
    return props.questionSaved.some(
        (q) => q.question.id === props.question.id &&
            q.answer.some((a) => a.id === props.answer.id)
    );
});
const chooseAnswer = (answer, question) => {
    let findquestion = questionSaved.value.find(
        (eachquestion) => eachquestion.question.id === question.id
    );
    if (findquestion) {
        let answerIndex = findquestion.answer.findIndex(
            (eachanswer) => eachanswer.id === answer.id
        );
        if (answer == 0) {
            answerIndex = findquestion.answer.findIndex(
                (eachanswer) => eachanswer.id === answer
            );
        }
        if (answerIndex !== -1) {
            findquestion.answer.splice(answerIndex, 1);

        } else {
            if (answer == 0) {

                let newasn = {
                    id: 0,
                    text: selfInputText.value[question.id] ?? ''
                }
                findquestion.answer.push(newasn);
            } else {
                findquestion.answer.push(answer);
            }
        }
    } else {
        if (answer == 0) {
            let newQuestion = {
                question: question,
                answer: [{
                    id: 0,
                    text: selfInputText.value[question.id] ?? ''
                }],
            };
            questionSaved.value.push(newQuestion);
        } else {
            let newQuestion = {
                question: question,
                answer: [answer],
            };
            questionSaved.value.push(newQuestion);
        }
    }
    console.log(questionSaved);
    if (!question.multiple_answers) {
        nextQuestion();
    }

};
const getImage = (image) => {
    return import.meta.env.VITE_BASE_URL + image;
}
const updateOtherInput = (question) => {

    selfInputText.value[question.id] = event.target.value;
    let findquestion = questionSaved.value.find(
        (eachquestion) => eachquestion.question.id === question.id
    );
    if (findquestion) {
        const answerIndex = findquestion.answer.find(
            (eachanswer) => eachanswer.id === 0
        );
        if (answerIndex) {
            answerIndex.text = selfInputText.value[question.id] ?? '';

        }
    }

};
const prevQuestion = () => {
    if (questionIndex.value > 0) {

        progressIndicator.value = props.questions.length > 0 ? Math.floor((questionIndex.value - 1) * 100 / props.questions.length) : 0;
        setTimeout(() => {
            questionIndex.value -= 1;
        }, 300);
        answerIndex.value = [];
    }
}
const nextQuestion = () => {

    if (props.questions.length == questionIndex.value + 1) {

        localStorage.setItem('answers', JSON.stringify(questionSaved.value));
        router.replace({ name: route.name, query: { form: true } });
    }

    const currentQuestion = props.questions?.[questionIndex.value];
    const findQuestion = questionSaved.value.find(
        (eachQuestion) => eachQuestion.question.id === currentQuestion?.id
    );

    if (props.questions && props.questions[questionIndex.value].type == 'answer_comment') {

        if (findQuestion && findQuestion.answer.length > 0 && findQuestion.answer[0].text?.length > 0) {
            progressIndicator.value = props.questions.length > 0 ? Math.floor((questionIndex.value + 1) * 100 / props.questions.length) : 0;
            setTimeout(() => {
                questionIndex.value += 1;
            }, 300);

            answerIndex.value = [];
        }



    } else if (
        (findQuestion && findQuestion.answer.length > 0) ||
        (currentQuestion && !currentQuestion.required)
    ) {
        if (questionIndex.value < props.questions.length) {

            progressIndicator.value = props.questions.length > 0 ? Math.floor((questionIndex.value + 1) * 100 / props.questions.length) : 0;
            setTimeout(() => {
                questionIndex.value += 1;
            }, 300);
            answerIndex.value = [];


        }
    }

};
const handleClick = (question, txt, notNextQuestion = true) => {
    selectedIndex.value = txt;
    let findquestion = questionSaved.value.find(
        (eachquestion) => eachquestion.question.id === question.id
    );

    if (findquestion) {
        if (txt == null) {
            findquestion.answer = [];
        } else {
            let checkAnswerIndex = findquestion.answer.find((eachanswer) => eachanswer.id === 0);
            if (checkAnswerIndex) {
                checkAnswerIndex.text = txt + '';
            } else {
                let newasn = {
                    id: 0,
                    text: txt + ''
                }
                findquestion.answer.push(newasn);
            }
        }
    } else {
        if (txt != null) {
            let newQuestion = {
                question: question,
                answer: [{
                    id: 0,
                    text: txt + ''
                }],
            };
            questionSaved.value.push(newQuestion);
        }
    }
    console.log(questionSaved);
    if (notNextQuestion) {
        nextQuestion();
    }


};
const saveDateAnswer = (question, selectedDate) => {



    let findquestion = questionSaved.value.find(
        (eachquestion) => eachquestion.question.id === question.id
    );

    if (findquestion) {
        if (selectedDate == null) {
            findquestion.answer = [];
        } else {
            let checkAnswerIndex = findquestion.answer.find((eachanswer) => eachanswer.id === 0);
            if (checkAnswerIndex) {
                checkAnswerIndex.text = selectedDate + '';
            } else {
                let newasn = {
                    id: 0,
                    text: selectedDate + ''
                }
                findquestion.answer.push(newasn);
            }
        }
    } else {
        if (selectedDate != null) {
            let newQuestion = {
                question: question,
                answer: [{
                    id: 0,
                    text: selectedDate + ''
                }],
            };
            questionSaved.value.push(newQuestion);
        }


    }
    nextQuestion();
};
const saveDropdownAnswer = (question, answer) => {
    if (answer) {
        console.log(answer);
        // saveAnswer(question, answer);
        // nextQuestion();
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

    console.log(choosenAnswers.value);
};
const checkFunction = computed(() => {
    const currentQuestion = props.questions?.[questionIndex.value];

    if (currentQuestion?.type === 'answer_comment') {
        const findQuestion = questionSaved.value.find(
            (eachQuestion) => eachQuestion.question.id === currentQuestion?.id
        );
        return (findQuestion && findQuestion.answer.length > 0 && findQuestion.answer[0].text?.length > 0);
    }
    const findQuestion = questionSaved.value.find(
        (eachQuestion) => eachQuestion.question.id === currentQuestion?.id
    );
    return (
        (findQuestion && findQuestion.answer.length > 0) ||
        (currentQuestion && !currentQuestion.required)
    );

})
const nextButton = computed(() => {
    if (props.questions && props.questions.length === questionIndex.value + 1) {

        return props.next_to_form == 'null' ? "Последний шаг" : props.next_to_form;
    } else {

        return props.next_question_text == 'null' ? "Далее" : props.next_question_text;
    }
});
const circleStyle = computed(() => {
    return {
        background: `conic-gradient(
      ${props.buttonColor} 0% ${progressIndicator.value}%, 
      #c0c0c078 ${progressIndicator.value}% 100%
    )`,
    };
});
</script>

<style scoped>
.main-page .questionPage--footer--block .progress__block .progress__itself--fill .inside::after{
    background-color: var(--after-bg-color, #d34085);
}
.main-page .questionPage--body__questions .answers__block .select::after, .main-page .questionPage--body__questions .answers__block .select select:focus{
    border-color: var(--after-border-color, #c22323);
}

</style>