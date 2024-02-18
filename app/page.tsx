import Hero from "@/components/home/hero";
import FeatureLine from "@/components/home/featureline";
import SearchCourse from "@/components/home/SearchCourse";
import FeatureBox from "@/components/home/featurebox";
import BecomeATeacher from "@/components/home/becomeATeacher";

export default function Home() {
  return (
    <main className="flex flex-1 min-h-screen flex-col items-center justify-between">
      <Hero />
      <FeatureLine />
      <SearchCourse />
      <FeatureBox />
      <BecomeATeacher />
    </main>
  );
}
