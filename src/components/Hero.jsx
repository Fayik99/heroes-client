import React, { Component } from "react"

class Hero extends Component {
    state = { 
      heroId: this.props.avenger.id,
};
    render(){
        return( 
           
     <div className="card" style={{width: "18rem"}}>
      <img src={this.props.avenger.imgUrl} className="card-img-top" />
        <div className="card-body">
        <h5 className="card-title">{this.props.avenger.name}</h5>
        <h6>{this.props.avenger.birthname}</h6>
          <ul> {this.showMovies()} </ul>
       <button className="btn btn-primary" 
       onClick={() => {
        this.likeAvenger(1)
        }} 
        >
        Like {" "}
      {/* </button> <button className="btn btn-primary" onClick={this.likeAvenger}>Like {" "} */}
        <span className="badge badge-light">
          {this.props.avenger.likeCount}
          </span> 
       </button>
    </div>
</div>
       );
   }
isHero() {
   return this.state.heroId < 0 ? "Not an avenger" : "Is an avenger";

  }
  showMovies() {

    if(this.props.avenger.movies.length === 0) 
      return <p>No movies available </p>
     return this.props.avenger.movies.map ((movie) => <li key = {movie}>{movie}</li>);
    
      //return li element for every value inside the 'movie' array
  }

    likeAvenger = (likeCounter) => {
     // this.setState({likeCount : this.state.likeCount + likeCounter});
  };
}

export default Hero;



   /* <h1 style={{width: "100rem", fontSize: "90px"}} >Avengers incoming....{" "}</h1>
            <button type="button" className="btn btn-primary">Click on Avenger
            </button>
            <h2>{this.isHero()}</h2> */