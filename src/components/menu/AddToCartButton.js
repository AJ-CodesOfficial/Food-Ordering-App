import FlyingButton from "react-flying-item";

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton src={image} targetTop={"5%"} targetLeft={"95%"}>
          <div onClick={onClick}>
            <span>Add to cart ${basePrice}</span>
          </div>
        </FlyingButton>
      </div>
    );
  }

  return (
    <button
      type="button"
      className="bg-primary mt-4 text-white rounded-full px-6 py-2"
      onClick={onClick}
    >
      <span>Starting From ${basePrice}</span>
    </button>
  );
}
