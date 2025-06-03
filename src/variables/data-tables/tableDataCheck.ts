type RowObj = {
  name: [string, boolean];
  progress: string;
  quantity: number;
  date: string;
  info: boolean;
};

const tableDataCheck: RowObj[] = [
  {
    name: ['طاولة طعام', true],
    quantity: 120,
    progress: '35%',
    date: '05 Jun 2023',
    info: false,
  },
  {
    name: ['كرسي مكتب', true],
    quantity: 85,
    progress: '50%',
    date: '12 Jul 2023',
    info: true,
  },
  {
    name: ['أريكة جلدية', true],
    quantity: 40,
    progress: '60%',
    date: '22 Aug 2023',
    info: true,
  },
  {
    name: ['خزانة ملابس', true],
    quantity: 25,
    progress: '80%',
    date: '15 Sep 2023',
    info: false,
  },
  {
    name: ['سجّاد غرفة المعيشة', true],
    quantity: 70,
    progress: '45%',
    date: '30 Oct 2023',
    info: true,
  },
  {
    name: ['طاولة قهوة', true],
    quantity: 95,
    progress: '30%',
    date: '08 Nov 2023',
    info: false,
  },
  {
    name: ['خزانة كتب', true],
    quantity: 55,
    progress: '65%',
    date: '20 Dec 2023',
    info: true,
  },
  {
    name: ['سرير مزدوج', true],
    quantity: 15,
    progress: '90%',
    date: '10 Feb 2024',
    info: false,
  },
  {
    name: ['كرسي قابل للتعديل', true],
    quantity: 100,
    progress: '40%',
    date: '28 Mar 2024',
    info: true,
  },
  {
    name: ['طاولة جانبية', true],
    quantity: 60,
    progress: '55%',
    date: '05 May 2024',
    info: true,
  },
];

export default tableDataCheck;
