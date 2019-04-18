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
    admin: {
      home: 'dashboard/admin',
      instructors: '/dashboard/instructors',
      modules: '/dashboard/modules',
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
