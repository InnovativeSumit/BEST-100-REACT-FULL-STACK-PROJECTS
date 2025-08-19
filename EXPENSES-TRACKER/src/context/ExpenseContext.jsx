import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  expenses: [],
  income: [],
  categories: {
    expense: ['Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 'Bills & Utilities', 'Healthcare', 'Travel', 'Education', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Business', 'Gift', 'Other']
  },
  currency: 'USD',
  budget: {
    monthly: 0,
    categories: {}
  }
};

// Action types
const ActionTypes = {
  ADD_EXPENSE: 'ADD_EXPENSE',
  UPDATE_EXPENSE: 'UPDATE_EXPENSE',
  DELETE_EXPENSE: 'DELETE_EXPENSE',
  ADD_INCOME: 'ADD_INCOME',
  UPDATE_INCOME: 'UPDATE_INCOME',
  DELETE_INCOME: 'DELETE_INCOME',
  ADD_CATEGORY: 'ADD_CATEGORY',
  SET_CURRENCY: 'SET_CURRENCY',
  SET_BUDGET: 'SET_BUDGET',
  LOAD_DATA: 'LOAD_DATA'
};

// Reducer function
function expenseReducer(state, action) {
  switch (action.type) {
    case ActionTypes.ADD_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload, id: Date.now().toString() }]
      };
    
    case ActionTypes.UPDATE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      };
    
    case ActionTypes.DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      };
    
    case ActionTypes.ADD_INCOME:
      return {
        ...state,
        income: [...state.income, { ...action.payload, id: Date.now().toString() }]
      };
    
    case ActionTypes.UPDATE_INCOME:
      return {
        ...state,
        income: state.income.map(income =>
          income.id === action.payload.id ? action.payload : income
        )
      };
    
    case ActionTypes.DELETE_INCOME:
      return {
        ...state,
        income: state.income.filter(income => income.id !== action.payload)
      };
    
    case ActionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: {
          ...state.categories,
          [action.payload.type]: [...state.categories[action.payload.type], action.payload.name]
        }
      };
    
    case ActionTypes.SET_CURRENCY:
      return {
        ...state,
        currency: action.payload
      };
    
    case ActionTypes.SET_BUDGET:
      return {
        ...state,
        budget: { ...state.budget, ...action.payload }
      };
    
    case ActionTypes.LOAD_DATA:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
}

// Create context
const ExpenseContext = createContext();

// Provider component
export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('expenseTrackerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: ActionTypes.LOAD_DATA, payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('expenseTrackerData', JSON.stringify(state));
  }, [state]);

  // Action creators
  const actions = {
    addExpense: (expense) => dispatch({ type: ActionTypes.ADD_EXPENSE, payload: expense }),
    updateExpense: (expense) => dispatch({ type: ActionTypes.UPDATE_EXPENSE, payload: expense }),
    deleteExpense: (id) => dispatch({ type: ActionTypes.DELETE_EXPENSE, payload: id }),
    addIncome: (income) => dispatch({ type: ActionTypes.ADD_INCOME, payload: income }),
    updateIncome: (income) => dispatch({ type: ActionTypes.UPDATE_INCOME, payload: income }),
    deleteIncome: (id) => dispatch({ type: ActionTypes.DELETE_INCOME, payload: id }),
    addCategory: (type, name) => dispatch({ type: ActionTypes.ADD_CATEGORY, payload: { type, name } }),
    setCurrency: (currency) => dispatch({ type: ActionTypes.SET_CURRENCY, payload: currency }),
    setBudget: (budget) => dispatch({ type: ActionTypes.SET_BUDGET, payload: budget })
  };

  // Computed values
  const computedValues = {
    totalExpenses: state.expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0),
    totalIncome: state.income.reduce((total, income) => total + parseFloat(income.amount || 0), 0),
    balance: state.income.reduce((total, income) => total + parseFloat(income.amount || 0), 0) - 
             state.expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0),
    expensesByCategory: state.expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + parseFloat(expense.amount || 0);
      return acc;
    }, {}),
    incomeByCategory: state.income.reduce((acc, income) => {
      acc[income.category] = (acc[income.category] || 0) + parseFloat(income.amount || 0);
      return acc;
    }, {})
  };

  return (
    <ExpenseContext.Provider value={{ ...state, ...actions, ...computedValues }}>
      {children}
    </ExpenseContext.Provider>
  );
}

// Custom hook to use the context
export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
}

