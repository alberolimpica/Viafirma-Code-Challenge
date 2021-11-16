import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./components/Table"
import RelativePathCustomFilter from "./components/RelativePathFilter";
import DefaultColumnFilter from "./components/DefaultFilter";


/**
 * Main application, in this case, consisting solely on a table built and filtered using the consumed data.
 * 
 * @returns A main div containing only the table whit all the requested items/functionalities.
 */
function App() {
  const [loadingData, setLoadingData] = useState(true);

  // Define headers configuration and column behavior
  const columns = useMemo(() => [
    {
      Header: "policyId",
      accessor: "policyId",
      Filter: DefaultColumnFilter
    }, {
      Header: "caName",
      accessor: "caName",
      Filter: false,
    }, {
      Header: "relativePath",
      accessor: "relativePath",
      Filter: RelativePathCustomFilter,

      filter: (rows, columnName, filterValue) => {
        return rows.filter(row => {
          const { env, area, country } = row.original

          if (filterValue.env && filterValue.env !== env) {
            return false;
          } else if (filterValue.area && filterValue.area !== area) {
            return false;
          } else if (filterValue.country && filterValue.country !== country) {
            return false;
          }
          return true;
        });
      }
    },
    {
      Header: "pemFiles",
      accessor: "pemFiles.length",
      Filter: false,
    }], []);

  // Fetch and pre-process data to be displayed by the table
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {

      // FIXME: Enable CORS server side?
      // const response = await axios.get("https://casupport.viafirma.com/info.json",
      const response = await axios.get("info.json", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json'
        }
      })

      const rows = response.data.map(row => {
        const [env, area, country] = row.relativePath.split('/')
        return {
          ...row,
          env,
          area,
          country
        }
      });

      setData(rows);
      setLoadingData(false);
    }

    if (loadingData) {
      getData();
    }
  });

  // Page structure (single customized and filled table)
  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

export default App;
