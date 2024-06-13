import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Cancel from "../icons/Cancel";
import FlyingButton from "react-flying-item";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;

    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);
    toast.success("Item added to cart 🎊");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowPopup(false);
  }

  function handleExtraIngredientClick(e, extraIngredient) {
    const { checked } = e.target;

    if (checked) {
      setSelectedExtras((prev) => [...prev, extraIngredient]);
    } else {
      setSelectedExtras((prev) =>
        prev.filter((item) => item.name !== extraIngredient.name)
      );
    }
  }

  let finalPrice = basePrice;

  if (selectedSize) finalPrice += selectedSize.price;

  if (selectedExtras.length > 0) {
    selectedExtras.forEach((extra) => {
      finalPrice += extra.price;
    });
  }

  return (
    <>
      {showPopup && (
        <div
          className="fixed inset-0 text-center bg-black/80 flex items-center justify-center"
          onClick={() => setShowPopup(false)}
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-2 my-4 rounded-lg max-w-md  "
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: `calc(100vh - 95px)` }}
            >
              <Image
                src={image}
                width={300}
                height={200}
                className="mx-auto"
                alt={name}
              />
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">
                {description}
              </p>

              {sizes?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-gray-700 mb-2">Pick Your Size:</h3>

                  <div className="bg-gray-100 p-2 rounded-md">
                    {sizes.map((size, index) => (
                      <label
                        className="flex items-center cursor-pointer bg-gray-200 hover:bg-gray-300 gap-2 p-4 border rounded-md mb-1"
                        key={index}
                      >
                        <input
                          type="radio"
                          checked={selectedSize?.name === size.name}
                          onChange={() => setSelectedSize(size)}
                          name="size"
                        />
                        {size.name} ${basePrice + size.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {extraIngredientPrices?.length > 0 && (
                <div className="py-2">
                  <h3 className="text-gray-700 mb-2">Any Extras?</h3>

                  <div className="bg-gray-100 p-2 rounded-md">
                    {extraIngredientPrices.map((extraIngredient, index) => (
                      <label
                        className="flex items-center cursor-pointer bg-gray-200 hover:bg-gray-300 gap-2 p-4 border rounded-md mb-1"
                        key={index}
                      >
                        <input
                          type="checkbox"
                          onChange={(ev) =>
                            handleExtraIngredientClick(ev, extraIngredient)
                          }
                          checked={selectedExtras
                            .map((e) => e._id)
                            .includes(extraIngredient._id)}
                          name={extraIngredient.name}
                        />
                        {extraIngredient.name} +${extraIngredient.price}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="flying-button-parent sticky bottom-2">
                <FlyingButton src={image} targetTop={"5%"} targetLeft={"95%"}>
                  <div onClick={handleAddToCartButtonClick}>
                    <span>Add to cart ${finalPrice}</span>
                  </div>
                </FlyingButton>
              </div>

              <button
                type="button"
                className="flex gap-2 items-center justify-center mt-2"
                onClick={() => setShowPopup(false)}
              >
                <div className="text-primary">
                  <Cancel />
                </div>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
