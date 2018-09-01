import React from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Authentication extends React.Component {
    componentWillMount() {
      const token = localStorage.getItem('token');
      const { history } = this.props;

      if (!token) {
        history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.authenticated) {
        history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => (
    { authenticated: state.auth.authenticated }
  );

  return connect(mapStateToProps)(Authentication);
};
