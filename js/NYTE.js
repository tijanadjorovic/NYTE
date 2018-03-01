class App extends React.Component { 

  constructor(props){
    super(props)
    this.state = {
      data: [],
      selectedArticle: []
    };
    this.setData = this.setData.bind(this);
    this.handleArticleClick = this.handleArticleClick.bind(this);
  }

  handleArticleClick(item){
    this.setState({selectedArticle: item})   
  }

  setData(responseData){
      const doc = responseData.response.docs.slice(0,1);
      this.setState({data: doc});
  }
  
  componentDidMount(){
      var url = "https://api.nytimes.com/svc/archive/v1/" + $('#year').val() + '/' + $('#month').val() + ".json";
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
          <div className="details">
            <ArticleDetails detail={this.state.selectedArticle}/>
          </div>
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
      /*url: 'http://api.linkpreview.net/?key=123456&q=https://www.google.com',*/
      success: this.setData
    })
  }

  render(){
    const data = this.props.item;
    const clickhandler = this.props.clickhandler;  

    return (
        <div className="oneArticle" onClick={() => clickhandler(data)}>
          <img src={this.state.data.image} alt={this.state.data.image} width="100"></img>
          <h3>{this.state.data.title}</h3>
          <p>{this.state.data.description}</p>
        </div>
    );
  }
}

const btnClick = document.getElementById('btnClick');

btnClick.addEventListener('click', () => {
  find();
})

$("[type='number']").keydown(function (evt) {
  evt.preventDefault();
});

  function find(){
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render(<App/>, document.getElementById('root')) 
  }