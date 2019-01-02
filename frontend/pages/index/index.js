import React, { Component } from 'react';
import Router from 'next/router';

export class IndexPage extends Component {
  componentDidMount() {
    Router.push('/login');
  }

  render() {
    return <></>;
  }
}

export default IndexPage;