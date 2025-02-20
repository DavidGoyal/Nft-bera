import Image from "next/image";

const ProfileMenu = () => {
  return (
    <div className="flex flex-col items-center w-16 bg-black rounded-full border-2 border-cyan-500 gap-4 pb-4 relative">
      <p
        className="absolute w-auto top-18 right-30 text-[#00B2FF] text-sm"
        style={{ transform: "translateX(-100%) translateY(100%)" }}
      >
        Master Cub
      </p>
      {/* Profile Picture */}
      <div className="w-full h-16 rounded-full overflow-hidden border-2 border-cyan-500">
        <Image
          src="/glbimage1.png" // Replace with actual image path
          alt="Profile"
          className="w-full h-full object-cover"
          width={32}
          height={32}
        />
      </div>

      {/* Refresh Icon */}
      <Image
        src={"/reload-logo.webp"}
        alt="Reverse Icon"
        width={25}
        height={25}
      />

      {/* Settings Icon */}

      <Image
        src={"/settings-logo.webp"}
        alt="Reverse Icon"
        width={30}
        height={30}
      />
    </div>
  );
};

export default ProfileMenu;
