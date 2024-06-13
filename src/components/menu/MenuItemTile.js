import Image from "next/image";
import AddToCartButton from "./AddToCartButton";

export default function MenuItemTile({ onAddToCart, ...menuItem }) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div className="bg-gray-200 flex items-end justify-center p-4 rounded-lg text-center group hover:bg-white hover:shadow-2xl hover:shadow-black/25 transition-all">
      <div>
        <div className="text-center">
          <Image
            src={image}
            className="max-h-24 block mx-auto"
            width={"100"}
            height={"100"}
            alt={"pizza"}
          />
        </div>
        <h4 className="font-semibold my-3 text-xl line-clamp-2">{name}</h4>
        <p className="text-gray-500 text-sm line-clamp-2">{description}</p>

        <AddToCartButton
          hasSizesOrExtras={hasSizesOrExtras}
          onClick={onAddToCart}
          basePrice={basePrice}
          image={image}
        />
      </div>
    </div>
  );
}
