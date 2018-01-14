import React,{Component} from 'react'

export default class MessageBox extends Component { 
render(){
    return (
    <div className="message-box">&nbsp;
        <div className="messages">&nbsp;</div>
        <div className="input-box">&nbsp;
        <form><input type="text" /><button className="send-btn">SEND</button></form>
        </div>
    </div>
)
}
}

