import * as React from "react";
import Head from "next/head";
import Error from "next/error";
import Image from "next/image";
import fetch from "node-fetch";
import HTMLTableToJson from "html-table-to-json";
import MainLayout from "../layout/MainLayout";
import QualifyingOfferBanner from "../components/QualifyingOfferBanner";
import PlayerTable from "../components/PlayerTable";
import { formatInUSCurrency } from "../utils/index";

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

export default function Home(props) {
  // next/error example github: https://github.com/vercel/next.js/issues/1134
  // If we get any status code besides 200 OK form the server, error handle.
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }

  const columns = React.useMemo(() =>
    props.columns.map((header) => {
      return {
        Header: header,
        accessor: header,
        // React Table uses this value to let us format column values.
        // This is why we must create the columns array on the client.
        Cell: ({ value }) =>
          header === "Salary" ? formatInUSCurrency(value) : value,
      };
    })
  );
  const data = React.useMemo(() => props.data);

  return (
    <>
      <Head>
        <title>Current Season Qualifying Offer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="bg-phillies-powder-blue-retro sticky top-0 md:p-2 h-1/4">
          <div className="flex md:justify-between flex-col md:flex-row">
            <div className="flex w-full h-24 lg:w-auto bg-phillies-powder-blue-retro min-w-min flex-col md:flex-row">
              <div className="flex text-base w-full h-full md:text-4xl rounded-lg px-4 py-2 md:mr-6 text-center bg-phillies-maroon-retro text-white">
                <div className="font-bold m-auto">Qualifying Offer</div>
              </div>
              <QualifyingOfferBanner
                qualifyingOffer={props.qualifyingOfferAmount}
              />
            </div>
            <div className="object-fit hidden md:flex">
              <Image
                src="/phillies-powder-blue-logo.png"
                width={160}
                height={"6rem"}
              />
            </div>
          </div>
        </div>
        <div className="w-full border-2 border-black rounded-md h-full mt-2 overflow-scroll relative">
          <PlayerTable columns={columns} data={data} />
        </div>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetchData();
  const statusCode = res.statusCode > 200 ? res.statusCode : false;
  const htmlTable = await res.text();
  const json = parseHTMLTableToJSON(htmlTable);
  const players = sanitizePlayerSalary(json);
  const qualifyingOfferAmount = Math.round(
    players.slice(0, 125).reduce((acc, curr) => {
      return (acc += curr.Salary);
    }, 0) / 125
  );

  return {
    props: {
      data: players,
      columns: Object.keys(players[0]),
      statusCode,
      qualifyingOfferAmount,
    },
  };
}
