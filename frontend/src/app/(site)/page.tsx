import { ImageBotHub } from "@/components/ai/ImageBotHub";
import { AboutStrip } from "@/components/home/AboutStrip";
import { CropMatrix } from "@/components/home/CropMatrix";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Hero } from "@/components/home/Hero";
import { NewsBoard } from "@/components/home/NewsBoard";
import { YouTubeSection } from "@/components/home/YouTubeSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CropMatrix />
      <AboutStrip />
      <YouTubeSection />
      <FeatureGrid />
      <NewsBoard />
      <ImageBotHub />
    </>
  );
}
