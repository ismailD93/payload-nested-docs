import {Page} from '@/payload-types';
import {FC, Fragment} from 'react';

interface PageProps {
  page: Page;
}

const PLPage: FC<PageProps> = () => {
  return (
    <Fragment>
      <div className='small-boxed h-[100svh]'></div>
    </Fragment>
  );
};

export default PLPage;
