import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({
  reading,
  tempReading,
  graphData,
  appsyncProp,
}) {
  // {
  //   x: graphData.map((data) =>
  //     new Date(Number(data?.timestamp)).toLocaleTimeString()
  //   ),
  //   y: graphData.map((data) =>
  //     appsyncProp === "energyConsumption"
  //       ? data?.payload?.energyConsumption
  //       : appsyncProp === "waterConsumption"
  //       ? data?.payload?.waterConsumption
  //       : appsyncProp === "pressure"
  //       ? data?.payload?.pressure
  //       : appsyncProp === "currentTemp"
  //       ? data?.payload?.currentTemp
  //       : data?.payload?.uvIndex
  //   ),
  // },

  const arr = [];
  const backgroundColor = [
    "rgba(255, 99, 132, 0.2)",
    "rgba(54, 162, 235, 0.2)",
    "rgba(255, 206, 86, 0.2)",
    "rgba(75, 192, 192, 0.2)",
    "rgba(153, 102, 255, 0.2)",
    "rgba(255, 159, 64, 0.2)",
  ];
  const borderColor = [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];
  const setValue = () => {
    graphData.map((val) =>
      arr.push({
        x: new Date(Number(val.timestamp)).toLocaleTimeString(),
        y:
          appsyncProp === "energyConsumption"
            ? val?.payload?.energyConsumption
            : appsyncProp === "waterConsumption"
            ? val?.payload?.waterConsumption
            : appsyncProp === "pressure"
            ? val?.payload?.pressure
            : appsyncProp === "currentTemp"
            ? val?.payload?.currentTemp
            : val?.payload?.uvIndex,
      })
    );
  };
  setValue();
  const data = {
    datasets: [
      {
        label: "Data by date",
        data: arr,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    plugins: {
      title: { display: true, text: appsyncProp, font: { size: 24 } },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "hour",
          },
        },
      },
    },
  };
  return (
    <div>
      <Bar data={data} height={500} width={1200} options={options} />
    </div>
  );
}
