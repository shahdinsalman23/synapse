<template>
    <div>
        <QuestionHeader @showbirds="showbirds" :flagcounts="flagcounts" :incorrectcount="incorrectcount"
            :correctcount="correctcount" :percentage="percentage" />


        <!-- <section class="question-breadcrum">
            <div class="container">
              
                <div class="breadcrumb">
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'MLA CONTENT MAP' }"
                        @click="activeSection = 'MLA CONTENT MAP'">
                        MLA CONTENT MAP
                    </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                        @click="activeSection = 'BY AREAS'">
                        PRESENTATIONS AND CONDITIONS
                    </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                        @click="activeSection = 'BY AREAS'">
                        BY AREAS
                    </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                        @click="activeSection = 'BY AREAS'">
                        CARDIOLOGY
                    </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                        @click="activeSection = 'BY AREAS'">
                        PRESENTATIONS
                    </span>
                    <span class="breadcrumb-arrow">›</span>
                    <span class="breadcrumb-item" :class="{ active: activeSection === 'BY AREAS' }"
                        @click="activeSection = 'BY AREAS'">
                        ABDOMINAL MASS
                    </span>
                </div>
            </div>
        </section> -->


        <!-- <section class="questionnumber-sec">
            <div class="container">
                <div class="questionnumber-slide-container">
                    <div class="questionleft-arrow" @mouseenter="startScroll('left')" @mouseleave="stopScroll"
                        @mousedown="fastScroll('left')" @mouseup="stopScroll">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-chevron-left-icon lucide-chevron-left">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </div>

                    <div class="slider-wrapper">
                        <div class="questionnumber-slide scrollmenu" ref="scrollContainer">
                            <span class="questionnumber" v-for="(n, index) in allquestions" :key="index"
                                :class="{ activeindex: index === activeNumber }" @click="setActive(index)">{{ index + 1
                                }}</span>
                        </div>
                    </div>

                    <div class="questionright-arrow" @mouseenter="startScroll('right')" @mouseleave="stopScroll"
                        @mousedown="fastScroll('right')" @mouseup="stopScroll">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-chevron-right-icon lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </div>
                </div>
            </div>
        </section> -->


        <div v-if="!birdseye">



            <div class="responsive-wrapper">
                <section class="questionnumber-sec">
                    <div class="scrollcenter" style="padding-top: 5px; position:relative">
                        <div class="mainscrollview">
                            <div class="buttond">
                                <div class="questionleft-arrow" @click="scrollBackward" @mouseup="stopScroll"><svg
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                        <path d="m15 18-6-6 6-6" />
                                    </svg></div>
                            </div>
                            <div class="questionnumber-slide  scrollmenus" ref="scrollContainer"
                                @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
                                @mouseleave="handleMouseLeave" :style="slideStyle">
                                <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber"
                                    :style="{
                                        background: nav.score?.correct == 1
                                            ? '#9ded6c'
                                            : (nav.score?.correct == 0 ?
                                                '#ffbabe'
                                                : nav.flag
                                                    ? '#f1f2f2'
                                                    : (nav.skip
                                                        ? '#f1f2f2'
                                                        : '#f1f2f2')),
                                    }" :class="{ 'activeindexs': isPresentIndexs(indexnav) }">
                                    <!-- <span @click="getBackindex(indexnav)" style="cursor:pointer; width: 100%;">{{ indexnav + 1 }}</span> -->
                                    <span @click="getBackindex(indexnav)" style="cursor:pointer; width: 100%;">{{
                                         indexnav + 1 ?? nav.question_no }}</span>


                                    <svg v-if="nav.flag" class="red-flag" width="11" viewBox="0 0 19 17">
                                        <path
                                            d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                                            fill="#ED1C24" />
                                    </svg>
                                </span>
                            </div>
                            <div class="buttond">
                                <div class="questionright-arrow" @click="scrollForward" @mouseup="stopScroll">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>


            <div class="questiontext-sec">
                <div class="container">
                    <div class="question-option-arrows-wrapper">
                        <transition name="fade" mode="out-in">
                            <div class="questiontext-box" v-if="currentQuestion" :key="currentQuestion?.id">
                                <p class="currentquestionnumber">{{ currentQuestion.number }}</p>
                                <p class="questionimage" v-html="currentQuestion.question_text"></p>
                                <span class="questionflag">


                                    <svg v-if="currentQuestion?.flag" @click="removeflage(currentQuestion?.id)"
                                        width="19" height="17" viewBox="0 0 19 17" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z"
                                            fill="#ED1C24" />
                                    </svg>



                                    <svg v-if="!currentQuestion?.flag"
                                        @click="setflage(currentQuestion?.id, currentQuestion)" width="19" height="16"
                                        viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z"
                                            fill="transparent" stroke="#9A9898" stroke-width="2" />
                                    </svg>


                                    <span class="flag-hover-text" v-if="bubbles == 1">Flag Question</span>
                                </span>
                            </div>
                        </transition>
                        <transition name="fade" mode="out-in">
                            <div :key="currentQuestion?.id">


                                <div class="question-alloptions" v-if="currentQuestion && !currentQuestion?.score">

                                    <div v-for="(option, index) in currentQuestion?.options" :key="option.id">


                                        <div class="input-field question-options"
                                            :class="{ selected: selectedOption == option.id }"
                                            @click="checkSelectedCondition(option.id, option)"
                                            @keydown.enter.space="checkSelectedCondition(option.id, option)">
                                            <input type="radio" :id="option.id" :value="option.id"
                                                v-model="selectedOption" />

                                            <span class="option-letter">{{ String.fromCharCode(65 + index) }}.</span>
                                            {{ option.option_text }}
                                        </div>
                                    </div>

                                </div>

                                <div class="question-alloptions" v-else>
                                    <div v-for="(option, index) in currentQuestion?.options" :key="option"
                                        class="input-field question-option" :for="option.id"
                                        :style="getLabelStyle(option)">

                                        <div class="option-header" @click="toggleAccordion(index)">

                                            <h4>{{ String.fromCharCode(65 + index) }}. {{ option.option_text }}</h4>
                                            <div class="accordion-icon">
                                                <svg v-if="activeOptions.includes(index)" width="24" height="24"
                                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5 12H19" stroke="#231F20" stroke-width="2"
                                                        stroke-linecap="round" />
                                                </svg>
                                                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 5V19" stroke="#231F20" stroke-width="2"
                                                        stroke-linecap="round" />
                                                    <path d="M5 12H19" stroke="#231F20" stroke-width="2"
                                                        stroke-linecap="round" />
                                                </svg>
                                            </div>
                                        </div>
                                        <transition @enter="enter" @leave="leave" :css="false">
                                            <div v-if="activeOptions.includes(index)" class="option-content">
                                                <p><strong v-if="option.explanation">Explanation:</strong> {{
                                                    option.rollingout ? option.rollingout : option.explanation }}
                                                </p>
                                            </div>
                                        </transition>
                                    </div>
                                </div>




                                <!-- <div class="question-alloptions">
                                <div class="question-option" v-for="(option, index) in currentQuestion.options"
                                    :key="option.id">
                                    <div class="option-header" @click="toggleOption(index)">
                                        <h4>{{ option.option_text }}</h4>
                                        <div class="accordion-icon">
                                            <svg v-if="openedOption === index" width="24" height="24"
                                                viewBox="0 0 24 24" fill="none">

                                                <path d="M5 12H19" stroke="#231F20" stroke-width="2"
                                                    stroke-linecap="round" />
                                            </svg>
                                            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">

                                                <path d="M12 5V19M5 12H19" stroke="#231F20" stroke-width="2"
                                                    stroke-linecap="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    <transition name="accordion">
                                        <div class="option-content" v-show="openedOption === index">
                                            <p>{{ option?.content }}</p>
                                        </div>
                                    </transition>
                                </div>
                            </div> -->
                            </div>
                        </transition>

                        <div class="questionsoptions-arrows" :class="{ 'no-submit': currentQuestion?.score }" v-if="allquestions.length > 0">
                            <div class="questionoption-leftarrow" @click="previousQuestion()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </div>
                            <div class="questionoptions-button" v-if="!currentQuestion?.score">
                                <button @click="submitAnswer(currentQuestion.id, currentQuestion)">Submit</button>
                            </div>
                            <div class="questionoption-rightarrow" @click="nextQuestion()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </div>
                        </div>
                        <!-- <div class="questionsoptions-arrows">
                        <div class="questionoption-leftarrow" @click="previousQuestion()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            <span class="leftarrow-hover-text" v-if="bubbles == 1">Previous Question</span>
                        </div>


                        <div class="questionoption-rightarrow" v-if="currentQuestionIndex === allquestions.length - 1"
                            @click="gotoBev()">

                            Submit Mock
                        </div>


                        <div class="questionoption-rightarrow" v-else @click="nextQuestion()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                            <span class="leftarrow-hover-text" v-if="bubbles == 1">Next Question</span>
                        </div>
                    </div> -->

                        <div class="brake-border"></div>
                        <MockReviewDetail v-if="allquestions.length > 0" />

                    </div>
                </div>
            </div>
        </div>

        <div v-if="birdseye">
            <QuestionBirdsEyeView @showbirds="showbirds" :question="allquestions" />
        </div>


        <!-- <div class="questiontext-sec">
            <div class="container">
                <div class="question-option-arrows-wrapper">

                    <div class="questiontext-box">
                        <p>What is the capital of France?</p>
                        <span class="questionflag">
                            <svg width="19" height="17" viewBox="0 0 19 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z"
                                    fill="#ED1C24" />
                            </svg>
                            <span class="flag-hover-text">Flag Question</span>
                        </span>
                    </div>

                    <div class="question-alloptions">
                        <div class="question-option" v-for="(option, index) in options" :key="index">
                            <div class="option-header" @click="toggleOption(index)">
                                <h4>{{ option.label }}</h4>
                                <div class="accordion-icon">
                                    <svg v-if="openedOption === index" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                      
                                        <path d="M5 12H19" stroke="#231F20" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
                                     
                                        <path d="M12 5V19M5 12H19" stroke="#231F20" stroke-width="2"
                                            stroke-linecap="round" />
                                    </svg>
                                </div>
                            </div>

                            <transition name="accordion">
                                <div class="option-content" v-show="openedOption === index">
                                    <p>{{ option.content }}</p>
                                </div>
                            </transition>
                        </div>
                    </div>


                    <div class="questionsoptions-arrows">
                        <div class="questionoption-leftarrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </div>
                        <div class="questionoptions-button">
                            <button>Submit</button>
                        </div>
                        <div class="questionoption-rightarrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="brake-border"></div>
                <MockReviewDetail />
            </div>
        </div> -->


    </div>
</template>


<script>
import QuestionHeader from '@/components/QuestionHeader.vue';
import MockReviewDetail from "@/components/MockReviewDetail.vue"
import { get, byMethod } from './lib/api';
import QuestionBirdsEyeView from './QuestionBirdsEyeView.vue';


export default {
    name: 'QuestionsPage',
    components: {
        QuestionHeader,
        MockReviewDetail,
        QuestionBirdsEyeView
    },
    data() {
        return {
            correctcount: 0,
            incorrectcount: 0,
            birdseye: false,
            correctOptionId: null,
            yourOptionId: null,
            answerChecked: false,
            seletecOptionObject: null,

            isDragging: false,
            dragStartX: 0,
            scrollLeftStart: 0,
            activeNumber: 1,
            scrollInterval: null,
            scrollSpeed: 10,
            openedOption: null,
            allquestions: [],
            currentQuestionIndex: 0,
            bubbles: null,
            currentselected: 0,
            truecondition: false,
            selectedOptions: null,
            selectedOption: null,
            review: false,
            flagcounts: 0,
            flg2: true,
            fillicon: 1,
            showflagelist: false,
            showunanswerlist: false,
            flg: false,
            form: {
                question_id: null,
                option_id: null,
                correct: null,
                subject_id: null,
                condition_id: null,
                presentation_id: null,
                type: null,
                sublist_id: null

            },
            title: null,
            percentage:0,
            method: 'POST',
            activeOptions: [],
            options: [
                {
                    label: 'A. Primary biliary cholangitis',
                    content:
                        'Primary biliary cholangitis is an auto-immune disorder characterised by progressive destruction of small bile ducts within the liver...',
                },
                {
                    label: 'B. Pancreatic cancer',
                    content:
                        'While pancreatic cancer can cause acute cholangitis, there are few factors in this scenario which point toward a purely infective cause...',
                },
                {
                    label: 'C. Cholecystitis',
                    content:
                        'Cholecystitis should not raise bilirubin levels unless there is accompanying choledocholithiasis.',
                },
                {
                    label: 'D. Alcoholic liver disease',
                    content:
                        'Alcoholic liver disease can produce jaundice and hepatic pain. But fever is not usually associated with this condition.',
                },
                {
                    label: 'E. Acute cholangitis',
                    content:
                        'This patient has several risk factors for gall stones - female, fat, forty. She has most likely developed acute cholangitis...',
                },
            ],
        }
    },

    created() {

        console.log(this.$route.params.id)

        const title = localStorage.getItem("questiontitle");
        this.title = title

        console.log('titel', title)
        if (title == 'Conditions') {

            get('/getconditionquestionclient?id=' + this.$route.params.id)
                .then((res) => {
                    console.log(res)
                    this.allquestions = res.data.data
                    this.percentage = res.data.percentage


                })

        }
        else if (title == 'Sublist') {
            get('/getsubconditionquestionclient?id=' + this.$route.params.id)
                .then((res) => {
                    console.log(res)
                    this.allquestions = res.data.data
                    this.percentage = res.data.percentage


                })

        }

        else if (title == 'Presentations'){
            get(`/getpresentationquestionclient?id=${this.$route.params.id}&byfetch=${'Title'}`)
            .then((res) => {
                this.allquestions = res.data.data
                this.percentage = res.data.percentage

            });
        }
        else {
            get('/getchapterquestionclient?id=' + this.$route.params.id)
                .then((res) => {
                    console.log(res)
                    this.allquestions = res.data.data
                    this.percentage = res.data.percentage

                })

        }



        this.getFlaged()



    },

    watch: {
        currentQuestion: {
            handler() {
                this.setInitialSelectedOption();

            },
            deep: true,
            immediate: true,
        },
    },
    methods: {


        setflage(e, question) {
            this.flagedid = e;
            this.flg = true
            this.flg2 = true
            this.flagged(this.flagedid, question)
            this.currentQuestion.flag = true
        },

        flagged(e, question) {
            this.form.subject_id = question.subject_id
            this.form.condition_id = question.condition_id
            this.form.presentation_id = question.presentation_id
            this.form.sublist_id = question.sublist_id

            const updatedIndex = this.currentQuestionIndex;
            console.log("Updated index:", updatedIndex);
            if (this.allquestions[updatedIndex]) {
                this.$set(this.allquestions[updatedIndex], 'flag', true);
            }

            this.form.questionId = e;
            byMethod(this.method, "/saveflagequestion", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);
                    this.$nextTick(() => {
                        this.scrollToActiveItem();
                    });

                    this.getFlaged();
                    // this.getReviewsss()
                    this.centerSelectedIndex(this.currentQuestionIndex)
                }
            });
        },

        getFlaged() {

            get(`/getflagedcountquestion?id=${this.$route.params.id}&title=${this.title}`)
                .then((res) => {
                    console.log(res.data.data);
                    this.flagcounts = res.data.data;
                    this.correctcount = res.data.correctcount;
                    this.incorrectcount = res.data.incorrectcount;
                });

            // get("/getflagedcountquestion?id=" + this.$route.params.id).then((res) => {
            //     console.log(res.data.data);
            //     this.flagcounts = res.data.data;
            //     this.correctcount = res.data.correctcount
            //     this.incorrectcount = res.data.incorrectcount
            //     //   this.setData(res);
            // });
        },

        showbirds() {

            // console.log('hello world')
            this.birdseye = !this.birdseye

        },

        toggleAccordion(index) {
            const i = this.activeOptions.indexOf(index);
            if (i !== -1) {
                this.activeOptions.splice(i, 1); // close if already open
            } else {
                this.activeOptions.push(index); // open without closing others
            }
        },

        getLabelStyle(option) {



            if (this.currentQuestion?.score) {
                console.log("getLabelStyle")


                if (option.id == this.currentQuestion?.score.option_id) {
                    console.log("now")
                    if (option.is_correct == 1) {
                        return {

                            background: '#9DED6C',
                            border: '1px solid green'

                        };
                    } else {
                        return {

                            background: '#FFBABE',
                            border: '1px solid red'

                        };
                    }
                } else {
                    if (option.is_correct == 1) {
                        return {

                            background: '#9DED6C',
                            border: '1px solid green'

                        };
                    }
                }
            }
            else {
                if (option.explanation != null) {
                    return {

                        background: '#9DED6C',
                        border: '1px solid green'

                    };

                }
                else {

                    return {}
                }
            }
        },

        submitAnswer(e, question) {
            console.log('question', question)

            console.log(this.seletecOptionObject)
            this.form.question_id = e;

            this.form.option_id = this.selectedOption;
            this.form.subject_id = question.subject_id
            this.form.correct = this.seletecOptionObject.is_correct
            this.form.condition_id = question.condition_id
            this.form.presentation_id = question.presentation_id
            this.form.sublist_id = question.sublist_id
            this.form.type = this.title




            // handle answer submission logic
            console.log("Selected option:", this.selectedOption, "selected question", question);

            byMethod(this.method, "/questionScore", this.form)
                .then((res) => {
                    if (res.data.saved) {
                        console.log(res.data.saved);
                        this.allquestions = res.data.data
                        this.correctcount = res.data.correctcount
                        this.incorrectcount = res.data.incorrectcount
                        this.percentage = res.data.percentage
                        // this.nextQuestion();
                    }
                })
                .catch((error) => {
                    if (error?.response?.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.isProcessing = false;
                });
        },

        previousQuestion() {


            this.flg2 = true





            if (this.currentQuestionIndex > 0) {


                this.currentQuestionIndex--;


                this.$nextTick(() => {
                    this.centerSelectedIndex(this.currentQuestionIndex)
                });
            }

        },

        nextQuestion() {

            this.flg = false
            this.flg2 = true



            if (this.currentQuestionIndex < this.allquestions.length - 1) {
                this.currentQuestionIndex++;
                this.truecondition = false
                this.$nextTick(() => {

                    this.centerSelectedIndex(this.currentQuestionIndex)
                });

            } else {

                this.truecondition = false

            }


        },

        getBackindex(e) {



            // this.scrollToActiveItem()
            this.centerSelectedIndex(e)
            // this.centerSelectedIndex(this.currentQuestionIndex)


            this.flg = false
            this.showflagelist = false
            this.showunanswerlist = false
            this.fillicon = 1
            this.currentQuestionIndex = e






            this.currentQuestionIndex = e
            this.review = false;
            this.starts = true;
            this.eye = true;
            this.flg2 = true


            this.$nextTick(() => {
                // this.scrollToActiveItem();
                this.centerSelectedIndex(this.currentQuestionIndex)
            });

            this.handleBreadcrumpsUpdate('Normal');

        },


        scrollForward() {
            this.$refs.scrollContainer.scrollLeft += 1500; // Scroll forward by 200px
        },
        scrollBackward() {
            this.$refs.scrollContainer.scrollLeft -= 1500; // Scroll backward by 200px
        },

        isPresentIndexs(indexnav) {
            //   const presentindex = localStorage.getItem('presentindex');
            const presentindex = this.currentQuestionIndex
            console.log(presentindex);

            // If presentindex is in local storage, compare it with indexnav
            return presentindex !== null && parseInt(presentindex, 10) === indexnav;
        },


        handleMouseDown(event) {
            this.isDragging = true;
            this.dragStartX = event.pageX;
            this.scrollLeftStart = this.$refs.scrollContainer.scrollLeft;
        },
        handleMouseMove(event) {
            if (!this.isDragging) return;
            const delta = event.pageX - this.dragStartX;
            const speedMultiplier = 1; // Increase this value for faster scroll
            this.$refs.scrollContainer.scrollLeft = this.scrollLeftStart - delta * speedMultiplier;
        },
        handleMouseUp() {
            this.isDragging = false;
        },
        handleMouseLeave() {
            this.isDragging = false;
        },


        checkSelectedCondition(e, option) {



            console.log('true conditionxxx', this.selectedOption, this.currentselected, e, option)


            if (this.currentselected === e) {
                this.truecondition = false
                this.selectedOption = null;

            }

            else {
                this.currentselected = e
                this.truecondition = true
                this.selectedOption = e



            }
            this.seletecOptionObject = option
            this.$nextTick(() => {
                this.centerSelectedIndex(this.currentQuestionIndex)
            });
            console.log('true condition', this.truecondition)

        },


        centerSelectedIndex(index) {
            this.$nextTick(() => {
                const container = this.$refs.scrollContainer;
                const items = container.querySelectorAll('.questionnumber');
                const selectedItem = items[index];

                if (!selectedItem) return;

                const containerWidth = container.clientWidth;
                const itemOffsetLeft = selectedItem.offsetLeft;
                const itemWidth = selectedItem.offsetWidth;

                const scrollPosition = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);

                container.scrollTo({
                    left: scrollPosition,
                    behavior: 'smooth'
                });
            });
        },


        setInitialSelectedOption() {
            if (!this.currentQuestion || !this.currentQuestion?.options) {
                console.warn("currentQuestion or options is undefined.");
                return; // Exit function early to prevent errors
            }
            console.log('hello', this.currentQuestion);
            const optionWithScore = this.currentQuestion?.options.find(
                (option) => option.score !== null
            );
            if (optionWithScore) {
                // Set selectedOption to option.id, not the whole option
                this.selectedOption = optionWithScore.id;
            }
        },
        toggleOption(index) {
            this.openedOption = this.openedOption === index ? null : index;
        },
        setActive(n) {
            this.activeNumber = n;
        },

        startScroll(direction) {
            const scrollContainer = this.$refs.scrollContainer;

            if (this.scrollInterval) clearInterval(this.scrollInterval);

            this.scrollInterval = setInterval(() => {
                if (direction === 'right') {
                    if (scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth) {
                        scrollContainer.scrollLeft += 5;
                    } else {
                        this.stopScroll();
                    }
                } else if (direction === 'left') {
                    if (scrollContainer.scrollLeft > 0) {
                        scrollContainer.scrollLeft -= 5;
                    } else {
                        this.stopScroll();
                    }
                }
            }, this.scrollSpeed);
        },

        fastScroll(direction) {
            const scrollContainer = this.$refs.scrollContainer;

            if (this.scrollInterval) clearInterval(this.scrollInterval);

            this.scrollInterval = setInterval(() => {
                if (direction === 'right') {
                    if (scrollContainer.scrollLeft + scrollContainer.clientWidth < scrollContainer.scrollWidth) {
                        scrollContainer.scrollLeft += 10;
                    } else {
                        this.stopScroll();
                    }
                } else if (direction === 'left') {
                    if (scrollContainer.scrollLeft > 0) {
                        scrollContainer.scrollLeft -= 10;
                    } else {
                        this.stopScroll();
                    }
                }
            }, this.scrollSpeed / 2); // faster
        },

        stopScroll() {
            if (this.scrollInterval) {
                clearInterval(this.scrollInterval);
                this.scrollInterval = null;
            }
        },
        slideStyle() {
            return {
                transform: `translateX(-${this.currentIndex * (this.numberWidth + this.gap)}px)`,
                transition: this.scrollInterval ? 'transform 0.3s linear' : 'transform 0.3s ease-in-out'
            };
        }
    },

    computed: {

        currentQuestion() {
            return this.allquestions[this.currentQuestionIndex];
        },
    }


}
</script>


<style scoped>
.activeindexs {

    height: 72.25px !important;
    transform: translate(0px, 0px);
    font-weight: bold !important;
    border: 2px solid #949393 !important;
    font-size: 16px !important;
}

.questionnumber-slide {
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.question-options {
    padding: 12px 35px;
    color: #231F20;
    border: 1px solid #d1d3d482;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: flex-start;
    background: white;
    margin: 0px 0px 22px 0px;
    gap: 5px
}

.question-option {
    padding: 12px 35px;
    color: #231F20;
    border: 1px solid #d1d3d482;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: flex-start;
    background: white;
    margin: 0px 0px 22px 0px;
    flex-direction: column;
    gap: 10px
}

.input-field input[type="radio"] {

    opacity: 0 !important;
    width: 0px;
}

.question-option h4 {
    padding: 0px;
}


.option-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.3s ease;
    width: 100%;
}

.option-content p {
    color: #231f20;
    line-height: 1.4;
    text-align: left;
    padding: 2px 0 0 0px;
}


.accordion-icon {

    display: flex;
    align-items: baseline;
    transition: transform 0.3s ease;
}


.questionsoptions-arrows {
    grid-template-columns: 1fr 225px 1fr !important;
}

.questionsoptions-arrows.no-submit {
    grid-template-columns: 1fr 1fr !important;
}



.option-content p {
    padding: 2px 0 15px 0px;
}


.breadcrumb {
    display: flex;
    align-items: center;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 0 0 0;
    justify-content: center;
}

.breadcrumb-item {
    padding: 3px 10px;
    color: white;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 300;
    cursor: pointer;
    background: #BBBDBF;
}

.breadcrumb-item.active {
    background-color: #1A90FF;
}

.breadcrumb-item.inactive {
    background-color: #BBBDBF;
}

.breadcrumb-arrow {
    padding: 0 6px;
    color: #BBBDBF;
    font-size: 16px;
}


.questionnumber {
    min-width: 23.65px;
    text-align: center;
    padding: 15px 0px;
    border: none;
    border-radius: 4px;
    flex-shrink: 0;
    font-size: 12px;
    background-color: #F1F1F2;
    position: relative;
    font-family: Helveticacondensed;
    color: #000;
    height: 49.27px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.questionnumber-slide {
    padding: 20px 0px 20px 0px;
}

.questionleft-arrow,
.questionright-arrow {
    transform: translate(0px, -10px);
}

.questiontext-sec {
    min-height: calc(100vh - 270px);
}


.question-option.selected {
    border-color: #D1D3D4;
    background-color: #D1D3D4;
}

.question-options.selected {
    border-color: #D1D3D4;
    background-color: #D1D3D4;
}

.question-option.breadcrumb-item {
    border-color: #D1D3D4;
    background-color: #D1D3D4;
}


.question-option input:focus {
    outline: none;
}

.question-option:focus {
    outline: none;
}

.question-options:focus {
    outline: none;
}

.question-option-arrows-wrapper {
    margin: 0px 25px;
}

.question-options-arrows-wrapper {
    margin: 0px 25px;
}

.question-option span {
    margin: 0px 5px 0px 0px;
}

.question-options span {
    margin: 0px 5px 0px 0px;
}

.questionleft-arrow,
.questionright-arrow {


    transform: translate(0px, 24px) !important;
}

section.questionnumber-sec {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 1rem;
    left: 0px;
}

.responsive-wrapper {
    width: 100%;
    max-width: 1440px;
    /* Adjust as needed */
    margin: 0 auto;
}

.square {
    background: #d2cbcb75 !important;
    font-size: 20px;
    cursor: pointer;
    color: black;
    height: 10vh !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    min-width: 38px !important;
    max-width: 38px !important;

}

.buttond {
    background-color: #ffffff00;
    box-shadow: none !important;
    height: auto;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    transform: translate(0px, -23px);
}


.scrollmenus {
    user-select: none;
    /* Prevents text selection during drag */
    cursor: grab;
}

div.scrollmenus {
    background-color: transparent;
    overflow: auto;
    white-space: nowrap;
    display: flex;
    width: 100%;
    align-items: center;
    overflow-y: hidden;
    height: 100px;
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* Internet Explorer */
}

div.scrollmenus::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Edge */
}

.scrollcenter {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 1rem;
}

.mainscrollview {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1240px;
    height: auto;
    min-height: 100px;
    padding: 28px 0px 0px 0px;
}


div.scrollmenu a {

    text-align: center;
    padding: 6px 3px;
    text-decoration: none;
    transition: all 0.4s ease;
    position: relative;
    height: 6vh;
    border: 1px solid grey;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 100%;
    max-width: 34px;
    min-width: 34px;
}

div.scrollmenu a:hover {
    border-radius: 0px;
    background-color: #858796 !important;
}


.active-question {
    font-weight: bold;
    color: black;
}

.scroll-container::-webkit-scrollbar {
    height: 8px;
}

.scroll-container::-webkit-scrollbar-thumb {
    background-color: #f39684;
    border-radius: 4px;
}

@media (min-width: 1200px) {
    .questionnumber-sec .container {
        max-width: 1310px;
    }
}

@media (min-width: 1200px) {
    .container {
        max-width: 1260px;
    }
}

.correct {
    background-color: #d4edda;
    /* light green */
    border-color: #28a745;
}

.wrong {
    background-color: #f8d7da;
    /* light red */
    border-color: #dc3545;
}
</style>