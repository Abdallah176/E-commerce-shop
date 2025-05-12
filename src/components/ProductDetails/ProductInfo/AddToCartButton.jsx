export default function AddToCartButton({ productData, size, addToCart }) {
    return (
      <button
        onClick={() => addToCart(productData.id, size, productData.name)}
        className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition duration-200"
      >
        ADD TO CART
      </button>
    );
  }
  