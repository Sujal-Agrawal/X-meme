import React,{useState} from 'react';
import Modal from '../../UI/Modal/Modal';

import MemeChangeHandler from '../MemeChanger/MemeChangeHandler'
import './Meme_Handler.css';
const Meme_Handler = ({post}) =>{

    const [Modal_State,setModal_State] = useState(false);
    const [imgPOPUP,setImgPOPUP] = useState(false);
 

    const modelVisibilityHandler = () => {
        setModal_State(false);
        setImgPOPUP(false);
    }

    return(
        <div className="memes">
                <div className="memeSeperator">
                    
               
                    <p>MEME_Owner is {<u><b>{post.name}</b></u>}</p>
                    <p>Caption : <b><i>{post.caption}</i></b></p>
                    <img src={post.url} alt="Meme Image Not Found 😢" className="image" onClick={()=>{setImgPOPUP(true)}}  />
                    <button className="Icon" onClick={()=>{setModal_State(true)}} />
                    <Modal show={Modal_State} modelClose = {modelVisibilityHandler}>
                            <button name="X" className="closeButton" onClick={()=>{setModal_State(false)}}>X</button>
                            <MemeChangeHandler data={post}/>
                    </Modal>
                    <Modal show={imgPOPUP} modelClose={modelVisibilityHandler}>
                        <button name="X" className="closeButton" onClick={()=>{setImgPOPUP(false)}}>X</button>
                        <img src={post.url} alt="Meme Image Not Found 😢" className="image_modal" />
                    </Modal>

                </div>
        </div>
    )

}

export default Meme_Handler;