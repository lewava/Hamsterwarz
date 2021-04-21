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

  await database.collection("hamster").add(obj);
  res.send("Hamster added.");
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

  // Kolla med david 400 bad request error handling.
  // Kolla med david om det behövs mer felhantering.
  if (!obj) {
    res.status(400).send("Wrong object structure.");
    return;
  }

  if (!hamsterId) {
    res.status(404).send("There is no hamster with that id.");
    return;
  } else {
    await database.collection("hamster").doc(id).set(obj, { merge: true });
    res.send("Hamster changed.");
  }
});

// Kolla med david 400 bad request error handling.
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
  } else {
    await database.collection("hamster").doc(id).delete();
    res.send("Hamster deleted.");
  }
});

function checkHamsterObj(obj) {
  if (
    obj.hasOwnProperty("name") &&
    obj.hasOwnProperty("age") &&
    obj.hasOwnProperty("favFood") &&
    obj.hasOwnProperty("loves") &&
    obj.hasOwnProperty("imgName") &&
    obj.hasOwnProperty("wins") &&
    obj.hasOwnProperty("defeats") &&
    obj.hasOwnProperty("games")
  )
    return true;
  else return false;
}

module.exports = router;
