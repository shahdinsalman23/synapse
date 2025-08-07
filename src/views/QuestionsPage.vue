<template>
    <div>
        <QuestionHeader />


        <section class="question-breadcrum">
            <div class="container">
                <!-- 🔹 Breadcrumb -->
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
        </section>


        <section class="questionnumber-sec">
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
                            <span class="questionnumber" v-for="n in 180" :key="n"
                                :class="{ activeindex: n === activeNumber }" @click="setActive(n)">{{ n }}</span>
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
        </section>


        <div class="questiontext-sec">
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
                                        <!-- Minus icon -->
                                        <path d="M5 12H19" stroke="#231F20" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <!-- Plus icon -->
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
        </div>


    </div>
</template>


<script>
import QuestionHeader from '@/components/QuestionHeader.vue';
import MockReviewDetail from "@/components/MockReviewDetail.vue"

export default {
    name: 'QuestionsPage',
    components: {
        QuestionHeader,
        MockReviewDetail,
    },
    data() {
        return {
            activeNumber: 1,
            scrollInterval: null,
            scrollSpeed: 10,
            openedOption: null,
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
    methods: {
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
        }
    }

}
</script>


<style scoped>
.questionnumber-slide {
    overflow-x: auto;
    scroll-behavior: smooth;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.question-option {
    background-color: #FFFFFF;
    border: 1px solid #D1D3D4;
    border-radius: 20px;
    transition: all 0.3s ease;
    margin: 0px 0px 22px 0px;
}

.option-header {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: background-color 0.3s ease;
}

.option-content p {
    color: #231f20;
    line-height: 1.4;
    text-align: left;
    padding: 2px 0 0 36px;
}


.accordion-icon {
    padding: 10px 30px;
    display: flex;
    align-items: baseline;
    transition: transform 0.3s ease;
}


.questionsoptions-arrows {
    grid-template-columns: 1fr 225px 1fr !important;
}


.option-content p {
    padding: 2px 0 15px 36px;
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

.activeindex {
    transform: translate(0px, 10px) !important;
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

.questionleft-arrow, .questionright-arrow {
    transform: translate(0px, 10px);
}

.questiontext-sec {
    min-height: calc(100vh - 270px);
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

</style>