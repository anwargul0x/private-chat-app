import React,{Component} from 'react'
import * as firebase from 'firebase';

 class MessageBox extends Component { 
    constructor(){
        super();
        this.state = {
            message: '',
        };
        // console.log(this.props.chatClasses,this.props.chatMessages)
     }
      handleChangeMessage = (newMessage) => {
         this.setState({
             message: newMessage.target.value
         })
     }
     scroller = () => {
         document.querySelector('.messages').scrollTop=999999;
     }
     sendMessage = (e) => {
         e.preventDefault();
     if(this.state.message.trim()!==''){
         firebase.database().ref(`/messages`).push({
             To: this.props.To,
             From: this.props.From,
             message: this.state.message
         }).then(() => { this.setState({ message: '' }) }).catch((error) => { alert(error.message) });
     }
    else{
        alert(`Invalid messages.Please type Something..`)
    this.setState({message:''})}
    }
render(){
    return (
    <div className="message-box ">
            <div className="messages" >&nbsp;
               <ul> {this.props.chatMessages.map((message, index) => { return (<li className={this.props.chatClasses[index]} key={index}>{message}</li>) })}<br /></ul></div>
        <div className="input-box">
                <form onSubmit={this.sendMessage}><input onKeyUp={this.scroller} type="text" className='input' value={this.state.message} onChange={this.handleChangeMessage}/>
        <button className="send-btn" type="submit">SEND</button></form>
        </div>
    </div>
)
}
}
export default MessageBox;
