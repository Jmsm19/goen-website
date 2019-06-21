import React from 'react';
import PropTypes from 'prop-types';

import useSortedPeriodModules from '../../../../../hooks/useSortedPeriodModules';

import Loading from '../../../../../components/Loading';
import ModuleSummaryCardGrid from '../../../../../components/Cards/ModuleSummaryCardGrid';

import { filterModulesByNumber, formatPrice } from '../../../../../lib/utils';
import { PeriodPropType } from '../../../../../lib/validation/propTypesValues';

interface Props {
  period?: Period;
  selectModule: BtnClick;
}

const ModuleSelection: React.FC<Props> = ({ period, selectModule }) => {
  const [modules, isLoadingModules] = useSortedPeriodModules(period ? period.id : undefined);

  const introductoryModules = React.useMemo(() => filterModulesByNumber(modules, 0), [modules]);
  const basicModules = React.useMemo(() => filterModulesByNumber(modules, 1, 4), [modules]);
  const intermediateModules = React.useMemo(() => filterModulesByNumber(modules, 5, 9), [modules]);
  const advancedModules = React.useMemo(() => filterModulesByNumber(modules, 10, 16), [modules]);

  return (
    <>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta ut reprehenderit earum
          cumque aperiam sit impedit nemo expedita quasi, ex beatae unde molestias architecto est
          magnam nesciunt voluptas et amet?
        </p>
      </section>

      <section className='available-modules-section'>
        <h2 className='section-title'>Available Modules</h2>

        {isLoadingModules ? (
          <Loading />
        ) : (
          <>
            {!!introductoryModules.length && (
              <section className='module-section'>
                <h3 className='section-title'>
                  Introductory{' '}
                  <span className='module-price'>
                    {formatPrice(introductoryModules[0].price.amount)}
                  </span>
                </h3>
                <ModuleSummaryCardGrid modules={introductoryModules} onCardClick={selectModule} />
              </section>
            )}

            {!!basicModules.length && (
              <section className='module-section'>
                <h3 className='section-title'>
                  Basic
                  <span className='module-price'>{formatPrice(basicModules[0].price.amount)}</span>
                </h3>
                <ModuleSummaryCardGrid modules={basicModules} onCardClick={selectModule} />
              </section>
            )}

            {!!intermediateModules.length && (
              <section className='module-section'>
                <h3 className='section-title'>
                  Intermediate
                  <span className='module-price'>
                    {formatPrice(intermediateModules[0].price.amount)}
                  </span>
                </h3>

                <ModuleSummaryCardGrid modules={intermediateModules} onCardClick={selectModule} />
              </section>
            )}

            {!!advancedModules.length && (
              <section className='module-section'>
                <h3 className='section-title'>
                  Advanced
                  <span className='module-price'>
                    {formatPrice(advancedModules[0].price.amount)}
                  </span>
                </h3>

                <ModuleSummaryCardGrid modules={advancedModules} onCardClick={selectModule} />
              </section>
            )}
          </>
        )}
      </section>
    </>
  );
};

ModuleSelection.defaultProps = {
  period: undefined,
};

ModuleSelection.propTypes = {
  period: PeriodPropType,
  selectModule: PropTypes.func.isRequired,
};

export default ModuleSelection;
