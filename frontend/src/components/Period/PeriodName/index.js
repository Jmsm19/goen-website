import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const PeriodName = ({ period }) => {
  const { t } = useTranslation();

  return `${t('Period._singular')} ${period.name} - ${period.year}`;
};

PeriodName.propTypes = {
  period: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
  }).isRequired,
};

export default PeriodName;
