<template>
    <div>
        <section class="mockscore-sec">
            <div class="container">
                <div class="mockscore-progress-btn">
                    <div class="mockscore-progress">
                        <div class="progress-text-score">
                            <div class="progress-text">{{ roundedPercent ? roundedPercent : 0 }}<span class="percen">
                                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="stroke: white;">
                                    <path d="M6.11998 3.27984C6.11998 3.62984 6.04998 3.95984 5.91998 4.27984C5.78998 4.58984 5.59998 4.85984 5.36998 5.09984C5.13998 5.32984 4.85998 5.51984 4.54998 5.64984C4.22998 5.77984 3.89998 5.84984 3.54998 5.84984C3.19998 5.84984 2.86998 5.77984 2.54998 5.64984C2.22998 5.51984 1.96998 5.32984 1.72998 5.09984C1.49998 4.86984 1.30998 4.59984 1.17998 4.27984C1.04998 3.96984 0.97998 3.63984 0.97998 3.27984C0.97998 2.91984 1.04998 2.59984 1.17998 2.27984C1.30998 1.96984 1.49998 1.69984 1.72998 1.45984C1.95998 1.22984 2.22998 1.03984 2.54998 0.899843C2.85998 0.759843 3.18998 0.689844 3.54998 0.689844C3.90998 0.689844 4.23998 0.759843 4.54998 0.889843C4.86998 1.01984 5.13998 1.20984 5.36998 1.43984C5.59998 1.66984 5.78998 1.94984 5.91998 2.25984C6.04998 2.57984 6.11998 2.90984 6.11998 3.25984V3.27984ZM3.53998 4.93984C3.76998 4.93984 3.97998 4.89984 4.18998 4.80984C4.38998 4.71984 4.56998 4.59984 4.72998 4.44984C4.88998 4.29984 5.00998 4.11984 5.09998 3.91984C5.18998 3.71984 5.23997 3.50984 5.23997 3.27984C5.23997 3.04984 5.19998 2.83984 5.10998 2.63984C5.01998 2.43984 4.89998 2.25984 4.73997 2.10984C4.57997 1.95984 4.39997 1.82984 4.19997 1.73984C3.98997 1.64984 3.77998 1.59984 3.54998 1.59984C3.31998 1.59984 3.10998 1.63984 2.89998 1.72984C2.69998 1.81984 2.51998 1.93984 2.35998 2.08984C2.19998 2.23984 2.07998 2.41984 1.98997 2.62984C1.89997 2.83984 1.85998 3.04984 1.85998 3.27984C1.85998 3.50984 1.89997 3.71984 1.98997 3.91984C2.07998 4.11984 2.19998 4.29984 2.35998 4.44984C2.51998 4.59984 2.68998 4.71984 2.89998 4.80984C3.09998 4.89984 3.31998 4.93984 3.54998 4.93984H3.53998ZM4.14998 11.7698H3.33997L9.50998 0.589844H10.32L4.14998 11.7698ZM10.17 6.38984C10.52 6.38984 10.85 6.45984 11.17 6.58984C11.49 6.71984 11.75 6.90984 11.98 7.13984C12.21 7.36984 12.39 7.64984 12.52 7.95984C12.65 8.26984 12.71 8.59984 12.71 8.95984C12.71 9.31984 12.65 9.64984 12.52 9.96984C12.39 10.2898 12.21 10.5598 11.98 10.7998C11.75 11.0298 11.48 11.2198 11.17 11.3498C10.86 11.4798 10.53 11.5498 10.17 11.5498C9.80998 11.5498 9.47998 11.4798 9.16998 11.3498C8.84998 11.2098 8.57998 11.0298 8.34998 10.7998C8.11998 10.5698 7.92998 10.2898 7.79998 9.96984C7.66998 9.64984 7.59998 9.31984 7.59998 8.95984C7.59998 8.59984 7.66997 8.26984 7.80997 7.95984C7.94997 7.64984 8.13998 7.37984 8.36998 7.13984C8.59998 6.90984 8.87998 6.71984 9.18998 6.58984C9.49998 6.45984 9.82998 6.38984 10.19 6.38984H10.17ZM10.15 7.28984C9.90998 7.28984 9.68997 7.33984 9.48997 7.42984C9.28998 7.51984 9.10998 7.64984 8.95998 7.79984C8.80998 7.94984 8.68998 8.12984 8.59998 8.33984C8.50998 8.54984 8.46998 8.75984 8.46998 8.98984C8.46998 9.21984 8.51998 9.41984 8.60998 9.61984C8.69998 9.81984 8.82998 9.99984 8.97998 10.1498C9.13998 10.2998 9.30997 10.4298 9.51997 10.5098C9.72997 10.5898 9.92998 10.6398 10.15 10.6398C10.38 10.6398 10.59 10.5898 10.8 10.4998C11.01 10.4098 11.18 10.2798 11.33 10.1298C11.48 9.96984 11.6 9.79984 11.69 9.59984C11.78 9.39984 11.82 9.17984 11.82 8.95984C11.82 8.73984 11.78 8.51984 11.69 8.31984C11.6 8.11984 11.48 7.93984 11.33 7.78984C11.18 7.63984 11 7.50984 10.8 7.42984C10.6 7.33984 10.38 7.29984 10.15 7.29984V7.28984Z" fill="white"/>
                                    </svg>
                                    

                            </span></div>
                            <div class="progress-score"> {{ total }}/{{ totalquestions }}</div>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar" :style="{ width: total * 100 / totalquestions + '%' }"></div>
                        </div>
                    </div>
                    <div class="reviewmock-btn" @click="reviewMock">
                        <router-link to="">Review Mock 1
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
        
            // return Math.round(this.correct) * 100 / this.totalquestions;

            const percent = (this.correct / this.totalquestions) * 100;
             return parseFloat(percent.toFixed(1));

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
            this.$router.push({ path: `/reviewscroll/${this.id}` });

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

span.percen {
    font-size: 18px;
    font-weight: lighter !important;
    font-family: auto;
    padding-left: 1px;
}

.progress-text-score {
    display: flex
;
    align-items: center;
    width: 100%;
    justify-content: center;
    gap: 65px;
    margin: 0px 0px 4px 0px;
    padding: 0px 11px;

}
.progress-container {
    position: relative;
    width: 100%;
    height: 28.08px;
    background-color: #D1D3D4;
    border-radius: 50px;
    overflow: hidden;
    border: 1px solid #8082856b;
}

.progress-bar {
    height: 100%;
    background-color: #9DED6C;
    border-radius: 50px;
    border-right: 1px solid #6d6e7178;
    transition: width 0.3s ease-in-out;
}

.mockscore-progress {
    padding: 10px 10px 10px 10px;
    background: #ED1C24;
    border-radius: 20px;
}


.progress-text {
    font-weight: 400;
    color: #fff;
    font-size: 25px;
}

.progress-score {
    color: #fff;
    padding: 8px 0px 0px 0px;
    font-size: 15px;
    font-family: Helvetica;
}

</style>