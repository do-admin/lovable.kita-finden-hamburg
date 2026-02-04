-- Create kita_votes table to store vote counts
CREATE TABLE public.kita_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kita_id TEXT NOT NULL UNIQUE,
  vote_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create kita_vote_logs table for tracking votes by IP (spam protection)
CREATE TABLE public.kita_vote_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kita_id TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  voted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(kita_id, ip_address)
);

-- Create index for efficient lookups
CREATE INDEX idx_kita_vote_logs_kita_id ON public.kita_vote_logs(kita_id);
CREATE INDEX idx_kita_vote_logs_ip_address ON public.kita_vote_logs(ip_address);

-- Enable Row Level Security
ALTER TABLE public.kita_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kita_vote_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Everyone can read vote counts (public feature)
CREATE POLICY "Anyone can view vote counts"
ON public.kita_votes
FOR SELECT
USING (true);

-- RLS Policies: Only authenticated functions can insert/update votes
CREATE POLICY "No direct vote manipulation"
ON public.kita_votes
FOR INSERT
WITH CHECK (false);

CREATE POLICY "No direct vote update"
ON public.kita_votes
FOR UPDATE
USING (false);

-- RLS Policies: Prevent direct access to vote logs
CREATE POLICY "No direct access to vote logs"
ON public.kita_vote_logs
FOR SELECT
USING (false);

CREATE POLICY "No direct vote log insertion"
ON public.kita_vote_logs
FOR INSERT
WITH CHECK (false);