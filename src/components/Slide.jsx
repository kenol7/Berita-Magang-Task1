import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Slide() {
  return (
    <div className="w-full px-6 lg:px-18 mt-20 mb-40">
      <Carousel
        autoPlay
        swipeable
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        transitionTime={800}
      >
        <div className="relative">
          <img
            src="/second.png"
            alt="Slide 1"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="relative">
          <img
            src="/second.png"
            alt="Slide 2"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="relative">
          <img
            src={"/second.png"}
            alt="Slide 3"
            className="rounded-xl shadow-lg w-full h-full"
          />
        </div>
      </Carousel>
    </div>
  );
}
