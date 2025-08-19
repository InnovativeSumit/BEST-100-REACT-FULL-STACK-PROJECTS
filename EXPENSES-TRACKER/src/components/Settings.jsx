import React, { useState } from 'react';
import { Save, Download, Upload, Trash2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useExpense } from '../context/ExpenseContext';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
];

function Settings() {
  const { 
    currency, 
    categories, 
    expenses,
    income,
    setCurrency, 
    addCategory 
  } = useExpense();

  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newIncomeCategory, setNewIncomeCategory] = useState('');

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };

  const handleAddExpenseCategory = () => {
    if (newExpenseCategory.trim() && !categories.expense.includes(newExpenseCategory.trim())) {
      addCategory('expense', newExpenseCategory.trim());
      setNewExpenseCategory('');
    }
  };

  const handleAddIncomeCategory = () => {
    if (newIncomeCategory.trim() && !categories.income.includes(newIncomeCategory.trim())) {
      addCategory('income', newIncomeCategory.trim());
      setNewIncomeCategory('');
    }
  };

  const exportData = () => {
    const data = {
      expenses,
      income,
      categories,
      currency,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.expenses && data.income && data.categories) {
            localStorage.setItem('expenseTrackerData', JSON.stringify(data));
            window.location.reload(); // Reload to apply imported data
          } else {
            alert('Invalid backup file format');
          }
        } catch (error) {
          alert('Error reading backup file');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.removeItem('expenseTrackerData');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Customize your expense tracker preferences
        </p>
      </div>

      {/* Currency Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Choose your preferred currency for displaying amounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Default Currency</Label>
            <Select value={currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.name} ({curr.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Categories Management */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Manage your expense and income categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Expense Categories */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Expense Categories</h3>
              <p className="text-sm text-muted-foreground">
                Add custom categories for your expenses
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New expense category"
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddExpenseCategory()}
              />
              <Button onClick={handleAddExpenseCategory}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.expense.map((category) => (
                <div
                  key={category}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Income Categories */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Income Categories</h3>
              <p className="text-sm text-muted-foreground">
                Add custom categories for your income sources
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="New income category"
                value={newIncomeCategory}
                onChange={(e) => setNewIncomeCategory(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddIncomeCategory()}
              />
              <Button onClick={handleAddIncomeCategory}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.income.map((category) => (
                <div
                  key={category}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Backup, restore, or clear your data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button onClick={exportData} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Import Data
              </Button>
            </div>

            <Button 
              variant="destructive" 
              onClick={clearAllData}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Export: Download your data as a JSON backup file</p>
            <p>• Import: Restore data from a previously exported backup file</p>
            <p>• Clear: Remove all expenses, income, and custom categories</p>
          </div>
        </CardContent>
      </Card>

      {/* App Information */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
          <CardDescription>
            Application information and statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Total Expenses:</span>
              <span className="ml-2">{expenses.length}</span>
            </div>
            <div>
              <span className="font-medium">Total Income:</span>
              <span className="ml-2">{income.length}</span>
            </div>
            <div>
              <span className="font-medium">Expense Categories:</span>
              <span className="ml-2">{categories.expense.length}</span>
            </div>
            <div>
              <span className="font-medium">Income Categories:</span>
              <span className="ml-2">{categories.income.length}</span>
            </div>
          </div>
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            <p>Expense Tracker v1.0.0</p>
            <p>Built with React + Vite</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;

