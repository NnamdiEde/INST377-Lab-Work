function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
    Math.random() * (newMax - newMin + 1) + newMin
  );
}

function restoArrayMake(dataArray) {
  // console.log('fired dataHandler');
  // console.table(dataArray);
  console.log(dataArray)
  const range = [...Array(15).keys()];
  const listItems = range.map((item, index) => {
    const restNum = getRandomIntInclusive(0, dataArray.length - 1);
    return dataArray[restNum];
  });
  // console.log(listItems);
  return listItems;

  //   range.forEach((item) => {
  //     console.log('range item', item);
  //   });
}

function createhtmlList(collection) {
  // console.log('fired HTML creator');
  // console.log(collection);
  const targetList = document.querySelector(".resto-list");
  targetList.innerHTML = '';
  collection.forEach((item) => {
    const { name } = item;
    const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}  </li>`;
    targetList.innerHTML += injectThisItem;
  });
}

function initMap() {
  // TODO const latlog = [38.784,-76.872]; should be PG county is Xinjang
  const map = L.map('mymap').setView([38.7849, -76.8721], 10);
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoibm5hbWRpZSIsImEiOiJjbDF1dmhoczcydzhmM2pqeGxlaXN6cTliIn0.5N2nFccAq6VFxhvSv5wEVQ'
    }).addTo(map);
  return map;
}

function addMapMarkers(map, collection) {
  map.eachLayer((layer) => {
    if (layer instanceof L.marker) {

      layer.remove();
    }
  });

  collection.foreach(item => {
    const point = item.geocoded_column_1?.coordinates;
    console.log(item.geocoded_column_1?.coordinates);
    L.marker([point[1], point[0]]).addTo(map);
  })
}

async function mainEvent() {
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button[type = "submit"]');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  const map = initMap('map');
  const retrievalVar = 'restauraunts';
  submit.style.display = 'none';

  if (localStorage.getItem(retrievalVar) !== undefined) {
    const results = await fetch('/api/foodServicesPG');
    const arrayFromJson = await results.json();
    console.log(arrayFromJson);
    localStorage.setItem(retrievalVar, JSON.stringify(arrayFromJson.data));
  }

  const storedDataString = localStorage.getItem(retrievalVar);
  console.log(storedDataString);
  const storedDataArray = JSON.parse(storedDataString);
  console.log(storedDataArray);

  if (storedDataArray.length > 0) {
    submit.style.display = 'block';

    let currentArray = [];
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);





      const selectResto = storedDataArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });

      console.log(selectResto);
      createhtmlList(selectResto);
    });


    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      currentArray = restoArrayMake(storedDataArray);
      console.log(currentArray);
      createhtmlList(currentArray);
      addMapMarkers(map, currentArray)
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());





// // Leaflet can be a bit old-fashioned.
// // Here's some code to remove map markers.
// map.eachLayer((layer) => {
//   if (layer instanceof L.Marker) {
//     layer.remove();
//   }
// });