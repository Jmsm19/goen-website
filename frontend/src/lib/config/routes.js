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
      profile: '/dashboard/user/profile',
    },
    admin: {
      home: '/dashboard/admin',
      instructors: '/dashboard/admin/instructors',
      module: id => `/dashboard/admin/module/${id || ':id'}`,
    },
    instructor: {
      home: '/dashboard/instructor',
      profile: id => `/dashboard/instructor/${id}` || ':id',
    },
    student: {
      home: '/dashboard/student',
      profile: id => `/dashboard/student${id ? `/${id}` : ''}`,
      moduleRegister: '/dashboard/student/register',
    },
    assistant: {
      home: '/dashboard/assistant',
      profile: id => `/dashboard/assistant/${id}` || ':id',
    },
  },
};
