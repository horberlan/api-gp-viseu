# Elysia with Bun runtime

Esta API, desenvolvida em Elysia, é responsável por receber um CEP como parâmetro e buscar dados de endereço de forma redundante em diferentes APIs, a fim de cubrir possiveis falhas nos endereços, retornando os dados padrãoizados.

#### Setup
```bash
Bun install && Bun dev

# Server running on http://localhost:3000
```

### Endpoints

GET /zipcode/:code

Este endpoint é responsável por buscar dados de endereço com base no CEP fornecido.

Parâmetros de rota:

* code: O CEP a ser buscado, no formato sem traços (somente números).

#### Exemplo:
```bash
GET /zipcode/01001000
```
Formato de resposta:

A resposta é um objeto contendo os dados do endereço, padronizado pelo método `standardizeData`. Caso não haja sucesso em obter dados válidos de nenhuma API, retorna um código de erro genérico 404.

Exemplo de resposta bem-sucedida:
```json
{
  "zipCode": "01001000",
  "street": "Praça da Sé",
  "neighborhood": "Sé",
  "city": "São Paulo",
  "state": "SP",
  "region": "Sudeste",
  "ibgeCode": "3550308",
  "areaCode": "11",
  "lat": "-23.5475246",
  "lng": "-46.6380719"
}
```
