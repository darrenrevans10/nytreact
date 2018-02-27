import axios from "axios";

export default {
  // Query NYT API
  searchNYT: function(topic, startYear, endYear) {
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";
    return axios.get(queryURL);
  },
  // Retrieves saved articles from the db
  getArticles: () => {
    return axios.get("/api/articles");
  },
  // Saves a new article to the db
  saveArticle: (articleData) => {
    return axios.post("/api/articles", articleData);
  },
  // Deletes an article from the db
  deleteArticle: (articleId) => {
    return axios.delete("/api/articles/" + articleId._id);
  }
};