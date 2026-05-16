// Sample data
const sampleData = {
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

let currentPage = 1;
const itemsPerPage = 5;
let dashboardFilteredTransactions = [...sampleData.transactions];

let currentTransactionPage = 1;
const transactionItemsPerPage = 8;
let transactionFilteredTransactions = [...sampleData.transactions];

let charts = {};
const reportHistory = [
    { id: 'RPT001', type: 'Monthly Revenue', created: '2024-04-01', status: 'Completed' },
    { id: 'RPT002', type: 'Transaction Summary', created: '2024-04-15', status: 'Completed' },
    { id: 'RPT003', type: 'Customer Insights', created: '2024-05-01', status: 'Processing' }
];

// Debounce helper
const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

// Initialize on load
document.addEventListener('DOMContentLoaded', async function() {
    if (!checkAuth()) {
        window.location.href = 'login.html';
        return;
    }

    await fetchTransactions();
    await loadMLData();
    initializeCharts();
    setupEventListeners();
    populateTransactionsPage();
    renderReportHistory();
    updateUserInfo();
});

// Fetch transactions
async function fetchTransactions() {
    try {
        const response = await fetch('/api/transactions');
        const data = await response.json();
        
        if (data.success) {
            sampleData.transactions = data.data;
            dashboardFilteredTransactions = [...data.data];
            transactionFilteredTransactions = [...data.data];
            populateTable();
            populateTransactionsPage();
            updateCharts();
        }
    } catch (error) {
        console.error('Error fetching transactions:', error);
        // Use sample data as fallback
        dashboardFilteredTransactions = [...sampleData.transactions];
        transactionFilteredTransactions = [...sampleData.transactions];
        populateTable();
        populateTransactionsPage();
        updateCharts();
    }
}

// Load ML data (placeholder for future ML integration)
async function loadMLData() {
    try {
        // Load enhanced analytics data
        await loadEnhancedAnalytics();
        console.log('Enhanced analytics data loaded');
    } catch (error) {
        console.error('Error loading ML data:', error);
    }
}

// Load enhanced analytics
async function loadEnhancedAnalytics() {
    try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        
        if (data.success) {
            updateDashboardStats(data.data);
            updateAnalyticsCharts(data.data);
        }
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// Update dashboard stats
function updateDashboardStats(analytics) {
    const dashboardStats = document.querySelectorAll('#dashboard-section .stat-card .stat-value');

    if (dashboardStats.length >= 1) {
        dashboardStats[0].textContent = '₹' + analytics.revenue.total.toLocaleString('en-IN');
    }
    if (dashboardStats.length >= 2) {
        dashboardStats[1].textContent = analytics.users.active.toLocaleString();
    }
    if (dashboardStats.length >= 3) {
        dashboardStats[2].textContent = analytics.transactions.total;
    }
    if (dashboardStats.length >= 4) {
        dashboardStats[3].textContent = analytics.transactions.completionRate + '%';
    }
}

// Render advanced analytics overview
function renderAnalyticsOverview(analytics) {
    const revenueTotal = document.getElementById('analyticsRevenueTotal');
    const revenueGrowth = document.getElementById('analyticsRevenueGrowth');
    const activeUsers = document.getElementById('analyticsActiveUsers');
    const userGrowth = document.getElementById('analyticsUserGrowth');
    const completionRate = document.getElementById('analyticsCompletionRate');
    const avgTx = document.getElementById('analyticsAvgTx');
    const topProductList = document.getElementById('topProductList');
    const highlightDelivery = document.getElementById('highlightDelivery');
    const highlightSatisfaction = document.getElementById('highlightSatisfaction');
    const highlightOpenIssues = document.getElementById('highlightOpenIssues');

    if (revenueTotal) {
        revenueTotal.textContent = '₹' + analytics.revenue.total.toLocaleString('en-IN');
    }
    if (revenueGrowth) {
        revenueGrowth.textContent = '+' + analytics.revenue.growth + '%';
    }
    if (activeUsers) {
        activeUsers.textContent = analytics.users.active.toLocaleString();
    }
    if (userGrowth) {
        userGrowth.textContent = '+' + analytics.users.growth + '%';
    }
    if (completionRate) {
        completionRate.textContent = analytics.transactions.completionRate + '%';
    }
    if (avgTx) {
        avgTx.textContent = '₹' + Math.round(analytics.revenue.avgTransactionValue).toLocaleString('en-IN');
    }

    if (topProductList) {
        topProductList.innerHTML = analytics.products.topProducts.map(product => `
            <li>
                <strong>${product.name}</strong>
                <span>${product.sales} sales • ₹${product.revenue.toLocaleString('en-IN')}</span>
            </li>
        `).join('');
    }

    if (highlightDelivery) {
        highlightDelivery.textContent = `On-time delivery: ${analytics.performance.onTimeDelivery}`;
    }
    if (highlightSatisfaction) {
        highlightSatisfaction.textContent = `Customer satisfaction: ${analytics.performance.customerSatisfaction}`;
    }
    if (highlightOpenIssues) {
        highlightOpenIssues.textContent = 'Open issues: 12';
    }
}

// Update analytics charts
function updateAnalyticsCharts(analytics) {
    const monthlyData = analytics.revenue.monthly || [];

    if (charts.revenue && monthlyData.length) {
        charts.revenue.data.labels = monthlyData.map(m => m.month);
        charts.revenue.data.datasets[0].data = monthlyData.map(m => m.revenue);
        charts.revenue.update();
    }

    if (charts.analyticsRevenue && monthlyData.length) {
        charts.analyticsRevenue.data.labels = monthlyData.map(m => m.month);
        charts.analyticsRevenue.data.datasets[0].data = monthlyData.map(m => m.revenue);
        charts.analyticsRevenue.update();
    }

    if (charts.categoryRevenue && analytics.revenue.categoryRevenue) {
        const categoryLabels = Object.keys(analytics.revenue.categoryRevenue);
        const categoryValues = Object.values(analytics.revenue.categoryRevenue);
        charts.categoryRevenue.data.labels = categoryLabels;
        charts.categoryRevenue.data.datasets[0].data = categoryValues;
        charts.categoryRevenue.update();
    }

    if (charts.transaction && analytics.transactions) {
        charts.transaction.data.datasets[0].data = [
            analytics.transactions.completed,
            analytics.transactions.pending,
            analytics.transactions.failed
        ];
        charts.transaction.update();
    }

    renderAnalyticsOverview(analytics);
}

// Initialize charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    charts.revenue = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [45000, 52000, 48000, 61000, 58000, 65000],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            return 'Revenue: ₹' + context.parsed.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '₹' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Dashboard Transaction Chart
    const transactionCtx = document.getElementById('transactionChart').getContext('2d');
    charts.transaction = new Chart(transactionCtx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'Pending', 'Failed'],
            datasets: [{
                data: [
                    sampleData.transactions.filter(t => t.status === 'completed').length,
                    sampleData.transactions.filter(t => t.status === 'pending').length,
                    sampleData.transactions.filter(t => t.status === 'failed').length
                ],
                backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                        }
                    }
                }
            }
        }
    });

    // Advanced analytics revenue chart
    const analyticsRevenueCtx = document.getElementById('analyticsRevenueChart').getContext('2d');
    charts.analyticsRevenue = new Chart(analyticsRevenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [45000, 52000, 48000, 61000, 58000, 65000],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value.toLocaleString()
                    }
                }
            }
        }
    });

    // Advanced analytics category chart
    const categoryCtx = document.getElementById('analyticsCategoryChart').getContext('2d');
    charts.categoryRevenue = new Chart(categoryCtx, {
        type: 'bar',
        data: {
            labels: ['Energy', 'Metallurgical'],
            datasets: [{
                label: 'Revenue',
                data: [125996, 52999],
                backgroundColor: ['#6366f1', '#14b8a6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 12,
                    titleFont: { size: 13, weight: 'bold' },
                    bodyFont: { size: 12 },
                    callbacks: {
                        label: context => '₹' + context.parsed.y.toLocaleString()
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => '₹' + value.toLocaleString()
                    }
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Dashboard search functionality
    const searchInput = document.getElementById('tableSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }

    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', handleStatusFilter);
    }

    // Transactions page search
    const transactionsSearch = document.getElementById('transactionsSearch');
    if (transactionsSearch) {
        transactionsSearch.addEventListener('input', debounce(handleTransactionSearch, 300));
    }

    const transactionsStatusFilter = document.getElementById('transactionsStatusFilter');
    if (transactionsStatusFilter) {
        transactionsStatusFilter.addEventListener('change', handleTransactionStatusFilter);
    }

    // Time filter
    const timeFilter = document.getElementById('timeFilter');
    if (timeFilter) {
        timeFilter.addEventListener('change', handleTimeFilter);
    }
}

// Handle dashboard search
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    dashboardFilteredTransactions = sampleData.transactions.filter(transaction => 
        transaction.id.toLowerCase().includes(searchTerm) ||
        transaction.customer.toLowerCase().includes(searchTerm) ||
        transaction.product.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    populateTable();
}

// Handle dashboard status filter
function handleStatusFilter(event) {
    const status = event.target.value;
    if (status) {
        dashboardFilteredTransactions = sampleData.transactions.filter(transaction => 
            transaction.status === status
        );
    } else {
        dashboardFilteredTransactions = [...sampleData.transactions];
    }
    currentPage = 1;
    populateTable();
}

// Handle transactions page search
function handleTransactionSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    transactionFilteredTransactions = sampleData.transactions.filter(transaction =>
        transaction.id.toLowerCase().includes(searchTerm) ||
        transaction.customer.toLowerCase().includes(searchTerm) ||
        transaction.product.toLowerCase().includes(searchTerm)
    );
    currentTransactionPage = 1;
    populateTransactionsPage();
}

// Handle transactions page status filter
function handleTransactionStatusFilter(event) {
    const status = event.target.value;
    if (status) {
        transactionFilteredTransactions = sampleData.transactions.filter(transaction =>
            transaction.status === status
        );
    } else {
        transactionFilteredTransactions = [...sampleData.transactions];
    }
    currentTransactionPage = 1;
    populateTransactionsPage();
}

// Handle time filter
function handleTimeFilter(event) {
    const timeFilter = event.target.value;
    console.log('Time filter changed to:', timeFilter);
    updateCharts(timeFilter);
}

// Populate dashboard table
function populateTable() {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = dashboardFilteredTransactions.slice(startIndex, endIndex);

    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No transactions found</td></tr>';
        return;
    }

    pageData.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.customer}</td>
            <td>${transaction.product}</td>
            <td><span class="category-badge">${transaction.category || 'N/A'}</span></td>
            <td>₹${transaction.amount.toFixed(2)}</td>
            <td>${formatDate(transaction.date)}</td>
            <td><span class="status-badge ${transaction.status}">${transaction.status}</span></td>
            <td>
                <button class="action-btn" onclick="viewTransaction('${transaction.id}')" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="editTransaction('${transaction.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="deleteTransaction('${transaction.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination();
}

// Populate transaction page table
function populateTransactionsPage() {
    const tableBody = document.getElementById('transactionsPageBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    const startIndex = (currentTransactionPage - 1) * transactionItemsPerPage;
    const endIndex = startIndex + transactionItemsPerPage;
    const pageData = transactionFilteredTransactions.slice(startIndex, endIndex);

    if (pageData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem;">No transactions found</td></tr>';
        return;
    }

    pageData.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.customer}</td>
            <td>${transaction.product}</td>
            <td><span class="category-badge">${transaction.category || 'N/A'}</span></td>
            <td>₹${transaction.amount.toFixed(2)}</td>
            <td>${formatDate(transaction.date)}</td>
            <td><span class="status-badge ${transaction.status}">${transaction.status}</span></td>
            <td>
                <button class="action-btn" onclick="viewTransaction('${transaction.id}')" title="View">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="editTransaction('${transaction.id}')" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn" onclick="deleteTransaction('${transaction.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateTransactionsPagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(dashboardFilteredTransactions.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
}

function updateTransactionsPagination() {
    const totalPages = Math.ceil(transactionFilteredTransactions.length / transactionItemsPerPage);
    document.getElementById('transactionsPageInfo').textContent = `Page ${currentTransactionPage} of ${totalPages}`;
}

// Change page
function changePage(direction) {
    const totalPages = Math.ceil(dashboardFilteredTransactions.length / itemsPerPage);
    const newPage = currentPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        populateTable();
    }
}

function changeTransactionsPage(direction) {
    const totalPages = Math.ceil(transactionFilteredTransactions.length / transactionItemsPerPage);
    const newPage = currentTransactionPage + direction;
    
    if (newPage >= 1 && newPage <= totalPages) {
        currentTransactionPage = newPage;
        populateTransactionsPage();
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// View transaction
function viewTransaction(id) {
    const transaction = sampleData.transactions.find(t => t.id === id);
    if (transaction) {
        alert(`Transaction: ${id}\nCustomer: ${transaction.customer}\nAmount: ₹${transaction.amount}\nStatus: ${transaction.status}`);
    }
}

// Edit transaction
function editTransaction(id) {
    const transaction = sampleData.transactions.find(t => t.id === id);
    if (transaction) {
        const newStatus = prompt(`Edit status for ${id}:`, transaction.status);
        if (newStatus && ['completed', 'pending', 'failed'].includes(newStatus)) {
            transaction.status = newStatus;
            dashboardFilteredTransactions = [...sampleData.transactions];
            transactionFilteredTransactions = [...sampleData.transactions];
            populateTable();
            populateTransactionsPage();
            updateCharts();
            // Refresh analytics data after transaction change
            loadEnhancedAnalytics();
        }
    }
}

// Delete transaction
function deleteTransaction(id) {
    if (confirm(`Delete transaction ${id}?`)) {
        const index = sampleData.transactions.findIndex(t => t.id === id);
        if (index > -1) {
            sampleData.transactions.splice(index, 1);
            dashboardFilteredTransactions = dashboardFilteredTransactions.filter(t => t.id !== id);
            transactionFilteredTransactions = transactionFilteredTransactions.filter(t => t.id !== id);
            populateTable();
            populateTransactionsPage();
            updateCharts();
            // Refresh analytics data after transaction change
            loadEnhancedAnalytics();
        }
    }
}

// Update charts
function updateCharts(timeFilter) {
    console.log(`Updating charts for: ${timeFilter}`);
}

// Export data
function exportData() {
    const csvContent = 'ID,Customer,Product,Amount,Date,Status\n' +
        sampleData.transactions.map(t => 
            `${t.id},${t.customer},${t.product},${t.amount},${t.date},${t.status}`
        ).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Refresh data
async function refreshData() {
    const refreshBtn = document.querySelector('.refresh-btn');
    const originalContent = refreshBtn.innerHTML;
    refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
    refreshBtn.disabled = true;

    try {
        await fetchTransactions();
        await loadMLData();
        populateTransactionsPage();
        renderReportHistory();
        updateUserInfo();
    } catch (error) {
        console.error('Error refreshing data:', error);
    } finally {
        refreshBtn.innerHTML = originalContent;
        refreshBtn.disabled = false;
    }
}

// Add transaction
function addTransaction() {
    alert('Add transaction feature coming soon...');
}

// Generate report
async function generateReport() {
    try {
        // Fetch latest analytics data
        const response = await fetch('/api/analytics');
        const data = await response.json();

        if (data.success) {
            const analytics = data.data;
            const reportDate = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Create report content
            const reportContent = {
                title: 'Executive Summary Report',
                date: reportDate,
                summary: {
                    totalRevenue: `₹${analytics.revenue.total.toLocaleString('en-IN')}`,
                    totalTransactions: analytics.transactions.total,
                    completionRate: `${analytics.transactions.completionRate}%`,
                    avgTransactionValue: `₹${Math.round(analytics.revenue.avgTransactionValue).toLocaleString('en-IN')}`,
                    activeUsers: analytics.users.active.toLocaleString()
                },
                topProducts: analytics.products.topProducts.map(p =>
                    `${p.name}: ${p.sales} sales (₹${p.revenue.toLocaleString('en-IN')})`
                ),
                categoryBreakdown: Object.entries(analytics.revenue.categoryRevenue).map(([cat, rev]) =>
                    `${cat}: ₹${rev.toLocaleString('en-IN')}`
                ),
                performance: {
                    onTimeDelivery: analytics.performance.onTimeDelivery,
                    customerSatisfaction: analytics.performance.customerSatisfaction,
                    avgProcessingTime: analytics.performance.avgProcessingTime
                }
            };

            // Add to report history
            const report = {
                id: 'RPT' + String(reportHistory.length + 1).padStart(3, '0'),
                type: 'Executive Summary',
                created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                status: 'Completed',
                content: reportContent
            };

            reportHistory.unshift(report);
            if (reportHistory.length > 6) {
                reportHistory.pop();
            }

            renderReportHistory();

            // Show report preview
            const preview = `
Report Generated: ${reportContent.date}

SUMMARY:
• Total Revenue: ${reportContent.summary.totalRevenue}
• Total Transactions: ${reportContent.summary.totalTransactions}
• Completion Rate: ${reportContent.summary.completionRate}
• Average Transaction: ${reportContent.summary.avgTransactionValue}
• Active Users: ${reportContent.summary.activeUsers}

TOP PRODUCTS:
${reportContent.topProducts.map(p => `• ${p}`).join('\n')}

CATEGORY BREAKDOWN:
${reportContent.categoryBreakdown.map(c => `• ${c}`).join('\n')}

PERFORMANCE METRICS:
• On-time Delivery: ${reportContent.performance.onTimeDelivery}
• Customer Satisfaction: ${reportContent.performance.customerSatisfaction}
• Avg Processing Time: ${reportContent.performance.avgProcessingTime}
            `;

            alert('Report generated successfully!\n\n' + preview);
        } else {
            alert('Failed to generate report: Could not fetch analytics data');
        }
    } catch (error) {
        console.error('Error generating report:', error);
        alert('Error generating report. Please try again.');
    }
}

function renderReportHistory() {
    const reportList = document.getElementById('reportHistoryList');
    if (!reportList) return;

    reportList.innerHTML = reportHistory.map(report => `
        <li>
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 500;">${report.type}</span>
                <span class="status-badge ${report.status === 'Completed' ? 'completed' : report.status === 'Processing' ? 'pending' : 'failed'}">${report.status}</span>
            </div>
            <span style="color: #6b7280; font-size: 0.9em;">Generated: ${report.created}</span>
            ${report.content ? `<span style="color: #059669; font-size: 0.9em;">Revenue: ${report.content.summary.totalRevenue}</span>` : ''}
        </li>
    `).join('');
}

// Add transaction
function addTransaction() {
    const customer = prompt('Customer Name:');
    const product = prompt('Product Name:');
    const amount = parseFloat(prompt('Amount (numeric):'));
    const category = prompt('Category:');
    const status = prompt('Status (completed, pending, failed):', 'completed');

    if (!customer || !product || isNaN(amount) || !status) {
        alert('Transaction creation cancelled or invalid input.');
        return;
    }

    const newTransaction = {
        id: 'TRX' + String(sampleData.transactions.length + 1).padStart(3, '0'),
        customer,
        product,
        category: category || 'General',
        amount,
        date: new Date().toISOString().split('T')[0],
        status: ['completed', 'pending', 'failed'].includes(status.toLowerCase()) ? status.toLowerCase() : 'pending'
    };

    sampleData.transactions.unshift(newTransaction);
    dashboardFilteredTransactions = [...sampleData.transactions];
    transactionFilteredTransactions = [...sampleData.transactions];
    currentPage = 1;
    currentTransactionPage = 1;
    populateTable();
    populateTransactionsPage();
    updateCharts();
    // Refresh analytics data after adding transaction
    loadEnhancedAnalytics();
    alert('New transaction added successfully.');
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');

        // Refresh data when switching sections
        if (sectionName === 'analytics' || sectionName === 'reports') {
            loadEnhancedAnalytics();
        } else if (sectionName === 'transactions') {
            populateTransactionsPage();
        }
    }

    // Update nav menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[href="#${sectionName}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Authentication
function checkAuth() {
    return sessionStorage.getItem('isLoggedIn') === 'true';
}

function updateUserInfo() {
    const username = sessionStorage.getItem('username') || 'Guest';
    document.querySelectorAll('.username').forEach(el => {
        el.textContent = username;
    });
}

function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    window.location.href = 'login.html';
}

// Add spin animation
function addSpinAnimation(element) {
    element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
}

// Remove spin animation
function removeSpinAnimation(element, originalContent) {
    element.innerHTML = originalContent;
}
