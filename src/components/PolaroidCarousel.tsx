"use client";

import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Polaroid from "./Polaroid";

interface Props {
  reverse?: boolean;
}

const polaroids = [
  {
    src: "/images/photo1.jpg",
    caption: "Still my favorite smile 💕",
  },
  {
    src: "/images/photo2.jpg",
    caption: "Our first movie night 🍿",
  },
  {
    src: "/images/photo3.jpg",
    caption: "That perfect sunset 🌅",
  },
  {
    src: "/images/photo4.jpg",
    caption: "Every little moment ❤️",
  },
  {
    src: "/images/photo5.jpg",
    caption: "Missing you always 💌",
  },
  {
    src: "/images/photo6.jpg",
    caption: "Forever my person 🖤",
  },
];

export default function PolaroidCarousel({ reverse }: Props) {
  return (
    <Box sx={{ width: "100%", py: 4 }}>
      <Swiper
        modules={[Navigation, Autoplay]}
        loop
        navigation
        spaceBetween={30}
        speed={4000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverse,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          0: { slidesPerView: 4 },
          900: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {polaroids.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Polaroid
                src={item.src}
                caption={item.caption}
                rotate={index % 2 === 0 ? -4 : 4}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}
