import React, { Component } from "react";

export default class Newsitem extends Component {
    

  render() {
    let {title, description,imgUrl, newsUrl, date} = this.props
    return (
      <div className="my-3">
        <div className="card mx-4" style={{height:"auto"}}>
          <img src={!imgUrl?"https://images.moneycontrol.com/static-mcnews/2022/08/fandosensexniftyderivative-770x433.jpg":imgUrl} className="card-img-top" alt="..." style={{maxHeight:"160px"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">
              {description}...
            </p>
            <p className="card-text"><small className="text-muted">On {new Date(date).toGMTString()}</small></p>

            {/* By {!author?"Unknown":author}  */}
            
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-outline-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}
