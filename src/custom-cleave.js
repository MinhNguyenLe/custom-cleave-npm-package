const credit = require("./libs/creditCardFormatter.js");
const date = require("./libs/dateFormatter.js");

const customCleave = (obj) => {
  if (obj.type === "credit-card") {
    credit(obj.options);
  }
  if (obj.type === "date") {
    credit(obj.options);
  }
};
module.exports = customCleave;
/* import -> object -> 
customCleave({
type :string
options:{
  element :

}
})
**/
