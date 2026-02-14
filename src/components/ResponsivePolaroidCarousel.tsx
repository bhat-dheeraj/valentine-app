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
    caption:
      "The day we met in person. Still one of the best days of my life ❤️",
  },
  {
    src: "/images/baby/photo25.jpg",
    caption: "Missing you a little extra today ❤️",
  },
  {
    src: "/images/baby/photo24.jpg",
    caption: "I wish I could hug you tightly right now… I miss you so much 💌",
  },
  {
    src: "/images/baby/photo23.jpg",
    caption: "Twinnnnnning with my babyyy😍",
  },
  {
    src: "/images/baby/photo21.png",
    caption: "You, me, and the beautiful scenary around us. Perfect 🌍❤️",
  },
  {
    src: "/images/baby/photo20.jpg",
    caption: "I love when you lean on my shoulder like that 😍",
  },
  {
    src: "/images/baby/photo17.jpg",
    caption: "Every moment with you is my favorite ❤️",
  },
  {
    src: "/images/baby/photo15.jpg",
    caption:
      "How can someone be this beautiful and this goofy at the same time? 😍",
  },
  {
    src: "/images/baby/photo13.jpg",
    caption: "My baby in the wild and I love it 😋",
  },
  {
    src: "/images/baby/photo12.jpg",
    caption: "You were glowing under those flowers 🌸",
  },
  {
    src: "/images/baby/photo11.jpg",
    caption: "I can never get enough of you 😍",
  },
  {
    src: "/images/baby/photo10.jpg",
    caption: "I just want to squeeze those cheeks so badly 😭❤️",
  },
  {
    src: "/images/baby/photo9.jpg",
    caption: "That smile. I could stare at it forever 😍",
  },
  {
    src: "/images/baby/photo8.jpg",
    caption: "The most beautiful bride in the world 💕",
  },
  {
    src: "/images/baby/photo7.jpg",
    caption: "Seeing you dance and laugh like that makes me so happy 🥰",
  },
  {
    src: "/images/baby/photo6.jpg",
    caption: "You looked like a goddess here. Divine ✨",
  },
  {
    src: "/images/baby/photo4.jpg",
    caption: "You looked chooooo cute in that shawl 😍",
  },
  {
    src: "/images/baby/photo3.jpg",
    caption: "My pretty baby glowing in yellow 💛",
  },
  {
    src: "/images/baby/photo2.jpg",
    caption: "That surprise dance made my heart explode 🥰",
  },
  {
    src: "/images/baby/photo1.jpg",
    caption: "How can someone be this beautiful? 💕",
  },
  {
    src: "/images/together/photo23.jpg",
    caption: "Walking down the aisle with you felt like a dream ❤️",
  },
  {
    src: "/images/together/photo22.jpg",
    caption: "The way you look at me melts my heart every single time 🥰",
  },
  {
    src: "/images/together/photo21.jpg",
    caption: "You're flawless, and somehow you make me look good too 😍",
  },
  {
    src: "/images/together/photo20.jpg",
    caption: "I will never let go of your hand 🤝❤️",
  },
  {
    src: "/images/together/photo19.jpg",
    caption: "PDA (Part 2)… no regrets 😏❤️",
  },
  {
    src: "/images/together/photo18.jpg",
    caption: "So much fun… even if the outcome was suspiciously planned 😝",
  },
  {
    src: "/images/together/photo17.jpg",
    caption: "PDA? Absolutely worth it 😝❤️",
  },
  {
    src: "/images/together/photo15.jpg",
    caption: "The day we got married. The happiest chapter of my life 💍❤️",
  },
  {
    src: "/images/together/photo14.jpg",
    caption: "We're engaged… and I still can't believe we are married 🥰",
  },
  {
    src: "/images/together/photo13.jpg",
    caption: "One of my favorite places to steal a kiss ❤️",
  },
  {
    src: "/images/together/photo12.jpg",
    caption: "I miss kissing you more than words can explain 💋",
  },
  {
    src: "/images/together/photo11.jpg",
    caption: "Our first dance and it already felt like forever 💃❤️",
  },
  {
    src: "/images/together/photo10.jpg",
    caption: "Even the animated version of you is impossibly cute 😍",
  },
  {
    src: "/images/together/photo9.jpg",
    caption: "The happiest moment. When you said yes 🥹💍",
  },
  {
    src: "/images/together/photo8.jpg",
    caption: "Every little moment with you feels like magic ✨",
  },
  {
    src: "/images/together/photo7.jpg",
    caption: "Feeding my baby doll will forever be my favorite thing 😋",
  },
  {
    src: "/images/together/photo6.jpg",
    caption: "Our first Okkul. It was so fun and special ❤️",
  },
  {
    src: "/images/together/photo5.jpg",
    caption: "Our first Theru together 💕",
  },
  {
    src: "/images/together/photo4.jpg",
    caption: "Our very first date 🥰",
  },
  {
    src: "/images/together/photo3.jpg",
    caption: "My favorite place is when you fall asleep in my arms 🥺",
  },
  {
    src: "/images/together/photo2.jpg",
    caption: "Just you, me, and the most beautiful skies 🌅",
  },
];

const polaroids2 = [
  {
    src: "/images/babySpecial/photo-bb-1.jpg",
    caption: "This is my snuggleboo. The love of my life 😍",
  },
  {
    src: "/images/babySpecial/photo-bb-2.jpg",
    caption: "She is the most prettiest girl in the world. No debate.",
  },
  {
    src: "/images/babySpecial/photo-bb-3.jpg",
    caption:
      "She's brilliant and smart. And And somehow... she’s always right.",
  },
  {
    src: "/images/babySpecial/photo-bb-4.png",
    caption:
      "She doesn't even try and still looks this beautiful. It's unfair honestly.",
  },
  {
    src: "/images/babySpecial/photo-bb-21.jpg",
    caption: "I could stare into her eyes forever and still not get tired.",
  },
  {
    src: "/images/babySpecial/photo-bb-5.png",
    caption: "She's effortlessly hot and she doesn't even have to try 🔥",
  },
  {
    src: "/images/babySpecial/photo-bb-6.png",
    caption: "Confidence level: high. Gaming skills: even higher. 😎",
  },
  {
    src: "/images/babySpecial/photo-bb-7.png",
    caption:
      "She got everything. Style, swag, and grace. Oh my god look at her 😍",
  },
  {
    src: "/images/babySpecial/photo-bb-8.jpg",
    caption: "She takes my breath away every single time I look at her 💕",
  },
  {
    src: "/images/babySpecial/photo-bb-9.jpg",
    caption: "That laugh is so beautiful. It fixes my worst days in seconds 🥰",
  },
  {
    src: "/images/babySpecial/photo-bb-10.jpg",
    caption: "She absolutely loves her sneakers and hoodies. ",
  },
  {
    src: "/images/babySpecial/photo-bb-11.jpg",
    caption:
      "She prefers the dark. Lights off. Peace mode on. That's her comfort zone 🌙",
  },
  {
    src: "/images/babySpecial/photo-bb-12.jpg",
    caption: "An adventurer at heart. Always ready for the next journey ✈️",
  },
  {
    src: "/images/babySpecial/photo-bb-13.jpg",
    caption: "A true foodie and somehow always chooses the best dishes ever",
  },
  {
    src: "/images/babySpecial/photo-bb-14.jpg",
    caption: "She loves her sleep and looks so damn cute doing it 🥺",
  },
  {
    src: "/images/babySpecial/photo-bb-15.jpg",
    caption: "Massage time is her favorite time. Anytime. Anywhere.",
  },
  {
    src: "/images/babySpecial/photo-bb-16.jpg",
    caption:
      "And oh yes. She loves her Darshan Raval. I'm only slightly jealous 😏",
  },
  {
    src: "/images/babySpecial/photo-bb-17.png",
    caption:
      "She makes friends in seconds. Her charm and personality is just magnetic ✨",
  },
  {
    src: "/images/babySpecial/photo-bb-18.jpg",
    caption: "She is just amazingly good at whatever she does.",
  },
  {
    src: "/images/babySpecial/photo-bb-19.jpg",
    caption: "My wife. My partner. My greatest blessing in this lifetime 💍❤️",
  },
  {
    src: "/images/babySpecial/photo-bb-20.jpg",
    caption: "And right now I miss her more than words can ever explain 💌",
  },
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
          delay: 2000,
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
