import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withInstructorsContext from '../../../../components/HOCs/withInstructorsContext';
import { filterArrayByName } from '../../../../utils';
import InstructorsFilter from '../../../../components/InstructorPage/InstructorsFilter';
import { withNamespaces } from '../../../../i18n';
import {
  StyledSearchInput,
  StyledPage,
  InstructorsArea,
} from '../../../../styles/components/InstructorPage';

class InstructorsManagementPage extends Component {
  state = {
    filteredInstructors: null,
  };

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    const {
      instructorContext: { instructors, getAllInstructors },
    } = this.props;
    if (!instructors.length) {
      getAllInstructors();
    }
  }

  handleInstructorFilter = name => {
    const {
      instructorContext: { instructors },
    } = this.props;

    this.setState({
      filteredInstructors: filterArrayByName(instructors, name),
    });
  };

  render() {
    const { filteredInstructors } = this.state;
    const {
      t,
      instructorContext: { instructors, loading },
    } = this.props;

    return (
      <StyledPage>
        <StyledSearchInput
          autoFocus
          placeholder={t('InstuctorName')}
          onChange={({ target }) => this.handleInstructorFilter(target.value)}
        />

        <InstructorsArea className='instructors' loading={loading}>
          <InstructorsFilter
            t={t}
            loading={loading}
            instructors={filteredInstructors || instructors}
          />
        </InstructorsArea>
      </StyledPage>
    );
  }
}

InstructorsManagementPage.propTypes = {
  t: PropTypes.func.isRequired,
  instructorContext: PropTypes.shape({
    instructors: PropTypes.arrayOf(PropTypes.shape).isRequired,
    getAllInstructors: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNamespaces('common')(withInstructorsContext(InstructorsManagementPage));
