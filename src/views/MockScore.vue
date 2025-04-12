<template>
    <div>
        <section class="mockscore-sec">
            <div class="container">
                <div class="mockscore-progress-btn">
                    <div class="mockscore-progress">
                        <div class="progress-text-score">
                            <div class="progress-text">{{ roundedPercent }}%</div>
                            <div class="progress-score"> {{ total }}/{{ totalquestions }}</div>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar" :style="{ width: total * 100 / totalquestions + '%' }"></div>
                        </div>
                    </div>
                    <div class="reviewmock-btn">
                        <router-link to="/reviewmockbirdseye">Review mock 1
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>


<script>
import { get } from './lib/api';

export default {
  data() {
    return {
      progress: 36,
      review: false,
            starts: true,
            currentscore: false,
            email: "",
            activeIndex: null,
            password: "",
            heading: "",
            heading2: "",
            heading3: "",
            counts: 0,
            duration: 0,

            id: null,
            form: {},
            method: "POST",
            questions: [],
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
            total: 0,
            correctanswer: 0,
            wronganswer: 0,
            remainingtime: 0,
            totalquestions: 0,
            timer: null,
            remainingTimeInSeconds: 0,
            flagcounts: 0,
            correctpercent: 0,




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
        console.log("getabout:", getabout);

        console.log('mockObject:', parentObject);
        this.duration = parentObject.duration
        this.form.parent_id = parentObject.id;




        this.heading = parentObject.title;




        get("/getmockscore?id=" + this.id).then((res) => {
            //   this.setData(res);
            this.correct = res.data.correct;
            this.wrong = res.data.wrong;
            this.total = res.data.data
            this.totalquestions = res.data.totalquestion
            this.correctpercent = res.data.correctanswer
            console.log(res.data)
        });




    },


    computed: {
        roundedPercent() {
            // return Math.round(this.correctpercent);
            return Math.round(this.correct);

        },


        headingInCaps() {
            return this.heading.toUpperCase();
        }
    },







    methods: {


        exitmock() {
            this.$router.push('/mocks');
        },



        reviewMock() {
            this.$router.push({ path: `/reviewmock/${this.id}` });

        },




        getScore() {
            console.log('hello');

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



    },
}
</script>



<style scoped>
.progress-container {
    position: relative;
    width: 172.13px;
    height: 26.08px;
    background-color: #D1D3D4;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #8082856b;
}

.progress-bar {
  height: 100%;
  background-color: #9DED6C;
  border-radius: 20px;
  border-right: 1px solid #6d6e7178;
  transition: width 0.3s ease-in-out;
}

.progress-text {
  font-weight: bold;
  color: #231F20;
}

.progress-score {
    color: #231F20;
}

</style>