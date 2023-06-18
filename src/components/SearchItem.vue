<template>
    <RouterLink :to="{ name: 'city', params: { name: city } }">
      <div class="history__item flex" v-if="city">
        <SunCloudyIcon v-if="weather === 'небольшая облачность'" />
        <CloudyIcon v-if="weather === 'few clouds' || weather === 'переменная облачность'" />
        <RainIcon v-if="weather === 'light rain' || weather === 'небольшой дождь'" />
        <SunIcon v-if="weather === 'clear sky' || weather === 'ясно'" />
        <ThunderIcon v-if="weather === 'broken clouds' || weather === 'облачно с прояснениями'" />
        <h3>{{ city }}</h3>
        <span> 
          <span v-if="pos">+</span>
          {{ maxTemp }}° / 
          <span v-if="posMin">+</span>
          {{ minTemp }}°</span>
      </div>
    </RouterLink>
</template>

<script>
import CloudyIcon from '../components/icons/CloudyIcon.vue'
import NightIcon from '../components/icons/NightIcon.vue'
import RainIcon from '../components/icons/RainIcon.vue'
import SnowyIcon from '../components/icons/SnowyIcon.vue'
import SunCloudyIcon from '../components/icons/SunCloudyIcon.vue'
import SunIcon from '../components/icons/SunIcon.vue'
import ThunderIcon from '../components/icons/ThunderIcon.vue'
export default {
  props: ['city', 'maxTemp', 'minTemp', 'weather'],
  components: {CloudyIcon, NightIcon, RainIcon, SnowyIcon, SunCloudyIcon, SunIcon, ThunderIcon},
  data() {
    return{
      posNim: false
    }
  },
  computed: {
    pos() {
      if (this.maxTemp > 0) {
        return true
      }
      return false
    },
    posMin(){
      if (this.minTemp > 0) {
        return true
      }
      return false
    }
  }
}

</script>

<style scoped>
.history__item{
  padding: 16px 0;
  position: relative;
}
.history__item::before{
    content: "";
    position: absolute;
    top: 100%;
    left: -19px;
    width: 124%;
    height: 1px;
    background: #E9E9E9;
  }
.history__item svg{
  width: 24px;
  height: 24px;
  margin-right: 16px;
}
.history__item span{
  margin-left: auto;
}
</style>