<template>
    <!-- Initial Button State -->
    <!-- <div v-if="!isStarted" class="button-content">
        Attempted
    </div> -->
    <div >

  
    
    <div class="progress-btn"  v-if="!isStarted">
        <button  @click="startProgress">Attempted</button>
    </div>
    <div   class="progress-button" :class="{ completed: isCompleted }"  v-if="isStarted">

        <!-- Progress State -->
        <div v-if="isStarted || isCompleted" class="progress-content">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            <span class="progress-text">{{ progress }}%</span>
        </div>

        <!-- Completed State -->
        <!-- <div v-if="isCompleted" class="completed-content">
            Attempted
        </div> -->
    </div>
</div>
</template>

<script>
export default {

    props: {
    item: {
      
    },
  },
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

            const data =  this.item.score.filter(s => s.correct === 1).length * 100 / this.item.quest.length;

            console.log('item', data)
            if (this.isStarted) return;

            this.isStarted = true;
            this.interval = setInterval(() => {
                if (this.progress >= data) {
                    clearInterval(this.interval);
                    this.isCompleted = true;
                    return;
                }
                this.progress += 1; // 2% per interval (total 50 steps)
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

.progress-btn{
    cursor: pointer;
   
}

.progress-btn button{
    font-weight: bold;
    margin: 16px 5px 0px 5px;
}
.progress-button {
    position: relative;
    background: #D1D3D4;
    border-radius: 25px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    margin: 16px 5px 0px 5px;
    border: 1px solid #58595B;  
}

.button-content,
.completed-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-weight: bold;
    color: #231F20;
    font-size: 12px;
    border-radius: 25px;
    height: 27px;
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
    background: #9DED6C;
    /* Medium Green */
    transition: width 0.1s linear;
    border-radius: 40px;
    border: 1px solid #6D6E71;
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
    background: #D1D3D4 !important;


    position: relative;
    height: 30px;
  
    border-radius: 25px;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s ease;
    margin: 15px 5px 0px 5px;   
    /* Solid Green */
}

.completed-content {
    color: white !important;
}





</style>