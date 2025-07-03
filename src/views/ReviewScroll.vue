<template>
    <div id="top" @scroll="handleScroll" class="scrollwhole">



        <div v-if="loadingcircle">

            <Loadingcircle />
        </div>
        <div v-else>
            <HeaderQuestion :flagcounts="flagcounts" :remainingTimeInSeconds="remainingTimeInSeconds"
                :formattedTime="formattedTime" @birdseye="Showbirdeye" @showstoptimer="showstoptime"
                @startagain="startTimer" @exitmock="exit" :stoptimerpopup="stoptimerpopup" :fillicon="fillicon"
                @returnquestion="getBackindexheader" :isRowFixed="isRowFixed" @SectionScroll="SectionScroll"
                @globalhelp="globalhelp" :correctcount="correctcount" :incorrectcount="incorrectcount"
                :unanswered="unanswered" :roundedPercent="roundedPercent" />

            <div v-if="reviewfirst">


                <ReviewMockBirdsEye :currentQuestionIndex="currentQuestionIndex" :allquestions="allquestions"
                    :returning="returning" @getBackindex="getBackindex" @startMocks="getBackindex(0)" />

            </div>
            <div v-else>



                <!-- <section class="reviewscroll-sec">
                    <div class="container">
                        <div class="questionnumber-slide-container" ref="container">
                            <div class="questionleft-arrow" @mouseenter="startScroll('left')" @mouseleave="stopScroll"
                                @mousedown="fastScroll('left')" @mouseup="stopScroll"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                    <path d="m15 18-6-6 6-6" />
                                </svg></div>

                            <div class="slider-wrapper">
                                <div class="questionnumber-slide" :style="slideStyle">
                                    <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber"
                                        :style="{
                                            background: nav.score
                                                ? (nav.score.correct === 1
                                                    ? '#9ded6c'
                                                    : (nav.score.correct === 0
                                                        ? '#FFBABE'
                                                        : '#f1f2f2'))
                                                : (nav.flag
                                                    ? '#d2cbcb'
                                                    : (nav.skip
                                                        ? '#d2cbcb'
                                                        : '#f1f2f2')),

                                            border: isPresentIndexs(indexnav)
                                                ? (
                                                    nav.score
                                                        ? (nav.score.correct === 1
                                                            ? '1px solid green'
                                                            : (nav.score.correct === 0
                                                                ? '1px solid red'
                                                                : '1px solid grey'))
                                                        : (nav.flag
                                                            ? '1px solid black'
                                                            : (nav.skip
                                                                ? ' 1px solid black'
                                                                : ' 1px solid grey'))
                                                )
                                                : ''







                                        }" :class="{ 'activeindexreview': isPresentIndexs(indexnav) }"
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

                            <div class="questionright-arrow" @mouseenter="startScroll('right')" @mouseleave="stopScroll"
                                @mousedown="fastScroll('right')" @mouseup="stopScroll">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </section> -->




                <section class="questionnumber-sec">
                    <div class="scrollcenter" style="    padding-top: 5px; position:relative
                ">






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
                                <!-- <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber" :style="{
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
                                </span> -->


                                <span v-for="(nav, indexnav) in allquestions" :key="indexnav" class="questionnumber"
                                    :style="{
                                        background: nav.score
                                            ? (nav.score.correct == 1
                                                ? '#9ded6c'
                                                : (nav.score.correct == 0
                                                    ? '#FFBABE'
                                                    : '#f1f2f2'))
                                            : (nav.flag
                                                ? '#f1f2f2'
                                                : (nav.skip
                                                    ? '#d2cbcb'
                                                    : '#f1f2f2')),

                                        border: isPresentIndexs(indexnav)
                                            ? (
                                                nav.score
                                                    ? (nav.score.correct == 1
                                                        ? '1px solid green'
                                                        : (nav.score.correct == 0
                                                            ? '1px solid red'
                                                            : '1px solid grey'))
                                                    : (nav.flag
                                                        ? '1px solid black'
                                                        : (nav.skip
                                                            ? ' 1px solid black'
                                                            : ' 1px solid grey'))
                                            )
                                            : ''







                                    }" :class="{ 'activeindexreview': isPresentIndexs(indexnav) }"
                                    >

                                    <svg :style="{ opacity: nav.flag ? 1 : 0 }" width="9" viewBox="0 0 19 17">
                                        <path
                                            d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                                            fill="#ED1C24" />
                                    </svg>

                                    <!-- {{ indexnav + 1 }} -->
                                    <span @click="getBackindex(indexnav)" style="cursor:pointer; width: 100%;">{{ indexnav + 1 }}</span>




                                    <svg :style="{ opacity: nav.feedback ? 1 : 0 }" width="10" height="11"
                                        viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
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




                                    <!-- <svg v-if="nav.flag" class="red-flag" width="11" viewBox="0 0 19 17">
                                        <path
                                            d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                                            fill="#ED1C24" />
                                    </svg> -->
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
                <section class="questiontext-sec" id="sectiontop">
                    <div class="container">

                        <div class="question-option-tabsbox-scroll">

                            <transition name="fade" mode="out-in">

                                <div class="questiontext-box" v-if="currentQuestion" :key="currentQuestion.id"
                                    id="bottom">
                                    <p class="currentquestionnumber">{{currentQuestion.number}}</p>
                                    <p> {{
                                        currentQuestion ? currentQuestion.title : "No questions available."
                                    }}</p>
                                    <span class="questionflag">
                                        <svg v-if="flg || currentQuestion.flag" @click="removeflage(currentQuestion.id)"
                                            width="19" height="17" viewBox="0 0 19 17" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z"
                                                fill="#ED1C24" />
                                        </svg>


                                        <svg @click="setflage(currentQuestion.id)" v-if="!flg && !currentQuestion.flag"
                                            width="19" height="16" viewBox="0 0 19 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.49385 2.26427L8.72443 2.39603H8.74116C11.6548 3.96951 14.7462 4.01469 17.67 2.53156V13.8189C16.2175 14.6116 14.7714 14.996 13.3301 14.996C11.8326 14.996 10.3221 14.5811 8.82642 13.7279C6.28896 12.273 3.59969 12.0096 1 12.9068V1.56338C3.47425 0.631129 6.01882 0.849963 8.49385 2.26427Z"
                                                fill="transparent" stroke="#9A9898" stroke-width="2" />
                                        </svg>
                                        <!-- <span class="flag-hover-text" v-if="bubbles == 1">Flag Question</span> -->

                                        <span class="flag-hover-text" v-if="bubbles == 1">Flag Question</span>
                                    </span>
                                    <div class="questioncomment">
                                        <button @click="openfeedbackpop" class="feedbackbutton">

                                            <svg v-if="currentQuestion.feedback"  width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.41003 1.45117C1.79003 1.45117 1.29004 1.95117 1.29004 2.57117V13.6912C1.29004 14.3112 1.79003 14.8112 2.41003 14.8112H3.73999C4.03999 14.8112 4.28003 15.0512 4.28003 15.3512V18.8812L7.75 14.9912C7.85 14.8812 8.00002 14.8112 8.15002 14.8112H17.25C17.87 14.8112 18.37 14.3112 18.37 13.6912V2.57117C18.37 1.95117 17.87 1.45117 17.25 1.45117H2.40002H2.41003Z" fill="#FFF200"/>
                                                <path d="M3.75 20.8213C3.69 20.8213 3.62006 20.8113 3.56006 20.7813C3.35006 20.7013 3.20996 20.5013 3.20996 20.2813V15.8813H2.41003C1.20003 15.8813 0.209961 14.8913 0.209961 13.6813V2.56134C0.209961 1.35134 1.20003 0.361328 2.41003 0.361328H17.26C18.47 0.361328 19.46 1.35134 19.46 2.56134V13.6813C19.46 14.8913 18.47 15.8813 17.26 15.8813H8.40002L4.15002 20.6413C4.05002 20.7613 3.9 20.8213 3.75 20.8213ZM2.42004 1.45132C1.80004 1.45132 1.30005 1.95132 1.30005 2.57132V13.6913C1.30005 14.3113 1.80004 14.8113 2.42004 14.8113H3.75C4.05 14.8113 4.29004 15.0513 4.29004 15.3513V18.8813L7.76001 14.9913C7.86001 14.8813 8.01003 14.8113 8.16003 14.8113H17.26C17.88 14.8113 18.38 14.3113 18.38 13.6913V2.57132C18.38 1.95132 17.88 1.45132 17.26 1.45132H2.41003H2.42004Z" fill="#FBAD18"/>
                                                <path d="M14.7601 10.1913H5.66016C5.36016 10.1913 5.12012 9.95134 5.12012 9.65134C5.12012 9.35134 5.36016 9.11133 5.66016 9.11133H14.7601C15.0601 9.11133 15.3002 9.35134 15.3002 9.65134C15.3002 9.95134 15.0601 10.1913 14.7601 10.1913Z" fill="#FBAD18"/>
                                                <path d="M14.7601 6.69135H5.66016C5.36016 6.69135 5.12012 6.45134 5.12012 6.15134C5.12012 5.85134 5.36016 5.61133 5.66016 5.61133H14.7601C15.0601 5.61133 15.3002 5.85134 15.3002 6.15134C15.3002 6.45134 15.0601 6.69135 14.7601 6.69135Z" fill="#FBAD18"/>
                                                </svg>
                                                

                                            <!-- <svg v-if="currentQuestion.feedback" width="20" height="21"
                                                viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M2.78009 1.5C2.16009 1.5 1.6601 2 1.6601 2.62V13.74C1.6601 14.36 2.16009 14.86 2.78009 14.86H4.11005C4.41005 14.86 4.65009 15.1 4.65009 15.4V18.93L8.12006 15.04C8.22006 14.93 8.37008 14.86 8.52008 14.86H17.6201C18.2401 14.86 18.7401 14.36 18.7401 13.74V2.62C18.7401 2 18.2401 1.5 17.6201 1.5H2.77008H2.78009Z"
                                                    fill="#9DED6C" />
                                                <path
                                                    d="M4.11005 20.8701C4.05005 20.8701 3.9801 20.8601 3.9201 20.8301C3.7101 20.7501 3.57001 20.5501 3.57001 20.3301V15.9301H2.77008C1.56008 15.9301 0.570007 14.9402 0.570007 13.7302V2.61014C0.570007 1.40014 1.56008 0.410156 2.77008 0.410156H17.6201C18.8301 0.410156 19.82 1.40014 19.82 2.61014V13.7302C19.82 14.9402 18.8301 15.9301 17.6201 15.9301H8.76007L4.51007 20.6902C4.41007 20.8102 4.26005 20.8701 4.11005 20.8701ZM2.78009 1.50015C2.16009 1.50015 1.6601 2.00015 1.6601 2.62015V13.7401C1.6601 14.3601 2.16009 14.8601 2.78009 14.8601H4.11005C4.41005 14.8601 4.65009 15.1001 4.65009 15.4001V18.9301L8.12006 15.0402C8.22006 14.9302 8.37008 14.8601 8.52008 14.8601H17.6201C18.2401 14.8601 18.7401 14.3601 18.7401 13.7401V2.62015C18.7401 2.00015 18.2401 1.50015 17.6201 1.50015H2.77008H2.78009Z"
                                                    fill="#8698A2" />
                                                <path
                                                    d="M15.1301 10.2499H6.03009C5.73009 10.2499 5.49005 10.0099 5.49005 9.7099C5.49005 9.4099 5.73009 9.16992 6.03009 9.16992H15.1301C15.4301 9.16992 15.6701 9.4099 15.6701 9.7099C15.6701 10.0099 15.4301 10.2499 15.1301 10.2499Z"
                                                    fill="#8698A2" />
                                                <path
                                                    d="M15.1301 6.74991H6.03009C5.73009 6.74991 5.49005 6.5099 5.49005 6.2099C5.49005 5.9099 5.73009 5.66992 6.03009 5.66992H15.1301C15.4301 5.66992 15.6701 5.9099 15.6701 6.2099C15.6701 6.5099 15.4301 6.74991 15.1301 6.74991Z"
                                                    fill="#8698A2" />
                                            </svg> -->

                                            <svg v-else width="20" height="21" viewBox="0 0 20 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M3.75 20.8584C3.69 20.8584 3.62006 20.8485 3.56006 20.8185C3.35006 20.7385 3.20996 20.5385 3.20996 20.3185V15.9185H2.41003C1.20003 15.9185 0.209961 14.9284 0.209961 13.7184V2.59845C0.209961 1.38845 1.20003 0.398438 2.41003 0.398438H17.26C18.47 0.398438 19.46 1.38845 19.46 2.59845V13.7184C19.46 14.9284 18.47 15.9185 17.26 15.9185H8.40002L4.15002 20.6784C4.05002 20.7984 3.9 20.8584 3.75 20.8584ZM2.42004 1.48843C1.80004 1.48843 1.30005 1.98843 1.30005 2.60843V13.7285C1.30005 14.3485 1.80004 14.8484 2.42004 14.8484H3.75C4.05 14.8484 4.29004 15.0885 4.29004 15.3885V18.9185L7.76001 15.0284C7.86001 14.9184 8.01003 14.8484 8.16003 14.8484H17.26C17.88 14.8484 18.38 14.3485 18.38 13.7285V2.60843C18.38 1.98843 17.88 1.48843 17.26 1.48843H2.41003H2.42004Z"
                                                    fill="#8698A2" />
                                                <path
                                                    d="M14.7601 10.2285H5.66016C5.36016 10.2285 5.12012 9.98845 5.12012 9.68845C5.12012 9.38845 5.36016 9.14844 5.66016 9.14844H14.7601C15.0601 9.14844 15.3002 9.38845 15.3002 9.68845C15.3002 9.98845 15.0601 10.2285 14.7601 10.2285Z"
                                                    fill="#8698A2" />
                                                <path
                                                    d="M14.7601 6.72845H5.66016C5.36016 6.72845 5.12012 6.48845 5.12012 6.18845C5.12012 5.88845 5.36016 5.64844 5.66016 5.64844H14.7601C15.0601 5.64844 15.3002 5.88845 15.3002 6.18845C15.3002 6.48845 15.0601 6.72845 14.7601 6.72845Z"
                                                    fill="#8698A2" />
                                            </svg>


                                            <span class="feedback-hover-text" v-if="bubbles == 1">Give Feedback</span>


                                        </button>
                                    </div>
                                </div>
                            </transition>
                            <transition name="fade" mode="out-in">
                                <div :key="currentQuestion.id">


                                    <div class="question-alloptions" v-if="currentQuestion">
                                        <div v-for="(option, index) in currentQuestion.options" :key="option"
                                            class="question-option" :for="option.id" :style="getLabelStyle(option)">

                                            <div class="option-header" @click="toggleAccordion(index)">

                                                <h4>{{ String.fromCharCode(65 + index) }}. {{ option.title }}</h4>
                                                <div class="accordion-icon">
                                                    <svg v-if="activeOptions.includes(index)" width="24" height="24"
                                                        viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
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
                                                    <p>{{ option.rollingout ? option.rollingout : option.explanation }}



                                                    </p>
                                                </div>
                                            </transition>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                            <div class="questionsoptions-arrows">
                                <div class="questionoption-leftarrow" @click="previousQuestion">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-chevron-left-icon lucide-chevron-left">
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                    <span class="leftarrow-hover-text" v-if="bubbles == 1">Previous Question</span>
                                </div>

                                <div v-if="currentQuestionIndex === questions.length - 1"
                                    class="questionoption-rightarrow" @click="gotonewpage()">
                                    Finish Review
                                </div>
                                <div v-else class="questionoption-rightarrow" @click="nextQuestion()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                        <path d="m9 18 6-6-6-6" />
                                    </svg>
                                    <span class="leftarrow-hover-text" v-if="bubbles == 1">Next Question</span>
                                </div>
                            </div>
                            <div class="brake-border"></div>
                            <MockReviewDetail ref="reviewDetailRef" :currentQuestion="currentQuestion"
                                @commentsave="commentsave" />
                        </div>
                    </div>
                </section>


                <transition name="slide-modal">
                    <!-- <FeedbackFormModal v-if="showPauseModal" @close="showPauseModal = false"
                    @resume="showPauseModal = false" @exit="handleExitMock" /> -->

                    <div class="modal-overlays" v-if="showPauseModal">
                        <div class="modal-contents" ref="draggable" @mousedown="startDrag">

                            <div class="feedback-form-box">

                                <div class="cross">
                                    <p class="currentquestionnumber" style="padding-bottom: 10px;">{{currentQuestion.number}}</p>
                                   
                                    <h4>Share feedback</h4>
                                    <span class="crossspan" @click="showPauseModal = false">
                                        <svg width="12" height="12" viewBox="0 0 9 9" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.38013 0.75L8.1701 7.54001" stroke="#6D6E71"
                                                stroke-miterlimit="10" stroke-linecap="round" />
                                            <path d="M8.1701 0.75L1.38013 7.54001" stroke="#6D6E71"
                                                stroke-miterlimit="10" stroke-linecap="round" />
                                        </svg>

                                    </span>
                                </div>


                                <!-- <h4>Share feedback</h4> -->
                                <form action="">
                                    <div class="feedbackform-button">
                                        <div class="feedbackform-button" v-for="(category, index) in feedbackCategories"
                                            :key="index">
                                            <button @click="toggleOptions(index)"
                                                :class="{ 'active-btn': category.selectedOption }" type="button"> {{
                                                    category.name }}</button>

                                            <div class="feeback-question-options"
                                                v-if="showOptionsIndex === index && category.name != 'Other'">
                                                <div class="feeback-question-option">
                                                    <input type="radio"
                                                        :checked="category.selectedOption === 'Incorrect'"
                                                        @click="selectOption(index, 'Incorrect')" value="Incorrect">
                                                    <p>Incorrect</p>
                                                </div>
                                                <div class="feeback-question-option">
                                                    <input type="radio" value="Needs improvement"
                                                        :checked="category.selectedOption === 'Needs improvement'"
                                                        @click="selectOption(index, 'Needs improvement')">
                                                    <p>Needs improvement</p>
                                                </div>
                                            </div>

                                            <!-- <div v-if="category.name == 'Other' && showOptionsIndex === 6" class="feeback-question-option">

                                                <input class="input-form" type="text" placeholder="Optional text..."
                                                v-model="form.optionfeedback" />
                                            </div> -->
                                        </div>


                                        <div class="feedback-textarea-box" ref="feedbackForm">
                                            <textarea name="" id="" ref="feedbackArea" v-model="form.optionfeedback"
                                                @focus="expandTextarea" class="feedback-textarea"
                                                placeholder="Please write your suggestions here!"></textarea>
                                        </div>
                                        <!-- <textarea name="" id="" v-model="form.optionfeedback" class="feedback-textarea" placeholder="Please write your suggestions here!"></textarea> -->
                                    </div>
                                    <div class="feedbackform-submitbtn">
                                        <button type="button" @click="submitFeedback" :disabled="isSubmitDisabled"
                                        :class="{ 'disabled-btn': isSubmitDisabled }">Submit</button>
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



        </div>
    </div>
</template>



<script>

import MockReviewDetail from "../components/MockReviewDetail.vue"
// import FeedbackFormModal from "../components/FeedbackFormModal.vue"
import ReviewMockBirdsEye from "@/components/ReviewMockBirdsEye.vue";
import { get, byMethod } from "./lib/api";
import HeaderQuestion from "@/components/HeaderQuestion.vue";
import Loadingcircle from "@/components/Loadingcircle.vue";

export default {
    components: {
        MockReviewDetail,
        // FeedbackFormModal,
        ReviewMockBirdsEye,
        HeaderQuestion,
        Loadingcircle
    },
    data() {
        return {
            fillicon: 0,
            loadingcircle: true,
            activeButton: null,
            returning: 0,
            isDragging: false,
            dragOffsetX: 0,
            dragOffsetY: 0,

            // selectedOptions: {
            //   question: null,
            //   answer: null,
            //   ruling: null,
            // },
            reviewfirst: true,
            currentIndex: 0,
            numbers: Array.from({ length: 50 }, (_, i) => i + 1),
            scrollInterval: null,
            scrollDirection: null,
            selectedNumber: null,
            showPauseModal: false,
            selectedNumbers: [],
            specialNumbers: [],
            scrollSpeed: 70,
            numberWidth: 22,
            gap: 1,
            activeOption: null,
            options: [
                {
                    id: 1,
                    text: 'A. Primary billiary cholangitis',
                    content: 'Detailed explanation about Primary billiary cholangitis...',
                    selected: false
                },
                {
                    id: 2,
                    text: 'B. Pancreatic cancer',
                    content: 'Detailed explanation about Pancreatic cancer...',
                    selected: false
                },
                {
                    id: 3,
                    text: 'C. Cholecystitis',
                    content: 'Detailed explanation about Cholecystitis...',
                    selected: true
                },
                {
                    id: 4,
                    text: 'D. Alcoholic liver disease',
                    content: 'Detailed explanation about Alcoholic liver disease...',
                    selected: false
                },
                {
                    id: 5,
                    text: 'E. Acute cholangitis',
                    content: 'Detailed explanation about Acute cholangitis...',
                    selected: false
                }
            ],

            isRowFixed: false,     // To toggle the fixed class
            rowOffsetTop: 0,       // To store the initial offset of the row
            lastScrollPosition: 0, // To track the last scroll position
            isScrollingUp: false,

            loadershow: true,
            rollingindex: null,
            feedbackpop: false,

            firstindex: "explanation",
            secondindex: "books",
            thirdindex: null,
            fourthindex: null,

            conrrectcount: 0,
            incorrectcount: 1,



            reviewquest: false,
            showwarning: false,
            playagain: false,
            // showflagelist:'',s
            startingpoint: true,
            showflagelist: false,
            showunanswerlist: false,

            showreviewlist: false,
            showanswered: false,
            showbegin: false,
            startbeging: false,

            review: true,
            starts: false,
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


            id: null,
            form: {
                 optionfeedback: ''
            },
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
            selectedOptions: null,
            loadingflag: false,
            bubbles: null,
            total: 0,
            correctpercent: 0,
            totalquestions: 0,

            openIndexes: [],
            activeOptions: [],

            feedbackCategories: [
                { name: "Question", selectedOption: null },
                { name: "Answer", selectedOption: null },
                { name: "Rullingout", selectedOption: null },
                { name: "Condition", selectedOption: null },
                { name: "Explanation", selectedOption: null },
                { name: "Notes", selectedOption: null },

            ],
            // Track which category's options are currently visible
            showOptionsIndex: null,
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

        get("/getmockscore?id=" + this.id).then((res) => {
            //   this.setData(res);
            this.correct = res.data.correct;
            this.wrong = res.data.wrong;
            this.total = res.data.data
            this.totalquestions = res.data.totalquestion
            this.correctpercent = res.data.correctanswer
            console.log(res.data)
        });


        if (getabout == "normal") {
            get("/getmockquestion?id=" + this.id).then((res) => {
                this.setData(res);
                this.loadingflag = true;
            });
        }

        if (getabout == "flaged") {
            get("/getflagedquestion?id=" + this.id).then((res) => {
                this.setData(res);
                this.loadingflag = true;

            });
        }

        if (getabout == "unanswer") {
            get("/getunaswerquestion?id=" + this.id).then((res) => {
                this.setData(res);
                this.loadingflag = true;
            });
        }


        if (getabout == "unanswersolo") {
            get("/getunaswersoloquestion?id=" + getquestionid).then((res) => {
                this.setData(res);
                this.loadingflag = true;
            });
        }


        if (getabout == "unflagsolo") {
            get("/getflagedsoloquestion?id=" + getquestionid).then((res) => {
                this.setData(res);
                this.loadingflag = true;
            });
        }


        if (getabout == "exitmock") {
            get("/getmockquestion?id=" + this.id).then((res) => {
                this.setData(res);
                this.loadingflag = true;
            });
        }



        this.getReviewsss()
        // this.startTimer();

        get("/getglobalhelp").then((res) => {
            console.log('data', res.data.data)

            this.bubbles = res.data.data.value == 0 ? false : true

        });
    },

    

    watch: {

        reviewfirst(newVal) {
            if (!newVal) {
                // reviewfirst is false → section becomes visible
                this.$nextTick(() => {
                    const section = document.getElementById('sectiontop');
                    if (section) {
                        section.addEventListener('scroll', this.handleScroll);
                        console.log('Scroll listener attached to #sectiontop');
                    }
                });
            }
        },
        currentQuestion: {
            handler(newVal) {
                if (!this.loading && newVal) {

                    this.setInitialSelectedOption();
                }
            },
            deep: true,
            immediate: true,
        },
        showPauseModal(newVal) {
            console.log(newVal)
            // if (newVal) {
            //     this.lockBodyScroll();
            // } else {
            //     this.unlockBodyScroll();
            // }
        }
    },
    beforeUnmount() {
        // if (this.showPauseModal) {
        //     this.unlockBodyScroll();
        // }
    },

    mounted() {

        document.addEventListener("click", this.shrinkTextareaOnClickOutside);

        //     this.lastScrollTop = 0; 
        // const section = document.getElementById('sectiontop');

        // console.log('section' , section);

        // if (section) {
        //     section.addEventListener('scroll', this.handleScroll, { passive: true });
        // }


        window.addEventListener("scroll", this.handleScroll);


        //     if (!this.reviewfirst) {
        //     this.$nextTick(() => {
        //       const section = document.getElementById('sectiontop');
        //       if (section) {

        //         console.log('Scroll listener attached to #sectiontop');
        //         section.addEventListener('scroll', this.handleScroll);
        //       }
        //     });
        //   }


        // window.addEventListener("scroll", this.handleScroll);
        this.setInitialSelectedOption();
        if (this.currentQuestion.score && this.currentQuestion.score.option_id) {
            this.selectedOptions = this.currentQuestion.score.option_id;
        }

        this.generateSpecialNumbers();
        this.calculateVisibleNumbers();
        window.addEventListener('resize', this.calculateVisibleNumbers);
    },
    beforeDestroy() {

        document.removeEventListener("click", this.shrinkTextareaOnClickOutside);
        window.removeEventListener("scroll", this.handleScroll);

        //         const section = document.getElementById('sectiontop');
        //   if (section) {
        //     section.removeEventListener('scroll', this.handleScroll);
        //   }
        this.stopTimer();
        window.removeEventListener('resize', this.calculateVisibleNumbers);


    },
    computed: {

        isSubmitDisabled() {
        const hasSelectedOption = this.feedbackCategories.some(category => category.selectedOption);
        const hasTextFeedback = this.form.optionfeedback.trim().length > 0;
        return !(hasSelectedOption || hasTextFeedback);
    },

    //     isSubmitDisabled() {
    //     // Check if all selectedOption are null or empty
    //     return !this.feedbackCategories.some(category => category.selectedOption);
    // },
        roundedPercent() {

            // return Math.round(this.correct) * 100 / this.totalquestions;

            const percent = (this.correct / this.totalquestions) * 100;
            return parseFloat(percent.toFixed(1));

        },

        currentQuestion() {
            return this.questions[this.currentQuestionIndex];
        },

        formattedTime() {
            const hours = Math.floor(this.remainingTimeInSeconds / 3600);
            const minutes = Math.floor((this.remainingTimeInSeconds % 3600) / 60);
            const seconds = this.remainingTimeInSeconds % 60;

            return `${hours.toString().padStart(2, "0")}:${minutes
                .toString()
                .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        },


        buttonText() {
            // Check if it's the last question
            return this.currentQuestionIndex === this.questions.length - 1
                ? "Finish Review"
                : "Next Question";
        },

        // maxIndex() {
        //     const totalWidth = (this.numberWidth + this.gap) * this.numbers.length;
        //     const containerWidth = this.$refs.container?.offsetWidth || 0;
        //     return Math.max(0, Math.ceil((totalWidth - containerWidth) / (this.numberWidth + this.gap)));
        // },
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




    methods: {


        startDrag(event) {
            this.isDragging = true;
            const modal = this.$refs.draggable;
            const rect = modal.getBoundingClientRect();
            this.dragOffsetX = event.clientX - rect.left;
            this.dragOffsetY = event.clientY - rect.top;

            document.addEventListener("mousemove", this.onDrag);
            document.addEventListener("mouseup", this.stopDrag);
        },
        onDrag(event) {
            if (!this.isDragging) return;

            const modal = this.$refs.draggable;
            modal.style.position = "fixed";
            modal.style.left = `${event.clientX - this.dragOffsetX}px`;
            modal.style.top = `${event.clientY - this.dragOffsetY}px`;
            modal.style.margin = 0; // cancel any default margins
        },
        stopDrag() {
            this.isDragging = false;
            document.removeEventListener("mousemove", this.onDrag);
            document.removeEventListener("mouseup", this.stopDrag);
        },


        globalhelp() {
            get("/getglobalhelp").then((res) => {
                console.log('data', res.data.data)

                this.bubbles = res.data.data.value == 0 ? false : true

            });

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


        SectionScroll() {

            console.log('hello world')

            const elements = document.getElementById('app');
            elements.scrollIntoView({ behavior: 'smooth' });


            // const element = document.getElementById('bottom');
            // element.scrollIntoView({ behavior: 'smooth' });


            //   setTimeout(() => {
            //     const elements = document.getElementById('app');
            //     elements.scrollIntoView({ behavior: 'smooth' });

            // }, 200);

            setTimeout(() => {

                this.isRowFixed = false;
            }, 1000);

            //             const section = document.getElementById('sectiontop');
            //   if (section) {
            //     section.scrollTop = 0; // scrolls the section to top
            //     console.log('Scrolled section to top');
            //   }

        },


        //         handleScroll() {

        //     const row = document.getElementById('sectiontop');
        //     if (!this.rowOffsetTop) {
        //       this.rowOffsetTop = row.offsetTop; // Store the initial position of the row
        //     }

        //     const currentScrollPosition = window.scrollY;

        //     console.log('Row Offset:', this.rowOffsetTop);
        //     console.log('Page Scroll:', currentScrollPosition);

        //     // Determine if the user is scrolling up
        //     this.isScrollingUp = currentScrollPosition < this.lastScrollPosition;

        //     console.log('Scrolling Up:', this.isScrollingUp);

        //     // Set row to fixed if scrolling up and past the row's initial position
        //     if (currentScrollPosition > 1 ) {
        //       this.isRowFixed = true;
        //     } else if (currentScrollPosition < 1 ) {
        //       this.isRowFixed = false;
        //     }

        //     // Update the last scroll position
        //     this.lastScrollPosition = currentScrollPosition;
        //   },





        // handleScroll(event) {
        //     const el = event.target;
        //     const scrollTop = el.scrollTop;

        //     console.log('Div scrolled to:', scrollTop);

        //     if (scrollTop > 0) {
        //       this.isRowFixed = true;
        //     } else {
        //       this.isRowFixed = false;
        //     }
        //   },

        handleScroll(event) {
            const scrollTop = event.target.documentElement.scrollTop || event.target.body.scrollTop;
            console.log('down', scrollTop);

            if (scrollTop > 0) {
                this.isRowFixed = true;
                // Scrolling down
                // this.powerUp = true;
                console.log('down');
            } else {
                // Scrolling up
                // this.powerUp = false;
                this.isRowFixed = false;
                console.log('up');
            }

            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative scroll
        },





        removeflage(e) {
            if (this.allquestions[this.currentQuestionIndex]) {
                        this.$set(this.allquestions[this.currentQuestionIndex], 'flag', false);
                    }

                    this.currentQuestion.flag = false

            this.form.questionId = e;
            byMethod(this.method, "/removeflage", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);


                    this.flg = false
                    this.flg2 = false
                    const updatedIndex = this.currentQuestionIndex;
                    console.log("Updated index:", updatedIndex);
                    // if (this.allquestions[updatedIndex]) {
                    //     this.$set(this.allquestions[updatedIndex], 'flag', false);
                    // }


                    this.getFlaged();
                    // this.getReviewsss()
                    this.centerSelectedIndex(this.currentQuestionIndex)

                }
            });

        },

        expandTextarea() {
            this.$refs.feedbackArea.style.height = "64px";

            this.toggleOptions(null)
        },


        shrinkTextareaOnClickOutside(event) {
            const textarea = this.$refs.feedbackArea;
            const form = this.$refs.feedbackForm;

            // Only run if both refs are available
            if (textarea && form && !form.contains(event.target)) {
                textarea.style.height = "13px"; // Reset to initial height
            }
        },

        Showbirdeye() {
            this.reviewfirst = true
            this.fillicon = 0

        },



        // startMock(){
        //     console.log('hello');
        //     this.reviewfirst = false

        // },

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
                        console.log('right');
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
        generateSpecialNumbers() {
            const count = 5 + Math.floor(Math.random() * 2); // 5 ya 6 boxes
            const tempNumbers = [];

            while (tempNumbers.length < count) {
                const randomNum = Math.floor(Math.random() * 50) + 1;
                if (!tempNumbers.includes(randomNum)) {
                    tempNumbers.push(randomNum);
                }
            }

            this.specialNumbers = tempNumbers;
        },
        // toggleAccordion(index) {
        //     this.activeOption = this.activeOption === index ? null : index;
        // },

        toggleAccordion(index) {
            const i = this.activeOptions.indexOf(index);
            if (i !== -1) {
            this.activeOptions.splice(i, 1); // close if already open
            } else {
            this.activeOptions.push(index); // open without closing others
            }
        },
        enter(el, done) {

            el.style.height = '0';
            const height = el.scrollHeight;
            // const height = 100;
            console.log('scrollheight', height)
            requestAnimationFrame(() => {
                el.style.height = `${height}px`;
                el.addEventListener('transitionend', done);
            });
        },
        leave(el, done) {
            const height = el.scrollHeight;
            el.style.height = `${height}px`;
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    el.style.height = '0';
                    el.addEventListener('transitionend', done);
                });
            });
        },
        handleExitMock() {
            this.showPauseModal = false;
            this.$router.push('/mocksection');
        },

        // handleScroll() {
        //     const row = document.getElementById('scroll-row');
        //     if (!this.rowOffsetTop) {
        //         this.rowOffsetTop = row.offsetTop; // Store the initial position of the row
        //     }

        //     const currentScrollPosition = window.scrollY;

        //     console.log('Row Offset:', this.rowOffsetTop);
        //     console.log('Page Scroll:', currentScrollPosition);

        //     // Determine if the user is scrolling up
        //     this.isScrollingUp = currentScrollPosition < this.lastScrollPosition;

        //     console.log('Scrolling Up:', this.isScrollingUp);

        //     // Set row to fixed if scrolling up and past the row's initial position
        //     if (currentScrollPosition > 800 && this.isScrollingUp) {
        //         this.isRowFixed = true;
        //     } else if (currentScrollPosition < 800 || !this.isScrollingUp) {
        //         this.isRowFixed = false;
        //     }

        //     // Update the last scroll position
        //     this.lastScrollPosition = currentScrollPosition;
        // },


        birdseyeView() {
            this.starts = false
            this.review = true

        },


        startreview() {
            this.review = false
            this.starts = true

        },


        setrollingindex(e) {

            // this.rollingindex = e
            this.rollingindex = this.rollingindex === e ? null : e;
            console.log("setrollingindex", e, this.rollingindex)

        },

        toggleRollingIndex(index) {
            if (this.openIndexes.includes(index)) {
                // If already open, remove from array (close it)
                this.openIndexes = this.openIndexes.filter(i => i !== index);
            } else {
                // If closed, add to array (open it)
                this.openIndexes.push(index);
            }
        },

        selectOption(index, option) {
            // If the same option is selected again, deselect it
            this.feedbackCategories[index].selectedOption =
                this.feedbackCategories[index].selectedOption === option ? null : option;
        },

        gotonewpage() {
            this.$router.push('/mocksection')

        },


        // openfeedbackpop() {
        //     const response = this.currentQuestion.feedback ? this.currentQuestion.feedback : ''
        //     console.log('name' , this.feedbackCategories , this.currentQuestion.feedback);

        //     this.feedbackCategories = this.feedbackCategories.map(category => {
        //         const key = category.name.toLowerCase().replace(" ", "_");
        //         if (response[key]) {
        //             category.selectedOption = response[key];
        //         }
        //         return category;
        //     });
        //     this.form.optionfeedback = this.currentQuestion.feedback ? this.currentQuestion.feedback.optionfeedback : ''
        //     this.showPauseModal = true
        //     // $('#exampleModalCenters').modal('show');

        //     // this.feedbackpop = true

        // },


        openfeedbackpop() {
    const response = this.currentQuestion.feedback || '';
    const keyMap = {
        Question: 'question',
        Answer: 'answer',
        Rullingout: 'rulling_out',
        Condition: 'condition',
        Explanation: 'explanation',
        Notes: 'notes',
    };

    this.feedbackCategories = this.feedbackCategories.map(category => {
        const key = keyMap[category.name] || this.toSnakeCase(category.name);
        if (response[key]) {
            category.selectedOption = response[key];
        }
        return category;
    });

    this.form.optionfeedback = this.currentQuestion.feedback?.optionfeedback || '';
    this.showPauseModal = true;
},


        exit() {
            this.$router.push('/mocks')
        },


        toggleOptions(index) {

            console.log('inde', index);
            this.showOptionsIndex = this.showOptionsIndex === index ? null : index;
            // this.showOptionsIndex = index;


        },
        // Method to send selected values to the backend
        submitFeedback() {

            console.log('Sending feedback')
            const selectedFeedback = this.feedbackCategories.map((category) => ({
                name: category.name,
                selectedOption: category.selectedOption,
            }));
            console.log(selectedFeedback);

            this.form.selectedFeedback = selectedFeedback
            this.form.question_id = this.currentQuestion.id;


            byMethod(this.method, "/savefeedback", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);
                    // this.$toast.success("Saved feedback successfully")

                    // this.$toast.success("Saved feedback successfully", {
                    //     timeout: 100,
                    // });
                    this.showPauseModal = false
                    this.toggleOptions(null)
                    const updatedIndex = this.currentQuestionIndex;
                    if (this.allquestions[updatedIndex]) {
                        this.$set(this.allquestions[updatedIndex], 'feedback', true);
                    }
                    // this.feedbackpop = false


                    // this.selectedOptions = null

                    // this.feedbackCategories = [
                    //     { name: "Question", selectedOption: null },
                    //     { name: "Answer", selectedOption: null },
                    //     { name: "Rullingout", selectedOption: null },
                    //     { name: "Condition", selectedOption: null },
                    //     { name: "Explanation", selectedOption: null },
                    //     { name: "Notes", selectedOption: null },
                    // ]

                    // this.showOptionsIndex = null



                    // $("#exampleModalCenters").modal("hide");


                }


                get("/getmockquestion?id=" + this.id).then((res) => {
                    this.setData(res);
                });
            });


        },


        setindexes(e) {
            if (e === 1) {

                this.firstindex = this.firstindex === 'condition' ? null : 'condition';

            }

            if (e === 2) {

                console.log('here');

                this.firstindex = this.firstindex === 'explanation' ? null : 'explanation';

                console.log(this.firstindex)

                this.$nextTick(() => {
                    const explanationContent = document.getElementById('explanation-content');
                    if (explanationContent) {
                        explanationContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });


            }


            if (e === 3) {

                this.fourthindex = this.fourthindex === 'comments' ? null : 'comments';

                this.$nextTick(() => {
                    const explanationContent = document.getElementById('comment-content');
                    if (explanationContent) {
                        explanationContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });

            }

            if (e === 4) {



                this.secondindex = this.secondindex === 'books' ? null : 'books';

                this.$nextTick(() => {
                    const explanationContent = document.getElementById('scroll-row');
                    if (explanationContent) {
                        explanationContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });

            }

            if (e === 5) {

                this.thirdindex = this.thirdindex === 'journals' ? null : 'journals';

                this.$nextTick(() => {
                    const explanationContent = document.getElementById('journal-content');
                    if (explanationContent) {
                        explanationContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                });

            }


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
                    if (option.correct == 1) {
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
                    if (option.correct == 1) {
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
            this.showwarning = false

        },


        cancelPlatpop() {
            this.playagain = false

        },

        stoptimernow() {

            this.playicon = true
            this.stoptimerpopup = false;

            this.stopTimerAndSaveDuration()


        },


        showstoptime() {


            localStorage.setItem("pauseindex", this.currentQuestionIndex);



            this.stoptimerpopup = true;

            this.reviewquest = true

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

            if (this.unanswered > 0) {
                this.showwarning = true;


            }
            else {
                this.scoringpage()
            }
        },

        scoringpage() {
            this.handleBreadcrumpsUpdate('Normal');


            localStorage.setItem('breadcrumps', 'Normal');
            // this.$router.push('/mockscore')
            this.$router.push({ path: `/mockscore/${this.id}` });
            //     this.$router.push({ path: `/mockscore/${this.id}` }).then(() => {
            //   // Reload the page after navigation
            //   window.location.reload();
            // });
        },

        Getflagequestion() {


            localStorage.setItem('breadcrumps', 'Flaged Question');

            this.review = false;
            this.starts = true;
            this.stopTimerAndSaveDuration();

            // setTimeout(() => {
            // get("/getflagedquestion?id=" + this.id).then((res) => {
            //     this.setData(res);
            // });
            // }, 2000);

            localStorage.setItem("question", "flaged");
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            //     get("/getflagedquestion?id=" + this.id).then((res) => {
            //   this.setData(res);

            // });
        },

        Getunanswerquestion() {

            localStorage.setItem('breadcrumps', 'Unanswer Question');

            this.review = false;
            this.starts = true;
            //   this.showflagelist = true

            this.stopTimerAndSaveDuration();

            // setTimeout(() => {
            // get("/getflagedquestion?id=" + this.id).then((res) => {
            //     this.setData(res);
            // });
            // }, 2000);

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

            const updatedIndex = this.currentQuestionIndex;
            console.log("Updated index:", updatedIndex);
            if (this.allquestions[updatedIndex]) {
                this.$set(this.allquestions[updatedIndex], 'flag', true);
            }
            this.form.questionId = e;
            byMethod(this.method, "/saveflage", this.form).then((res) => {
                if (res.data.saved) {
                    console.log(res.data.saved);
                    //   this.nextQuestion();
                    // this.$toast.success('Flagged Question Successfully')
                    this.flg = false


                    // setTimeout(() => {
                    // this.nextQuestion();
                    // }, 500);
                    this.getFlaged();
                    // this.getReviewsss()
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
            this.submitAnswer()
            this.currentQuestion.flag = true
        },

        getFlaged() {
            get("/getflagedcount?id=" + this.id).then((res) => {
                console.log(res.data.data);
                this.flagcounts = res.data.data;
                //   this.setData(res);
            });
        },

        startTimer() {
            console.log("Starting", this.duration);


            const storedDuration = parseInt(localStorage.getItem("remainingsec"));
            if (storedDuration) {
                this.remainingTimeInSeconds = storedDuration;
            } else {
                this.remainingTimeInSeconds = this.duration * 60;
            }
            this.timer = setInterval(() => {
                if (this.remainingTimeInSeconds > 0) {
                    this.remainingTimeInSeconds--;
                } else {
                    console.log("Stopping timersss");
                    this.$toast.error("Your Time Finished");
                    // this.getReviews();
                    this.scoringpage();
                    clearInterval(this.timer);
                }
            }, 1000);
            this.playicon = false
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

        commentsave(e, comment) {
            console.log("id", e);
            this.form.question_id = e;
            this.form.comments = comment;

            byMethod(this.method, "/addmockcomment", this.form)
                .then((res) => {
                    if (res.data.saved) {
                        console.log(res.data.saved);
                        this.$toast.success("Comment saved successfully")



                        get("/getmockquestion?id=" + this.id).then((res) => {
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



        // setInitialSelectedOption() {
        //   const optionWithScore = this.currentQuestion.options.find(
        //     (option) => option.score !== null
        //   );
        //   if (optionWithScore) {
        //     this.selectedOption = optionWithScore;
        //   }
        // },


        setInitialSelectedOption() {
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
                console.log("Total questions after reactivity update:", this.questions.length);

                this.counts = this.questions.length;
                this.loadingcircle = false
            });
            console.log(res.data.data);
            this.resetSelectedOption();
            this.loadershow = false
        },
        nextQuestion() {

            if(this.showPauseModal){
                return
            }


            const ppp = localStorage.getItem("pauseindex");

            if (this.playicon && this.currentQuestionIndex >= ppp) {

                // this.$toast.error('To continue attempting questions, please play timer again')
                this.playagain = true
            }
            else {


                console.log("sss");
                if (this.currentQuestionIndex < this.questions.length - 1) {
                    this.currentQuestionIndex++;
                    this.centerSelectedIndex(this.currentQuestionIndex)
                    this.$refs.reviewDetailRef.resetActiveTab();
                    // this.resetSelectedOption();
                } else {
                    // this.stopTimerAndSaveDuration()

                    alert("Questions End");
                    // this.getReviews();
                    // this.getReviewsss()
                }

            }


            this.selectedOptions = null

            this.feedbackCategories = [


                { name: "Question", selectedOption: null },
                { name: "Answer", selectedOption: null },
                { name: "Rullingout", selectedOption: null },
                { name: "Condition", selectedOption: null },
                { name: "Explanation", selectedOption: null },
                { name: "Notes", selectedOption: null },
            ]

            this.showOptionsIndex = null
        },
        previousQuestion() {




            if(this.showPauseModal){
                return
            }



            if (this.currentQuestionIndex > 0) {

                this.reviewquestioncheck()
                this.currentQuestionIndex--;
                // this.resetSelectedOption();
            }


            this.$refs.reviewDetailRef.resetActiveTab();
            this.centerSelectedIndex(this.currentQuestionIndex)

            this.selectedOptions = null

            this.feedbackCategories = [


                { name: "Question", selectedOption: null },
                { name: "Answer", selectedOption: null },
                { name: "Rullingout", selectedOption: null },
                { name: "Condition", selectedOption: null },
                { name: "Explanation", selectedOption: null },
                { name: "Notes", selectedOption: null },
             

            ]

            this.showOptionsIndex = null

        },
        resetSelectedOption() {
            this.selectedOption = null;
        },
        submitAnswer(e) {

            if (this.playicon) {

                // this.$toast.error('To continue attempting questions, please play timer again')
                this.playagain = true
            }

            else {




                if (this.flg) {
                    this.flagged(this.flagedid)
                    console.log('taba ')

                }

                else {


                    console.log("here", e);
                    this.form.question_id = e;
                    //   this.form.correct = this.selectedOption.correct;
                    this.form.option_id = this.selectedOption;

                    // handle answer submission logic
                    console.log("Selected option:", this.selectedOption, "selected question", e);

                    byMethod(this.method, "/createmockscore", this.form)
                        .then((res) => {
                            if (res.data.saved) {
                                console.log(res.data.saved);
                                // this.nextQuestion();
                                // this.$toast.success('Option Selected')
                                // setTimeout(() => {
                                // this.getReviewsss()
                                this.nextQuestion();
                                // }, 500);
                            }
                        })
                        .catch((error) => {
                            if (error.response.status === 422) {
                                this.errors = error.response.data.errors;
                            }
                            this.isProcessing = false;
                        });
                }

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




                this.unanswered = res.data.unanswered;
                this.incorrectcount = res.data.incorrect
                this.correctcount = res.data.correct

                this.flagcounts = res.data.flagcount;
                this.form.unansweredid = res.data.unansweredid;
                this.form.flaggedid = res.data.flagedid;

            });


            setTimeout(() => {
                get("/getmockquestion?id=" + this.id).then((res) => {
                    this.allquestions = res.data.data
                    this.setData(res);

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

            this.centerSelectedIndex(e)



            console.log('ind', e)

            this.returning = 1

            if (!this.showPauseModal) {
                this.$refs.reviewDetailRef?.resetActiveTab();



                console.log('indexing', e)

                this.showflagelist = false
                this.showunanswerlist = false
                this.fillicon = 1


                console.log('', e);

                localStorage.setItem('presentindex', e);

                localStorage.setItem('breadcrumps', 'Normal');
                this.currentQuestionIndex = e
                this.review = false;
                this.starts = true;
                this.reviewfirst = false;
                this.handleBreadcrumpsUpdate('Normal');

                this.selectedOptions = null

                this.feedbackCategories = [
                    { name: "Question", selectedOption: null },
                    { name: "Answer", selectedOption: null },
                    { name: "Rullingout", selectedOption: null },
                    { name: "Condition", selectedOption: null },
                    { name: "Explanation", selectedOption: null },
                    { name: "Notes", selectedOption: null },
                ]

                this.showOptionsIndex = null

                this.$nextTick(() => {
                        // this.scrollToActiveItem();
                        this.centerSelectedIndex(this.currentQuestionIndex)
                    });

            }

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


        getBackindexheader() {



            this.returning = 1

            if (!this.showPauseModal) {




                this.showflagelist = false
                this.showunanswerlist = false
                this.fillicon = 1




                localStorage.setItem('presentindex', this.currentQuestionIndex);

                localStorage.setItem('breadcrumps', 'Normal');

                this.review = false;
                this.starts = true;
                this.reviewfirst = false;
                this.handleBreadcrumpsUpdate('Normal');

                this.selectedOptions = null

                this.feedbackCategories = [
                    { name: "Question", selectedOption: null },
                    { name: "Answer", selectedOption: null },
                    { name: "Rullingout", selectedOption: null },
                    { name: "Condition", selectedOption: null },
                    { name: "Explanation", selectedOption: null },
                    { name: "Notes", selectedOption: null },
                ]

                this.showOptionsIndex = null
            }

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
        lockBodyScroll() {
            this.scrollPosition = window.pageYOffset;
            document.body.classList.add('body-scroll-lock');
            document.body.style.top = `-${this.scrollPosition}px`;
        },

        unlockBodyScroll() {
            document.body.classList.remove('body-scroll-lock');
            window.scrollTo(0, this.scrollPosition);
            document.body.style.top = '';
        },
    },

}
</script>


<style scoped>

.disabled-btn {
    opacity: 0.5;
    cursor: not-allowed;
}

.questionnumber {

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    min-width: 23.85px;
    min-height: 40px;
    text-align: center;
    padding: 3px 0px;
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

.questionsoptions-arrows {

    padding: 20px 0px 0px 0px;
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
}

.responsive-wrapper {
    width: 100%;
    max-width: 1440px;
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
    width: 100%;
    padding: 0 1rem;
}

.mainscrollview {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1290px;
    height: auto;
    min-height: 80px;
    padding: 0;
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











.accordion-icon svg {
    width: 16px;
    height: 16px;
}

.modal-overlay {
    position: fixed;
    top: 400px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    margin: 0px 20px;
    pointer-events: none;
}

.modal-content {

    -webkit-backdrop-filter: blur(10px);
    padding: 2rem 0rem;
    border-radius: 12px;
    text-align: center;
    width: 1300px;
    height: 65vh;
    display: flex;
    align-items: center;
    justify-content: center;
    transform-origin: top center;
    animation: modal-slide 0.3s ease-out;
    pointer-events: auto;
}

.feedback-form-box {
    border: 1px solid #93959875;
    width: 250px;
    border-radius: 50px;
    background: #fff;
    box-shadow: 0 0 11.34px #00000080;
    padding: 16px 20px 29px 20px;
}

.feedback-form-box h4 {
    padding: 0px 0px 19px 0px;
    color: #231F20;
    font-size: 18px;
}

.feedbackform-button button {
    font-family: Helvetica, Arial, sans-serif;
    border: 1px solid #808285;
    padding: 3px 20px;
    width: 145px;
    margin: 0px 0px 10px 0px;
    border-radius: 30px;
    color: #2F292B;
    cursor: pointer;

}

.feedbackform-submitbtn {
    margin: 19px 0px 0px 0px;
    position: relative;
}

.feedbackform-submitbtn .cardbottom-shadow img {
    width: 150px;
    bottom: -25px;
    left: 50%;
    transform: translate(-50%);
    z-index: 9;
}

.feedbackform-submitbtn button {
    border: 1px solid #20b14b82;
    background: #9DED6C;
    padding: 4px 10px;
    width: 81.96px;
    height: 23.02px;
    border-radius: 30px;
    color: #2F292B;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    z-index: 99;
}

.feeback-question-options {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 0px 0px 10px 0px;
}

.feeback-question-option p {
    font-size: 11px;
}

.feeback-question-option {
    display: flex;
    align-items: center;
    gap: 3px;
}

.active-btn {
    background-color: #9DED6C !important;
    border-color: #20b14b !important;
    font-weight: bold;
    font-family: Avenir, Helvetica, Arial, sans-serif;
}


.feeback-question-option input {
    border: 1px solid #8082857d;
    background: #EAEBEC;
    padding: 3px 25px 3px 10px;
    border-radius: 30px;
    font-size: 12px;
}

.feeback-question-option input:focus {
    outline: none;
}


.feeback-question-option.selected {
    background: #FFF9C4;
    border-radius: 15px;
    padding: 2px 8px;
}

.feeback-question-option input[type="radio"]:checked {
    accent-color: #6B7280;
}



@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}


@keyframes modal-slide {
    from {
        transform: translateY(-100%);
    }

    to {
        transform: translateY(0);
    }
}

/* For leave transition */
.leaving .modal-content {
    animation: modal-slide-up 0.3s ease-in;
}


@keyframes modal-slide-up {
    from {
        transform: translateY(0);
    }

    to {
        transform: translateY(-100%);
    }
}

.questionnumber.special {
    background: #FFBABE !important;
}

.questionnumber {
    background: #9DED6C;
}

.questionnumber.selected {
    background-color: #9DED6C;
}

.questioncomment {
    position: absolute;
    top: 56px;
    right: 30px;
}

.questioncomment button {
    border: none;
    cursor: pointer;
    background: #f1f2f2;
}

.question-option {
    background-color: #FFFFFF;
    border: 1px solid #D1D3D4;
    border-radius: 20px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
}

.question-option.first-option {
    background-color: #9DED6C;
    border-color: #20B14B;
}

.question-option.special-option {
    background-color: #FFBABE !important;
    border-color: #ed1c247a !important;
}

.question-option.active {
    box-shadow: 0 2px 8px rgba(237, 28, 36, 0.1);
}

.option-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.3s ease;
}

.accordion-icon {

    padding: 10px 30px;
    display: flex;
    align-items: baseline;

    transition: transform 0.3s ease;
}

.question-option.active .accordion-icon {
    transform: rotate(0deg);
    transition: transform 0.3s ease;
    padding: 3px 12px 0px 0px;
}

.option-content {
    overflow: hidden;
    transition: height 0.3s ease-out;
    padding: 0px 0px 10px 0px;
}

.question-option.active .option-content {
    max-height: 500px;
    margin: 0px 0px 20px 0px;
}




.option-content p {
    color: #231f20;
    line-height: 1.4;
    text-align: left;
    padding: 10px 50px 0 36px;
}



.question-option.active {
    /* border-color: #ED1C24; */
    box-shadow: 0 2px 8px rgba(237, 28, 36, 0.1);
}

/* Keep existing styles and add these at the end */
.lucide-chevron-left-icon,
.lucide-chevron-right-icon {
    cursor: pointer;
    transition: color 0.3s ease;
}

.questioncomment:hover button {
    background: #f1f2f2;
}

.no-scroll {
    overflow: hidden !important;
    position: fixed;
    width: 100%;
    height: 100%;
}


.feedback-textarea {
    font-size: 13px;
    resize: none;
    font-family: Helvetica;
    border: none;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    background: transparent;
    font-style: italic;
    padding: 3px 3px 3px 3px;
    color: black;
    font-weight: 300;
    font-family: Helvetica;
    height: 12px;
}

.feedback-textarea::-webkit-scrollbar {
    width: 3px;
}

/* Track */
.feedback-textarea::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 10px;
    cursor: pointer;
}

.feedback-textarea::-webkit-scrollbar-thumb {
    background: #808285;
    border-radius: 10px;
}

.feedback-textarea:focus {
    outline: none;
}

.feedback-textarea-box {
    width: 70%;
    margin: 0 auto;
    border: 1px solid #20b14bb8;
    border-radius: 13px;
    padding: 3px 8px;
    background: #ffffff94;
    font-size: 14px;
    color: black
}

textarea.feedback-textarea::placeholder {
    color: black;
    font-size: 10px;
}


.cross {

    padding-top: 5px;
    padding-right: 4px;
    position: relative
}

span.crossspan {
    cursor: pointer;
    font-weight: bold;
    position: absolute;
    right: 4px;
    top: 5px;

}

#sectiontop {

    overflow-y: auto;
}


@media only screen and (max-width: 1600px) {

    .modal-content {




        height: 60vh;
        display: flex;
        align-items: flex-start;

    }

}

@media only screen and (min-height: 1024px) {

    .question-option-tabsbox-scroll {
        height: 800px;
    }


    .modal-content {

        padding-bottom: 200px;
    }

}


@media only screen and (max-width: 425px) {
    .mocktxt {
        width: 200px;
    }
}
</style>