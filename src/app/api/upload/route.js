import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/libs/firebase";
import uniqid from "uniqid";

export async function POST(req) {
  const data = await req.formData();

  if (data.get("file")) {
    const file = data.get("file");

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;

    const storageRef = ref(storage, `${data.get("route")}/${newFileName}`);
    await uploadBytesResumable(storageRef, file);
    const url = await getDownloadURL(storageRef);

    return Response.json(url);
  } else {
    return Response.json(false);
  }
}
