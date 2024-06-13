import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink, route }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;

    const uploadPromise = new Promise(async (resolve, reject) => {
      if (!(files?.length > 0)) return reject();

      const data = new FormData();
      data.set("file", files[0]);
      data.set("route", route ? route : "images");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        const url = await response.json();
        setLink(url);
        resolve();
      } else reject();
    });

    toast.promise(uploadPromise, {
      loading: "Uploading....",
      success: "Upload completed",
      error: "Some error occured. Please try again later",
    });
  }

  return (
    <>
      <div className="flex relative bg-gray-300 rounded-lg p-2 items-center justify-center my-1">
        {link && (
          <Image
            src={link}
            className="max-h-[128px] max-w-[128px] h-full w-full rounded-lg"
            width={100}
            height={100}
            alt="Avatar"
          />
        )}
        {!link && (
          <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg">
            No image
          </div>
        )}
      </div>
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block whitespace-nowrap border rounded-lg p-2 text-center border-gray-300 cursor-pointer">
          Change image
        </span>
      </label>
    </>
  );
}
