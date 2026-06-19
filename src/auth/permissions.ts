import { Role } from '@prisma/client';

export enum Permission {
  // Dashboard
  DASHBOARD_VIEW = 'DASHBOARD_VIEW',

  // Famílias
  FAMILY_VIEW = 'FAMILY_VIEW',
  FAMILY_CREATE = 'FAMILY_CREATE',
  FAMILY_EDIT = 'FAMILY_EDIT',
  FAMILY_DELETE = 'FAMILY_DELETE',

  // Atendimentos
  ATTENDANCE_VIEW = 'ATTENDANCE_VIEW',
  ATTENDANCE_CREATE = 'ATTENDANCE_CREATE',
  ATTENDANCE_EDIT = 'ATTENDANCE_EDIT',

  // Usuários do sistema
  USER_VIEW = 'USER_VIEW',
  USER_CREATE = 'USER_CREATE',
  USER_EDIT = 'USER_EDIT',
  USER_DELETE = 'USER_DELETE',

  // Técnicos
  TECHNICIAN_VIEW = 'TECHNICIAN_VIEW',
  TECHNICIAN_CREATE = 'TECHNICIAN_CREATE',
  TECHNICIAN_EDIT = 'TECHNICIAN_EDIT',
  TECHNICIAN_DELETE = 'TECHNICIAN_DELETE',

  // Benefícios
  BENEFIT_VIEW = 'BENEFIT_VIEW',
  BENEFIT_CREATE = 'BENEFIT_CREATE',
  BENEFIT_EDIT = 'BENEFIT_EDIT',
  BENEFIT_DELETE = 'BENEFIT_DELETE',

  // Serviços (tipos)
  SERVICE_VIEW = 'SERVICE_VIEW',
  SERVICE_CREATE = 'SERVICE_CREATE',
  SERVICE_EDIT = 'SERVICE_EDIT',
  SERVICE_DELETE = 'SERVICE_DELETE',

  // Unidades de atendimento
  UNIT_VIEW = 'UNIT_VIEW',
  UNIT_CREATE = 'UNIT_CREATE',
  UNIT_EDIT = 'UNIT_EDIT',
  UNIT_DELETE = 'UNIT_DELETE',

  // Relatórios
  REPORT_VIEW = 'REPORT_VIEW',
}

const TECHNICIAN_PERMISSIONS: Permission[] = [
  Permission.DASHBOARD_VIEW,
  Permission.FAMILY_VIEW,
  Permission.FAMILY_CREATE,
  Permission.FAMILY_EDIT,
  Permission.ATTENDANCE_VIEW,
  Permission.ATTENDANCE_CREATE,
  Permission.ATTENDANCE_EDIT,
];

const SECRETARY_PERMISSIONS: Permission[] = [
  ...TECHNICIAN_PERMISSIONS,
  Permission.FAMILY_DELETE,
  Permission.USER_VIEW,
  Permission.USER_CREATE,
  Permission.USER_EDIT,
  Permission.USER_DELETE,
  Permission.TECHNICIAN_VIEW,
  Permission.TECHNICIAN_CREATE,
  Permission.TECHNICIAN_EDIT,
  Permission.TECHNICIAN_DELETE,
  Permission.BENEFIT_VIEW,
  Permission.BENEFIT_CREATE,
  Permission.BENEFIT_EDIT,
  Permission.BENEFIT_DELETE,
  Permission.SERVICE_VIEW,
  Permission.SERVICE_CREATE,
  Permission.SERVICE_EDIT,
  Permission.SERVICE_DELETE,
  Permission.UNIT_VIEW,
  Permission.UNIT_CREATE,
  Permission.UNIT_EDIT,
  Permission.UNIT_DELETE,
  Permission.REPORT_VIEW,
];

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.TECHNICIAN]: TECHNICIAN_PERMISSIONS,
  [Role.SECRETARY]: SECRETARY_PERMISSIONS,
  [Role.ADMIN]: Object.values(Permission),
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
