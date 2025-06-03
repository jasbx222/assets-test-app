type RowObj = {
  name: string;
  tech: string[];
  date: string;
  progress: number;
};

const tableDataComplex: RowObj[] = [
  {
    name: 'طاولة طعام',
    tech: ['خشب', 'زجاج'],
    date: '12.يناير.2021',
    progress: 75.5,
  },
  {
    name: 'كرسي مكتب',
    tech: ['معدن', 'قماش'],
    date: '21.فبراير.2021',
    progress: 35.4,
  },
  {
    name: 'أريكة جلدية',
    tech: ['جلد', 'خشب'],
    date: '13.مارس.2021',
    progress: 25,
  },
  {
    name: 'خزانة ملابس',
    tech: ['خشب', 'معدن'],
    date: '24.يناير.2021',
    progress: 100,
  },
  {
    name: 'سجّاد غرفة المعيشة',
    tech: ['قطن', 'صوف'],
    date: '24.أكتوبر.2022',
    progress: 75.5,
  },
  {
    name: 'طاولة قهوة',
    tech: ['خشب', 'رخام'],
    date: '24.أكتوبر.2022',
    progress: 75.5,
  },
  {
    name: 'خزانة كتب',
    tech: ['خشب', 'زجاج'],
    date: '12.يناير.2021',
    progress: 75.5,
  },
  {
    name: 'سرير مزدوج',
    tech: ['خشب', 'قماش'],
    date: '21.فبراير.2021',
    progress: 35.4,
  },
  {
    name: 'كرسي قماش',
    tech: ['قماش', 'خشب'],
    date: '13.مارس.2021',
    progress: 25,
  },
  {
    name: 'طاولة جانبية',
    tech: ['خشب', 'زجاج'],
    date: '24.يناير.2021',
    progress: 100,
  },
  {
    name: 'طقم سفرة كامل',
    tech: ['خشب', 'معدن', 'قماش'],
    date: '24.أكتوبر.2022',
    progress: 75.5,
  },
];

export default tableDataComplex;
