const httpPromise = require("./scripts/httpPromise");
const apiPath =
  "https://api.edamam.com/api/food-database/v2/parser?app_id=576926a9&app_key=fc30e689443a0f7037cd351074d5240e";

// Grab some JSON data
const basicRequest = () => {
  return httpPromise(`${apiPath}&ingr=coffee`)
    .then((res) => {
      console.log(res.parsed[0].food?.nutrients);
      //      res.parsed[0].food?.nutrients;
    })
    .catch((err) => {
      console.log("oh no: " + err);
    });
};

// Process data
function listCalories(foods) {
  foods.map((food) => {
    httpPromise(`${apiPath}&ingr=${food}`).then((data) =>
      console.log(
        "A " +
          food +
          " has " +
          data.parsed[0].food?.nutrients["ENERC_KCAL"] +
          " calories"
      )
    );
  });
}

// Demonstrate async behaviour by clashing responses
let fruits = ["banana", "plum", "melon", "pear", "strawberry", "blackberry"];
// listCalories(fruits);
// basicRequest();

// Then sequence with then
// basicRequest().then(() => listCalories(fruits));

// Alternatively sequence with resolve

// Promise.all
const getCalForSingleFood = (food) => {
  return httpPromise(`${apiPath}&ingr=${food}`)
    .then((resp) => {
      //      console.log(resp.parsed[0].food?.nutrients["ENERC_KCAL"]);
      return resp.parsed[0].food?.nutrients["ENERC_KCAL"];
    })
    .catch((err) => console.error(err));
};

// getCalForSingleFood("coleslaw");

// Burger for error

function totalMealCals() {
  const promise1 = getCalForSingleFood("steak");
  const promise2 = getCalForSingleFood("coleslaw");
  const promise3 = getCalForSingleFood("cola");
  Promise.all([promise1, promise2, promise3]).then((vals) => {
    console.log("Total calories = " + vals.reduce((x, y) => x + y));
  });
}

totalMealCals();

// Async demo

async function getCallForVegetable(veg) {
  try {
    let vegCal = await getCalForSingleFood("carrot");
    console.log(vegCal);
  } catch (err) {
    console.error(err);
  }
}

getCallForVegetable("carrot");
