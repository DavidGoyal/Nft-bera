import Header from "@/components/Header";
import MainSide from "@/components/MainSide";
import RightSide from "@/components/Right-side";

export default function Home() {
  return (
    <div className="h-[100vh] overflow-x-hidden overflow-y-hidden w-screen bg-gradient-to-b from-black via-[#010044] to-black grid grid-cols-12 relative">
      <Header />
      <MainSide />

      <RightSide />
    </div>
  );
}
