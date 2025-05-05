<template>

    <div v-if="loadingcircle">

        <Loadingcircle />
    </div>


    <div v-else>


        <HeaderQuestion :flagcounts="flagcounts" :remainingTimeInSeconds="remainingTimeInSeconds"
            :formattedTime="formattedTime" @birdseye="Showbirdeye" @showstoptimer="showstoptime"
            @startagain="startTimeing" @exitmock="exit" :stoptimerpopup="stoptimerpopup" :fillicon="fillicon"
            @returnquestion="getBackindexheader" />
        <div v-if="eye">


            <!-- <section class="questionnumber-sec">
                <div class="container">
                    <div class="questionnumber-slide-container" ref="container">
                        <div class="questionleft-arrow" @mouseenter="startScroll('left')" @mouseleave="stopScroll"
                            @mousedown="fastScroll('left')" @mouseup="stopScroll"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                <path d="m15 18-6-6 6-6" />
                            </svg></div>





                        <div class="slider-wrapper" v-if="renderReady">
                            <div class="questionnumber-slide  scrollmenu" ref="scrollContainer" :style="slideStyle">
                                <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber"
                                    :style="{
                                        background: nav.score
                                            ? '#d2cbcb'
                                            : (nav.flag
                                                ? 'white'
                                                : (nav.skip
                                                    ? 'white'
                                                    : 'white')),
                                    }" :class="{ 'activeindex': isPresentIndexs(indexnav) }"
                                    @click="getBackindex(indexnav)">
                                    {{ indexnav + 1 }}
                                   
                                    <svg v-if="nav.flag" class="red-flag" width="11" viewBox="0 0 19 17">
                                        <path
                                            d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                                            fill="#ED1C24" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        <div v-else class="slider-skeleton">
                            <span v-for="n in 10" :key="n" class="questionnumber skeleton"></span>
                        </div>




                        <div class="questionright-arrow" @mouseenter="startScroll('right')" @mouseleave="stopScroll"
                            @mousedown="fastScroll('right')" @mouseup="stopScroll">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section> -->


            <!-- New Scroller -->
            <section class="questionnumber-sec">
                <div class="scrollcenter" style="    padding-top: 5px; position:relative
            ">






                    <div class="mainscrollview">

                        <div class="buttond">



                            <div class="questionleft-arrow" @click="scrollBackward" @mouseup="stopScroll"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg></div>
                        </div>



                        <div class="questionnumber-slide  scrollmenus" ref="scrollContainer"
                            @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
                            @mouseleave="handleMouseLeave" :style="slideStyle">
                            <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber" :style="{
                                background: nav.score
                                    ? '#d2cbcb'
                                    : (nav.flag
                                        ? 'white'
                                        : (nav.skip
                                            ? 'white'
                                            : 'white')),
                            }" :class="{ 'activeindex': isPresentIndexs(indexnav) }" @click="getBackindex(indexnav)">
                                {{ indexnav + 1 }}

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





            <div class="questiontext-sec">
                <div class="container">
                    <div class="question-option-arrows-wrapper">
                        <transition name="fade" mode="out-in">
                            <div class="questiontext-box" v-if="currentQuestion" :key="currentQuestion.id">
                                <p>{{ currentQuestion.title }}</p>
                                <span class="questionflag">
                                    <svg v-if="flg && flg2 || currentQuestion.flag && flg2"
                                        @click="removeflage(currentQuestion.id)" width="19" height="17"
                                        viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z"
                                            fill="#ED1C24" />
                                    </svg>


                                    <svg v-if="!flg && !currentQuestion.flag || !flg2"
                                        @click="setflage(currentQuestion.id)" width="19" height="16" viewBox="0 0 19 16"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z"
                                            fill="#FAF8ED" stroke="#9A9898" stroke-width="2" />
                                    </svg>

                                    <span class="flag-hover-text">Flag Question</span>
                                </span>
                            </div>
                        </transition>
                        <transition name="fade" mode="out-in">
                            <div :key="currentQuestion.id">


                                <div class="question-alloptions" v-if="currentQuestion">
                                    <!-- <div v-for="option in currentQuestion.options"
                        :key="option.id" class="question-option"
                            :class="{ selected: selectedOption === option.id }" @click="selectOption(option.id)"
                            role="button" tabindex="0" @keydown.enter.space="selectOption(option.id)"
                            >
                            
                            <span class="option-letter">{{ option.id }}.</span>
                            {{ option.title }}
                        </div> -->
                                    <div v-for="(option, index) in currentQuestion.options" :key="option.id">


                                        <div class="input-field question-option"
                                            :class="{ selected: selectedOption === option.id }"
                                            @click="checkSelectedCondition(option.id)"
                                            @keydown.enter.space="checkSelectedCondition(option.id)">
                                            <input type="radio" :id="option.id" :value="option.id"
                                                v-model="selectedOption" />
                                            <!-- <label :for="option.id" >{{ option.title }}</label> -->
                                            <!-- <span class="option-letter">{{ index + 1 }}.</span> -->
                                            <span class="option-letter">{{ String.fromCharCode(65 + index) }}.</span>
                                            {{ option.title }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </transition>
                        <div class="questionsoptions-arrows">
                            <div class="questionoption-leftarrow" @click="previousQuestion()">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg>
                            </div>
                            <div class="questionoption-rightarrow" v-if="currentQuestionIndex === questions.length - 1"
                                @click="scoringpagess()">
                                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg> -->
                                Submit Mock
                            </div>

                            <div class="questionoption-rightarrow" v-else @click="nextQuestion()">
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
            </div>
        </div>


        <MockBirdsEye v-else :currentQuestionIndex="currentQuestionIndex" :allquestions="allquestions"
            :igonreunanswer="igonreunanswer" @getBackindex="getBackindex" @submitMock="scoringpagess" @closed="closed"
            @finalscroing="scoringpage" :unansweredmain="unansweredmain" />
    </div>

</template>


<script>

import HeaderQuestion from '@/components/HeaderQuestion.vue';
import { get, byMethod } from './lib/api';
import MockBirdsEye from './MockBirdsEye.vue';
import Loadingcircle from '@/components/Loadingcircle.vue';

export default {
    components: {

        HeaderQuestion,
        MockBirdsEye,
        Loadingcircle
    },


    data() {
        return {
            isDragging: false,
            dragStartX: 0,
            scrollLeftStart: 0,
            filleye: true,
            fillicon: 1,
            loadingcircle: true,
            renderReady: false,
            eye: true,
            currentIndex: 0,
            numbers: Array.from({ length: 200 }, (_, i) => i + 1),
            igonreunanswer: false,

            scrollDirection: null,
            selectedNumber: null,
            selectedNumbers: [],
            scrollSpeed: 70,
            numberWidth: 22,
            gap: 1,

            options: [
                { id: 'A', text: 'Primary billiary cholangitis' },
                { id: 'B', text: 'Pancreatic cancer' },
                { id: 'C', text: 'Cholecystitis' },
                { id: 'D', text: 'Alcoholic liver disease' },
                { id: 'E', text: 'Acute cholangitis' }
            ],
            showclock: false,
            loadershow: true,
            items: Array.from({ length: 180 }, (_, i) => i + 1), // Generates numbers from 1 to 180
            flaggedItems: [8, 14, 52, 110, 126, 144],
            dynamicOpacity: 1,
            reviewquest: false,
            showwarning: false,
            playagain: false,
            // showflagelist:'',s
            startingpoint: false,
            showflagelist: false,
            showunanswerlist: false,

            showreviewlist: false,
            showanswered: false,
            showbegin: true,
            startbeging: false,

            review: false,
            starts: true,
            currentscore: false,
            email: "",
            activeIndex: null,
            password: "",
            heading: "",
            heading2: "",
            heading3: "",
            counts: 0,
            duration: 0,
            selectedflag: 0,
            selectedanswered: 0,
            flagedid: 0,
            flg: false,
            stoptimerpopup: false,
            playicon: false,
            scrollInterval: null,


            id: null,
            form: {},
            method: "POST",
            questions: [],
            allquestions: [],
            currentQuestionIndex: 0,
            selectedOption: null,
            verificationStatus: this.$route.query.verification_status ? true : false,
            verificationMessage: "",
            imageUrl: null,
            file: null,
            verificationAlertClasses: {
                "alert-success": false,
                "alert-danger": false,
            },
            correct: 0,
            wrong: 0,
            correctanswer: 0,
            wronganswer: 0,
            remainingtime: 0,
            timer: null,
            remainingTimeInSeconds: 0,
            flagcounts: 0,
            unansweredquestionsdata: [],
            showansweredlist: false,
            showreview: false,
            reviewquestionsdata: [],
            indexnow: 0,
            tooltipVisible: false,
            tooltipText: '',
            tooltipTop: 0,
            tooltipLeft: 0,
            flg2: true,
            selectedOptions: null,
            currentselected: 0,
            truecondition: false,
            unansweredmain: 0,

            scores: [
                {
                    text: "Score",
                    options: ["Paris", "London", "Berlin", "Madrid"],
                },
            ],
        }
    },

    created() {
        this.id = this.$route.params.id;
        this.form.subcategory_id = this.id;
        console.log("ID:", this.id);
        const parentObject = JSON.parse(localStorage.getItem("mockObject"));
        const getabout = localStorage.getItem("question");
        const getquestionid = localStorage.getItem("questionid");

        console.log("getabout:", getabout);

        console.log("mockObject:", parentObject);
        this.duration = parentObject.duration;
        this.form.parent_id = parentObject.id;

        this.heading = parentObject.title;

        this.showflagelist = localStorage.getItem('breadcrumps');
        this.showunanswerlist = localStorage.getItem('breadcrumps');


        if (getabout == "normal") {
            get("/getmockquestion?id=" + this.id).then((res) => {
                this.setData(res);
            });
        }

        if (getabout == "flaged") {
            get("/getflagedquestion?id=" + this.id).then((res) => {
                this.setData(res);
            });
        }

        if (getabout == "unanswer") {
            get("/getunaswerquestion?id=" + this.id).then((res) => {
                this.setData(res);
            });
        }


        if (getabout == "unanswersolo") {
            get("/getunaswersoloquestion?id=" + getquestionid).then((res) => {
                this.setData(res);
            });
        }


        if (getabout == "unflagsolo") {
            get("/getflagedsoloquestion?id=" + getquestionid).then((res) => {
                this.setData(res);
            });


        }

        if (getabout == "exitmock") {
            console.log('hello world');
            get("/getmockquestion?id=" + this.id).then((res) => {
                this.setData(res);
                this.startTimers();
            });



        }


        this.getReviewsss()
        this.startTimer();
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

    // methods: {
    //     selectOption(optionId) {
    //         this.selectedOption = optionId
    //     },
    //     toggleNumber(number) {
    //         const index = this.selectedNumbers.indexOf(number);
    //         if (index > -1) {
    //             this.selectedNumbers.splice(index, 1);
    //         } else {
    //             this.selectedNumbers.push(number);
    //         }
    //     },
    //     calculateVisibleNumbers() {
    //         this.$nextTick(() => {
    //             if (this.$refs.container) {
    //                 const containerWidth = this.$refs.container.offsetWidth;
    //                 this.visibleNumbers = Math.floor(containerWidth / (this.numberWidth + this.gap));
    //             }
    //         });
    //     },
    //     startScroll(direction) {
    //         this.scrollDirection = direction;

    //         if (!this.scrollInterval) {
    //             this.scrollInterval = setInterval(() => {
    //                 if (this.scrollDirection === 'right' && this.currentIndex < this.maxIndex) {
    //                     this.currentIndex++;
    //                 } else if (this.scrollDirection === 'left' && this.currentIndex > 0) {
    //                     this.currentIndex--;
    //                 } else {
    //                     this.stopScroll();
    //                 }
    //             }, this.scrollSpeed);
    //         }
    //     },
    //     stopScroll() {
    //         if (this.scrollInterval) {
    //             clearInterval(this.scrollInterval);
    //             this.scrollInterval = null;
    //         }
    //     }
    // },


    methods: {

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

        closed() {
            this.igonreunanswer = false

        },


        Showbirdeye() {

            console.log('birdeye')

            this.eye = false

            this.fillicon = 0

        },

        selectOption(optionId) {
            this.selectedOption = optionId
        },
        toggleNumber(number) {
            const index = this.selectedNumbers.indexOf(number);
            if (index > -1) {
                this.selectedNumbers.splice(index, 1);
            } else {
                this.selectedNumbers.push(number);
            }
        },
        calculateVisibleNumbers() {
            this.$nextTick(() => {
                if (this.$refs.container) {
                    const containerWidth = this.$refs.container.offsetWidth;
                    this.visibleNumbers = Math.floor(containerWidth / (this.numberWidth + this.gap));
                }
            });
        },
        startScroll(direction) {
            console.log('direct', this.currentIndex, this.maxIndex)
            this.scrollDirection = direction;

            if (!this.scrollInterval) {
                this.scrollInterval = setInterval(() => {
                    if (this.scrollDirection === 'right' && this.currentIndex < this.maxIndex) {
                        this.currentIndex++;
                    } else if (this.scrollDirection === 'left' && this.currentIndex > 0) {
                        this.currentIndex--;
                    } else {
                        this.stopScroll();
                    }
                }, this.scrollSpeed);
            }
        },


        fastScroll(direction) {
            this.scrollDirection = direction;

            if (this.scrollInterval) clearInterval(this.scrollInterval);

            this.scrollInterval = setInterval(() => {
                if (direction === 'right' && this.currentIndex < this.maxIndex) {
                    this.currentIndex += 8; // scroll faster by incrementing more
                } else if (direction === 'left' && this.currentIndex > 0) {
                    this.currentIndex -= 8;
                } else {
                    this.stopScroll();
                }
            }, this.scrollSpeed / 2); // faster interval
        },
        stopScroll() {
            if (this.scrollInterval) {
                clearInterval(this.scrollInterval);
                this.scrollInterval = null;
            }
        },


        // scrollToActiveItem() {
        //     this.$nextTick(() => {
        //         const scrollContainer = this.$refs.scrollContainer;
        //         const activeItem = scrollContainer.querySelector(".activeindex");

        //         if (activeItem) {
        //             const containerWidth = scrollContainer.clientWidth;


        //             const itemWidth = activeItem.clientWidth;
        //             const itemOffsetLeft = activeItem.offsetLeft;
        //             console.log('containwidth', containerWidth, itemWidth, itemOffsetLeft);


        //             // Center the active item
        //             const scrollPosition = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);
        //             scrollContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
        //         }
        //     });
        // },
        backtomock() {

            this.$router.push("/mocks").then(() => {
                // window.location.reload();

            });


        },


        scrollToActiveItem() {
            this.$nextTick(() => {
                const scrollContainer = this.$refs.scrollContainer;
                const activeItem = scrollContainer.querySelector(".square");

                if (activeItem) {
                    const containerWidth = scrollContainer.clientWidth;
                    const itemWidth = activeItem.clientWidth;
                    const itemOffsetLeft = activeItem.offsetLeft;

                    // Center the active item
                    const scrollPosition = itemOffsetLeft - (containerWidth / 2) + (itemWidth / 2);
                    scrollContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
                }
            });
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
        clockvisible() {
            this.showclock = !this.showclock;

        },


        exit() {


            get(`/exitmock?id=${this.id}&index=${this.currentQuestionIndex}&remain=${this.remainingTimeInSeconds}`).then((res) => {
                console.log(res)
                this.$router.push('/mocksection');
            });


            // this.$router.push('/mocks')

        },

        reviewquestioncheck() {

            get("/getmockquestion?id=" + this.id).then((res) => {
                this.setData(res);
            });

        },

        getLabelStyle(option) {



            if (this.currentQuestion.score) {
                console.log("getLabelStyle")


                if (option.id == this.currentQuestion.score.option_id) {
                    console.log("now")
                    return {
                        border: '2px solid #63b045',
                        background: '#63b045',
                        color: 'white'
                    };
                } else {
                    return {
                        border: '2px solid red',
                        background: 'red',
                        color: 'white'
                    };
                }
            }
            else {
                return {}
            }
        },


        scrollForward() {
            this.$refs.scrollContainer.scrollLeft += 1500; // Scroll forward by 200px
        },
        scrollBackward() {
            this.$refs.scrollContainer.scrollLeft -= 1500; // Scroll backward by 200px
        },


        // handleMouseMove(event) {
        //     const bounds = event.currentTarget.getBoundingClientRect();
        //     const hoverZone = 300; // Define hover zone in pixels
        //     const mouseX = event.clientX;

        //     if (mouseX > bounds.right - hoverZone) {
        //         // Mouse is on the right side
        //         this.startScrolling(8); // Adjust speed as necessary
        //     } else if (mouseX < bounds.left + hoverZone) {
        //         // Mouse is on the left side
        //         this.startScrolling(-8); // Adjust speed as necessary
        //     } else {
        //         // Stop scrolling when mouse is not in hover zones
        //         this.stopScrolling();
        //     }
        // },
        // startScrolling(speed) {
        //     if (!this.scrollInterval) {
        //         this.scrollInterval = setInterval(() => {
        //             this.$refs.scrollContainer.scrollLeft += speed;
        //         }, 20); // Adjust interval as necessary
        //     }
        // },

        startScrolling(speed) {
            if (!this.scrollInterval) {
                this.scrollInterval = setInterval(() => {
                    this.$refs.scrollContainer.scrollLeft += speed;
                }, 20);
            }
        },

        stopScrolling() {
            clearInterval(this.scrollInterval);
            this.scrollInterval = null;
        },






        cancelwarning() {
            this.dynamicOpacity = 1
            this.showwarning = false

        },


        cancelPlatpop() {
            this.playagain = false

        },

        stoptimernow() {

            this.playicon = true
            this.stoptimerpopup = false;
            this.dynamicOpacity = 1

            this.stopTimerAndSaveDuration()


        },


        showstoptime() {




            localStorage.setItem("pauseindex", this.currentQuestionIndex);



            // this.stoptimerpopup = true;

            // setTimeout(() => {
            //     this.stoptimerpopup = true;
            // }, 100); 

            // this.playicon = true
            this.stopTimerAndSaveDuration()

            // this.reviewquest = true
            // this.dynamicOpacity = 0.2

        },

        isPresentIndex(indexnav) {
            const presentindex = localStorage.getItem('presentindex');
            console.log(presentindex);

            // If presentindex is in local storage, compare it with indexnav
            return presentindex !== null && parseInt(presentindex, 10) === indexnav;
        },


        isPresentIndexs(indexnav) {
            //   const presentindex = localStorage.getItem('presentindex');
            const presentindex = this.currentQuestionIndex
            console.log(presentindex);

            // If presentindex is in local storage, compare it with indexnav
            return presentindex !== null && parseInt(presentindex, 10) === indexnav;
        },

        showTooltip(event, nav) {
            this.tooltipText = this.getTooltipText(nav);
            this.tooltipVisible = true;
            this.tooltipTop = event.clientY + 10; // Adjust for tooltip positioning
            this.tooltipLeft = event.clientX + 10; // Adjust for tooltip positioning
        },
        hideTooltip() {
            this.tooltipVisible = false;
        },
        getTooltipText(nav) {
            if (nav.flag) {
                return 'Flagged';
            } else if (nav.score) {
                return 'Attempted';
            } else {
                return 'Unanswered';
            }
        },
        startbeginfunction() {
            this.startbeging = true;
            this.showbegin = false;
            this.startingpoint = true
            this.startTimer();
        },

        openmodal() {
            // $("#exampleModalCenters").modal("show");

        },



        scoringpagess() {


            this.nextQuestion()
            setTimeout(() => {

                if (this.unanswered > 0) {
                    this.igonreunanswer = true

                    // $('#exampleModalCenters').modal('show');



                    console.log('here')

                }
                else {
                    this.igonreunanswer = false
                    this.scoringpage()
                }
            }, 200);
        },

        scoringpage() {
            this.igonreunanswer = false


            // $('#exampleModalCenters').modal('hide');
            get("/removeexits?id=" + this.id).then((res) => {
                console.log(res)
                this.handleBreadcrumpsUpdate('Normal');


                localStorage.setItem('breadcrumps', 'Normal');
                // this.$router.push('/mockscore')
                this.$router.push({ path: `/mockscore/${this.id}` });

            });


        },

        Getflagequestion() {


            localStorage.setItem('breadcrumps', 'Flaged Question');

            this.review = false;
            this.starts = true;
            this.stopTimerAndSaveDuration();



            localStorage.setItem("question", "flaged");
            setTimeout(() => {
                window.location.reload();
            }, 1000);


        },

        Getunanswerquestion() {

            localStorage.setItem('breadcrumps', 'Unanswer Question');

            this.review = false;
            this.starts = true;
            //   this.showflagelist = true

            this.stopTimerAndSaveDuration();



            localStorage.setItem("question", "unanswer");
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            //   this.showflagelist = true

            //     get("/getflagedquestion?id=" + this.id).then((res) => {
            //   this.setData(res);

            // });
        },




        Getunanswersoloquestion(e) {

            localStorage.setItem('breadcrumps', 'Unanswer Question');
            this.review = false;
            this.starts = true;
            this.stopTimerAndSaveDuration();

            localStorage.setItem("question", "unanswersolo");
            localStorage.setItem("questionid", e);

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        },



        Getflagedsoloquestion(e) {
            this.review = false;
            this.starts = true;
            this.stopTimerAndSaveDuration();

            localStorage.setItem("question", "unflagsolo");
            localStorage.setItem("questionid", e);

            localStorage.setItem('breadcrumps', 'Flaged Question');

            setTimeout(() => {
                window.location.reload();
            }, 1000);

        },


        flagged(e) {
            this.form.questionId = e;
            byMethod(this.method, "/saveflage", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);
                    this.$nextTick(() => {
                        this.scrollToActiveItem();
                    });

                    this.getFlaged();
                    this.getReviewsss()
                    this.centerSelectedIndex(this.currentQuestionIndex)
                }
            });
        },


        removeflage(e) {
            this.form.questionId = e;
            byMethod(this.method, "/removeflage", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);

                    this.flg = false
                    this.flg2 = false

                    this.getFlaged();
                    this.getReviewsss()
                    this.centerSelectedIndex(this.currentQuestionIndex)

                }
            });

        },


        saveSkip(e) {
            this.form.questionId = e;
            byMethod(this.method, "/saveskip", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);



                    this.nextQuestion();

                    this.getReviewsss()

                }
            });
        },



        setflage(e) {
            this.flagedid = e;
            this.flg = true
            this.flg2 = true
            this.flagged(this.flagedid)
        },

        getFlaged() {
            get("/getflagedcount?id=" + this.id).then((res) => {
                console.log(res.data.data);
                this.flagcounts = res.data.data;
                //   this.setData(res);
            });
        },




        startTimer() {

            this.dynamicOpacity = 1

            this.stoptimerpopup = false;
            console.log("Starting", this.duration);


            const storedDuration = parseInt(localStorage.getItem("remainingsec"));
            if (storedDuration) {
                this.remainingTimeInSeconds = storedDuration;
            }



            else {
                this.remainingTimeInSeconds = this.duration * 60;
            }
            this.timer = setInterval(() => {
                if (this.remainingTimeInSeconds > 0) {
                    this.remainingTimeInSeconds--;

                    if (this.remainingTimeInSeconds === 600) {
                        // this.$toast.warning("10 minutes remaining!");

                        // this.$toast.warning("10 minutes remaining!", {
                        //     duration: 10000,
                        // });

                    }

                    if (this.remainingTimeInSeconds === 60) {
                        // this.$toast.warning("1 minute remaining!");

                        // this.$toast.warning("1 minute remaining!", {
                        //     duration: 10000,
                        // });
                    }
                } else {
                    console.log("Stopping timersss");
                    // this.$toast.error("Your Time Finished");
                    // this.getReviews();
                    this.scoringpage();
                    clearInterval(this.timer);
                }
            }, 1000);
            this.playicon = false
        },


        startTimeing() {

            this.dynamicOpacity = 1

            this.stoptimerpopup = false;
            console.log("Starting", this.duration);
            this.getBackindex(this.currentQuestionIndex)


            const storedDuration = parseInt(localStorage.getItem("remainingsec"));
            if (storedDuration) {
                this.remainingTimeInSeconds = storedDuration;
            }



            else {
                this.remainingTimeInSeconds = this.duration * 60;
            }
            this.timer = setInterval(() => {
                if (this.remainingTimeInSeconds > 0) {
                    this.remainingTimeInSeconds--;

                    if (this.remainingTimeInSeconds === 600) {
                        // this.$toast.warning("10 minutes remaining!");

                        // this.$toast.warning("10 minutes remaining!", {
                        //     duration: 10000,
                        // });

                    }

                    if (this.remainingTimeInSeconds === 60) {
                        // this.$toast.warning("1 minute remaining!");

                        // this.$toast.warning("1 minute remaining!", {
                        //     duration: 10000,
                        // });
                    }
                } else {
                    console.log("Stopping timersss");
                    // this.$toast.error("Your Time Finished");
                    // this.getReviews();
                    this.scoringpage();
                    clearInterval(this.timer);
                }
            }, 1000);
            this.playicon = false
        },



        startTimers() {



            this.stoptimerpopup = true;
            console.log("Starting", this.duration);


            const storedDuration = parseInt(localStorage.getItem("remainingsec"));
            if (storedDuration) {
                this.remainingTimeInSeconds = storedDuration;
            }

            const getabouts = localStorage.getItem("question");

            if (getabouts == "exitmock") {
                console.log("questions", this.currentQuestion)

                this.currentQuestionIndex = this.currentQuestion.mocks.exit.current_index;
                this.remainingTimeInSeconds = this.currentQuestion.mocks.exit.remaining_time;

                localStorage.setItem("remainingsec", this.remainingTimeInSeconds);

                this.startbeging = true;
                this.showbegin = false;
                this.startingpoint = true;
                // this.stoptimerpopup = true;
                this.showstoptime();





            }

            else {
                this.remainingTimeInSeconds = this.duration * 60;
            }
            this.stopTimer();


        },

        stopTimer() {
            console.log("Stopping timer");
            clearInterval(this.timer);
        },

        stopTimerAndSaveDuration() {
            if (this.timer) {
                clearInterval(this.timer); // Stop the timer
                console.log(this.remainingTimeInSeconds);
                this.duration = Math.floor(this.remainingTimeInSeconds / 60);
                localStorage.setItem("remainingsec", this.remainingTimeInSeconds);

                let parentObject = JSON.parse(localStorage.getItem("mockObject"));

                if (parentObject) {
                    // Update the duration in the local storage object
                    parentObject.duration = this.duration;

                    // Save the updated object back to localStorage
                    localStorage.setItem("mockObject", JSON.stringify(parentObject));

                    console.log("Updated duration saved to localStorage:", parentObject);
                } else {
                    console.log("mockObject not found in localStorage");
                }

                console.log("Timer stopped. Remaining time:", this.duration);
            }
        },

        commentsave(e) {
            console.log("id", e);
            this.form.question_id = e;

            byMethod(this.method, "/addcomment", this.form)
                .then((res) => {
                    if (res.data.saved) {
                        console.log(res.data.saved);
                        alert("Comment saved");
                        get("/getquestion?id=" + this.id).then((res) => {
                            this.setData(res);
                            this.form.question_id = null;
                            this.form.comments = "";
                        });
                    }
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.isProcessing = false;
                });
        },






        setInitialSelectedOption() {
            if (!this.currentQuestion || !this.currentQuestion.options) {
                console.warn("currentQuestion or options is undefined.");
                return; // Exit function early to prevent errors
            }
            console.log('hello', this.currentQuestion);
            const optionWithScore = this.currentQuestion.options.find(
                (option) => option.score !== null
            );
            if (optionWithScore) {
                // Set selectedOption to option.id, not the whole option
                this.selectedOption = optionWithScore.id;
            }
        },

        toggle(index) {
            this.activeIndex = this.activeIndex === index ? null : index;
        },
        setData(res) {
            this.questions = res.data.data;

            this.$nextTick(() => {

                requestAnimationFrame(() => {
                    console.log("Total questions after render:", this.questions.length);

                    this.loadingcircle = false;
                    this.renderReady = true;
                    //   setTimeout(() => {
                    //     this.renderReady = true;
                    //   }, 1000);
                });

                // console.log("Total questions after reactivity update:", this.questions.length);

                // this.counts = this.questions.length;
                // this.loadingcircle = false;
            });

            console.log(res.data.data);
            this.resetSelectedOption();
            this.loadershow = false
            window.scrollTo(0, 0);
            // this.loadingcircle = false
        },
        nextQuestion() {
            console.log('hello last')


            console.log('selected option', this.selectedOption)
            this.flg = false


            const ppp = localStorage.getItem("pauseindex");

            if (this.playicon && this.currentQuestionIndex >= ppp) {

                // this.$toast.error('To continue attempting questions, please play timer again')
                this.playagain = true
            }
            else {

                if (this.truecondition) {
                    this.submitAnswer()

                }


                console.log("sss");
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.currentQuestionIndex++;
                    this.truecondition = false
                    this.$nextTick(() => {
                        // this.scrollToActiveItem();
                        this.centerSelectedIndex(this.currentQuestionIndex)
                    });
                    // this.resetSelectedOption();
                } else {
                    // this.stopTimerAndSaveDuration()
                    this.truecondition = false
                    // alert("All questions done");
                    // this.getReviews();
                    // this.getReviewsss()
                }

            }
        },
        previousQuestion() {


            this.flg2 = true





            if (this.currentQuestionIndex > 0) {

                this.reviewquestioncheck()
                this.currentQuestionIndex--;
                // this.resetSelectedOption();

                this.$nextTick(() => {
                    this.scrollToActiveItem();
                });
            }

        },
        resetSelectedOption() {
            this.selectedOption = null;
        },


        checkSelectedCondition(e) {



            console.log('true condition', this.selectedOption, this.currentselected)


            if (this.currentselected === e) {
                this.truecondition = false
                this.selectedOption = null;

            }

            else {
                this.currentselected = e
                this.truecondition = true
                this.selectedOption = e
            }
            this.centerSelectedIndex(this.currentQuestionIndex)
            console.log('true condition', this.truecondition)

        },
        submitAnswer(e) {

            if (this.playicon) {

                // this.$toast.error('To continue attempting questions, please play timer again')
                this.playagain = true
            }

            else {

                console.log('current question', this.currentQuestion)




                // if(this.flg){
                //     this.flagged(this.flagedid)
                //     console.log('taba ')

                // }

                // else{


                console.log("here", e);
                // this.form.question_id = e;
                this.form.question_id = this.currentQuestion.id;

                //   this.form.correct = this.selectedOption.correct;
                this.form.option_id = this.selectedOption;

                // handle answer submission logic
                console.log("Selected option:", this.selectedOption, "selected question", e);

                byMethod(this.method, "/createmockscore", this.form)
                    .then((res) => {
                        if (res.data.saved) {
                            console.log(res.data.saved);
                            // this.selectedOption = null;
                            // this.nextQuestion();
                            // this.$toast.success('Option Selected')
                            // setTimeout(() => {
                            get("/getmockquestion?id=" + this.id).then((res) => {
                                this.allquestions = res.data.data

                            });
                            this.getReviewsss()
                            // this.nextQuestion();
                            // }, 500);
                        }
                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors;
                        }
                        this.isProcessing = false;
                    });
                // }

            }
        },

        getScore() {
            console.log("hello");

            get("/getscore?id=" + this.id).then((res) => {
                this.currentscore = true;
                this.correct = res.data.correct;
                this.wrong = res.data.wrong;
                this.correctanswer = res.data.correctanswer;
                this.wronganswer = res.data.wronganswer;
                this.setData(res);

                this.review = true;
                this.starts = false;
            });
        },

        getReviews(e) {

            console.log('hereeeee')

            if (this.playicon) {

                // this.$toast.error('To continue attempting questions, please play timer again')
                this.playagain = true
            }

            else {



                console.log(e)
                this.indexnow = e

                localStorage.setItem('presentindex', e);



                get("/getmockreview?id=" + this.id).then((res) => {
                    // this.setData(res);



                    this.unanswered = res.data.unanswered;
                    this.unansweredmain = res.data.unansweredmain;

                    this.flagcounts = res.data.flagcount;
                    this.form.unansweredid = res.data.unansweredid;
                    this.form.flaggedid = res.data.flagedid;
                    this.review = true;
                    this.starts = false;
                });


                setTimeout(() => {
                    get("/getmockquestion?id=" + this.id).then((res) => {
                        this.allquestions = res.data.data
                        this.setData(res);
                    });
                }, 500);

            }
        },



        getReviewsss(e) {

            console.log(e)
            this.indexnow = e

            localStorage.setItem('presentindex', e);



            get("/getmockreview?id=" + this.id).then((res) => {


                console.log('respo', res.data.unanswered)

                this.unanswered = res.data.unanswered;
                this.unansweredmain = res.data.unansweredmain;

                this.flagcounts = res.data.flagcount;
                this.form.unansweredid = res.data.unansweredid;
                this.form.flaggedid = res.data.flagedid;

            });


            setTimeout(() => {
                get("/getmockquestion?id=" + this.id).then((res) => {
                    this.allquestions = res.data.data

                });
            }, 500);
        },


        getBack() {

            this.showflagelist = false
            this.showunanswerlist = false

            // this.currentQuestionIndex = 5
            this.review = false;
            this.starts = true;
            this.handleBreadcrumpsUpdate('Normal');
        },


        getBackindex(e) {

            // this.scrollToActiveItem()
            this.centerSelectedIndex(e)

            console.log('getback', e)
            this.flg = false
            this.showflagelist = false
            this.showunanswerlist = false
            this.fillicon = 1


            console.log('', e);

            localStorage.setItem('presentindex', e);

            localStorage.setItem('breadcrumps', 'Normal');
            this.currentQuestionIndex = e
            this.review = false;
            this.starts = true;
            this.eye = true
            this.handleBreadcrumpsUpdate('Normal');

        },



        getBackindexheader() {


            this.flg = false
            this.showflagelist = false
            this.showunanswerlist = false
            this.fillicon = 1




            localStorage.setItem('presentindex', this.currentQuestionIndex);

            localStorage.setItem('breadcrumps', 'Normal');

            this.review = false;
            this.starts = true;
            this.eye = true
            this.handleBreadcrumpsUpdate('Normal');

        },




        handleBreadcrumpsUpdate(newBreadcrumps) {
            // Update the breadcrumps value
            this.breadcrumps = newBreadcrumps;
        },

        Getunanswerquestions() {
            byMethod(this.method, "/unansweredquestions", this.form)
                .then((res) => {
                    this.unansweredquestionsdata = res.data.data;
                    this.showanswered = true;
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.isProcessing = false;
                });
        },

        Getunanswerquestionslist() {
            this.review = false;
            this.showansweredlist = true;
        },


        Getreviewquestionslist() {
            this.review = false;
            this.showreviewlist = true;
        },


        Getflagequestions() {
            byMethod(this.method, "/reviewquestions", this.form)
                .then((res) => {
                    this.reviewquestionsdata = res.data.data;
                    this.showreview = true;
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.isProcessing = false;
                });
        },
    },

    mounted() {

        this.setInitialSelectedOption();
        if (this.currentQuestion.score && this.currentQuestion.score.option_id) {
            this.selectedOptions = this.currentQuestion.score.option_id;
        }
        this.calculateVisibleNumbers();
        window.addEventListener('resize', this.calculateVisibleNumbers);



        setTimeout(() => {
            // this.animateButtons();
            document.querySelectorAll(".Login-BTN").forEach((el, index) => {
                setTimeout(() => {
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, index * 300); // Har card 0.3s delay se aaye
            });
        }, 200);




        document.body.style.opacity = 0;
        setTimeout(() => {
            document.body.style.transition = "opacity 1s";
            document.body.style.opacity = 1;
        }, 100);
    },
    computed: {

        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },

        formattedTime() {

            console.log('second ', this.remainingTimeInSeconds)
            const hours = Math.floor(this.remainingTimeInSeconds / 3600);
            const minutes = Math.floor((this.remainingTimeInSeconds % 3600) / 60);
            const seconds = this.remainingTimeInSeconds % 60;

            return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        },

        groupedItems() {
            const rows = [];
            for (let i = 0; i < this.items.length; i += 25) {
                rows.push(this.items.slice(i, i + 25));
            }
            return rows;
        },
        maxIndex() {
            const totalWidth = (this.numberWidth + this.gap) * this.allquestions.length;
            const containerWidth = this.$refs.container?.offsetWidth || 0;
            return Math.max(0, Math.ceil((totalWidth - containerWidth) / (this.numberWidth + this.gap)));
        },
        slideStyle() {
            return {
                transform: `translateX(-${this.currentIndex * (this.numberWidth + this.gap)}px)`,
                transition: this.scrollInterval ? 'transform 0.3s linear' : 'transform 0.3s ease-in-out'
            };
        }
    },
    beforeDestroy() {
        this.stopTimer();
        window.removeEventListener('resize', this.calculateVisibleNumbers);
    },


}
</script>


<style scoped>


.questionleft-arrow, .questionright-arrow {
  

    transform: translate(0px, 23px) !important;
}
section.questionnumber-sec {
    display: flex;
    justify-content: center;
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
    padding-bottom: 20px;
    overflow-y: hidden;
    height: 15vh;
    padding-bottom: 20px;
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
    max-width: 1290px;
}

.mainscrollview {
    display: flex;
    justify-content: center;

    border-radius: 50px;
    padding: 0px;
    height: 17vh;
    max-width: 1290px;
    overflow-x: hidden;
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

.buttond {
    background-color: #ffffff00;
    box-shadow: none !important;
    height: 14vh;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    padding-bottom: 5px;
}

.scroll-btn {
    padding: 0px;
    background-color: transparent;
    color: white;
    border: none;
    border-radius: 50px;

    cursor: pointer;

}

button.scroll-btn svg :hover {
    fill: black;
}









.skeleton {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin: 0 4px;
    background: #eee;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
}

@keyframes pulse {
    0% {
        opacity: 0.6;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.6;
    }
}

.input-field input[type="radio"] {

    opacity: 0 !important;
    width: 0px;
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
    align-items: center;
    background: white;
    margin: 0px 0px 22px 0px;
}

.question-option.selected {
    border-color: #D1D3D4;
    background-color: #D1D3D4;
}


.question-option input:focus {
    outline: none;
}

.question-option:focus {
    outline: none;
}

.question-option-arrows-wrapper {
    margin: 0px 25px;
}

.question-option span {
    margin: 0px 5px 0px 0px;
}
</style>