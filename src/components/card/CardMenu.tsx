import React from 'react';
import Dropdown from 'components/dropdown';
import { AiOutlineUser } from 'react-icons/ai';
import { BsThreeDots } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { AiOutlineShop } from 'react-icons/ai';
import { TiLightbulb } from 'react-icons/ti';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdNote } from 'react-icons/md';

function CardMenu(props: { transparent?: boolean; vertical?: boolean }) {
  const { transparent, vertical } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? 'bg-none text-white hover:bg-none active:bg-none'
              : vertical
              ? 'bg-none text-navy-700 dark:text-white'
              : 'bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10'
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          {vertical ? (
            <p className="text-[24px] hover:cursor-pointer">
              <BsThreeDotsVertical />
            </p>
          ) : (
            <BsThreeDots className="h-6 w-6" />
          )}
        </button>
      }
      animation={'origin-top-left transition-all duration-300 ease-in-out'}
      classNames={`${transparent ? 'top-8' : 'top-11'} left-0 w-max`}
    >
      <div className="z-50 w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        <p className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium">
          <span>
            <AiOutlineUser />
          </span>
        قسم المالية
        </p>
        <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <AiOutlineShop />
          </span>
          قسم المبيعات
        </p>
        <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <TiLightbulb />
          </span>
    قسم التسويق
        </p>
        <p className="hover:text-black mt-2 flex cursor-pointer items-center gap-2 pt-1 text-gray-600 hover:font-medium">
          <span>
            <MdNote />
          </span>
   قسم الشؤون الإدارية
        </p>
      </div>
    </Dropdown>
  );
}

export default CardMenu;
