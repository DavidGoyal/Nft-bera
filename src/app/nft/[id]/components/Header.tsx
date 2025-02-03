import Link from "next/link";

const Header = () => (
	<div className="w-full flex justify-between items-center absolute top-0 left-0 p-8 z-20">
		<Link href={"/"} className="block text-4xl text-white">
			<span className="text-[#00b2ff]">HOME</span>
		</Link>
	</div>
);

export default Header;
