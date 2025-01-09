'use client';

import {FC, useRef, useState} from 'react';
import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import {Navigation, Page} from '@/payload-types';
import classNames from 'classnames';
import Link from 'next/link';

interface NavigationProps {
  nav: Navigation;
}

const Nav: FC<NavigationProps> = ({nav}) => {
  const [open, setOpen] = useState<boolean | undefined>();
  const [showSubNav, setShowSubNav] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  useLockBodyScroll(!!open);

  const navLinks = nav?.links;
  const subNav = nav?.links.filter((item) => !!item.subNavLinks?.length).map((item) => item.subNavLinks)[0];

  return (
    <div
      onMouseLeave={() => setShowSubNav(false)}
      ref={ref}
      className='w-full flex-col z-10 text-white fixed transition-[top] duration-700 flex justify-center items-center'>
      <div className='w-full bg-[#1f1e1e] flex justify-center px-5 py-4 md:px-16'>
        <div className='flex w-full flex-row justify-between items-center'>
          <Link
            href={'/'}
            className='my-2.5 md:my-[15px]'
            onClick={() => {
              setOpen(false);
            }}>
            LOGO
          </Link>
          <div className='flex gap-x-14 text-16 font-bold uppercase'>
            <div className='flex gap-x-14'>
              {navLinks?.map((item, index) => {
                const link = (item.link as Page)?.slug;
                const subnav = !!item.subNavLinks?.length;

                return (
                  <Link
                    onMouseEnter={() => {
                      if (!subnav) {
                        setShowSubNav(false);
                      } else {
                        setShowSubNav(true);
                      }
                    }}
                    key={`${index}_${link}`}
                    href={link}
                    className='select-none cursor-pointer h-full flex items-center'
                    onClick={() => {
                      setOpen(false);
                    }}>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {showSubNav && (
        <div className='w-full'>
          <SubNavigation
            linkClicked={() => {
              setOpen(false);
            }}
            links={subNav}
          />
        </div>
      )}
    </div>
  );
};

export default Nav;

interface SubNavigationProps {
  links: Navigation['links'][number]['subNavLinks'];
  linkClicked?: () => void;
}

const SubNavigation: FC<SubNavigationProps> = ({links, linkClicked}) => {
  return (
    <div className='bg-white flex text-black justify-center shadow-xl w-full py-[22px] relative'>
      <div className='flex flex-wrap gap-y-7'>
        {links?.map((item, index) => {
          let link = '';
          let external = false;
          if (!item.link) return null;
          if (typeof item.link === 'string') {
            link = item.link;
            external = true;
          }
          if (typeof item.link === 'object') {
            link = (item.link.value as Page).slug;
          }

          return (
            <div key={index} className='flex'>
              <Link
                target={external ? '_blank' : '_self'}
                href={link}
                onClick={() => linkClicked?.()}
                className='text-sm px-5'>
                {item.label}
              </Link>
              <div
                className={classNames('border-r mx-2 border-black/30', {'border-none': index === links.length - 1})}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
