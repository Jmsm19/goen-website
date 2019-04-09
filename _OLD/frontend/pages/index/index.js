import React, { Component } from 'react';
import Router from 'next/router';

export class IndexPage extends Component {
  componentDidMount() {
    Router.push('/login');
  }

  render() {
    return (
      <>
        <h3>Redirecting...</h3>
      </>
    );
  }
}

export default IndexPage;
