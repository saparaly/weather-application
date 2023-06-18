<script>
import LocationIcon from '../components/icons/LocationIcon.vue'
import CloudyIcon from '../components/icons/CloudyIcon.vue'
import NightIcon from '../components/icons/NightIcon.vue'
import RainIcon from '../components/icons/RainIcon.vue'
import SnowyIcon from '../components/icons/SnowyIcon.vue'
import SunCloudyIcon from '../components/icons/SunCloudyIcon.vue'
import SunIcon from '../components/icons/SunIcon.vue'
import ThunderIcon from '../components/icons/ThunderIcon.vue'
import { getWeatherData } from './weatherService/weatherService'

export default {
  name: "city",
  components: {LocationIcon, CloudyIcon, NightIcon, RainIcon, SnowyIcon, SunCloudyIcon, SunIcon, ThunderIcon },
  data() {
    return {
      cityName: '',
      error: null,
      currentDate: null,
      currentTime: null,
      city: null,
      country: null,
      weather: null,
      hourlyTemperatures: [],
      minTemp: null,
      maxTemp: null,
      windSpeed: null,
      humidity: null,
      currentTemp: null,
      saved: [],
      added: false,
      removed: false,
      pos: false
    }
  },
  computed: {
    isSaved() {
      return this.saved.some((item) => item.city === this.city)
    },
  },
  async mounted(){
    this.city = this.$route.params.name
    // console.log(this.city, " this.city")
    this.getCurrentTime()
    this.weatherData()
    const data = await localStorage.getItem('saved')
    if (data) {
      this.saved = JSON.parse(data)
    }
  },
  methods: {
    async weatherData() {
      if (this.city) {
      try {
        const weatherData = await getWeatherData(this.city)
        this.currentDate = weatherData.currentDate
        this.currentTime = weatherData.currentTime
        this.city = weatherData.city
        this.country = weatherData.country
        this.weather = weatherData.weather
        this.hourlyTemperatures = weatherData.hourlyTemperatures
        this.maxTemp = Math.round(weatherData.maxTemp)
        this.minTemp = Math.round(weatherData.minTemp)
        this.humidity = weatherData.humidity
        this.windSpeed = weatherData.windSpeed
        this.currentTemp =  Math.round(weatherData.currentTemp)
        if (this.currentTemp > 0) {
          this.pos = true
        }
      } catch (error) {
        console.error('Error', error)
      }
    }
    },
    getCurrentTime() {
      const now = new Date()
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      this.currentTime = currentTime
    },
    formatTemperature(temperature) {
    return Math.round(temperature)
    },
    formatTime(time) {
      const date = new Date(time)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`
    },
    isCurrentTime(time) {
      const currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
      const firstTwoDigits1 = time.substr(0, 2)
      const firstTwoDigits2 = currentTime.substr(0, 2)
      // console.log(time, currentTime)
      return firstTwoDigits1 === firstTwoDigits2
    },
    save() {
      const savedIndex = this.saved.findIndex((item) => item.city === this.city)
      this.removed = false
      this.added = false

      if (savedIndex !== -1) {
        this.saved.splice(savedIndex, 1)
        this.removed = true
        this.added = false
        setTimeout(() => {
          this.removed = false;
        }, 3000);
      } else {
        const obj = {
          city: this.city,
          temp: this.currentTemp,
          weather: this.weather,
        }
        this.saved.push(obj)
      }
      localStorage.setItem('saved', JSON.stringify(this.saved))
      if (!this.removed){
        this.added = true
        setTimeout(() => {
          this.added = false;
        }, 3000);
      }
    }
  }
}
</script>

<template>
    <div class="home">
    <header class="header flex">
      <RouterLink to="/search">
        <div class="select-city flex white">
          <LocationIcon/>
          <h3 v-if="city">{{ city }}</h3>
          <h3 v-else>Город не определен</h3>
        </div>
      </RouterLink> 
      <div class="save" @click="save">
        <svg v-if="!isSaved " width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15.5445L3.82021 19L5.20021 12.061L0 7.2576L7.03321 6.42436L10 0L12.9668 6.42436L20 7.2576L14.7998 12.061L16.1798 19L10 15.5445ZM10 13.5384L13.7212 15.6189L12.8897 11.4413L16.0203 8.5486L11.7857 8.04708L10 4.17934L8.21432 8.04795L3.97967 8.5486L7.11031 11.4413L6.2788 15.6189L10 13.5384Z" fill="white"/>
        </svg>
        <svg v-else width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 15.5445L3.82021 19L5.20021 12.061L0 7.2576L7.03321 6.42436L10 0L12.9668 6.42436L20 7.2576L14.7998 12.061L16.1798 19L10 15.5445Z" fill="white"/>
        </svg>
      </div>
    </header>
    <div class="result white">
      <SunCloudyIcon v-if="weather=='небольшая облачность'"/>
      <CloudyIcon v-if="weather=='few clouds' || weather=='переменная облачность'"/>
      <RainIcon v-if="weather=='light rain' || weather=='небольшой дождь'"/>
      <SunIcon v-if="weather=='clear sky' || weather=='ясно'"/>
      <ThunderIcon v-if="weather=='broken clouds' || weather=='облачно с прояснениями'"/>
      <h1> <span v-if="pos">+</span> {{ currentTemp }}</h1>
      <h3>{{weather}}</h3>
    </div>
    <div class="flex justify white">
      <div class="block  flex">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 15H2V13H8.5C9.13875 13.0002 9.76525 13.1753 10.3116 13.5061C10.858 13.837 11.3035 14.311 11.5997 14.8769C11.8959 15.4428 12.0316 16.079 11.992 16.7166C11.9525 17.3541 11.7393 17.9686 11.3755 18.4936C11.0116 19.0186 10.5111 19.434 9.92799 19.6949C9.34493 19.9557 8.7016 20.052 8.06772 19.9734C7.43383 19.8947 6.83356 19.6441 6.33194 19.2486C5.83032 18.8532 5.44647 18.328 5.222 17.73L7.095 17.027C7.19118 17.2833 7.35566 17.5084 7.57063 17.6779C7.78559 17.8474 8.04285 17.9548 8.31451 17.9886C8.58618 18.0223 8.86189 17.9811 9.11179 17.8693C9.36169 17.7575 9.57623 17.5795 9.73218 17.3545C9.88813 17.1295 9.97954 16.8661 9.9965 16.5929C10.0135 16.3197 9.95532 16.047 9.82839 15.8045C9.70145 15.5619 9.51057 15.3588 9.27641 15.217C9.04225 15.0751 8.77375 15.0001 8.5 15ZM3 9H16.5C17.1387 9.00023 17.7653 9.17525 18.3116 9.5061C18.858 9.83695 19.3035 10.311 19.5997 10.8769C19.8959 11.4428 20.0316 12.079 19.992 12.7166C19.9525 13.3541 19.7393 13.9686 19.3755 14.4936C19.0116 15.0186 18.5111 15.434 17.928 15.6949C17.3449 15.9557 16.7016 16.052 16.0677 15.9734C15.4338 15.8947 14.8336 15.6441 14.3319 15.2486C13.8303 14.8532 13.4465 14.328 13.222 13.73L15.095 13.027C15.1912 13.2833 15.3557 13.5084 15.5706 13.6779C15.7856 13.8474 16.0428 13.9548 16.3145 13.9886C16.5862 14.0223 16.8619 13.9811 17.1118 13.8693C17.3617 13.7575 17.5762 13.5795 17.7322 13.3545C17.8881 13.1295 17.9795 12.8661 17.9965 12.5929C18.0135 12.3197 17.9553 12.047 17.8284 11.8045C17.7015 11.5619 17.5106 11.3588 17.2764 11.217C17.0423 11.0751 16.7738 11.0001 16.5 11H3C2.20435 11 1.44129 10.6839 0.87868 10.1213C0.316071 9.55871 0 8.79565 0 8C0 7.20435 0.316071 6.44129 0.87868 5.87868C1.44129 5.31607 2.20435 5 3 5H11.5C11.7738 4.99989 12.0423 4.92486 12.2764 4.78305C12.5106 4.64124 12.7015 4.43806 12.8284 4.19551C12.9553 3.95297 13.0135 3.68031 12.9965 3.40708C12.9795 3.13386 12.8881 2.87048 12.7322 2.64549C12.5762 2.4205 12.3617 2.24248 12.1118 2.13072C11.8619 2.01895 11.5862 1.9777 11.3145 2.01144C11.0428 2.04518 10.7856 2.15261 10.5706 2.32211C10.3557 2.49161 10.1912 2.7167 10.095 2.973L8.222 2.271C8.51047 1.50381 9.05898 0.862144 9.77194 0.457813C10.4849 0.0534825 11.3171 -0.0878816 12.1236 0.058352C12.9301 0.204586 13.6597 0.629147 14.1853 1.25806C14.711 1.88697 14.9993 2.68037 15 3.5C15 4.42826 14.6313 5.3185 13.9749 5.97488C13.3185 6.63125 12.4283 7 11.5 7H3C2.73478 7 2.48043 7.10536 2.29289 7.2929C2.10536 7.48043 2 7.73479 2 8C2 8.26522 2.10536 8.51957 2.29289 8.70711C2.48043 8.89465 2.73478 9 3 9Z" fill="white"/>
        </svg> {{windSpeed}} км/ч
      </div>
      <div class="block flex">
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 3.1L4.05 8.05C3.07111 9.029 2.40449 10.2763 2.13445 11.6341C1.86442 12.992 2.00308 14.3994 2.53292 15.6784C3.06275 16.9575 3.95996 18.0507 5.11109 18.8198C6.26222 19.589 7.61557 19.9995 9 19.9995C10.3844 19.9995 11.7378 19.589 12.8889 18.8198C14.04 18.0507 14.9373 16.9575 15.4671 15.6784C15.9969 14.3994 16.1356 12.992 15.8656 11.6341C15.5955 10.2763 14.9289 9.029 13.95 8.05L9 3.1ZM9 0.272003L15.364 6.636C16.6227 7.89468 17.4798 9.49833 17.8271 11.2442C18.1743 12.99 17.9961 14.7996 17.3149 16.4441C16.6337 18.0886 15.4802 19.4942 14.0001 20.4832C12.5201 21.4721 10.78 21.9999 9 21.9999C7.21998 21.9999 5.47992 21.4721 3.99988 20.4832C2.51984 19.4942 1.36629 18.0886 0.685099 16.4441C0.00390685 14.7996 -0.17433 12.99 0.172928 11.2442C0.520187 9.49833 1.37734 7.89468 2.636 6.636L9 0.272003Z" fill="white"/>
        </svg> {{humidity}}%
      </div>
    </div>
    <div class="bottom">
      <div class="flex justify">
        <h3>Сегодня {{ currentDate }}</h3>
        <span>{{maxTemp}}° /{{ minTemp}}° С</span>
      </div>
      <div class="overflow">
        <div class="items flex">
          <div class="item" 
          v-for="item in hourlyTemperatures" :key="item"
          :class="{ active: isCurrentTime(formatTime(item.time)) }"
          >
            <h3>{{ formatTemperature(item.temperature) }}°C</h3>
            <div class="icon"><SunCloudyIcon v-if="weather=='небольшая облачность'"/></div>
            <div class="icon"> <CloudyIcon v-if="weather=='few clouds'  || weather=='переменная облачность'"/></div>
            <div class="icon"><RainIcon v-if="weather=='light rain' || weather=='небольшой дождь'"/></div>
            <div class="icon"> <SunIcon v-if="weather=='clear sky' || weather=='ясно'"/></div>
            <div class="icon"><ThunderIcon v-if="weather=='broken clouds' || weather=='облачно с прояснениями'"/></div>
            <p>{{ formatTime(item.time) }}</p>
          </div>
        </div>
      </div>
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
      <button @click="save">Отменить</button>
    </div>

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
.block svg {
  width: 30px;
  margin-right: 5px;
}

.bottom {
  padding: 24px 16px;
  background: var(--white);
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 24px 24px 0px 0px;
  width: 100%;
}
.icon svg {
  width: 36px;
  height: 27px;
  margin: 18px 0;
}
.item {
  padding: 12px;
  border-radius: 12px;
  margin-right: 16px;
}
.item.active {
  background: var(--accent-light);
}
.items {
  margin-top: 12px;
}
.overflow {
  overflow: scroll;
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

