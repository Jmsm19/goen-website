export const getRegisteredStudentsCount = (students = []) =>
  Array.isArray(students)
    ? students.reduce(
        (totalStudents, student) =>
          student.registrationStatus === 'registered' ? totalStudents + 1 : totalStudents,
        0,
      )
    : 0;

export const getTotalRegisteredStudents = (studentsArr = []) =>
  studentsArr.reduce((total, students) => {
    const registeredStudents = getRegisteredStudentsCount(students);
    return total + registeredStudents;
  }, 0);

export const getTotalStudents = (studentsArr = []) =>
  studentsArr.reduce((total, students = []) => total + students.length, 0);

export const getActualIncome = (modules = [], students = new Map()) => {
  const calculateActualModuleIncome = module =>
    module.price.amount * getRegisteredStudentsCount(students.get(module.id));

  return modules.reduce((total, module) => total + calculateActualModuleIncome(module), 0);
};
