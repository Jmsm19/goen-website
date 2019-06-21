import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { usePeriods } from '../../../store/context/PeriodsContext';
import Select from '../../UI/Select';

import { GetData } from '../../../lib/utils/http';

interface Props extends SelectProps {
  moduleName?: string;
}

const ModuleSectionSelector: React.FC<Props> = ({ name, moduleName, onChange, ...props }) => {
  const { activePeriod } = usePeriods();
  const [isSearching, setIsSearching] = useState(false);
  const [sections, setSections] = useState<any[]>([]);

  React.useEffect(() => {
    if (moduleName && moduleName !== '--') {
      setIsSearching(true);
      GetData(`period/${activePeriod}/module/${moduleName}/sections/availability`).then(
        ({ data }) => {
          const { availableSections } = data;
          setIsSearching(false);
          setSections(
            availableSections.map((section: string) => ({
              text: section,
              value: section,
            })),
          );
        },
      );
    } else {
      setSections([]);
    }
  }, [activePeriod, moduleName]);

  return (
    <Select loading={isSearching} name={name} options={sections} onChange={onChange} {...props} />
  );
};

ModuleSectionSelector.defaultProps = {
  moduleName: undefined,
};

ModuleSectionSelector.propTypes = {
  name: PropTypes.string.isRequired,
  moduleName: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ModuleSectionSelector;
