import Image from "next/image";
import Trash from "../icons/Trash";
import { cartProductPrice } from "../AppContext";

export default function CartProduct({ product, onRemove, index }) {
  return (
    <div className="flex items-center gap-4 mb-2 border-b py-2">
      <div className="min-w-20 flex items-center justify-center">
        <div className="w-24 max-h-24">
          <Image
            width={240}
            height={240}
            src={product.image}
            alt={product.image}
          />
        </div>
      </div>
      <div className="grow">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        {product.size && (
          <div className="text-sm bg-gray-200 py-1 px-2 rounded-md my-1">
            Size: <span>{product.size.name}</span>
          </div>
        )}

        {product.extras?.length > 0 && (
          <div className="bg-gray-100 rounded-md py-1 px-2 text-sm">
            Addons:
            {product.extras.map((extra) => (
              <div key={extra._id} className="px-1 text-xs">
                {extra.name} +${extra.price}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-lg font-semibold min-w-8">
        ${cartProductPrice(product)}
      </div>

      {onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
}
