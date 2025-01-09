'use client';

import {FC} from 'react';
import {PageBlockBaseTypeUnionBlogs, PageBlockEnrichedType} from '../utils/types';
import Link from 'next/link';

const BlogsOverview: FC<PageBlockEnrichedType<PageBlockBaseTypeUnionBlogs>> = ({block}) => {
  return (
    <div>
      <span className='text-2xl font-bold'>{block.title}</span>
      <div className='mt-5 grid grid-cols-2 gap-5'>
        {block.blogs?.map((item, index) => {
          return (
            <Link href={`${item.slug}`} className='shadow-lg rounded-md p-10' key={index}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BlogsOverview;
