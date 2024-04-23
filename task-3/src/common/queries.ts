import useSWR from 'swr';
import queryString from 'query-string';

import { fetcher, fetchText } from '../helpers';

import type { ProductResponse } from '../types';

export type UseProductsOpts = {
  minPrice?: number;
};

// NOTE: these are identical but serve two completely different APIs.
export type UseTotalsOpts = UseProductsOpts;

/**
 * Collection of functions to get the SWR key of each page,
 * its return value will be accepted by `fetcher`.
 * If `null` is returned, the request of that page won't start.
 */
export const queryKeys = {
  products: ({ minPrice }: UseProductsOpts = { minPrice: 0 }) => {
    const searchParams = queryString.stringify(
      { minPrice },
      { skipNull: true, skipEmptyString: true }
    );
    return `/products?${searchParams}`;
  },
  totals: ({ minPrice }: UseTotalsOpts = { minPrice: 0 }) => {
    const searchParams = queryString.stringify(
      { minPrice },
      { skipNull: true, skipEmptyString: true }
    );
    return `/totals?${searchParams}`;
  },
} as const;

export function useProducts(opts?: UseProductsOpts) {
  return useSWR<ProductResponse>(queryKeys.products(opts), fetcher);
}

export function useProductsXml(opts?: UseTotalsOpts) {
  const { data, error, isLoading } = useSWR(queryKeys.totals(opts), fetchText);

  return {
    xml: data,
    isLoading,
    error,
  };
}
