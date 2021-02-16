import React, { Component } from 'react';
import axios from '../../axios-order';
import Meme_Handler from './Meme_Handler/Meme_Handler';
import './Meme.css'

class Meme extends Component {
    state = {
        posts : [],
        error : false,        
    };
    
    componentDidMount(){
        axios.get('/memes')
             .then(response => {
                this.setState({
                        posts : response.data,
                    })
                    
                }).catch(error => {
                    this.setState({
                        error : true,
                    })
                });
        }
        
        
        
        
    render(){ 

        let posts_arr = Object.values(this.state.posts);
        let meme = this.state.post ? <p style={{textAlign:'center'}}>There is no post Uploaded yet </p>
        : posts_arr.map((post,index)=>{
            return(
                        <Meme_Handler key = {index} 
                                      post={post} 
                                      edit={this.editHandler} 
                                      visibility={this.state.Modal_State} 
                                      modelvisible={this.modelVisibilityHandler}  />
                    
            )
        })
        return(
            <div className="memeBox">
                {meme}
            </div>
        )

    }
        
     
    
}
export default Meme;