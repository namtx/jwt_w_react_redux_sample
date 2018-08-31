import React from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Authentication extends React.Component {
    componentWillMount() {
      const { history, authenticated } = this.props;
      if (!authenticated) {
        history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      const { history } = this.props;
      if (!nextProps.authenticated) {
        history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return { authenticated: state.auth.authenticated };
  };

  return connect(mapStateToProps)(Authentication);
};
