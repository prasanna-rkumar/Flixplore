import { createClient } from '@supabase/supabase-js';

const serverSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SECRET_SUPABASE_SERVICE_KEY,
);

export default serverSupabase;
