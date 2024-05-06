import { useEffect, useRef } from 'react';

const useEventListener = (
  eventName: string,
  handler: (...args: any[]) => void,
  element = document,
  options = {},
) => {
  const savedHandler = useRef<any>(null);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event: any) => savedHandler.current(event);
    if (element && element.addEventListener) {
      element.addEventListener(eventName, eventListener, options);
    }

    return () => {
      if (element) {
        element.removeEventListener(eventName, eventListener, options);
      }
    };
  }, [eventName, element, options]);
};

export default useEventListener;
