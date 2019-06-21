import PropTypes from 'prop-types';

import { clans, days, registrationStatuses } from '../config/constants';

export const RoleStringPropType = PropTypes.oneOf(['admin', 'instructor', 'assistant', 'student']);

export const ClanPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.oneOf(clans).isRequired,
});

export const GradePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  moduleId: PropTypes.string.isRequired,
});

export const SchedulePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  day: PropTypes.oneOf(days).isRequired,
  from: PropTypes.string.isRequired,
  until: PropTypes.string.isRequired,
});

export const PricePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
});

export const PeriodPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  signupFrom: PropTypes.string.isRequired,
  signupUntil: PropTypes.string.isRequired,
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
  registrationStatus: PropTypes.oneOf(registrationStatuses).isRequired,
  grades: PropTypes.arrayOf(GradePropType.isRequired),
  modulesAsInstructor: PropTypes.arrayOf(PropTypes.shape({})),
  modulesAsAssistant: PropTypes.arrayOf(PropTypes.shape({})),
});

export const StudentPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  registrationStatus: PropTypes.oneOf(registrationStatuses).isRequired,
  grades: PropTypes.arrayOf(GradePropType.isRequired),
});

export const SenpaiPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  modulesAsInstructor: PropTypes.arrayOf(PropTypes.shape({})),
  modulesAsAssistant: PropTypes.arrayOf(PropTypes.shape({})),
});

export const ModulePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  period: PeriodPropType.isRequired,
  schedule: SchedulePropType.isRequired,
  availableSlots: PropTypes.number.isRequired,
  price: PricePropType.isRequired,
  instructor: SenpaiPropType,
  assistant: SenpaiPropType,
  clan: ClanPropType,
});

export const UseFormPropType = PropTypes.shape({
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
});
