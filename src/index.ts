import { Elysia } from "elysia";

const app = new Elysia()
  .get("/cep/:id", ({ params: { id } }) => {
    
  })
  .listen(3000);

// https://cdn.apicep.com/file/apicep/${id}.json
// https://cep.awesomeapi.com.br/json/${id}
// https://viacep.com.br/ws/${id}/json/

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
