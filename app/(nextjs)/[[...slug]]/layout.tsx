import TopSpace from '@/components/generic/TopSpace';
import Footer from '@/components/globals/Footer';
import Navigation from '@/components/globals/Navigation';
import {getFooter} from '@/helpers/getFooter';
import {getNavigation} from '@/helpers/getNavigation';

import {FC, ReactNode} from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = async (props) => {
  const footer = await getFooter();
  const navigation = await getNavigation();
  return (
    <>
      <TopSpace />
      {navigation && <Navigation nav={navigation} />}
      <div className='flex flex-col flex-1 px-5 md:px-16'>{props.children}</div>
      {footer && <Footer footer={footer} />}
    </>
  );
};

export default Layout;
