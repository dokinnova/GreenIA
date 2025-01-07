import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://caelpearderjwnpkgjst.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZWxwZWFyZGVyandua3Bnanp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ2NDQ0NDcsImV4cCI6MjAyMDIyMDQ0N30.Hy_4Ys-8hZQvqGRUQy5g-Gy5p_YxUzYzXFp5yxjhvQE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);