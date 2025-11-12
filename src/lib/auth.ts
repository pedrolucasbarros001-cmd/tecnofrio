// ============================================
// TECNOFRIO - Authentication Utilities
// ============================================

import { supabase } from './supabase';
import type { UserRole, User } from './types';

// ============================================
// SESSION MANAGEMENT
// ============================================

export function saveUserSession(user: User) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('selectedRole', user.role);
  }
}

export function getUserSession(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function clearUserSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('selectedRole');
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('isAuthenticated') === 'true';
}

export function getSelectedRole(): UserRole | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('selectedRole') as UserRole | null;
}

// ============================================
// SUPABASE AUTH
// ============================================

export async function signUp(email: string, password: string, name: string, role: UserRole) {
  try {
    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Falha ao criar usuário');

    // 2. Criar registro na tabela usuarios
    const { error: dbError } = await supabase
      .from('usuarios')
      .insert({
        id: authData.user.id,
        email,
        name,
        role,
        phone: '',
        created_at: new Date().toISOString()
      });

    if (dbError) throw dbError;

    return { success: true, user: authData.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signIn(emailOrPhone: string, password: string) {
  try {
    // Tentar login com email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailOrPhone,
      password
    });

    if (error) throw error;
    if (!data.user) throw new Error('Usuário não encontrado');

    // Buscar dados completos do usuário
    const { data: userData, error: userError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) throw userError;

    const user: User = {
      id: userData.id,
      email: userData.email,
      phone: userData.phone || '',
      name: userData.name,
      role: userData.role,
      avatar: userData.avatar,
      isOnline: true,
      createdAt: new Date(userData.created_at)
    };

    saveUserSession(user);

    return { success: true, user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function signOut() {
  try {
    await supabase.auth.signOut();
    clearUserSession();
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: userData } = await supabase
      .from('usuarios')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!userData) return null;

    return {
      id: userData.id,
      email: userData.email,
      phone: userData.phone || '',
      name: userData.name,
      role: userData.role,
      avatar: userData.avatar,
      isOnline: true,
      createdAt: new Date(userData.created_at)
    };
  } catch {
    return null;
  }
}

// ============================================
// ROLE-BASED ACCESS CONTROL
// ============================================

export function canAccessRoute(userRole: UserRole, route: string): boolean {
  const roleRoutes: Record<UserRole, string[]> = {
    dono: ['/dono'],
    secretaria: ['/secretaria'],
    tecnico: ['/tecnico']
  };

  const allowedPrefixes = roleRoutes[userRole] || [];
  return allowedPrefixes.some(prefix => route.startsWith(prefix));
}

export function getDefaultRoute(role: UserRole): string {
  const routes: Record<UserRole, string> = {
    dono: '/dono/dashboard',
    secretaria: '/secretaria/geral',
    tecnico: '/tecnico/servicos'
  };
  return routes[role];
}

// ============================================
// PERMISSIONS
// ============================================

export const PERMISSIONS = {
  // Dono - acesso total
  dono: {
    canCreateService: true,
    canEditService: true,
    canDeleteService: true,
    canAssignTechnician: true,
    canSetPrice: true,
    canFinalizeService: true,
    canViewAllServices: true,
    canEditTechnicianData: true,
    canForceTransitions: true,
    canViewFinancial: true,
    canManageUsers: true
  },
  // Secretária - gestão operacional
  secretaria: {
    canCreateService: true,
    canEditService: true, // apenas dados do cliente
    canDeleteService: false,
    canAssignTechnician: true,
    canSetPrice: false,
    canFinalizeService: false,
    canViewAllServices: true,
    canEditTechnicianData: false,
    canForceTransitions: false,
    canViewFinancial: true,
    canManageUsers: false
  },
  // Técnico - execução
  tecnico: {
    canCreateService: false,
    canEditService: false,
    canDeleteService: false,
    canAssignTechnician: false,
    canSetPrice: false,
    canFinalizeService: false,
    canViewAllServices: false, // apenas seus serviços
    canEditTechnicianData: true, // apenas seus registros
    canForceTransitions: false,
    canViewFinancial: false,
    canManageUsers: false
  }
};

export function hasPermission(role: UserRole, permission: keyof typeof PERMISSIONS.dono): boolean {
  return PERMISSIONS[role][permission] || false;
}
