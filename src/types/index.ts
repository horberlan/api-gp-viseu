import { t } from "elysia"

const zipcodeData = {
  zipCode: t.String(),
  street: t.String(),
  neighborhood: t.String(),
  city: t.String(),
  state: t.String(),
  region: t.String(),
  ibgeCode: t.String(),
  areaCode: t.String(),
  lat: t.String(),
  lng: t.String(),
}

export type ZipcodeData = typeof zipcodeData;