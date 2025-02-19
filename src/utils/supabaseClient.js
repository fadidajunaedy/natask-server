const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
