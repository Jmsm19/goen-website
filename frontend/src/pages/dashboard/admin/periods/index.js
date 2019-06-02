import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { usePeriods } from '../../../../store/context/PeriodsContext';
import useLayoutContext from '../../../../hooks/useLayoutContext';

import Button from '../../../../components/UI/Button';
import PeriodsTable from '../../../../components/Tables/PeriodsTable';
import PeriodYearSelector from '../../../../components/Selector/PeriodYearSelector';
import CreatePeriodModal from '../../../../components/Modals/CreatePeriodModal';
import ConfirmationModal from '../../../../components/Modals/ConfirmationModal';

import { filterArrayBy } from '../../../../lib/utils';
import usePeriodPageStyles from './styles';

const ManagePeriods = props => {
  const { t } = useTranslation();
  const { isMobile } = useLayoutContext();
  const { allPeriodsSearched, periods, getAllPeriods, deletePeriod } = usePeriods();
  const classes = usePeriodPageStyles({ isMobile });

  const [showCreatePeriodForm, setShowCreatePeriodForm] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isSearchingPeriods, setIsSearchingPeriods] = useState(false);
  const [periodToDelete, setPeriodToDelete] = useState(null);
  const [yearToFilter, setYearToFilter] = useState(String(new Date().getFullYear()));
  const [filteredPeriods, setFilteredPeriods] = useState(null);

  const periodsArray = useMemo(() => [...periods.values()], [periods]);

  useEffect(() => {
    if (!isSearchingPeriods && !allPeriodsSearched) {
      setIsSearchingPeriods(true);
      getAllPeriods();
    } else if (isSearchingPeriods && allPeriodsSearched) {
      setIsSearchingPeriods(false);
    }
  }, [allPeriodsSearched, getAllPeriods, isSearchingPeriods]);

  useEffect(() => {
    setFilteredPeriods(filterArrayBy('year', yearToFilter, periodsArray));
  }, [periods, periodsArray, yearToFilter]);

  return (
    <div className={`periods-page ${classes.root}`}>
      <h1>{t('Period.Manage')}</h1>

      <section>
        <div className='period-search-area'>
          <Button
            type='success'
            fullWidth={isMobile}
            iconPosition='start'
            text={t('Period.Create')}
            onClick={() => setShowCreatePeriodForm(true)}
          />
          {!!periodsArray.length && (
            <div className='period-filter'>
              <p>{t('Filter.ShowOnly')}: </p>
              <PeriodYearSelector
                name='year'
                periods={periodsArray}
                onChange={setYearToFilter}
                defaultSelected={String(new Date().getFullYear())}
              />
            </div>
          )}
        </div>
        <PeriodsTable
          periods={filteredPeriods || periodsArray}
          loading={isSearchingPeriods}
          deleteCol
          onDelete={id => {
            setShowConfirmationModal(true);
            setPeriodToDelete(id);
          }}
        />
      </section>

      <CreatePeriodModal
        isVisible={showCreatePeriodForm}
        onClose={() => setShowCreatePeriodForm(false)}
      />
      <ConfirmationModal
        isVisible={showConfirmationModal}
        onAccept={() => {
          deletePeriod(periodToDelete);
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          setPeriodToDelete(null);
          setShowConfirmationModal(false);
        }}
      />
    </div>
  );
};

ManagePeriods.propTypes = {};

export default ManagePeriods;
