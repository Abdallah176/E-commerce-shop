import { assets } from "../../../assets/assets";

export default function ProductTitle({ productData, currency }) {
  return (
    <>
      <h1 className="font-semibold text-3xl text-gray-800">{productData.name}</h1>
      <div className="flex items-center gap-1 text-yellow-500">
        {[...Array(4)].map((_, i) => (
          <img src={assets.star_icon} key={i} alt="" className="w-4" />
        ))}
        <img src={assets.star_dull_icon} alt="" className="w-4" />
        <p className="pl-2 text-gray-600 text-sm">(5 reviews)</p>
      </div>
      <p className="text-4xl font-bold text-gray-900">
        {currency}{productData.price}
      </p>
    </>
  );
}
