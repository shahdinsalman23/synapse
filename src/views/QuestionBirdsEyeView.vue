<template>
    <div>
       


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



        <section class="mockbirdseye-sec">
            <div class="container">
                <div class="birdsaeye-head">
                    <h6>Bird's Eye View</h6>
                </div>
                <div class="mockbirdseye-wrapper">
                    <div class="mockbirdseye-boxes">
                        <h4 v-for="(que, index) in question" :key="index" @click="$emit('goto-question', index)">
                            <span
                                class="birdseye-box-inner"
                                :style="boxStyle(que, index)"
                            >{{ index + 1 ?? que.question_no }}</span>

                            <span v-if="que.flag" class="birdseye-flag-icon">
                                <svg width="12" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24"/>
                                </svg>
                            </span>

                            <svg v-if="que.feedback" class="birdseye-feedback-icon" width="13" height="14"
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
                        </h4>
                    </div>
                </div>
                <div class="mockbird-submitbtn">
                    <button @click="$emit('showbirds')">Return</button>
                    <div class="cardbottom-shadow">
                        <img src="/images/cardshadow.png" alt="">
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

export default {
    name: "MockBirdsEye",

    props: {
        question: Array,
        currentQuestionIndex: {
            type: Number,
            default: 0,
        },
    },

    methods: {
        isPresentIndex(index) {
            return this.currentQuestionIndex !== null
                && parseInt(this.currentQuestionIndex, 10) === index;
        },

        boxStyle(que, index) {
            const background = Number(que.score?.correct) === 1
                ? '#9ded6c'
                : (que.score?.correct != null && Number(que.score?.correct) !== 1
                    ? '#ffbabe'
                    : '#f1f2f2');

            let border = '';
            if (this.isPresentIndex(index)) {
                if (que.score) {
                    border = Number(que.score.correct) === 1
                        ? '2px solid green'
                        : (Number(que.score.correct) === 0 ? '2px solid red' : '2px solid black');
                } else {
                    border = '2px solid black';
                }
            }

            return { background, border, cursor: 'pointer' };
        },
    },
}
</script>

<style scoped>
.mockbirdseye-sec {
    padding: 20px 0;
}

.birdsaeye-head {
    padding: 12px 0px 20px 0px;
}

.birdsaeye-head h6 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 12px;
    background-color: #1A90FF;
}

.mockbirdseye-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
}

.mockbirdseye-boxes {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    width: 100%;
    overflow-x: auto;
    overflow-y: scroll;
    height: 570px;
    padding: 0px 10px 0px 0px;
    scrollbar-width: thin;       
    scrollbar-color: #ccc transparent;
    align-content: start;
}

.mockbirdseye-boxes::-webkit-scrollbar {
    width: 6px;
}

.mockbirdseye-boxes::-webkit-scrollbar-track {
    background: transparent;
}

.mockbirdseye-boxes::-webkit-scrollbar-thumb {
    background-color: #bbb;
    border-radius: 4px;
}

.mockbirdseye-boxes::-webkit-scrollbar-button {
    display: none; 
}


.mockbirdseye-boxes h4 {
    margin: 0;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.birdseye-box-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 57.13px;
    height: 49.27px;
    border-radius: 10px;
    font-size: 14px;
    color: #000;
    font-weight: 600;
    font-family: Helveticacondensed;
    box-sizing: border-box;
}

.birdseye-flag-icon {
    position: absolute;
    top: 2px;
    left: 10px;
    z-index: 1;
    pointer-events: none;
}

.birdseye-flag-icon svg {
    width: 12px;
    height: 14px;
}

.birdseye-feedback-icon {
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 1;
    pointer-events: none;
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


.birdsaeye-head {
    margin-top: 0px;
}

.mockbird-submitbtn {
    padding: 43px 0px 53px 0px;
}


@media (max-width: 768px) {
    .mockbirdseye-boxes {
        grid-template-columns: repeat(10, 1fr);
    }

    .birdseye-box-inner {
        width: 45px;
        height: 40px;
        font-size: 12px;
    }

    .birdseye-flag-icon svg {
        width: 10px;
        height: 12px;
    }

    .birdseye-feedback-icon {
        width: 11px;
        height: 12px;
    }
}
</style>
