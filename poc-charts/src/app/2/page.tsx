"use client";
import React, { useEffect, useRef } from "react";
import Doughnut from "@/charts/Doughnut";
import Link from "next/link";
const Page = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dounght = new Doughnut("chart");
  useEffect(() => {
    dounght.draw(
      [10, 2, 2, 2, 4],
      ["#22C55E", "#15803D", "#FBC524", "#E81446", "#B1C1D8"]
    );
  }, []);

  return (
    <>
      <div className="relative w-[500px] h-[500px]">
        <canvas ref={canvasRef} id="chart" width={"500px"} height={"500px"} />
        <p className="absolute translate-x-1/2 -translate-y-1/2 top-1/2 right-1/2">
          random text
        </p>
      </div>
      <Link href="/" className="m-4 p-4 ">
        ChartJS
      </Link>
    </>
  );
};

export default Page;
