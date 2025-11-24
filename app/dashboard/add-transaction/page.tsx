"use client";

import React from 'react';
import { Badge, Tag, Switch, Statistic, Table, Tooltip, Carousel  } from 'antd';
import { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Pie } from '@ant-design/plots';
import './addTransaction.css';

import Swal from 'sweetalert2';
import { Color } from 'antd/es/color-picker';
import { CreditCardOutlined } from '@ant-design/icons';

// Type for account balance from database
interface AccountBalance {
    account_id: number;
    account_category: string;
    account_sub_category: string;
    account_card_type: string | null;
    current_balance: number;
}

export default function AddTransactionPage() {

    const [transactionType, setType] = useState('income');
    const [todayDate, setTodayDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [accountCategory, setAccountCategory] = useState("");
    const [accountSubCategory, setAccountSubCategory] = useState("")
    const [incomeSource, setIncomeSource] = useState("")
    const [expenseUsage, setExpenseUsage] = useState("")
    const [hobbyCategory, setHobbyCategory] = useState("")
    const [description, setDescription] = useState("")
    const [cardChoice, setCardChoice] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Account balances from database
    const [accounts, setAccounts] = useState<AccountBalance[]>([])
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)

    const subCategories = {
        e_wallet: [
            { value: "tng", label: "Touch 'n Go" },
            { value: "shopeepay", label: "Shopee Pay" },
        ],
        cash: [
            { value: "notes", label: "Notes" },
            { value: "coins", label: "Coins" },
        ],
        card: [
            { value: "past", label: "Past" },
            { value: "present", label: "Present" },
            { value: "savings", label: "Savings" },
            { value: "bliss", label: "Bliss" },
        ]
    };

    const [amount, setAmount] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, ""); // remove non-digits
        setAmount(rawValue);
    };
    const displayValue = amount ? (parseInt(amount) / 100).toFixed(2) : "";

    const past = Number((Number(displayValue) * 0.3).toFixed(2));
    const present = Number((Number(displayValue) * 0.4).toFixed(2));
    const savings = Number((Number(displayValue) * 0.2).toFixed(2));
    const bliss = Number((Number(displayValue) * 0.1).toFixed(2));

    const grandTotal = Number((past + present + savings + bliss).toFixed(2));
    
    // Fetch accounts from database
    const fetchAccounts = async () => {
        try {
            setIsLoadingAccounts(true);
            const response = await fetch('/api/accounts');
            const data = await response.json();
            setAccounts(data);
        } catch (error) {
            console.error('Failed to fetch accounts:', error);
        } finally {
            setIsLoadingAccounts(false);
        }
    };

    // Calculate totals by category
    const getEwalletData = () => {
        return accounts
            .filter(acc => acc.account_category === 'E-Wallet')
            .map(acc => ({ type: acc.account_sub_category, value: acc.current_balance }));
    };

    const getCashData = () => {
        return accounts
            .filter(acc => acc.account_category === 'Cash')
            .map(acc => ({ type: acc.account_sub_category, value: acc.current_balance }));
    };

    const getCardData = () => {
        // sub_category is division type (Past, Present, Savings, Bliss)
        return accounts
            .filter(acc => acc.account_category === 'Card')
            .map(acc => ({ type: acc.account_sub_category, value: acc.current_balance }));
    };

    const getTotalByCategory = (category: string) => {
        return accounts
            .filter(acc => acc.account_category === category)
            .reduce((sum, acc) => sum + acc.current_balance, 0);
    };

    const getGrandTotal = () => {
        return accounts.reduce((sum, acc) => sum + acc.current_balance, 0);
    };

    // Filter out zero values from pie data
    const getFilteredEwalletData = () => {
        const data = getEwalletData().filter(d => d.value > 0);
        return data.length > 0 ? data : [{ type: 'No Data', value: 0 }];
    };

    const getFilteredCashData = () => {
        const data = getCashData().filter(d => d.value > 0);
        return data.length > 0 ? data : [{ type: 'No Data', value: 0 }];
    };

    const getFilteredCardData = () => {
        const data = getCardData().filter(d => d.value > 0);
        return data.length > 0 ? data : [{ type: 'No Data', value: 0 }];
    };

    const ewalletPie = {
        data: getFilteredEwalletData(),
        angleField: 'value',
        colorField: 'type',
        label: {
            text: (d: any) => `${d.value.toFixed(2)}`,
            style: {
                fontWeight: 'bold',
                fill: 'white'
            },
        },
        tooltip: (d: any) => ({
            name: d.type,
            value: `MYR ${d.value.toFixed(2)}`,
        }),
    }

    const cashPie = {
        data: getFilteredCashData(),
        angleField: 'value',
        colorField: 'type',
        label: {
            text: (d: any) => `${d.value.toFixed(2)}`,
            style: {
                fontWeight: 'bold',
                fill: 'white'
            },
        },
        tooltip: (d: any) => ({
            name: d.type,
            value: `MYR ${d.value.toFixed(2)}`,
        }),
    }

    const cardPie = {
        data: getFilteredCardData(),
        angleField: 'value',
        colorField: 'type',
        label: {
            text: (d: any) => `${d.value.toFixed(2)}`,
            style: {
                fontWeight: 'bold',
                fill: 'white'
            },
        },
        tooltip: (d: any) => ({
            name: d.type,
            value: `MYR ${d.value.toFixed(2)}`,
        }),
    }

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();

            const yyyy = now.getFullYear();
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const dd = String(now.getDate()).padStart(2, '0');
            setTodayDate(`${yyyy}-${mm}-${dd}`);

            const hh = String(now.getHours()).padStart(2, '0');
            const min = String(now.getMinutes()).padStart(2, '0');
            setCurrentTime(`${hh}:${min}`);
        };

        updateDateTime(); // initial call
        const interval = setInterval(updateDateTime, 1000 * 60); // update every minute

        return () => clearInterval(interval);
    }, []);

    // Fetch accounts on component mount
    useEffect(() => {
        fetchAccounts();
    }, []);

    // Helper to map form values to database values
    const mapCategoryToDb = (category: string) => {
        const mapping: Record<string, string> = {
            'e_wallet': 'E-Wallet',
            'cash': 'Cash',
            'card': 'Card'
        };
        return mapping[category] || category;
    };

    const mapSubCategoryToDb = (subCategory: string) => {
        const mapping: Record<string, string> = {
            'tng': "Touch 'n Go",
            'shopeepay': 'Shopee Pay',
            'notes': 'Notes',
            'coins': 'Coins',
            'past': 'Past',
            'present': 'Present',
            'savings': 'Savings',
            'bliss': 'Bliss'
        };
        return mapping[subCategory] || subCategory;
    };

    const resetForm = () => {
        setAmount("");
        setDescription("");
        setAccountCategory("");
        setAccountSubCategory("");
        setCardChoice("");
        setIncomeSource("");
        setExpenseUsage("");
        setHobbyCategory("");
    };

    // Check if form is valid for submission
    const isFormValid = () => {
        // Basic required fields
        if (!description.trim()) return false;
        if (!displayValue || Number(displayValue) <= 0) return false;
        if (!accountCategory) return false;
        if (!accountSubCategory) return false;

        // Card category requires card choice
        if (accountCategory === 'card' && !cardChoice) return false;

        // Money division requires card choice
        if (accountSubCategory === 'moneyDivision' && !cardChoice) return false;

        // Income requires source
        if (transactionType === 'income' && !incomeSource) return false;

        // Expense requires usage
        if (transactionType === 'expense' && !expenseUsage) return false;

        // Hobby expense requires hobby category
        if (expenseUsage === 'hobby' && !hobbyCategory) return false;

        return true;
    };

    const submitExpense = async () => {
        if (!isFormValid()) return;

        setIsSubmitting(true);

        try {
            const transactionAmount = Number(displayValue);
            const dbCategory = mapCategoryToDb(accountCategory);
            const dbSubCategory = mapSubCategoryToDb(accountSubCategory);

            // Handle Money Division for income (splits into Past/Present/Savings/Bliss)
            if (transactionType === 'income' && accountSubCategory === 'moneyDivision') {
                // Create 4 transactions for each division type
                const divisions = [
                    { type: 'Past', amount: past },
                    { type: 'Present', amount: present },
                    { type: 'Savings', amount: savings },
                    { type: 'Bliss', amount: bliss }
                ];

                for (const division of divisions) {
                    // Create transaction
                    await fetch('/api/transactions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            transaction_date: todayDate,
                            transaction_time: currentTime,
                            transaction_description: `${description} (${division.type})`,
                            transaction_amount: division.amount,
                            transaction_category: 'Card',
                            transaction_sub_category: division.type,
                            transaction_card_choice: cardChoice || 'RHB',
                            transaction_income_source: incomeSource,
                            transaction_expense_usage: null,
                            transaction_hobby_category: null
                        })
                    });

                    // Update account balance - sub_category is division type, card_type is bank
                    const account = accounts.find(
                        acc => acc.account_category === 'Card' &&
                               acc.account_sub_category === division.type &&
                               acc.account_card_type === (cardChoice || 'RHB')
                    );
                    if (account) {
                        await fetch('/api/accounts', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                account_id: account.account_id,
                                current_balance: account.current_balance + division.amount
                            })
                        });
                    }
                }
            } else {
                // Single transaction
                await fetch('/api/transactions', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        transaction_date: todayDate,
                        transaction_time: currentTime,
                        transaction_description: description,
                        transaction_amount: transactionAmount,
                        transaction_category: dbCategory,
                        transaction_sub_category: dbSubCategory,
                        transaction_card_choice: accountCategory === 'card' ? (cardChoice || 'RHB') : null,
                        transaction_income_source: transactionType === 'income' ? incomeSource : null,
                        transaction_expense_usage: transactionType === 'expense' ? expenseUsage : null,
                        transaction_hobby_category: expenseUsage === 'hobby' ? hobbyCategory : null
                    })
                });

                // Update account balance
                let account: AccountBalance | undefined;
                if (accountCategory === 'card') {
                    // For card: sub_category is division type (Past/Present/etc), card_type is bank (RHB)
                    account = accounts.find(
                        acc => acc.account_category === 'Card' &&
                               acc.account_sub_category === dbSubCategory &&
                               acc.account_card_type === (cardChoice || 'RHB')
                    );
                } else {
                    account = accounts.find(
                        acc => acc.account_category === dbCategory &&
                               acc.account_sub_category === dbSubCategory
                    );
                }

                if (account) {
                    const newBalance = transactionType === 'income'
                        ? account.current_balance + transactionAmount
                        : account.current_balance - transactionAmount;

                    await fetch('/api/accounts', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            account_id: account.account_id,
                            current_balance: newBalance
                        })
                    });
                }
            }

            // Refresh accounts and reset form
            await fetchAccounts();
            resetForm();

            Swal.fire({
                icon: 'success',
                title: 'Successfully added',
                text: `${transactionType === 'income' ? 'Income' : 'Expense'} of MYR ${displayValue} recorded`
            });
        } catch (error) {
            console.error('Failed to submit transaction:', error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add transaction',
                text: 'Please try again'
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <h3 className='text-secondary'>Add Transactions (Income/Expense)</h3>

            <div className='border-bottom my-3'></div>

            <div className='row'>
                <div className='col-8'>
                    <div className='card mb-4'>
                        <div className='card-header d-flex align-items-center justify-content-between'>
                            <h5 className='m-0 p-0 py-2'>Add {transactionType === 'income' ? 'Incomes' : 'Expenses'}</h5>

                            <div className="btn-group" role="group">
                                <button type="button" className={`btn ${transactionType === 'income' ? 'btn-success' : 'btn-outline-secondary'}`} onClick={() => setType('income')}>
                                    Income
                                </button>
                                <button type="button" className={`btn ${transactionType === 'expense' ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => setType('expense')}>
                                    Expense
                                </button>
                            </div>
                        </div>
                        <div className='card-body'>
                            <div className='row mb-4'>
                                <div className='col-6 d-flex align-items-center'>
                                    <span className='form-label m-0 p-0 me-2'>Date</span>
                                    <input type='date' className='form-control' value={todayDate} disabled></input>
                                </div>

                                <div className='col-6 d-flex align-items-center'>
                                    <label className='form-label m-0 p-0 me-2'>Time</label>
                                    <input type='time' className='form-control' value={currentTime} disabled></input>
                                </div>
                            </div>
                            <div className='row mb-5'>
                                <div className='col d-flex align-items-center'>
                                    <label className='form-label me-2'>Description</label>
                                    <textarea className='form-control' placeholder={transactionType === 'income' ? 'Enter incomes description...' : 'Enter expenses description...'} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                                </div>
                            </div>

                            <h5 className='text-secondary mb-3'>{transactionType === 'income' ? 'Incomes Details' : 'Expenses Detail'}</h5>

                            {transactionType === 'income' && (
                                <div className='row mb-5'>
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className=''>Amount</label>
                                        </div>
                                        <div className='col-10'>
                                            <div className='input-group'>
                                                <span className='input-group-text'>MYR</span>
                                                <input className='form-control' type='number' step="0.01" value={displayValue} placeholder='Enter amount' onChange={handleChange}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Category</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select' value={accountCategory} onChange={(e) => setAccountCategory(e.target.value)}>
                                                <option value="" disabled hidden>Select category</option>
                                                <option value="e_wallet">E-Wallet</option>
                                                <option value="cash">Cash</option>
                                                <option value="card">Card</option>
                                            </select>
                                        </div>
                                    </div>

                                    {accountCategory === 'card' && (
                                        <div>
                                            <div className='d-flex align-items-center mb-4'>
                                                <div className='col-2'>
                                                    <label className='form-label p-0 m-0 me-2'>Card</label>
                                                </div>
                                                <div className='col-10'>
                                                    <select className='form-select' value={cardChoice} onChange={(e) => setCardChoice(e.target.value)}>
                                                        <option value="" disabled hidden>Select card</option>
                                                        <option value="RHB">RHB</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div>

                                            </div>
                                        </div>

                                    )}
                                    
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Sub-category</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select' value={accountSubCategory} onChange={(e) => setAccountSubCategory(e.target.value)} disabled={!accountCategory}>
                                                <option value="" disabled hidden>Select sub-category</option>
                                                {subCategories[accountCategory as "e_wallet" | "cash" | "card"]?.map(item => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                                {accountCategory === 'card' && (
                                                    <option value="moneyDivision">Money Division</option>
                                                )}
                                            </select>

                                        </div>
                                    </div>

                                    {accountSubCategory === 'moneyDivision' && (
                                        <div className='d-flex align-items-center mb-4'>
                                            <div className='col-2'></div>
                                            <div className='col-10'>
                                                <div className='d-flex align-items-center my-4'>
                                                    <Table 
                                                        className='w-100 border rounded'
                                                        pagination={false}
                                                        columns={
                                                            [
                                                                {
                                                                    title: 'Division Type',
                                                                    dataIndex: 'divisionType',
                                                                    key: 'divisionType',
                                                                },
                                                                {
                                                                    title: 'Division Percentage',
                                                                    dataIndex: 'divisionPercentage',
                                                                    key: 'divisionPercentage',
                                                                },
                                                                {
                                                                    title: 'Total Division',
                                                                    dataIndex: 'totalDivision',
                                                                    key: 'totalDivision',
                                                                },
                                                            ]
                                                        }
                                                        dataSource={
                                                            [
                                                                {
                                                                    key: '1',
                                                                    divisionType: 'Past',
                                                                    divisionPercentage: '30%',
                                                                    totalDivision: past.toFixed(2),
                                                                },
                                                                {
                                                                    key: '2',
                                                                    divisionType: 'Present',
                                                                    divisionPercentage: '40%',
                                                                    totalDivision: present.toFixed(2),
                                                                },
                                                                {
                                                                    key: '3',
                                                                    divisionType: 'Savings',
                                                                    divisionPercentage: '20%',
                                                                    totalDivision: savings.toFixed(2),
                                                                },
                                                                {
                                                                    key: '4',
                                                                    divisionType: 'Bliss',
                                                                    divisionPercentage: '10%',
                                                                    totalDivision: bliss.toFixed(2),
                                                                },
                                                                {
                                                                    key: '5',
                                                                    divisionType: <strong className='fw-bold text-uppercase'>Total</strong>,
                                                                    divisionPercentage: '',
                                                                    totalDivision: <span className='text-primary fw-bold'>{'MYR ' + grandTotal.toFixed(2)}</span>
                                                                },
                                                            ]
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Source</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select' value={incomeSource} onChange={(e) => setIncomeSource(e.target.value)} disabled={!accountCategory}>
                                                <option value="" disabled hidden>Select source</option>
                                                <option value="salary">Salary</option>
                                                <option value="allowance_gift">Allowance / Gift</option>
                                                <option value="paybank_reimbursement">Payback / Reimbursement</option>
                                                <option value="kwsp">KWSP</option>
                                                <option value="transfer">Transfer</option>
                                                <option value="bank_profit">Bank Profit</option>
                                                <option value="borrow">Borrow</option>
                                                <option value="refund">Refund</option>
                                                <option value="tally">Tally</option>
                                                <option value="update">Update</option>
                                                <option value="others">Others</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            )}

                            {transactionType === 'expense' && (
                                <div className='row mb-5'>
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className=''>Amount</label>
                                        </div>
                                        <div className='col-10'>
                                            <div className='input-group'>
                                                <span className='input-group-text'>MYR</span>
                                                <input className='form-control' type='number' step="0.01" value={displayValue} placeholder='Enter amount' onChange={handleChange}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Category</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select' value={accountCategory} onChange={(e) => setAccountCategory(e.target.value)}>
                                                <option value="" disabled hidden>Select category</option>
                                                <option value="e_wallet">E-Wallet</option>
                                                <option value="cash">Cash</option>
                                                <option value="card">Card</option>
                                            </select>
                                        </div>
                                    </div>
                                    {accountCategory === 'card' && (
                                        <div className='d-flex align-items-center mb-4'>
                                            <div className='col-2'>
                                                <label className='form-label p-0 m-0 me-2'>Card</label>
                                            </div>
                                            <div className='col-10'>
                                                <select className='form-select' value={cardChoice} onChange={(e) => setCardChoice(e.target.value)}>
                                                    <option value="" disabled hidden>Select card</option>
                                                    <option value="RHB">RHB</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Sub-category</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select' value={accountSubCategory} onChange={(e) => setAccountSubCategory(e.target.value)} disabled={!accountCategory}>
                                                <option value="" disabled hidden>Select sub-category</option>
                                                {subCategories[accountCategory as "e_wallet" | "cash" | "card"]?.map(item => (
                                                    <option key={item.value} value={item.value}>
                                                        {item.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center mb-4'>
                                        <div className='col-2'>
                                            <label className='form-label p-0 m-0 me-2'>Usage</label>
                                        </div>
                                        <div className='col-10'>
                                            <select className='form-select' value={expenseUsage} onChange={(e) => setExpenseUsage(e.target.value)} disabled={!accountCategory}>
                                                
                                                <option value="" disabled hidden>Select expense usage</option>

                                                <optgroup label="Living">
                                                    <option value="food">Food & Drinks</option>
                                                    <option value="groceries">Groceries</option>
                                                    <option value="health">Health</option>
                                                    <option value="household">Household</option>
                                                    <option value="personalcare">Personal Care</option>
                                                </optgroup>

                                                <optgroup label="Commitments">
                                                    <option value="car">Car</option>
                                                    <option value="house">House</option>
                                                    <option value="utilities">Utilities</option>
                                                    <option value="installment">Installment</option>
                                                    <option value="transport">Transportation</option>
                                                    <option value="subscription">Subscription</option>
                                                </optgroup>

                                                <optgroup label="Personal">
                                                    <option value="entertainment">Entertainment</option>
                                                    <option value="shopping">Shopping</option>
                                                    <option value="travel">Travel</option>
                                                    <option value="ride">Ride Transportation</option>
                                                    <option value="gifts">Gifts</option>
                                                    <option value="hobby">Hobby</option>
                                                </optgroup>

                                                <optgroup label='Financial'>
                                                    <option value="investment">Investment</option>
                                                    <option value="charity">Charity</option>
                                                    <option value="payback">Payback</option>
                                                    <option value="lend">Lend Money</option>
                                                    <option value="movement">Move Money</option>
                                                    <option value="update">Update Money</option>
                                                </optgroup>

                                                <option value="others">Others</option>
                                            </select>
                                        </div>
                                    </div>
                                    {expenseUsage === 'hobby' && (
                                        <div className='d-flex align-items-center mb-4'>
                                            <div className='col-2'>
                                                <label className='form-label p-0 m-0 me-2'>Hobby Category</label>
                                            </div>
                                            <div className='col-10'>
                                                <select className='form-select' value={hobbyCategory} onChange={(e) => setHobbyCategory(e.target.value)} disabled={!accountCategory}>
                                                    <option value="">Select Hobby Category</option>
                                                    <option value="gunpla">Gunpla</option>
                                                    <option value="music">Music</option>
                                                    <option value="climbing">Climbing</option>
                                                    <option value="decoration">Decoration</option>
                                                    <option value="technology">Technology</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                    
                                </div>
                            )}

                            <div className='d-flex align-items-center justify-content-end mb-4'>
                                <button className='btn btn-primary' onClick={() => submitExpense()} disabled={!isFormValid() || isSubmitting}>{isSubmitting ? 'Submitting...' : `Submit ${transactionType}`}</button>
                            </div>
                            
                        </div>
                    </div>
                </div>


                <div className='col-4'>
                    <div className="card bg-secondary py-3 px-1">

                        <div className='row mb-3 px-4'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <label className='fw-bold text-white'>Remainder</label>
                                <div className='d-flex align-items-center'>
                                    <label className='fw-bold' style={{ color: '#90EE90' }}>TOTAL: MYR {getGrandTotal().toFixed(2)}</label>
                                </div>
                            </div>
                        </div>

                        <Carousel arrows dots={false} className='px-4'>
                            <div className='mb-3'>
                                <div className="card mb-3">
                                    <div className='card-header'>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <CreditCardOutlined className='me-2' />
                                                <label className="large fw-bold">CARD (RHB)</label>
                                            </div>
                                            
                                            <label className="fw-bold text-success">MYR {getTotalByCategory('Card').toFixed(2)}</label>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                            <Pie className={'d-flex justify-content-center'} {...cardPie} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="card mb-3">
                                    <div className='card-header'>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <i className="bi bi-cash me-2"></i>
                                                <label className="large fw-bold">CASH</label>
                                            </div>
                                            
                                            <label className="fw-bold text-success">MYR {getTotalByCategory('Cash').toFixed(2)}</label>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                            <Pie className={'d-flex justify-content-center'} {...cashPie} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='mb-3'>
                                <div className="card mb-3">
                                    <div className='card-header'>
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div>
                                                <i className="bi bi-wallet me-2"></i>
                                                <label className="large fw-bold">E-Wallet</label>
                                            </div>
                                            
                                            <label className="fw-bold text-success">MYR {getTotalByCategory('E-Wallet').toFixed(2)}</label>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className='d-flex align-items-center justify-content-center' style={{height: '300px'}}>
                                            <Pie className={'d-flex justify-content-center'} {...ewalletPie} />
                                        </div>

                                    </div>
                                </div>
                                
                            </div>
                        </Carousel>

                    </div>
                </div>
            </div>

        </div>
    )
    
}