import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import { MusicProvider } from "@/components/music/MusicProvider";
import MusicBar from "@/components/music/MusicBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <MusicProvider>
            <MusicBar />
            {children}
          </MusicProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
