​​import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://hpayulnbimggunlahixd.supabase.co';
const supabaseAnonKey =
 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYXl1bG5iaW1nZ3VubGFoaXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNTYwNjksImV4cCI6MjA3OTczMjA2OX0.UM6qc3e5qVxwGlpZjNRoK__g_slCvJXpz90TfFp_ut8';


export const supabase = createClient(supabaseUrl, supabaseAnonKey);