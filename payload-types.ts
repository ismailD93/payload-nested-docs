/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  auth: {
    users: UserAuthOperations;
  };
  collections: {
    users: User;
    pages: Page;
    images: Image;
    blogPosts: BlogPost;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    users: UsersSelect<false> | UsersSelect<true>;
    pages: PagesSelect<false> | PagesSelect<true>;
    images: ImagesSelect<false> | ImagesSelect<true>;
    blogPosts: BlogPostsSelect<false> | BlogPostsSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    footer: Footer;
    navigation: Navigation;
  };
  globalsSelect: {
    footer: FooterSelect<false> | FooterSelect<true>;
    navigation: NavigationSelect<false> | NavigationSelect<true>;
  };
  locale: null;
  user: User & {
    collection: 'users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface UserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  slug: string;
  author: string;
  blocks: (
    | {
        content?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'textBlock';
      }
    | {
        subTitle?: string | null;
        title: string;
        headerImage: string | Image;
        subNavLinks: {
          name: string;
          link: string | Page;
          id?: string | null;
          blockName?: string | null;
          blockType: 'subNavItem';
        }[];
        id?: string | null;
        blockName?: string | null;
        blockType: 'headerSubNav';
      }
    | {
        title?: string | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'blogList';
      }
  )[];
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: (string | null) | Image;
  };
  /**
   * Sortierung der Pages in der Sub-Navigation. Umso kleiner die Zahl, desto weiter vorne.
   */
  sortOrder?: string | null;
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "images".
 */
export interface Image {
  id: string;
  cloudinary:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  thumbnailUrl?: string | null;
  mediumUrl?: string | null;
  largeUrl?: string | null;
  width?: number | null;
  height?: number | null;
  description?: string | null;
  copyright?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogPosts".
 */
export interface BlogPost {
  id: string;
  title: string;
  slug?: string | null;
  blocks?:
    | {
        content?:
          | {
              [k: string]: unknown;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'textBlock';
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'users';
        value: string | User;
      } | null)
    | ({
        relationTo: 'pages';
        value: string | Page;
      } | null)
    | ({
        relationTo: 'images';
        value: string | Image;
      } | null)
    | ({
        relationTo: 'blogPosts';
        value: string | BlogPost;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users_select".
 */
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages_select".
 */
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  author?: T;
  blocks?:
    | T
    | {
        textBlock?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
        headerSubNav?:
          | T
          | {
              subTitle?: T;
              title?: T;
              headerImage?: T;
              subNavLinks?:
                | T
                | {
                    subNavItem?:
                      | T
                      | {
                          name?: T;
                          link?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
        blogList?:
          | T
          | {
              title?: T;
              id?: T;
              blockName?: T;
            };
      };
  meta?:
    | T
    | {
        title?: T;
        description?: T;
        image?: T;
      };
  sortOrder?: T;
  parent?: T;
  breadcrumbs?:
    | T
    | {
        doc?: T;
        url?: T;
        label?: T;
        id?: T;
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "images_select".
 */
export interface ImagesSelect<T extends boolean = true> {
  cloudinary?: T;
  thumbnailUrl?: T;
  mediumUrl?: T;
  largeUrl?: T;
  width?: T;
  height?: T;
  description?: T;
  copyright?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogPosts_select".
 */
export interface BlogPostsSelect<T extends boolean = true> {
  title?: T;
  slug?: T;
  blocks?:
    | T
    | {
        textBlock?:
          | T
          | {
              content?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  address?: {
    name?: string | null;
    street?: string | null;
    country?: string | null;
    tel?: string | null;
    email?: string | null;
  };
  footerLinks?:
    | {
        label: string;
        link:
          | {
              relationTo: 'pages';
              value: string | Page;
            }
          | {
              relationTo: 'blogPosts';
              value: string | BlogPost;
            };
        id?: string | null;
        blockName?: string | null;
        blockType: 'internalLink';
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation".
 */
export interface Navigation {
  id: string;
  links: {
    label: string;
    link?: (string | null) | Page;
    subNavLinks?:
      | (
          | {
              label: string;
              link:
                | {
                    relationTo: 'pages';
                    value: string | Page;
                  }
                | {
                    relationTo: 'blogPosts';
                    value: string | BlogPost;
                  };
              id?: string | null;
              blockName?: string | null;
              blockType: 'internalLink';
            }
          | {
              label: string;
              link: string;
              id?: string | null;
              blockName?: string | null;
              blockType: 'externalLink';
            }
        )[]
      | null;
    id?: string | null;
    blockName?: string | null;
    blockType: 'navLinks';
  }[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer_select".
 */
export interface FooterSelect<T extends boolean = true> {
  address?:
    | T
    | {
        name?: T;
        street?: T;
        country?: T;
        tel?: T;
        email?: T;
      };
  footerLinks?:
    | T
    | {
        internalLink?:
          | T
          | {
              label?: T;
              link?: T;
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "navigation_select".
 */
export interface NavigationSelect<T extends boolean = true> {
  links?:
    | T
    | {
        navLinks?:
          | T
          | {
              label?: T;
              link?: T;
              subNavLinks?:
                | T
                | {
                    internalLink?:
                      | T
                      | {
                          label?: T;
                          link?: T;
                          id?: T;
                          blockName?: T;
                        };
                    externalLink?:
                      | T
                      | {
                          label?: T;
                          link?: T;
                          id?: T;
                          blockName?: T;
                        };
                  };
              id?: T;
              blockName?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}