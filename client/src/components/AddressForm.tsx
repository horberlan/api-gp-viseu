import type { AddressData } from "../types"
import { InputField } from "./Inputs/InputField"

interface AddressFormProps {
  addressData: AddressData
}

const intl = {
  title: "Address Details",
  inputsLabel: {
    street: "Street",
    neighborhood: "Neighborhood",
    city: "City",
    state: "State",
    region: "Region"
  },
}

export function AddressForm({ addressData }: AddressFormProps) {
  return (
    <div className="container text-center">
      <h2 className="text-sky-300">{intl.title}</h2>
      {Object.entries(intl.inputsLabel).map(([key, label]) => (
        <InputField key={key} label={label} value={addressData[key as keyof AddressData] ?? ""} />
      ))}
    </div>
  )
}