# Pizza House — MERN Full-Stack Pizza Ordering Platform

A full-stack demo project for the Pizza Delivery Full-Stack Application assignment. It includes a React storefront, Node/Express API, MongoDB persistence, user authentication, email verification, password reset, custom pizza builder, demo/Razorpay test checkout, order tracking, and an admin inventory/order console.

## Features implemented

### Customer side
- Responsive storefront with a multi-category pizza menu and add-to-cart flow.
- Custom pizza builder: 5 bases, 5 sauces, cheese options, and up to 6 vegetables.
- Server-side pricing and stock validation; the API does not trust client-submitted prices.
- Account registration, email-verification link, JWT sign-in, forgot-password email, and password reset.
- Checkout in local demo mode or Razorpay test mode; demo checkout explicitly simulates a successful test payment without charging money.
- Inventory is decremented after payment is verified/confirmed.
- Order history with order status and a progress tracker. The customer dashboard polls the API every 8 seconds for changes.

### Admin side
- Separate admin login; public customer registration cannot create admin accounts.
- Seeded admin account from environment variables.
- Overview metrics, all incoming orders, status management, ingredient stock and configurable thresholds.
- A scheduled `node-cron` job checks low stock; it avoids sending the same item's alert more than once per 24 hours.
- If SMTP is not configured, email messages and local verification/reset links are logged/returned for development testing.

## Requirements
- Node.js 20+ (Node 22 recommended)
- npm
- MongoDB local service or MongoDB Atlas connection string

## Setup on Windows PowerShell

1. Extract this ZIP and open PowerShell **in the folder that contains the root `package.json`**.
2. Create the environment files:

   ```powershell
   Copy-Item server/.env.example server/.env
   Copy-Item client/.env.example client/.env
   ```

3. Open `server/.env` and set `MONGODB_URI` to your MongoDB Atlas connection string. Open `client/.env` and paste the Firebase Web App values (`VITE_FIREBASE_API_KEY` and `VITE_FIREBASE_APP_ID`). The Firebase project ID and auth domain are prefilled for project `pizza-house-511215`; change them if your Firebase project uses different values. You do not need a separate OAuth client secret or downloaded service-account JSON.
4. In Firebase Console, open **Authentication → Sign-in method → Google** and enable Google. In **Authentication → Settings → Authorized domains**, ensure `localhost` is listed for local development. Add your deployed website domain when deploying.
5. Install dependencies:

   ```powershell
   npm run install:all
   ```

5. Seed the menu, ingredient stock, and admin account:

   ```powershell
   npm run seed
   ```

6. Start both apps in development mode:

   ```powershell
   npm run dev
   ```

7. Open the frontend at **http://localhost:3000**. The API health endpoint is **http://localhost:5000/api/health**.

### Default local admin
The example env file seeds `admin@pizzahouse.local` with the password `ChangeMe123!`. This is a development placeholder. Change `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `server/.env` and rerun `npm run seed` before using the project beyond local testing. Use the **Admin sign in** link on the customer sign-in page.

## Payment setup

### Local demo mode (default)
`PAYMENT_DEMO=true` enables a clearly labelled **Test Checkout** step. Clicking **Simulate successful payment** confirms the demo order and decrements inventory. It does not charge money.

### Razorpay test mode
1. Create Razorpay test API keys in your Razorpay dashboard.
2. Put `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in `server/.env`.
3. Set `PAYMENT_DEMO=false` (keys present take precedence and select Razorpay automatically).
4. Restart the API. Checkout uses the Razorpay order API and verifies the payment signature server-side. Use only test credentials while developing.

Razorpay is generally INR-oriented in this sample (`currency: INR`). Change currency/region only after confirming that the intended Razorpay account and account region support it.

## Google sign-in setup

The login page includes **Continue with Google**. It uses Firebase Authentication in the browser and the API verifies the Firebase ID token before creating or signing in a customer in MongoDB. Google accounts are marked as email-verified. Existing customer accounts with the same email are linked to that customer record; admin accounts must still use the separate admin sign-in.

Paste the Firebase Web App API key and App ID into `client/.env`. These browser configuration values are not service-account secrets. Never commit `.env` files. The backend uses the Firebase project ID to verify tokens and does not need a separate OAuth client secret.

## Email setup

For real email delivery, configure these values in `server/.env`:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`
- `SMTP_USER`, `SMTP_PASS`
- `MAIL_FROM`
- `ADMIN_ALERT_EMAIL`

Without SMTP credentials, the API prints verification, reset, and low-stock email messages to its terminal for local development. Account verification is required before customer login.

## Frontend menu and typography notes

- The storefront always displays an eight-pizza menu preview, even if the API is offline or the MongoDB menu collection has not been seeded. Preview-only cards cannot be ordered until the backend is running and `npm run seed` has loaded the real menu records.
- The home page uses one shared footer, so it no longer renders a duplicate footer.
- Typography uses DM Sans for body text and Manrope for headings. The Google Fonts import in `client/index.html` requires an internet connection; local sans-serif fallbacks are configured.

## Main commands

```powershell
npm run install:all    # install root + frontend + backend dependencies
npm run seed           # seed menu, stock, and admin credentials
npm run dev            # Vite at :3000 and Express at :5000
npm run build          # production frontend build
npm start               # start the API only (after setup/build)
```

## Project structure

```text
pizza-house-mern/
  client/
    src/App.jsx          # storefront, cart, builder, auth, order tracking, admin UI
    src/styles.css       # responsive visual design
    src/main.jsx
    .env.example
  server/
    src/index.js         # Express API and cron task
    src/models.js        # Mongoose schemas
    src/seed.js          # default menu, ingredient stock, admin account
    src/email.js         # Nodemailer and low-stock email helper
    .env.example
  package.json
```

## Notes for assignment submission

- This is an educational project scaffold, not a security-audited production deployment. Before going live, add HTTPS, a stronger operational secrets strategy, request/schema validation, audit logs, real-time WebSockets if required, payment/webhook reconciliation, robust stock reservation/refund handling, tests, monitoring, and deployment configuration.
- Customer status updates use polling rather than WebSockets; this satisfies the brief's polling-or-WebSockets option.
- Seeded menu photographs use remote Unsplash image URLs; an internet connection is needed to display them.
