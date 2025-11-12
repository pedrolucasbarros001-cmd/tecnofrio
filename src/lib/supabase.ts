// ============================================
// TECNOFRIO - Supabase Client Configuration
// ============================================

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Supabase credentials not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// ============================================
// REALTIME HELPERS
// ============================================

export function subscribeToServices(callback: (payload: any) => void) {
  return supabase
    .channel('services-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'servicos' },
      callback
    )
    .subscribe();
}

export function subscribeToNotifications(userId: string, callback: (payload: any) => void) {
  return supabase
    .channel(`notifications-${userId}`)
    .on('postgres_changes',
      { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notificacoes',
        filter: `userId=eq.${userId}`
      },
      callback
    )
    .subscribe();
}

export function unsubscribeChannel(channel: any) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}
