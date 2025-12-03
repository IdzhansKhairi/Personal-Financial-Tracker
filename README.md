<!-- ORIGINAL VERSION - REPLACED WITH ENHANCED VERSION BELOW
<p style="display:flex; justify-content:center;">
  <img src="media/finttrack_logo_3.png" style="height: 150px"/>
</p>

# Finttrack - Your Personal Financial Tracker
Personal Financial Tracker is a personal project of mine that focuses on replicating of my initial Google Sheets method into a web application system. This Web Application system will not only functioning to track my financial in my daily life, but it also be able to visualize my personal incomes and expenses. Other than that, it also be able to be used as a web application for me to take note of my monthly/yearly commitments payments, my wishlists, and also debts that I owe people or people owe me.
-->

<p align="center">
  <img src="media/finttrack_logo_3.png" alt="Finttrack Logo" height="150"/>
</p>

<h1 align="center">Finttrack - Your Personal Financial Tracker</h1>

<p align="center">
  <strong>A comprehensive web application for managing personal finances, tracking expenses, and visualizing spending habits.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/Ant_Design-5.28.1-0170FE?style=for-the-badge&logo=antdesign" alt="Ant Design"/>
</p>

---

## 🚀 Live Demo

**Try the application now without installation!**

🔗 **[https://personal-financial-tracker-six.vercel.app/login](https://personal-financial-tracker-six.vercel.app/login)**

**Demo Credentials:**
- **Username:** `user.demo`
- **Password:** `finttrack-demo-92AjLk!`

> Feel free to explore all features, add transactions, manage commitments, and test the full functionality. The demo account is pre-configured for immediate use.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Problem Statement](#problem-statement)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Development Notes](#development-notes)

---

## About the Project

**Finttrack** is a personal project born from the need to transform a manual Google Sheets-based financial tracking system into a modern, intuitive web application. This application not only tracks daily income and expenses but also provides powerful data visualization, commitment tracking, wishlist management, and debt tracking capabilities.

The goal is simple: **Take control of your finances with a tool that's accessible anywhere, anytime, and makes financial planning effortless.**

---

## Problem Statement

<!-- ORIGINAL VERSION - Enhanced below
During my university time, I tend to spend my money without the thoughts of savings, or divide my money so that I have certain amount for me to spend whatever I want and also certain amount for my daily use such as foods and utilities.

However, when I realized how important it is for me to create my own savings and plan my money properly, I started to create my own Google Sheets for me to track the amount of money that I have. Below are the pictures of sheets pages that consist of:
-->

During my university days, I struggled with financial discipline. I would spend money impulsively without considering savings or properly allocating funds for different purposes. After realizing the importance of financial planning, I created a Google Sheets system to track my finances.

### My Google Sheets Journey

Here's what my manual tracking system looked like:

#### 1. Yearly Financial Tracker
![Google Sheets Tracker](media/google_sheets_tracker.png)

<!-- ORIGINAL: This page serves for me to input my incomes or expenses. This page allows me to see the amount of money that I still have for each division. -->
This page allowed me to log all incomes and expenses, showing remaining balances for each financial division.

#### 2. Commitments Tracker
![Google Sheets Commitments](media/google_sheets_commitments.png)

<!-- ORIGINAL: This page serves for me to keep track of my monthly current commitments that I need to pay. Hence I just take note if I already make the payment for that particular month or not yet. I also can list the commitments that I have so I can see the total monthly amount and yearly amount. Other than that, I also be able to take not if I have future commitments in plan. -->
A dedicated space to track monthly recurring payments and commitments, noting payment status and calculating total monthly/yearly obligations.

#### 3. Salary Division System
![Google Sheets Salary Division](media/google_sheets_salaryDivision.png)

<!-- ORIGINAL: This page serves for me to put the amount of income that I get for me to directly divide it into a few franctions. Here is how the division works: -->
My financial philosophy revolves around dividing income into four categories:

| Division | Percentage | Purpose |
| --- | --- | --- |
| **Past** | 30% | Monthly commitments and bills |
| **Present** | 40% | Daily living expenses (food, transport, utilities) |
| **Future** | 20% | Savings and investments |
| **Bliss** | 10% | Personal enjoyment and hobbies |


#### 4. Hobby Expenses Tracker
![Google Sheets Gundam Expenses](media/google_sheets_gundamExpenses.png)

<!-- ORIGINAL: This part of sheets is just for me to track the amount of money I spent every month on Gunplas. -->
Tracking specific hobby spending (in my case, Gunpla models) to understand how much I invest in my passions.

#### 5. Wishlist
![Google Sheets Wishlist](media/google_sheets_wishlist.png)

<!-- ORIGINAL: This part of sheets is for me to jot down on the items that is in my wishlist such as the name of the items and also the estimated price and maybe the link to the items itself. -->
A simple list to jot down desired items with estimated prices and links.

### The Problem

<!-- ORIGINAL: This method works just fine. However, I have some problem on the data visualization and the UI visualization itself of the Google Sheets for me to use it in my daily life. It might not be nice for other people to look on it at the first glance. -->

While Google Sheets worked, it had limitations:
- **Poor data visualization** - Difficult to see spending trends at a glance
- **Not mobile-friendly** - Clunky to use on phones
- **Manual data entry** - No automation or smart categorization
- **Limited interactivity** - Can't easily filter, search, or analyze data
- **Lacks polish** - Not visually appealing or intuitive for daily use

---

## Features

<!-- ORIGINAL VERSION - Incomplete section
### Features
To solve this problem, I will be implementing web application so that I can open this application from any devices and anywhere just like my Google Sheets. To do this, I have some pages that I need to create:

1.
-->

Finttrack transforms my Google Sheets workflow into a modern web application with the following pages and capabilities:

### Dashboard (Home)
- **Overview of financial health** - See total balance, income vs. expenses at a glance
- **Visual charts and graphs** - Pie charts, line graphs, and bar charts for spending analysis
- **Quick stats** - Monthly summaries, spending trends, and budget insights
- **Account balance overview** - Real-time view of balances across E-Wallets, Cash, and Bank Cards

### Add Transaction
- **Quick transaction entry** - Add income or expense with category, amount, and description
- **Smart categorization** - Predefined categories (Food, Transport, Entertainment, etc.)
- **Account selection** - Choose which account/card the transaction affects
- **Timestamp tracking** - Automatic date and time recording
- **Income source & expense usage tracking** - Tag transactions for detailed analysis

### Transaction Records
- **Complete transaction history** - View all past transactions in a filterable table
- **Search and filter** - Find transactions by date, category, amount, or description
- **Edit and delete** - Modify or remove incorrect entries
- **Export functionality** - Download transaction data for external analysis
- **Pagination** - Efficiently browse through large datasets

### Commitments
- **Monthly recurring payments** - Track subscriptions, bills, and obligations
- **Payment status tracking** - Mark commitments as paid or pending
- **Total calculation** - See monthly and yearly commitment totals
- **Status management** - Active, Pending, Inactive, or On Hold commitments
- **Future planning** - Note upcoming commitments before they start

### Wishlist
- **Item tracking** - Save items you want to purchase
- **Category organization** - Group by Gunpla, Music, Climbing, Technology, etc.
- **Price estimation** - Track estimated costs to plan savings
- **URL links** - Direct links to products for easy purchasing
- **Purchase status** - Mark items as purchased or not yet purchased
- **Visual reference** - Attach product images

### Debts Tracker
- **Debt management** - Track money you owe or money owed to you
- **Person tracking** - Record who owes whom
- **Amount and status** - Monitor outstanding balances and payment status
- **Notes and reminders** - Add context to each debt entry

### Authentication & Security
- **User login system** - Secure access with email and password
- **Password encryption** - bcrypt hashing for user security
- **Session management** - Persistent login sessions
- **Unauthorized access protection** - Redirect unauthenticated users

## Tech Stack

<!-- ORIGINAL VERSION - Basic list only
### Tech Stack
To solve this problem, I decided to create a web application that will be used as my own personalize financial tracker. This project will be using these technologies to make it work:
- NextJS
- Supabase (as the database)
- Bootstrap
- Ant Design
- Ant Design Charts
- sweetalert2
-->

### Core Framework
- **[Next.js 16.0.1](https://nextjs.org/)** - React framework with server-side rendering, file-based routing, and API routes
  - *Why?* Provides an all-in-one solution with excellent performance and developer experience
  - *Benefits:* Fast page loads, SEO-friendly, built-in API routes for backend logic

- **[React 19.2.0](https://react.dev/)** - Modern UI library with component-based architecture
  - *Why?* Industry standard for building interactive user interfaces
  - *Benefits:* Reusable components, virtual DOM for performance, huge ecosystem

- **[TypeScript 5.0](https://www.typescriptlang.org/)** - JavaScript with static typing
  - *Why?* Catches errors during development, improves code quality
  - *Benefits:* Better autocomplete, safer refactoring, self-documenting code

### Database & Backend
- **[Supabase](https://supabase.com/)** - PostgreSQL database with built-in authentication and real-time capabilities
  - *Why?* Switched from SQLite for better scalability and cloud accessibility
  - *Benefits:* Access data from anywhere, automatic backups, built-in REST API

- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing library
  - *Why?* Industry-standard encryption for user passwords
  - *Benefits:* Secure password storage, protection against rainbow table attacks

### UI & Styling
- **[Ant Design 5.28.1](https://ant.design/)** - Comprehensive React UI component library
  - *Why?* Professional, polished components out of the box
  - *Benefits:* Data tables, forms, modals, icons, consistent design system

- **[@ant-design/charts 2.6.6](https://charts.ant.design/)** - Data visualization library built on G2Plot
  - *Why?* Seamless integration with Ant Design, beautiful charts
  - *Benefits:* Pie charts, line graphs, bar charts, easy configuration

- **[Bootstrap 5.3.8](https://getbootstrap.com/)** - CSS framework for responsive layout
  - *Why?* Quick responsive grid system and utility classes
  - *Benefits:* Mobile-first design, flexbox grid, spacing utilities

- **[Bootstrap Icons 1.13.1](https://icons.getbootstrap.com/)** - Icon library
  - *Why?* Extensive icon set that matches Bootstrap's design language
  - *Benefits:* 2000+ icons, vector graphics, easy to customize

- **[Tailwind CSS 4.0](https://tailwindcss.com/)** - Utility-first CSS framework
  - *Why?* Rapid styling with utility classes
  - *Benefits:* No custom CSS needed, consistent spacing, easy dark mode

### User Experience
- **[SweetAlert2](https://sweetalert2.github.io/)** - Beautiful, customizable alert modals
  - *Why?* Native browser alerts are ugly and limited
  - *Benefits:* Confirmation dialogs, success/error messages, custom styling

### Development Tools
- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linter
- **[tsx](https://www.npmjs.com/package/tsx)** - TypeScript execution for scripts
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management

## Screenshots

### Dashboard Overview
![Finttrack Dashboard](media/finttrack_dashboard.png)
*Real-time financial overview with interactive charts and balance summaries*

### Add Transaction
![Finttrack Add Transaction](media/finttrack_add_transaction.png)
*Quick and intuitive transaction entry with smart categorization*

### Transaction Records
![Finttrack Transaction Records](media/finttrack_transaction_records.png)
*Complete transaction history with search, and filter capabilities*

### Commitments Tracker
![Finttrack Commitments](media/finttrack_commitments.png)
*Taking note recurring payments and monthly obligations*

### Wishlist Management
![Finttrack Wishlist](media/finttrack_wishlist.png)
*Track items you want to purchase with price estimates and links*

### Debts Tracker
![Finttrack Debts](media/finttrack_debts.png)
*Monitor money you owe and money owed to you*

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** package manager
- **Git** - [Download here](https://git-scm.com/)
- **Supabase account** - [Sign up free](https://supabase.com/)

To verify your installations, run:
```bash
node -v
npm -v
git --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/personal-financial-tracker.git
   cd personal-financial-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Database connection (if using direct connection)
DATABASE_URL=your_database_connection_string
```

**How to get Supabase credentials:**
1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project or select your existing project
3. Navigate to **Settings** > **API**
4. Copy the **Project URL** and **anon/public key**

**Example `.env.local` file:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xyzcompany.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> **Note:** Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### Database Setup

This project uses Supabase (PostgreSQL) as the database. Follow these steps to set up your database:

1. **Create Supabase project**
   - Sign up at [Supabase](https://supabase.com/)
   - Create a new project
   - Wait for the project to be fully provisioned

2. **Run database migrations**

   The project includes migration scripts to set up all required tables:

   ```bash
   # Set up initial database tables
   npm run db:setup

   # Seed initial account balances
   npm run db:seed-accounts

   # Migrate expense categories
   npm run db:migrate-expense-category

   # Migrate commitment tables
   npm run db:migrate-commitment-tables

   # Migrate wishlist table
   npm run db:migrate-wishlist-table

   # Migrate debts table
   npm run db:migrate-debts-table

   # Migrate authentication tables
   npm run db:migrate-auth-tables

   # Seed initial user (optional)
   npm run db:seed-user
   ```

3. **Verify database setup**
   - Go to Supabase Dashboard > **Table Editor**
   - You should see tables like `transaction_list_table`, `account_balance_table`, `commitment_list_table`, etc.

### Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Login or create an account**
   Use the credentials from your seeded user or create a new account

4. **Start tracking your finances!**

**Other useful commands:**
```bash
# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

---

## Project Structure

```
personal-financial-tracker/
├── app/                          # Next.js App Router
│   ├── dashboard/                # Main dashboard pages
│   │   ├── page.tsx              # Dashboard home
│   │   ├── add-transaction/      # Transaction entry page
│   │   ├── transaction-record/   # Transaction history
│   │   ├── commitment/           # Commitments tracker
│   │   ├── wishlist/             # Wishlist page
│   │   └── debts-tracker/        # Debts management
│   ├── login/                    # Login page
│   ├── unauthorized/             # Access denied page
│   ├── layout.tsx                # Root layout with global styles
│   └── page.tsx                  # Landing page
├── lib/                          # Utility libraries
│   └── supabase.ts               # Supabase client configuration
├── database/                     # Database-related files
├── scripts/                      # Database migration scripts
│   ├── setup-db.ts               # Initial database setup
│   ├── seed-accounts.ts          # Seed account data
│   └── migrate-*.ts              # Various migration scripts
├── media/                        # Images and screenshots
├── public/                       # Static assets
├── middleware.ts                 # Next.js middleware for auth
├── .env.local                    # Environment variables (not in git)
├── .env.example                  # Example environment variables
├── package.json                  # Project dependencies
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── README.md                     # This file
```

---

## Database Schema

### Tables Overview

#### `transaction_list_table`
Stores all income and expense transactions.

| Column | Type | Description |
|--------|------|-------------|
| `transaction_id` | INTEGER (PK) | Unique transaction identifier |
| `transaction_date` | DATE | Date of transaction |
| `transaction_time` | TIME | Time of transaction |
| `transaction_description` | TEXT | Description/note |
| `transaction_amount` | REAL | Transaction amount |
| `transaction_category` | TEXT | Income or Expense |
| `transaction_sub_category` | TEXT | Specific category (Food, Transport, etc.) |
| `transaction_card_choice` | TEXT | Which account was used |
| `transaction_income_source` | TEXT | Source of income (if applicable) |
| `transaction_expense_usage` | TEXT | Expense purpose (if applicable) |
| `transaction_hobby_category` | TEXT | Hobby type (if applicable) |

#### `account_balance_table`
Tracks balances across different accounts.

| Column | Type | Description |
|--------|------|-------------|
| `account_id` | INTEGER (PK) | Unique account identifier |
| `account_category` | TEXT | E-Wallet, Cash, or Card |
| `account_sub_category` | TEXT | Specific account (TnG, RHB, etc.) |
| `account_card_type` | TEXT | Past/Present/Future/Bliss (for Cards) |
| `current_balance` | REAL | Current account balance |

#### `commitment_list_table`
Manages recurring monthly/yearly commitments.

| Column | Type | Description |
|--------|------|-------------|
| `commitment_id` | INTEGER (PK) | Unique commitment identifier |
| `commitment_name` | TEXT | Name of commitment |
| `commitment_description` | TEXT | Details about commitment |
| `commitment_per_month` | REAL | Monthly payment amount |
| `commitment_per_year` | REAL | Yearly payment amount |
| `commitment_notes` | TEXT | Additional notes |
| `commitment_status` | TEXT | Active/Pending/Inactive/On Hold |

#### `wishlist_list_table`
Tracks items you want to purchase.

| Column | Type | Description |
|--------|------|-------------|
| `wishlist_id` | INTEGER (PK) | Unique wishlist item identifier |
| `wishlist_name` | TEXT | Item name |
| `wishlist_category` | TEXT | Gunpla/Music/Climbing/Tech/etc. |
| `estimate_price` | REAL | Estimated cost |
| `url_link` | TEXT | Product URL |
| `url_picture` | TEXT | Image URL |
| `wishlist_status` | TEXT | purchased/not_purchased |

---

## Development Notes

### Creating a Next.js Project from Scratch

If you want to create a similar project, here's how:

#### Step 1: Install Node.js
1. Download from [https://nodejs.org](https://nodejs.org)
2. Install the LTS version
3. Verify installation:
   ```cmd
   node -v
   npm -v
   ```

#### Step 2: Create Next.js App
```cmd
npm create-next-app@latest your-app-name
```

Answer the prompts:
- TypeScript? **Yes**
- ESLint? **Yes**
- Tailwind CSS? **Yes**
- App Router? **Yes**

#### Step 3: Navigate and Run
```cmd
cd your-app-name
npm run dev
```

### Installing Additional Libraries

#### Bootstrap
```bash
npm install bootstrap
```
Import in `layout.tsx`:
```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

#### Ant Design
```bash
npm install antd
```
Import in `layout.tsx`:
```tsx
import 'antd/dist/reset.css';
```

#### Ant Design Charts
```bash
npm install @ant-design/charts
```

#### Bootstrap Icons
```bash
npm install bootstrap-icons
```
Import in `layout.tsx`:
```tsx
import 'bootstrap-icons/font/bootstrap-icons.css';
```

#### SweetAlert2
```bash
npm install sweetalert2 @sweetalert2/theme-bootstrap-4
```
Usage:
```tsx
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';
```

#### Supabase
```bash
npm install @supabase/supabase-js
```

### Database Migration (SQLite to Supabase)

If you're migrating from SQLite:

1. **Export SQLite schema and data**
   ```bash
   sqlite3 mydb.sqlite .schema > schema.sql
   sqlite3 mydb.sqlite .dump > dump.sql
   ```

2. **Convert to PostgreSQL format**
   - Modify data types (INTEGER → SERIAL, TEXT → VARCHAR, etc.)
   - Adjust syntax differences

3. **Import to Supabase**
   - Use Supabase SQL Editor
   - Or use migration scripts (see `scripts/` folder)

---

<p align="center">
  <sub>Written by Muhammad Idzhans Khairi • Assisted by Claude Code AI</sub>
</p>

---

<!--
===================================================================================
ORIGINAL SECTIONS BELOW - Kept for reference
===================================================================================















<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.




---
---
---
---
---
# Self Learning Section

## Project Creation Section
To create a project do as such:

#### Step 1: Install Node.js:
1. Go to https://nodejs.org
2. Download the LTS version (recommended for stability)
3. Install it like any regular Windows app
4. After installation, open CMD and run:
```cmd
node -v
npm -v
```

#### Step 2: Create a New Next.js App
1. Open VSCode
2. Open a terminal in VSCode (Ctrl + ~)
3. Run this command to create a new Next.js project:
```cmd
npm create-next-app@latest <app-name>
```

#### Step 3: Navigate and Run Your App
```cmd
cd <app-name>
npm run dev
```

## Extra CSS Usage 
To use a bootstrap, `npm install bootstrap` and import it inside the `layout.tsx` as such:
```tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // your own style
```

To use Ant Design, do as such:
```cmd
npm install antd
```
```tsx
import 'antd/dist/reset.css'; 
```

To use Bootstrap Icon:
```cmd
npm install bootstrap-icons
```
```tsx
import 'bootstrap-icons/font/bootstrap-icons.css';
```

To use SweetAlert2:
- SweetAlert2 works in plain JS, but you can use React wrapper for easier integration:
```cmd
npm install sweetalert2
npm install @sweetalert2/theme-bootstrap-4
```
```tsx
import Swal from 'sweetalert2';
import '@sweetalert2/theme-bootstrap-4/bootstrap-4.min.css';
```

## Push project to github
1. Create a github repo at https://github.com
2. Open terminal and change directory to ur project.
3. Then:
```cmd
git init
git add .
git commit -m "Initial commit"
```

4. Pushing using HTTPS (quick, simplest)
Add the remote and push:
```cmd
git branch -M main
git remote add origin https://github.com/YourUsername/my-project.git
git push -u origin main
```

## Keycloak usage:
Start a new persistent keycloack container in docker:
```cmd
docker run -d --name nextjs_keycloak ^
  -p 8080:8080 ^
  -e KEYCLOAK_ADMIN=admin ^
  -e KEYCLOAK_ADMIN_PASSWORD=admin ^
  -v keycloak-data:/opt/keycloak/data ^
  quay.io/keycloak/keycloak:21.1.1 ^
  start-dev
```

Later you can restart it with:
```cmd
docker start keycloak   :: next day start
docker stop keycloak    :: stop when you’re done
docker logs -f keycloak :: see logs if needed

```

In the Keycloak portal, in the client, set:
Valid redirect URIs: http://localhost:3000/api/auth/callback/keycloak

Web origins: http://localhost:3000

And then go back to the created client, add predefined mappers:
`realm roles`

```
You need to configure Keycloak to include roles in the token. Do this:

In Keycloak Admin Console, go to your client:
    Clients → Your Client → Client Scopes tab
    Click on <client-id>-dedicated (or the default scope)

Add "roles" mapper to the scope:

    Go to Mappers → Create
    Name: roles
    Mapper Type: User Realm Role
    Token Claim Name: realm_access.roles (or just roles)
    Add to ID Token: ON
    Add to access token: ON
    Add to userinfo: ON
```



## Database Infomation Related:
transaction_list_table
- transaction_id
- transaction_date
- transaction_time
- transaction_description
- transaction_amount
- transaction_category
- transaction_sub_category
- transaction_card_choice
- transaction_income_source
- transaction_expense_usage
- transaction_hobby_category

account_balance_table
- account_id
- account_category (E-Wallet, Cash, Card)
- account_sub_category (TnG, Shopee Pay, Notes, Coins, RHB, Maybank, CIMB, etc.)
- account_card_type (Past/Present/Savings/Bliss - only for Card category, NULL otherwise)
- current_balance (REAL)

commitment_list_table
- commitment_id
- commitment_name
- commitment_description
- commitment_per_month
- commitment_per_year
- commitment_notes
- commitment_status (Active - active paying, Pending - in the future commitments. Not start pay yet but maybe in the future, Inactive - No more paying, On Hold - Still paying but like freezed membership and so on)


wishlist_list_table
- wishlist_id
- wishlist_name
- wishlist_category (Gunpla, Music, Climbing, Decoration, Technology, Others)
- Estimate Price
- URL Link
- URL Picture
- wishlist_status (purchased, not_purchased)





To transfer information from sqlite to the supabase later:
- sqlite3 mydb.sqlite .schema > schema.sql
- sqlite3 mydb.sqlite .dump > dump.sql -->
