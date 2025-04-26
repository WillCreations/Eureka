import ProductPage from "@/app/components/ProductPage"
import React from "react"




export const metadata = {
  title: "E-commerce Shop"
}

const Products = ({ searchParams }) => {
  const q = searchParams?.q || "";
  
  return (
    <ProductPage q={q} />
  );
};

export default Products;
