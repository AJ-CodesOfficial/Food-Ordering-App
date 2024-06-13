import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero md:mt-4">
      <div className="py-6 px-8 md:px-0 md:py-12">
        <h1 className="text-4xl font-semibold">
          Everything
          <br />
          is better
          <br />
          with a&nbsp;
          <span className="text-primary">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className="flex gap-4 items-center text-sm">
          <button className="bg-primary uppercase flex gap-2 text-white px-4 py-2 rounded-full items-center justify-center">
            Order Now
            <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 font-semibold items-center border-0">
            Learn More
            <Right />
          </button>
        </div>
      </div>
      <div className="relative hidden md:block ">
        <Image
          src={"/pizza.png"}
          className="h-auto w-auto object-contain"
          fill={true}
          alt={"pizza"}
        />
      </div>
    </section>
  );
}
