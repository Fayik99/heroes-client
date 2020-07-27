
import React, { Component } from "react";
import Hero from "./Hero";
import axios from "axios";

class Heroes extends Component {

    state = {

      allAvengers: [],
    };
    render() {
        return ( 
   <div className="container"> 
      <div className="row">
       {this.state.allAvengers.map((avenger) => (
         <div className="col" key={avenger.id}>
            <Hero key={avenger.id} avenger={avenger}/>
            </div>
         ))}
      </div>
   </div>
        );
    }
   async componentDidMount() {
     let {data} = await axios.get("http://localhost:5000/api/heroes");
     console.log(data);

    let avengers = data.map(avenger=> {
       return { 
        id: avenger._id,
        imgUrl: avenger.imgUrl,
        birthname: avenger.birthname,
        likeCount: avenger.likeCount,
        movies: avenger.movies
     };
   });
      this.setState({ allAvengers: avengers });  
   }
}

export default  Heroes;