'use client';
/* eslint-disable */
import rtl from 'stylis-plugin-rtl';
import { isWindowAvailable } from 'utils/navigation';
// NB: A unique `key` is important for it to work!
let options = {
  rtl: { key: 'css-ar', stylisPlugins: [rtl] },
  ltr: { key: 'css-en' },
};
export function RtlProvider({ children }: any) {
  const dir =
    isWindowAvailable() && document.documentElement.dir == 'ar' ? 'rtl' : 'ltr';

  return < >{children}</>;
}
