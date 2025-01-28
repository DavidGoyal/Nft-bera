import AnimationsMenu from "@/components/AnimationMenu";
import Header from "@/components/Header";
import PawCounter from "@/components/pawcomponent";
import ProfileMenu from "@/components/ProfileMenu";
import RightMid from "@/components/RightMid";
import Slider from "@/components/Slider";

// SideRectangle Component
const SideRectangle = ({ text }: { text: string }) => {
	return (
		<div className="w-36 h-10 flex justify-center items-center bg-black border border-cyan-400 rounded-lg cursor-pointer">
			<p className="text-cyan-400 text-sm font-bold">{text}</p>
		</div>
	);
};

export default function Home() {
	return (
		<div className="min-h-screen overflow-x-hidden w-screen bg-gradient-to-b from-black via-[#010044] to-black grid grid-cols-12 relative">
			<Header />
			<div className="hidden xl:flex xl:col-span-2 h-screen flex-col items-start justify-end p-8 gap-14">
				<PawCounter />
				<AnimationsMenu />
			</div>

			<div className="col-span-12 xl:col-span-8 h-screen flex flex-col p-8">
				<Slider />
			</div>

			<div className="hidden xl:flex xl:col-span-2 h-screen flex-col items-end justify-between p-8 relative">
				<p
					className="absolute top-18 right-30 text-[#00B2FF] text-sm"
					style={{ transform: "translateX(-100%) translateY(100%)" }}
				>
					James Onion
				</p>
				<ProfileMenu />
				<RightMid />
				<SideRectangle text="BRING TO AR" />
			</div>
		</div>
	);
}
