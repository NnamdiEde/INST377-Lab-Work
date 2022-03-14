function getRandomIntInclusive(min, max) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(
      Math.random() * (newMax - newMin + 1) + newMin
      );
}









function restoArrayMake(dataArray) {
  console.log('fired dataHandler');
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
    console.log('fired HTML creator');
    console.log(collection);
    const targetList = document.querySelector(".resto-list");
    targetList.innerHTML = '';
    console.log(collection);
    collection.forEach((item)=>  {
    console.log(item);
        const {name} = item;
        const displayName = name.toLowerCase();
    const injectThisItem = `<li>${displayName}</li>`;
    targetList.innerHTML += injectThisItem;
  });
}





async function mainEvent() {
  console.log('script loaded');
  const form = document.querySelector('.main_form');
  const submit = document.querySelector('.submit_button');
  // submit.style.display = 'none';

  const results = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
  const arrayFromJson = await results.json();
  console.log(arrayFromJson);

  if (arrayFromJson.length > 0) {
    // submit.style.display = 'block';
    form.addEventListener('submit', async (submitEvent) => {
      submitEvent.preventDefault();
      console.log('form submission');
      

      const restoArray = restoArrayMake(arrayFromJson);
      createhtmlList(restoArray);
    });
  }
}

document.addEventListener('DOMContentLoaded', async() => mainEvent());
