<template>
  <header class="header-main">
    <div class="container">
      <div class="header-left">
        <div class="header-left-logo"></div>
      </div>
      <div class="header-right">
        <nav class="nav-items">
          <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/">About MLA</router-link></li>
            <li><router-link to="/">Why choose us</router-link></li>
            <li><router-link to="/">FAQ</router-link></li>
            <li><router-link to="/">Free trial</router-link></li>
            <li><router-link to="/">About us</router-link></li>
          </ul>
        </nav>
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
