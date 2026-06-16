/* ========================================
   MoneyLens - Personal Budget Tracker
   Main JavaScript File - FULLY WORKING
   ======================================== */

// ========================
// Application State
// ========================
let transactions = [];
let expenseChart = null;
let currentFilter = { type: 'all', category: 'all' };

// ========================
// Storage Management
// ========================

function loadFromStorage() {
    const stored = localStorage.getItem("moneylens_transactions");
    if (stored) {
        try {
            transactions = JSON.parse(stored);
            console.log("✅ Loaded transactions from storage:", transactions.length);
        } catch(e) {
            console.error("Failed to parse stored data", e);
            transactions = [];
        }
    } else {
        transactions = [];
        console.log("📭 No stored data, starting fresh");
    }
    return transactions;
}

function saveToStorage() {
    localStorage.setItem("moneylens_transactions", JSON.stringify(transactions));
    console.log("💾 Saved transactions to storage:", transactions.length);
}

// ========================
// Data Calculation Functions
// ========================

function calculateTotals() {
    let totalIncome = 0;
    let totalExpense = 0;
    
    transactions.forEach(transaction => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });
    
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
}

function getCategoryExpenses() {
    const categories = {
        "Food": 0,
        "Transport": 0,
        "Utilities": 0,
        "Entertainment": 0,
        "Other": 0
    };
    
    transactions.forEach(transaction => {
        if (transaction.type === "expense") {
            const category = transaction.category;
            if (categories.hasOwnProperty(category)) {
                categories[category] += transaction.amount;
            } else {
                categories["Other"] += transaction.amount;
            }
        }
    });
    
    return categories;
}

// ========================
// Chart Functions
// ========================

function updateExpenseChart() {
    const canvas = document.getElementById("expenseChart");
    if (!canvas) return;
    
    const categoryExpenses = getCategoryExpenses();
    const ctx = canvas.getContext('2d');
    const labels = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Other'];
    const data = [
        categoryExpenses.Food,
        categoryExpenses.Transport,
        categoryExpenses.Utilities,
        categoryExpenses.Entertainment,
        categoryExpenses.Other
    ];
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
    
    // Check if there are any expenses
    const hasExpenses = data.some(value => value > 0);
    
    // Destroy existing chart if it exists
    if (expenseChart) {
        expenseChart.destroy();
        expenseChart = null;
    }
    
    if (!hasExpenses) {
        // Create a "no data" chart
        expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['No Expenses Yet'],
                datasets: [{
                    data: [1],
                    backgroundColor: ['#E2E8F0'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function() {
                                return 'Add expenses to see chart';
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    } else {
        // Create the actual expense chart
        expenseChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 11, family: 'Inter' },
                            boxWidth: 10
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: $${value.toFixed(2)} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

// ========================
// Dashboard UI Updates
// ========================

function updateDashboardUI() {
    const { totalIncome, totalExpense, balance } = calculateTotals();
    
    const totalIncomeSpan = document.getElementById("totalIncomeSpan");
    const totalExpenseSpan = document.getElementById("totalExpenseSpan");
    const balanceDisplay = document.getElementById("runningBalanceDisplay");
    
    if (totalIncomeSpan) totalIncomeSpan.innerHTML = `$${totalIncome.toFixed(2)}`;
    if (totalExpenseSpan) totalExpenseSpan.innerHTML = `$${totalExpense.toFixed(2)}`;
    
    if (balanceDisplay) {
        balanceDisplay.innerHTML = `$${balance.toFixed(2)}`;
        balanceDisplay.style.color = balance < 0 ? "#EF4444" : "#1E2F5E";
    }
    
    updateCategoryBreakdown();
    updateRecentTransactions();
    updateExpenseChart();
}

function updateCategoryBreakdown() {
    const categoryExpenses = getCategoryExpenses();
    
    const catFood = document.getElementById("catFood");
    const catTransport = document.getElementById("catTransport");
    const catUtilities = document.getElementById("catUtilities");
    const catEntertainment = document.getElementById("catEntertainment");
    const catOther = document.getElementById("catOther");
    
    if (catFood) catFood.innerHTML = `$${categoryExpenses.Food.toFixed(2)}`;
    if (catTransport) catTransport.innerHTML = `$${categoryExpenses.Transport.toFixed(2)}`;
    if (catUtilities) catUtilities.innerHTML = `$${categoryExpenses.Utilities.toFixed(2)}`;
    if (catEntertainment) catEntertainment.innerHTML = `$${categoryExpenses.Entertainment.toFixed(2)}`;
    if (catOther) catOther.innerHTML = `$${categoryExpenses.Other.toFixed(2)}`;
}

function updateRecentTransactions() {
    const container = document.getElementById("recentTransactionsList");
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = `<div class="empty-transactions">✨ No transactions yet. Add your first entry using the form above!</div>`;
        return;
    }
    
    // Show 5 most recent transactions (newest first)
    const recent = [...transactions].reverse().slice(0, 5);
    container.innerHTML = recent.map(transaction => `
        <div class="transaction-row">
            <div class="transaction-info">
                <span class="transaction-desc">${escapeHtml(transaction.description)}</span>
                <span class="transaction-cat">${transaction.category} • ${transaction.type === 'income' ? 'Income' : 'Expense'}</span>
            </div>
            <div class="transaction-amount">
                <span class="${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}">
                    ${transaction.type === 'income' ? '+' : '-'} $${transaction.amount.toFixed(2)}
                </span>
            </div>
        </div>
    `).join('');
}

// ========================
// Transactions Page Functions - FIXED
// ========================

function updateTransactionsPage() {
    const tableBody = document.getElementById("transactionsTableBody");
    if (!tableBody) {
        console.log("Not on transactions page");
        return;
    }
    
    console.log("🔄 Updating transactions page...");
    
    // Force reload from storage first
    loadFromStorage();
    
    // Update summary stats
    const { totalIncome, totalExpense, balance } = calculateTotals();
    const totalIncomeSpan = document.getElementById("pageTotalIncome");
    const totalExpenseSpan = document.getElementById("pageTotalExpense");
    const netBalanceSpan = document.getElementById("pageNetBalance");
    
    if (totalIncomeSpan) totalIncomeSpan.innerHTML = `$${totalIncome.toFixed(2)}`;
    if (totalExpenseSpan) totalExpenseSpan.innerHTML = `$${totalExpense.toFixed(2)}`;
    if (netBalanceSpan) {
        netBalanceSpan.innerHTML = `$${balance.toFixed(2)}`;
        netBalanceSpan.style.color = balance < 0 ? "#EF4444" : "#1E2F5E";
    }
    
    // Apply filters
    let filtered = [...transactions];
    if (currentFilter.type !== 'all') {
        filtered = filtered.filter(t => t.type === currentFilter.type);
    }
    if (currentFilter.category !== 'all') {
        filtered = filtered.filter(t => t.category === currentFilter.category);
    }
    
    // Sort by most recent first (newer transactions have higher IDs)
    filtered.sort((a, b) => b.id - a.id);
    
    console.log(`📊 Displaying ${filtered.length} transactions (${transactions.length} total)`);
    
    if (filtered.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="empty-table">📭 No transactions found. Add your first transaction on the Dashboard!</td></tr>`;
        return;
    }
    
    tableBody.innerHTML = filtered.map(transaction => `
        <tr>
            <td><strong>${escapeHtml(transaction.description)}</strong></td>
            <td><span class="category-badge">${transaction.category}</span></td>
            <td><span class="${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}">${transaction.type === 'income' ? '💰 Income' : '💸 Expense'}</span></td>
            <td class="${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}"><strong>${transaction.type === 'income' ? '+' : '-'} $${transaction.amount.toFixed(2)}</strong></td>
            <td>
                <button class="delete-row-btn" data-id="${transaction.id}" title="Delete transaction">🗑️</button>
            </td>
        </tr>
    `).join('');
    
    // Add delete event listeners to all delete buttons
    document.querySelectorAll('.delete-row-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(button.getAttribute('data-id'));
            deleteTransactionById(id);
        });
    });
}

// ========================
// Transaction CRUD Operations
// ========================

function addTransaction(description, amount, type, category) {
    if (!description || description.trim() === "") {
        alert("Please enter a description");
        return false;
    }
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
        alert("Please enter a valid positive amount");
        return false;
    }
    
    const newTransaction = {
        id: Date.now(),
        description: description.trim(),
        amount: amountNum,
        type: type,
        category: category,
    };
    
    transactions.push(newTransaction);
    saveToStorage();
    console.log("➕ Added transaction:", newTransaction);
    
    // Update dashboard if we're on it
    if (document.getElementById("runningBalanceDisplay")) {
        updateDashboardUI();
    }
    
    // Update transactions page if we're on it
    if (document.getElementById("transactionsTableBody")) {
        updateTransactionsPage();
    }
    
    return true;
}

function deleteTransactionById(id) {
    console.log("🗑️ Deleting transaction:", id);
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveToStorage();
    
    // Update dashboard if we're on it
    if (document.getElementById("runningBalanceDisplay")) {
        updateDashboardUI();
    }
    
    // Update transactions page if we're on it
    if (document.getElementById("transactionsTableBody")) {
        updateTransactionsPage();
    }
}

function clearAllTransactions() {
    if (transactions.length === 0) {
        alert("No transactions to clear.");
        return;
    }
    
    if (confirm("⚠️ Are you sure you want to delete ALL transactions? This cannot be undone.")) {
        transactions = [];
        saveToStorage();
        console.log("🗑️ Cleared all transactions");
        
        // Update dashboard if we're on it
        if (document.getElementById("runningBalanceDisplay")) {
            updateDashboardUI();
        }
        
        // Update transactions page if we're on it
        if (document.getElementById("transactionsTableBody")) {
            updateTransactionsPage();
        }
    }
}

// ========================
// Helper Functions
// ========================

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ========================
// Event Listeners Setup
// ========================

function setupEventListeners() {
    // Dashboard transaction form
    const transactionForm = document.getElementById("transactionForm");
    if (transactionForm) {
        transactionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const description = document.getElementById("descInput").value;
            const amount = document.getElementById("amountInput").value;
            const type = document.getElementById("typeSelect").value;
            const category = document.getElementById("categorySelect").value;
            
            if (addTransaction(description, amount, type, category)) {
                transactionForm.reset();
                document.getElementById("descInput").focus();
            }
        });
    }
    
    // Clear All button on Dashboard
    const clearAllDashboardBtn = document.getElementById("clearAllFromDashboardBtn");
    if (clearAllDashboardBtn) {
        clearAllDashboardBtn.addEventListener("click", clearAllTransactions);
    }
    
    // Transactions page filter controls
    const filterType = document.getElementById("filterType");
    const filterCategory = document.getElementById("filterCategory");
    const resetFiltersBtn = document.getElementById("resetFiltersBtn");
    const clearAllBtn = document.getElementById("clearAllBtn");
    
    if (filterType) {
        filterType.addEventListener("change", (e) => {
            currentFilter.type = e.target.value;
            updateTransactionsPage();
        });
    }
    
    if (filterCategory) {
        filterCategory.addEventListener("change", (e) => {
            currentFilter.category = e.target.value;
            updateTransactionsPage();
        });
    }
    
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener("click", () => {
            currentFilter = { type: 'all', category: 'all' };
            if (filterType) filterType.value = 'all';
            if (filterCategory) filterCategory.value = 'all';
            updateTransactionsPage();
        });
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener("click", clearAllTransactions);
    }
    
    // Contact form on about page
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const subject = document.getElementById("contactSubject").value;
            const message = document.getElementById("contactMessage").value;
            const formMessage = document.getElementById("formMessage");
            
            if (name && email && subject && message) {
                formMessage.className = "form-message success";
                formMessage.innerHTML = "✅ Thank you for your message! We'll get back to you soon.";
                formMessage.style.display = "block";
                contactForm.reset();
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 5000);
            } else {
                formMessage.className = "form-message error";
                formMessage.innerHTML = "❌ Please fill out all fields.";
                formMessage.style.display = "block";
                setTimeout(() => {
                    formMessage.style.display = "none";
                }, 3000);
            }
        });
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
            const navLinks = document.querySelector(".nav-links");
            if (navLinks) navLinks.classList.toggle("show");
        });
    }
    
    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', (e) => {
        if (e.key === 'moneylens_transactions') {
            console.log('🔄 Storage changed in another tab, reloading...');
            loadFromStorage();
            if (document.getElementById("runningBalanceDisplay")) {
                updateDashboardUI();
            }
            if (document.getElementById("transactionsTableBody")) {
                updateTransactionsPage();
            }
        }
    });
}

// ========================
// Application Initialization
// ========================

function init() {
    console.log("🚀 Initializing application...");
    loadFromStorage();
    setupEventListeners();
    
    // Check which page we're on and update accordingly
    if (document.getElementById("runningBalanceDisplay")) {
        console.log("📱 On Dashboard page");
        updateDashboardUI();
    }
    
    if (document.getElementById("transactionsTableBody")) {
        console.log("📋 On Transactions page");
        updateTransactionsPage();
    }
}

// Start the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Also run if page is loaded via back/forward cache
window.addEventListener('pageshow', function(e) {
    if (e.persisted) {
        console.log('🔄 Page loaded from bfcache, reloading data...');
        loadFromStorage();
        if (document.getElementById("runningBalanceDisplay")) {
            updateDashboardUI();
        }
        if (document.getElementById("transactionsTableBody")) {
            updateTransactionsPage();
        }
    }
});