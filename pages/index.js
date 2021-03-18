import Head from "next/head";
import fetch from "node-fetch";
import HTMLTableToJson from "html-table-to-json";

function fetchData() {
  return fetch(
    "https://questionnaire-148920.appspot.com/swe/data.html"
  ).then((res) => res.text());
}

function sanitizePlayerSalary(htmlTable) {
  const tableToJSONObject = HTMLTableToJson.parse(htmlTable);
  const json = tableToJSONObject.results[0];
  // Error handling

  const sanitizedJSON = json.map((player) => {
    const convertedSalary = convertToDollars(player.Salary);
    return {
      ...player,
      Salary: convertedSalary,
    };
  });

  return sanitizedJSON;
}

function convertToDollars(amount) {
  if (/\d/.test(amount)) {
    return Number(amount.replace(/\D/g, ""));
  } else {
    return 0;
  }
}

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}

export async function getServerSideProps(context) {
  const data = await fetchData();
  const players = sanitizePlayerSalary(data);
  const qualifyingOfferAmount = Math.round(
    players.slice(0, 125).reduce((acc, curr) => {
      return (acc += curr.Salary);
    }, 0) / 125
  );

  return {
    props: {
      players: players.sort((a, b) => b.Salary - a.Salary),
      qualifyingOfferAmount,
    },
  };
}
