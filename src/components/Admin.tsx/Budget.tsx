import { useState } from 'react';
import { useExpenseState } from '@/hooks/useExpenses';
import { useCategoryState } from '@/hooks/useCategories';

function Budget() {
  const { data: expenses, isLoading: expensesLoading } = useExpenseState();
  const { data: categories, isLoading: categoriesLoading } = useCategoryState();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const isLoading = expensesLoading || categoriesLoading;

  // Calculate budget analytics from expenses data
  const calculateBudgetStats = () => {
    if (!expenses || !categories) return null;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Filter expenses by selected period
    const filteredExpenses = expenses.filter((expense: any) => {
      const expenseDate = new Date(expense.date);
      if (selectedPeriod === 'month') {
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
      } else if (selectedPeriod === 'year') {
        return expenseDate.getFullYear() === currentYear;
      }
      return true;
    });

    // Calculate spending by category
    const categorySpending = categories.map((category: any) => {
      const categoryExpenses = filteredExpenses.filter((expense: any) => expense.categoryId === category.id);
      const totalSpent = categoryExpenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount || '0'), 0);
      return {
        ...category,
        totalSpent,
        expenseCount: categoryExpenses.length,
      };
    });

    const totalSpent = filteredExpenses.reduce((sum: number, expense: any) => sum + parseFloat(expense.amount || '0'), 0);

    return {
      totalSpent,
      categorySpending,
      expenseCount: filteredExpenses.length,
      averageExpense: filteredExpenses.length > 0 ? totalSpent / filteredExpenses.length : 0,
    };
  };

  const budgetStats = calculateBudgetStats();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Budget Overview</h1>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading budget data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Budget Overview</h1>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {budgetStats ? (
        <>
          {/* Budget Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-xl">💰</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Total Spent</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    ${budgetStats.totalSpent.toFixed(2)}
                  </p>
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
                  <p className="text-2xl font-bold text-green-600">{budgetStats.expenseCount}</p>
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
                  <p className="text-2xl font-bold text-purple-600">
                    ${budgetStats.averageExpense.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xl">🏷️</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
                  <p className="text-2xl font-bold text-orange-600">
                    {budgetStats.categorySpending.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Category Spending Breakdown */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Spending by Category</h2>
            <div className="space-y-4">
              {budgetStats.categorySpending
                .sort((a: any, b: any) => b.totalSpent - a.totalSpent)
                .map((category: any) => {
                  const percentage = budgetStats.totalSpent > 0 ? (category.totalSpent / budgetStats.totalSpent) * 100 : 0;
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
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{category.expenseCount} transactions</span>
                          <span>Avg: ${category.expenseCount > 0 ? (category.totalSpent / category.expenseCount).toFixed(2) : '0.00'}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Budget Recommendations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Budget Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">💡 Spending Pattern</h3>
                <p className="text-blue-700 text-sm">
                  Your highest spending category is{' '}
                  <strong>{budgetStats.categorySpending.sort((a: any, b: any) => b.totalSpent - a.totalSpent)[0]?.name || 'N/A'}</strong>.
                  Consider setting a budget limit for this category.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">📅 Period Summary</h3>
                <p className="text-green-700 text-sm">
                  You've made <strong>{budgetStats.expenseCount}</strong> transactions with an average of{' '}
                  <strong>${budgetStats.averageExpense.toFixed(2)}</strong> per transaction.
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">💰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Budget Data Available</h3>
          <p className="text-gray-600 mb-4">Start by adding some expenses to see your budget overview.</p>
        </div>
      )}
    </div>
  );
}

export default Budget;
