import { NotepadText } from 'lucide-react';
import React from 'react';
import { BsBookHalf } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';

// Admin Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
  MdAssignmentReturn,
} from 'react-icons/md';

const routes = [
  {
    name: 'الرئيسية',
    layout: '/admin',
    path: 'default',
    // icon: <MdHome className="h-6 w-6" />,
  },
  {
    name:'ادارة الموظفين',
    layout: '/admin',
    path: 'empolyee',
    // icon: <FaUser className="h-6 w-6" />,

    secondary: true,
  },
  {
    name: 'الاصول ',
    layout: '/admin',
    // icon: <MdBarChart className="h-6 w-6" />,
    path: 'data-assets',
  },
  {
    name:'ادارة التقارير ',
    layout: '/admin',
    path: 'reports',
    // icon: <NotepadText/>
  },
  {
    name:'ادارة الاصول ',
    layout: '/admin',
    path: 'manage_asset',
    // icon: <MdAssignmentReturn/>/
  },
  {
    name:'ادارة الشعب ',
    layout: '/admin',
    path: 'divisions',
    // icon: <MdAssignmentReturn/>/
  },
  // {
  //   name: 'Sign In',
  //   layout: '/auth',
  //   path: 'sign-in',
  //   icon: <MdLock className="h-6 w-6" />,
  // },
  // {
  //   name: 'الصفحة الرئيسية RTL',
  //   layout: '/rtl',
  //   path: 'rtl-default',
  //   icon: <MdHome className="h-6 w-6" />,
  // },
];
export default routes;
