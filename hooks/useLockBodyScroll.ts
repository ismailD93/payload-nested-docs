'use client';

import {useEffect, useState} from 'react';

const useLockBodyScroll = (locked: boolean, scrollableClass?: string) => {
  //this is the default width in firefox
  const querySelectorClass = scrollableClass
    ? scrollableClass.startsWith('.')
      ? scrollableClass
      : `.${scrollableClass}`
    : 'html';
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(15);

  useEffect(() => {
    const enable = () => {
      const element = window.document.querySelector(querySelectorClass);
      if (!element || !(element instanceof HTMLElement)) return;
      element.style.removeProperty('margin');
      element.style.overflow = 'auto';

      const correctionDivs = window.document.querySelectorAll('.correction');
      correctionDivs?.forEach((item) => {
        if (item instanceof HTMLDivElement) {
          const right = getInsetRight(item);
          const changed = item.getAttribute('changed') === 'true';

          if (right && right >= 0 && changed) {
            item.style.right = `${right - scrollbarWidth}px`;
            item.removeAttribute('changed');
          }
        }
      });
    };

    // Prevent scrolling
    const disable = () => {
      const element = window.document.querySelector(querySelectorClass);
      if (!element || !(element instanceof HTMLElement)) return;
      const calculatedScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const correctionDivs = window.document.querySelectorAll('.correction');
      correctionDivs?.forEach((item) => {
        if (item instanceof HTMLDivElement) {
          const right = getInsetRight(item);

          if (right !== undefined) {
            item.style.right = `${right + calculatedScrollbarWidth}px`;
            item.setAttribute('changed', 'true');
          }
        }
      });

      element.style.marginRight = `${calculatedScrollbarWidth}px`;
      element.style.overflow = 'hidden';

      setScrollbarWidth(calculatedScrollbarWidth);
    };

    const getInsetRight = (element: HTMLDivElement) => {
      const computedStyle = window.getComputedStyle(element);
      const right = computedStyle.getPropertyValue('right').replace('px', '');
      const parsedRight = Number(right);

      return isNaN(parsedRight) ? undefined : parsedRight;
    };

    if (locked) {
      disable();
    } else {
      enable();
    }

    // Re-enable scrolling when component unmounts
    return () => {
      enable();
    };
  }, [locked]);
};

export default useLockBodyScroll;
