"use client";

import { Box, useTheme, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Polaroid from "./Polaroid";

import "swiper/css";

interface Props {
  reverse?: boolean;
  secondCarousal?: boolean;
}

const polaroids = [
  {
    src: "/images/together/photo1.jpg",
    caption: "One the best days of my life. The first day we met",
  },
  {
    src: "/images/together/photo2.jpg",
    caption: "You, me and beautiful skies 😍",
  },
  {
    src: "/images/together/photo3.jpg",
    caption: "I love it when you sleep in my arms 😋",
  },
  { src: "/images/together/photo4.jpg", caption: "Our first date 🥰" },
  { src: "/images/together/photo5.jpg", caption: "Our first theru 🥰" },
  { src: "/images/together/photo6.jpg", caption: "Our first okkul 😍" },
  {
    src: "/images/together/photo7.jpg",
    caption: "I love feeding my baby doll 😋",
  },
  { src: "/images/together/photo8.jpg", caption: "Every little moment. My constant  ❤️" },
  {
    src: "/images/together/photo9.jpg",
    caption: "I was so happy when you said yes 🥰",
  },
  {
    src: "/images/together/photo10.jpg",
    caption: "How can the animated you look soooo cute 😍",
  },
  {
    src: "/images/together/photo11.jpg",
    caption: "Our first dance together. It was so amazing 😍",
  },
  {
    src: "/images/together/photo12.jpg",
    caption: "I miss kissing you so much",
  },
  {
    src: "/images/together/photo13.jpg",
    caption: "One of my favorite places to kiss. ❤️",
  },
  {
    src: "/images/together/photo14.jpg",
    caption: "We are engaged now! I still can't believe it 🥰",
  },
  {
    src: "/images/together/photo15.jpg",
    caption: "One of the happiest days of my life. The day we got married 🥰",
  },
  { src: "/images/together/photo17.jpg", caption: "PDA 😝😝" },
  {
    src: "/images/together/photo18.jpg",
    caption: "So much fun. Even when the outcome was pre-planned 😝",
  },
  { src: "/images/together/photo19.jpg", caption: "PDA (Part 2) 😝😝" },
  {
    src: "/images/together/photo20.jpg",
    caption: "Will never let go of your hand ❤️",
  },
  {
    src: "/images/together/photo21.jpg",
    caption:
      "You tho are flawless. But You also always make me look so good in photos 😍",
  },
  {
    src: "/images/together/photo22.jpg",
    caption: "The way you look at me melts my heart every single time 🥰",
  },
  {
    src: "/images/together/photo23.jpg",
    caption: "Walking down the aisle with you was so beautiful ❤️",
  },
];

const polaroids2 = [
  {
    src: "/images/baby/photo1.jpg",
    caption: "How can someone look so beautiful 💕",
  },
  {
    src: "/images/baby/photo2.jpg",
    caption: "Loved how you surprised me with a dance 🥰",
  },
  { src: "/images/baby/photo3.jpg", caption: "My pretty baby in yellow 😍" },
  {
    src: "/images/baby/photo4.jpg",
    caption: "You look chooo cute in that shawl 😍",
  },
  {
    src: "/images/baby/photo5.jpg",
    caption: "Yo yo. Thats my cool and gorgeous wifeyyy 🥰",
  },
  {
    src: "/images/baby/photo6.jpg",
    caption: "Seriously though. You looked like a goddess 💕",
  },
  {
    src: "/images/baby/photo7.jpg",
    caption: "My baby just dancing and having fun. I love it so much 🥰",
  },
  {
    src: "/images/baby/photo8.jpg",
    caption: "The most beautiful bride ever 💕",
  },
  {
    src: "/images/baby/photo9.jpg",
    caption: "That smile tho. I can never get enough of it 😍",
  },
  {
    src: "/images/baby/photo10.jpg",
    caption: "Aaaaaaah. I want to squeeze those cheeks 😍",
  },
  { src: "/images/baby/photo11.jpg", caption: "Cant get enough of you 😍" },
  {
    src: "/images/baby/photo12.jpg",
    caption: "That gorgeous little face was glowing under all those flowers.",
  },
  { src: "/images/baby/photo13.jpg", caption: "My baby in the wild 😋" },
  {
    src: "/images/baby/photo14.jpg",
    caption: "You look sooooo cute while sleeping 😍",
  },
  {
    src: "/images/baby/photo15.jpg",
    caption: "How can some look so beautiful and goofy at the same time? 😍",
  },
  { src: "/images/baby/photo17.jpg", caption: "Love every moment with you ❤️" },
  {
    src: "/images/baby/photo20.jpg",
    caption: "I love it when you lean on my shoulder 😍",
  },
  {
    src: "/images/baby/photo21.png",
    caption: "Me you and the beautiful scenery. I love it all 😍",
  },
  {
    src: "/images/baby/photo22.jpg",
    caption: "Theru with you was so much fun.",
  },
  { src: "/images/baby/photo23.jpg", caption: "Twinnnnninnnng 😍" },
  {
    src: "/images/baby/photo24.jpg",
    caption: "I wish I could hug you so tight right now. I miss you",
  },
  { src: "/images/baby/photo25.jpg", caption: "Missing you always 💌" },
];

export default function ResponsivePolaroidCarousel({
  reverse,
  secondCarousal = false,
}: Props) {
  const theme = useTheme();
  const isIPad = useMediaQuery(theme.breakpoints.up("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const direction = isDesktop ? "vertical" : "horizontal";

  return (
    <Box
      sx={{
        height: isDesktop ? "100vh" : isIPad ? "35vh" : "40vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <Swiper
        direction={direction}
        modules={[Autoplay]}
        loop
        speed={5000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        slidesPerView={isDesktop ? 2 : isIPad ? 2 : 1}
        spaceBetween={isDesktop ? 50 : 2}
        style={{ height: "100%" }}
        freeMode={true}
      >
        {secondCarousal
          ? polaroids2.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
                  }}
                >
                  <Polaroid
                    src={item.src}
                    caption={item.caption}
                    rotate={index % 2 === 0 ? -4 : 4}
                  />
                </Box>
              </SwiperSlide>
            ))
          : polaroids.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 5,
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
