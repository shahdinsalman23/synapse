<template>
    <div>
        <section class="reviewscroll-sec">
            <div class="container">
                <div class="questionnumber-slide-container" ref="container">
                    <div class="questionleft-arrow" @mouseenter="startScroll('left')" @mouseleave="stopScroll"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-chevron-left-icon lucide-chevron-left">
                            <path d="m15 18-6-6 6-6" />
                        </svg></div>

                    <div class="slider-wrapper">
                        <div class="questionnumber-slide" :style="slideStyle">
                            <span v-for="number in numbers" :key="number" class="questionnumber"
                                :class="{ 'questionnumber': true, selected: selectedNumbers.includes(number), 'special': specialNumbers.includes(number) }"
                                @click="toggleNumber(number)">
                                {{ number }}
                                <!-- Ye flag sirf selected numbers pe dikhega -->
                                <svg v-if="selectedNumbers.includes(number)" class="red-flag" width="11"
                                    viewBox="0 0 19 17">
                                    <path
                                        d="M9.09 1.53C6.15-0.15 3.06-0.31 0.1 1.03v13.53C2.84 13.13 5.71 13.17 8.43 14.73c1.63.93 3.31 1.4 5 1.4 1.69 0 3.36-.47 5-1.4l.34-.19V.96l-1 .57c-2.84 1.62-5.83 1.62-8.67 0z"
                                        fill="#ED1C24" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div class="questionright-arrow" @mouseenter="startScroll('right')" @mouseleave="stopScroll"><svg
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-chevron-right-icon lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg></div>
                </div>
            </div>
        </section>

        <section class="questiontext-sec">
            <div class="container">
                <div class="question-option-tabsbox-scroll">
                    <div class="questiontext-box">
                        <p>A 39-year-old female has presented to A&E with right sided abdominal pain for three days. She
                            reports nausea and decreased appetite. Her background includes alcohol excess and polycystic
                            ovarian syndrome. On examination she is noted to be jaundiced, tachypnoeic and febrile.
                            Blood
                            tests reveal raised Bilirubin, ALT, AST, Alkaline phosphatase, and Gamma GT. Computer
                            records
                            show that she has not lost any weight and her BMI is 31. What is the most probable
                            underlying
                            diagnosis?</p>
                        <span class="questionflag">
                            <svg width="19" height="17" viewBox="0 0 19 17" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z"
                                    fill="#ED1C24" />
                            </svg>
                            <span class="flag-hover-text">Flag Question</span>
                        </span>
                        <div class="questioncomment">
                            <button><svg width="20" height="21" viewBox="0 0 20 21" fill="none"
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
                                </svg></button>
                        </div>
                    </div>
                    <div class="question-alloptions">
                        <div v-for="(option, index) in options" :key="option.id" class="question-option"
                            :class="{ active: activeOption === index, 'special-option': option.id === 4, 'first-option': option.id === 1 }">
                            <div class="option-header" @click="toggleAccordion(index)">
                                <h4>{{ option.text }}</h4>
                                <div class="accordion-icon">
                                    <svg v-if="activeOption === index" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 12H19" stroke="#231F20" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 5V19" stroke="#231F20" stroke-width="2" stroke-linecap="round" />
                                        <path d="M5 12H19" stroke="#231F20" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                </div>
                            </div>
                            <transition @enter="enter" @leave="leave" :css="false">
                                <div v-if="activeOption === index" class="option-content">
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
                        <div class="questionoption-rightarrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </div>
                    </div>
                    <div class="brake-border"></div>
                    <MockReviewDetail/>
                </div>
            </div>
        </section>

    </div>
</template>



<script>

import MockReviewDetail from "../components/MockReviewDetail.vue"

export default {
    components: {
        MockReviewDetail,
    },
    data() {
        return {
            currentIndex: 0,
            numbers: Array.from({ length: 50 }, (_, i) => i + 1),
            scrollInterval: null,
            scrollDirection: null,
            selectedNumber: null,
            selectedNumbers: [],
            specialNumbers: [],
            scrollSpeed: 300,
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
            ]
        }
    },
    mounted() {
        this.generateSpecialNumbers();
        this.calculateVisibleNumbers();
        window.addEventListener('resize', this.calculateVisibleNumbers);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.calculateVisibleNumbers);
    },
    computed: {
        maxIndex() {
            const totalWidth = (this.numberWidth + this.gap) * this.numbers.length;
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
        toggleAccordion(index) {
            this.activeOption = this.activeOption === index ? null : index;
        },
        enter(el, done) {
            el.style.height = '0';
            const height = el.scrollHeight;
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
        }
    }
}
</script>


<style scoped>
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
    padding: 6px 10px 0px 0px;
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
}

.question-option.active .option-content {
    max-height: 500px;
    margin: 0px 0px 20px 0px;
}

.option-content p {
    color: #231F20;
    line-height: 1.6;
    text-align: left;
    padding: 10px 0px 0px 36px;
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
</style>