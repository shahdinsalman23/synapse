<template>
    <div>

        <Loadingcircle v-if="loading"/>

   
    <div v-else>
        <div v-if="!showing">


            <section class="mocksection-pg">
                <div class="container">
                    <div class="mock-container">
                        <div class="mock-card" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" v-for="(items, index) in title" :key="index">
                            <div class="mock-image">
                                <!-- <img src="/images/mock1.png" alt="" @click="showselections(1)"> -->
                                <img :src="`/images/mock${index + 1}.png`" alt="" @click="content(items , index)">
                                    <div class="cardbottom-shadow" :class="`shadow-${index}`">
                                         <img src="/images/cardshadow.png" v-if="items.exit" alt=""  style="bottom:16px">
                                         <img src="/images/cardshadow.png" v-else alt=""  :style="(items.score && items.score.length > 0 && !items.exit) ? { bottom: '18px' } : {}">

                                    </div>
                                <div class="mock-imageabslt-btn">
                                    <!-- <button class="pause-mockabslt" v-if="items.exit" @click="content(items)" style="cursor:pointer"><i class="fa-solid fa-pause"></i></button> -->
                                    <button class="replay-mockabslt" @click.stop="deletescore(items.id)"><img src="images/replay-icon.png" alt=""></button>
                                </div>

                              
                                <attempt-progress-button v-if="items.score && items.score.length > 0 && !items.exit"  :item='items' />

                              


                                  
<!-- 
                                        <CircularProgress v-if="items.score && items.score.length > 0 && !items.exit" :percentage="50" 
                                            :fontSize="16" 
                                        :color="'black'" :height="7" :Gap="8" /> -->

                                    <!-- <div class="progress-btn" v-else-if="items.exit"> -->
                                    <div class="progress-btn" v-else-if="items.exit">

                                      
                                        <button style="background:#FBAD1F" ></button>
                                        <img class="progressicon" src="/images/pauseyellowicon.png" />

                                    </div>

                                    

                                    <!-- <div class="progress-btn"  v-else>
                                        <button>Not attempted yet</button>
                                    </div> -->
                                   
                            </div>
                        </div>
                        <!-- <div class="mock-card" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                            <div class="mock-image">
                                <img src="/images/mock2.png" alt="" @click="showselections(2)">
                                <div class="mock-imageabslt-btn">
                                    <button class="pause-mockabslt"><i class="fa-solid fa-pause"></i></button>
                                    <button class="replay-mockabslt"><img src="images/replay-icon.png" alt=""></button>
                                </div>
                                <div class="progress-btn">
                                    <button>Not attempted yet</button>
                                </div>
                            </div>
                        </div> -->
                       
                    </div>
                </div>
            </section>

            <div class="questions-notes-mock-sec">
                <div class="container">
                    <div class="question-note-boxes">
                        <div class="question-box" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" style="cursor:pointer" @click="openExitAlert('Question')">
                            <h3><img src="/images/questionmark.png" alt=""> Questions</h3>
                            <div class="question-score">
                                <h6>score</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 54%"></div>
                                    </div>
                                   
                                </div>
                                <div class="progress-text">54%</div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>
                        <div class="note-box" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                             <div class="imgdiv">
                                <img src="/images/lock.png" class="lock-img" alt="">
                                <span class="lock-hover-text">Locked section</span>
                            </div>
                            <h3><img src="/images/file.png" alt=""> Notes</h3> 
                            <!-- <div class="note-score">
                                <h6>Progress</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 54%"></div>
                                    </div>
                                    <div class="progress-text">54%</div>
                                </div>
                            </div> -->
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>

                           
                          
                        </div>
                        <div class="mock-box" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                            <h3><img src="/images/brain.png" alt=""> Mocks</h3>
                            <div class="question-score">
                                <h6>score</h6>
                                <div class="progress-container">
                                    <div class="progress-bar" style="background: transparent;">
                                        <!-- <div class="progress-fill" style="width: 66%"></div> -->
                                        <div class="progress-fill" :style="{ width: averageScore + '%' }"></div>

                                    </div>
                                   
                                </div>
                                <div class="progress-text">{{averageScore}}%</div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showExitPopup" class="overlay">
                <div class="popup">
                  <p>Are you sure you want to exit mock screen?</p>
          
                  <div class="actions">
                    <button class="yes" @click="confirmExit">Yes</button>
                    <button class="no" @click="showExitPopup = false">No</button>
                  </div>
                </div>
              </div>
        </div>

        
      

       

        <MockSelection v-else :indexing="indexing" />

    </div>

  
</div>
</template>


<script>
import AttemptProgressButton from '@/components/AttemptProgressButton.vue';
import MockSelection from './MockSelection.vue';
import Vue from 'vue';
import { get } from './lib/api';
import Loadingcircle from '@/components/Loadingcircle.vue';
// import CircularProgress from '@/components/CircularProgress.vue'

export default {
    name: "MockSection",
    components: {
        AttemptProgressButton,
        MockSelection,
        Loadingcircle,
        // CircularProgress
    },

    data() {
        return {
            exitpage:'',
            showExitPopup:false,
            loading:true,
            showing: false,
            indexing: 0,
            showscore: true,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirm: "",
            isLoading: false,
            title: [],
            showscore1: true,
            showscore2: false,
            showscore3: false,
            selectedItem: null,
            animationbutton: false,
            loadershow: true,
            percentage:0


        }
    },


    created() {

        console.log(window.innerWidth , window.innerHeight);

            console.log('toekn' , localStorage.getItem('token'))

        get('/getmocks')
            .then((res) => {

                this.setData(res)

            })





    },

    computed: {
        averageScore() {
            // Filter mocks that have scores and are not exited
            const mocksWithScores = this.title.filter(item => 
                item.score && 
                item.score.length > 0 && 
                !item.exit &&
                item.quest &&
                item.quest.length > 0
            );

            if (mocksWithScores.length === 0) {
                return 0;
            }

            // Calculate score for each mock: (correct answers / total questions) * 100
            const scores = mocksWithScores.map(item => {
                const correctCount = item.score.filter(s => s.correct == 1).length;
                const totalQuestions = item.quest.length;
                return (correctCount * 100) / totalQuestions;
            });

            // Calculate average
            const sum = scores.reduce((acc, score) => acc + score, 0);
            const average = sum / scores.length;
            
            // Return rounded average
            return Math.round(average);
        }
    },

    methods: {
        openExitAlert(e){
      this.exitpage = e
      this.showExitPopup = true;
    },
    confirmExit() {
      this.showExitPopup = false;
      if(this.exitpage == 'Question'){
        this.$router.push('/mlalistselection');
      }
      else{
        this.$router.push('/mocksection');
      }

     
    },

        showselections(e) {
            this.indexing = e
            this.showing = true
        },

        setData(res) {


            Vue.set(this.$data, 'title', res.data.data)
            Vue.set(this.$data, 'percentage', res.data.percentage)


            console.log('here', res.data.data)
            this.loadershow = false
            this.loading = false

            

           

        },


        SetScoreShow() {
            this.showscore = !this.showscore;
        },

        SetScoreShows(e) {

            if (e == 1) {
                this.showscore2 = false;
                this.showscore3 = false;

                this.showscore1 = !this.showscore1;

            }
            if (e == 2) {
                this.showscore1 = false;
                this.showscore3 = false;
                this.showscore2 = !this.showscore2;

            }

            if (e == 3) {
                this.showscore1 = false;
                this.showscore2 = false;
                this.showscore3 = !this.showscore3;

            }
        },


        deletescore(id) {

            get("/deletescore?id=" + id).then((res) => {
                if (res.data.deleted) {

                    // this.$toast.success("Score Successfully Reset");
                    console.log("deleted")
                    get('/getmocks')
                        .then((res) => {

                            this.setData(res)

                        })
                }

            });

        },
        getButtonColor(items) {
            // Return green if score exists and has length > 0, otherwise red
            return items.score && items.score.length > 0 ? '#63B045' : 'red';
        },

       


        content(e , index) {
            console.log('yes', e)
            this.selectedItem = e;

            localStorage.setItem('mockindex', index + 1);

            setTimeout(() => {

                if (e.score && e.score.length > 0 && !e.exit) {
                    console.log('heading', e)
                    // this.$toast.warning('Already Attempted')
                    localStorage.setItem('mockObject', JSON.stringify(e));
                    localStorage.setItem('question', 'normal');
                    localStorage.setItem("remainingsec", null);


                    this.$router.push({ path: `/reviewscroll/${e.id}` });

                }
                else if (e.exit) {

                    // this.$toast.warning('Already Paused')


                    localStorage.setItem('question', 'exitmock');
                    this.$router.push({ path: `/mocksquestion/${e.id}` });
                }

                else {


                    localStorage.setItem('mockObject', JSON.stringify(e));
                    localStorage.setItem('question', 'normal');
                    localStorage.setItem("remainingsec", null);
                    // this.$router.push('/contentmap');
                    // this.$router.push({ path: `/startmockquestion/${e.id}` });
                    this.indexing = e
                    this.showing = true
                }
            }, 500);

        },
       
    }
};
</script>



<style scoped>

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  
  .popup {
    background: #fff;
    padding: 20px 25px;
    border-radius: 8px;
    width: 320px;
    text-align: center;
  }
  
  .actions {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  
  button {
    padding: 8px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .yes {
    background: #e53935;
    color: white;
  }
  
  .no {
    background: #ccc;
  }
  
  .exit-text {
    color: #1976d2;
    cursor: pointer;
    text-decoration: underline;
  }
  

.progress-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

img.progressicon {
    border: none;
    padding: 0;
}





.lock-hover-text {
    position: absolute;
    width: 95px;
    left: 4%;
    top: -2px;
    font-size: 10px;
    background-color: #9DED6C;
    padding: 3px 3px;
    border-radius: 6px;
    color: #000000;
    visibility: hidden;
    opacity: 0;
}

.lock-hover-text::before {
    position: absolute;
    content: "";
    background: #9DED6C;
    width: 10px;
    height: 10px;
    bottom: -9px;
    clip-path: polygon(0 0, 0% 100%, 100% 0);
    right: 55px;
}
img {
    cursor: pointer;


}

.progress-container {
    position: relative;
    width: 100%;
}

.progress-bar {
    height: 10px;
    background: #D1D3D4;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    border: 1px solid white;
   
}

.progress-fill {
    height: 100%;
    background: #9DED6C;
    border-radius: 14px;
    transition: width 0.3s ease-in-out;
    position: relative;
    z-index: 1;
    border-right: 1px solid #6d6e716e;
}

.progress-text {
 
    color: white;
    font-size: 17px;
   
    z-index: 2;
    user-select: none;
    pointer-events: none;
    font-family: HelveticaBoldcont;
}


.question-score {
    display: flex;
    gap: 8px;
    position: relative;
    align-items: center;
}


[data-aos] {
    visibility: hidden;
}

[data-aos].aos-animate {
    visibility: visible;
}


.mock-image {
    position: relative;
}

.mock-imageabslt-btn {
    position: absolute;
    top: 57%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
}


.mock-imageabslt-btn .replay-mockabslt img {
    width: 25px;
    height: 25px;
    border: none;
    padding: 0px;
}

.mock-imageabslt-btn .replay-mockabslt {
    background: transparent;
    border: none;
}


.mock-imageabslt-btn .pause-mockabslt {
    width: 40px;
    height: 40px;
    font-size: 24px;
    border-radius: 20px;
    background: #FFF057;
    border: none;
    line-height: 10px;
}


.mock-image .cardbottom-shadow img {
    border: none;
    padding: 0px;
    bottom: -22px;
    left: 50%;
    transform: translate(-50%);
    width: 290px;
    z-index: 0;
    opacity: 0.7;
}


/* 
@media only screen and (max-width: 2698px) {
    .shadow-1 img {
        width: 270px !important;
        bottom: 13.5% !important;
    }
} */



</style>