import {useCallback, useEffect, useState} from 'react';
type ListenerFn = () => any;

const getScrollTop = (target?: HTMLElement) => {
  if (target) return target.scrollTop;
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.body.scrollTop ||
    (document.documentElement && document.documentElement.scrollTop) ||
    0
  );
};

const getScrollLeft = (target?: HTMLElement) => {
  if (target) return target.scrollLeft;
  return (
    window.scrollX ||
    window.pageXOffset ||
    document.body.scrollLeft ||
    (document.documentElement && document.documentElement.scrollLeft) ||
    0
  );
};

const isBrowser = () => {
  return typeof window === 'object';
};

const addScrollListener = (listener: ListenerFn, target: HTMLElement | Document = document) => {
  return target.addEventListener('scroll', listener);
};

const removeScrollListener = (listener: ListenerFn, target: HTMLElement | Document = document) => {
  return target.removeEventListener('scroll', listener);
};

export type ScrollDirection = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | null;

export interface ScrollDirectionHookResult {
  isScrollingX: boolean;
  isScrollingY: boolean;
  isScrollingUp: boolean;
  isScrollingDown: boolean;
  isScrollingLeft: boolean;
  isScrollingRight: boolean;
  lastScrollX: number;
  lastScrollY: number;
  scrollDirection: ScrollDirection;
  // eslint-disable-next-line no-unused-vars
  scrollTargetRef: (node: HTMLElement) => void;
}

const useScrollDirection = (target?: HTMLElement): ScrollDirectionHookResult => {
  const [lastScrollX, setLastScrollX] = useState<number>(0);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [targetFromApi, setTargetFromApi] = useState<HTMLElement | undefined>();
  const [targetFromProps, setTargetFromProps] = useState<HTMLElement | undefined>();
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const targetToUse = targetFromProps || targetFromApi;

  const isScrollingX = scrollDirection === 'LEFT' || scrollDirection === 'RIGHT';
  const isScrollingY = scrollDirection === 'UP' || scrollDirection === 'DOWN';
  const isScrollingUp = scrollDirection === 'UP';
  const isScrollingDown = scrollDirection === 'DOWN';
  const isScrollingLeft = scrollDirection === 'LEFT';
  const isScrollingRight = scrollDirection === 'RIGHT';

  const scrollTargetRef = useCallback((node: HTMLElement) => {
    setTargetFromApi(node);
  }, []);

  useEffect(() => {
    setTargetFromProps(target);
  }, [target]);

  useEffect(() => {
    if (isBrowser()) {
      let lastScrollTop = getScrollTop(targetToUse);
      let lastScrollLeft = getScrollLeft(targetToUse);

      setLastScrollY(lastScrollTop);
      setLastScrollX(lastScrollLeft);

      const handleScroll = () => {
        // Set vertical direction while scrolling
        const scrollTop = getScrollTop(targetToUse);
        if (scrollTop > lastScrollTop) {
          setScrollDirection('DOWN');
        } else if (scrollTop < lastScrollTop) {
          setScrollDirection('UP');
        }
        lastScrollTop = scrollTop;
        setLastScrollY(lastScrollTop);

        // Set horizontal scroll direction
        const scrollLeft = getScrollLeft(targetToUse);
        if (scrollLeft > lastScrollLeft) {
          setScrollDirection('RIGHT');
        } else if (scrollLeft < lastScrollLeft) {
          setScrollDirection('LEFT');
        }
        lastScrollLeft = scrollLeft;
        setLastScrollX(lastScrollLeft);
      };

      addScrollListener(handleScroll, targetToUse);
      return () => removeScrollListener(handleScroll, targetToUse);
    }
  }, [targetToUse]);

  return {
    isScrollingX,
    isScrollingY,
    isScrollingUp,
    isScrollingDown,
    isScrollingLeft,
    isScrollingRight,
    lastScrollX,
    lastScrollY,
    scrollDirection,
    scrollTargetRef,
  };
};

export default useScrollDirection;
