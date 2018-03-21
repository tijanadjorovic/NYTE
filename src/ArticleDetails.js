import React from 'react';

const ArticleDetails=(props)=> {
    const detail = props.detail;
    let headline = detail.headline;
    let byline = detail.byline;
    let pubDate = detail.pub_date; 
    let description = detail.snippet;
    let link = detail.web_url;       
    let author = "";
    let title = "";
    let date = "";
  
    for(let i in headline){
      title = headline.main
    } 
  
    for(let i in byline){
      author = byline.original
    }   
  
    for(let i in pubDate){
      date = pubDate.slice(0,16).replace("T"," ")
    }
  
    return(
      <div className="">
        <h4>{title}</h4>
        <p>{author}</p>
        <p>{description}</p>
        <p>{date}</p>
        <a href={link} target="_blank">{link}</a>
      </div>
    );
  }
  
export default ArticleDetails;