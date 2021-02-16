import axios from '../../../axios-order';
import React,{useState} from 'react';
import './MemeChangeHandler.css';
const MemeChangeHandler = props => {

    const [updateCaption, setUpdateCaption] = useState(props.data.caption);
    const [updateUrl, setUpdateUrl] = useState(props.data.url);
    
    const formValidation = () => {
        let isValid = true;
        
        if(updateCaption.trim().length<1){
            alert("Meme Caption is Required")
            isValid = false;
        }
        if(updateUrl.trim().length<1){
            alert("Meme url is Required")
            isValid = false;
        }else if(updateUrl.trim().length<4)
        {
            alert("Not a proper url")
            isValid = false;
        }
        return isValid;

    } 

     //Edit post function
     const updateMeme = ()=>{

        let valid = formValidation()
        if(valid){
        let patchObj = {
            caption : updateCaption,
            url : updateUrl
        }
        
        axios.patch('/memes/'+props.data._id,patchObj)
        .then((response)=>{
            console.log(response);
            
                alert("Data Updated successfully!");    
            
            window.location.reload();
        })
        .catch((err)=>{
            console.log(err);
            console.log(err.response)
            alert("Error in Updating!")
        })
    }
    }
    return (
        <div >
            <div className="modal-content" >

                <div className="modal-flex">

                    <label className="lable_display" >
                        <b className="fonts" > Meme Owner : <i><u>{props.data.name}</u></i> </b>
                    </label>

                    <label className="lable_display" >
                        <b className="fonts" >Meme Caption :</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the caption for meme"
                        name="caption"
                        value={updateCaption}
                          onChange={(e) => setUpdateCaption(e.target.value)}
                          className="font"
                        
                    />

                    <label className="lable_display" >
                        <b className="fonts" >Meme URL</b>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter the URL of your meme here"
                        name="url"
                        value={updateUrl}
                          onChange={(e) => setUpdateUrl(e.target.value)}
                          className="font"
                        
                    />
                    <button onClick={updateMeme} className="submit_button">
                        UPDATE
                    </button>
        
                </div>
            </div>
            {/* EDIT CONTAINER */}

        </div>
    );
}
export default MemeChangeHandler;