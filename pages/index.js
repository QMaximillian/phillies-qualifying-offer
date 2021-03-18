import Head from "next/head";
import Error from "next/error";
import Image from "next/image";
import fetch from "node-fetch";
import HTMLTableToJson from "html-table-to-json";
import QualifyingOfferBanner from "../components/QualifyingOfferBanner";
import PlayersTable from "../components/PlayersTable";
import MainLayout from "../layout/MainLayout";

function fetchData() {
  return fetch("https://questionnaire-148920.appspot.com/swe/data.html");
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
  if (props.statusCode) {
    return <Error statusCode={props.statusCode} />;
  }

  return (
    <>
      <Head>
        <title>Qualifying Offer Application</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <div className="flex justify-between">
          <div className="w-full border-red-500 border-2 h-24 lg:w-3/5">
            <QualifyingOfferBanner
              qualifyingOffer={props.qualifyingOfferAmount}
            />
          </div>
          <div className="object-fit hidden md:flex h-full">
            <Image
              src="/../public/images/phillies-powder-blue-logo.png"
              width={160}
              height={"6rem"}
            />
          </div>
        </div>
        <div className="h-10 w-full border-2 border-indigo-500 mt-4 lg:w-1/2 lg:h-20 self-center"></div>
        <div className="w-full border-grey-500 border-2 flex-grow md:flex">
          <div className="hidden md:block border-yellow-500 border-2 h-full w-full md:w-1/2"></div>
          <div className="w-full md:w-1/2 border-2 border-pink-500 h-full">
            <PlayersTable></PlayersTable>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export async function getServerSideProps(context) {
  const res = await fetchData();
  const statusCode = res.statusCode > 200 ? res.statusCode : false;
  const data = await res.text();

  const players = sanitizePlayerSalary(data);
  const qualifyingOfferAmount = Math.round(
    players.slice(0, 125).reduce((acc, curr) => {
      return (acc += curr.Salary);
    }, 0) / 125
  );

  return {
    props: {
      statusCode,
      players: players.sort((a, b) => b.Salary - a.Salary),
      qualifyingOfferAmount,
    },
  };
}
