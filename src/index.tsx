import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

type Fn<ARGS extends any[], R> = (...args: ARGS) => R;
const useEff = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * @see https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 */
export const useEvent = <A extends any[], R>(fn: Fn<A, R>): Fn<A, R> => {
  const ref = useRef<Fn<A, R>>(fn);
  useEff(() => {
    ref.current = fn;
  });

  return useMemo(
    () =>
      (...args: A): R => {
        const { current } = ref;
        return current(...args);
      },
    []
  );
};



export const useAsyncEvent = <Func extends (...args: any[]) => Promise<any>>(
  action: Func
): [Func, boolean, unknown] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | unknown>(null);

  // @ts-expect-error Func
  const act: Func = useEvent(async (...args) => {
    let res;
        setLoading(true);
    try {
      res = await action(...args);
    } catch (error) {
      setError(error);
    }

    setLoading(false);
    return res;
  });

  return useMemo(() => [act, loading, error], [act, error, loading]);
};
