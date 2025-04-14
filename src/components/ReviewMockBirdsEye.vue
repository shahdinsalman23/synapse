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
                                        ? '#d2cbcb'
                                        : 'white')),

                                        color: nav.flag
                                        ? 'black'
                                        : (nav.score
                                            ? 'black'
                                            : (nav.skip
                                                ? 'black'
                                                : 'black')),
                                       


                        }"
                        >{{ indexnav + 1 }}</router-link>
                        <span v-if="nav.flag" class="flag-icon">
                            <svg width="14.52" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24"/>
                            </svg>
                        </span>
                    </h4>
                </div>
                <div class="mockbird-submitbtn">
                    <button @click="startMock">Start review</button>
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
  
    
  },
    data() {
        return {
            selectedNumbers: [],
            specialNumbers: []
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
    font-weight: 400;
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
    top: 2px;
    right: 7px;
    z-index: 1;
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