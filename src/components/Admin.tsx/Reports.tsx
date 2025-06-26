import { useState } from 'react';
import { useExpenseState } from '@/hooks/useExpenses';
import { useUserState } from '@/hooks/useUser';
import { useCategoryState } from '@/hooks/useCategories';

function Reports() {
  const { data: expenses, isLoading: expensesLoading } = useExpenseState();
  const { data: users, isLoading: usersLoading } = useUserState();
  const { data: categories, isLoading: categoriesLoading } = useCategoryState();
  
  const [dateRange, setDateRange] = useState('30');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const isLoading = expensesLoading || usersLoading || categoriesLoading;

  // Generate comprehensive reports
  const generateReports = () => {
    if (!expenses || !users || !categories) return null;

    const now = new Date();
    const daysAgo = parseInt(dateRange);
    const startDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);

    // Filter expenses by date range and category
    const filteredExpenses = expenses.filter((expense: any) => {
      const expenseDate = new Date(expense.date);
      const withinDateRange = expenseDate >= startDate && expenseDate <= now;
      const matchesCategory = selectedCategory === 'all' || expense.categoryId === parseInt(selectedCategory);
      return withinDateRange && matchesCategory;
    });

    // User spending report
    const userSpending = users.map((user: any) => {
      const userExpenses = filteredExpenses.filter((expense: any) => expense.userId === user.id);
      const totalSpent = userExpenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount || '0'), 0);
      return {
        ...user,
        totalSpent,
        expenseCount: userExpenses.length,
        averageExpense: userExpenses.length > 0 ? totalSpent / userExpenses.length : 0,
      };
    });

    // Category spending report
    const categorySpending = categories.map((category: any) => {
      const categoryExpenses = filteredExpenses.filter((expense: any) => expense.categoryId === category.id);
      const totalSpent = categoryExpenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount || '0'), 0);
      return {
        ...category,
        totalSpent,
        expenseCount: categoryExpenses.length,
      };
    });

    // Daily spending trend
    const dailySpending = [];
    for (let i = daysAgo - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dayExpenses = filteredExpenses.filter((expense: any) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.toDateString() === date.toDateString();
      });
      const total = dayExpenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount || '0'), 0);
      dailySpending.push({
        date: date.toLocaleDateString(),
        total,
        count: dayExpenses.length,
      });
    }

    const totalAmount = filteredExpenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount || '0'), 0);

    return {
      filteredExpenses,
      userSpending: userSpending.sort((a: any, b: any) => b.totalSpent - a.totalSpent),
      categorySpending: categorySpending.sort((a: any, b: any) => b.totalSpent - a.totalSpent),
      dailySpending,
      totalAmount,
      totalTransactions: filteredExpenses.length,
      averageTransaction: filteredExpenses.length > 0 ? totalAmount / filteredExpenses.length : 0,
    };
  };

  const reports = generateReports();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating reports...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories?.map((category: any) => (
              <option key={category.id} value={category.id.toString()}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {reports ? (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Amount</h3>
                  <p className="text-2xl font-bold text-blue-600">${reports.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">📊</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Transactions</h3>
                  <p className="text-2xl font-bold text-green-600">{reports.totalTransactions}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-xl">📈</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Average</h3>
                  <p className="text-2xl font-bold text-purple-600">${reports.averageTransaction.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* User Spending Report */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">User Spending Report</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.userSpending.map((user: any) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${user.totalSpent.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.expenseCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${user.averageExpense.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Spending Report */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Category Spending Report</h2>
            <div className="space-y-4">
              {reports.categorySpending.map((category: any) => {
                const percentage = reports.totalAmount > 0 ? (category.totalSpent / reports.totalAmount) * 100 : 0;
                return (
                  <div key={category.id} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-gray-900">{category.name}</span>
                        <span className="text-sm font-semibold text-gray-700">
                          ${category.totalSpent.toFixed(2)} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {category.expenseCount} transactions
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Daily Spending Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Daily Spending Trend</h2>
            <div className="space-y-2">
              {reports.dailySpending.slice(-10).map((day: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-600">{day.date}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium">${day.total.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">({day.count} transactions)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Report Data Available</h3>
          <p className="text-gray-600 mb-4">Add some expenses to generate comprehensive reports.</p>
        </div>
      )}
    </div>
  );
}

export default Reports;
