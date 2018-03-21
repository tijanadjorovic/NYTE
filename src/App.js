import React, { Component } from 'react';
import $ from "jquery";
import Article from "./Article"
import ArticleDetails from "./ArticleDetails"
import './css/NYTE.css';
 
class App extends Component { 
  constructor(props){
    super(props)
    this.state = {
      data: [],
      selectedArticle: [],
      articleVisibile: false
    };
    this.setData = this.setData.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
  }

  handleArticleClick(item){
    this.setState({
      selectedArticle: item,
      articleVisibile: true  
    }) 
  }

  setData(responseData){
    const doc = responseData.response.docs.slice(0,20);
    this.setState({data: doc});
  }
  
  componentDidMount(){
    var url = "https://api.nytimes.com/svc/archive/v1/" + this.props.year + '/' + this.props.month + ".json";
    url += '?' + $.param({
    'api-key': "c2feee9db1af45299a22da937ba56925"
    });
    
    $.ajax({
      url: url,
      method: 'GET',
    }).done(
      this.setData).fail(
      function(err) {
      throw err;
    });
  }

  render(){ 
    if(this.state.data.length ==0){         
      return  <p>Please wait...</p>
    } 
    
    const showArticle = this.state.articleVisibile ? <div className="details"><ArticleDetails detail={this.state.selectedArticle} /></div> : null
      
    return (
      <div className="articleDetails">
        <div className="article"> {
          this.state.data.map( article => 
              <Article  article={article}
                        key={article.web_url} 
                        url={article.web_url} 
                        clickhandler={this.handleArticleClick} 
                        item={article}
                        selectedArticleID={this.state.selectedArticle._id}
                        /> 
          )
        }
        </div>
        {showArticle}
      </div>
    )
  }
}  

export default App;
