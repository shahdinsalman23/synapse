<template>
    <div :class="wrapperClass">
        <div class="white-back">
        <div class="clinical-practice-total">
            <h4>{{ title }}</h4>
            <div class="total-percentage-marks">
                <div class="progress-bar" :class="{ 'progress-bar--score': showScoreDetail }">
                    <div class="progress-fill" :style="{ width: headerPercent }"></div>
                </div>
                <h5>{{ total }}</h5>
            </div>
        </div>
        </div>
        <div v-for="(item, index) in items" :key="index" class="mla-list-item" :class="{ 'mla-row-highlight': isHighlighted(item) }" @click="GOtoroute(item, index)">
            <h4>{{ index + 1 }}. {{ item.title }}</h4>
            <div class="item-score-wrap">
              <template v-if="!showScoreDetail">
                <div class="item-progress-wrap">
                  <div class="item-progress-bar">
                    <div class="item-progress-fill" :style="{ width: progressPercent(item) }"></div>
                  </div>
                  <span class="item-progress-only">{{ progressFraction(item) }}</span>
                </div>
              </template>
              <template v-else-if="hasAttemptedForScoreBar(item)">
                <div class="attemptscore">
                  <span class="item-score-pct">{{ scorePercent(item) }}</span>
                  <span class="item-score-counts">{{ item.correct_count }}/{{ item.questions_count ?? 0 }}</span>
                </div>
                <div class="item-score-bar">
                  <div class="item-score-fill" :style="{ width: scorePercent(item) }"></div>
                </div>
              </template>
              <template v-else>
                <span class="item-score-zero">0/{{ item.questions_count ?? 0 }}</span>
              </template>
            </div>

        </div>
    </div>
</template>



<script>
export default {
    props: {
        title: String,
        total: String,
        items: Array,
        wrapperClass: String,
        condition: String,
        showScoreDetail: {
            type: Boolean,
            default: false
        },
    },

    data() {
        return {
            highlightItemId: null,
            restoreApplied: false,
        };
    },

    watch: {
        items: {
            handler() {
                this.$nextTick(() => this.applyQuestionListRestore());
            },
            deep: true,
        },
    },

    mounted() {
        this.$nextTick(() => this.applyQuestionListRestore());
    },

    activated() {
        this.restoreApplied = false;
        this.$nextTick(() => this.applyQuestionListRestore());
    },

    computed: {
        headerPercent() {
            if (!this.total) return '0%';
            if (this.total.includes('%')) return this.total;
            const parts = (this.total || '').split('/');
            if (parts.length === 2) {
                const a = Number(parts[0]) || 0;
                const b = Number(parts[1]) || 1;
                return `${Math.round((a / b) * 100)}%`;
            }
            return '0%';
        },
    },

    methods: {

        isHighlighted(item) {
            if (!item || this.highlightItemId == null) return false;
            const hid = item.id != null ? String(item.id) : '';
            return hid !== '' && hid === String(this.highlightItemId);
        },

        applyQuestionListRestore() {
            if (this.restoreApplied) return;

            const col = localStorage.getItem('questionListRestore_column');
            if (!col || col !== this.title) return;

            const highlightId = localStorage.getItem('questionPendingHighlightId');
            const suppress = localStorage.getItem('questionSuppressListHighlight') === '1';

            if (!suppress && !highlightId) return;

            this.restoreApplied = true;
            this.highlightItemId = (suppress || !highlightId) ? null : String(highlightId);

            if (this.highlightItemId) {
                this.$nextTick(() => {
                    const el = this.$el && this.$el.querySelector('.mla-row-highlight');
                    if (el && typeof el.scrollIntoView === 'function') {
                        el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                    }
                });
            }

            try {
                [
                    'questionListRestore_column', 'questionListRestore_parentIndex', 'questionListRestore_parentId',
                    'questionListRestore_childIndex', 'questionListRestore_childId',
                    'questionListRestore_grandIndex', 'questionListRestore_grandId',
                    'questionPendingHighlightId', 'questionSuppressListHighlight',
                ].forEach(k => localStorage.removeItem(k));
            } catch (e) { /* ignore */ }
        },

        progressFraction(item) {
            const attempted = Number(item.attempted_count);
            const total = Number(item.questions_count) || 0;
            const a = Number.isFinite(attempted) ? attempted : 0;
            return `${a}/${total}`;
        },

        progressPercent(item) {
            const attempted = Number(item.attempted_count) || 0;
            const total = Number(item.questions_count) || 0;
            if (!total) return '0%';
            return Math.min(Math.round((attempted / total) * 100), 100) + '%';
        },

        scorePercent(item) {
            const correct = Number(item.correct_count) || 0;
            const total = Number(item.questions_count) || 1;
            return Math.round((correct / total) * 100) + '%';
        },

        hasAttemptedForScoreBar(item) {
            if (item.attempted_count !== undefined && item.attempted_count !== null) {
                return (Number(item.attempted_count) || 0) > 0;
            }
            return (Number(item.correct_count) || 0) > 0;
        },

        GOtoroute(item, index) {
            console.log('title', this.title, item)

            try {
                localStorage.setItem('questionListRestore_column', this.title || '');
                localStorage.setItem('questionListRestore_section', 'ALPHABETICALLY');
                localStorage.setItem('questionListRestore_parentIndex', String(index ?? ''));
                localStorage.setItem('questionListRestore_parentId', String(item.id ?? ''));
                localStorage.removeItem('questionListRestore_childIndex');
                localStorage.removeItem('questionListRestore_childId');
                localStorage.removeItem('questionListRestore_grandIndex');
            } catch (e) { /* ignore */ }

            localStorage.setItem("questiontitle", this.title);
            try {
                localStorage.setItem(
                    'questionBreadcrumbLabels',
                    JSON.stringify([
                        'ML Content Map', 
                        'Presentations and Conditions',
                        this.title,
                        item.title || 'Questions',
                    ])
                );
            } catch (e) { /* ignore */ }
            this.$router.push(`/questionspage/${item.id}`);

            // this.$router.push('/questionspage')
            // }
        },


    }
}
</script>

<style scoped>
::-webkit-scrollbar {
    width: 3px;
    height: 20px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #d7ebff;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #69baff;
}

.areas-clinical-practice {
    height: 81vh;
    overflow-y: scroll;
}


.areas-presentation-condition {

    height: 81vh;
    overflow-y: scroll;
}

.list-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.mla-list-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    background: #D7EBFF;
    margin: 0px 0px 7px 0px;
    padding: 17px 14px 12px 20px;
    border-radius: 10px;
    cursor: pointer;
}

.mla-list-item h4 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}

.mla-list-item h5 {
    color: #231F20;
    font-size: 14px;
    font-family: 'Helveticacondensed';
    letter-spacing: 0.5px;
    font-weight: 300;
}


.progress-bar {
    background: #BBBDBF;
    border-radius: 20px;
    width: 60px;
    height: 6px;
    overflow: hidden;
    border: 1px solid #FFFFFF;
}

.progress-fill {
    background: #9DED6C;
    height: 100%;
}

.progress-bar--score {
    background: #DF001B;
}

.total-percentage-marks {
    display: flex;
    align-items: center;
    gap: 5px;
}

/* ── Back-navigation highlight ── */
.mla-row-highlight {
    outline: 2px solid #1A90FF;
    outline-offset: -2px;
    border-radius: 10px;
}

.item-score-wrap {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 110px;
    flex-shrink: 0;
    align-content: center;
}

.item-progress-wrap {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    width: 100%;
}

.item-progress-bar {
    width: 70px;
    height: 6px;
    background: #9ebfdf;
    border-radius: 4px;
    overflow: hidden;
}

.item-progress-fill {
    height: 100%;
    background: #9DED6C;
    border-radius: 4px;
    transition: width 0.4s ease;
}

.item-progress-only {
    font-size: 10px;
    font-weight: 300;
    color: #231f20;
    text-align: right;
    width: 100%;
}

.item-score-bar {
    width: 100%;
    height: 6px;
    background: #DF001B;
    border-radius: 4px;
    overflow: hidden;
}

.item-score-fill {
    height: 100%;
    background: #9DED6C;
    border-radius: 4px;
    transition: width 0.4s ease;
}

.item-score-pct {
    font-size: 13px;
    font-weight: 700;
    color: #231F20;
    line-height: 1;
}

.item-score-counts {
    font-size: 10px;
    color: #555;
    line-height: 0;
}

.attemptscore {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 5px;
    gap: 5px;
}

.item-score-zero {
    font-size: 13px;
    color: #231F20;
    font-weight: 300;
    text-align: right;
    width: 100%;
}
</style>
