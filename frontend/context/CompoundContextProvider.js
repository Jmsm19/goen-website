import React from 'react';
import PropTypes from 'prop-types';
import { GlobalSettingsProvider } from './GlobalSettingsContext';
import { AuthContextProvider } from './AuthContext';
import { InstitutionContextProvider } from './InstitutionContext';
import { InstructorsContextProvider } from './InstructorsContext';
import { ModulesContextProvider } from './ModulesContext';

function CompoundContextProvider({ children }) {
  return (
    <GlobalSettingsProvider>
      <AuthContextProvider>
        <InstitutionContextProvider>
          <InstructorsContextProvider>
            <ModulesContextProvider>{children}</ModulesContextProvider>
          </InstructorsContextProvider>
        </InstitutionContextProvider>
      </AuthContextProvider>
    </GlobalSettingsProvider>
  );
}

CompoundContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CompoundContextProvider;
