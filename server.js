require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const compression = require('compression');
const helmet = require('helmet');

const DATABRICKS_HOST = process.env.DATABRICKS_HOST || 'https://dbc-20f214f0-260f.cloud.databricks.com';
const DATABRICKS_ENDPOINT = process.env.DATABRICKS_ENDPOINT || 'coal-profit-endpoint';

const app = express();
const PORT = process.env.PORT || 3000;

const dataFilePath = path.join(__dirname, 'data.json');

const defaultData = {
  users: {
    demo: {
      password: 'demo123',
      username: 'demo',
      email: 'demo@dataviz.com'
    },
    admin: {
      password: 'admin@2024',
      username: 'admin',
      email: 'admin@dataviz.com'
    }
  },
  transactions: [
    { id: 'TRX001', customer: 'Alice Johnson', product: 'Bituminous Coal', amount: 24999.00, date: '2024-03-25', status: 'completed', category: 'Energy' },
    { id: 'TRX002', customer: 'Bob Smith', product: 'Anthracite Coal', amount: 8499.00, date: '2024-03-25', status: 'pending', category: 'Energy' },
    { id: 'TRX003', customer: 'Carol Williams', product: 'Sub-bituminous Coal', amount: 49999.00, date: '2024-03-24', status: 'completed', category: 'Energy' },
    { id: 'TRX004', customer: 'David Brown', product: 'Lignite Coal', amount: 12499.00, date: '2024-03-23', status: 'completed', category: 'Energy' },
    { id: 'TRX005', customer: 'Eve Davis', product: 'Bituminous Coal', amount: 33999.00, date: '2024-03-22', status: 'completed', category: 'Energy' },
    { id: 'TRX006', customer: 'Frank Miller', product: 'Steam Coal', amount: 18999.00, date: '2024-03-21', status: 'completed', category: 'Energy' },
    { id: 'TRX007', customer: 'Grace Wilson', product: 'Coking Coal', amount: 52999.00, date: '2024-03-20', status: 'pending', category: 'Metallurgical' },
    { id: 'TRX008', customer: 'Henry Taylor', product: 'Thermal Coal', amount: 28999.00, date: '2024-03-19', status: 'completed', category: 'Energy' },
    { id: 'TRX009', customer: 'Iris Anderson', product: 'Bituminous Coal', amount: 41999.00, date: '2024-03-18', status: 'failed', category: 'Energy' },
    { id: 'TRX010', customer: 'Jack Thomas', product: 'Anthracite Coal', amount: 22499.00, date: '2024-03-17', status: 'completed', category: 'Energy' },
    { id: 'TRX011', customer: 'Kate Jackson', product: 'Sub-bituminous Coal', amount: 37999.00, date: '2024-03-16', status: 'completed', category: 'Energy' },
    { id: 'TRX012', customer: 'Liam White', product: 'Lignite Coal', amount: 15499.00, date: '2024-03-15', status: 'pending', category: 'Energy' }
  ]
};

let dataStore;
try {
  // Requiring data.json directly ensures Vercel bundles it with serverless functions
  dataStore = require('./data.json');
} catch (error) {
  console.warn('data.json not found or failed to load, using default data.');
  dataStore = defaultData;
}
const users = dataStore.users;
const transactions = dataStore.transactions;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(compression());

// Body parser middleware - MUST come before routes
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS
app.use(cors({ origin: true, credentials: true }));

// Static files
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',
  etag: false,
  lastModified: false
}));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Cache control middleware
const cacheControl = (maxAge = 3600) => (req, res, next) => {
  res.set('Cache-Control', `public, max-age=${maxAge}`);
  next();
};

// API Routes

// Login endpoint
app.post('/api/login', (req, res) => {
  try {
    console.log('Login request received:', req.body);
    
    let username, password;
    try {
      username = req.body.username;
      password = req.body.password;
    } catch (parseError) {
      console.log('JSON parse error:', parseError);
      return res.status(400).json({ success: false, message: 'Invalid JSON format' });
    }
    
    console.log('Parsed credentials:', { username, password: '***' });
    console.log('Available users:', Object.keys(users));

    if (!username || !password) {
      console.log('Missing credentials');
      return res.status(400).json({ success: false, message: 'Username and password required' });
    }

    const user = users[username];
    console.log('User found:', !!user);
    
    if (!user || user.password !== password) {
      console.log('Invalid credentials - user not found or password mismatch');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    console.log('Login successful for:', username);
    res.json({
      success: true,
      message: 'Login successful',
      token: 'jwt-token-' + Date.now(),
      user: { username: user.username, email: user.email }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get transactions
app.get('/api/transactions', cacheControl(300), (req, res) => {
  try {
    res.json({
      success: true,
      data: transactions,
      total: transactions.length
    });
  } catch (error) {
    console.error('Transactions error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Add a new transaction record
app.post('/api/transactions', (req, res) => {
  try {
    const { customer, product, category, amount, status, date } = req.body;

    if (!customer || !product || amount === undefined || !status) {
      return res.status(400).json({ success: false, message: 'Missing required transaction fields' });
    }

    const newId = 'TRX' + String(transactions.length + 1).padStart(3, '0');
    const newTransaction = {
      id: newId,
      customer: String(customer).trim(),
      product: String(product).trim(),
      category: String(category || 'General').trim(),
      amount: Number(amount),
      date: String(date || new Date().toISOString().split('T')[0]),
      status: String(status).toLowerCase()
    };

    transactions.unshift(newTransaction);
    res.status(201).json({ success: true, data: newTransaction });
  } catch (error) {
    console.error('Add transaction error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get analytics data
app.get('/api/analytics', cacheControl(600), (req, res) => {
  try {
    const completedTransactions = transactions.filter(t => t.status === 'completed');
    const pendingTransactions = transactions.filter(t => t.status === 'pending');
    const failedTransactions = transactions.filter(t => t.status === 'failed');

    const totalRevenue = completedTransactions.reduce((sum, t) => sum + t.amount, 0);
    const avgTransactionValue = completedTransactions.length > 0 ? totalRevenue / completedTransactions.length : 0;

    const categoryRevenue = {};
    completedTransactions.forEach(t => {
      if (!categoryRevenue[t.category]) {
        categoryRevenue[t.category] = 0;
      }
      categoryRevenue[t.category] += t.amount;
    });

    // Calculate monthly revenue from actual transaction dates
    const monthlyRevenue = {};
    completedTransactions.forEach(t => {
      const date = new Date(t.date);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      if (!monthlyRevenue[monthKey]) {
        monthlyRevenue[monthKey] = 0;
      }
      monthlyRevenue[monthKey] += t.amount;
    });

    const monthlyRevenueArray = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
      month,
      revenue
    })).sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });

    // Calculate top products from actual data
    const productStats = {};
    completedTransactions.forEach(t => {
      if (!productStats[t.product]) {
        productStats[t.product] = { sales: 0, revenue: 0 };
      }
      productStats[t.product].sales += 1;
      productStats[t.product].revenue += t.amount;
    });

    const topProducts = Object.entries(productStats)
      .map(([name, stats]) => ({ name, sales: stats.sales, revenue: stats.revenue }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 4);

    const analytics = {
      revenue: {
        total: totalRevenue,
        growth: 12.5,
        monthly: monthlyRevenueArray,
        avgTransactionValue: avgTransactionValue,
        categoryRevenue: categoryRevenue
      },
      users: {
        total: 2456,
        active: 1823,
        growth: 8.2,
        newThisMonth: 156
      },
      transactions: {
        total: transactions.length,
        completed: completedTransactions.length,
        pending: pendingTransactions.length,
        failed: failedTransactions.length,
        completionRate: transactions.length > 0 ? (completedTransactions.length / transactions.length * 100).toFixed(1) : '0'
      },
      products: {
        topProducts: topProducts
      },
      performance: {
        avgProcessingTime: '2.3 hours',
        onTimeDelivery: '94.2%',
        customerSatisfaction: '4.6/5.0'
      }
    };

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Databricks model serving — coal-profit-endpoint
app.post('/api/predict', async (req, res) => {
  const token = process.env.DATABRICKS_TOKEN;
  const { quantity } = req.body;

  if (!token) {
    return res.status(503).json({
      success: false,
      message: 'Databricks not configured. Set DATABRICKS_TOKEN in your .env file.'
    });
  }

  if (quantity === undefined || quantity === null || quantity === '') {
    return res.status(400).json({ success: false, message: 'Quantity is required' });
  }

  try {
    const response = await axios.post(
      `${DATABRICKS_HOST}/serving-endpoints/${DATABRICKS_ENDPOINT}/invocations`,
      {
        dataframe_records: [{ Quantity_Tons: Number(quantity) }]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({ success: true, data: response.data });
  } catch (error) {
    const details = error.response?.data;
    console.error('Databricks predict error:', details || error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: details?.message || error.message
    });
  }
});

// Serve HTML files
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'login.html')));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Not found' }));

module.exports = app;

// Local dev only — Vercel uses api/index.js as a serverless handler
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Coal Supply running on http://localhost:${PORT}`);
      console.log(`📊 Dashboard: http://localhost:${PORT}`);
      console.log(`🔐 Login: http://localhost:${PORT}/login.html`);
  });
}
