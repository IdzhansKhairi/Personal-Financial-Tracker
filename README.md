This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
- commitment_per_month
- commitment_per_year
- 