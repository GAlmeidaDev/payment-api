# API Routes Documentation

Este documento descreve as rotas disponíveis na API e o que cada uma delas faz. As rotas são organizadas em três categorias principais: autenticação, operações com Pix, e operações com EfiPay.

## Autenticação

### 1. `POST /auth/efi/pix`
- **Descrição:** Realiza a autenticação para operações de Pix.
- **Controller:** `AuthController`
- **Método:** `getAuthTokenPix`
- **Nota:** Embora essa rota seja usada para autenticação, a função interna já realiza o processo de autenticação.

### 2. `POST /auth/efi`
- **Descrição:** Realiza a autenticação para operações gerais de pagamento com EfiPay.
- **Controller:** `AuthController`
- **Método:** `getAuthTokenEfi`
- **Nota:** Semelhante à rota anterior, essa rota executa a autenticação, mas a função interna também realiza o processo de autenticação.

## Operações com Pix

### 3. `POST /pix/loc`
- **Descrição:** Cria uma nova cobrança de Pix.
- **Controller:** `PixController`
- **Método:** `createCob`

### 4. `GET /pix/qrcode/:id`
- **Descrição:** Recupera os dados do QR Code de um Pix, baseado no ID fornecido.
- **Controller:** `PixController`
- **Método:** `getQrCode`

### 5. `PATCH /pix/imediate`
- **Descrição:** Gera um Pix de cobrança imediata.
- **Controller:** `PixController`
- **Método:** `create`

### 6. `GET /pix/:txid`
- **Descrição:** Verifica o status de uma cobrança Pix baseada no `txid`.
- **Controller:** `PixController`
- **Método:** `checkBillingPix`

## Operações com EfiPay

### 7. `POST /efipay/charge`
- **Descrição:** Cria uma nova cobrança EfiPay.
- **Controller:** `EfiPayController`
- **Método:** `createCharge`

### 8. `POST /efipay/charge/:id/pay`
- **Descrição:** Processa o pagamento de uma cobrança EfiPay com base no ID fornecido.
- **Controller:** `EfiPayController`
- **Método:** `processPayment`
- **Nota:** Antes de processar o pagamento, é necessário gerar o `payment_token` no frontend.

### 9. `GET /efipay/charge/:chargeId`
- **Descrição:** Verifica o status de um pagamento EfiPay com base no `chargeId`.
- **Controller:** `EfiPayController`
- **Método:** `checkPayment`

## Notas Importantes

- **Autenticação:** Embora existam rotas dedicadas para autenticação, as funções internas dessas rotas já incluem a lógica de autenticação.
- **Pagamento com EfiPay:** Antes de realizar o pagamento de uma cobrança EfiPay, é necessário gerar o `payment_token` no frontend.

