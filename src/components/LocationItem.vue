<template>
    <div class="saved__item flex">
        <div class="left">
            <SunCloudyIcon v-if="weather=='небольшая облачность'"/>
            <CloudyIcon v-if="weather=='few clouds' || weather=='переменная облачность'"/>
            <RainIcon v-if="weather=='light rain' || weather=='небольшой дождь'"/>
            <SunIcon v-if="weather=='clear sky' || weather=='ясно'"/>
            <ThunderIcon v-if="weather=='broken clouds' || weather=='облачно с прояснениями'"/>
        </div>
        <div class="middle">
            <h2><RouterLink :to="{ name: 'city', params: { name: city } }">{{city}}</RouterLink></h2>
            <p>{{weather}}</p>
            <h2>{{currentTemp}}° С</h2>
        </div>
        <div class="right" @click="save(city)">
            <button class="icon">
              <svg v-if="cityExists" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15.5445L3.82021 19L5.20021 12.061L0 7.2576L7.03321 6.42436L10 0L12.9668 6.42436L20 7.2576L14.7998 12.061L16.1798 19L10 15.5445Z" fill="#47B1E6"/>
              </svg>
              <svg v-if="!cityExists" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 15.5445L3.82021 19L5.20021 12.061L0 7.2576L7.03321 6.42436L10 0L12.9668 6.42436L20 7.2576L14.7998 12.061L16.1798 19L10 15.5445Z" fill="#B4B4B4"/>
              </svg>
            </button>
        </div>
        <div class="popup flex" v-if="added">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM9.003 14L4.76 9.757L6.174 8.343L9.003 11.172L14.659 5.515L16.074 6.929L9.003 14Z" fill="#1C293D"/>
      </svg>
      Локация добавлена в избранное
    </div>

    <div class="popup flex" v-if="removed">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18V18ZM9.003 14L4.76 9.757L6.174 8.343L9.003 11.172L14.659 5.515L16.074 6.929L9.003 14Z" fill="#1C293D"/>
      </svg>
      Локация удалена
      <button @click="save(city)">Отменить</button>
    </div>
    </div>
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
  props: ['city', 'currentTemp', 'weather'],
  components: {CloudyIcon, NightIcon, RainIcon, SnowyIcon, SunCloudyIcon, SunIcon, ThunderIcon},
  data() {
    return {
      saved: [],
      added: false,
      removed: false,
    }
  },
  computed: {
    cityExists() {
      return this.saved.some(item => item.city === this.city);
    },
},
  async mounted(){
    const data = await localStorage.getItem('saved')
    if (data) {
      this.saved = JSON.parse(data)
      console.log(this.saved)
    }
  },
  methods: {
    save(city) {
      const savedIndex = this.saved.findIndex((item) => item.city === city)
      this.removed = false
      this.added = false

      if (savedIndex !== -1) {
        this.saved.splice(savedIndex, 1)
        this.removed = true
        this.added = false
        if (!this.removed){
        this.added = true
        setTimeout(() => {
          this.removed = false;
        }, 3000);
      }
        this.removed = city
      } else {
        const obj = {
          city: city,
          currentTemp: this.currentTemp,
          weather: this.weather,
        }
        this.saved.push(obj)
      }

      localStorage.setItem('saved', JSON.stringify(this.saved))
      if (!this.removed){
        this.added = true
        if (!this.removed){
        this.added = true
        setTimeout(() => {
          this.added = false;
        }, 3000);
      }
      }
    },
  }
}
</script>

<style scoped>

.saved__item{
    justify-content: space-between;
    padding: 16px 0;
    position: relative;
  }
  .middle {
    margin-left: 30px;
  }
  .right {
    margin-left: auto;
  }
  .saved__item::before{
    content: "";
    position: absolute;
    top: 100%;
    left: -19px;
    width: 124%;
    height: 1px;
    background: #E9E9E9;
  }
  .left svg {
    width: 82px;
    height: 82px;
  }
  .icon {
    padding: 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
    border: none;
    background: none;
  }
</style>