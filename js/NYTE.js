class App extends React.Component { 
  constructor(props){
    super(props)
    this.state = {
      data: [],
      selectedArticle: [],
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
          this.state.data.map( 
            (article) => 
              <Article key={article.web_url} 
                      url={article.web_url} 
                      clickhandler={this.handleArticleClick} 
                      item={article}/> 
          )
        }
        </div>
        {showArticle}
      </div>
    )
  }
}  

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

class Article extends React.Component {
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
      <div className="oneArticle" onClick={() => clickhandler(data)}>
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
