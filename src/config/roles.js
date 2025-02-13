export const ROLES = {
  KEYHOLDER: 'keyholder',
  ADMIN: 'admin',
  TEAM: 'team',
  CLIENT: 'client'
};

export const ROLE_PERMISSIONS = {
  [ROLES.KEYHOLDER]: {
    dashboards: ['admin', 'sales', 'data', 'financial', 'hr', 'calendar', 'meetings', 'travel', 'projects', 'company', 'messages', 'settings'],
    actions: ['manage_roles', 'manage_users', 'manage_company', 'view_all_data', 'edit_all_data']
  },
  [ROLES.ADMIN]: {
    dashboards: ['admin', 'sales', 'data', 'financial', 'hr', 'calendar', 'meetings', 'travel', 'projects', 'messages', 'settings'],
    actions: ['manage_users', 'view_all_data', 'edit_department_data']
  },
  [ROLES.TEAM]: {
    dashboards: ['projects', 'calendar', 'meetings', 'travel', 'messages', 'settings'],
    actions: ['view_team_data', 'edit_own_data']
  },
  [ROLES.CLIENT]: {
    dashboards: ['projects', 'calendar', 'meetings', 'messages', 'settings'],
    actions: ['view_own_data']
  }
};
