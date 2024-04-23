import { delay, http, HttpResponse } from 'msw';
import { toXML } from 'jstoxml';

import { names } from './names.ts';
import { randomIntFromInterval } from '../utils.ts';

import type { Product } from '../types.ts';

// generate a random list of product with appropriate library
const products: Product[] = names.map((name, index) => ({
  id: index,
  name: name,
  price: parseFloat((Math.random() * 40).toFixed(2)),
  quantity: randomIntFromInterval(1, 20),
}));

// TODO la soglia di prezzo filtra sul prezzo del prodotto o sul prezzo totale?
function computeTotals(minPrice: number = 0) {
  const detailedCart = products
    .filter(({ quantity }) => quantity > 0)
    .filter(({ price }) => price > minPrice);

  const totalPricePerProduct = detailedCart.map(
    ({ price, quantity, ...rest }) => ({
      ...rest,
      totalPrice: price * quantity,
    })
  );
  const totalPrice = detailedCart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  return {
    totalPrice,
    totalPricePerProduct,
  };
}

export const handlers = [
  http.get('/products', async ({ request }) => {
    await delay();
    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);

    // Read the "minPrice" URL query parameter using the "URLSearchParams" API.
    // Given "/product?minPrice=1", will consider only products with "price"
    // greater than "1".
    const minPriceQuery = url.searchParams.get('minPrice');
    const minPrice = minPriceQuery ? parseFloat(minPriceQuery) : 0;

    const filteredProducts = products.filter(
      (product) => product.price >= minPrice
    );

    return HttpResponse.json({
      products: filteredProducts,
      total: computeTotals(minPrice),
    });
  }),
  http.get('/totals', async ({ request }) => {
    await delay();

    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);

    // Read the "minPrice" URL query parameter using the "URLSearchParams" API.
    // Given "/product?minPrice=1", will consider only products with "price"
    // greater than "1".
    const minPriceQuery = url.searchParams.get('minPrice');
    const minPrice = minPriceQuery ? parseFloat(minPriceQuery) : 0;

    const { totalPrice, totalPricePerProduct } = computeTotals(minPrice);

    const xmlOptions = {
      header: false,
      indent: '  ',
    };
    return HttpResponse.xml(
      toXML(
        {
          products: [
            ...totalPricePerProduct.map((product) => ({ product })),
            { totalPrice },
          ],
        },
        xmlOptions
      )
    );
  }),
];
