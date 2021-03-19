import * as React from "react";
import Head from "next/head";
import Error from "next/error";
import Image from "next/image";
import fetch from "node-fetch";
import HTMLTableToJson from "html-table-to-json";
import MainLayout from "../layout/MainLayout";
import QualifyingOfferBanner from "../components/QualifyingOfferBanner";
import PlayerTable from "../components/PlayerTable";
// import GlobalTableSearch from "../components/GlobalTableSearch";
import { formatInUSCurrency } from "../utils/index";

function fetchData() {
  return fetch("https://questionnaire-148920.appspot.com/swe/data.html");
}

function parseHTMLTableToJSON(htmlTable) {
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
  if (/\d/.test(amount)) {
    return Number(amount.replace(/\D/g, ""));
  } else {
    return 0;
  }
}

export default function Home(props) {
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }

  const columns = React.useMemo(() =>
    props.columns.map((header) => {
      return {
        Header: header,
        accessor: header,
        Cell: ({ value }) =>
          header === "Salary" ? formatInUSCurrency(value) : value,
      };
    })
  );
  const data = React.useMemo(() => props.data);

  return (
    <>
      <Head>
        <title>Qualifying Offer Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="bg-phillies-powder-blue-retro sticky top-0 p-2">
          <div className="flex justify-between">
            <div className="flex w-full h-24 lg:w-auto bg-phillies-powder-blue-retro min-w-min">
              <span className="self-center text-4xl rounded-lg px-4 py-2 mr-6 text-center bg-phillies-maroon-retro text-white">
                <div>Qualifying</div>
                <div>Offer</div>
              </span>
              <QualifyingOfferBanner
                qualifyingOffer={props.qualifyingOfferAmount}
              />
            </div>
            <div className="object-fit hidden md:flex">
              <Image
                src="/../public/images/phillies-powder-blue-logo.png"
                width={160}
                height={"6rem"}
              />
            </div>
          </div>
        </div>
        <div className="w-full border-2 border-indigo-500 h-full mt-2 overflow-scroll relative">
          <PlayerTable columns={columns} data={data} />
        </div>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
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
      data: players.sort((a, b) => b.Salary - a.Salary),
      // .filter((player) => player.Salary !== 0),

      columns: Object.keys(players[0]),
      statusCode,
      qualifyingOfferAmount,
    },
  };
}
