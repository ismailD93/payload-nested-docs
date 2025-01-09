'use client';

import {usePathname} from 'next/navigation';
import {FC} from 'react';

const TopSpace: FC = () => {
  const pathname = usePathname();

  return <div className='h-24 md:h-44' />;
};
export default TopSpace;
