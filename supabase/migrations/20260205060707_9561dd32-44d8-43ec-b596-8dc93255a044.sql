-- Fix function search_path for security
CREATE OR REPLACE FUNCTION public.get_current_voting_week()
RETURNS TEXT AS $$
BEGIN
  RETURN TO_CHAR(NOW(), 'IYYY-IW');
END;
$$ LANGUAGE plpgsql IMMUTABLE SET search_path = public;

CREATE OR REPLACE FUNCTION public.get_voting_end_time()
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
  RETURN DATE_TRUNC('week', NOW() + INTERVAL '1 week') - INTERVAL '1 second';
END;
$$ LANGUAGE plpgsql STABLE SET search_path = public;