import React from 'react';
import PropTypes from 'prop-types';
// import { useTranslation } from 'react-i18next';

import Modal from '../../UI/Modal';

import ModuleDetailsHeader from '../../Module/ModuleDetails/ModuleDetailsHeader';
import ModalConfirmationButtonArea from '../../Buttons/ModalConfirmationButtonArea';

import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  isVisible: boolean;
  onClose: BtnClick;
  onAccept: BtnClick;
  module?: Module;
}

const ModuleRegistrationModal: React.FC<Props> = ({ isVisible, onClose, onAccept, module }) => (
  // const { t } = useTranslation();

  <Modal
    isVisible={isVisible}
    onClose={onClose}
    animation='zoom'
    actionComponent={<ModalConfirmationButtonArea onYes={onAccept} onNo={onClose} />}
  >
    {!!module && (
      <section style={{ maxWidth: 500 }}>
        <ModuleDetailsHeader module={module} />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, nulla quos? Eveniet
          assumenda adipisci, corrupti ad est dolores aliquam incidunt et, rerum natus dolore
          nesciunt magni eum aspernatur. Suscipit, officiis!
        </p>
      </section>
    )}
  </Modal>
);
ModuleRegistrationModal.defaultProps = {
  module: undefined,
};

ModuleRegistrationModal.propTypes = {
  module: ModulePropType,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

export default ModuleRegistrationModal;
