"use client";
import Cancel from "@/components/icons/Cancel";
import Edit from "@/components/icons/Edit";
import Trash from "@/components/icons/Trash";
import DeleteButton from "@/components/layout/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = useProfile();

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  if (profileLoading) return "Loading user info...";
  if (!profileData.admin || !profileData) return redirect("/profile");

  async function handleCategorySubmit(ev) {
    ev.preventDefault();

    const data = { name: categoryName };
    if (editedCategory) data._id = editedCategory._id;

    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setCategoryName("");
      fetchCategories();

      if (response.ok) return resolve();
      else return reject();
    });

    toast.promise(creationPromise, {
      loading: editedCategory
        ? "Editing your category...."
        : "Creating your new Category.....",
      success: editedCategory
        ? "Category updated successfully"
        : "Category created successfully",
      error: "Some error occured. Please try again later",
    });

    setEditedCategory(null);
  }

  async function handleCategoryDelete(_id) {
    const deletingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories?_id=" + _id, {
        method: "DELETE",
      });

      if (response.ok) return resolve();
      else return reject();
    });

    await toast.promise(deletingPromise, {
      loading: "Deleting....",
      success: "Successfully deleted the category",
      error: "Some error occured. Please try again later",
    });

    fetchCategories();
  }

  return (
    <section className="mt-8 max-w-lg mx-auto">
      <UserTabs isAdmin={profileData.admin} />

      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? "Update Category Name" : "New Category name"}
              {editedCategory && (
                <>
                  : <b>{editedCategory.name}</b>
                </>
              )}
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button
              type="submit"
              disabled={categoryName ? false : true}
              className="border border-primary"
            >
              {editedCategory ? "Update" : "Create"}
            </button>
            {editedCategory && (
              <button
                type="button"
                className="px-4 text-primary"
                onClick={() => {
                  setEditedCategory(null);
                  setCategoryName("");
                }}
              >
                <Cancel />
              </button>
            )}
          </div>
        </div>
      </form>

      <div>
        <h2 className="mt-8 text-sm text-gray-500">Available Category:</h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div
              key={c._id}
              className="mb-1 rounded-xl p-2 px-4 flex gap-1 bg-gray-100 items-center"
            >
              <span className="grow">{c.name}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  <Edit />
                </button>
                <DeleteButton onDelete={() => handleCategoryDelete(c._id)} />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
