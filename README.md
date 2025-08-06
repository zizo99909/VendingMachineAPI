# Vending Machine API

A RESTful API for a vending machine system, supporting user authentication, product management, and buyer operations (deposit, purchase, reset). Built with Node.js, Express, and MongoDB.

---

## Features

- **User Authentication**: Register, login, and role-based access (buyer/seller).
- **Product Management**: Sellers can create, update, and delete products.
- **Buyer Operations**: Buyers can deposit coins, purchase products, and reset their deposit.
- **Change Calculation**: Returns change in optimal coin denominations.
- **Secure**: Uses JWT for authentication and bcrypt for password hashing.

---

## Technologies

- Node.js, Express
- MongoDB, Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/<your-username>/<your-repo-name>.git
cd Vending_machine_API
```

### 2. Install dependencies

```sh
npm install
```

### 3. Create a `.env` file

Add your MongoDB connection string and (optionally) a custom port:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
```

### 4. Start the server

```sh
npm start
```
or
```sh
node index.js
```

---

## API Endpoints

### User Routes (`/api/users`)
- `POST /register` — Register a new user (buyer or seller)
- `POST /login` — Login and receive a JWT
- `GET /:id` — Get user details (auth required)
- `PUT /:id` — Update user (auth required)
- `DELETE /:id` — Delete user (auth required)

### Product Routes (`/api/products`)
- `GET /` — List all products
- `POST /` — Create product (seller only)
- `PUT /:id` — Update product (seller & owner only)
- `DELETE /:id` — Delete product (seller & owner only)

### Buyer Routes (`/api`)
- `POST /deposit` — Deposit coins (buyer only, accepts 5, 10, 20, 50, 100)
- `POST /buy` — Buy product (buyer only)
- `POST /reset` — Reset deposit and get change (buyer only)

---

## Models

### User

| Field     | Type   | Description                |
|-----------|--------|---------------------------|
| username  | String | Unique username           |
| password  | String | Hashed password           |
| deposit   | Number | Current deposit (cents)   |
| role      | String | 'buyer' or 'seller'       |

### Product

| Field           | Type     | Description                        |
|-----------------|----------|------------------------------------|
| productName     | String   | Name of the product                |
| cost            | Number   | Price (cents, divisible by 5)      |
| amountAvailable | Number   | Stock available                    |
| sellerId        | ObjectId | Reference to seller (User)         |

---

## Business Logic

- **Deposit**: Buyers can deposit only 5, 10, 20, 50, or 100 cent coins.
- **Buy**: Buyers can purchase products if they have enough deposit. Change is returned in the largest denominations possible.
- **Reset**: Buyers can reset their deposit and receive their remaining balance as change.

---

## Example Change Calculation

If a buyer has 85 cents left, the API will return `[50, 20, 10, 5]`.

---

## Security

- Passwords are hashed using bcryptjs.
- JWT is used for authentication.
- Sensitive data (like `.env`) is excluded from version control via `.gitignore`.

---

## License

ISC