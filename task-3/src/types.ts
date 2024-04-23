export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export type ProductResponse = {
  products: Product[];
  total: {
    totalPrice: number;
    totalPricePerProduct: {
      totalPrice: number;
      id: number;
      name: string;
    }[];
  };
};
