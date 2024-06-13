import { useState } from "react";
import { ChevronDown, ChevronUp } from "../icons/Expand";
import { Plus } from "../icons/Plus";
import Trash from "../icons/Trash";

export default function MenuItemPriceProps({
  name,
  addLabel,
  props,
  setProps,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: "", price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;

    setProps((prevProps) => {
      const newProps = [...prevProps];
      newProps[index][prop] = newValue;
      return newProps;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prevProps) =>
      prevProps.filter((v, index) => index !== indexToRemove)
    );
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button
        type="button"
        className="flex text-gray-700 justify-between gap-2 items-center mb-2 border-0 px-2 py-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronUp /> : <ChevronDown />}
        <h3 className="flex gap-1 grow justify-start">
          <span>{name}</span>
          <span>({props?.length})</span>
        </h3>
      </button>

      <div className={isOpen ? "block mb-2" : "hidden"}>
        {props?.length > 0 &&
          props.map((prop, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={prop.name}
                  onChange={(ev) => editProp(ev, index, "name")}
                />
              </div>

              <div>
                <label>Extra Price</label>
                <input
                  type="number"
                  placeholder="Extra Price"
                  min="0"
                  step="any"
                  value={prop.price}
                  onChange={(ev) => editProp(ev, index, "price")}
                />
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => removeProp(index)}
                  className="bg-white mb-2 px-2"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white gap-1 items-center"
        >
          <Plus className="w-4 h-4" />
          {addLabel}
        </button>
      </div>
    </div>
  );
}
