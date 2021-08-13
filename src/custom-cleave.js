const credit = require("./libs/creditCardFormatter.js");

const customCleave = (obj) => {
  if (obj.type === "credit-card") {
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
