import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPosts } from '../actions';

class Posts extends React.Component {
  componentWillMount() {
    this.props.fetchPosts(); // eslint-disable-line react/destructuring-assignment
  }

  render() {
    const { posts } = this.props;
    return (
      <ul>
        {posts.map((post, index) => <li key={index}>{post}</li>)}
      </ul>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.shape(PropTypes.array),
  fetchPosts: PropTypes.func.isRequired,
};

Posts.defaultProps = {
  posts: [],
};

const mapStateToProps = state => (
  { posts: state.auth.posts }
);

const mapDispatchToProps = dispatch => (
  { fetchPosts: () => dispatch(fetchPosts()) }
);

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
