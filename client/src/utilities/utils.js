
//function to remove dups from array of objs
export const removeDuplicateObjectFromArray = (array, key) => {
  let check = {};
  let unique = [];
  for (let i = 0; i < array.length; i++) {
    //checks if checkObject has this key, if not adds it to the object with value of true; also pushes unique results to unique array.
    if (!check[array[i][key]]) {
      check[array[i][key]] = true;
      unique.push(array[i]);
    }
  }
  return unique;
}

