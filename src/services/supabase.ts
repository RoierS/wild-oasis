import { createClient } from '@supabase/supabase-js';

import { Database } from '@/types/supabase';

export const supabaseUrl = 'https://fllekwzmpnmvkgmuvkma.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
