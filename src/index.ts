import { Elysia, ERROR_CODE } from "elysia";
import { cors } from "@elysiajs/cors";

const app: Elysia = new Elysia()
  .use(cors())
  .get("/zipcode/:code", async ({ params: { code }, error }: any) => {
    const format: string = "json";

    const urls: string[] = [
      `${process.env.APICEP}/${code}.${format}`,
      `${process.env.VIACEP}/${code}/${format}/`,
      `${process.env.AWESOMEAPI}/${format}/${code}`,
    ];

    const promises: Promise<ZipcodeData>[] = urls.map(async (url: string) => {
      try {
        const response: Response = await fetch(url);
        if (response.ok) {
          const data: any = await response.json();
          const standardized: ZipcodeData = standardizeData(data);

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

    const results: PromiseSettledResult<ZipcodeData>[] = await Promise.allSettled(promises);

    const successfulResults: ZipcodeData[] = results
      .filter((result: PromiseSettledResult<ZipcodeData>) => result.status === "fulfilled")
      .map((result: PromiseSettledResult<ZipcodeData>) => (result as PromiseFulfilledResult<ZipcodeData>).value);

    if (successfulResults.length > 0) {
      return successfulResults[0];
    } else {
      return error(404, "No valid response from zipcode APIs");
    }
  });

function standardizeData(data: any): ZipcodeData {
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