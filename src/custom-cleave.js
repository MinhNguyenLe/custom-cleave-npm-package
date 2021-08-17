// const credit = require("./libs/creditCardFormatter.js");
const dateFormatter = require("./libs/dateFormatter.js");

function customCleave(obj) {
  // if (obj.type === "credit-card") {
  //   credit(obj.options);
  // }
  if (obj.type === "date") {
    dateFormatter(obj.options);
  }
}
module.exports = customCleave;
/* import -> object -> 
customCleave({
type :string
options:{
  element :

}
})
**/
