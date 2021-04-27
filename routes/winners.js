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

  let winnerIds = [];
  snapshot.forEach((doc) => {
    winnerIds.push(doc.data().winnerId);
  });

  let counts = {};
  for (let i = 0; i < winnerIds.length; i++) {
    if (!counts.hasOwnProperty(winnerIds[i])) {
      counts[winnerIds[i]] = 1;
    } else {
      counts[winnerIds[i]]++;
    }
  }

  let keys = Object.keys(counts).sort((a, b) => {
    return counts[b] - counts[a];
  });

  let topFive = [];
  for (let i = 0; i < 5; i++) {
    const snapshot = await database.collection("hamster").doc(keys[i]).get();
    topFive.push(snapshot.data());
  }

  res.send(topFive);
});

module.exports = router;
