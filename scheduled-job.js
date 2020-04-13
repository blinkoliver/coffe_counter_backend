let fetch = require("node-fetch");
function FetchDaySum() {
    fetch(`https://coffe-counter-backend.herokuapp.com/prices/allToday/daySum`);
}
FetchDaySum();