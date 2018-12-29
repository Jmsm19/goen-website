import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Meta from '../Meta';

class Page extends Component {
  state = {};

  render() {
    const { children } = this.props;

    return (
      <div className="page">
        <Meta />
        <Header />
        <div className="inner">
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

Page.propTypes = {
  children: PropTypes.node.isRequired
}

export default Page;