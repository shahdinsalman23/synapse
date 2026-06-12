<template>
    <div>

        <Loadingcircle v-if="loading"/>

   
    <div v-else>
        <div v-if="!showing">


            <section class="mocksection-pg">
                <div class="container">
                    <div class="mock-container">
                        <div class="mock-card" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" v-for="(items, index) in title" :key="index">
                            <div class="mock-card-wrapper">
                                <div class="mock-image" @click="content(items, index)">
                                    <img :src="`/images/mock${index + 1}.png`" alt="">
                                </div>
                                <div class="mock-card-footer" @click="content(items, index)">
                                    <div class="mock-score-bar-wrap" v-if="items.score && items.score.length > 0 && !items.exit">
                                        <div class="mock-score-bar">
                                            <div class="mock-score-fill" :style="{ width: getMockScore(items) + '%' }"></div>
                                        </div>
                                        <span class="mock-score-label">{{ getMockScore(items) }}%</span>
                                    </div>
                                    <div class="mock-score-bar-wrap" v-else-if="items.exit">
                                        <div class="mock-score-bar mock-score-bar--paused">
                                            <div class="mock-score-fill mock-score-fill--paused" style="width:40%"></div>
                                        </div>
                                        <img class="pause-icon-sm" src="/images/pauseyellowicon.png" alt="" />
                                    </div>
                                    <div class="mock-not-attempted" v-else>Not attempted yet</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="questions-notes-mock-sec">
                <div class="container">
                    <div class="question-note-boxes">
                        <div class="question-box" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" style="cursor:pointer" @click="openExitAlert('Question')">
                            <h3><img src="/images/questionmark.png" alt=""> Questions</h3>
                            <div
                                class="question-score questions-summary-toggle"
                                title="Click to switch between Score and Progress"
                                @click.stop="toggleQuestionsSummaryMode"
                            >
                                <h6>{{ questionsSummaryShowProgress ? 'progress' : 'score' }}</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" :style="{ width: questionsDisplayPercent + '%' }"></div>
                                    </div>
                                   
                                </div>
                                <div class="progress-text">{{ questionsDisplayPercent }}%</div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>

                         <div class="question-box" data-aos="fade-up" data-aos-delay="0" data-aos-duration="800" style="cursor:pointer; justify-content: center;  background: #F99D1C;" @click="openExitAlert('Notes')">
                            <h3><img src="/images/file.png" alt=""> notes</h3>
                            <div class="question-score">
                                <h6>progress</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" :style="{ width: notesProgressPercent + '%' }"></div>
                                    </div>
                                   
                                </div>
                                <div class="progress-text">{{ notesProgressPercent }}%</div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>
                        </div>

                        <!-- <div class="note-box" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" style="cursor:pointer" @click="openExitAlert('Notes')">
                             

                           
                            <h3><img src="/images/file.png" alt=""> Notes</h3> 
                            <div class="note-score">
                                <h6>Progress</h6>
                                <div class="progress-container">
                                    <div class="progress-bar">
                                        <div class="progress-fill" style="width: 54%"></div>
                                    </div>
                                    <div class="progress-text">0%</div>
                                </div>
                            </div>
                            <div class="cardbottom-shadow">
                                <img src="/images/cardshadow.png" alt="">
                            </div>

                           
                          
                        </div> -->
                        <div class="mock-box" data-aos="fade-up" data-aos-delay="200" data-aos-duration="800">
                            <h3><img src="/images/brain.png" alt=""> Mocks</h3>
                            <div
                                class="question-score mocks-summary-toggle"
                                title="Click to switch between Score and Progress"
                                @click="toggleMocksSummaryMode"
                            >
                                <h6>{{ mocksSummaryShowProgress ? 'progress' : 'score' }}</h6>
                                <div class="progress-container">
                                    <div class="progress-bar" style="background: transparent;">
                                        <div class="progress-fill" :style="{ width: mocksSummaryDisplayPercent + '%' }"></div>
                                    </div>
                                </div>
                                <div class="progress-text">{{ mocksSummaryDisplayPercent }}%</div>
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
// import AttemptProgressButton from '@/components/AttemptProgressButton.vue';
import MockSelection from './MockSelection.vue';
import Vue from 'vue';
import { get } from './lib/api';
import {
    mocksAggregateScorePercent as calcMocksScorePercent,
    mocksAggregateProgressPercent as calcMocksProgressPercent,
} from './lib/mocksAggregate';
import { hydrateNoteUserState, notesProgressStats } from './lib/notesUserPrefs';
import Loadingcircle from '@/components/Loadingcircle.vue';
// import CircularProgress from '@/components/CircularProgress.vue'

export default {
    name: "MockSection",
    components: {
        // AttemptProgressButton,
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
            percentage:0,
            clinicalAreas: [],
            professionalKnowledge: [],
            notesClinicalAreas: [],
            notesProfessionalKnowledge: [],
            notesReadRev: 0,
            /** false = Score (correct / all), true = Progress (attempted / all) */
            questionsSummaryShowProgress: false,
            /** false = Score (correct / all mock questions), true = Progress (attempted / all) */
            mocksSummaryShowProgress: false,
        }
    },


    created() {

        console.log(window.innerWidth , window.innerHeight);

            console.log('toekn' , localStorage.getItem('token'))

        get('/getmocks')
            .then((res) => {

                this.setData(res)

            })

        get('/getsubjectclient')
            .then((res) => {
                this.clinicalAreas = res.data.clinical || []
                this.professionalKnowledge = res.data.professional || []
            })

        hydrateNoteUserState();

        get('/notesclient')
            .then((res) => {
                if (res.data.chaptersClinical) {
                    this.notesClinicalAreas = this.transformNotesChapters(res.data.chaptersClinical);
                }
                if (res.data.chaptersProfessioanl) {
                    this.notesProfessionalKnowledge = this.transformNotesChapters(res.data.chaptersProfessioanl);
                }
            })
            .catch((err) => {
                console.error('Error fetching notes data:', err);
            });




    },

    mounted() {
        this._notesPrefsStorage = (ev) => {
            if (ev && ev.key && String(ev.key).indexOf('notesUserPrefs_') === 0) {
                this.notesReadRev += 1;
            }
        };
        window.addEventListener('storage', this._notesPrefsStorage);
    },

    activated() {
        this.notesReadRev += 1;
    },

    beforeDestroy() {
        if (this._notesPrefsStorage) {
            window.removeEventListener('storage', this._notesPrefsStorage);
        }
    },

    computed: {
        questionsScorePercent() {
            const all = [...this.clinicalAreas, ...this.professionalKnowledge];
            const total = all.reduce((s, i) => s + (parseInt(i.questions_count) || 0), 0);
            const correct = all.reduce((s, i) => s + (parseInt(i.correct_count) || 0), 0);
            if (!total) return 0;
            return Math.round((correct / total) * 100);
        },

        questionsProgressPercent() {
            const all = [...this.clinicalAreas, ...this.professionalKnowledge];
            const total = all.reduce((s, i) => s + (parseInt(i.questions_count) || 0), 0);
            const attempted = all.reduce((s, i) => s + (parseInt(i.attempted_count) || 0), 0);
            if (!total) return 0;
            return Math.round((attempted / total) * 100);
        },

        questionsDisplayPercent() {
            return this.questionsSummaryShowProgress
                ? this.questionsProgressPercent
                : this.questionsScorePercent;
        },

        notesSidebarProgress() {
            void this.notesReadRev;
            void this.notesClinicalAreas.length;
            void this.notesProfessionalKnowledge.length;
            return notesProgressStats(this.$store, [
                ...this.notesClinicalAreas,
                ...this.notesProfessionalKnowledge,
            ]);
        },

        notesProgressPercent() {
            return this.notesSidebarProgress.percent;
        },

        mocksAggregateScorePercent() {
            return calcMocksScorePercent(this.title);
        },

        mocksAggregateProgressPercent() {
            return calcMocksProgressPercent(this.title);
        },

        mocksSummaryDisplayPercent() {
            return this.mocksSummaryShowProgress
                ? this.mocksAggregateProgressPercent
                : this.mocksAggregateScorePercent;
        },
    },

    methods: {
        toggleQuestionsSummaryMode() {
            this.questionsSummaryShowProgress = !this.questionsSummaryShowProgress;
        },

        toggleMocksSummaryMode() {
            this.mocksSummaryShowProgress = !this.mocksSummaryShowProgress;
        },

        transformNotesChapters(chapters) {
            if (!chapters || !Array.isArray(chapters)) return [];

            return chapters.map((chapter) => {
                const transformedChapter = {
                    id: chapter.id || null,
                    title: chapter.title || '',
                    index_number: chapter.index_number || null,
                };

                if (chapter.notes && Array.isArray(chapter.notes) && chapter.notes.length > 0) {
                    transformedChapter.children = chapter.notes.map((note) => {
                        const transformedNote = {
                            id: note.id || null,
                            title: note.title || '',
                            index_number: note.index_number || null,
                        };

                        if (note.sub_notes && Array.isArray(note.sub_notes) && note.sub_notes.length > 0) {
                            transformedNote.children = note.sub_notes.map((subNote) => ({
                                id: subNote.id || null,
                                title: subNote.title || '',
                                index_number: subNote.index_number || null,
                            }));
                        }

                        return transformedNote;
                    });
                }

                return transformedChapter;
            });
        },

        openExitAlert(e){
      this.exitpage = e
      this.showExitPopup = true;
    },
    confirmExit() {
      this.showExitPopup = false;
      if (this.exitpage == 'Question') {
        this.$router.push('/mlalistselection');
      } else if (this.exitpage == 'Notes') {
        this.$router.push('/noteslistselection');
      } else {
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
            return items.score && items.score.length > 0 ? '#63B045' : 'red';
        },

        getMockScore(item) {
            if (!item.score || !item.quest || item.quest.length === 0) return 0;
            const correctCount = item.score.filter(s => s.correct == 1).length;
            return Math.round((correctCount * 100) / item.quest.length);
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

.mocks-summary-toggle,
.questions-summary-toggle {
    cursor: pointer;
    user-select: none;
}


[data-aos] {
    visibility: hidden;
}

[data-aos].aos-animate {
    visibility: visible;
}


.mock-image {
    position: relative;
    line-height: 0;
}

.mock-image img {
    width: 100%;
    display: block;
   
        padding: 10px !important;
}

/* Red-border wrapper that contains image + status bar */
.mock-card-wrapper {
    /* border: 1.5px solid #ED1C24; */
    
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    cursor: pointer;
    transition: box-shadow 0.2s ease, transform 0.2s ease;
        padding: 15px;
}

.mock-card-wrapper:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(237, 28, 36, 0.2);
}

/* Footer sits below the image, inside the red border */
.mock-card-footer {
       padding: 10px 0px 0px;
    background: #fff;
}

.mock-score-bar-wrap {
    display: flex;
    align-items: center;
    gap: 6px;
}

.mock-score-bar {
    flex: 1;
    height: 20px;
    background: #D1D3D4;
    border-radius: 20px;
    overflow: hidden;
    border: 1px solid #aaa;
}

.mock-score-fill {
    height: 100%;
    background: #9DED6C;
    border-radius: 20px;
    transition: width 0.4s ease;
}

.mock-score-bar--paused {
    background: rgba(251, 173, 31, 0.15);
    border-color: #FBAD1F;
}

.mock-score-fill--paused {
    background: #FBAD1F;
}

.mock-score-label {
    font-size: 11px;
    font-weight: 700;
    color: #231F20;
    min-width: 26px;
    text-align: right;
    position: absolute;
    left: 30%;
}

.pause-icon-sm {
    width: 16px;
    height: 16px;
    border: none !important;
    padding: 0 !important;
    cursor: default;
}

.mock-not-attempted {
    background: #D1D3D4;
    color: #58595B;
    font-size: 9px;
    font-weight: 600;
    text-align: center;
    border-radius: 20px;
    padding: 4px 8px;
    white-space: nowrap;
    border: 1px solid #aaa;
}


</style>