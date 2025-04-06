<template>
    <div>
        <section class="questionnumber-sec">
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
                                :class="{ selected: selectedNumbers.includes(number) }" @click="toggleNumber(number)">
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

        <div class="questiontext-sec">
            <div class="container">
                <div class="questiontext-box">
                    <p>A 39-year-old female has presented to A&E with right sided abdominal pain for three days. She
                        reports nausea and decreased appetite. Her background includes alcohol excess and polycystic
                        ovarian syndrome. On examination she is noted to be jaundiced, tachypnoeic and febrile. Blood
                        tests reveal raised Bilirubin, ALT, AST, Alkaline phosphatase, and Gamma GT. Computer records
                        show that she has not lost any weight and her BMI is 31. What is the most probable underlying
                        diagnosis?</p>
                    <span class="questionflag"><svg width="19" height="17" viewBox="0 0 19 17" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z"
                                fill="#ED1C24" />
                        </svg>
                    </span>
                </div>
                <div class="question-alloptions">
                    <div class="question-option">
                        <h4>A. Primary billiary cholangitis</h4>
                    </div>
                    <div class="question-option">
                        <h4>B. Pancreatic cancer</h4>
                    </div>
                    <div class="question-option">
                        <h4 class="selected">C. Cholecystitis</h4>
                    </div>
                    <div class="question-option">
                        <h4>D. Alcoholic liver disease</h4>
                    </div>
                    <div class="question-option">
                        <h4>E. Acute cholangitis</h4>
                    </div>
                </div>
                <div class="questionsoptions-arrows">
                    <div class="questionoption-leftarrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-chevron-left-icon lucide-chevron-left">
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                    </div>
                    <div class="questionoption-rightarrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-chevron-right-icon lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            currentIndex: 0,
            numbers: Array.from({ length: 50 }, (_, i) => i + 1),
            scrollInterval: null,
            scrollDirection: null,
            selectedNumber: null,
            selectedNumbers: [],
            scrollSpeed: 300,
            numberWidth: 24,
            gap: 1
        }
    },
    mounted() {
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
        }
    }
}
</script>
