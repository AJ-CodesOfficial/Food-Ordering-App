import Link from "next/link";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <section id="about-us" className="text-center my-8">
        <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />

        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic sint
            velit impedit. Consectetur, voluptatum autem. Iusto non, debitis
            quibusdam dolore, aspernatur numquam asperiores, reiciendis minus
            fugiat exercitationem mollitia voluptas hic! Quidem doloribus quos.
            Voluptatum, aliquam repellat eius tempora?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic sint
            velit impedit. Consectetur, voluptatum autem. Iusto non, debitis
            quibusdam dolore, aspernatur numquam asperiores, reiciendis minus
            fugiat exercitationem mollitia voluptas hic! Quidem doloribus quos.
            Voluptatum, aliquam repellat eius tempora?
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic sint
            velit impedit. Consectetur, voluptatum autem.
          </p>
        </div>
      </section>

      <section id="contact-us" className="text-center">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact us"}
        />

        <div className="mt-8 flex flex-col gap-2">
          <Link
            href={"tel:+919431703182"}
            className="text-3xl underline text-gray-500"
          >
            +91-9431703182
          </Link>
          <Link
            href={"mailto:adharshjolly23@gmail.com"}
            className="text-3xl underline text-gray-500"
          >
            adharshjolly23@gmail.com
          </Link>
        </div>
      </section>
    </>
  );
}
