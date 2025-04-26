<template>
    <div>
        <section class="mockselection-sec">
            <div class="container">
                <div class="mockselection-btns" >
                  
                    <button class="mock-timer-btn  uncursor" data-aos="fade-up" data-aos-delay="100" data-aos-duration="800"  ><img src="/images/timer.png" alt="">180 minutes</button>
                    <button class="begin-btn"  data-aos="fade-up" data-aos-delay="100" data-aos-duration="800" @click="questionpage">Begin
                        <div class="cardbottom-shadow">
                            
                            <img src="/images/cardshadow.png" alt="">
                        </div>
                    
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  props: {
    indexing: {
      
    },
  },


  methods:{
    questionpage(){
        // this.$router.push('/mocksquestion')

        this.$router.push({ path: `/mocksquestion/${this.indexing.id}` });
        console.log('id',this.indexing)
    }
  }
}
</script>


<style scoped>

.uncursor{
    cursor: initial !important;
}


</style>