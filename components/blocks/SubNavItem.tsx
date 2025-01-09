'use client';

import classNames from 'classnames';
import Link from 'next/link';
import {FC} from 'react';

export interface SubNavItemProps {
  title: string;
  slug: string;
  activeItem: string;
}

const SubNavItem: FC<SubNavItemProps> = ({title, slug, activeItem}) => {
  if (!slug) return null;
  return (
    <div className='flex flex-col items-center justify-center text-black border-r last:border-r-0 border-gray text-subnav pr-5'>
      <Link href={slug} rel='noopener noreferrer'>
        <div className='relative'>
          {title}
          {activeItem === slug && <div className={classNames('absolute -bottom-5 h-[3px] inset-x-0', {})} />}
        </div>
      </Link>
    </div>
  );
};

export default SubNavItem;
