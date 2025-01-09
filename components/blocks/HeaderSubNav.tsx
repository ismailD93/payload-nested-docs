'use client';

import {PageBlockBaseType} from '@/components/collections/PagesBlocksSwitch';
import {PageExtended} from '@/helpers/getPage';
import Image from 'next/image';
import {usePathname, useRouter} from 'next/navigation';
import {FC, Fragment} from 'react';
import SubNavItem from './SubNavItem';

type HeaderSubNavUnion = {
  subNavItems: PageExtended['subNavItems'];
} & PageBlockBaseType<'headerSubNav'>;

const HeaderSubNav: FC<HeaderSubNavUnion> = ({block, subNavItems}) => {
  const pathname = usePathname();
  const checkIsCurrentPath = (path: string): boolean => {
    return !!pathname.includes(path);
  };
  const foundItem = block.subNavLinks.find((item) => checkIsCurrentPath((item.link as PageExtended).slug));
  const slug = (foundItem?.link as PageExtended)?.slug;
  const router = useRouter();

  if (!block.title || !block.headerImage || typeof block.headerImage !== 'object') return null;

  return (
    <Fragment>
      <div className='select-me relative w-full h-full flex flex-col max-h-[400px] min-h-[250px] aspect-[1512/400]'>
        {!!block.headerImage?.largeUrl && (
          <Image
            fill
            src={block.headerImage.largeUrl}
            alt={[
              block.headerImage.description,
              block.headerImage.copyright ? `© ${block.headerImage.copyright}` : undefined,
            ]
              .filter((item) => !!item)
              .join(' ')}
            className='object-center object-cover'
          />
        )}
        <div className='absolute inset-0 z-[1] bg-black/60' />
        <div className='small-boxed flex flex-col flex-1 w-full items-center justify-center text-center text-white z-[2] pt-16'>
          <div className='text-subheadline mb-0.5 md:mb-2'>{block.subTitle}</div>
          <h1 className='text-h1'>{block.title}</h1>
        </div>
      </div>
      <div className='relative flex flex-col py-5 shadow-nav mb-fixed-90 max-xl:hidden'>
        <div className='boxed flex flex-row w-full h-full gap-x-5 justify-center'>
          {subNavItems.map((item, index) => {
            return <SubNavItem key={index} {...item} activeItem={slug} />;
          })}
        </div>
      </div>
      <div className='relative flex flex-col py-6 shadow-nav mb-14 xl:hidden'>
        <div className='small-boxed flex flex-row w-full h-full gap-x-5'>
          <div className='relative w-full flex flex-col'>
            <select
              value={pathname}
              className='text-subnav w-full cursor-pointer rounded-xl border h-14 px-4 border-black/10 bg-gray/40 appearance-none'
              onChange={(e) => router.push(e.target.value)}>
              {subNavItems.map((item, index) => (
                <option key={index} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
            <div className='absolute right-4 top-1/2 -translate-y-1/2'>{'<'}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HeaderSubNav;
