import Link from 'next/link';
import {FC} from 'react';

const InternalLink: FC<{label: string; link: string}> = ({label, link}) => {
  return (
    <Link href={link} rel='noopener noreferrer' className='text-link'>
      {label}
    </Link>
  );
};

export default InternalLink;
