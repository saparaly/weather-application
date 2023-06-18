
<template>
  <PreLoaderVue v-if="isLoading"/> 
  <div class="serach" v-else>
    <div class="search-input">
      <!-- <button class="icon" @click="weatherData">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.828 6.99998H16V8.99998H3.828L9.192 14.364L7.778 15.778L0 7.99998L7.778 0.221985L9.192 1.63598L3.828 6.99998Z" fill="#1C293D"/>
        </svg>
      </button> -->
      <RouterLink class="icon" to="/">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.828 6.99998H16V8.99998H3.828L9.192 14.364L7.778 15.778L0 7.99998L7.778 0.221985L9.192 1.63598L3.828 6.99998Z" fill="#1C293D"/>
          </svg>
        </RouterLink>
      <input v-model="cityName" type="text" placeholder="Поиск города" @keyup.enter="weatherData">
      <button class="icon" @click="getUserLocation" v-if="!clearInput">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.9091 0L10.91 2.78364C12.512 2.98617 14.0011 3.71585 15.1429 4.85774C16.2846 5.99963 17.0141 7.48887 17.2164 9.09091H20V10.9091L17.2164 10.91C17.0139 12.5119 16.2843 14.0009 15.1426 15.1426C14.0009 16.2843 12.5119 17.0139 10.91 17.2164L10.9091 20H9.09091V17.2164C7.48887 17.0141 5.99963 16.2846 4.85774 15.1429C3.71585 14.0011 2.98617 12.512 2.78364 10.91L0 10.9091V9.09091H2.78364C2.98599 7.48873 3.71558 5.9994 4.85749 4.85749C5.9994 3.71558 7.48873 2.98599 9.09091 2.78364V0H10.9091ZM10 4.54545C8.55336 4.54545 7.16598 5.12013 6.14305 6.14305C5.12013 7.16598 4.54545 8.55336 4.54545 10C4.54545 11.4466 5.12013 12.834 6.14305 13.8569C7.16598 14.8799 8.55336 15.4545 10 15.4545C11.4466 15.4545 12.834 14.8799 13.8569 13.8569C14.8799 12.834 15.4545 11.4466 15.4545 10C15.4545 8.55336 14.8799 7.16598 13.8569 6.14305C12.834 5.12013 11.4466 4.54545 10 4.54545ZM10 8.18182C10.4822 8.18182 10.9447 8.37338 11.2856 8.71435C11.6266 9.05533 11.8182 9.51779 11.8182 10C11.8182 10.4822 11.6266 10.9447 11.2856 11.2856C10.9447 11.6266 10.4822 11.8182 10 11.8182C9.51779 11.8182 9.05533 11.6266 8.71435 11.2856C8.37338 10.9447 8.18182 10.4822 8.18182 10C8.18182 9.51779 8.37338 9.05533 8.71435 8.71435C9.05533 8.37338 9.51779 8.18182 10 8.18182Z" fill="#1C293D"/>
        </svg>
      </button>
      <button class="icon" v-else @click="clearInputCity">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.931287 1.0359L0.979699 0.979821C1.15721 0.80231 1.43499 0.786172 1.63073 0.931409L1.68681 0.979821L5.99992 5.29271L10.313 0.979821C10.5083 0.784558 10.8249 0.784558 11.0201 0.979821C11.2154 1.17508 11.2154 1.49167 11.0201 1.68693L6.70725 6.00004L11.0201 10.3132C11.1977 10.4907 11.2138 10.7684 11.0686 10.9642L11.0201 11.0203C10.8426 11.1978 10.5649 11.2139 10.3691 11.0687L10.313 11.0203L5.99992 6.70737L1.68681 11.0203C1.49154 11.2155 1.17496 11.2155 0.979699 11.0203C0.784436 10.825 0.784436 10.5084 0.979699 10.3132L5.29259 6.00004L0.979699 1.68693C0.802188 1.50942 0.78605 1.23164 0.931287 1.0359L0.979699 0.979821L0.931287 1.0359Z" fill="#B4B4B4"/>
        </svg>
      </button>
      
    </div>

    <SearchItem v-if="city" :city="city" :maxTemp="maxTemp" :minTemp="minTemp" :weather="weather" />

    <p class="center" v-if="history.length == 0 && city == null">Введите название города</p>

    <div class="history" v-if="(history.length != 0 && country == null) ">
      <div class="block flex">
        <p v-if="country">{{ country }}</p>
        <p v-else>История поиска</p>
        <button @click="deleteHistory">Очистить</button>
      </div>
      <SearchItem  v-for="obj in history" :key="obj"
      :city="obj.city" :maxTemp="obj.maxTemp" :minTemp="obj.minTemp" :weather="obj.weather" />
    </div>
    <div>
  </div>
  </div>
</template>

<script>
import SearchItem from '../components/SearchItem.vue'
import PreLoaderVue from '../components/PreLoader.vue'
import { getWeatherData } from './weatherService/weatherService'
export default {
  components: {SearchItem, PreLoaderVue},
  data() {
    return {
      cityName: '',
      error: null,
      city: null,
      country: null,
      weather: null,
      minTemp: null,
      maxTemp: null,
      history: [],
      isLoading: false,
    };
  },
  async mounted(){
    this.weatherData()
    const data = await localStorage.getItem('history')
    if (data) {
      this.history = JSON.parse(data)
    }
  },
  computed: {
    clearInput(){
      if (this.cityName != '') {
        return true
      }
      return false
    }
  },
  methods: {
    async weatherData() {
      if (this.cityName) {
      try {
        this.isLoading = true
        const weatherData = await getWeatherData(this.cityName)
        this.city = weatherData.city
        this.country = weatherData.country
        this.weather = weatherData.weather
        this.maxTemp = Math.round(weatherData.maxTemp)
        this.minTemp = Math.round(weatherData.minTemp)
        const obj = {
          city: this.city,
          maxTemp: this.maxTemp,
          minTemp: this.minTemp,
          weather: this.weather
        }
        
        if (!this.history.some(item => item.city === obj.city)) {
          this.history.push(obj)
        }
        localStorage.setItem('history', JSON.stringify(this.history))

        this.cityName = null
        this.isLoading = false
      } catch (error) {
        console.error('Error:', error)
      }
    }
    },
    deleteHistory(){
      this.history = []
      localStorage.setItem('history', JSON.stringify(this.history))
    },
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showUserLocation)
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    },
    showUserLocation(position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      const nominatimAPI = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

      fetch(nominatimAPI)
        .then(response => response.json())
        .then(data => {
          if (data.address && data.address.city) {
            const city = data.address.city
            console.log(city, " aaaaaaaaaaaaaaaaaaaaaaaaaa")
            this.cityName = city
          } else {
            console.log('City not found')
          }
        })
        .catch(error => {
          console.log('Error occurred while fetching geolocation data:', error)
        })
    },
    clearInputCity() {
      this.cityName = ''
    }
  }
}
</script>

<style scoped>
.none {
  display: none;
}
.serach {
  padding: 16px;
}
.search-input {
  background: #FFFFFF;
  box-shadow: 0px 0px 2px rgba(11, 26, 34, 0.26);
  border-radius: 16px;
  padding: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
input {
  width: 100%;
  padding-left: 20px;
  border: none;
  outline: none; 
}
.icon {
  padding: 0;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border: none;
  background: none;
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}
p{
  color: var(--secondary);
}

.block {
  justify-content: space-between;
  margin-bottom: 16px;
}
.block button{
  padding: 0;
  text-align: right;
  color: #47B1E6;
  background: none;
  border: none;
  cursor: pointer;
}


</style>