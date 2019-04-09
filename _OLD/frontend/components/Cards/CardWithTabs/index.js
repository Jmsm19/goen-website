import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

export default class CardWithtabs extends Component {
  constructor(props) {
    super(props);
    const { defaultTabKey } = props;
    this.state = {
      currentTab: defaultTabKey,
    };
  }

  handleTabChange = key => {
    this.setState({
      currentTab: key,
    });
  };

  render() {
    const { tabs, content, defaultTabKey, ...rest } = this.props;
    const { currentTab } = this.state;

    return (
      <Card
        tabList={tabs}
        onTabChange={this.handleTabChange}
        defaultActiveTabKey={defaultTabKey}
        {...rest}
      >
        {content[currentTab]}
      </Card>
    );
  }
}

CardWithtabs.defaultProps = {
  defaultTabKey: '',
};

CardWithtabs.propTypes = {
  defaultTabKey: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tab: PropTypes.string,
      key: PropTypes.string,
    }),
  ).isRequired,
  content: PropTypes.shape().isRequired,
};
