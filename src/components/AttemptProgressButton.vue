<template>
    <div class="progress-button" :class="{ completed: isCompleted }" @click="startProgress">
        <!-- Initial Button State -->
        <div v-if="!isStarted" class="button-content">
            Attempt
        </div>

        <!-- Progress State -->
        <div v-if="isStarted && !isCompleted" class="progress-content">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <span class="progress-text">{{ progress }}%</span>
        </div>

        <!-- Completed State -->
        <div v-if="isCompleted" class="completed-content">
            Attempted
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isStarted: false,
            isCompleted: false,
            progress: 0,
            interval: null
        }
    },
    methods: {
        startProgress() {
            if (this.isStarted) return;

            this.isStarted = true;
            this.interval = setInterval(() => {
                if (this.progress >= 100) {
                    clearInterval(this.interval);
                    this.isCompleted = true;
                    return;
                }
                this.progress += 2; // 2% per interval (total 50 steps)
            }, 50); // Update every 50ms (total ~2500ms)
        }
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>

<style scoped>
.container {
    display: inline-block;
    width: 200px;
}

.progress-button {
    position: relative;
    height: 32px;
    background: #D1D3D4;
    border-radius: 25px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    margin: 15px 5px 0px 5px;   
}

.button-content,
.completed-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: bold;
    color: #231F20;
    font-size: 14px;
}

.progress-content {
    position: relative;
    height: 100%;
}

.progress-fill {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    background: #66BB6A;
    /* Medium Green */
    transition: width 0.1s linear;
}

.progress-text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-weight: bold;
    mix-blend-mode: difference;
}

.completed {
    background: #66BB6A !important;
    /* Solid Green */
}

.completed-content {
    color: white !important;
}





</style>