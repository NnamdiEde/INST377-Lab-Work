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
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}





async function mainEvent() {
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('button[type = "submit"]');

  const resto = document.querySelector('#resto_name');
  const zipcode = document.querySelector('#zipcode');
  submit.style.display = 'none';

  const results = await fetch('/api/foodServicesPG');
  const arrayFromJson = await results.json();
  // console.log(arrayFromJson);

  if (arrayFromJson.data.length > 0) {
    submit.style.display = 'block';


    let currentArray = [];
    zipcode.addEventListener('input', async (event) => {
      console.log(event.target.value);

      if (currentArray.length < 1) {// the actual  error current array is empty
        return;
      }
      let selectResto = []
      if (resto.value) {
        console.log("if", resto.value)

        selectResto = currentArray.filter((item) =>
          item.zip.includes(event.target.value)
          && item.name.includes(resto.value.toLowerCase()))
      }
      else {
        console.log("else", resto.value)
        selectResto = currentArray.filter((item) =>
          item.zip.includes(event.target.value)
        );
      }

      //  currentArray.forEach((item)=> console.log(item.zip))
      // console.log(selectResto);
      createhtmlList(selectResto);
    });
    resto.addEventListener('input', async (event) => {
      console.log(event.target.value);

      if (currentArray.length < 1) {// the actual  error current array is empty
        return;
      }
      const selectResto = currentArray.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerValue = event.target.value.toLowerCase();
        return lowerName.includes(lowerValue);
      });

      console.log(selectResto);
      createhtmlList(selectResto);
    });

    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      // console.log('form submission');


      currentArray = restoArrayMake(arrayFromJson.data);
      console.log(currentArray);
      createhtmlList(currentArray);
    });
  }


}

document.addEventListener('DOMContentLoaded', async () => mainEvent());
