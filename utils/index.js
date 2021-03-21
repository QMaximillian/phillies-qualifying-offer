import fetch from "node-fetch";
import HTMLTableToJson from "html-table-to-json";

function formatInUSCurrency(offer) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(offer);
}

function fetchData() {
  return fetch("https://questionnaire-148920.appspot.com/swe/data.html");
}

function parseHTMLTableToJSON(htmlTable) {
  // HTML table to json: https://www.npmjs.com/package/html-table-to-json
  // This package helps to convert an HTML table into an easier to use json object
  const tableToJSONObject = HTMLTableToJson.parse(htmlTable);
  const json = tableToJSONObject.results[0];
  return json;
}
function sanitizePlayerSalary(data) {
  // Error handling

  const sanitizedJSON = data.map((player) => {
    const convertedSalary = convertToDollars(player.Salary);
    return {
      ...player,
      Salary: convertedSalary,
    };
  });

  return sanitizedJSON;
}

function convertToDollars(amount) {
  // Check if an input string contains a number: https://stackoverflow.com/questions/5778020/check-whether-an-input-string-contains-a-number-in-javascript
  if (/\d/.test(amount)) {
    // Remove non-numeric characters: https://stackoverflow.com/questions/1862130/strip-all-non-numeric-characters-from-string-in-javascript
    return Number(amount.replace(/\D/g, ""));
  } else {
    return 0;
  }
}

export {
  formatInUSCurrency,
  fetchData,
  sanitizePlayerSalary,
  parseHTMLTableToJSON,
};
