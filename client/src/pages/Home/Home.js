import React, { Component } from 'react';
import { Form, Input, FormBtn } from '../../components/Form';
import API from '../../utils/API';
import { List, ListItem } from '../../components/List';

class Home extends Component {
  state = {
    articles: [],
    savedArticles: [],
    topic: '',
    startYear: '',
    endYear: ''
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then( res => {
        this.setState({ articles: res.data });
        console.log(this.state.articles);
      })
      .catch( err => console.log(err) );
  };

  saveArticle = articleData => {
    API.saveArticle(articleData)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear) {
      API.searchNYT({
        topic: this.state.topic,
        startYear: this.state.startYear,
        endYear: this.state.endYear
      })
        .then( res => {
          console.log(res.data.response.docs);
          this.setState({
            articles: res.data.response.docs,
            topic: '',
            startYear: '',
            endYear: ''
          });
        })
        .catch( err => console.log(err) );
    }
  };

  render() {
    return (
      <div className="container">
        <hr />
        <h4 id="search" className="offset">Search for Articles</h4>
        <div className="row">
          <Form>
            <div className="row">
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                id="topic"
                name="topic"
                type="text"
                colWidth="s12"
                className="validate"
                required="required"
                children="Topic"
              />
            </div>
            <div className="row">
              <Input
                value={this.state.startYear}
                onChange={this.handleInputChange}
                id="startYear"
                name="startYear"
                type="text"
                colWidth="s6"
                className="validate"
                required="required"
                pattern="[0-9]{4}"
                children="Start Year (4 digits)"
              />
              <Input
                value={this.state.endYear}
                onChange={this.handleInputChange}
                id="endYear"
                name="endYear"
                type="text"
                colWidth="s6"
                className="validate"
                pattern="[0-9]{4}"
                children="End Year (4 digits)"
              />
            </div>
            <FormBtn
              id="searchBtn"
              type="submit"
              onClick={this.handleFormSubmit}
              disabled={ !(this.state.topic && this.state.startYear) }
              children="Search"
            />
          </Form>
        </div>
        {this.state.articles.length ? (
          <div>
            <hr />
            <h4 id="results" className="offset">Your Search Results</h4>
            <List>
              {this.state.articles.map(article => (
                <ListItem
                  key={article._id}
                  _id={article._id}
                  url={article.web_url}
                  headline={article.headline.main}
                  summary={article.snippet}
                  byline={ (article.byline && article.byline.original) ? article.byline.original : "NOT AVAILABLE" }
                  image="https://placehold.it//210x140"
                  date={article.pub_date}
                  click={this.saveArticle}
                  title="Add article"
                  icon="add"
                />
              ))}
            </List>
          </div>
        ) : (
          <div>
            <hr />
            <h5 id="results" className="offset"><em>Search results will display here</em></h5>
          </div>
        )}
        {this.state.articles.length ? (
          <div>
            <hr />
            <h4 id="saved" className="offset">Your Saved Articles</h4>
            <List>
              {this.state.articles.map(savedArticle => (
                <ListItem
                  key={savedArticle._id}
                  _id={savedArticle._id}
                  url={savedArticle.url}
                  headline={savedArticle.headline}
                  summary={savedArticle.summary}
                  byline={savedArticle.byline}
                  image={savedArticle.image}
                  date={savedArticle.date}
                  click={this.removeArticle}
                  title="Remove article"
                  icon="remove"
                />
              ))}
            </List>
          </div>
        ) : (
          <div>
            <hr />
            <h5 id="saved" className="offset"><em>There are no saved articles</em></h5>
          </div>
        )}
      </div>
    );
  }
}

export default Home;