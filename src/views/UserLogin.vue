<template>
  <div>
    <section class="homepg-sec">
      <div class="container">
        <div class="home-headLogo">
          <img src="/images/logo.png" alt="logo" />
          <p>The only resource you need for MLA</p>
        </div>
      </div>
    </section>

    <section class="homepg-card-sec userlogin-sec">
      <div class="container">
        <div class="row">
          <div class="card-container">
            <div v-for="(card, index) in cards" :key="index" class="homemock-card" data-aos="fade-up" :data-aos-delay="index * 100"  data-aos-duration="800" @click="gotoroute">
              <div class="cardtop-content">
                <img :src="card.image" alt="Card Image" />
                <h2>{{ card.title }}</h2>
                <h6>{{ card.price }}</h6>
              </div>
              <div class="cardbottem-content">
                <h4>{{ card.question }}</h4>
                <p>{{ card.description }}</p>
              </div>
              <div class="cardbottom-shadow">
                <img src="/images/cardshadow.png" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- <section class="login-signup-sec">
        <div class="container">
          <div class="loginSignup-btn">
            <router-link to="/userlogin" class="loginBtn">Login</router-link>
            <router-link to="/" class="signupBtn">Sign up</router-link>
          </div>
        </div>
      </section> -->
  </div>
</template>


<script>
export default {
  name: "UserLogin",
  data() {
    return {
      cards: [
        {
          title: "Questions",
          price: "£9.99/mo.",
          question: "Practice questions",
          description: "3800 questions based on the MLA content map.",
          image: "/images/questionmark.png",
        },
        {
          title: "Notes",
          price: "£9.99/mo.",
          question: "Read notes",
          description:
            "Notes the visual aids for all MLA content map conditions",
          image: "/images/file.png",
        },
        {
          title: "Mocks",
          price: "£9.99/mo.",
          question: "Test yourself",
          description: "Five mocks carefully designed to mirror the MLA",
          image: "/images/brain.png",
        },
      ],
    };
  },


  methods: {


    gotoroute(){

      console.log('here');
      this.$router.push('/mocksection')
    }
  }
};
</script>

<style scoped>
.home-headLogo img {
  width: 250px;
  padding: 0px 0px 26px 0px;
}
</style>