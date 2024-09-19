import { useEffect, useRef, useState } from "react";
import Product from "./Product";

const productPerPage = 10;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasmore, setHasmore] = useState(true);
  const loaderRef = useRef(null);
  // console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        `https://dummyjson.com/products?limit=${productPerPage}&skip=${
          page * productPerPage
        }`
      );
      const data = await response.json();
      if(data.products.length === 0){
        setHasmore(false);

      } else{
        setProducts(prevProducts => [...prevProducts, ...data.products]);
        setPage(prevPage => prevPage + 1);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];

      if (loaderItem.isIntersecting && hasmore) {
        fetchProducts();
      }
    };
    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, [hasmore, page]);

  return (
    <div className="w-full ">
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Product 
          className="w-full"
          key={product.id}
          title={product.title}
          price={product.price}
          description={product.description}
          />
        ))}
      </div>

     { hasmore && <div ref={loaderRef}>Loading more products..</div>}
    </div>
  );
};

export default ProductList;
