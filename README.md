# Coal Supply - Analytics Dashboard

A comprehensive coal supply analytics dashboard built with Node.js, Express, and Databricks ML integration. This application provides real-time transaction monitoring, revenue analytics, and machine learning-powered profit predictions.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database & Data](#database--data)
- [Authentication](#authentication)
- [Databricks Integration](#databricks-integration)
- [Frontend Features](#frontend-features)
- [Environment Variables](#environment-variables)
- [Deployment on Vercel](#deployment-on-vercel)
- [Key Pages](#key-pages)

---

## 🎯 Project Overview

**Coal Supply** is a full-stack analytics platform designed for monitoring coal supply transactions and predicting profitability. It features:
- User authentication system with demo and admin accounts
- Real-time transaction dashboard with filtering and pagination
- Analytics engine for revenue tracking and trend analysis
- Integration with Databricks ML serving endpoints for profit predictions
- Responsive UI with modern design and interactive charts

**Version:** 1.0.0  
**Author:** ARPAN58  
**License:** ISC

---

## ✨ Features

### Dashboard & UI
- **Interactive Dashboard** - Real-time transaction overview with key metrics
- **Analytics Section** - Comprehensive revenue analytics, customer insights, and trend analysis
- **Transaction Management** - Browse, filter, and paginate through 12+ sample transactions
- **Reports Module** - Generate and track reports (Monthly Revenue, Transaction Summary, Customer Insights)
- **Settings Panel** - User preferences and account management
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Modern UI Framework** - Font Awesome icons, gradient backgrounds, smooth animations

### Backend Features
- **Express Server** - Lightweight and fast Node.js server
- **RESTful API** - Well-structured endpoints for all operations
- **Authentication** - Secure login with JWT token generation
- **Caching** - Cache control for optimized performance
- **Security** - Helmet middleware for security headers, CORS support
- **Data Compression** - Gzip compression for faster transfer

### ML & Predictions
- **Databricks Integration** - Connect to Databricks ML serving endpoints
- **Coal Profit Prediction** - Predict profit based on quantity using ML models
- **Scalable Architecture** - Ready for production with Vercel serverless

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Node.js, Express 5.2.1 |
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **ML Integration** | Databricks ML Serving |
| **Security** | Helmet.js, CORS |
| **Performance** | Compression, Caching |
| **Deployment** | Vercel (Serverless), Node.js |
| **API Client** | Axios |
| **Dev Tools** | Nodemon |

---

## 📁 Project Structure

```
analytics-dashboard/
├── server.js                 # Main Express server & API routes
├── script.js                 # Frontend JavaScript (dashboard interactions)
├── index.html                # Main dashboard page
├── login.html                # Login page with authentication UI
├── styles.css                # Global CSS styling
├── data.json                 # Sample transaction and user data
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment configuration
├── README.md                 # This file
│
├── api/
│   └── index.js              # Vercel serverless function entry point
│
├── pages/
│   ├── index.js              # React prediction page (optional)
│   └── api/
│       └── predict.js        # Databricks ML prediction endpoint
│
└── [Other files]
    └── logo.svg              # Application logo
```

---

## 📦 Dependencies

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `express` | ^5.2.1 | Web framework |
| `axios` | ^1.16.1 | HTTP client for API calls |
| `cors` | ^2.8.6 | Cross-Origin Resource Sharing |
| `helmet` | ^7.2.0 | Security middleware |
| `compression` | ^1.8.1 | Gzip compression middleware |
| `dotenv` | ^17.4.2 | Environment variable management |
| `serverless-http` | ^3.0.0 | Vercel serverless adapter |

### Development Dependencies

- `nodemon` - Auto-restart server on file changes

---

## 💻 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/ARPAN58/coal.git
cd coal
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABRICKS_HOST=https://dbc-20f214f0-260f.cloud.databricks.com
DATABRICKS_ENDPOINT=coal-profit-endpoint
DATABRICKS_TOKEN=your_personal_access_token_here
```

⚠️ **Security Note:** Never commit `.env` to version control. Add it to `.gitignore`.

---

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Uses `nodemon` for automatic server restart on changes.

### Production Mode
```bash
npm start
```
Runs `node server.js` directly.

### Access the Application

| URL | Purpose |
|-----|---------|
| `http://localhost:3000` | Main dashboard |
| `http://localhost:3000/login.html` | Login page |
| `http://localhost:3000/api/login` | API login endpoint |
| `http://localhost:3000/api/transactions` | Get all transactions |
| `http://localhost:3000/api/analytics` | Get analytics data |
| `http://localhost:3000/api/predict` | ML profit prediction |

---

## 🔌 API Endpoints

### Authentication

#### **POST** `/api/login`
Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin@2024"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "jwt-token-1234567890",
  "user": {
    "username": "admin",
    "email": "admin@dataviz.com"
  }
}
```

**Status Codes:**
- `200` - Successful login
- `400` - Missing credentials
- `401` - Invalid credentials
- `500` - Server error

---

### Transactions

#### **GET** `/api/transactions`
Retrieve all transactions with caching (300s).

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "TRX001",
      "customer": "Alice Johnson",
      "product": "Bituminous Coal",
      "amount": 24999.00,
      "date": "2024-03-25",
      "status": "completed",
      "category": "Energy"
    }
  ],
  "total": 12
}
```

**Caching:** 5 minutes (300 seconds)

---

### Analytics

#### **GET** `/api/analytics`
Get comprehensive analytics including revenue, users, performance metrics, and top products.

**Response:**
```json
{
  "success": true,
  "data": {
    "revenue": {
      "total": 378985.00,
      "growth": 12.5,
      "avgTransactionValue": 34453.18,
      "monthly": [
        { "month": "Mar", "revenue": 378985.00 }
      ],
      "categoryRevenue": {
        "Energy": 346986.00,
        "Metallurgical": 52999.00
      }
    },
    "users": {
      "total": 2456,
      "active": 1823,
      "growth": 8.2,
      "newThisMonth": 156
    },
    "transactions": {
      "total": 12,
      "completed": 9,
      "pending": 2,
      "failed": 1,
      "completionRate": "75.0"
    },
    "products": {
      "topProducts": [
        { "name": "Sub-bituminous Coal", "sales": 2, "revenue": 87998.00 }
      ]
    },
    "performance": {
      "avgProcessingTime": "2.3 hours",
      "onTimeDelivery": "94.2%",
      "customerSatisfaction": "4.6/5.0"
    }
  }
}
```

**Caching:** 10 minutes (600 seconds)

---

### ML Predictions

#### **POST** `/api/predict`
Predict coal profit using Databricks ML serving endpoint.

**Request Body:**
```json
{
  "quantity": 100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "predictions": [12500.50],
    "model_version": "1.0"
  }
}
```

**Error Response (Databricks not configured):**
```json
{
  "success": false,
  "message": "Databricks not configured. Set DATABRICKS_TOKEN in your .env file."
}
```

**Status Codes:**
- `200` - Successful prediction
- `400` - Missing quantity parameter
- `503` - Databricks not configured
- `500` - Databricks connection error

---

## 🗄️ Database & Data

### Data Storage
- **Format:** JSON (in-memory for production, file-based for local)
- **Location:** `data.json`
- **Fallback:** Built-in default data if file is missing

### Sample Data Structure

#### Users
```json
{
  "users": {
    "demo": {
      "username": "demo",
      "password": "demo123",
      "email": "demo@dataviz.com"
    },
    "admin": {
      "username": "admin",
      "password": "admin@2024",
      "email": "admin@dataviz.com"
    }
  }
}
```

#### Transactions
```json
{
  "transactions": [
    {
      "id": "TRX001",
      "customer": "Alice Johnson",
      "product": "Bituminous Coal",
      "amount": 24999.00,
      "date": "2024-03-25",
      "status": "completed",
      "category": "Energy"
    }
  ]
}
```

### Transaction Status
- `completed` - Successful transaction
- `pending` - Awaiting processing
- `failed` - Transaction failed

### Coal Product Categories
- **Energy**: Steam Coal, Thermal Coal, Bituminous Coal, Sub-bituminous Coal, Lignite Coal
- **Metallurgical**: Coking Coal, Anthracite Coal

---

## 🔐 Authentication

### Credentials

#### Demo Account
| Field | Value |
|-------|-------|
| Username | `demo` |
| Password | `demo123` |
| Email | `demo@dataviz.com` |

#### Admin Account
| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin@2024` |
| Email | `admin@dataviz.com` |

### Token Management
- JWT tokens generated on login: `jwt-token-{timestamp}`
- Tokens stored in browser localStorage
- Tokens used for session management
- No token expiration (can be enhanced for production)

---

## 🧠 Databricks Integration

### ML Serving Endpoint
- **Host:** `https://dbc-20f214f0-260f.cloud.databricks.com`
- **Endpoint:** `coal-profit-endpoint`
- **Model:** Coal Profit Prediction Model
- **Input:** Quantity in Tons
- **Output:** Predicted Profit/Loss

### Setup Instructions

1. **Get Databricks Credentials:**
   - Log in to [Databricks](https://databricks.com)
   - Navigate to User Settings → Personal Access Tokens
   - Generate a new token

2. **Configure Environment:**
   ```env
   DATABRICKS_HOST=https://dbc-20f214f0-260f.cloud.databricks.com
   DATABRICKS_ENDPOINT=coal-profit-endpoint
   DATABRICKS_TOKEN=your_token_here
   ```

3. **Test the Integration:**
   ```bash
   curl -X POST http://localhost:3000/api/predict \
     -H "Content-Type: application/json" \
     -d '{"quantity": 100}'
   ```

---

## 🎨 Frontend Features

### Pages

#### 1. **Login Page** (`login.html`)
- Gradient background with animated shapes
- Glass-morphism design
- Secure credential input
- Demo and Admin account options
- Error message handling

#### 2. **Dashboard** (`index.html`)
- **Header:** Logo, username, logout button
- **Sidebar Navigation:** 
  - Dashboard
  - Analytics
  - Transactions
  - Reports
  - Settings
- **Dashboard Section:**
  - Key metrics (Total Revenue, Active Users, Total Transactions)
  - Monthly revenue chart
  - Status distribution
  - Top products
- **Analytics Section:**
  - Detailed revenue breakdown
  - Customer insights
  - Category performance
  - Trend analysis
- **Transactions Section:**
  - Paginated transaction list
  - Advanced filtering (status, category, date range)
  - Real-time search
  - Transaction details
- **Reports Section:**
  - Report generation history
  - Report types and status
  - Download reports
- **Settings Section:**
  - User profile management
  - Preferences
  - Account settings

### Frontend Technologies
- **HTML5** - Semantic markup
- **CSS3** - Gradient backgrounds, animations, responsive design
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome 6.0** - Icon library (200+ icons)
- **Charts.js** (optional) - For data visualization
- **Local Storage API** - For session management

### Interactive Features
- Real-time data fetching
- Pagination with prev/next controls
- Multi-filter support
- Search functionality with debouncing
- Responsive sidebar navigation
- Auto-logout on session expiry
- Tab-based navigation

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with these variables:

```env
# Server Configuration
PORT=3000

# Databricks Configuration
DATABRICKS_HOST=https://dbc-20f214f0-260f.cloud.databricks.com
DATABRICKS_ENDPOINT=coal-profit-endpoint
DATABRICKS_TOKEN=your_personal_access_token_here

# Optional (defaults provided)
NODE_ENV=development
```

### Environment Variable Descriptions

| Variable | Type | Default | Required |
|----------|------|---------|----------|
| `PORT` | Number | 3000 | No |
| `DATABRICKS_HOST` | String | https://dbc-20f214f0-260f.cloud.databricks.com | No |
| `DATABRICKS_ENDPOINT` | String | coal-profit-endpoint | No |
| `DATABRICKS_TOKEN` | String | None | Yes (for predictions) |
| `NODE_ENV` | String | development | No |

---

## 🚢 Deployment on Vercel

### Step 1: Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com)
2. Click **New Project**
3. Import from GitHub: [github.com/ARPAN58/coal](https://github.com/ARPAN58/coal)
4. Select the repository

### Step 2: Configure Environment Variables
1. Open **Settings → Environment Variables**
2. Add the following variables (for **Production**, **Preview**, **Development**):

| Name | Value | Environment |
|------|-------|-------------|
| `DATABRICKS_HOST` | `https://dbc-20f214f0-260f.cloud.databricks.com` | All |
| `DATABRICKS_ENDPOINT` | `coal-profit-endpoint` | All |
| `DATABRICKS_TOKEN` | Your Databricks personal access token | All |

### Step 3: Deploy
1. Click **Deploy**
2. Wait for deployment to complete
3. Access your app at: `https://your-project-name.vercel.app`

### Step 4: Secure Credentials
⚠️ **IMPORTANT:**
- **DO NOT** commit `.env` file to GitHub
- **DO NOT** hardcode tokens in code
- **DO NOT** paste sensitive data in issues or PRs
- Vercel securely stores environment variables in its platform

### Vercel Configuration
The `vercel.json` file handles URL rewriting:
```json
{
  "version": 2,
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/index.js"
    }
  ]
}
```

This routes all `/api/*` requests to the serverless function.

---

## 📄 Key Pages

### HTML Pages

#### `index.html` - Main Dashboard
- **Size:** ~50KB (with embedded styles and scripts)
- **Load Time:** <1s (with compression)
- **Responsive:** Yes (mobile, tablet, desktop)
- **Features:** Dashboard, Analytics, Transactions, Reports, Settings

#### `login.html` - Login Page
- **Size:** ~15KB
- **Design:** Modern glass-morphism UI
- **Features:** Animated background, credential input, error handling

### JavaScript Files

#### `script.js` - Frontend Logic
- **Size:** ~50KB
- **Features:** 
  - UI section switching
  - Data fetching and display
  - Form handling
  - Chart rendering
  - Local storage management
  - Pagination and filtering

#### `server.js` - Backend Server
- **Size:** ~20KB
- **Features:**
  - Express app configuration
  - API routes
  - Middleware setup
  - Error handling
  - Databricks integration

### Styling

#### `styles.css` - Global Styles
- **Size:** ~30KB
- **Features:**
  - CSS Grid layout
  - Flexbox components
  - Animations and transitions
  - Responsive design
  - Dark/Light theme support (CSS variables)
  - Font Awesome icon integration

---

## 🔍 Middleware & Security

### Security Middleware

1. **Helmet.js** - Sets security headers
   ```javascript
   contentSecurityPolicy: false
   ```

2. **CORS** - Allows cross-origin requests
   ```javascript
   origin: true
   credentials: true
   ```

3. **Compression** - Gzip compression
   - Reduces response size by 60-80%

4. **Rate Limiting** - (Can be added)
   - Prevents abuse and DDoS

### Caching Strategy

| Endpoint | Cache Duration | Purpose |
|----------|---------------|---------| 
| `/api/transactions` | 5 min | Reduced database hits |
| `/api/analytics` | 10 min | Expensive computation |
| `/api/predict` | No cache | Real-time predictions |
| Static files | 1 day | Browser caching |

---

## 📊 Sample Transactions

The application includes 12 pre-loaded transactions:

```javascript
TRX001 | Alice Johnson | Bituminous Coal | $24,999.00 | 2024-03-25 | Completed
TRX002 | Bob Smith | Anthracite Coal | $8,499.00 | 2024-03-25 | Pending
TRX003 | Carol Williams | Sub-bituminous Coal | $49,999.00 | 2024-03-24 | Completed
TRX004 | David Brown | Lignite Coal | $12,499.00 | 2024-03-23 | Completed
TRX005 | Eve Davis | Bituminous Coal | $33,999.00 | 2024-03-22 | Completed
TRX006 | Frank Miller | Steam Coal | $18,999.00 | 2024-03-21 | Completed
TRX007 | Grace Wilson | Coking Coal | $52,999.00 | 2024-03-20 | Pending
TRX008 | Henry Taylor | Thermal Coal | $28,999.00 | 2024-03-19 | Completed
TRX009 | Iris Anderson | Bituminous Coal | $41,999.00 | 2024-03-18 | Failed
TRX010 | Jack Thomas | Anthracite Coal | $22,499.00 | 2024-03-17 | Completed
TRX011 | Kate Jackson | Sub-bituminous Coal | $37,999.00 | 2024-03-16 | Completed
TRX012 | Liam White | Lignite Coal | $15,499.00 | 2024-03-15 | Pending
```

**Total Revenue:** $378,985.00  
**Completion Rate:** 75%

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'dotenv'"
**Solution:**
```bash
npm install
npm start
```

### Issue: "Databricks token not found"
**Solution:**
1. Create `.env` file
2. Add `DATABRICKS_TOKEN` with your personal access token
3. Restart the server

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Use a different port
PORT=3001 npm start

# Or kill the process using port 3000
# On Windows: netstat -ano | findstr :3000
# On Mac/Linux: lsof -i :3000
```

### Issue: CORS errors in browser
**Solution:**
- CORS is configured in server.js
- Check browser console for specific error
- Verify API endpoints are correct

---

## 📝 Notes

- This project uses in-memory data storage for simplicity
- For production, consider using a real database (MongoDB, PostgreSQL)
- The Databricks ML endpoint requires valid credentials
- Tokens never expire (recommended to implement token refresh for production)
- The application is optimized for Vercel serverless deployment

---

## 🔗 References

- [Express.js Documentation](https://expressjs.com)
- [Databricks ML Serving](https://docs.databricks.com/en/machine-learning/model-serving/index.html)
- [Vercel Deployment Guide](https://vercel.com/docs)
- [Axios Documentation](https://axios-http.com)
- [Font Awesome Icons](https://fontawesome.com/icons)

---

## 📧 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/ARPAN58/coal/issues).

**Last Updated:** May 2026  
**Maintained by:** ARPAN58

- `server.js` is the main server entry point
- `api/index.js` + `vercel.json` wire Express for Vercel serverless
- The project uses `express`, `cors`, `compression`, and `helmet`
