import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { kita_id } = await req.json();

    if (!kita_id) {
      return new Response(
        JSON.stringify({ error: "kita_id is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get client IP
    const clientIp =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      "unknown";

    // Create Supabase client with service role key for bypassing RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if user has already voted from this IP
    const { data: existingVote, error: checkError } = await supabase
      .from("kita_vote_logs")
      .select("*")
      .eq("kita_id", kita_id)
      .eq("ip_address", clientIp)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Error checking vote:", checkError);
      return new Response(
        JSON.stringify({ error: "Failed to check vote status" }),
        { status: 500, headers: corsHeaders }
      );
    }

    if (existingVote) {
      // Already voted
      return new Response(
        JSON.stringify({
          error: "You have already voted for this Kita",
          alreadyVoted: true,
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Get or create vote record
    let { data: voteRecord, error: getError } = await supabase
      .from("kita_votes")
      .select("*")
      .eq("kita_id", kita_id)
      .single();

    if (getError && getError.code === "PGRST116") {
      // Record doesn't exist, create it
      const { data: newRecord, error: insertError } = await supabase
        .from("kita_votes")
        .insert([{ kita_id, vote_count: 1 }])
        .select()
        .single();

      if (insertError) {
        console.error("Error creating vote record:", insertError);
        return new Response(
          JSON.stringify({ error: "Failed to create vote" }),
          { status: 500, headers: corsHeaders }
        );
      }

      voteRecord = newRecord;
    } else if (getError) {
      console.error("Error fetching vote record:", getError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch vote record" }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Increment vote count
    const { data: updatedRecord, error: updateError } = await supabase
      .from("kita_votes")
      .update({ vote_count: (voteRecord?.vote_count || 0) + 1 })
      .eq("kita_id", kita_id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating vote count:", updateError);
      return new Response(
        JSON.stringify({ error: "Failed to update vote count" }),
        { status: 500, headers: corsHeaders }
      );
    }

    // Log the vote
    const { error: logError } = await supabase
      .from("kita_vote_logs")
      .insert([{ kita_id, ip_address: clientIp }]);

    if (logError) {
      console.error("Error logging vote:", logError);
      // Don't fail the response - the vote was already counted
    }

    return new Response(
      JSON.stringify({
        success: true,
        vote_count: updatedRecord?.vote_count || 0,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Error in handle-vote function:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
});
