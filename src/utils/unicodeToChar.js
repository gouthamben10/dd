function unicodeToChar(data) {
  let str = "";

  data.forEach((element) => {
    str = str.concat(String.fromCharCode(element));
  });

  console.log(str);

  return str;
}

export default unicodeToChar;
