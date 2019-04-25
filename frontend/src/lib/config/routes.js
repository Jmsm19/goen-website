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
      module: id => `/dashboard/admin/module/${id}`,
    },
    instructor: {
      home: '/dashboard/instructor',
    },
    student: {
      home: '/dashboard/student',
      moduleRegister: '/dashboard/student/register',
    },
  },
};
