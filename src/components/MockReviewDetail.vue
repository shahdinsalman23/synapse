<template>
    <div>
        <section class="mockreviewdetail-sec">
            <div class="tabs-container">
                <div class="mockreview-accordion-tabs">
                    <div v-for="(tab, index) in tabs" :key="index" class="mock-review-accordion-tab" :data-tab-type="tab.title === 'Notes' || tab.title === 'Journal' ? 'orange' : 'red'"
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
                    </div>
                </div>
                <transition name="slide">
                    <div 
                        v-if="activeIndex !== null" 
                        class="mockreviewtab-detail"
                        :style="{ 
                            'border-color': (tabs[activeIndex].title === 'Notes' || tabs[activeIndex].title === 'Journal') ? '#FBAD18' : '#ED1C24',
                            'border-top-color': (tabs[activeIndex].title === 'Notes' || tabs[activeIndex].title === 'Journal') ? '#FBAD18' : '#ED1C24'
                        }"
                        >
                        <!-- Comments Tab Content -->
                        <div v-if="tabs[activeIndex].title === 'Comments'" class="comments-section">
                            <!-- Comments List -->
                            <ul class="comments-list">
                                <li v-for="(comment) in currentQuestion.comments" :key="comment.id" class="comment-item">
                                    <div class="user-avatar">
                                        <img src="https://static.vecteezy.com/system/resources/previews/047/733/682/non_2x/grey-avatar-icon-user-avatar-photo-icon-social-media-user-icon-vector.jpg"
                                            alt="User Avatar">
                                    </div>
                                    <div class="comment-content">
                                        <div class="comment-header">
                                            <span class="user-name">{{ comment.user.username }}</span>
                                            <span class="comment-time">2 hours ago</span>
                                        </div>
                                        <p class="comment-text">  {{ comment ? comment.comments : 'No Details' }}</p>
                                    </div>
                                </li>
                            </ul>
                            <!-- Comment Input -->
                            <div class="comment-input-container">
                                <input type="text"  v-model="form.comments" placeholder="Write your comment..."
                                    @keyup.enter="commentsave(currentQuestion.id)">
                                <button class="send-button"  @click="commentsave(currentQuestion.id)">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#ED1C24" />
                                    </svg>
                                </button>
                            </div>
                        </div>


                        <div v-else-if="tabs[activeIndex].title === 'Explanation'" class="comments-section">
                            <div 
                            class="content-block mockreviewdetail-text" >
                            {{ currentQuestion.explanation }}
                        </div>
                        
                            
                        </div>

                        <div v-else-if="tabs[activeIndex].title === 'Notes'" class="comments-section">
                            <div 
                            class="content-block mockreviewdetail-text" >
                            {{ currentQuestion.books }}
                        </div>
                        
                            
                        </div>

                        <!-- Other Tabs Content -->
                        <div v-else>
                            <div  class="content-block mockreviewdetail-text">
                                <TextEditerMock/>
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
            activeIndex: null,
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

        commentsave(e){
            this.$emit('commentsave' , e , this.form.comments);

        },
        addComment() {
            if (this.newComment.trim()) {
                this.tabs[3].content.push(this.newComment.trim());
                this.newComment = '';
            }
        },
        toggleAccordion(index) {
            this.activeIndex = this.activeIndex === index ? null : index
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
    box-shadow: 0 0px 10px 2px rgba(0, 0, 0, 0.1);
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



</style>