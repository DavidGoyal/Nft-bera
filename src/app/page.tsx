import AnimationsMenu from "@/components/AnimationMenu";
import Header from "@/components/Header";
import ProfileMenu from "@/components/ProfileMenu";
import RightMid from "@/components/RightMid";
import Slider from "@/components/Slider";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden !overflow-y-hidden w-screen bg-gradient-to-b from-black via-[#010044] to-black grid grid-cols-12 relative">
      <Header />
      <div className="hidden lg:flex lg:col-span-2 h-full flex-col items-start justify-end p-8 gap-14">
        <AnimationsMenu />
      </div>

      <div className="col-span-12 lg:col-span-8 h-full flex flex-col p-8">
        <Slider />
      </div>

      <div className="hidden lg:flex lg:col-span-2 h-full flex-col items-end justify-start gap-[25%] p-8 relative">
        <p
          className="absolute top-18 right-30 text-[#00B2FF] text-sm"
          style={{ transform: "translateX(-100%) translateY(100%)" }}
        >
          Master Cub
        </p>
        <ProfileMenu />
        <RightMid />
      </div>
    </div>
  );
}
