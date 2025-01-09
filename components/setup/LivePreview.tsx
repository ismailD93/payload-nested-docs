'use client';

import {NEXT_PUBLIC_SERVER_URL} from '@/constants';
import {useLivePreview} from '@payloadcms/live-preview-react';
import {Fragment, ReactNode} from 'react';

const LivePreview = <T,>(props: {children: (props: {data: T; isLoading: boolean}) => ReactNode; initialData: T}) => {
  const {data, isLoading} = useLivePreview<T>({
    initialData: props.initialData,
    serverURL: NEXT_PUBLIC_SERVER_URL,
    apiRoute: '/api',
    depth: 1,
  });

  return <Fragment>{props.children({data, isLoading})}</Fragment>;
};

export default LivePreview;
