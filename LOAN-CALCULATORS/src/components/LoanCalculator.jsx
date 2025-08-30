import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, DollarSign, TrendingUp, PieChart, FileText, Moon, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

const LoanCalculator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('payment');
  
  // Payment Calculator State
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [termUnit, setTermUnit] = useState('years');
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');
  
  // Results State
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amortizationData, setAmortizationData] = useState([]);
  
  // Extra Payment State
  const [extraPayment, setExtraPayment] = useState('');
  const [extraPaymentResults, setExtraPaymentResults] = useState(null);
  
  // Comparison State
  const [comparisonLoans, setComparisonLoans] = useState([
    { id: 1, name: 'Loan 1', amount: '', rate: '', term: '', payment: 0 },
    { id: 2, name: 'Loan 2', amount: '', rate: '', term: '', payment: 0 }
  ]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Loan calculation functions
  const calculateMonthlyPayment = (principal, rate, term, frequency = 'monthly') => {
    if (!principal || !rate || !term) return 0;
    
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = frequency === 'monthly' ? 12 : frequency === 'weekly' ? 52 : 26;
    const t = parseFloat(term);
    
    const monthlyRate = r / n;
    const numPayments = n * t;
    
    if (monthlyRate === 0) return P / numPayments;
    
    const payment = P * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                   (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    return payment;
  };

  const generateAmortizationSchedule = (principal, rate, term, payment) => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const numPayments = parseFloat(term) * 12;
    let balance = P;
    const schedule = [];
    
    for (let i = 1; i <= Math.min(numPayments, 360); i++) {
      const interestPayment = balance * r;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      
      if (i <= 12 || i % 12 === 0) { // Show first year and then yearly
        schedule.push({
          payment: i,
          principalPayment: principalPayment,
          interestPayment: interestPayment,
          balance: Math.max(0, balance),
          year: Math.ceil(i / 12)
        });
      }
    }
    
    return schedule;
  };

  const calculateLoan = () => {
    const payment = calculateMonthlyPayment(loanAmount, interestRate, loanTerm, paymentFrequency);
    const totalPaid = payment * parseFloat(loanTerm) * (paymentFrequency === 'monthly' ? 12 : paymentFrequency === 'weekly' ? 52 : 26);
    const interest = totalPaid - parseFloat(loanAmount);
    
    setMonthlyPayment(payment);
    setTotalInterest(interest);
    setTotalAmount(totalPaid);
    
    if (paymentFrequency === 'monthly') {
      const schedule = generateAmortizationSchedule(loanAmount, interestRate, loanTerm, payment);
      setAmortizationData(schedule);
    }
  };

  const calculateExtraPayment = () => {
    if (!extraPayment || !monthlyPayment) return;
    
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const regularPayment = monthlyPayment;
    const extra = parseFloat(extraPayment);
    const totalPayment = regularPayment + extra;
    
    let balance = P;
    let totalInterestPaid = 0;
    let months = 0;
    
    while (balance > 0.01 && months < 360) {
      const interestPayment = balance * r;
      const principalPayment = Math.min(totalPayment - interestPayment, balance);
      
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      months++;
    }
    
    const regularTotalInterest = totalInterest;
    const interestSaved = regularTotalInterest - totalInterestPaid;
    const timeSaved = (parseFloat(loanTerm) * 12) - months;
    
    setExtraPaymentResults({
      newTerm: months,
      interestSaved: interestSaved,
      timeSaved: timeSaved
    });
  };

  const updateComparisonLoan = (index, field, value) => {
    const updated = [...comparisonLoans];
    updated[index][field] = value;
    
    if (field === 'amount' || field === 'rate' || field === 'term') {
      const payment = calculateMonthlyPayment(updated[index].amount, updated[index].rate, updated[index].term);
      updated[index].payment = payment;
    }
    
    setComparisonLoans(updated);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const pieChartData = [
    { name: 'Principal', value: parseFloat(loanAmount) || 0, color: '#3b82f6' },
    { name: 'Interest', value: totalInterest, color: '#ef4444' }
  ];

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300`}>
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">Professional Loan Calculator</h1>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className="ml-auto"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payment" className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4" />
              <span>Payment Calculator</span>
            </TabsTrigger>
            <TabsTrigger value="amortization" className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>Amortization</span>
            </TabsTrigger>
            <TabsTrigger value="extra" className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Extra Payments</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Compare Loans</span>
            </TabsTrigger>
          </TabsList>

          {/* Payment Calculator Tab */}
          <TabsContent value="payment" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Details</CardTitle>
                  <CardDescription>Enter your loan information to calculate payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="loanAmount">Loan Amount</Label>
                    <Input
                      id="loanAmount"
                      type="number"
                      placeholder="Enter loan amount"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.01"
                      placeholder="Enter interest rate"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term</Label>
                      <Input
                        id="loanTerm"
                        type="number"
                        placeholder="Enter term"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="termUnit">Term Unit</Label>
                      <Select value={termUnit} onValueChange={setTermUnit}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="years">Years</SelectItem>
                          <SelectItem value="months">Months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="paymentFrequency">Payment Frequency</Label>
                    <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateLoan} className="w-full" size="lg">
                    Calculate Payment
                  </Button>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                  <CardDescription>Your loan payment breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                      <span className="font-medium">Payment Amount</span>
                      <Badge variant="default" className="text-lg px-3 py-1">
                        {formatCurrency(monthlyPayment)}
                      </Badge>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Interest</span>
                        <span className="font-medium text-destructive">{formatCurrency(totalInterest)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Amount</span>
                        <span className="font-medium">{formatCurrency(totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Principal</span>
                        <span className="font-medium text-primary">{formatCurrency(parseFloat(loanAmount) || 0)}</span>
                      </div>
                    </div>
                  </div>
                  
                  {pieChartData[0].value > 0 && (
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Principal vs Interest</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => formatCurrency(value)} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Amortization Tab */}
          <TabsContent value="amortization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Amortization Schedule</CardTitle>
                <CardDescription>Payment breakdown over time</CardDescription>
              </CardHeader>
              <CardContent>
                {amortizationData.length > 0 ? (
                  <div className="space-y-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={amortizationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="Remaining Balance" />
                        <Line type="monotone" dataKey="principalPayment" stroke="#10b981" name="Principal Payment" />
                        <Line type="monotone" dataKey="interestPayment" stroke="#ef4444" name="Interest Payment" />
                      </LineChart>
                    </ResponsiveContainer>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-border p-2 text-left">Payment #</th>
                            <th className="border border-border p-2 text-left">Principal</th>
                            <th className="border border-border p-2 text-left">Interest</th>
                            <th className="border border-border p-2 text-left">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortizationData.slice(0, 12).map((payment, index) => (
                            <tr key={index} className="hover:bg-muted/50">
                              <td className="border border-border p-2">{payment.payment}</td>
                              <td className="border border-border p-2">{formatCurrency(payment.principalPayment)}</td>
                              <td className="border border-border p-2">{formatCurrency(payment.interestPayment)}</td>
                              <td className="border border-border p-2">{formatCurrency(payment.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Calculate a loan payment first to see the amortization schedule.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Extra Payments Tab */}
          <TabsContent value="extra" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Extra Payment Calculator</CardTitle>
                  <CardDescription>See how extra payments can save you money</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="extraPayment">Extra Monthly Payment</Label>
                    <Input
                      id="extraPayment"
                      type="number"
                      placeholder="Enter extra payment amount"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={calculateExtraPayment} className="w-full">
                    Calculate Savings
                  </Button>
                </CardContent>
              </Card>

              {extraPaymentResults && (
                <Card>
                  <CardHeader>
                    <CardTitle>Extra Payment Results</CardTitle>
                    <CardDescription>Your potential savings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>New Loan Term</span>
                        <span className="font-medium">{Math.floor(extraPaymentResults.newTerm / 12)} years, {extraPaymentResults.newTerm % 12} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time Saved</span>
                        <span className="font-medium text-primary">{Math.floor(extraPaymentResults.timeSaved / 12)} years, {extraPaymentResults.timeSaved % 12} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Saved</span>
                        <span className="font-medium text-primary">{formatCurrency(extraPaymentResults.interestSaved)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Compare Loans Tab */}
          <TabsContent value="compare" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Comparison</CardTitle>
                <CardDescription>Compare different loan options side by side</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {comparisonLoans.map((loan, index) => (
                    <div key={loan.id} className="space-y-4 p-4 border rounded-lg">
                      <h4 className="font-medium">{loan.name}</h4>
                      <div className="space-y-2">
                        <Input
                          placeholder="Loan Amount"
                          value={loan.amount}
                          onChange={(e) => updateComparisonLoan(index, 'amount', e.target.value)}
                        />
                        <Input
                          placeholder="Interest Rate (%)"
                          value={loan.rate}
                          onChange={(e) => updateComparisonLoan(index, 'rate', e.target.value)}
                        />
                        <Input
                          placeholder="Term (years)"
                          value={loan.term}
                          onChange={(e) => updateComparisonLoan(index, 'term', e.target.value)}
                        />
                      </div>
                      <div className="p-3 bg-muted rounded">
                        <div className="text-sm text-muted-foreground">Monthly Payment</div>
                        <div className="text-lg font-bold">{formatCurrency(loan.payment)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoanCalculator;

