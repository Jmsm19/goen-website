import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { Form, Select, Button, Input } from 'antd';
import { days } from '../../../utils/constants';
import { hasErrors, scheduleFormValidation } from '../../../utils/formValidation';

class ScheduleCreationForm extends Component {
  state = {};

  render() {
    const { t, onSubmit, afterSubmit } = this.props;
    const initialValues = {
      day: 'Monday',
      from: '08:30',
      until: '10:30',
    };

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={scheduleFormValidation(t)}
        onSubmit={(values, { setSubmitting }) => onSubmit(values, setSubmitting, t, afterSubmit)}
      >
        {({ isSubmitting, handleSubmit, setFieldValue, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Item
              label={t('Schedule.Day')}
              validateStatus={hasErrors('day', errors, touched) ? 'error' : 'success'}
            >
              <Field
                name='day'
                render={({ field: { name } }) => (
                  <Select
                    name={name}
                    defaultValue='Monday'
                    onChange={value => {
                      setFieldValue(name, value);
                    }}
                  >
                    {days.map(day => (
                      <Select.Option key={day} value={day}>
                        {t(day)}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>

            <div
              className='schedule-time'
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridGap: 10,
              }}
            >
              <Form.Item
                label={t('Schedule.From')}
                validateStatus={hasErrors('from', errors, touched) ? 'error' : 'success'}
              >
                <Field name='from' render={({ field }) => <Input {...field} type='time' />} />
              </Form.Item>

              <Form.Item
                label={t('Schedule.Until')}
                validateStatus={hasErrors('until', errors, touched) ? 'error' : 'success'}
                help={hasErrors('until', errors, touched) ? errors.until : ''}
              >
                <Field name='until' render={({ field }) => <Input {...field} type='time' />} />
              </Form.Item>
            </div>

            <Button type='primary' htmlType='submit' loading={isSubmitting}>
              {t('Create')}
            </Button>
          </Form>
        )}
      </Formik>
    );
  }
}

ScheduleCreationForm.defaultProps = {
  afterSubmit: () => null,
};

ScheduleCreationForm.propTypes = {
  t: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func,
};

export default ScheduleCreationForm;
