import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  .get("/zipcode/:code", async ({ params: { code } }) => {
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
          return data;
        } else {
          throw new Error(`Request to ${url} failed with status ${response.status}`);
        }
      } catch (error) {
        throw error;
      }
    });

    const results = await Promise.allSettled(promises);

    const successfulResults = results.filter(
      (result) => result.status === "fulfilled"
    );

    console.log(successfulResults);

    if (successfulResults.length > 0) {
      return successfulResults[ 0 ].value;
    } else {
      return { error: "No valid response from zipcode APIs" };
    }
  });

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});