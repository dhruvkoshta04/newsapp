import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  capitalize = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalize(this.props.category)} - NewsApp`
  }
  // API's ==> cd5d4866d6a846978f04453b82112723 || 0ddc2ef87831414699340c48d9551535
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cd5d4866d6a846978f04453b82112723&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  }
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=cd5d4866d6a846978f04453b82112723&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }); //Loading Handler
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      page: this.state.page - 1,
      loading: false, //Loading Handler
    });
  };
  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=cd5d4866d6a846978f04453b82112723&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true }); //Loading Handler
      let data = await fetch(url);
      let parsedData = await data.json();
      // console.log(parsedData);

      this.setState({
        articles: parsedData.articles,
        page: this.state.page + 1,
        loading: false, //Loading Handler
      });
    }
  };

  render() {
    return (
      <div className="container my-4">
        <h1 className="text-center heading-dk">Top Headlines - {this.capitalize(this.props.category)}</h1>

        {this.state.loading && <Spinner />}

        <div className="row my-3 mx-2">
          {!this.state.loading &&
            this.state.articles.map((e) => {
              return (
                <div className="col-md-4" key={e.url}>
                  <Newsitem
                    title={e.title ? e.title.slice(0, 45) : ""}

                    description={
                      e.description ? e.description.slice(0, 80) : ""
                    }

                    imgUrl={e.urlToImage}
                    newsUrl={e.url}
                    author={e.author}
                    date={e.publishedAt}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-danger"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>

          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className="btn btn-outline-danger"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}
