const { hooks } = require('@adonisjs/ignitor');

hooks.after.providersBooted(() => {
  const Validator = use('Validator');
  const Database = use('Database');
  const Hashids = use('Hashids');
  const User = use('App/Models/User');

  const decodeIdIfNeeded = (column, value) => {
    const isIdColumn = /(^id$|_id$)/.test(column);
    return isIdColumn ? Hashids.decode(String(value))[0] || 0 : value;
  };

  const existsFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) {
      return; // skip validation if value is not defined
    }

    const [table, column] = args;

    const row = await Database.table(table)
      .where(column, decodeIdIfNeeded(column, value))
      .first();

    if (!row) {
      throw message;
    }
  };

  const hasRoleFn = async (data, field, message, args, get) => {
    const value = get(data, field);
    if (!value) {
      return; // skip validation if value is not defined
    }

    const [roleName] = args;
    const user = await User.findByHash(value);
    const hasRole = user ? await user.hasRole(roleName) : false;

    if (!user || !hasRole) {
      throw message;
    }
  };

  Validator.extend('exists', existsFn);
  Validator.extend('hasRole', hasRoleFn);
});
