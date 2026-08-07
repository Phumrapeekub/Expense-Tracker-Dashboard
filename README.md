# 💰 Expense Tracker Dashboard

![Expense Tracker Preview](./public/preview.png)

A modern, full-stack Expense Tracker Dashboard built with **Next.js**, **React**, and **Supabase**. This project features premium data visualization, a sleek dark mode UI with glassmorphism effects, and real-time database operations.

## ✨ Features

- **Dashboard Overview:** Instantly view Total Balance, Total Income, and Total Expenses.
- **Data Visualization:**
  - **Bar Chart:** Compare monthly income vs. expenses.
  - **Donut Chart:** Analyze expense breakdown by categories.
- **Transaction History:** View recent transactions with clean, easy-to-read formatting.
- **Full-stack CRUD:** Add and delete transactions directly into a PostgreSQL database.
- **Premium UI/UX:** Built with Vanilla CSS featuring CSS Variables, Glassmorphism, Micro-animations, and responsive design.
- **Localization:** Fully localized for Thai users.

## 🚀 Tech Stack

- **Frontend:** Next.js (App Router), React 18
- **Backend/Database:** Supabase (PostgreSQL)
- **Styling:** Vanilla CSS (Zero-config, highly optimized)
- **Data Visualization:** Recharts
- **Icons:** Lucide React
- **Date Formatting:** date-fns

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a [Supabase](https://supabase.com/) account.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/expense-tracker-dashboard.git
cd expense-tracker-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Supabase
1. Create a new project on [Supabase](https://supabase.com/).
2. Go to the **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `supabase/schema.sql` and run it to create the `transactions` table.
4. Rename `.env.local.example` (or create a new `.env.local` file) in the root of your project:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
├── app/                  # Next.js App Router (Pages & Layout)
├── components/           # Reusable React components (Charts, Modals, Cards)
├── lib/                  # Utility functions (Supabase client)
├── supabase/             # Database schema and setup scripts
└── public/               # Static assets
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/expense-tracker-dashboard/issues).

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
