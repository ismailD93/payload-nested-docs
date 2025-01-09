import Link from 'next/link';
import {FC} from 'react';

const LanguageSelect: FC<{label: string; link: string}> = ({label, link}) => {
  return (
    <Link
      href={link}
      rel='noopener noreferrer'
      className='flex flex-col items-center size-8 md:size-[3.25rem] rounded-full border-2 border-white hover:border-gray text-language hover:text-gray cursor-pointer'>
      {label}
    </Link>
  );
};

export default LanguageSelect;
