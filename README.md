# CDApi
Api desenvolvida em NodeJS para a disciplina de computação distribuída.

# Implantação
  1. Verifique se na sua máquina possui o docker instalado.
  2. Clone o projeto.
  3. Na raiz do projeto, rode o seguinte comando no terminal: 
```jsx
sudo docker-compose up
```     
  4. Após o docker iniciar por completo, teste da maneira que achar melhor :)

# Documentação
  Para facilitar o teste, um arquivo Postman está na raiz do projeto, como: 
```jsx
 CDApi.json
```     
   Basta importar no Postman para usá-lo.
## Users

| HTTP Request | Endpoint | Token | Body | Descrição |
| ------ | ------ | ------ | ------ | ------ |
| GET | /user |  |  | Lista todos os usuários cadastrados |
| POST | /user |  | {email, password} | Cadastra um novo usuário |
| PUT | /user/id | JWT | {email, password} | Atualiza um usuário pelo id |
| DELETE | /user | JWT |  | Deleta um usuário pelo id |

## Auth

| HTTP Request | Endpoint | Body | Descrição |
| ------ | ------ | ------ | ------ |
| POST | /auth | {email, password} | Vereifica o login e fornece o token de acesso JWT |


## Payments

| HTTP Request | Endpoint | Token | Body | Descrição |
| ------ | ------ | ------ | ------ | ------ |
| GET | /user_id/payment | JWT |  | Lista o payment de um usuário específico |
| GET | /payments | JWT |  | Lista todos os payments cadastrados |
| POST | /user_id/payment | JWT | {card_number, card_name, card_csc, card_expiry_date} | Insere um novo payment no banco os dados |
| DELETE | /payment/id | JWT |  | Deleta um payment específico |

## Addresses

| HTTP Request | Endpoint | Token | Body | Descrição |
| ------ | ------ | ------ | ------ | ------ |
| GET | /user_id/address | JWT |  | Lista o address de um usuário específico |
| GET | /addresses | JWT |  | Lista todos os addresses cadastrados |
| POST | /user_id/address | JWT | {zip_code, number, details} | Insere um novo address no banco os dados |
| DELETE | /address/id | JWT |  | Deleta um address específico |

## Products

| HTTP Request | Endpoint | Token | Body | Descrição |
| ------ | ------ | ------ | ------ | ------ |
| GET | /products | JWT |  | Lista todos os products cadastrados |
| GET | /product/id | JWT |  | Lista um product em específico |
| POST | /products | JWT | {name, description} | Insere um novo product no banco os dados |
| POST | /category_id/products | JWT | {name, description} | Insere um novo product pertencente à uma category específica |
| PUT | /product/id | JWT | {name, description} | Edita um product específico |
| DELETE | /product/id | JWT |  | Deleta um product específico |

## Categories

| HTTP Request | Endpoint | Token | Body | Descrição |
| ------ | ------ | ------ | ------ | ------ |
| GET | /categories | JWT |  | Lista todas as categories cadastradas |
| GET | /category/id | JWT |  | Lista uma category em específico |
| POST | /categories | JWT | {name, description} | Insere uma nova category no banco os dados |
| POST | /product_id/categories | JWT | {name, description} | Insere uma nova category pertencente à uma product específico |
| PUT | /category/id | JWT | {name, description} | Edita uma category específica |
| DELETE | /category/id | JWT |  | Deleta uma category específica |

## Orders

| HTTP Request | Endpoint | Token | Body | Descrição |
| ------ | ------ | ------ | ------ | ------ |
| GET | /orders | JWT |  | Lista todas as orders cadastradas |
| GET | /order/id | JWT |  | Lista uma order em específico |
| POST | /product_id/orders | JWT | {status} | Insere uma nova order pertencente à uma product específico |
| PUT | /order/id | JWT | {status} | Edita uma order específica |
| DELETE | /order/id | JWT |  | Deleta uma order específica |

# Regras de Negócio
- Usuário precisa ser cadastrado para conseguir realizar login.
- Usuário após ser cadastro precisa realizar login recebendo então o seu token JWT para poder acessar os endpoints Payment, Address, Product, Category e Order (Token retornado a partir da requisição em /auth deverá ser informado no Postman, no item autorização, campo bearer token, para então conseguir fazer as requisições dos endpoints). 
- Usuário pode ter somente um address.
- Usuário pode ter somente um payment method.
- Para cadastrar um novo product pertencente à uma category é preciso ter pelo menos uma category cadastrada.
- Para cadastrar uma nova category pertencente à um product é preciso ter pelo menos um product cadastrado.
- Para cadastrar uma nova order é preciso ter pelo menos um product cadastrado.



