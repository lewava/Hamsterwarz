const express = require("express");
const router = express.Router();

const getDatabase = require("../database.js");
const database = getDatabase();

router.get("/", async (req, res) => {
  const docRef = database.collection("hamster");
  const snapshot = await docRef.get();

  if (snapshot.empty) {
    res.status(404).send("Couldn't find any hamsters.");
    return;
  }

  let hamsterList = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    hamsterList.push(data);
  });

  res.send(hamsterList);
});

router.get("/random", async (req, res) => {
  const docRef = database.collection("hamster");
  const snapshot = await docRef.get();

  if (snapshot.empty) {
    res.status(404).send("Couldn't find any hamster.");
    return;
  }

  let hamsterList = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    hamsterList.push(data);
  });

  const randomHamster =
    hamsterList[Math.floor(Math.random() * hamsterList.length)];

  res.send(randomHamster);
});

router.get("/:id", async (req, res) => {
  const docRef = await database.collection("hamster").doc(req.params.id).get();

  if (!docRef.exists) {
    res.status(404).send("Couldn't find the hamster.");
    return;
  }

  const data = docRef.data();
  res.send(data);
});

router.post("/", async (req, res) => {
  const obj = req.body;

  if (!checkHamsterObj(obj)) {
    res.status(400).send("Wrong object structure.");
    return;
  }

  const docRef = await database.collection("hamster").add(obj);
  const id = { id: docRef.id };
  res.send(id);
});

router.put("/:id", async (req, res) => {
  const obj = req.body;
  const id = req.params.id;

  const hamsterRef = database.collection("hamster");
  const snapshot = await hamsterRef.get();

  let hamsterId = false;
  snapshot.forEach((doc) => {
    if (id === doc.id) {
      hamsterId = true;
    }
  });

  if (!checkInput(obj)) {
    res.status(400).send("Wrong object structure.");
    return;
  } else if (!hamsterId) {
    res.status(404).send("There is no hamster with that id.");
    return;
  }

  await database.collection("hamster").doc(id).set(obj, { merge: true });
  res.send("Hamster changed.");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const hamsterRef = database.collection("hamster");
  const snapshot = await hamsterRef.get();

  let hamsterId = false;
  snapshot.forEach((doc) => {
    if (id === doc.id) {
      hamsterId = true;
    }
  });

  if (!hamsterId) {
    res.status(404).send("There is no hamster with that id.");
    return;
  }

  await database.collection("hamster").doc(id).delete();
  res.send("Hamster deleted.");
});

function checkHamsterObj(obj) {
  if (
    obj.hasOwnProperty("name") &&
    typeof obj.name === "string" &&
    obj.hasOwnProperty("age") &&
    typeof obj.age === "number" &&
    obj.hasOwnProperty("favFood") &&
    typeof obj.favFood === "string" &&
    obj.hasOwnProperty("loves") &&
    typeof obj.loves === "string" &&
    obj.hasOwnProperty("imgName") &&
    typeof obj.imgName === "string" &&
    obj.hasOwnProperty("wins") &&
    typeof obj.wins === "number" &&
    obj.hasOwnProperty("defeats") &&
    typeof obj.defeats === "number" &&
    obj.hasOwnProperty("games") &&
    typeof obj.games === "number"
  )
    return true;
  else return false;
}

function checkInput(obj) {
  for (const property in obj) {
    if (
      property === "name" ||
      property === "age" ||
      property === "favFood" ||
      property === "loves" ||
      property === "imgName" ||
      property === "wins" ||
      property === "defeats" ||
      property === "games"
    )
      continue;
    else return false;
  }

  for (const property in obj) {
    if (property === "name" && typeof obj[property] !== "string") return false;
    else if (property === "age" && typeof obj[property] !== "number")
      return false;
    else if (property === "favFood" && typeof obj[property] !== "string")
      return false;
    else if (property === "loves" && typeof obj[property] !== "string")
      return false;
    else if (property === "imgName" && typeof obj[property] !== "string")
      return false;
    else if (property === "wins" && typeof obj[property] !== "number")
      return false;
    else if (property === "defeats" && typeof obj[property] !== "number")
      return false;
    else if (property === "games" && typeof obj[property] !== "number")
      return false;
    else continue;
  }
  return true;
}

module.exports = router;
