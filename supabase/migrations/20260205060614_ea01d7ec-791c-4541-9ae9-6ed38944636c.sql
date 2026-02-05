-- Add weekly voting columns to kita_votes table
ALTER TABLE public.kita_votes 
ADD COLUMN IF NOT EXISTS votes_weekly INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS voting_week_id TEXT;

-- Add voting_week_id to vote logs for tracking weekly votes
ALTER TABLE public.kita_vote_logs 
ADD COLUMN IF NOT EXISTS voting_week_id TEXT;

-- Create index for faster weekly queries
CREATE INDEX IF NOT EXISTS idx_kita_votes_weekly ON public.kita_votes(votes_weekly DESC);
CREATE INDEX IF NOT EXISTS idx_kita_votes_week_id ON public.kita_votes(voting_week_id);
CREATE INDEX IF NOT EXISTS idx_vote_logs_week_id ON public.kita_vote_logs(voting_week_id);

-- Create a function to get the current voting week ID (ISO week format: YYYY-WW)
CREATE OR REPLACE FUNCTION public.get_current_voting_week()
RETURNS TEXT AS $$
BEGIN
  RETURN TO_CHAR(NOW(), 'IYYY-IW');
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create a function to get the next Sunday 23:59:59 for countdown
CREATE OR REPLACE FUNCTION public.get_voting_end_time()
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
  RETURN DATE_TRUNC('week', NOW() + INTERVAL '1 week') - INTERVAL '1 second';
END;
$$ LANGUAGE plpgsql STABLE;