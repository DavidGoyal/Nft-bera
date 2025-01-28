import Image from "next/image";
import React from "react";

const ProfileMenu = () => {
	return (
		<div className="flex flex-col items-center w-16 bg-black rounded-full border-2 border-cyan-500 gap-4 pb-4">
			{/* Profile Picture */}
			<div className="w-full h-16 rounded-full overflow-hidden border-2 border-cyan-500">
				<Image
					src="https://s3-alpha-sig.figma.com/img/fe73/a06b/ffdb9cfcff4406c2a19564f8239b3f12?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WF9RsEJZKghyyDe5R-YXokgrm7i1UbE~lOj-MIjW7PCn0fe64ebyKU1PkBC11vgMXbIAYrnlrQWwIrH~9SIy16LRzfKPkmi5l-Jsyot1e0y5NPkeg-42BpfEQ~TxDaHfWNyjZTd8sgEkrDicTUa6nXQK0ZvoRYrDahcFfBssS29UXkfllR8w25sC-1LD2GILAMTWQK2slm8jbDqTggAWPzExGVf4-oXQNUh7KYjK1fdbVCWAhkOQvlUICcokLOudNT~9OGMavHb3hGb9V0F6kbeDmuIkzFSXXYHusgT6v8agYUw3p2TxJ7HL2OD-Whaia3otiZjECicAQH9mHTw0Xw__" // Replace with actual image path
					alt="Profile"
					className="w-full h-full object-cover"
					width={32}
					height={32}
				/>
			</div>

			{/* Refresh Icon */}
			<Image
				src={
					"https://s3-alpha-sig.figma.com/img/74ea/9b83/11817cf6d0dd0ea94a3795738f5cc9d8?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i4M-VA5Qu3tuVD9-FOYJ96ttMxX9s65JCJsMjAmvmii9RDtionMovyNxtlBonxlBF57fw-IHPMlYGO1UHjnc5iz65~Bl0oAQAllPCErUOebc1mv~SYrAtQjhMwIKo5P2Vr3hgDBkKhlpz~t-XlotNH78pGDbQ7UTEMaGYz0y-N~4~J008wNQOC-Ug9RnGy-UpU8bwVRb-TnHUNaMCkvA0Tud1-WnsX76UQNwKPqD-ZkHhmq2cTqZLXfZmB8FyDGzBLn9ZZ6uNRcoMK7Q3Q6gHYyqi5Mt2LKMFlnKVBWfYsqTXw8bCBWY3ntGOhylyLKXry8yQmLB1DTy3YE9RGzBdQ__"
				}
				alt="Reverse Icon"
				width={25}
				height={25}
			/>

			{/* Settings Icon */}

			<Image
				src={
					"https://s3-alpha-sig.figma.com/img/3caa/571d/edefcee0be1ba5880f20b94a91af6526?Expires=1739145600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jWW7S91P~E1Mhig-E0SARqojeb5AoktyTepg9csSd1FBQY7FO8Asr2Dg2S~Jkf8uhFuqz9WrltVt6hWeteAIhoB2wNUJhC4HazI67YckQNEN8omr~bu2YSlTstaJoN3H6I64p4QHrav0Hi42Kl3mbEZFAOjEncWSCYDt3vidgk2fUMETvEjqWYvUxy9BjJMWS8NyaGQk~qRsAhTzNf2e7iBF-0U5rEDSa~Kof15xdPQ2TXWQuazMJlOw1iNs98zfAYYISQsoIAzKtHKBR4DGZeKAyUuSW5miS0q525OtA-LNGgaXlX6~-jaYvMzjsPZsckxdG7Foaxi91jJ5Er~A8g__"
				}
				alt="Reverse Icon"
				width={30}
				height={30}
			/>
		</div>
	);
};

export default ProfileMenu;
