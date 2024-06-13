"use client";

import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);

        fetch("/api/menu-items").then((res) => {
          res.json().then((menuItems) => {
            setMenuItems(menuItems);

            setLoading(false);
          });
        });
      });
    });
  }, []);

  return (
    <section className="mt-8 ">
      {loading && <div className="text-black text-center mt-8">Loading...</div>}
      {!loading && (
        <>
          {categories?.length > 0 &&
            categories.map((c) => (
              <div key={c._id}>
                <div className="text-center">
                  <SectionHeaders mainHeader={c.name} />
                </div>

                <div className="grid sm:grid-cols-3 gap-4 mt-4 mb-8">
                  {menuItems
                    .filter((m) => m.category === c._id)
                    .map((item) => (
                      <MenuItem key={item._id} {...item} />
                    ))}
                </div>
              </div>
            ))}
        </>
      )}
    </section>
  );
}
