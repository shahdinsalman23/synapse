<template>
  <header class="header-main">
    <div class="container">
      <div class="row">
        <div class="header-left">
          <div class="header-left-logo">
            <img src="/images/logo.png" alt="" />
          </div>
        </div>
        <div class="header-right">
          <nav class="nav-items">
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <span class="pipeline"></span>
              <li><router-link to="/">About MLA</router-link></li>
              <span class="pipeline"></span>
              <li><router-link to="/">Why choose us</router-link></li>
              <span class="pipeline"></span>
              <li><router-link to="/">FAQ</router-link></li>
              <span class="pipeline"></span>
              <li><router-link to="/">Free trial</router-link></li>
              <span class="pipeline"></span>
              <li><router-link to="/">About us</router-link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped></style>
