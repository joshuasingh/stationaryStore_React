import React from "react";

import  '../App.css';
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

class From extends React.Component {
  genreComplete=null
   
   catRef=[]
   spinnerRef=null
  
  constructor(props) {
    super(props);
    this.state = {
      MainCategory:[],
      selectMainCat:new Set(),
     mainData:"",
      Title: "",
      Year: "",
      Released: "",
      Runtime: "",
      Genre:[],
      genreArray:[],
      Director: "",
      Writer: "",
      Actors: "",
      Plot: "",
      Language: "",
      Country: "",
      Poster: "",
      imdbRating: "",
      Type: "",
      Suggestion: []
    };

    this.genreComplete = Object.keys(this.genreMap)

    this.postInfo = this.postInfo.bind(this);
    this.getAutoComplete = this.getAutoComplete.bind(this);
    this.setGenreValue = this.setGenreValue.bind(this);
    this.subdiv=this.subdiv.bind(this)
    this.removeGen=this.removeGen.bind(this)
    this.manageGenre=this.manageGenre.bind(this)
    this.passGenre=this.passGenre.bind(this)
    this.computeValue=this.computeValue.bind(this)
    this.populate=this.populate.bind(this)
    this.setMainCategory=this.setMainCategory.bind(this)
  }

  

 
 
  getAutoComplete = e => {
    var temp = [];

    if (e.length !== 0) {
      var start = 0;

      if (e.lastIndexOf(",") !== e.lastIndexOf("/")) {
        start =
          e.lastIndexOf(",") > e.lastIndexOf("/")
            ? e.lastIndexOf(",")
            : e.lastIndexOf("/");
      }
      this.genreComplete.forEach(val => {
        var s = e.slice(start === 0 ? start : start + 1, e.length);

        if (s.toLowerCase() === val.slice(0, s.length).toLowerCase())
          temp.push(val);
      });
    }

   
    if(temp.length !== 0) 
    {
      this.setState({
        Suggestion: temp
      });
    }
    else{
        this.setState({
            Suggestion: []
          });
    }
  };

 
  postInfo = () => {
    
    if(this.state.MainCategory.length===0)
    {
      alert("MainCategory are not filled")
      return
    }
    
    var data1 = {
      MainCategory:this.state.MainCategory,
      Title: this.state.Title.toLowerCase(),
      Year: this.state.Year,
      Released: this.state.Released,
      Runtime: this.state.Runtime,
      Genre: this.state.Genre,
      Genre_Strings:this.state.genreArray,
      Director: this.state.Director.toLowerCase(),
      Writer: this.state.Writer,
      Actors: this.state.Actors,
      Plot: this.state.Plot,
      Language: this.state.Language,
      Country: this.state.Country,
      Poster: this.state.Poster,
      imdbRatings: this.state.imdbRatings,
      Type: this.state.Type
    };



     //setting spinner
     this.spinnerRef.style.display="Inline"

    axios
      .post("https://vb0ox.sse.codesandbox.io/testing", data1)
      .then((result, err) => {
        if (err) {
          alert("error occured try again");
        } else alert("datae inserted");
      
        this.spinnerRef.style.display="none"
      });

    return;
  };

  
  
  
  
  
  
  
  
  genreRef = null;

  setGenreValue(ind) {
    var temp = this.state.Suggestion[ind];

    var value = this.genreRef.value;

    var ind1 = value.lastIndexOf(",");
    var ind2 = value.lastIndexOf("/");

    if (ind1 !== -1 || ind2 !== -1)
      this.genreRef.value =
        (ind1 > ind2 ? value.slice(0, ind1 + 1) : value.slice(0, ind2 + 1)) +
        temp;
    else this.genreRef.value = temp;

     console.log("set genre called")

    var self = this;
    this.setState({ Suggestion: []});

    return;
  }


  removeGen=(ind)=>{
    
    
       var temp=this.state.genreArray.filter((val,index)=>{return ind!==index})
       var mainEncode=this.state.Genre.filter((val,index)=>{return ind!==index})   
       
       this.setState({genreArray:temp,Genre:mainEncode})
    }

   manageGenre=(ind)=>{
 
        this.genreRef.value=this.state.genreArray[ind]
        this.removeGen(ind)
       return 
    }



  //subdiv function
   subdiv=(val,ind)=>{
    
    return (
        <div className="subDiv" onClick={() => {this.manageGenre(ind) }}>
            {val}
            <div className="cross" onClick={() => { this.removeGen(ind) }} >x</div>
            </div>
    )


   }



   setMainCategory=(ind,val)=>{
       
      //set main category array
      var tempArr=this.state.MainCategory


      var temp=this.state.selectMainCat
      if(!this.state.selectMainCat.has(ind))
        { this.catRef[ind].style.backgroundColor="blue"
          temp.add(ind)
         
          tempArr.push(val)
        
          this.setState({
          selectMainCat:temp,
          MainCategory:tempArr
        })
        
      }
        else{
          this.catRef[ind].style.backgroundColor="white"
          temp.delete(ind)
          console.log("thisvalue",val)
          tempArr=tempArr.filter((value)=>{return val!==value})
        
         
          this.setState({
            selectMainCat:temp,
            MainCategory:tempArr
          })
          
             

       }
   
    }

  
   //suddiv for maincategory
   MainCategoryDiv=(val,ind)=>{
    return (
      <div className="subDivMain" onClick={() => {this.setMainCategory(ind,val) }} ref={ree=>{this.catRef[ind]=ree}}>
          {val}
         </div>
  )
   }





   passGenre=()=>{
    if(this.genreRef.value.length===0)
         return 
    
   
   //checking if tags are legit or not
       var result=this.computeValue(this.genreRef.value)
      console.log("res value",result)
       if(result===null)
    {
      console.log("in alert window")
      alert("inCorrect tag added")
       return 
    }
   
   
   
     var temp=this.state.genreArray
     var mainEncode=this.state.Genre

      temp.push(this.genreRef.value)
      mainEncode.push(result)
      this.genreRef.value=""
      this.setState({genreArray:temp,Genre:mainEncode})
      return 
   }
  
  
  
  
  
  
    genreMap = {
    Action: 0,
    Animation: 1,
    Comedy: 2,
    Crime: 3,
    Documentary: 4,
    Drama: 5,
    Romance: 6,
    Fantasy: 7,
    Horror: 8,
    Musical: 9,
    Mystery: 10,
    "Reality-TV": 11,
    "Sci-Fi": 12,
    Sports: 13,
    Thriller: 14,
    War: 15,
    Suspense: 16,
    Adventure: 17,
    "Martial-Arts": 18,
    Spy: 19,
    Superhero: 20,
    Animation_stop_Motion: 21,
    Animation_Traditional: 22,
    Crime_True: 23,
    Crime_Fictional: 24,
    Drama_Tragedy: 25,
    Drama_Life: 26,
    Drama_Converstional: 26,
    Drama_Theatre: 27,
    Drama_Worship: 28,
    Drama_History: 29,
    Drama_Romance: 30,
    Fantasy_Action: 31,
    fantasy_Animation: 32,
    Thriller_zombie: 33,
    Zombie: 34,
    Monster: 35,
    "Thriller-Monster": 36,
    Maniac: 37,
    Thriller_Maniac: 38,
    Informative: 39,
    TalkShow: 40,
    TalkShow_Informative: 41,
    Family: 42,
    "Hand-to-Hand":43
  };


   mainCatArray=["Action","Animation",   
    "Comedy",     
    "Crime",        
    "Documentary",  
    "Drama",        
    "Family",       
    "Horror",      
    "Mystery",      
    "Sci-Fi",       
    "Thriller",     
    "War",         
    "Romance" 
    ]
    

  
   computeValue = str => {

    console.log("in compute value",str)
     var temp = [];
     var valid=true
      str.split(",").forEach(str => {
          if(this.genreMap[str]===undefined)
             { 
              console.log("in undefined") 
               valid=false
             }
            else 
             temp.push(this.genreMap[str]);
      });
  
      if(!valid)
       return null


      temp.sort((a, b) => {
        return a - b;
      });
  
      console.log("temp value",temp);
  
      temp = temp.join("-");
     
    
    return temp;
  };
 
  





   populate=()=>{
       
       var self=JSON.parse(this.state.mainData)
       console.log("inpopulate",{...self.Title,Genre:[]})
    //    this.setState({ Title: self.Title,
    //    Year: self.Year,
    //    Released: self.Released,
    //    Runtime: self.Runtime,
    //    Director: self.Director,
    //    Writer: self.Writer,
    //    Actors: self.Actors,
    //    Plot: self.Plot,
    //    Language: self.Language,
    //    Country: self.Country,
    //    Poster: self.Poster,
    //    imdbRating: self.imdbRating,
    //    Type: self.Type})   
       
    this.setState({...self,Genre:[]})
        
        


       return 
   }



   componentDidMount()
   {
   
   }

   






  
  render() {
    
      console.log("mainCategory value,",this.state.MainCategory)
    return (
      <>

        <div style={{ margin: "80px" }}>
        <div className="spinnerStyle" ref={ree=>{this.spinnerRef=ree}}><Loader
         type="Bars"
         color="#00BFFF"
         height={200}
         width={200}
        />
</div>
        

         <button onClick={()=>{
           this.props.toggle()
         }}> Update info</button> 
          <div>
          <textarea
              value={this.state.mainData}
              onChange={e => this.setState({ mainData: e.target.value })}
              style={{ display: "inline-block", margin: "10px" }}
              rows="1"
            />
            <button onClick={this.populate}> populate Data</button>
         
          </div>
          
          
          
          <div>
            <div className="blocks" style={{ display: "inline-block" }}>
              title
            </div>
            :
            <input
              value={this.state.Title}
              onChange={e => {
                this.setState({ Title: e.target.value });
              }}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">year</div>:
            <input
              value={this.state.Year}
              onChange={e => this.setState({ Year: e.target.value })}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Released</div>
            :
            <input
              value={this.state.Released}
              onChange={e => this.setState({ Released: e.target.value })}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Runtime</div>
            :
            <input
              value={this.state.Runtime}
              onChange={e => this.setState({ Runtime: e.target.value })}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>
 
          <div className="blocks">Main Category::::::</div>
          <div className="mainCat">
                         {this.mainCatArray.map((val,ind)=>{
                              return this.MainCategoryDiv(val,ind)
                         })}                        
                </div>
         
          
          
          
          
          
          
          <div>
            <div className="blocks">Genre</div>
            :
            <textarea
               rows="1"
               
              
               ref={e => {
                this.genreRef = e;
              }}
              onChange={e => {
                this.getAutoComplete(e.target.value);
              }}
              style={{ display: "inline-block", margin: "auto" }}
            />
            <div className="suggest">
              {this.state.Suggestion.map((val, ind) => {
                return (
                  <div
                    onClick={() => {
                      this.setGenreValue(ind);
                    }}
                    className="selectSuggest"
                  >
                    {val}
                  </div>
                );
              })}
            </div>
            <button  onClick={this.passGenre}>
                 Add</button>
            <div style={{"background-color":" grey",
                          height: "45px",
                          "text-align":" center"}}>
                         {this.state.genreArray.map((val,ind)=>{
                              return this.subdiv(val,ind)
                         })}                        
                </div>
         
          </div>
         
         
         
         
         
         
         
          <div>
            <div className="blocks">Director</div>
            :
            <input
              value={this.state.Director}
              onChange={e => this.setState({ Director: e.target.value })}
              style={{ display: "inline-block", margin: "10px" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Writer</div>
            :
            <input
              value={this.state.Writer}
              onChange={e => this.setState({ Writer: e.target.value })}
              style={{ display: "inline-block", margin: "10px" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Actors</div>
            :
            <input
              value={this.state.Actors}
              onChange={e => this.setState({ Actors: e.target.value })}
              style={{ display: "inline-block", margin: "10px" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">plot</div>
            :
            <textarea
              value={this.state.Plot}
              onChange={e => this.setState({ Plot: e.target.value })}
              style={{ display: "inline-block", margin: "10px" }}
              rows="1"
            />
          </div>
          <div>
            <div className="blocks">Language</div>
            :
            <input
              value={this.state.Language}
              onChange={e => this.setState({ Language: e.target.value })}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Country</div>
            :
            <input
              value={this.state.Country}
              onChange={e => this.setState({ Country: e.target.value })}
              style={{ display: "inline-block", margin: "10px" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Poster</div>
            :
            <input
              value={this.state.Poster}
              onChange={e => this.setState({ Poster: e.target.value })}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">imdbRatings</div>
            :
            <input
              value={this.state.imdbRatings}
              onChange={e => this.setState({ imdbRatings: e.target.value })}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>
          <div>
            <div className="blocks">Type</div>:
            <input
              value={this.state.Type}
              onChange={e => this.setState({ Type: e.target.value })}
              style={{ display: "inline-block" }}
              type="text"
            />
          </div>

          <div>
            <button onClick={this.postInfo}> post info</button>
          </div>
        </div>
      </>
    );
  }
}

export default From;
