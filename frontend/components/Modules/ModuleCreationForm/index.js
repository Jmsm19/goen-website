import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Select, Button, Icon, notification, Form } from 'antd';
import { Formik, Field } from 'formik';
import { formatHoursFromDB, notifyError } from '../../../utils';
import { GetData, SendData } from '../../../utils/fetch';
import { moduleFormValidation, hasErrors } from '../../../utils/formValidation';

class ModuleCreationForm extends Component {
  state = {
    loadingSections: false,
    availableSections: [],
    clans: [],
  };

  componentDidMount() {
    this.getClans();
  }

  getClans = () => {
    GetData('/clan')
      .then(res => res.json())
      .then(({ data }) => {
        this.setState({
          clans: [...data],
        });
      })
      .catch(notifyError);
  };

  getAvailableSections = (periodId, moduleName) => {
    this.setState(
      {
        loadingSections: true,
      },
      () => {
        GetData(`/period/${periodId}/module/${moduleName}/sections/available`)
          .then(res => res.json())
          .then(({ data, error }) => {
            if (error) {
              this.setState({
                loadingSections: false,
              });
              throw Error(error);
            }

            const sections = data.available_sections;
            this.setState({
              loadingSections: false,
              availableSections: [...sections],
            });
          })
          .catch(notifyError);
      },
    );
  };

  submitForm = (values, { setSubmitting }) => {
    const { t, period, addModuleToCurrentPeriod } = this.props;

    SendData('POST', '/module', { ...values, period_id: period.id })
      .then(res => res.json())
      .then(({ data, error }) => {
        if (error) {
          setSubmitting(false);
          throw Error(error);
        }

        addModuleToCurrentPeriod(data);
        notification.success({
          message: t('ModuleCreated'),
        });

        this.setState(
          {
            availableSections: [],
          },
          () => setSubmitting(false),
        );
      })
      .catch(notifyError);
  };

  render() {
    const { t, period, schedules, onPlusBtnClick } = this.props;
    const { clans, availableSections, loadingSections } = this.state;

    return (
      <Formik
        initialValues={{
          name: '',
          section: '',
          schedule_id: undefined,
          clan_id: undefined,
        }}
        validationSchema={moduleFormValidation(t)}
        onSubmit={this.submitForm}
      >
        {({ isSubmitting, handleSubmit, setFieldValue, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <div
              className='module'
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'minmax(100px, max-content) minmax(150px, max-content)  minmax(100px, max-content)',
                gridGap: 10,
              }}
            >
              <Form.Item
                htmlFor='name'
                label={t('Module.Name')}
                validateStatus={hasErrors('name', errors, touched) ? 'error' : 'success'}
              >
                <Field
                  name='name'
                  render={({ field: { name } }) => (
                    <Select
                      name={name}
                      placeholder={t('Module._singular')}
                      loading={false}
                      disabled={false}
                      onChange={value => {
                        this.getAvailableSections(period.id, value);
                        setFieldValue(name, value);
                      }}
                    >
                      <Select.Option value='M-0'>M-0</Select.Option>
                      <Select.Option value='M-1'>M-1</Select.Option>
                    </Select>
                  )}
                />
              </Form.Item>

              <Form.Item
                htmlFor='section'
                label={t('Module.Section')}
                validateStatus={hasErrors('section', errors, touched) ? 'error' : 'success'}
              >
                <Field
                  name='section'
                  render={({ field: { name } }) => (
                    <Select
                      name={name}
                      placeholder={t('Module.Section')}
                      defaultActiveFirstOption
                      defaultValue={availableSections[0]}
                      loading={loadingSections}
                      disabled={loadingSections || !availableSections.length}
                      validateStatus={hasErrors(name, errors, touched) ? 'error' : 'success'}
                      help={hasErrors(name, errors, touched) ? errors[name] : ''}
                      onChange={value => {
                        setFieldValue(name, value);
                      }}
                    >
                      {availableSections.map(section => (
                        <Select.Option key={uuid()} value={section}>
                          {section}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>

              {values.name === 'M-0' && (
                <Form.Item
                  htmlFor='clan_id'
                  label={t('Clan')}
                  validateStatus={hasErrors('clan_id', errors, touched) ? 'error' : 'success'}
                >
                  <Field
                    name='clan_id'
                    render={({ field: { name } }) => (
                      <Select
                        name={name}
                        placeholder={t('Clan')}
                        defaultActiveFirstOption
                        loading={!clans.length}
                        disabled={!clans.length}
                        validateStatus={hasErrors(name, errors, touched) ? 'error' : 'success'}
                        help={hasErrors(name, errors, touched) ? errors[name] : ''}
                        onChange={value => {
                          setFieldValue(name, value);
                        }}
                      >
                        {clans.map(clan => (
                          <Select.Option key={uuid()} value={clan.id}>
                            {clan.name}
                          </Select.Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
              )}
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gridGap: 10,
              }}
            >
              <Form.Item
                htmlFor='schedule_id'
                label={t('Schedule._singular')}
                validateStatus={hasErrors('schedule_id', errors, touched) ? 'error' : 'success'}
              >
                <Field
                  name='schedule_id'
                  render={({ field: { name } }) => (
                    <Select
                      name={name}
                      placeholder={t('Module.Schedule')}
                      loading={false}
                      disabled={false}
                      onChange={value => {
                        setFieldValue(name, value);
                      }}
                    >
                      {schedules.map(schedule => (
                        <Select.Option key={uuid()} value={schedule.id}>
                          {`${t(schedule.day)} - ${formatHoursFromDB(schedule.from)}`}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                />
              </Form.Item>

              <div
                className='ant-row'
                style={{ marginBottom: 27, display: 'flex', alignItems: 'flex-end' }}
              >
                <Button type='dashed' onClick={onPlusBtnClick}>
                  <Icon type='plus' />
                </Button>
              </div>
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

ModuleCreationForm.defaultProps = {
  onPlusBtnClick: () => null,
  addModuleToCurrentPeriod: () => null,
};

ModuleCreationForm.propTypes = {
  t: PropTypes.func.isRequired,
  schedules: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string,
      from: PropTypes.string,
    }),
  ).isRequired,
  period: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  onPlusBtnClick: PropTypes.func,
  addModuleToCurrentPeriod: PropTypes.func,
};

export default ModuleCreationForm;
