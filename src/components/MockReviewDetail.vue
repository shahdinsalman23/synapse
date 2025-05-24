<template>
    <div>
        <section class="mockreviewdetail-sec">
            <div class="tabs-container">
                <div class="mockreview-accordion-tabs">
                    <!-- <div v-for="(tab, index) in tabs" :key="index" class="mock-review-accordion-tab" :data-tab-type="tab.title === 'Notes' || tab.title === 'Journal' ? 'orange' : 'red'"
                        :class="{ 'active': activeIndex === index }" @click="toggleAccordion(index)">
                        <div class="mocktab-maintext"
                            :style="{ 
                                background: 
                                    activeIndex === index 
                                        ? (tab.title === 'Notes' || tab.title === 'Journal' ? '#FBAD18' : '#ED1C24')
                                        : activeIndex !== null 
                                            ? '#A7A9AC' 
                                            : (tab.title === 'Notes' || tab.title === 'Journal' ? '#FBAD18' : '#ED1C24')
                            }">
                            <h4>{{ tab.title }}</h4>
                            <div class="accordion-icon">
                                <svg v-if="activeIndex === index" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                                    <path d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                                </svg>
                            </div>
                        </div>
                    </div> -->


                    <div v-for="(tab, index) in tabs" :key="index" class="mock-review-accordion-tab"
                        :data-tab-type="tab.title === 'Notes' || tab.title === 'Journal' ? 'orange' : 'red'"
                        :class="{ 'active': activeIndex === index }" @click="toggleAccordion(index , tab.title)">
                        <div class="mocktab-maintext" :style="{
                            background: activeIndex === index
                                ? (tab.title === 'Notes' || tab.title === 'Journal' ? '#FBAD18' : '#ED1C24')  // Yellow or Red
                                : '#A7A9AC'  // Gray for inactive
                        }">
                            <h4>{{ tab.title }}</h4>
                            <div class="accordion-icon">

                                  <!-- <svg v-if="tab.title === 'Journal'" width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.77 7.77228H12.7399V5.9823C12.7399 3.1523 10.41 0.822266 7.57996 0.822266C4.74996 0.822266 2.41992 3.1523 2.41992 5.9823V7.77228H2.30994C1.54994 7.77228 0.939941 8.39227 0.939941 9.14227V16.6523C0.939941 17.4123 1.55994 18.0223 2.30994 18.0223H12.7999C13.5599 18.0223 14.1699 17.4023 14.1699 16.6523V9.1123C14.1099 8.3523 13.53 7.76227 12.77 7.76227V7.77228ZM8.33997 12.8523C8.22997 12.9323 8.19995 12.9923 8.19995 13.1323V14.7823C8.19995 15.0023 8.08995 15.2323 7.88995 15.3423C7.40995 15.5923 6.93994 15.2623 6.93994 14.7823V13.1323C6.93994 13.0223 6.90996 12.9323 6.82996 12.8823C6.32996 12.5223 6.15991 11.8723 6.40991 11.3423C6.65991 10.8123 7.24994 10.5023 7.80994 10.6123C8.42994 10.7223 8.87994 11.2323 8.87994 11.8723C8.84994 12.2323 8.67991 12.6023 8.34991 12.8523H8.33997ZM10.4699 7.77228H4.66992V5.9823C4.66992 4.3823 5.95997 3.06226 7.58997 3.06226C9.21997 3.06226 10.5099 4.3523 10.5099 5.9823V7.77228H10.4799H10.4699Z" fill="#6D6E71"/>
                                    </svg> -->
                                <svg v-if="activeIndex === index" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                                </svg>

                                <!-- <svg v-if="activeIndex === index" width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.77 7.77228H12.7399V5.9823C12.7399 3.1523 10.41 0.822266 7.57996 0.822266C4.74996 0.822266 2.41992 3.1523 2.41992 5.9823V7.77228H2.30994C1.54994 7.77228 0.939941 8.39227 0.939941 9.14227V16.6523C0.939941 17.4123 1.55994 18.0223 2.30994 18.0223H12.7999C13.5599 18.0223 14.1699 17.4023 14.1699 16.6523V9.1123C14.1099 8.3523 13.53 7.76227 12.77 7.76227V7.77228ZM8.33997 12.8523C8.22997 12.9323 8.19995 12.9923 8.19995 13.1323V14.7823C8.19995 15.0023 8.08995 15.2323 7.88995 15.3423C7.40995 15.5923 6.93994 15.2623 6.93994 14.7823V13.1323C6.93994 13.0223 6.90996 12.9323 6.82996 12.8823C6.32996 12.5223 6.15991 11.8723 6.40991 11.3423C6.65991 10.8123 7.24994 10.5023 7.80994 10.6123C8.42994 10.7223 8.87994 11.2323 8.87994 11.8723C8.84994 12.2323 8.67991 12.6023 8.34991 12.8523H8.33997ZM10.4699 7.77228H4.66992V5.9823C4.66992 4.3823 5.95997 3.06226 7.58997 3.06226C9.21997 3.06226 10.5099 4.3523 10.5099 5.9823V7.77228H10.4799H10.4699Z" fill="#6D6E71"/>
                                    </svg> -->
                                    
                                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                                    <path d="M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" />
                                </svg>
                                <!-- <span class="lock-hover-text">Locked section</span> -->
                            </div>
                        </div>
                    </div>

                </div>
                <transition name="slide">
                    <div v-if="activeIndex !== null" class="mockreviewtab-detail" :style="{
                        'border-color': (tabs[activeIndex].title === 'Notes' || tabs[activeIndex].title === 'Journal') ? '#FBAD18' : '#ED1C24',
                        'border-top-color': (tabs[activeIndex].title === 'Notes' || tabs[activeIndex].title === 'Journal') ? '#FBAD18' : '#ED1C24'
                    }">

                        <div v-if="tabs[activeIndex].title === 'Comments'" class="comments-section">

                            <ul class="comments-list">
                                <li v-for="(comment) in currentQuestion.comments" :key="comment.id"
                                    class="comment-item">
                                    <div class="user-avatar">
                                        <img src="https://static.vecteezy.com/system/resources/previews/047/733/682/non_2x/grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg"
                                            alt="User Avatar">
                                    </div>
                                    <div class="comment-content">
                                        <div class="comment-header">
                                            <span class="user-name">{{ comment.user.username }}</span>
                                            <span class="comment-time">2 hours ago</span>
                                        </div>
                                        <p class="comment-text"> {{ comment ? comment.comments : 'No Details' }}</p>
                                    </div>
                                </li>
                            </ul>

                            <div class="comment-input-container">
                                <input type="text" v-model="form.comments" placeholder="Write your comment..."
                                    @keyup.enter="commentsave(currentQuestion.id)">
                                <button class="send-button" @click="commentsave(currentQuestion.id)">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#ED1C24" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div v-else-if="tabs[activeIndex].title === 'Explanation'" class="comments-section">
                            <div class="content-block mockreviewdetail-text">
                                {{ currentQuestion.explanation }}
                            </div>


                        </div>

                        <div v-else-if="tabs[activeIndex].title === 'Notes'" class="comments-section">
                            <div class="content-block mockreviewdetail-text">
                                {{ currentQuestion.books }}
                            </div>


                        </div>


                        <div v-else>
                            <div class="content-block mockreviewdetail-text">
                                <TextEditerMock />
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </section>
    </div>
</template>

<script>
import TextEditerMock from './TextEditerMock.vue';
export default {
    components: { TextEditerMock },

    props: {
        currentQuestion: {

        },


    },
    data() {
        return {
            activeIndex: 0,
            form: {},
            tabs: [
                {
                    title: 'Explanation',
                    content: [
                        `<p>If you are diagnosed with stage C or stage D heart failure, your health care professional will give you an NYHA Functional Classification as a baseline. Then, as you undergo treatment, your health care professional will assign another classification of your condition, allowing your care team to measure how well treatment is working.</p>
                        <p>The table below describes the different classes in the NYHA Functional Classification.</p>
                        <table>
                            </hr>
                            <tr><th>Class</th><th>Patient Symptoms</th></tr>
                            </hr>
                            <tr><td>I</td><td>No limitation of physical activity...</td></tr>
                            <tr><td>II</td><td>Slight limitation of physical activity...</td></tr>
                            <tr><td>III</td><td>Marked limitation of physical activity...</td></tr>
                            <tr><td>IV</td><td>Symptoms of heart failure at rest...</td></tr>
                        </table>`,
                        `<p>Each state has its own agency that regulates and issues driver licenses, vehicle registrations, and disability parking placards. This branch is usually called the Department of Motor Vehicles (DMV). People who need a disability parking placard should contact their state agency directly.</p>
                        <ul class="roman-list">
                            <li>Department of Motor Vehicles (DMV) regulations</li>
                            <li>Disability parking placard requirements</li>
                            <li>State-specific heart failure guidelines</li>
                        </ul>`,
                    ]
                },
                {
                    title: 'Notes',
                    content: [
                        `<p>If you are diagnosed with stage C or stage D heart failure, your health care professional will give you an NYHA Functional Classification as a baseline. Then, as you undergo treatment, your health care professional will assign another classification of your condition, allowing your care team to measure how well treatment is working.</p>
                        <p>The table below describes the different classes in the NYHA Functional Classification.</p>
                        <table>
                            </hr>
                            <tr><th>Class</th><th>Patient Symptoms</th></tr>
                            </hr>
                            <tr><td>I</td><td>No limitation of physical activity...</td></tr>
                            <tr><td>II</td><td>Slight limitation of physical activity...</td></tr>
                            <tr><td>III</td><td>Marked limitation of physical activity...</td></tr>
                            <tr><td>IV</td><td>Symptoms of heart failure at rest...</td></tr>
                        </table>`,
                        `<p>Each state has its own agency that regulates and issues driver licenses, vehicle registrations, and disability parking placards. This branch is usually called the Department of Motor Vehicles (DMV). People who need a disability parking placard should contact their state agency directly.</p>
                        <ul class="roman-list">
                            <li>Department of Motor Vehicles (DMV) regulations</li>
                            <li>Disability parking placard requirements</li>
                            <li>State-specific heart failure guidelines</li>
                        </ul>`,
                    ]
                },
                {
                    title: 'Journal',
                    content: [
                        `<p>If you are diagnosed with stage C or stage D heart failure, your health care professional will give you an NYHA Functional Classification as a baseline. Then, as you undergo treatment, your health care professional will assign another classification of your condition, allowing your care team to measure how well treatment is working.</p>
                        <p>The table below describes the different classes in the NYHA Functional Classification.</p>
                        <table>
                            </hr>
                            <tr><th>Class</th><th>Patient Symptoms</th></tr>
                            </hr>
                            <tr><td>I</td><td>No limitation of physical activity...</td></tr>
                            <tr><td>II</td><td>Slight limitation of physical activity...</td></tr>
                            <tr><td>III</td><td>Marked limitation of physical activity...</td></tr>
                            <tr><td>IV</td><td>Symptoms of heart failure at rest...</td></tr>
                        </table>`,
                        `<p>Each state has its own agency that regulates and issues driver licenses, vehicle registrations, and disability parking placards. This branch is usually called the Department of Motor Vehicles (DMV). People who need a disability parking placard should contact their state agency directly.</p>
                        <ul class="roman-list">
                            <li>Department of Motor Vehicles (DMV) regulations</li>
                            <li>Disability parking placard requirements</li>
                            <li>State-specific heart failure guidelines</li>
                        </ul>`,
                    ]
                },
                {
                    title: 'Comments',
                    content: [
                        'Great explanation! Really helped me understand the concepts.',
                    ]
                }
            ]
        }
    },
    methods: {
        resetActiveTab() {
            this.activeIndex = this.tabs.findIndex(tab => tab.title === 'Explanation');
        },

        commentsave(e) {
            this.$emit('commentsave', e, this.form.comments);

        },
        addComment() {
            if (this.newComment.trim()) {
                this.tabs[3].content.push(this.newComment.trim());
                this.newComment = '';
            }
        },
        toggleAccordion(index ) {
            // if(title != 'Journal'){

                this.activeIndex = this.activeIndex === index ? null : index
            // }
        }
    }
}
</script>

<style scoped>
section.mockreviewdetail-sec {
    padding: 0px 0px 30px 0px;
}


.tabs-container {
    position: relative;
}

.mockreview-accordion-tabs {
    display: flex;
    gap: 24px;
    margin-bottom: 10px;
}

.mock-review-accordion-tab {
    position: relative;
    flex: 1;
    cursor: pointer;
}

.mocktab-maintext {
    border-radius: 40px;
    padding: 5px 13px;
    height: 29.65px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    transition: all 0.3s ease;
}

.mocktab-maintext svg {
    position: relative;
}

.mocktab-maintext .vertical {
    transform: rotate(90deg);
    transform-origin: center;
    transition: all 0.3s ease;
}

.mock-review-accordion-tab.active .vertical {
    transform: rotate(0deg);
    opacity: 0;
}

.mockreviewtab-detail {
    border: 1px solid;
    border-top: 1px solid;
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px 2px #0000004a;
    z-index: 10;
    text-align: left;
    position: relative;
    margin-top: 15px;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}




.comments-section ul li {
    list-style: none;
    display: flex;
    gap: 10px;
    margin: 0px 0px 20px 0px;
}

.user-avatar img {
    width: 20px;
}

.comment-header {
    display: flex;
    gap: 20px;
    margin: 0px 0px 3px 0px;
}

.comment-header .user-name {
    color: #000;
    font-weight: bold;
    font-size: 14px;
}

.comment-header span.comment-time {
    font-size: 12px;
    line-height: 18px;
}

.comment-content {
    max-width: 500px;
}

.comment-content p.comment-text {
    background: #d1d3d482;
    padding: 10px 10px;
    border-radius: 5px;
    font-size: 12px;
    color: #000;
    line-height: 18px;
}



.comment-input-container input {
    width: 100%;
    max-width: 500px;
    padding: 10px 10px;
    border-radius: 5px;
    border: 1px solid #D1D3D4;
}

.comment-input-container {
    position: relative;
    max-width: 500px;
}


.comment-input-container button.send-button {
    position: absolute;
    right: 4px;
    top: 7px;
    border: none;
    background: transparent;
    cursor: pointer;
}

.comment-input-container input:focus {
    outline: none;
}


.mockreviewtab-detail[style*="ED1C24"]::before {
    border-bottom-color: #ED1C24;
}

.mockreviewtab-detail[style*="FBAD18"]::before {
    border-bottom-color: #FBAD18;
}

.mocktab-maintext {
    position: relative;
    z-index: 1;
}

.accordion-icon svg {
    width: 20px;
    height: 20px;
    margin: 4px 0px 0px 0px;
}

.accordion-icon {
    position: relative;
}
</style>