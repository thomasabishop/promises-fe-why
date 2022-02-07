const httpPromise = require('./scripts/httpPromise');
const apiPath =
  'https://api.edamam.com/api/food-database/v2/parser?app_id=576926a9&app_key=fc30e689443a0f7037cd351074d5240e';

// Grab some JSON data
const basicRequest = () => {
  return httpPromise(`${apiPath}&ingr=coffee`)
    .then((res) => {
      console.log(res.parsed[0].food?.nutrients);
      //      res.parsed[0].food?.nutrients;
    })
    .catch((err) => {
      console.log('oh no: ' + err);
    });
  // .finally(() => {
  //   console.log('Process complete');
  // });
};

// Process data
function listCalories(foods) {
  foods.map((food) => {
    httpPromise(`${apiPath}&ingr=${food}`)
      .then((data) =>
        console.log(
          'A ' + food + ' has ' + data.parsed[0].food?.nutrients['ENERC_KCAL'] + ' calories',
        ),
      )
      .catch((err) => console.error(err));
  });
}

let fruits = ['banana', 'plum', 'melon', 'pear', 'strawberry', 'blackberry', 'mango', 'kiwi'];
// listCalories(fruits);
// basicRequest();

// basicRequest().then(() => listCalories(fruits));

const getCalForSingleFood = (food) => {
  return httpPromise(`${apiPath}&ingr=${food}`)
    .then((resp) => {
      //      console.log(resp.parsed[0].food?.nutrients["ENERC_KCAL"]);
      return resp.parsed[0].food?.nutrients['ENERC_KCAL'];
    })
    .catch((err) => console.error(err));
};

function totalMealCals() {
  const promise1 = getCalForSingleFood('steak');
  const promise2 = getCalForSingleFood('coleslaw');
  const promise3 = getCalForSingleFood('cola');
  Promise.all([promise1, promise2, promise3]).then((vals) => {
    console.log('Total calories = ' + vals.reduce((x, y) => x + y));
  });
}

// totalMealCals();

async function getCallForVegetable(veg) {
  try {
    let vegCal = await getCalForSingleFood('carrot');
    console.log(vegCal);
  } catch (err) {
    console.error(err);
  }
}

// getCallForVegetable('carrot');
