-- Create a table for storing transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
  category TEXT NOT NULL,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies (For this portfolio, we allow public read/write. In a real app, restrict to authenticated users)
CREATE POLICY "Allow public read access" ON transactions FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON transactions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public delete access" ON transactions FOR DELETE USING (true);
CREATE POLICY "Allow public update access" ON transactions FOR UPDATE USING (true);
