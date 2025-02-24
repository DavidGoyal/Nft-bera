import AnimationsMenu from "@/components/AnimationMenu";
import Header from "@/components/Header";
import MiddleComponent from "@/components/MiddleComponent";
import RightSide from "@/components/Right-side";

export default function Home() {
  return (
    <div className="h-[100vh] overflow-x-hidden overflow-y-hidden w-screen bg-gradient-to-b from-black via-[#010044] to-black grid grid-cols-12 relative">
      <Header />
      <div className="hidden lg:flex lg:col-span-2 h-full flex-col items-start justify-end p-8 gap-14">
        <AnimationsMenu />
      </div>

      <MiddleComponent />

      <RightSide />
    </div>
  );
}
