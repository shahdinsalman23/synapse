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

      <section class="homepg-card-sec">
        <div class="container">
          <div class="row">
            <div class="card-container">
              <div v-for="(card, index) in cards" :key="index" class="homemock-card" data-aos="fade-up" :data-aos-delay="index * 100"  data-aos-duration="800">
                <div class="cardtop-content">
                  <img :src="card.image" alt="Card Image" />
                  <h2>{{ card.title }}</h2>
                  <h6>{{ card.price }}</h6>
                </div>
                <div class="cardbottem-content">
                  <h4>{{ card.question }}</h4>
                  <p>{{ card.description }}</p>
                  <div class="cardbottom-shadow">
                   <img src="/images/cardshadow.png" alt="">
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="login-signup-sec">
        <div class="container">
          <div class="loginSignup-btn">
            <button class="loginBtn" @click="showLoginModal = true">Login</button>
            <router-link to="/" class="signupBtn">Sign up</router-link>
          </div>
        </div>
      </section>
      <LoginModal v-if="showLoginModal" @close="showLoginModal = false" />
    </div>
  </template>


  <script>

import LoginModal from '@/components/LoginModal.vue'


  export default {
    name: "HomePage",
    components: {
      LoginModal
    },
    data() {
      return {
        showLoginModal: false,
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
          {
            title: "All in one",
            price: "£19.99/mo.",
            question: "Get all in one",
            description:
              "Get all three products candidates who choose this highest chance of passinh the MLA",
            image: "/images/bag.png",
          },
        ],
      };
    },
  };
  </script>