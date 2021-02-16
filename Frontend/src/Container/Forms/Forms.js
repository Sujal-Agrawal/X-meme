import PropsType from 'prop-types';
import React,{Component} from 'react';
import Meme from '../Memes/Memes';
import axios from '../../axios-order';
import Doge from '../../assets/Img/Doge.jpg';
import lol from '../../assets/Img/lol.png';
import './Forms.css';

class Forms extends Component {

    state={
        owner:"",
        caption:"",
        url:"",
        errors:""
    }

    // onChange = (e) => {
    //     this.setState({[e.target.owner] : e.target.value});
    // }

    formValidation = () => {
        const {owner,caption,url} = this.state;
        let isValid = true;
        const errors = {};

        if(owner.trim().length<1){
            // errors.ownerRequire = "Meme Owner Name is Required";
            alert("Meme Owner Name is Required")
            isValid = false;
        }
        if(caption.trim().length<1){
            // errors.captionRequire = "Meme Caption is Required";
            alert("Meme Caption is Required")
            isValid = false;
        }
        if(url.trim().length<1){
            // errors.urlRequire = "Meme URL is Required";
            alert("Meme url is Required")
            isValid = false;
        }else if(url.trim().length<4)
        {
            console.log(url.trim.length)
            alert("Not a proper url")
            isValid = false;
        }
        return isValid;

    } 

    SubmittionHandler = (e) =>{
        e.preventDefault();
        
        //validation
        const isValid = this.formValidation();
        if(isValid){
            const Meme = {
                name : this.state.owner,
                caption : this.state.caption,
                url : this.state.url
            }
    
            axios.post('/memes', Meme)
                 .then((response) => {
                        alert("Post Uploaded successfully");
                    window.location.reload();
                    this.setState({
                        owner:"",
                        caption:"",
                        url:""
                    })
                 }).catch((error) => {
                
                if(error.response.status === "409")
                        alert("FAILED TO UPLOAD!\nThis post already exists!!")
                        window.location.reload();
                });
        }
        // else{
        //     if(this.state.errors)
        //         console.log(this.state.errors)
        //     //  alert(Object.values(this.state.errors).join('\n'))
        // }
        
    }

    

    NameHandler = (event) => {
        this.setState({
            owner:event.target.value      
        })
    }
    
    CaptionHandler = (event) => {
        this.setState({
            caption:event.target.value      
        })
    }
    
    UrlHandler = (event) => {
        this.setState({
            url:event.target.value      
        })
    }
    
    

    render(){
        
        

        return(
            <div className="Forms">
                <div className="header">
                    <img src={Doge} className="imageheader" />
                    <h1 className="Title">Meme Stream</h1>
                    <img src={lol} className="imageheader" />
                </div>
                <h3 className="Lables">Meme Owner</h3>
                <input type="text" className="Inputs" onChange={(event) => this.NameHandler(event)} value={this.state.owner} placeholder="Enter Meme Owner Name" />
                <h3 className="Lables">Caption</h3>
                <input type="text" className="Inputs" onChange={(event) => this.CaptionHandler(event)} value={this.state.caption} placeholder="Enter Meme Caption" />
                <h3 className="Lables">Meme Url</h3>
                <input type="url"  className="Inputs" onChange={(event) => this.UrlHandler(event)} value={this.state.url} placeholder="Enter Meme Url" />
                <button className="Button" onClick={this.SubmittionHandler}>submit</button>
                <Meme />
            </div>
        )
    }
}
Forms.propTypes = {
    owner:PropsType.string,
    caption:PropsType.string,
    
}

export default Forms;