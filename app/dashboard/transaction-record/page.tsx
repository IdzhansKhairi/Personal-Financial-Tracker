"use client";

import React from 'react';
import { Badge, Tag, Switch, Statistic, Table, Tooltip, Carousel  } from 'antd';
import { useState, useEffect } from 'react';
import type { TableProps } from 'antd';
import { Pie } from '@ant-design/plots';

import Swal from 'sweetalert2';
import { Color } from 'antd/es/color-picker';
import { FontColorsOutlined } from '@ant-design/icons';
import { getIncomeSourceLabel, getExpenseUsageLabel } from '@/lib/displayMappings';

// Type for transaction from database
interface Transaction {
    transaction_id: number;
    transaction_date: string;
    transaction_time: string;
    transaction_description: string;
    transaction_amount: number;
    transaction_category: string;
    transaction_sub_category: string;
    transaction_card_choice: string | null;
    transaction_income_source: string | null;
    transaction_expense_usage: string | null;
    transaction_expense_usage_category: string | null;
    transaction_hobby_category: string | null;
}

interface AccountBalance {
    account_id: number;
    account_category: string;
    account_sub_category: string;
    account_card_type: string | null;
    current_balance: number;
}

export default function FinancialRecordPage() {

    const [accounts, setAccounts] = useState<AccountBalance[]>([])
    const [isLoadingAccounts, setIsLoadingAccounts] = useState(true)

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch transactions from database
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/transactions');
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error('Failed to fetch transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    // Fetch accounts on component mount
    useEffect(() => {
        fetchAccounts();
    }, []);

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

    const getGrandTotal = () => {
        return accounts.reduce((sum, acc) => sum + acc.current_balance, 0);
    };

    const getTotalByCategory = (category: string) => {
        return accounts
            .filter(acc => acc.account_category === category)
            .reduce((sum, acc) => sum + acc.current_balance, 0);
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
        legend: {
            color: {
                itemLabelFill: 'white',
                itemLabelFontWeight: 'bold',
            },
        },
        tooltip: (d: any) => ({
            name: d.type,
            value: `MYR ${d.value.toFixed(2)}`,
        }),
        innerRadius: 0.6,
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'E\nWallet',
                    fill: 'white',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontStyle: 'bold',
                },
            },
        ],
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
        legend: {
            color: {
                itemLabelFill: 'white',
                itemLabelFontWeight: 'bold',
            },
        },
        tooltip: (d: any) => ({
            name: d.type,
            value: `MYR ${d.value.toFixed(2)}`,
        }),
        innerRadius: 0.6,
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Cash',
                    fill: 'white',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontStyle: 'bold',
                },
            },
        ],
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
        legend: {
            color: {
                itemLabelFill: 'white',
                itemLabelFontWeight: 'bold',
            },
        },
        tooltip: (d: any) => ({
            name: d.type,
            value: `MYR ${d.value.toFixed(2)}`,
        }),
        innerRadius: 0.6,
        annotations: [
            {
                type: 'text',
                style: {
                    text: 'Cards',
                    fill: 'white',
                    x: '50%',
                    y: '50%',
                    textAlign: 'center',
                    fontSize: 30,
                    fontStyle: 'bold',
                },
            },
        ],
    }

    // Format date from YYYY-MM-DD to DD MMM YYYY
    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${day} ${monthNames[parseInt(month) - 1]} ${year}`;
    };

    // Format time from HH:MM (24-hour) to HH:MM AM/PM (12-hour)
    const formatTime = (timeStr: string) => {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12; // Convert 0 to 12 for midnight
        return `${hour12}:${minutes} ${ampm}`;
    };

    const columns = [
        {
            title: 'Date',
            dataIndex: 'transaction_date',
            key: 'transaction_date',
            sorter: (a: Transaction, b: Transaction) => a.transaction_date.localeCompare(b.transaction_date),
            render: (value: string) => formatDate(value),
        },
        {
            title: 'Time',
            dataIndex: 'transaction_time',
            key: 'transaction_time',
            render: (value: string) => formatTime(value),
        },
        {
            title: 'Description',
            dataIndex: 'transaction_description',
            key: 'transaction_description',
        },
        {
            title: 'Amount',
            key: 'transaction_amount',
            render: (record: Transaction) => {
                const isIncome = record.transaction_income_source !== null;
                return (
                    <span className={isIncome ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                        {isIncome ? '+' : '-'} MYR {record.transaction_amount.toFixed(2)}
                    </span>
                );
            },
        },
        {
            title: 'Category',
            dataIndex: 'transaction_category',
            key: 'transaction_category',
            filters: [
                { text: 'E-Wallet', value: 'E-Wallet' },
                { text: 'Cash', value: 'Cash' },
                { text: 'Card', value: 'Card' },
            ],
            onFilter: (value: any, record: Transaction) => record.transaction_category === value,
        },
        {
            title: 'Sub-category',
            dataIndex: 'transaction_sub_category',
            key: 'transaction_sub_category',
        },
        {
            title: 'Card Type',
            dataIndex: 'transaction_card_choice',
            key: 'transaction_card_choice',
            render: (value: string | null) => value || '-',
        },
        {
            title: 'Source / Usage',
            key: 'source_usage',
            render: (record: Transaction) => {
                if (record.transaction_income_source) {
                    return <Tag color="green">{getIncomeSourceLabel(record.transaction_income_source)}</Tag>;
                }
                if (record.transaction_expense_usage) {
                    return <Tag color="red">{getExpenseUsageLabel(record.transaction_expense_usage)}</Tag>;
                }
                return '-';
            },
        },
    ];

    // Transform transactions for table dataSource
    const dataSource = transactions.map((t) => ({
        ...t,
        key: t.transaction_id,
    }));

    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };

    return (
        <div>
            <h3 className='text-secondary mb-3'>Transaction Records</h3>

            <div className="row d-flex justift-content-between mb-4">
                <div className="col-4">
                    <div className="card" style={{background: 'blue'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-wallet text-white fs-1"></i>
                                </div>
                                <div className="col-9">
                                    <h5 className="large fw-bold text-white">E-Wallet</h5>
                                    <h5 className="text-white small">MYR {getTotalByCategory('Card').toFixed(2)}</h5>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{height: '300px'}}>
                                <Pie className={'d-flex justify-content-center'} {...ewalletPie} />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-success">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-cash text-white fs-1"></i>
                                </div>
                                <div className="col-9">
                                    <h5 className="large fw-bold text-white">CASH</h5>
                                    <h5 className="text-white small">MYR {getTotalByCategory('Cash').toFixed(2)}</h5>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center' style={{height: '300px'}}>
                                <Pie className={'d-flex justify-content-center'} {...cashPie} />
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-danger">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-3 d-flex align-items-center justify-content-center">
                                    <i className="bi bi-credit-card text-white fs-1"></i>
                                </div>
                                <div className="col-9">
                                    <h5 className="large fw-bold text-white">CARD</h5>
                                    <h5 className="text-white small">MYR {getTotalByCategory('Card').toFixed(2)}</h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 justify-content-center align-items-center" style={{ height: '300px' }}>
                                    <Pie className={'d-flex justify-content-center'} {...cardPie} />
                                </div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mb-5'>
                <div className='d-flex align-items-center justify-content-end'>
                    <h5 className='fw-bold text-success p-0 m-0 me-2'>TOTAL: </h5>
                    <h5 className='p-0 m-0 text-success'>MYR {getGrandTotal().toFixed(2)}</h5>
                </div>
            </div>          

            <div className='row mb-4'>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    loading={isLoading}
                    pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (total) => `Total ${total} transactions` }}
                />
            </div>
        </div>
    )
    
}