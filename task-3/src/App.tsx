import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

import { useState } from 'react';

import { ProductList } from './components/ProductList';
import { ProductsXML } from './components/ProductsXML';

import Search from './components/Search';
import { useProducts, useProductsXml } from './common/queries';

function App() {
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);

  const productsResponse = useProducts({ minPrice });
  const productList = productsResponse.error ? (
    <div>failed to load</div>
  ) : productsResponse.isLoading ? (
    <div>loading...</div>
  ) : (
    productsResponse.data && (
      <ProductList products={productsResponse.data.products} />
    )
  );

  const totalsResponse = useProductsXml({ minPrice });
  const productsXML = totalsResponse.error ? (
    <div>failed to load</div>
  ) : totalsResponse.isLoading ? (
    <div>loading...</div>
  ) : (
    totalsResponse.xml && <ProductsXML xml={totalsResponse.xml} />
  );

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Assignment - Task 3 </h1>

      <Search onChange={(value) => setMinPrice(value)} />

      <div className="layout">
        <div className="card">{productList}</div>
        <div className="card">{productsXML}</div>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
