<template>
    <div>
        <section class="mockbirdseye-sec">
            <div class="container">
                <div class="birdsaeye-head">
                    <h6>Bird's Eye View</h6>
                </div>
                <div class="mockbirdseye-boxes">
                    <h4 v-for="(nav, indexnav) in allquestions" :key="indexnav"
                        :class="{ 'activeindexborder': isPresentIndexs(indexnav) }"
                        @click="toggleNumber(indexnav)">
                        <router-link to="" :style="{
                            background: nav.score
                                ? '#BCBEC0'
                                : (nav.flag
                                    ? 'white'
                                    : (nav.skip
                                        ? 'white'
                                        : '#F1F2F2')),


                            color: nav.flag
                                ? 'black'
                                : (nav.score
                                    ? 'black'
                                    : (nav.skip
                                        ? 'black'
                                        : 'black')),

                            

                        }">{{ indexnav + 1 }}</router-link>
                        <span v-if="nav.flag" class="flag-icon">
                            <svg width="14.52" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.08997 1.53079C6.14997 -0.149209 3.05998 -0.309209 0.0999756 1.03079V14.5608C2.83998 13.1308 5.71005 13.1708 8.43005 14.7308C10.0601 15.6608 11.7401 16.1308 13.4301 16.1308C15.1201 16.1308 16.7901 15.6608 18.4301 14.7308L18.77 14.5408V0.960784L17.77 1.53079C14.93 3.15079 11.94 3.15079 9.09998 1.53079H9.08997Z" fill="#ED1C24"/>
                            </svg>
                        </span>
                    </h4>
                </div>
                <div class="mockbird-submitbtn">
                    <button @click="$emit('submitMock')">Submit Mock</button>
                    <div class="cardbottom-shadow">
                        <img src="/images/cardshadow.png" alt="">
                    </div>
                </div>
            </div>
        </section>

        <transition name="fade">
        <SubmittingMockModal 
            v-if="igonreunanswer"
            @close="$emit('closed')"
            @resume="$emit('closed')"
            @exit="handleExitMock"
        />
        </transition>
    </div>
</template>

<script>
import SubmittingMockModal from '@/components/SubmittingMockModal.vue';

export default {
    components: {
        SubmittingMockModal
    },

    props: {
        currentQuestionIndex: {
      
    },
    allquestions: {
     
    },
    igonreunanswer:{}
    
  },
    data() {
        return {
            showPauseModal: false,
            selectedNumbers: []
        }
    },

    created(){
        this.showPauseModal = this.igonreunanswer

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
        handleExitMock() {
            this.$emit('finalscroing')
            // this.showPauseModal = false;
            // this.$router.push('/mockscore'); 
        }
    },
    watch: {
        showPauseModal(newVal) {
            // Toggle body overflow when modal state changes
            if (newVal) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    },
    beforeDestroy() {
        // Ensure scroll is restored if component is destroyed
        document.body.style.overflow = '';
    }
}

</script>

<style scoped>

.fade-enter-active {
  animation: pure-fade-in 0.3s !important;
}

.fade-leave-active {
  animation: pure-fade-out 0.3s !important;
}

.mockbirdseye-boxes {
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    grid-column-gap: 4px;
    grid-row-gap: 8px;
    width: 100%;
    overflow-x: auto;
}

.mockbirdseye-boxes h4 {
    margin: 0;
    position: relative;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}


.flag-icon {
    position: absolute;
    top: 2px;
    right: 7px;
    z-index: 1;
}


.mockbirdseye-boxes h4 a:hover {
    background: #939598;
    color: #fff;
}

@media (max-width: 768px) {
    .mockbirdseye-boxes h4 a {
        width: 45px;
        height: 40px;
    }
    .flag-icon svg {
        width: 15px;
        height: 13px;
    }
}
</style>