/** @type {typeof import('./Role')} */
const Role = use('App/Models/Role');

// eslint-disable-next-line no-multi-assign
const UserHook = (exports = module.exports = {});

const getRole = async roleName =>
  await Role.query()
    .where('name', roleName)
    .firstOrFail();

UserHook.attachAdminRole = async modelInstance => {
  const role = await getRole('admin');
  await modelInstance.roles().attach([role.id]);
};

UserHook.attachInstructorRole = async modelInstance => {
  const role = await getRole('instructor');
  await modelInstance.roles().attach([role.id]);
};

UserHook.attachAssistantRole = async modelInstance => {
  const role = await getRole('assistant');
  await modelInstance.roles().attach([role.id]);
};

UserHook.attachStudentRole = async modelInstance => {
  const role = await getRole('student');
  await modelInstance.roles().attach([role.id]);
};
