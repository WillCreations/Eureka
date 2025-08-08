import ProductPage from "@/app/components/ProductPage";
import React from "react";
import { fetchCategory } from "../(Engine)/actions/fetchCategory";
import { convertDbObj } from "../(Engine)/utils/utility";
import { checkLike } from "../(Engine)/actions/checkLike";
import { unlikeProduct } from "../(Engine)/actions/unlikeProduct";
import { fetchProductLikes } from "../(Engine)/actions/fetchProductLikes";
import { likeProduct } from "../(Engine)/actions/likeProduct";
import { updateStock } from "../(Engine)/actions/updateStock"

export const metadata = {
  title: "E-commerce Shop",
};
const actions = {
  checkLike,
  unlikeProduct,
  likeProduct,
  fetchProductLikes,
};
const Products = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const result = await fetchCategory();
  const cateee = convertDbObj(result);

  return <ProductPage q={q} category={cateee} actions={actions} updateStock={updateStock}/>;
};

export default Products;
