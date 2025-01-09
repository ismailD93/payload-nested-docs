'use client';

import {Footer as FooterType, Page} from '@/payload-types';
import Link from 'next/link';
import {FC} from 'react';

const Footer: FC<{footer: FooterType}> = ({footer}) => {
  return (
    <div className='relative bg-[#1f1e1e] text-white pt-9 pb-24 px-5 md:px-16'>
      <div className='flex boxed w-full flex-col md:flex-row justify-between gap-10'>
        <div className='flex flex-col'>
          <span className='font-bold'>{footer.address?.name}</span>
          <span>{footer.address?.street}</span>
          <span>{footer.address?.country}</span>
        </div>
        <div className='flex text-lg underline flex-col'>
          <Link href={`tel:${footer.address?.tel}`} target='_self' rel='noopener noreferrer'>
            {footer.address?.tel}
          </Link>
          <Link href={`mailto:${footer.address?.email}`} target='_self' rel='noopener noreferrer'>
            {footer.address?.email}
          </Link>
        </div>
        <div className='flex flex-col'>
          {footer.footerLinks?.map((item, index) => {
            if (typeof item.link !== 'object' || !item.link) return null;
            const link = (item.link.value as Page).slug;
            return (
              <Link key={index} href={link} className='hover:text-gray'>
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
