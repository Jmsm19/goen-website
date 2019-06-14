module.exports = {
  // PLAIN LAYOUT
  home: '/',
  login: '/',
  register: '/register',
  activate: '/activate',

  // DASHBOARD LAYOUT
  dashboard: {
    prefix: '/dashboard',
    home: '/dashboard',
    settings: '/dashboard/settings',
    user: {
      profile: (id = ':id?') => `/dashboard/user/${id}`,
    },
    admin: {
      home: '/dashboard/admin',
      managePeriods: '/dashboard/admin/periods',
      periodDetails: (id = ':id') => `/dashboard/period/${id}`,
      instructors: '/dashboard/admin/instructors',
      modules: '/dashboard/admin/modules',
      module: (id = ':id') => `/dashboard/admin/module/${id}`,
      users: '/dashboard/admin/user',
    },
    instructor: {
      home: '/dashboard/instructor',
    },
    student: {
      home: '/dashboard/student',
      moduleRegister: '/dashboard/student/register',
    },
    assistant: {
      home: '/dashboard/assistant',
    },
  },
};
