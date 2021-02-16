import React, { Component } from 'react';
import './Modal.css';
import BackDrop from '../BackDrop/BackDrop';
import Auxilary from '../../../Auxilary';

class Modal extends Component {
    // shouldComponentUpdate( nextProps, nextState){
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    // }
    // componentWillUpdate(){
    //     console.log('[Model.js] will Update');
    // }
    render(){
        return(
            <Auxilary>
            <BackDrop show={this.props.show} clicked={this.props.modelClose} />
            <div  className="Modal" style={{transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                                                opacity : this.props.show ? '1' :'0' }}>
                {this.props.children}
            </div>
        </Auxilary>
        )
    }
}
   

export default Modal;