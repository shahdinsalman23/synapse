<template>
    <div>
        <div v-if="!showing">

       
        <section class="mocksection-pg">
            <div class="container">
                <div class="mock-container">
                    <div class="mock-card" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800">
                        <div class="mock-image">
                            <img src="/images/mock1.png" alt="" @click="showselections(1)">
                            <attempt-progress-button />
                        </div>
                    </div>
                    <div class="mock-card" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800">
                        <div class="mock-image">
                            <img src="/images/mock2.png" alt="" @click="showselections(2)">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                    <div class="mock-card" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                        <div class="mock-image">
                            <img src="/images/mock3.png" alt="" @click="showselections(3)">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                    <div class="mock-card" data-aos="fade-up" data-aos-delay="300" data-aos-duration="800">
                        <div class="mock-image">
                            <img src="/images/mock4.png" alt="" @click="showselections(4)">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                    <div class="mock-card" data-aos="fade-up" data-aos-delay="400" data-aos-duration="800">
                        <div class="mock-image">
                            <img src="/images/mock5.png" alt="" @click="showselections(5)">
                            <div class="progress-btn">
                                <button>Not attempted yet</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="questions-notes-mock-sec">
            <div class="container">
                <div class="question-note-boxes">
                    <div class="question-box" data-aos="fade-right" data-aos-delay="0" data-aos-duration="800">
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
                    <div class="mock-box" data-aos="fade-left" data-aos-delay="200" data-aos-duration="800">
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


         <!-- <div v-else>
            <section class="mockselection-sec">
                <div class="container">
                    <div class="mockselection-btns" >
                        <button class="mock-timer-btn" data-aos="fade-right" data-aos-delay="100" data-aos-duration="800" ><img src="/images/timer.png" alt="">180 minutes</button>
                        <button class="begin-btn"  data-aos="fade-left" data-aos-delay="100" data-aos-duration="800"><router-link to="/mocksquestion">Begin
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </router-link>
                        </button>
                    </div>
                </div>
            </section>
        </div> -->

         <MockSelection v-else :indexing="indexing"/>

    </div>
</template>


<script>
import AttemptProgressButton from '@/components/AttemptProgressButton.vue';
import MockSelection from './MockSelection.vue';

export default {
    name: "MockSection",
    components: {
        AttemptProgressButton,
        MockSelection
    },

    data() {
        return {
            showing:false,
            indexing:0
           
        }
    },


    methods: {

        showselections(e){
            this.indexing = e
            this.showing = true
        }
    }
};
</script>



<style scoped>

img{
    cursor:pointer;
 

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


</style>