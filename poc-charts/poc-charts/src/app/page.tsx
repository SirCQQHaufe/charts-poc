"use client";

import React from "react";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

export default function Home() {
  const information = {
    "Kein Handlungsbedarf": 10,
    Umgesetzt: 2,
    "In Bearbeitung": 2,
    Überfällig: 2,
    Offen: 4,
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data: ChartData<"doughnut", number[], string> = {
    labels: [
      "Kein Handlungsbedarf",
      "Umgesetzt",
      "In Bearbeitung",
      "Überfällig",
      "Offen",
    ],
    datasets: [
      {
        // label: "# of Votes",
        data: Object.values(information),
        backgroundColor: [
          "#22C55E",
          "#15803D",
          "#FBC524",
          "#E81446",
          "#B1C1D8",
        ],
      },
    ],
  };

  return (
    <main className="max-w-3xl h-[1000px] ">
      <div className=" h-[356px] w-[356px]">
        <Doughnut
          data={data}
          className="absolute "
          options={{
            responsive: true,
            radius: "100%",
            cutout: "90%",
            spacing: 1,
            plugins: {
              legend: {
                position: "bottom",

                labels: {
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
            },
          }}
          plugins={[
            {
              id: "doughnutLabel",
              beforeDatasetDraw(chart, args, pluginOptions) {
                const { ctx } = chart;
                ctx.save();
                console.log(JSON.parse(JSON.stringify(pluginOptions)));
                const xCoord = chart.getDatasetMeta(0).data[0].x;
                const yCoord = chart.getDatasetMeta(0).data[0].y;

                ctx.font = "700 16px HaufeMerriweatherSans";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(pluginOptions.ammount, xCoord, yCoord - 10);

                ctx.font = "400 14px HaufeMerriweatherSans";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                ctx.fillText(pluginOptions.title, xCoord, yCoord + 10);
              },

              defaults: { ammount: 20, title: "Beurteilungen" },
            },
          ]}
        />
      </div>
    </main>
  );
}
