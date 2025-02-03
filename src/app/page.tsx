import AnimationsMenu from "@/components/AnimationMenu";
import BringToVr from "@/components/bring-to-vr";
import Header from "@/components/Header";
import PawCounter from "@/components/pawcomponent";
import ProfileMenu from "@/components/ProfileMenu";
import RightMid from "@/components/RightMid";
import Slider from "@/components/Slider";

export default function Home() {
	return (
		<div className="h-[100vh] overflow-x-hidden overflow-y-hidden w-screen bg-gradient-to-b from-black via-[#010044] to-black grid grid-cols-12 relative">
			<Header />
			<div className="hidden xl:flex xl:col-span-2 h-screen flex-col items-start justify-end p-8 gap-14">
				<PawCounter />
				<AnimationsMenu />
			</div>

			<div className="col-span-12 xl:col-span-8 h-[100vh] max-h-[100vh] flex flex-col px-8 py-12 lg:py-8">
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
				<BringToVr />
			</div>
		</div>
	);
}
