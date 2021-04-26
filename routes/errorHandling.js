function checkHamsterObj(obj) {
  for (const property in obj) {
    if (
      (property === "name" && typeof obj.name === "string") ||
      (property === "age" && typeof obj.age === "number") ||
      (property === "favFood" && typeof obj.favFood === "string") ||
      (property === "loves" && typeof typeof obj.loves === "string") ||
      (property === "imgName" && typeof obj.imgName === "string") ||
      (property === "wins" && typeof obj.wins === "number") ||
      (property === "defeats" && typeof obj.defeats === "number") ||
      (property === "games" && typeof obj.games === "number")
    )
      continue;
    else return false;
  }
  return true;
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

module.exports.checkHamsterObj = checkHamsterObj;
module.exports.checkInput = checkInput;
