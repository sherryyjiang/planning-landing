import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create a Supabase client with service role key (bypasses RLS)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    // Enhanced error logging
    const missingVars = [];
    if (!supabaseUrl) missingVars.push('NEXT_PUBLIC_SUPABASE_URL');
    if (!supabaseServiceKey) missingVars.push('SUPABASE_SERVICE_ROLE_KEY');

    if (missingVars.length > 0) {
      const errorMsg = `Missing Supabase credentials: ${missingVars.join(', ')}`;
      console.error(errorMsg);
      return NextResponse.json(
        { error: 'Server configuration error', details: errorMsg },
        { status: 500 }
      );
    }

    // Log the credentials being used (without revealing full key)
    console.log('Using Supabase URL:', supabaseUrl);
    console.log('Service key available:', !!supabaseServiceKey);
    if (supabaseServiceKey) {
      // Log first and last few characters of the key to help with debugging
      const keyStart = supabaseServiceKey.substring(0, 4);
      const keyEnd = supabaseServiceKey.substring(supabaseServiceKey.length - 4);
      console.log(`Service key format check: ${keyStart}...${keyEnd}`);
    }

    // At this point, we've verified that both values exist
    const supabase = createClient(
      supabaseUrl as string, 
      supabaseServiceKey as string, 
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Insert the email into the testflight-signups table
    const { error } = await supabase
      .from('testflight-signups')
      .insert([{ email }]);

    if (error) {
      console.error('Error inserting email:', error);
      return NextResponse.json(
        { error: 'Failed to save email: ' + error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 