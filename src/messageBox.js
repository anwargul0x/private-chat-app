import React, { Component } from 'react'
import * as firebase from 'firebase';
import moment from "moment";
class MessageBox extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };
    }
    handleChangeMessage = (newMessage) => {
        this.setState({
            message: newMessage.target.value
        })
    }
    scroller = () => {
        document.querySelector('.messages').scrollTop = 999999;
    }
    sendMessage = (e) => {
        e.preventDefault();
        if (this.state.message.trim() !== '') {
            firebase.database().ref(`/users/${this.props.To}/messages/${this.props.From}`).push({
                To: this.props.To,
                message: this.state.message,
                createdAt: moment().format()
            }).then(() => {
                firebase.database().ref(`/users/${this.props.From}/messages/${this.props.To}`).push({
                    To: this.props.To,
                    message: this.state.message,
                    createdAt: moment().format()
                }).then(() => { this.setState({ message: '' }) }).catch((error) => { alert(error.message) });
            })
        }
        else {
            alert(`Invalid messages.Please type Something..`)
            this.setState({ message: '' })
        }
    }
    render() {
        return (
            <div className="message-box ">
                <div className="messages" onChange={this.scroller}>&nbsp;
               <ul> {this.props.chatMessages.map((message, index) => {
                        return (<div className={`msg-container-${this.props.chatClasses[index]}`}>
                            <li className={this.props.chatClasses[index]} key={index}>{message}</li>
                            <div></div>
                        </div>)
                    })}<br />
                    </ul>
                    </div>
                <div className="input-box">
                    <form onSubmit={this.sendMessage}><input type="text" className='input' value={this.state.message} onChange={this.handleChangeMessage} />
                        <button className="send-btn" type="submit">SEND</button></form>
                </div>
            </div>
        )
    }
}
export default MessageBox;
