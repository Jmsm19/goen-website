export const getRegisteredStudentsInModule = module =>
  module.students.reduce(
    (totalStudents, student) =>
      student.registrationStatus === 'registered' ? totalStudents + 1 : totalStudents,
    0,
  );

export const getTotalRegisteredStudents = modules =>
  modules.reduce((total, module) => {
    const registeredStudents = getRegisteredStudentsInModule(module);
    return total + registeredStudents;
  }, 0);

export const getTotalStudents = modules =>
  modules.reduce((total, module) => total + module.students.length, 0);

export const getExpectedIncome = modules => {
  const calculateExpectedModuleIncome = module => module.price.amount * 14;
  return modules.reduce((total, module) => total + calculateExpectedModuleIncome(module), 0);
};

export const getActualIncome = modules => {
  const calculateActualModuleIncome = module =>
    module.price.amount * getRegisteredStudentsInModule(module);
  return modules.reduce((total, module) => total + calculateActualModuleIncome(module), 0);
};
