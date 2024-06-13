"use client";

import useProfile from "../UseProfile";
import AddressInputs from "./AddressInputs";
import EditableImage from "./EditableImage";
import { useState } from "react";

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || "");
  const [userImage, setUserImage] = useState(user?.image || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");
  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === "phone") setPhone(value);
    if (propName === "streetAddress") setStreetAddress(value);
    if (propName === "postalCode") setPostalCode(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  }

  return (
    <div
      className="md:grid gap-4 max-w-xl mx-auto mt-8 "
      style={{ gridTemplateColumns: ".2fr .8fr" }}
    >
      <div className="p-2 rounded-lg relative max-w-[120px]">
        <EditableImage
          link={userImage}
          setLink={setUserImage}
          route={"users"}
        />
      </div>

      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image: userImage,
            phone,
            streetAddress,
            postalCode,
            city,
            country,
            admin,
          })
        }
      >
        <label>First and Last Name</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />

        <label>Email</label>
        <input type="text" placeholder="email" disabled value={user?.email} />

        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProps={(propName, val) =>
            handleAddressChange(propName, val)
          }
        />

        {loggedInUserData.admin && (
          <div>
            <label className="p-2 inline-flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                className="cursor-pointer"
                value={"1"}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
