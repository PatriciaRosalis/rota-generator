const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const engineers = [
  {
    firstName: "Patrick Luck",
    id: 1,
    totalShifts: 0,
  },
  {
    firstName: "Aristaeus Korneli",
    id: 2,
    totalShifts: 0,
  },
  {
    firstName: "Juno Saga",
    id: 3,
    totalShifts: 0,
  },
  {
    firstName: "Bronimir Leolin",
    id: 4,
    totalShifts: 0,
  },
  {
    firstName: "Snorri Cloelia",
    id: 5,
    totalShifts: 0,
  },
  {
    firstName: "Renáta Bernardina",
    id: 6,
    totalShifts: 0,
  },
  {
    firstName: "Biljana Lovrenc",
    id: 7,
    totalShifts: 0,
  },
  {
    firstName: "Eulalia Evaristus",
    id: 8,
    totalShifts: 0,
  },
  {
    firstName: "Kleio Rain",
    id: 9,
    totalShifts: 0,
  },
  {
    firstName: "Margus Linsay",
    id: 10,
    totalShifts: 0,
  },
];

const TOTAL_DAYS = 10;
const SHIFTS_PER_DAY = 2;
const MAX_AMOUNT_SHIFTS = 2;
const MAX_AMOUNT_RETRIES = 40;

function canWork(engineer, currentDay, previousDay) {
  //RULES

  //An engineer can do at most one-half days shift in a day
  if (currentDay.find((eng) => eng.id === engineer.id)) {
    return false;
  }

  //An engineer cannot have half days shifts on consecutive days
  if (previousDay && previousDay.find((eng) => eng.id === engineer.id)) {
    return false;
  }

  //Each eligible engineer should have completed one whole day of support in any two (2) week period.
  if (engineer.totalShifts === MAX_AMOUNT_SHIFTS) {
    return false;
  }

  return true;
}

app.get("/rota", async (req, res) => {
  //Because engineers is a mocked JS object, it keeps the same reference. As a quick fix I did the JSON.parse + JSON.stringify to get new references in the object.
  let tempEngineers = JSON.parse(JSON.stringify(engineers));
  let RETRY_COUNT = 0;
  const rota = [];

  //Iterate over the total days (2) of work
  for (let i = 0; i < TOTAL_DAYS; i++) {
    const day = [];

    //While we have two days, fill the positions with the shifts allowed per day
    while (day.length < SHIFTS_PER_DAY) {
      const randomEngineer =
        tempEngineers[Math.floor(Math.random() * tempEngineers.length)];

      const isAvailable = canWork(
        randomEngineer,
        day,
        rota[i === 0 ? undefined : i - 1]
      );

      if (isAvailable) {
        randomEngineer.totalShifts++;

        //Check if total shifts is already in the limit, if so, remove from available engineers
        if (randomEngineer.totalShifts >= MAX_AMOUNT_SHIFTS) {
          tempEngineers = tempEngineers.filter(
            (eng) => eng.id !== randomEngineer.id
          );
        }

        day.push(randomEngineer);
      } else {
        RETRY_COUNT++;

        if (RETRY_COUNT >= MAX_AMOUNT_RETRIES) {
          RETRY_COUNT = 0;
          break;
        }
      }
    }
    rota.push(day);
  }

  res.send(rota);
});

//Starting server
app.listen(5000, console.log("listening on port 5000"));
