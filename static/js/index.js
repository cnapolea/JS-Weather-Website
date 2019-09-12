"use strict";

window.addEventListener('load', () => {

  function setWeekDay(date) {

    date = date.replace(' ','T');
    console.log(date);
    let dt = new Date(date);

    let weekdays = new Array(7);
    weekdays[1] = 'Monday';
    weekdays[2] = 'Tuesday';
    weekdays[3] = 'Wednesday';
    weekdays[4] = 'Thursday';
    weekdays[5] = 'Friday';
    weekdays[6] = 'Saturday';
    weekdays[0] = 'Sunday';

    let weekday = weekdays[dt.getDay()];
    return weekday;
  }

  function setIcon(iconID, icon) {
    icon = icon.replace(/-/g, '_').toUpperCase();
    let skycons = new Skycons({"color":'white'});

    skycons.play();

    return skycons.set(iconID, icon);
  }

  let temperatureConverter = {
    celsius_to_fahrenheit: temperature => {
      let result = (temperature * 9/5) + 32
      return result.toFixed(0);
    },
    fahrenheit_to_celcius: temperature => {
      let result = (temperature - 32) * 5/9
      return result.toFixed(0);
    },
  };

  let temperatureSection = document.querySelector('.temperature-section');

  let unit = document.querySelector('#unit'),
      temperatureDegree = document.querySelector('#temperature-degree'),
      temperatureDescription = document.querySelector('.temperature-description');

  let todayMaxTemperature = document.querySelector('#today-temperature-max'),
      todayMinTemperature = document.querySelector('#today-temperature-min'),
      day2MaxTemperature = document.querySelector('#day2-temperature-max'),
      day2MinTemperature = document.querySelector('#day2-temperature-min'),
      day3MaxTemperature = document.querySelector('#day3-temperature-max'),
      day3MinTemperature = document.querySelector('#day3-temperature-min'),
      day4MaxTemperature = document.querySelector('#day4-temperature-max'),
      day4MinTemperature = document.querySelector('#day4-temperature-min'),
      day5MaxTemperature = document.querySelector('#day5-temperature-max'),
      day5MinTemperature = document.querySelector('#day5-temperature-min'),
      day6MaxTemperature = document.querySelector('#day6-temperature-max'),
      day6MinTemperature = document.querySelector('#day6-temperature-min');

  let iconMain = document.querySelector('#icon-main'),
      todayIcon = document.querySelector('#today-icon'),
      day2Icon = document.querySelector('#day2-icon'),
      day3Icon = document.querySelector('#day3-icon'),
      day4Icon = document.querySelector('#day4-icon'),
      day5Icon = document.querySelector('#day5-icon'),
      day6Icon = document.querySelector('#day6-icon');

  let city = document.querySelector('.location .city'),
      location = document.querySelector('.location .country');

  let today = document.querySelector('#today'),
      day2 = document.querySelector('#day2'),
      day3 = document.querySelector('#day3'),
      day4 = document.querySelector('#day4'),
      day5 = document.querySelector('#day5'),
      day6 = document.querySelector('#day6');

  let dailyTemperatures,
      dailyTemperatures_2;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api_current = `${proxy}https://api.darksky.net/forecast/991deeb1b9be32bd71b2206335b01e9e/${latitude},${longitude}`;
      const api = `${proxy}api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&APPID=e65cba1ae9e6f44d5cf68072889343f3`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          const {country, name} = data.city;
          city.textContent = name;
          location.textContent = country;

          dailyTemperatures = [data.list[0], data.list[6], data.list[14], data.list[22], data.list[30], data.list[38]];
          // console.log(dailyTemperatures);
          day2.textContent = setWeekDay(dailyTemperatures[1].dt_txt);
          day3.textContent = setWeekDay(dailyTemperatures[2].dt_txt);
          day4.textContent = setWeekDay(dailyTemperatures[3].dt_txt);
          day5.textContent = setWeekDay(dailyTemperatures[4].dt_txt);
          day6.textContent = setWeekDay(dailyTemperatures[5].dt_txt);


        })

        fetch(api_current)
          .then(response => {
            return response.json();
          })
          .then(data => {
            // console.log(data);
            const {temperature, summary, icon} = data.currently;
            temperatureDegree.textContent = temperature.toFixed(0);
            temperatureDescription.textContent = summary;

            dailyTemperatures_2 = data.daily.data;
            todayMaxTemperature.textContent = dailyTemperatures_2[0].temperatureHigh.toFixed(0);
            todayMinTemperature.textContent = dailyTemperatures_2[0].temperatureLow.toFixed(0);
            day2MaxTemperature.textContent = dailyTemperatures_2[1].temperatureHigh.toFixed(0);
            day2MinTemperature.textContent = dailyTemperatures_2[1].temperatureLow.toFixed(0);
            day3MaxTemperature.textContent = dailyTemperatures_2[2].temperatureHigh.toFixed(0);
            day3MinTemperature.textContent = dailyTemperatures_2[2].temperatureLow.toFixed(0);
            day4MaxTemperature.textContent = dailyTemperatures_2[3].temperatureHigh.toFixed(0);
            day4MinTemperature.textContent = dailyTemperatures_2[3].temperatureLow.toFixed(0);
            day5MaxTemperature.textContent = dailyTemperatures_2[4].temperatureHigh.toFixed(0);
            day5MinTemperature.textContent = dailyTemperatures_2[4].temperatureLow.toFixed(0);
            day6MaxTemperature.textContent = dailyTemperatures_2[5].temperatureHigh.toFixed(0);
            day6MinTemperature.textContent = dailyTemperatures_2[5].temperatureLow.toFixed(0);

          setIcon(todayIcon, dailyTemperatures_2[0].icon);
          setIcon(day2Icon, dailyTemperatures_2[1].icon);
          setIcon(day3Icon, dailyTemperatures_2[2].icon);
          setIcon(day4Icon, dailyTemperatures_2[3].icon);
          setIcon(day5Icon, dailyTemperatures_2[4].icon);
          setIcon(day6Icon, dailyTemperatures_2[5].icon);
          setIcon(iconMain, icon);

          temperatureSection.addEventListener('click', () => {
            if (unit.textContent == 'F') {
              unit.textContent = 'C';
              temperatureDegree.textContent = temperatureConverter.fahrenheit_to_celcius(+temperatureDegree.textContent);
              todayMaxTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+todayMaxTemperature.textContent);
              todayMinTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+todayMinTemperature.textContent);
              day2MaxTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day2MaxTemperature.textContent);
              day2MinTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day2MinTemperature.textContent);
              day3MaxTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day3MaxTemperature.textContent);
              day3MinTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day3MinTemperature.textContent);
              day4MaxTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day4MaxTemperature.textContent);
              day4MinTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day4MinTemperature.textContent);
              day5MaxTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day5MaxTemperature.textContent);
              day5MinTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day5MinTemperature.textContent);
              day6MaxTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day6MaxTemperature.textContent);
              day6MinTemperature.textContent = temperatureConverter.fahrenheit_to_celcius(+day6MinTemperature.textContent);

              } else {
              unit.textContent = 'F';
              temperatureDegree.textContent = temperatureConverter.celsius_to_fahrenheit(+temperatureDegree.textContent);
              todayMaxTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+todayMaxTemperature.textContent);
              todayMinTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+todayMinTemperature.textContent);
              day2MaxTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day2MaxTemperature.textContent);
              day2MinTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day2MinTemperature.textContent);
              day3MaxTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day3MaxTemperature.textContent);
              day3MinTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day3MinTemperature.textContent);
              day4MaxTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day4MaxTemperature.textContent);
              day4MinTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day4MinTemperature.textContent);
              day5MaxTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day5MaxTemperature.textContent);
              day5MinTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day5MinTemperature.textContent);
              day6MaxTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day6MaxTemperature.textContent);
              day6MinTemperature.textContent = temperatureConverter.celsius_to_fahrenheit(+day6MinTemperature.textContent);
            }
          });

          });
    });

  }

});
