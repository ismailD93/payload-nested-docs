'use client';

import useLockBodyScroll from '@/hooks/useLockBodyScroll';
import {AnimatePresence, motion} from 'framer-motion';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {LinkType} from '../utils/types';
import {FC} from 'react';

export interface MenuComponentProps {
  onClose: () => void;
  open: boolean;
  links: LinkType[];
}

const MenuModal: FC<MenuComponentProps> = ({onClose, open, links}) => {
  useLockBodyScroll(!!open);
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{y: 1000}}
          animate={{y: 85}}
          exit={{y: 1000}}
          transition={{duration: 0.6}}
          className='fixed right-0 z-50 select-none inset-y-0 w-full bg-primary overflow-y-scroll no-scrollbar'>
          <div className='flex flex-col small-boxed w-full text-white py-28 h-[calc(100%-85px)]'>
            <div className='flex flex-col'>
              {links?.map((item, index) => {
                const link = typeof item.link !== 'string' ? item.link.slug : item.link;

                return (
                  <Link
                    key={index}
                    href={link}
                    className='hover:text-gray text-nav max-w-max border-b-2 border-white first:border-t-2 min-w-full'>
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className='flex-1' />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default MenuModal;
