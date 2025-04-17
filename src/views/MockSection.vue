<template>
    <div>
        <div v-if="!showing">


            <section class="mocksection-pg">
                <div class="container">
                    <div class="mock-container">
                        <div class="mock-card" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" v-for="(items, index) in title" :key="index">
                            <div class="mock-image">
                                <!-- <img src="/images/mock1.png" alt="" @click="showselections(1)"> -->
                                <img src="/images/mock1.png" alt="" @click="content(items)">

                                <div class="mock-imageabslt-btn">
                                    <button class="pause-mockabslt" v-if="items.exit" @click="content(items)" style="cursor:pointer"><i class="fa-solid fa-pause"></i></button>
                                    <button class="replay-mockabslt" @click.stop="deletescore(items.id)"><img src="images/replay-icon.png" alt=""></button>
                                </div>
                                <attempt-progress-button v-if="items.score && items.score.length > 0 && !items.exit"  :item='items' />

                                    <div class="progress-btn" v-else-if="items.exit">
                                        <button style="background:#FFF057" > Resume at {{ Math.round(items.exit.remaining_time / 60) }} min</button>
                                    </div>

                                    <div class="progress-btn"  v-else>
                                        <button>Not attempted yet</button>
                                    </div>
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
                        <div class="question-box" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800">
                            <h3><img src="/images/questionmark.png" alt=""> Question</h3>
                            <div class="question-score">
                                <h6>score</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 54%"></div>
                                    </div>
                                    <div class="progress-text">54%</div>
                                </div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>
                        <div class="note-box" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                            <h3><img src="/images/file.png" alt=""> Notes</h3>
                            <img src="/images/lock.png" class="lock-img" alt="">
                            <div class="note-score">
                                <h6>Progress</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <!-- <div class="progress-fill" style="width: 54%"></div> -->
                                    </div>
                                    <!-- <div class="progress-text">54%</div> -->
                                </div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>
                        <div class="mock-box" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                            <h3><img src="/images/brain.png" alt=""> Mocks</h3>
                            <div class="question-score">
                                <h6>score</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 66%"></div>
                                    </div>
                                    <div class="progress-text">66%</div>
                                </div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


       

        <MockSelection v-else :indexing="indexing" />

    </div>
</template>


<script>
import AttemptProgressButton from '@/components/AttemptProgressButton.vue';
import MockSelection from './MockSelection.vue';
import Vue from 'vue';
import { get } from './lib/api';

export default {
    name: "MockSection",
    components: {
        AttemptProgressButton,
        MockSelection
    },

    data() {
        return {
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
            loadershow: true


        }
    },


    created() {

            console.log('toekn' , localStorage.getItem('token'))

        get('/getmocks')
            .then((res) => {

                this.setData(res)

            })





    },

    methods: {

        showselections(e) {
            this.indexing = e
            this.showing = true
        },

        setData(res) {


            Vue.set(this.$data, 'title', res.data.data)

            console.log(res.data.data)
            this.loadershow = false

            

           

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

                    this.$toast.success("Score Successfully Reset");
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

       


        content(e) {
            console.log('yes', e.score)
            this.selectedItem = e;

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
img {
    cursor: pointer;


}

.progress-container {
    position: relative;
    width: 100%;
}

.progress-bar {
    height: 20px;
    background: #D1D3D4;
    border-radius: 8px;
    overflow: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    border: 1px solid #58595b63;
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
    position: absolute;
    top: 50%;
    left: 30%;
    transform: translate(-50%, -50%);
    color: #000000;
    font-size: 12px;
    font-weight: bold;
    z-index: 2;
    user-select: none;
    pointer-events: none;
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
</style>