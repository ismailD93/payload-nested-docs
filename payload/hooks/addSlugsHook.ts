import {slugify} from '@/helpers/slugify';
import type {CollectionBeforeValidateHook} from 'payload';

export const addSlugsHook: CollectionBeforeValidateHook = async ({
  data, // incoming data to update or create with
  req, // full express request
}) => {
  if (!data?.title) {
    return;
  }
  let slug = `/${slugify(data.title)}`;
  if (data?.title === 'Startseite') {
    slug = '/';
  }
  if (data?.title === 'Startpage') {
    slug = '/';
  }
  if (data?.title === 'Pagina iniziale') {
    slug = '/';
  }
  if (data?.parent) {
    const parent = await req.payload.findByID({
      collection: 'pages',
      id: data?.parent,
    });
    slug = `${parent ? parent.slug : ''}/${slugify(data.title)}`;
  }
  data.slug = slug;

  return data;
};
