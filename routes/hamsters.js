const express = require("express");
const router = express.Router();
const getDatabase = require("../database.js");
const database = getDatabase();
const error = require("./errorHandling.js");

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

  if (!error.checkHamsterPost(obj)) {
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

  const docRef = await database.collection("hamster").doc(id).get();

  if (!error.checkHamsterPut(obj)) {
    res.status(400).send("Wrong object structure.");
    return;
  } else if (!docRef.exists) {
    res.status(404).send("Couldn't find the hamster.");
    return;
  }

  await database.collection("hamster").doc(id).set(obj, { merge: true });
  res.send("Hamster changed.");
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const docRef = await database.collection("hamster").doc(id).get();

  if (!docRef.exists) {
    res.status(404).send("Couldn't find the hamster.");
    return;
  }

  await database.collection("hamster").doc(id).delete();
  res.send("Hamster deleted.");
});

module.exports = router;
