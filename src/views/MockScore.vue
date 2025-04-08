<template>
    <div>
        <section class="mockscore-sec">
            <div class="container">
                <div class="mockscore-progress-btn">
                    <div class="mockscore-progress">
                        <div class="progress-text-score">
                            <div class="progress-text">{{ progress }}%</div>
                            <div class="progress-score">20/180</div>
                        </div>
                        <div class="progress-container">
                            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
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
export default {
  data() {
    return {
      progress: 36
    }
  }
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