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
          <UserDetails user={this.state.selectedArticle}/>
        </div>
      </div>
    )


}
}  

const UserDetails=(props)=> {
  const user=props.user;
  let headline = user.headline;
  let byline = user.byline;

  let pubDate = user.pub_date;
 
  let getAuthor = "";
  let getTitle = "";


  for(let i in byline){
    getAuthor = byline.original
  }
  
  for(let i in headline){
    getTitle = headline.main
  } 
        
    return(
      <div className="">
          <h4>{getTitle}</h4>
          <p>{getAuthor}</p>
          <p>{user.snippet}</p>
          <p>{}</p>
          <a href={user.web_url} target="_blank">{user.web_url}</a>
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
      url: 'http://api.linkpreview.net/?key=5a915cc13c0cf87602fc8d5b4989b1fda114b7b4b597c&q=' + this.props.url,
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