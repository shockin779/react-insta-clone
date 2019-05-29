import React from 'react';
import logo from './logo.svg';
import './App.css';
import PostData from '../src/dummy-data';
import SearchBar from './components/SearchBar/SearchBar';
import PostContainer from './components/PostContainer/PostContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: PostData,
      usernameSearch: null
    };
  }

  addNewComment = e => {
    e.preventDefault();
    let input = e.target.querySelector('input');
    let index = input.getAttribute('data-index');
    let postData = this.state.posts;

    let newComment = {};
    newComment.username = 'taco-tuesday';
    newComment.text = input.value;

    let currentComments = postData[index].comments;
    currentComments.push(newComment);
    input.value = '';

    localStorage.setItem('posts', JSON.stringify(postData));

    this.setState({
      posts: postData,
    })
  }

  likePost = e => {
    e.preventDefault();
    let index = e.target.getAttribute('data-index');
    let allPosts = this.state.posts;
    
    //increment posts likes by 1
    this.state.posts[index].likes += 1;

    this.setState({ posts: allPosts });
  }

  searchUserPost = e => {
    e.preventDefault();
    let username = e.target.value.toLowerCase();
    this.setState({ usernameSearch: username });
  }

  componentDidMount() {
    //Need to look up
    let storedPosts = JSON.parse(localStorage.getItem('posts'));

    if(storedPosts !== null) {
      this.setState({ posts: storedPosts });
    }
  }

  render() {
    return(
      <div className='App'>
        <SearchBar searchPosts={this.searchUserPost} />
        <PostContainer usernameSearch={this.state.usernameSearch} likePost={this.likePost} addComment={this.addNewComment} posts={this.state.posts} />
      </div>
    );
  }
}

export default App;