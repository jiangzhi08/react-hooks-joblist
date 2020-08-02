import React from "react";
import { Line } from "react-chartjs-2";
import styles from "./USHistoric.module.css";

export default function USHistoric({ covidUSHistoricdata, statename }) {
  const getState = (datax, datay) => {
    var state = {
      labels: datax,
      datasets: [
        {
          label: "",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(225,0,0,0.4)",
          borderColor: "red", // The main line color
          borderCapStyle: "square",
          borderDash: [], // try [5, 15] for instance
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "black",
          pointBackgroundColor: "white",
          pointBorderWidth: 1,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: "yellow",
          pointHoverBorderColor: "brown",
          pointHoverBorderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          // notice the gap in the data and the spanGaps: true
          data: datay,
          spanGaps: true,
        },
      ],
    };
    return state;
  };

  // const chartOptions = {
  //   scales: {
  //     yAxes: [
  //       {
  //         barPercentage: 0.5,
  //         gridLines: {
  //           display: false,
  //         },
  //       },
  //     ],
  //     xAxes: [
  //       {
  //         gridLines: {
  //           zeroLineColor: "black",
  //           zeroLineWidth: 2,
  //         },
  //         ticks: {
  //           min: 100,
  //           max: 6500,
  //           stepSize: 10,
  //         },
  //         scaleLabel: {
  //           display: true,
  //           labelString: "Density in kg/m3",
  //         },
  //       },
  //     ],
  //   },
  //   elements: {
  //     rectangle: {
  //       borderSkipped: "left",
  //     },
  //   },
  // };

  return (
    <React.Fragment>
      <div className={styles.container}>
        <Line
          className={styles.chart}
          data={getState(
            covidUSHistoricdata.map((item) => item.date),
            covidUSHistoricdata.map((item) => item.positiveIncrease)
          )}
          options={{
            title: {
              display: true,
              text: `${statename} Confirmed: Daily`,
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
      <div className={styles.container}>
        <Line
          data={getState(
            covidUSHistoricdata.map((item) => item.date),
            covidUSHistoricdata.map((item) => item.deathIncrease)
          )}
          options={{
            title: {
              display: true,
              text: `${statename}  Death: Daily`,
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
      <div className={styles.container}>
        <Line
          data={getState(
            covidUSHistoricdata.map((item) => item.date),
            covidUSHistoricdata.map((item) => item.positive)
          )}
          options={{
            title: {
              display: true,
              text: `${statename}  Confirmed: Total`,
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
      <div className={styles.container}>
        <Line
          data={getState(
            covidUSHistoricdata.map((item) => item.date),
            covidUSHistoricdata.map((item) => item.death)
          )}
          options={{
            title: {
              display: true,
              text: `${statename} US Death: Total`,
              fontSize: 20,
            },
            legend: {
              display: false,
              position: "right",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
