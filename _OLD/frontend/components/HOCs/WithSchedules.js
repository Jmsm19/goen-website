import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import { getDisplayName, notifyError, callFunctions } from '../../utils/index';
import { GetData, SendData } from '../../utils/fetch';
import { days } from '../../utils/constants';

function withSchedules(WrappedComponent) {
  class WithSchedules extends Component {
    state = {
      schedules: [],
    };

    componentDidMount() {
      this.getSchedules();
    }

    sortSchedules = schedules =>
      [...schedules].sort((a, b) => (days.indexOf(a.day) < days.indexOf(b.day) ? -1 : 1));

    getSchedules = () => {
      GetData('/schedule')
        .then(res => res.json())
        .then(({ data }) => {
          const orderedSchedules = this.sortSchedules(data);
          this.setState({
            schedules: orderedSchedules,
          });
        });
    };

    createSchedule = (values, setSubmitting, t, afterSubmit) => {
      SendData('POST', '/schedule', values)
        .then(res => res.json())
        .then(({ data, error }) => {
          if (error) {
            setSubmitting(false);
            throw Error(error);
          }

          callFunctions(afterSubmit);
          setSubmitting(false);
          this.setState(
            prevState => {
              const { schedules } = prevState;
              schedules.push(data);

              return {
                schedules: this.sortSchedules(schedules),
              };
            },
            () => {
              notification.success({
                message: t('Schedule.Created'),
              });
            },
          );
        })
        .catch(notifyError);
    };

    render() {
      const { schedules } = this.state;
      return (
        <WrappedComponent
          schedules={schedules}
          createSchedule={this.createSchedule}
          {...this.props}
        />
      );
    }
  }

  WithSchedules.displayName = `WithSchedules(${getDisplayName(WrappedComponent)})`;
  return WithSchedules;
}

withSchedules.propTypes = {
  WrappedComponent: PropTypes.node.isRequired,
};

export default withSchedules;
