import nft1 from '/public/img/nfts/NftBanner1.png';

const Banner1 = () => {
  return (
    <div
      className="flex w-full  bg-green-50 flex-col rounded-[20px] bg-cover px-[30px] py-[30px] md:px-[64px] md:py-[56px]"
      // style={{ backgroundImage: `url(${nft1.src})` }}
    >
      <div className="w-full">
        <h4 className="mb-[14px] max-w-full text-xl font-bold text-[#000] dark:text-white/90 md:w-[64%] md:text-3xl md:leading-[42px] lg:w-[46%] xl:w-[85%] 2xl:w-[75%] 3xl:w-[52%]">
        ادارة الموظفين التابعين لشركة
        </h4>
        <p className="mb-[40px] max-w-full text-base font-medium text-[#000] md:w-[64%] dark:text-white/90 lg:w-[40%] xl:w-[72%] 2xl:w-[60%] 3xl:w-[45%]">
         توزيع المنتجات النفطية والغاز الطبيعي والكهرباء في السوق المحلي والعالمي
        </p>

       
      </div>
    </div>
  );
};

export default Banner1;
