import PropTypes from 'prop-types';

export const PeriodPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
});

export const ModulePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  period: PeriodPropType.isRequired,
});

export const UserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nationalId: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthDate: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isInstructor: PropTypes.bool.isRequired,
  isAssistant: PropTypes.bool.isRequired,
  isStudent: PropTypes.bool.isRequired,
  modulesAsInstructor: PropTypes.shape({}),
  modulesAsAssistant: PropTypes.shape({}),
});

export const RoleStringPropType = PropTypes.oneOf(['admin', 'instructor', 'assistant', 'student']);
