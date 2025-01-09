import Link from 'next/link';
import {FC} from 'react';

const ExternalLink: FC<{label: string; link: string}> = ({label, link}) => {
  return (
    <Link href={link} rel='noopener noreferrer' target='_blank' className='text-menu max-w-max pb-7 hover:text-primary'>
      {label}
    </Link>
  );
};

export default ExternalLink;
