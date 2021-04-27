const express = require("express");
const router = express.Router();
const getDatabase = require("../database.js");
const database = getDatabase();

router.get("/", async (req, res) => {
  const snapshot = await database.collection("matches").get();

  if (snapshot.empty) {
    res.status(404);
    return;
  }

  let loserIds = [];
  snapshot.forEach((doc) => {
    loserIds.push(doc.data().loserId);
  });

  let counts = {};
  for (let i = 0; i < loserIds.length; i++) {
    if (!counts.hasOwnProperty(loserIds[i])) {
      counts[loserIds[i]] = 1;
    } else {
      counts[loserIds[i]]++;
    }
  }

  let keys = Object.keys(counts).sort((a, b) => {
    return counts[b] - counts[a];
  });

  let topFive = [];
  if (keys.length < 5) {
    for (let i = 0; i < keys.length; i++) {
      const snapshot = await database.collection("hamster").doc(keys[i]).get();
      topFive.push(snapshot.data());
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const snapshot = await database.collection("hamster").doc(keys[i]).get();
      topFive.push(snapshot.data());
    }
  }

  res.send(topFive);
});

module.exports = router;
