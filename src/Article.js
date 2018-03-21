import React, { Component } from 'react';
import $ from "jquery";
import ReactDOM from 'react-dom';
import App from "./App"



class Article extends Component {
    constructor(props){
      super(props)
      this.state = {data: {}};
      this.setData = this.setData.bind(this)
    }
  
    setData(responseData){
      this.setState({data: responseData});
    }   
  
    componentDidMount(){
      $.ajax({
        url: 'https://api.linkpreview.net/?key=5a915cc13c0cf87602fc8d5b4989b1fda114b7b4b597c&q=' + this.props.url,
        success: this.setData
      })
    }
  
    render(){
      const data = this.props.item;
      const clickhandler = this.props.clickhandler;  
    
      return (
        <div className={"oneArticle" + " " + (this.props.selectedArticleID == this.props.article._id ? "active" : "")} onClick={() => clickhandler(data)}>
          <img src={this.state.data.image} alt={this.state.data.image} ></img>
          <h3>{this.state.data.title}</h3>
          <p>{this.state.data.description}</p>
        </div>
      );
    }
  }
  
  const btnClick = document.getElementById('btnClick');
  
  btnClick.addEventListener('click', () => {
    const root = document.getElementById("root")
    let input = document.getElementById("input").value;
    let year = input.split("-")[0];
    let month = input.split("-")[1]; 
    const cond1 = (month >= 9 && year == 1851);
    const cond2 = (1852 <= year && year < 2018);
    const cond3 = (month < 4 && year == 2018);
    
    if(input != ""){
      month[0] == "0" ? month = month[1] : ""
      
      if(cond1 || cond2 || cond3) {
        ReactDOM.unmountComponentAtNode(root);
        ReactDOM.render(<App year={year} month={month} />, document.getElementById('root')) 
      }
      else{
        root.innerHTML = "Please choose month and year between September 1851. and March 2018!"
      }
    }
    else{
      root.innerHTML = "Please select month and year!"
    }
  })

  export default Article;