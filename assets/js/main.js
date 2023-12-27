var map = L.map("map").setView([51.505, -0.09], 15);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
var marker = L.marker([51.505, -0.09]).addTo(map);

const formEle = document.querySelector("#ip-form");
const inputValue = document.querySelector("input");
const ipEle = document.querySelector("#ip");
const locationEle = document.querySelector("#location");
const timezoneEle = document.querySelector("#timezone");
const ispEle = document.querySelector("#isp");

async function handleSubmit(e) {
  e.preventDefault();
  const ipValue = inputValue.value;
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_A14fIKcPVO54DvWDnPZOP8HCpWc4p&ipAddress=${ipValue}`
  );
  const data = await res.json();
  console.log(data);
  const { city, country, lat, lng, postalCode, region, timezone } =
    data.location;
  ipEle.innerHTML = data.ip;
  locationEle.innerHTML = `${city}, ${region} ${postalCode}`;
  timezoneEle.innerHTML = `UTC ${timezone}`;
  ispEle.innerHTML = data.isp;
  map.flyTo(new L.LatLng(lat, lng), 15);
  marker = L.marker([lat, lng]).addTo(map);
}

formEle.addEventListener("submit", handleSubmit);
