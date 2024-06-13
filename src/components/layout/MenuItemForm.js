import { useEffect, useState } from "react";
import EditableImage from "./EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || "");
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || "");
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || []
  );
  const [category, setCategory] = useState(
    menuItem?.category || "6637ba2edfdfbded05d4adde"
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className="mt-8"
    >
      <div
        className="md:grid gap-4 items-start"
        style={{ gridTemplateColumns: ".2fr .8fr" }}
      >
        <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} route={"menu-items"} />
        </div>
        <div className="grow">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base Price</label>
          <input
            type="number"
            min="1"
            step="any"
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />

          <MenuItemPriceProps
            name={"Sizes"}
            addLabel={"Add item sizes"}
            props={sizes}
            setProps={setSizes}
          />

          <MenuItemPriceProps
            name={"Extra ingredients"}
            addLabel={"Add ingredients"}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />

          <button
            disabled={!name || !image || !description || !basePrice}
            type="submit"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
