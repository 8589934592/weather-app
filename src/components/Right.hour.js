import React, { useState, useEffect, useContext } from "react";
import GetRequest from "../api/GetRequest";
import initData from "../api/initData";
import FormatTime from "./FormatTime";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Context } from "./Context";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RightHour = () => {
  const [data, setData] = useState(initData);
  const [status, setStatus] = useState(false);
  let value = useContext(Context);

  useEffect(() => {
    GetRequest.getLocation(value.search)
      .then((response) => {
        if (response.status !== 200) {
          setStatus(true);
        } else {
          const lat = response.data.coord.lat;
          const lon = response.data.coord.lon;
          GetRequest.getData(lat, lon).then((response) => {
            setData(response.data);
          });
        }
      })
      .catch((e) => {
        setStatus(true);
      });
  }, [value.search]);

  const hour = [];
  const temp = [];
  const feelLike = [];
  const gethours = data.hourly.map((e) => [...hour, FormatTime(e.dt)]);
  const getTemp = data.hourly.map((e) => [...temp, e.temp]);
  const getFeelLike = data.hourly.map((e) => [...feelLike, e.feels_like]);

  const options = {
    title: {
      display: true,
      text: "Weather",
    },
    legend: {
      display: true,
      position: "bottom",
    },
  };

  const dataChart = {
    labels: gethours,
    datasets: [
      {
        data: getTemp.flat(),
        label: " Temp (°C)",
        borderColor: "#8e5ea2",
        fill: false,
      },
      {
        data: getFeelLike.flat(),
        label: " Feel like (°C)",
        borderColor: "#3cba9f",
        fill: false,
      },
    ],
  };

  return (
    <>
      <Line options={options} data={dataChart} />
    </>
  );
};

export default RightHour;
