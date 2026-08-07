import './globals.css';

export const metadata = {
  title: 'Expense Tracker Dashboard',
  description: 'Premium Expense Tracker built with Next.js and Supabase',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
