
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
            <Hero 
            key={avenger.id} 
            avenger={avenger} 
            onDelete={ ()=> this.deleteAvenger(avenger.id)}
            onLike={ () => this.likeAvenger(avenger)}
            />
            </div>
         ))}
      </div>
   </div>
        );
    }

   async likeAvenger(avenger) {
      await axios.put(`http://localhost:5000/api/heroes/${avenger.id}`, {
         likeCount:avenger.likeCount +1,
      });

      let allAvengers = [...this.state.allAvengers];
      let index = allAvengers.indexOf(avenger);
      allAvengers[index] = { ...avenger};
      allAvengers[index].likeCount++;
      this.setState({ allAvengers: allAvengers});
   }
    
   async deleteAvenger(avengertodeleteid) {

     let newAvengers = this.state.allAvengers.filter(
        (avenger) => avenger.id !== avengertodeleteid);
      await axios.delete(`http://localhost:5000/api/heroes/${avengertodeleteid}`, { 
         headers: {
         "x-jwt-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzU5YTE2MWVkZTQ4M2MxNDUyMmVjZSIsImVtYWlsIjoiZmF5aWswOUBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1OTczNDk2NTZ9.C5jW8eNm3lTyu9dlnZoYpipFBuyz_BXJcPVlZAjNCdQ"     
      }
      
   })
       this.setState({ allAvengers: newAvengers});
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