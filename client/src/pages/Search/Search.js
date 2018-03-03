import React, { Component } from 'react';
import { List, ListItem } from '../../components/List';
import { Col, Row } from '../../components/Grid';
import { Input, FormBtn } from '../../components/Form';
import API from '../../utils/API';


class Search extends Component {
  state = {
    articles: [],
    title: '',
    startYear: '',
    endYear: ''
  };

  // When the form is submitted, use the API.saveArticle method to save the article data
  // Then reload articles from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.getArticles({
        title: this.state.title,
        startYear: this.state.startYear,
        endYear: this.state.endYear
      })
        .then(res =>
          this.setState({
            articles: res.data.response.docs,
            title: '',
            startYear: '',
            endYear: ''
          })
        )
        .catch(err => console.log(err));
    }
  };

  handleSaveArticle = (title, url, id) => {
    API.saveArticle({ title: title, url: url, articleId: id })
      .then(res => this.props.loadSaved())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div>
        {/* Row for Searching New York Times */}
        <Row>
          <Col size="sm-12">
            <br />
            {/* First panel is for handling the search parameters */}
            <div className="panel panel-primary">
              <div className="panel-heading">
                <h3 className="panel-title">
                  <strong>
                    <i className="fa  fa-list-alt" /> Search Parameters
                  </strong>
                </h3>
              </div>
              <div className="panel-body">
                {/* Here we create an HTML Form for handling the inputs */}
                <form>
                  {/* Here we create the text box for capturing the search term */}
                  <Input
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    name="title"
                    placeholder="Title (required)"
                  />
                  {/* Here we capture the Start Year Parameter */}
                  <Input
                    value={this.state.startYear}
                    onChange={this.handleInputChange}
                    name="startYear"
                    placeholder="Start Year (Optional)"
                  />
                  {/* Here we capture the End Year Parameter */}
                  <Input
                    value={this.state.endYear}
                    onChange={this.handleInputChange}
                    name="endYear"
                    placeholder="End Year (Optional)"
                  />
                  {/* <!-- Here we have our final submit button */}
                  <FormBtn
                    disabled={!this.state.title}
                    onClick={this.handleFormSubmit}
                  >
                    Search
                  </FormBtn>
                </form>
              </div>
            </div>
          </Col>
        </Row>
        {/* // This row will handle all of the retrieved articles */}
        <Row>
          <Col size="sm-12">
            <br />

            {/* This panel will initially be made up of a panel and wells for each of the articles retrieved */}
            <div className="panel panel-primary">
              {/* Panel Heading for the retrieved articles box */}
              <div className="panel-heading">
                <h3 className="panel-title">
                  <strong>
                    <i className="fa fa-table" /> Results
                  </strong>
                </h3>
              </div>

              {this.state.articles.length ? (
                <List className="searchResults">
                  {this.state.articles.slice(0, 5).map(article => {
                    return (
                      <ListItem key={article._id} style={{ height: '67px' }}>
                        <a href={article.web_url} target="_blank">
                          <strong>{article.headline.main}</strong>
                        </a>
                        <FormBtn
                          onClick={() =>
                            this.handleSaveArticle(
                              article.headline.main,
                              article.web_url,
                              article._id
                            )}
                          style={{
                            padding: 0,
                            position: 'absolute',
                            right: '20px'
                          }}
                        >
                          Save
                        </FormBtn>
                      </ListItem>
                    );
                  })}
                </List>
              ) : (
                <h3 style={{ marginLeft: 15 }}>No Results to Display</h3>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Search;