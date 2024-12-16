export const categories = [
  {
    id: 1,
    name: "salgados",
    img: "salgadinho.png",
  },
  {
    id: 2,
    name: "bebidas",
    img: "bebidas.png",
  },
  {
    id: 4,
    name: "doces",
    img: "doces.png",
  },
];

/*
pedido
{
  "id": "unique_order_id", // ID único gerado pelo Firestore
  "userId": "user_id", // ID do usuário que fez o pedido
  "items": [
    {
      "productId": "unique_product_id",
      "name": "Pizza Margherita",
      "quantity": 2,
      "price": 39.90,
      "totalPrice": 79.80
    },
    {
      "productId": "unique_product_id_2",
      "name": "Coca-Cola 1L",
      "quantity": 1,
      "price": 10.00,
      "totalPrice": 10.00
    }
  ],
  "totalAmount": 89.80, // Valor total do pedido
  "status": "pending", // Status do pedido: pending, confirmed, shipped, delivered, canceled
  "deliveryAddress": {
    "street": "Rua Exemplo, 123",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01001-000",
    "complement": "Apto 45"
  },
  "createdAt": "2024-12-02T12:00:00Z", // Timestamp de criação do pedido
  "updatedAt": "2024-12-02T12:15:00Z", // Timestamp de atualização
  "deliveryTimeEstimate": "2024-12-02T13:00:00Z", // Estimativa de entrega
  "payment": {
    "method": "credit_card", // Opções: credit_card, pix, cash, etc.
    "status": "paid" // Status do pagamento: pending, paid, failed
  }
}

usuario
{
  "id": "unique_user_id", // ID único gerado pelo Firestore
  "name": "João Silva",
  "email": "joao.silva@example.com",
  "phone": "+5511999999999",
  "address": {
    "street": "Rua Principal, 456",
    "city": "Rio de Janeiro",
    "state": "RJ",
    "zipCode": "22050-010",
    "complement": "Casa 1"
  },
  "createdAt": "2024-12-01T08:00:00Z", // Timestamp de criação do usuário
  "updatedAt": "2024-12-02T10:00:00Z" // Timestamp de atualização
}
*/
