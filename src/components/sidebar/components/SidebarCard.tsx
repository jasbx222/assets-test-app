import Image from "next/image";
import logo from '../../../../public/logo.png'; // Adjust the path as necessary
const FreeCard = () => {
  return (
    <div className="relative mt-14 md:top-24 flex w-[256px] justify-center rounded-[20px] bg-gradient-to-br from-[#868CFF] via-[#432CF3] to-brand-500 pb-4">
      <div className="absolute -top-12 flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-gradient-to-b from-[#868CFF] to-brand-500 dark:!border-navy-800">
       <Image 
          src={logo}
          alt="Free Card Icon"
          width={64}
          height={64}
          className="h-16 w-16 object-contain"  
        />
      </div>
    </div>
  );
};

export default FreeCard;