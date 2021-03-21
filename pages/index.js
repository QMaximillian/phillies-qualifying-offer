import * as React from "react";
import Head from "next/head";
import Error from "next/error";
import Image from "next/image";
import MainLayout from "../layout/MainLayout";
import QualifyingOfferBanner from "../components/QualifyingOfferBanner";
import PlayerTable from "../components/PlayerTable";
import {
  formatInUSCurrency,
  parseHTMLTableToJSON,
  sanitizePlayerSalary,
  fetchData,
} from "../utils/index";

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
        <header className="bg-phillies-powder-blue-retro md:p-2">
          <div className="flex md:justify-between flex-col md:flex-row">
            <div className="flex w-full h-24 bg-phillies-powder-blue-retro min-w-min flex-col md:flex-row">
              <div className="flex text-base w-auto lg:w-2/5 h-full md:text-4xl rounded-lg px-4 py-2 md:mr-6 text-center bg-phillies-maroon-retro text-white">
                <div className="font-bold m-auto">Qualifying Offer</div>
              </div>
              <QualifyingOfferBanner
                qualifyingOffer={props.qualifyingOfferAmount}
              />
            </div>
            <div className="hidden md:flex">
              <Image
                src="/phillies-powder-blue-logo.png"
                width={160}
                height={"6rem"}
              />
            </div>
          </div>
        </header>
        <section className="rounded-md h-full mt-2">
          <PlayerTable columns={columns} data={data} />
        </section>
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
