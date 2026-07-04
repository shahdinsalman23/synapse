<template>
    <div>
        <QuestionHeader @showbirds="showbirds" @back="returnFromQuestionViaHeaderBack"
            :flagcounts="flagcounts" :incorrectcount="incorrectcount"
            :correctcount="correctcount" :percentage="percentage" />


        <section class="question-breadcrum">
            <div class="container">
                <div class="breadcrumb">
                    <span
                        v-for="(label, idx) in breadcrumbItems"
                        :key="'breadcrumb-seg-' + idx"
                        class="breadcrumb-segment"
                    >
                        <span v-if="idx > 0" class="breadcrumb-arrow">›</span>
                        <span
                            class="breadcrumb-item"
                            :class="{ active: idx === breadcrumbItems.length - 1 }"
                            :style="idx < breadcrumbItems.length - 1 ? 'cursor:pointer' : ''"
                            @click="handleBreadcrumbClick(idx)"
                        >{{ label }}</span>
                    </span>
                </div>
            </div>
        </section>


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
                            <div class="questionnumber-slide scrollmenus" ref="scrollContainer"
                                :class="{ 'scrollmenus--dragging': isDragging }"
                                @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp"
                                :style="slideStyle">
                                <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber"
                                    :style="{
                                        background: Number(nav.score?.correct) === 1
                                            ? '#9ded6c'
                                            : (nav.score?.correct != null && Number(nav.score?.correct) !== 1 ?
                                                '#ffbabe'
                                                : nav.flag
                                                    ? '#f1f2f2'
                                                    : (nav.skip
                                                        ? '#f1f2f2'
                                                        : '#f1f2f2')),
                                    }"
                                    :class="{ 'activeindexs': isPresentIndexs(indexnav) }"
                                    @click="onScrollerItemClick(indexnav)">
                                    <svg class="scroller-flag-icon" :style="{ opacity: nav.flag ? 1 : 0 }" width="9"
                                        viewBox="0 0 19 17">
                                        <path
                                            d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                                            fill="#ED1C24" />
                                    </svg>

                                    <span class="scroller-num">{{
                                         indexnav + 1 ?? nav.question_no }}</span>

                                    <svg class="scroller-feedback-icon" :style="{ opacity: nav.feedback ? 1 : 0 }"
                                        width="10" height="11" viewBox="0 0 20 21" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.41003 1.45117C1.79003 1.45117 1.29004 1.95117 1.29004 2.57117V13.6912C1.29004 14.3112 1.79003 14.8112 2.41003 14.8112H3.73999C4.03999 14.8112 4.28003 15.0512 4.28003 15.3512V18.8812L7.75 14.9912C7.85 14.8812 8.00002 14.8112 8.15002 14.8112H17.25C17.87 14.8112 18.37 14.3112 18.37 13.6912V2.57117C18.37 1.95117 17.87 1.45117 17.25 1.45117H2.40002H2.41003Z"
                                            fill="#FFF200" />
                                        <path
                                            d="M3.75 20.8213C3.69 20.8213 3.62006 20.8113 3.56006 20.7813C3.35006 20.7013 3.20996 20.5013 3.20996 20.2813V15.8813H2.41003C1.20003 15.8813 0.209961 14.8913 0.209961 13.6813V2.56134C0.209961 1.35134 1.20003 0.361328 2.41003 0.361328H17.26C18.47 0.361328 19.46 1.35134 19.46 2.56134V13.6813C19.46 14.8913 18.47 15.8813 17.26 15.8813H8.40002L4.15002 20.6413C4.05002 20.7613 3.9 20.8213 3.75 20.8213ZM2.42004 1.45132C1.80004 1.45132 1.30005 1.95132 1.30005 2.57132V13.6913C1.30005 14.3113 1.80004 14.8113 2.42004 14.8113H3.75C4.05 14.8113 4.29004 15.0513 4.29004 15.3513V18.8813L7.76001 14.9913C7.86001 14.8813 8.01003 14.8113 8.16003 14.8113H17.26C17.88 14.8113 18.38 14.3113 18.38 13.6913V2.57132C18.38 1.95132 17.88 1.45132 17.26 1.45132H2.41003H2.42004Z"
                                            fill="#FBAD18" />
                                        <path
                                            d="M14.7601 10.1913H5.66016C5.36016 10.1913 5.12012 9.95134 5.12012 9.65134C5.12012 9.35134 5.36016 9.11133 5.66016 9.11133H14.7601C15.0601 9.11133 15.3002 9.35134 15.3002 9.65134C15.3002 9.95134 15.0601 10.1913 14.7601 10.1913Z"
                                            fill="#FBAD18" />
                                        <path
                                            d="M14.7601 6.69135H5.66016C5.36016 6.69135 5.12012 6.45134 5.12012 6.15134C5.12012 5.85134 5.36016 5.61133 5.66016 5.61133H14.7601C15.0601 5.61133 15.3002 5.85134 15.3002 6.15134C15.3002 6.45134 15.0601 6.69135 14.7601 6.69135Z"
                                            fill="#FBAD18" />
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
                                <p v-if="currentQuestionCodeLabel" class="currentquestionnumber">
                                    {{ currentQuestionCodeLabel }}
                                </p>
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

                                <!-- Feedback icon — only shown after question is attempted -->
                                <div v-if="currentQuestion?.score" class="questioncomment">
                                    <button @click="openFeedbackPopup" class="feedbackbutton">
                                        <svg v-if="currentQuestion.feedback" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2.41003 1.45117C1.79003 1.45117 1.29004 1.95117 1.29004 2.57117V13.6912C1.29004 14.3112 1.79003 14.8112 2.41003 14.8112H3.73999C4.03999 14.8112 4.28003 15.0512 4.28003 15.3512V18.8812L7.75 14.9912C7.85 14.8812 8.00002 14.8112 8.15002 14.8112H17.25C17.87 14.8112 18.37 14.3112 18.37 13.6912V2.57117C18.37 1.95117 17.87 1.45117 17.25 1.45117H2.40002H2.41003Z" fill="#FFF200" />
                                            <path d="M3.75 20.8213C3.69 20.8213 3.62006 20.8113 3.56006 20.7813C3.35006 20.7013 3.20996 20.5013 3.20996 20.2813V15.8813H2.41003C1.20003 15.8813 0.209961 14.8913 0.209961 13.6813V2.56134C0.209961 1.35134 1.20003 0.361328 2.41003 0.361328H17.26C18.47 0.361328 19.46 1.35134 19.46 2.56134V13.6813C19.46 14.8913 18.47 15.8813 17.26 15.8813H8.40002L4.15002 20.6413C4.05002 20.7613 3.9 20.8213 3.75 20.8213ZM2.42004 1.45132C1.80004 1.45132 1.30005 1.95132 1.30005 2.57132V13.6913C1.30005 14.3113 1.80004 14.8113 2.42004 14.8113H3.75C4.05 14.8113 4.29004 15.0513 4.29004 15.3513V18.8813L7.76001 14.9913C7.86001 14.8813 8.01003 14.8113 8.16003 14.8113H17.26C17.88 14.8113 18.38 14.3113 18.38 13.6913V2.57132C18.38 1.95132 17.88 1.45132 17.26 1.45132H2.41003H2.42004Z" fill="#FBAD18" />
                                            <path d="M14.7601 10.1913H5.66016C5.36016 10.1913 5.12012 9.95134 5.12012 9.65134C5.12012 9.35134 5.36016 9.11133 5.66016 9.11133H14.7601C15.0601 9.11133 15.3002 9.35134 15.3002 9.65134C15.3002 9.95134 15.0601 10.1913 14.7601 10.1913Z" fill="#FBAD18" />
                                            <path d="M14.7601 6.69135H5.66016C5.36016 6.69135 5.12012 6.45134 5.12012 6.15134C5.12012 5.85134 5.36016 5.61133 5.66016 5.61133H14.7601C15.0601 5.61133 15.3002 5.85134 15.3002 6.15134C15.3002 6.45134 15.0601 6.69135 14.7601 6.69135Z" fill="#FBAD18" />
                                        </svg>
                                        <svg v-else width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.75 20.8584C3.69 20.8584 3.62006 20.8485 3.56006 20.8185C3.35006 20.7385 3.20996 20.5385 3.20996 20.3185V15.9185H2.41003C1.20003 15.9185 0.209961 14.9284 0.209961 13.7184V2.59845C0.209961 1.38845 1.20003 0.398438 2.41003 0.398438H17.26C18.47 0.398438 19.46 1.38845 19.46 2.59845V13.7184C19.46 14.9284 18.47 15.9185 17.26 15.9185H8.40002L4.15002 20.6784C4.05002 20.7984 3.9 20.8584 3.75 20.8584ZM2.42004 1.48843C1.80004 1.48843 1.30005 1.98843 1.30005 2.60843V13.7285C1.30005 14.3485 1.80004 14.8484 2.42004 14.8484H3.75C4.05 14.8484 4.29004 15.0885 4.29004 15.3885V18.9185L7.76001 15.0284C7.86001 14.9184 8.01003 14.8484 8.16003 14.8484H17.26C17.88 14.8484 18.38 14.3485 18.38 13.7285V2.60843C18.38 1.98843 17.88 1.48843 17.26 1.48843H2.41003H2.42004Z" fill="#8698A2" />
                                            <path d="M14.7601 10.2285H5.66016C5.36016 10.2285 5.12012 9.98845 5.12012 9.68845C5.12012 9.38845 5.36016 9.14844 5.66016 9.14844H14.7601C15.0601 9.14844 15.3002 9.38845 15.3002 9.68845C15.3002 9.98845 15.0601 10.2285 14.7601 10.2285Z" fill="#8698A2" />
                                            <path d="M14.7601 6.72845H5.66016C5.36016 6.72845 5.12012 6.48845 5.12012 6.18845C5.12012 5.88845 5.36016 5.64844 5.66016 5.64844H14.7601C15.0601 5.64844 15.3002 5.88845 15.3002 6.18845C15.3002 6.48845 15.0601 6.72845 14.7601 6.72845Z" fill="#8698A2" />
                                        </svg>
                                        <span class="feedback-hover-text" v-if="bubbles == 1">Give Feedback</span>
                                    </button>
                                </div>
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
                                                <p><strong v-if="option.explanation"></strong> {{
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
                        <NotesLinkedQuestions
                            v-if="currentQuestion"
                            variant="links"
                            :title="currentQuestion.number || currentQuestion.code"
                            :questions="linkedQuestions"
                            :questions-loading="linkedQuestionsLoading"
                            :linked-notes="linkedNotes"
                            :notes-loading="linkedNotesLoading"
                            :mock-questions="linkedMocks"
                            :mocks-loading="linkedMocksLoading"
                            :note-record-id="String(currentQuestion.id)"
                            note-record-type="question"
                            :current-question="currentQuestion"
                            comment-api="subject"
                            @question-click="navigateToLinkedQuestion"
                            @note-click="navigateToLinkedNote"
                            @mock-click="navigateToLinkedMock"
                            @comment-saved="reloadCurrentQuestionList"
                        />

                    </div>
                </div>
            </div>
        </div>

        <div v-if="birdseye">
            <QuestionBirdsEyeView
                @showbirds="showbirds"
                @goto-question="gotoFromBirdsEye"
                :question="allquestions"
                :current-question-index="currentQuestionIndex"
            />
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


        <!-- Feedback modal -->
        <transition name="slide-modal">
            <div class="modal-overlays" v-if="showFeedbackModal">
                <div class="modal-contents" ref="feedbackDraggable" @mousedown="startFeedbackDrag">
                    <div class="feedback-form-box">
                        <div class="cross feedback-modal-header">
                            <div class="feedback-modal-header-main">
                                <p v-if="currentQuestion && currentQuestion.number" class="feedback-modal-meta currentquestionnumber">{{ currentQuestion.number }}</p>
                                <h4 class="feedback-modal-title">Feedback</h4>
                            </div>
                            <span class="crossspan feedback-modal-close" @click="showFeedbackModal = false">
                                <svg width="12" height="12" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1.38013 0.75L8.1701 7.54001" stroke="#6D6E71" stroke-miterlimit="10" stroke-linecap="round" />
                                    <path d="M8.1701 0.75L1.38013 7.54001" stroke="#6D6E71" stroke-miterlimit="10" stroke-linecap="round" />
                                </svg>
                            </span>
                        </div>
                        <form action="">
                            <div class="feedbackform-button" v-for="(category, index) in feedbackCategories" :key="index">
                                <button @click="toggleFeedbackOptions(index)" :class="{ 'active-btn': category.selectedOption }" type="button">
                                    {{ category.name }}
                                </button>
                                <div class="feeback-question-options" v-if="feedbackShowOptionsIndex === index && category.name !== 'Other'">
                                    <div class="feeback-question-option" @click="selectFeedbackOption(index, 'Incorrect')">
                                        <input type="radio" :checked="category.selectedOption === 'Incorrect'" tabindex="-1" readonly>
                                        <p :class="{ 'active-btn': category.selectedOption === 'Incorrect' }">Incorrect</p>
                                    </div>
                                    <div class="feeback-question-option" @click="selectFeedbackOption(index, 'Needs improvement')">
                                        <input type="radio" :checked="category.selectedOption === 'Needs improvement'" tabindex="-1" readonly>
                                        <p :class="{ 'active-btn': category.selectedOption === 'Needs improvement' }">Needs improvement</p>
                                    </div>
                                </div>
                            </div>
                            <div class="feedback-textarea-box" ref="qFeedbackForm">
                                <textarea
                                    ref="qFeedbackArea"
                                    v-model="feedbackForm.optionfeedback"
                                    @input="onFeedbackTextareaInput"
                                    class="feedback-textarea"
                                    placeholder="Your feedback..."
                                    rows="1"
                                ></textarea>
                            </div>
                            <div class="feedbackform-submitbtn">
                                <button type="button" @click="submitQuestionFeedback" :disabled="isFeedbackSubmitDisabled" :class="{ 'disabled-btn': isFeedbackSubmitDisabled }">Submit</button>
                                <div class="cardbottom-shadow">
                                    <img src="/images/cardshadow.png" alt="">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>


<script>
import QuestionHeader from '@/components/QuestionHeader.vue';
import { get, byMethod } from './lib/api';
import {
    autoGrowFeedbackTextarea,
    resetFeedbackTextareaHeight,
} from './lib/feedbackTextareaAutoGrow';
import {
    createQuestionFeedbackCategories,
    hydrateQuestionFeedbackCategories,
    buildQuestionFeedbackLocalState,
} from './lib/questionFeedbackCategories';
import QuestionBirdsEyeView from './QuestionBirdsEyeView.vue';
import NotesLinkedQuestions from '@/components/NotesLinkedQuestions.vue';


export default {
    name: 'QuestionsPage',
    components: {
        QuestionHeader,
        QuestionBirdsEyeView,
        NotesLinkedQuestions,
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
            scrollerDragMoved: false,
            dragStartX: 0,
            scrollLeftStart: 0,
            scrollerDragRaf: null,
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
            showFeedbackModal: false,
            feedbackForm: { optionfeedback: '' },
            feedbackCategories: createQuestionFeedbackCategories(),
            feedbackShowOptionsIndex: null,
            feedbackDragState: { isDragging: false, startX: 0, startY: 0, origLeft: 0, origTop: 0 },
            linkedQuestions: [],
            linkedQuestionsLoading: false,
            linkedNotes: [],
            linkedNotesLoading: false,
            linkedMocks: [],
            linkedMocksLoading: false,
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
        const title = localStorage.getItem('questiontitle');
        this.title = title;
        this.loadInitialQuestions();
        if (!this.isLinkedQuestionPreview) {
            this.getFlaged();
        }
    },

    beforeDestroy() {
        this.handleMouseUp();
    },

    watch: {
        '$route.params.id'() {
            this.title = localStorage.getItem('questiontitle');
        },
        currentQuestion: {
            handler(q) {
                this.setInitialSelectedOption();
                this.fetchLinkedRecordsForQuestion(q);
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        loadInitialQuestions() {
            const id = this.$route.params.id;
            const title = this.title;
            let req;
            if (title === 'Conditions') {
                req = get('/getconditionquestionclient?id=' + id);
            } else if (title === 'Sublist') {
                req = get('/getsubconditionquestionclient?id=' + id);
            } else if (title === 'Presentations') {
                req = get(`/getpresentationquestionclient?id=${id}&byfetch=Title`);
            } else {
                req = get('/getchapterquestionclient?id=' + id);
            }

            req.then(async (res) => {
                this.allquestions = res.data.data || [];
                this.percentage = res.data.percentage;
                if (this.isLinkedQuestionPreview) {
                    await this.applyLinkedPreviewQuestions();
                } else {
                    this.jumpToStartQuestion();
                }
            });
        },

        getLinkedPreviewCodes() {
            const raw = this.$route.query.linkedCodes;
            if (!raw) return [];
            return String(raw).split(',').map((c) => c.trim()).filter(Boolean);
        },

        filterToLinkedQuestions(list, codes) {
            if (!codes || !codes.length) return list || [];
            const allowed = new Set(codes);
            return (list || []).filter((q) => allowed.has(q.code));
        },

        mergeLinkedSubmitResponse(fullList, codes) {
            if (!codes || !codes.length) return this.allquestions;
            const allowed = new Set(codes);
            const updatedByCode = {};
            (fullList || []).forEach((q) => {
                if (allowed.has(q.code)) updatedByCode[q.code] = q;
            });
            return this.allquestions.map((q) => updatedByCode[q.code] || q);
        },

        resolveQuestionEntity(que) {
            if (que.sublist_id) return { title: 'Sublist', entityId: que.sublist_id };
            if (que.condition_id) return { title: 'Conditions', entityId: que.condition_id };
            if (que.presentation_id) return { title: 'Presentations', entityId: que.presentation_id };
            return { title: 'Chapter', entityId: que.subject_id };
        },

        fetchQuestionsForEntity(title, entityId) {
            if (title === 'Conditions') {
                return get('/getconditionquestionclient?id=' + entityId).then((r) => r.data.data || []);
            }
            if (title === 'Sublist') {
                return get('/getsubconditionquestionclient?id=' + entityId).then((r) => r.data.data || []);
            }
            if (title === 'Presentations') {
                return get(`/getpresentationquestionclient?id=${entityId}&byfetch=Title`).then((r) => r.data.data || []);
            }
            return get('/getchapterquestionclient?id=' + entityId).then((r) => r.data.data || []);
        },

        fetchFullLinkedQuestionsByItems(items) {
            const groups = new Map();
            (items || []).forEach((item) => {
                const target = this.resolveQuestionEntity(item);
                if (!target.entityId) return;
                const key = `${target.title}:${target.entityId}`;
                if (!groups.has(key)) {
                    groups.set(key, { ...target, codes: new Set() });
                }
                if (item.code) groups.get(key).codes.add(item.code);
            });

            const tasks = [...groups.values()].map(async ({ title, entityId, codes }) => {
                const list = await this.fetchQuestionsForEntity(title, entityId);
                return list.filter((q) => codes.has(q.code));
            });

            return Promise.all(tasks).then((results) => {
                const seen = new Set();
                return results.flat().filter((q) => {
                    if (seen.has(q.id)) return false;
                    seen.add(q.id);
                    return true;
                });
            });
        },

        async applyLinkedPreviewQuestions() {
            let codes = this.getLinkedPreviewCodes();
            const linkedFromCode = this.$route.query.linkedFromCode;

            if (!codes.length && linkedFromCode) {
                try {
                    const res = await get('/question-linked-questions', { code: linkedFromCode });
                    codes = (res.data.data || []).map((q) => q.code).filter(Boolean);
                } catch (e) { /* ignore */ }
            }

            let filtered = this.filterToLinkedQuestions(this.allquestions, codes);

            if (!filtered.length) {
                try {
                    const fromCode = linkedFromCode || null;
                    const res = fromCode
                        ? await get('/question-linked-questions', { code: fromCode })
                        : { data: { data: [] } };
                    const items = res.data.data || [];
                    const itemCodes = codes.length
                        ? items.filter((q) => codes.includes(q.code))
                        : items;
                    if (itemCodes.length) {
                        filtered = await this.fetchFullLinkedQuestionsByItems(itemCodes);
                    }
                } catch (e) { /* ignore */ }
            }

            if (filtered.length) {
                this.allquestions = filtered;
            }

            this.recalculateLinkedPreviewCounts();
            this.jumpToStartQuestion();
        },

        recalculateLinkedPreviewCounts() {
            if (!this.isLinkedQuestionPreview) return;

            let correct = 0;
            let incorrect = 0;
            let flagged = 0;

            this.allquestions.forEach((q) => {
                if (q.flag) flagged += 1;
                if (q.score) {
                    if (Number(q.score.correct) === 1) correct += 1;
                    else incorrect += 1;
                }
            });

            this.correctcount = correct;
            this.incorrectcount = incorrect;
            this.flagcounts = flagged;
            this.percentage = this.allquestions.length
                ? Math.round((correct / this.allquestions.length) * 100)
                : 0;
        },

        fetchLinkedRecordsForQuestion(q) {
            const code = q && q.code ? String(q.code).trim() : '';
            if (!code) {
                this.linkedQuestions = [];
                this.linkedNotes = [];
                this.linkedMocks = [];
                return;
            }
            this.linkedQuestionsLoading = true;
            this.linkedNotesLoading = true;
            this.linkedMocksLoading = true;
            get('/question-linked-questions', { code })
                .then((res) => {
                    this.linkedQuestions = res.data.data || [];
                })
                .catch(() => {
                    this.linkedQuestions = [];
                })
                .finally(() => {
                    this.linkedQuestionsLoading = false;
                });
            get('/question-linked-notes', { code })
                .then((res) => {
                    this.linkedNotes = res.data.data || [];
                })
                .catch(() => {
                    this.linkedNotes = [];
                })
                .finally(() => {
                    this.linkedNotesLoading = false;
                });
            get('/question-linked-mocks', { code })
                .then((res) => {
                    this.linkedMocks = res.data.data || [];
                })
                .catch(() => {
                    this.linkedMocks = [];
                })
                .finally(() => {
                    this.linkedMocksLoading = false;
                });
        },
        navigateToLinkedQuestion(que) {
            let title;
            let entityId;
            if (que.sublist_id) {
                title = 'Sublist';
                entityId = que.sublist_id;
            } else if (que.condition_id) {
                title = 'Conditions';
                entityId = que.condition_id;
            } else if (que.presentation_id) {
                title = 'Presentations';
                entityId = que.presentation_id;
            } else {
                title = 'Chapter';
                entityId = que.subject_id;
            }
            localStorage.setItem('questiontitle', title);
            localStorage.setItem('questionStartCode', que.code);
            const cur = this.currentQuestion;
            const curLabel = cur && (cur.number || cur.code) ? String(cur.number || cur.code) : 'Question';
            try {
                localStorage.setItem(
                    'questionBreadcrumbLabels',
                    JSON.stringify(['MLA CONTENT MAP', this.title || 'Questions', curLabel])
                );
            } catch (e) { /* ignore */ }
            this.$router.push({ name: 'QuestionsPage', params: { id: entityId } });
        },
        navigateToLinkedNote(note) {
            if (!note || note.record_id == null) return;
            const type = note.type === 'subnotes' ? 'subnotes' : 'notes';
            this.$router.push({
                path: '/notespage',
                query: { id: String(note.record_id), type },
            });
        },
        navigateToLinkedMock(que) {
            if (!que || que.mock_id == null) return;
            localStorage.setItem('question', 'normal');
            localStorage.setItem('mockObject', JSON.stringify({
                id: que.mock_id,
                title: que.mock_title || '',
                duration: que.mock_duration || 0,
            }));
            localStorage.setItem('mockStartQuestionId', String(que.id));
            this.$router.push({ name: 'MockQuestionPreview', params: { id: que.mock_id } });
        },
        reloadCurrentQuestionList() {
            if (this.isLinkedQuestionPreview) {
                this.loadInitialQuestions();
                return;
            }
            const id = this.$route.params.id;
            const title = this.title || localStorage.getItem('questiontitle');
            let req;
            if (title === 'Conditions') {
                req = get('/getconditionquestionclient?id=' + id);
            } else if (title === 'Sublist') {
                req = get('/getsubconditionquestionclient?id=' + id);
            } else if (title === 'Presentations') {
                req = get(`/getpresentationquestionclient?id=${id}&byfetch=Title`);
            } else {
                req = get('/getchapterquestionclient?id=' + id);
            }
            req.then((res) => {
                this.allquestions = res.data.data;
                if (res.data.percentage != null) {
                    this.percentage = res.data.percentage;
                }
            }).catch(() => { /* ignore */ });
        },

        goToMlaHome() {
            this.handleBreadcrumbClick(0);
        },

        /**
         * Header back arrow: navigate to the list and highlight the exact row the user came from.
         * The restore indices (parent/child expansion) are already stored from when they clicked the list item.
         * When opened from Search, return to that search URL instead.
         */
        returnFromQuestionViaHeaderBack() {
            const from = this.$route.query.from;
            if (from && typeof from === 'string' && from.startsWith('/')) {
                this.$router.push(from);
                return;
            }
            try {
                localStorage.removeItem('questionSuppressListHighlight');
                const leafId = this.$route.params.id;
                if (leafId) {
                    localStorage.setItem('questionPendingHighlightId', String(leafId));
                }
            } catch (e) { /* ignore */ }
            this.$router.push('/mlalistselection');
        },

        clearQuestionListRestoreState() {
            try {
                [
                    'questionListRestore_section', 'questionListRestore_column',
                    'questionListRestore_parentIndex', 'questionListRestore_parentId',
                    'questionListRestore_childIndex', 'questionListRestore_childId',
                    'questionListRestore_grandIndex', 'questionListRestore_grandId',
                    'questionPendingHighlightId', 'questionSuppressListHighlight',
                ].forEach(k => localStorage.removeItem(k));
            } catch (e) { /* ignore */ }
        },

        handleBreadcrumbClick(idx) {
            const labels = this.breadcrumbItems;
            const lastIdx = labels.length - 1;
            if (idx >= lastIdx) return; // current page — do nothing

            if (idx === 0) {
                // MLA CONTENT MAP — clear everything, go to list
                this.clearQuestionListRestoreState();
                this.$router.push('/mlalistselection');
                return;
            }

            // For idx >= 1: preserve the stored section so MLAListSelection restores it
            // (it was already written by the list component when navigating forward)

            if (idx === 1) {
                // Section label (BY AREAS / PRESENTATIONS AND CONDITIONS) — restore section only
                // Clear all indices and highlight so nothing expands
                try {
                    localStorage.removeItem('questionListRestore_column');
                    localStorage.removeItem('questionListRestore_parentIndex');
                    localStorage.removeItem('questionListRestore_parentId');
                    localStorage.removeItem('questionListRestore_childIndex');
                    localStorage.removeItem('questionListRestore_childId');
                    localStorage.removeItem('questionListRestore_grandIndex');
                    localStorage.removeItem('questionPendingHighlightId');
                    localStorage.removeItem('questionSuppressListHighlight');
                } catch (e) { /* ignore */ }
                this.$router.push('/mlalistselection');
                return;
            }

            if (idx === 2) {
                // Column/list title (e.g. "All areas of clinical practice", "Presentations")
                // Expand the parent so user sees where they were, but no orange highlight
                try {
                    localStorage.setItem('questionSuppressListHighlight', '1');
                    localStorage.removeItem('questionPendingHighlightId');
                } catch (e) { /* ignore */ }
                this.$router.push('/mlalistselection');
                return;
            }

            // idx >= 3: a named row in the list — highlight that row
            try {
                localStorage.removeItem('questionSuppressListHighlight');

                if (idx === 3) {
                    // Chapter (parent item) — highlight the parent row
                    const parentId = localStorage.getItem('questionListRestore_parentId');
                    localStorage.setItem('questionPendingHighlightId', parentId || '');
                    localStorage.removeItem('questionListRestore_childIndex');
                    localStorage.removeItem('questionListRestore_childId');
                    localStorage.removeItem('questionListRestore_grandIndex');
                } else if (idx === 4) {
                    // Sub-chapter (child item) — highlight child, keep parent expanded
                    const childId = localStorage.getItem('questionListRestore_childId');
                    localStorage.setItem('questionPendingHighlightId', childId || '');
                    localStorage.removeItem('questionListRestore_grandIndex');
                    localStorage.removeItem('questionListRestore_grandId');
                } else if (idx >= 5) {
                    // Grandchild — highlight grandchild, keep parent + child expanded
                    const grandId = localStorage.getItem('questionListRestore_grandId');
                    localStorage.setItem('questionPendingHighlightId', grandId || '');
                }
            } catch (e) { /* ignore */ }

            this.$router.push('/mlalistselection');
        },

        parseStoredBreadcrumb() {
            try {
                const raw = localStorage.getItem('questionBreadcrumbLabels');
                if (!raw) return [];
                const p = JSON.parse(raw);
                return Array.isArray(p) ? p.map((x) => String(x).trim()).filter(Boolean) : [];
            } catch (e) {
                return [];
            }
        },

        buildFallbackBreadcrumb() {
            const root = ['MLA CONTENT MAP'];
            const t = this.title;
            if (t === 'Conditions') return [...root, 'By areas', 'Conditions', 'Questions'];
            if (t === 'Sublist') return [...root, 'By areas', 'Sub-condition', 'Questions'];
            if (t === 'Presentations') return [...root, 'Presentations and conditions', 'Presentations', 'Questions'];
            if (t === 'Chapter') return [...root, 'Chapters', 'Questions'];
            if (t) return [...root, 'By areas', t, 'Questions'];
            return [...root, 'Questions'];
        },

        pickTopicLabelFromQuestion(q) {
            if (!q || typeof q !== 'object') return null;
            return (
                q.condition_title ||
                q.condition_name ||
                q.presentation_title ||
                q.presentation_name ||
                q.subject_title ||
                q.subject_name ||
                q.chapter_title ||
                q.sublist_title ||
                q.topic_title ||
                null
            );
        },

        /**
         * If the user navigated here by clicking a linked question from NotesPage,
         * jump straight to that question and clear the stored code.
         */
        jumpToStartQuestion() {
            const code = this.$route.query.startCode || localStorage.getItem('questionStartCode');
            if (!code) return;

            const idx = this.allquestions.findIndex((q) => q.code === code);
            if (idx !== -1) {
                this.currentQuestionIndex = idx;
                this.$nextTick(() => {
                    if (typeof this.centerSelectedIndex === 'function') {
                        this.centerSelectedIndex(idx);
                    }
                });
            }

            if (!this.isLinkedQuestionPreview) {
                localStorage.removeItem('questionStartCode');
            }
        },

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
            if (this.isLinkedQuestionPreview) {
                this.recalculateLinkedPreviewCounts();
                return;
            }

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

        gotoFromBirdsEye(index) {
            this.currentQuestionIndex = index;
            this.birdseye = false;
            this.$nextTick(() => {
                if (typeof this.centerSelectedIndex === 'function') {
                    this.centerSelectedIndex(index);
                }
            });
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
                    if (Number(option.is_correct) === 1) {
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
                    if (Number(option.is_correct) === 1) {
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

            // Capture before API overwrites the question
            const wasCorrect      = Number(this.seletecOptionObject.is_correct) === 1;
            const selectedOptId   = this.selectedOption;

            // handle answer submission logic
            console.log("Selected option:", this.selectedOption, "selected question", question);

            byMethod(this.method, "/questionScore", this.form)
                .then((res) => {
                    if (res.data.saved) {
                        if (this.isLinkedQuestionPreview) {
                            const codes = this.getLinkedPreviewCodes();
                            const filtered = this.filterToLinkedQuestions(res.data.data || [], codes);
                            this.allquestions = filtered.length
                                ? filtered
                                : this.mergeLinkedSubmitResponse(res.data.data || [], codes);
                            this.recalculateLinkedPreviewCounts();
                        } else {
                            this.allquestions = res.data.data;
                            this.correctcount = res.data.correctcount;
                            this.incorrectcount = res.data.incorrectcount;
                            this.percentage = res.data.percentage;
                        }

                        // Auto-expand explanations after DOM updates with new question data
                        this.$nextTick(() => {
                            this.autoExpandExplanations(wasCorrect, selectedOptId);
                        });
                    }
                })
                .catch((error) => {
                    if (error?.response?.status === 422) {
                        this.errors = error.response.data.errors;
                    }
                    this.isProcessing = false;
                });
        },

        /**
         * After submit, open the right accordion panels:
         * - Correct answer → expand correct option only
         * - Wrong answer   → expand selected (wrong) option + correct option
         */
        autoExpandExplanations(wasCorrect, selectedOptId) {
            const options = this.currentQuestion?.options;
            if (!options) return;

            const correctIdx  = options.findIndex(o => Number(o.is_correct) === 1);
            const selectedIdx = options.findIndex(o => o.id == selectedOptId);

            // Start fresh so manual toggles before submit don't interfere
            this.activeOptions = [];

            // Always open the correct option's explanation
            if (correctIdx !== -1) this.activeOptions.push(correctIdx);

            // If wrong answer, also open the selected (wrong) option's rolling out
            if (!wasCorrect && selectedIdx !== -1 && selectedIdx !== correctIdx) {
                this.activeOptions.push(selectedIdx);
            }
        },

        openFeedbackPopup() {
            const fb = this.currentQuestion?.feedback || null;
            this.feedbackCategories = hydrateQuestionFeedbackCategories(createQuestionFeedbackCategories(), fb);
            this.feedbackForm.optionfeedback = fb?.optionfeedback || '';
            this.feedbackShowOptionsIndex = null;
            this.showFeedbackModal = true;
            this.$nextTick(() => {
                resetFeedbackTextareaHeight(this.$refs.qFeedbackArea);
            });
        },

        toggleFeedbackOptions(index) {
            this.feedbackShowOptionsIndex = this.feedbackShowOptionsIndex === index ? null : index;
        },

        selectFeedbackOption(index, option) {
            this.feedbackCategories[index].selectedOption =
                this.feedbackCategories[index].selectedOption === option ? null : option;
        },

        onFeedbackTextareaInput() {
            autoGrowFeedbackTextarea(this.$refs.qFeedbackArea);
            this.toggleFeedbackOptions(null);
        },

        submitQuestionFeedback() {
            const selectedFeedback = this.feedbackCategories.map(cat => ({
                name: cat.name,
                selectedOption: cat.selectedOption,
            }));
            const payload = {
                question_id:      this.currentQuestion.id,
                parent_id:        null,
                optionfeedback:   this.feedbackForm.optionfeedback,
                selectedFeedback,
            };
            byMethod('POST', '/savefeedback', payload).then((res) => {
                if (res.data.saved) {
                    this.showFeedbackModal = false;
                    this.toggleFeedbackOptions(null);
                    const idx = this.currentQuestionIndex;
                    if (this.allquestions[idx]) {
                        this.$set(
                            this.allquestions[idx],
                            'feedback',
                            buildQuestionFeedbackLocalState(selectedFeedback, this.feedbackForm.optionfeedback),
                        );
                    }
                }
            });
        },

        startFeedbackDrag(e) {
            const el = this.$refs.feedbackDraggable;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            this.feedbackDragState = {
                isDragging: true,
                startX: e.clientX,
                startY: e.clientY,
                origLeft: rect.left,
                origTop: rect.top,
            };
            const onMove = (ev) => {
                if (!this.feedbackDragState.isDragging) return;
                const dx = ev.clientX - this.feedbackDragState.startX;
                const dy = ev.clientY - this.feedbackDragState.startY;
                el.style.left = (this.feedbackDragState.origLeft + dx) + 'px';
                el.style.top  = (this.feedbackDragState.origTop  + dy) + 'px';
                el.style.right = 'auto';
            };
            const onUp = () => {
                this.feedbackDragState.isDragging = false;
                window.removeEventListener('mousemove', onMove);
                window.removeEventListener('mouseup', onUp);
            };
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
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
            if (event.button !== 0) return;
            this.isDragging = true;
            this.scrollerDragMoved = false;
            this.dragStartX = event.pageX;
            this.scrollLeftStart = this.$refs.scrollContainer.scrollLeft;

            this._onScrollerMouseMove = (e) => this.handleMouseMove(e);
            this._onScrollerMouseUp = () => this.handleMouseUp();
            document.addEventListener('mousemove', this._onScrollerMouseMove);
            document.addEventListener('mouseup', this._onScrollerMouseUp);
        },
        handleMouseMove(event) {
            if (!this.isDragging) return;
            const delta = event.pageX - this.dragStartX;
            if (Math.abs(delta) > 4) {
                this.scrollerDragMoved = true;
            }

            if (this.scrollerDragRaf) cancelAnimationFrame(this.scrollerDragRaf);
            this.scrollerDragRaf = requestAnimationFrame(() => {
                const container = this.$refs.scrollContainer;
                if (container) {
                    container.scrollLeft = this.scrollLeftStart - delta;
                }
            });
        },
        handleMouseUp() {
            this.isDragging = false;
            if (this.scrollerDragRaf) {
                cancelAnimationFrame(this.scrollerDragRaf);
                this.scrollerDragRaf = null;
            }
            if (this._onScrollerMouseMove) {
                document.removeEventListener('mousemove', this._onScrollerMouseMove);
                this._onScrollerMouseMove = null;
            }
            if (this._onScrollerMouseUp) {
                document.removeEventListener('mouseup', this._onScrollerMouseUp);
                this._onScrollerMouseUp = null;
            }
        },
        onScrollerItemClick(index) {
            if (this.scrollerDragMoved) return;
            this.getBackindex(index);
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
                return;
            }
            console.log('hello', this.currentQuestion);
            const optionWithScore = this.currentQuestion?.options.find(
                (option) => option.score !== null
            );
            if (optionWithScore) {
                this.selectedOption = optionWithScore.id;
                // Always open correct option; also open wrong one if answer was incorrect
                const options = this.currentQuestion.options;
                const correctIdx  = options.findIndex(o => Number(o.is_correct) === 1);
                const selectedIdx = options.findIndex(o => o.id == optionWithScore.id);
                this.activeOptions = [];
                if (correctIdx !== -1) this.activeOptions.push(correctIdx);
                if (Number(optionWithScore.is_correct) !== 1 && selectedIdx !== -1 && selectedIdx !== correctIdx) {
                    this.activeOptions.push(selectedIdx);
                }
            } else {
                // Unanswered question — close all accordions
                this.activeOptions = [];
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

        isLinkedQuestionPreview() {
            return this.$route.query.embeddedPreview === '1'
                && (Boolean(this.$route.query.linkedCodes) || Boolean(this.$route.query.linkedFromCode));
        },

        breadcrumbItems() {
            void this.allquestions.length;
            void this.currentQuestionIndex;
            let labels = this.parseStoredBreadcrumb();
            if (!labels.length) {
                labels = this.buildFallbackBreadcrumb();
            }
            const leaf = this.pickTopicLabelFromQuestion(this.currentQuestion);
            const last = labels[labels.length - 1];
            if (leaf && last === 'Questions') {
                labels = [...labels];
                labels[labels.length - 1] = leaf;
            }
            return labels;
        },

        currentQuestionCodeLabel() {
            void (this.currentQuestion && this.currentQuestion.score);
            void this.currentQuestionIndex;
            const q = this.currentQuestion;
            if (!q) return null;

            const code = q.code != null ? String(q.code).trim() : (q.number ? String(q.number).trim() : '');
            if (!code) return null;

            let title = this.pickTopicLabelFromQuestion(q);
            if (!title) {
                let labels = this.parseStoredBreadcrumb();
                if (!labels.length) {
                    labels = this.buildFallbackBreadcrumb();
                }
                const storedLast = labels[labels.length - 1];
                if (storedLast && storedLast !== 'Questions') {
                    title = storedLast;
                }
            }

            if (q.score && title) {
                return `${code} - ${title}`;
            }
            return code;
        },

        currentQuestion() {
            return this.allquestions[this.currentQuestionIndex];
        },

        isFeedbackSubmitDisabled() {
            const hasCategory = this.feedbackCategories.some(c => c.selectedOption);
            const hasText = this.feedbackForm.optionfeedback.trim().length > 0;
            return !hasCategory && !hasText;
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

.questiontext-box .currentquestionnumber {
    margin: 0 0 10px 0;
    display: block;
}

.questiontext-box .questionimage {
    margin: 0;
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
    font-weight: 400;
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
    padding: 3px 0;
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
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    box-sizing: border-box;
}

.scroller-flag-icon,
.scroller-feedback-icon {
    flex-shrink: 0;
    pointer-events: none;
}

.scroller-num {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    text-align: center;
    line-height: 1;
    pointer-events: none;
}

.questionnumber-slide {
    padding: 20px 0;
    align-items: center;
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
    cursor: grab;
}

.scrollmenus--dragging {
    cursor: grabbing !important;
    scroll-behavior: auto !important;
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
    -ms-overflow-style: none;
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
    border-color: #dc3545;
}

/* ── Feedback icon & modal ── */
.questioncomment {
        position: absolute;
    right: 30px;
    top: 50px;
    cursor: pointer;
}

.feedbackbutton {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    position: relative;
}

.feedback-hover-text {
    position: absolute;
    bottom: -22px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.7);
    color: #fff;
    font-size: 10px;
    white-space: nowrap;
    padding: 2px 6px;
    border-radius: 4px;
    pointer-events: none;
}

.modal-overlays {
    width: 100%;
}

.modal-contents {
    position: fixed;
    right: 43%;
    top: 30%;
    z-index: 9999;
    cursor: grab;
}

.slide-modal-enter-active,
.slide-modal-leave-active {
    transition: opacity 0.2s ease;
}
.slide-modal-enter,
.slide-modal-leave-to {
    opacity: 0;
}
</style>