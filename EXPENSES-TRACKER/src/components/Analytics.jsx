import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useExpense } from '../context/ExpenseContext';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

function Analytics() {
  const { 
    expenses, 
    income, 
    expensesByCategory, 
    incomeByCategory, 
    currency,
    totalExpenses,
    totalIncome,
    balance
  } = useExpense();

  const [timeRange, setTimeRange] = useState('all');

  // Filter data based on time range
  const filteredData = useMemo(() => {
    const now = new Date();
    let startDate = new Date(0); // Beginning of time

    switch (timeRange) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(0);
    }

    const filteredExpenses = expenses.filter(expense => new Date(expense.date) >= startDate);
    const filteredIncome = income.filter(incomeItem => new Date(incomeItem.date) >= startDate);

    return { filteredExpenses, filteredIncome };
  }, [expenses, income, timeRange]);

  // Prepare chart data
  const expenseChartData = useMemo(() => {
    const categoryTotals = {};
    filteredData.filteredExpenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + parseFloat(expense.amount);
    });
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [filteredData.filteredExpenses]);

  const incomeChartData = useMemo(() => {
    const categoryTotals = {};
    filteredData.filteredIncome.forEach(incomeItem => {
      categoryTotals[incomeItem.category] = (categoryTotals[incomeItem.category] || 0) + parseFloat(incomeItem.amount);
    });
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [filteredData.filteredIncome]);

  // Monthly trend data
  const monthlyTrendData = useMemo(() => {
    const monthlyData = {};
    
    // Process expenses
    filteredData.filteredExpenses.forEach(expense => {
      const monthKey = new Date(expense.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, expenses: 0, income: 0 };
      }
      monthlyData[monthKey].expenses += parseFloat(expense.amount);
    });

    // Process income
    filteredData.filteredIncome.forEach(incomeItem => {
      const monthKey = new Date(incomeItem.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { month: monthKey, expenses: 0, income: 0 };
      }
      monthlyData[monthKey].income += parseFloat(incomeItem.amount);
    });

    return Object.values(monthlyData).sort((a, b) => new Date(a.month) - new Date(b.month));
  }, [filteredData]);

  // Calculate totals for filtered period
  const periodTotals = useMemo(() => {
    const totalExpensesFiltered = filteredData.filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    const totalIncomeFiltered = filteredData.filteredIncome.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.amount), 0);
    const balanceFiltered = totalIncomeFiltered - totalExpensesFiltered;

    return { totalExpensesFiltered, totalIncomeFiltered, balanceFiltered };
  }, [filteredData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  // Top spending categories
  const topSpendingCategories = useMemo(() => {
    return expenseChartData
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [expenseChartData]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights into your financial patterns
          </p>
        </div>
        <div className="sm:w-48">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(periodTotals.totalIncomeFiltered)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredData.filteredIncome.length} transaction{filteredData.filteredIncome.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(periodTotals.totalExpensesFiltered)}
            </div>
            <p className="text-xs text-muted-foreground">
              {filteredData.filteredExpenses.length} transaction{filteredData.filteredExpenses.length !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${periodTotals.balanceFiltered >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(periodTotals.balanceFiltered)}
            </div>
            <p className="text-xs text-muted-foreground">
              {periodTotals.balanceFiltered >= 0 ? 'Surplus' : 'Deficit'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>
              Distribution of your spending across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            {expenseChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No expense data for selected period
              </div>
            )}
          </CardContent>
        </Card>

        {/* Income Categories Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Income by Category</CardTitle>
            <CardDescription>
              Distribution of your income sources
            </CardDescription>
          </CardHeader>
          <CardContent>
            {incomeChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={incomeChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {incomeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                No income data for selected period
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trend</CardTitle>
          <CardDescription>
            Income vs Expenses over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {monthlyTrendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="income" 
                  stackId="1" 
                  stroke="#00C49F" 
                  fill="#00C49F" 
                  fillOpacity={0.6}
                  name="Income"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2" 
                  stroke="#FF8042" 
                  fill="#FF8042" 
                  fillOpacity={0.6}
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              No data available for trend analysis
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Spending Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Spending Categories</CardTitle>
          <CardDescription>
            Your highest expense categories for the selected period
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topSpendingCategories.length > 0 ? (
            <div className="space-y-4">
              {topSpendingCategories.map((category, index) => (
                <div key={category.name} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                      {index + 1}
                    </div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">
                      {formatCurrency(category.value)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {((category.value / periodTotals.totalExpensesFiltered) * 100).toFixed(1)}% of total
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No expense data available for the selected period
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Analytics;

