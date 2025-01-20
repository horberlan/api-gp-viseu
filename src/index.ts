import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/zipcode/:code", async ({ params: { code }, set }) => {
    const format = "json";

    const urls = [
      `${process.env.APICEP}/${code}.${format}`,
      `${process.env.VIACEP}/${code}/${format}/`,
      `${process.env.AWESOMEAPI}/${format}/${code}`,
    ];

    const promises = urls.map(async (url) => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const standardized = standardizeData(data);

          if (isValidZipcodeData(standardized)) {
            return standardized;
          }
          throw new Error("invalid data structure from API");
        } else {
          throw new Error(`Request to ${url} failed with status ${response.status}`);
        }
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    });

    const results = await Promise.allSettled(promises);

    const successfulResults = results
      .filter((result) => result.status === "fulfilled")
      .map((result) => (result as PromiseFulfilledResult<any>).value);

    if (successfulResults.length > 0) {
      return successfulResults[0];
    } else {
      set.status = 404;
      return { error: "No valid response from zipcode APIs" };
    }
  });

function standardizeData(data) {
  return {
    zipCode: data.cep || data.address,
    street: data.logradouro || data.address_name || data.address,
    neighborhood: data.bairro || data.district,
    city: data.localidade || data.city,
    state: data.uf || data.state,
    region: data.regiao,
    ibgeCode: data.ibge || data.city_ibge,
    areaCode: data.ddd,
    latitude: data.lat,
    longitude: data.lng,
  };
}

function isValidZipcodeData(data: any): boolean {
  return !!(data.zipCode && data.city && data.state);
}

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
