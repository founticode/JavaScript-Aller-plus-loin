let input = document.getElementById('city');
let btn = document.getElementById('addBtn');
let div = document.getElementById('weather');

btn.addEventListener('click', () => {
  let text = input.value.trim();
  if (text === "") return;
  addWeather();
  input.value = "";
});

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    btn.click();
  }
});

function addWeather() {
  div.innerHTML = "<p class='loading'>Loading...</p>";

  let cityName = input.value.trim();
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cba765bb7b83e524c283714e35c3791e&units=metric&lang=fr`;

  fetch(api)
    .then(response => {
      if (!response.ok) throw new Error('City not found!');
      return response.json();
    })
    .then(data => {
      let tpl = document.getElementById('template');
      let clone = tpl.content.cloneNode(true);

      clone.querySelector('.cityName').textContent = `${data.name}, ${data.sys?.country || ''}`;
      clone.querySelector('.icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      clone.querySelector('.temp').textContent = `${Math.round(data.main.temp)}°C`;
      clone.querySelector('.desc').textContent = data.weather[0].description;

      div.innerHTML = "";
      div.appendChild(clone);
    })
    .catch(error => {
      div.innerHTML = `<p class="error">${error.message}</p>`;
    });
}
