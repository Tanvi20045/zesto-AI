# Zesto ⚡ — 10-Minute Grocery App

A full-stack MERN grocery delivery app (Blinkit/Zepto clone).

LIVE LINK - zesto-ai-git-main-tanvi20045s-projects.vercel.app

---

## Project Structure

```
zesto/
├── client/          # React frontend (Vite + Tailwind)
└── server/          # Node/Express backend
```

---

## Setup — Frontend

```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Setup — Backend

```bash
cd server
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Then edit .env and set your MONGO_URI and JWT_SECRET

npm run dev
# Runs on http://localhost:5000
```

---

## Features

**Frontend**
- Home page with rotating banner, categories, product grid
- Product detail page with add to cart
- Cart drawer with bill summary and delivery fee logic
- Checkout page with address + payment method
- Order tracking page with live status steps
- Login / Signup with JWT auth
- Admin panel — stats, product CRUD

**Backend**
- JWT authentication (register/login)
- Products API with category filter + search
- Orders API (place order, track, admin update status)
- Role-based access (user / admin)
- Input validation with express-validator
- Password hashing with bcryptjs

---

## API Endpoints

### Auth
| Method | Route                | Description        |
|--------|----------------------|--------------------|
| POST   | /api/auth/register   | Register user      |
| POST   | /api/auth/login      | Login user         |
| GET    | /api/auth/me         | Get current user   |

### Products
| Method | Route                | Description        |
|--------|----------------------|--------------------|
| GET    | /api/products        | All products       |
| GET    | /api/products/:id    | Single product     |
| POST   | /api/products        | Create (admin)     |
| PUT    | /api/products/:id    | Update (admin)     |
| DELETE | /api/products/:id    | Delete (admin)     |

### Orders
| Method | Route                    | Description            |
|--------|--------------------------|------------------------|
| POST   | /api/orders              | Place order            |
| GET    | /api/orders/my           | My orders              |
| GET    | /api/orders/:id          | Single order           |
| GET    | /api/orders              | All orders (admin)     |
| PUT    | /api/orders/:id/status   | Update status (admin)  |

---

## Connecting Frontend to Backend

Once your backend is running, update `client/src/services/api.js` — the baseURL
is already set to `http://localhost:5000/api`.

Then in `Products.jsx`, replace the static PRODUCTS import with:

```js
const [products, setProducts] = useState([]);
useEffect(() => {
  api.get(`/products?category=${activeCategory}&search=${searchQuery}`)
    .then(r => setProducts(r.data));
}, [activeCategory, searchQuery]);
```

---

## Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS  |
| State     | Zustand + localStorage        |
| Routing   | React Router v6               |
| Backend   | Node.js, Express              |
| Database  | MongoDB + Mongoose            |
| Auth      | JWT + bcryptjs                |
| Icons     | Lucide React                  |
| Fonts     | Syne (headings) + DM Sans     |
