import axios from 'axios'

const apiKey = 'fade3cce7edee992d0488da87407ff7c'

export async function getWeatherData(cityName) {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`
        )

        console.log(response.data)

        const city = response.data.city.name
        const country = response.data.city.country
        const weather = response.data.list[0].weather[0].description

        const date = new Date()
        const monthNames = [
            "янв", "фев", "мар", "апр", "май", "июн",
            "июл", "авг", "сен", "окт", "ноя", "дек"
        ]
        const day = date.getDate()
        const month = monthNames[date.getMonth()]
        const currentDate = `${day} ${month}`

        const list = response.data.list
        const hourlyTemperatures = list.map(item => {
            return {
                time: item.dt_txt,
                temperature: item.main.temp,
                weather: item.weather[0].description
            }
        })

        let minTemp = list[0].main.temp_max
        let maxTemp = list[0].main.temp_min


        // console.log(response.data, " response.data")
        const windSpeed = list[0].wind.speed
        const humidity = list[0].wind.deg

        console.log(hourlyTemperatures)
        const currentTemp = list[0].main.temp
        return {
            city,
            country,
            weather,
            currentDate,
            hourlyTemperatures,
            minTemp,
            maxTemp,
            humidity,
            windSpeed,
            currentTemp
        }
    } catch (error) {
        console.error('Error', error)
    }
}