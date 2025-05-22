<template>
    <div>
        <section class="mockreview-birdsaye-sec">
            <div class="container">
                <div class="birdsaeye-head">
                    <h6>Bird's Eye View</h6>
                </div>
                <div class="reviewmockbirdseye-boxes">
                    <h4 v-for="(nav, indexnav) in allquestions" :key="indexnav"
                       
                        @click="toggleNumber(indexnav)">
                        <router-link to="" :class="{ 'isselected': isPresentIndexs(indexnav) }"
                        
                        :style="{
                            background: nav.score
                                ? (nav.score.correct === 1
                                    ? '#9DED6C'
                                    : (nav.score.correct === 0
                                        ? '#FFBABE'
                                        : 'white'))
                                : (nav.flag
                                    ? '#d2cbcb'
                                    : (nav.skip
                                        ? '#F1F2F2'
                                        : '#F1F2F2')),

                                        color: nav.flag
                                        ? 'black'
                                        : (nav.score
                                            ? 'black'
                                            : (nav.skip
                                                ? 'black'
                                                : 'black')),


                                                border: isPresentIndexs(indexnav)
                                                ? (
                                                  nav.score
                                                    ? (nav.score.correct === 1
                                                      ? '2px solid green'
                                                      : (nav.score.correct === 0
                                                        ? '2px solid red'
                                                        : '2px solid black'))
                                                    : (nav.flag
                                                      ? '2px solid black'
                                                      : (nav.skip
                                                        ? ' 2px solid black'
                                                        : ' 2px solid black'))
                                                ) 
                                                : ''
                                       


                        }"
                        >{{ indexnav + 1 }}</router-link>
                        <span v-if="nav.flag" class="flag-icons">
                            <svg width="13" height="16" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24"/>
                            </svg>
                        </span>

                        <svg class="flag-icon" v-if="nav.feedback" width="13" height="14"
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
                <div class="mockbird-submitbtn">
                    <button @click="startMock">{{returning == 1 ? 'Return':'Start Review'}}</button>
                

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

    props: {
        currentQuestionIndex: {
      
    },
    allquestions: {
     
    },
  
    returning: {
     
    },
    
  },
    data() {
        return {
            selectedNumbers: [],
            specialNumbers: [],
            
        }
    },
    methods: {

        isPresentIndexs(indexnav) {
            //   const presentindex = localStorage.getItem('presentindex');
            const presentindex = this.currentQuestionIndex
            console.log(presentindex);

            // If presentindex is in local storage, compare it with indexnav
            return presentindex !== null && parseInt(presentindex, 10) === indexnav;
        },
        toggleNumber(indexnav) {
            this.$emit('getBackindex' , indexnav);
            // if (this.selectedNumbers.includes(num)) {
            //     this.selectedNumbers = this.selectedNumbers.filter(n => n !== num)
            // } else {
            //     this.selectedNumbers.push(num)
            // }
        },

        startMock(){

            console.log('yyyyyyyyyyyyy')
            this.$emit('startMocks');
          
        },
        generateSpecialNumbers() {
            const specialCount = 12; // Change to 10 if you want exactly 10
            const numbers = new Set();
            while (numbers.size < specialCount) {
                const randomNum = Math.floor(Math.random() * 180) + 1;
                numbers.add(randomNum);
            }
            this.specialNumbers = Array.from(numbers);
        }
    },
    mounted() {
        this.generateSpecialNumbers();
    }
}

</script>



<style scoped>

.mockreview-birdsaye-sec {
    padding: 43px 0px 0px 0px;
}

.reviewmockbirdseye-boxes {
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    width: 100%;
    overflow-x: auto;
    min-height: 530px;
    align-items: start;


}


.reviewmockbirdseye-boxes h4 {
    margin: 0;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

.reviewmockbirdseye-boxes h4 a {
    text-decoration-line: none;
    color: #000000;
    border-radius: 10px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 57.13px;
    height: 49.27px;
    font-size: 14px;
    font-family: Helveticacondensed;
    background: #9DED6C;
}

.reviewmockbirdseye-boxes h4 a.special-box {
    background: #FFBABE !important;
}

.reviewmockbirdseye-boxes h4 a:hover {
    background: #20B14B;
    color: #fff;
}

.flag-icon {
    position: absolute;
    top: 4px;
    right: 10px;
    z-index: 1;
}


.flag-icons {
    position: absolute;
    top: 2px;
    left: 10px;
    z-index: 1;
}
span.flag-icon svg {
    width: 13.5px;
    height: 13.5px;
}

@media only screen and (max-width: 1024px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(15, 1fr) !important;
    }
}

@media only screen and (max-width: 992px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(12, 1fr) !important;
    }
}

@media only screen and (max-width: 768px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(11, 1fr) !important;
    }
}

@media only screen and (max-width: 600px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(9, minmax(40px, 1fr)) !important;
    }
}

@media only screen and (max-width: 425px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(7, minmax(40px, 1fr)) !important;
    }
}

@media only screen and (max-width: 375px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(6, minmax(40px, 1fr)) !important;
    }
}

@media only screen and (max-width: 320px) {
    .reviewmockbirdseye-boxes {
        grid-template-columns: repeat(5, minmax(40px, 1fr)) !important;
    }
}



</style>