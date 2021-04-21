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

module.exports = router;
