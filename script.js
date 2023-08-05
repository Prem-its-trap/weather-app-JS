const row = document.getElementById("weather-cards");
let record = {};
let srtArr = [];
function city() {
  const apiKey = "4320bc6e1960a9148f48938a4630b63f";
  const cityname = document.getElementById("city").value;
  if (cityname.trim() === "") {
    alert("Please type city to search weather");
    return;
  }
  if (record[cityname] === true) {
    alert("You already have added the city");
    return;
  }

  record[cityname] = true;
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}`;

  var arr = new Array();
  fetch(api)
    .then((res) => {
      console.log(res);
      if (res.statusText === "Not Found") {
        throw "City not found";
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const { main, name, sys, weather } = data;
      //   if (data == null) return;
      let ele = {
        main: main,
        name: name,
        sys: sys,
        weather: weather,
      };
      srtArr.push(ele);
      srtArr.sort((a, b) => a.main.temp - b.main.temp);
      row.innerHTML = "";
      console.log(srtArr);
      srtArr.forEach((item) => {
        const crd = document.createElement("div");
        crd.setAttribute("class", "col-sm-4");
        let temp = ((item.main.temp - 32) * 5) / 9;
        crd.innerHTML = `<div>
          <div class="weather_holder">
            <div class="temp_details">
              <h1 class="temp"> ${Math.round(temp)}<span>°C</h1>
              <span class="lat">H: ${Math.round(
                item.main.temp_max
              )}<sup>°C</sup> L: ${Math.round(item.main.temp_min)} </span><br />
              <span class="city">${item.name}  ${item.sys.country}</span>
            </div>
            <div class="temp_icon">
              <img
                src=https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                  item.weather[0].icon
                }.svg
                alt=""
                class="img-fluid"
                ,
                height="120px"
                ,
                width="120px"
              /><br />
              <span>${item.weather[0].main}</span>
            </div>
          </div>
        </div>`;

        row.append(crd);
      });
      document.getElementById("city").value = "";
    })
    .catch((err) => console.log(err));
}
// city();
