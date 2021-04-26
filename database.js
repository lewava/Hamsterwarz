const admin = require("firebase-admin");

let serviceAccount;
if (process.env.PK) {
  serviceAccount = JSON.parse(process.env.PK);
} else {
  serviceAccount = require("./private-key.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

function getDatabase() {
  return admin.firestore();
}

module.exports = getDatabase;
