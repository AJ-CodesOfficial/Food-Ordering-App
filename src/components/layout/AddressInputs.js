export default function AddressInputs({
  addressProps,
  setAddressProps,
  disabled = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(ev) => setAddressProps("phone", ev.target.value)}
        disabled={disabled}
      />

      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        disabled={disabled}
        onChange={(ev) => setAddressProps("streetAddress", ev.target.value)}
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            disabled={disabled}
            inputMode="numeric"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProps("postalCode", ev.target.value)}
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            disabled={disabled}
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
          />
        </div>
      </div>

      <label>Country</label>
      <input
        type="text"
        disabled={disabled}
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProps("country", ev.target.value)}
      />
    </>
  );
}
