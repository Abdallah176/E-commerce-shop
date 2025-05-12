import ProductTitle from "./ProductTitle";
import ProductSizeSelector from "./ProductSizeSelector";
import ProductSizeChart from "./ProductSizeChart";
import AddToCartButton from "./AddToCartButton";
import ProductBadges from "./ProductBadges";

export default function ProductInfo({ productData, size, setSize, currency, addToCart }) {
  return (
    <div className="flex-1 space-y-6">
      <ProductTitle productData={productData} currency={currency} />
      <p className="text-gray-600 text-sm md:w-4/5">{productData.description}</p>
      <ProductSizeSelector productData={productData} size={size} setSize={setSize} />
      <ProductSizeChart />
      <AddToCartButton productData={productData} size={size} addToCart={addToCart} />
      <ProductBadges />
    </div>
  );
}
