<script setup>
import LocationIcon from '../components/icons/LocationIcon.vue'
import CloudyIcon from '../components/icons/CloudyIcon.vue'
import PreLoaderVue from '../components/PreLoader.vue'
</script>

<template>
  <!-- <PreLoaderVue v-if="isLoading"/> -->
    <div class="home">
    <header class="header flex">
      <RouterLink to="/search">
        <div class="select-city flex white">
          <LocationIcon/>
          <h3 v-if="city">{{ city }}</h3>
          <h3 v-else>Город не определен</h3>
        </div>
      </RouterLink> 
    </header>
    <div class="result white">
      <CloudyIcon/>
      <h1>-</h1>
      <h3>-</h3>
    </div>
    <RouterLink class="btn" to="/location">Выбрать локацию</RouterLink> 

    <div class="bg l">
      <svg width="244" height="313" viewBox="0 0 244 313" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.5 -54L16.9177 -46.4771C-24.2544 21.1156 19.3376 108.51 98.1002 116.28V116.28C149.398 121.34 189.894 162.429 194.548 213.765V213.765C199.601 269.492 246.35 312.5 302.306 312.5H353" stroke="#7EC8ED" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 10"/>
      </svg>
    </div>
    <div class="bg r">
      <svg width="88" height="237" viewBox="0 0 88 237" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M-16.6965 5.51509C6.83013 3.2539 61.8095 -13.2518 81.4359 35.2883C105.969 95.9634 40.2958 111.038 59.1674 167.944C78.039 224.851 29.7277 258.014 -25 219.197" stroke="#7EC8ED" stroke-linecap="round" stroke-dasharray="10 10"/>
      </svg>
    </div>
  </div>
</template>


<style scoped>
.select-city{
  cursor: pointer;
}
.home {
  background: var(--accent-dark);
  width: 100%;
  height: 100%;
  padding: 19px;
  position: relative;
}
.header svg {
  margin-right: 11px;
}
.header {
  justify-content: space-between;
}
.save svg {
  margin: 0;
}
.save {
  cursor: pointer;
}
.result {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 55px;
  margin-bottom: 50px;
}
.result svg {
  margin-bottom: 22px;
  width: 116px;
  height: 116px;
}
.justify {
  justify-content: space-between;
}
.bg {
pointer-events: none;
}
.r {
  position: absolute;
  top: 92px;
  left: 0;
}
.l{
  position: absolute;
  top: 0;
  right: 0;
}
</style>

