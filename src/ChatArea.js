import React ,{Component} from 'react'
import * as firebase from 'firebase'
import MessageBox from './messageBox'
import './chat.css'

import * as moment from 'moment';

export default class ChatArea extends Component{
    constructor(){
        super();
        this.state = {
            displayName:'',
            uid:'',
            uids:[],
            recipientNames:[],
            recipient:'',
            recipientUid:'',
            chatMessages:[],
            chatClasses:[],
            toggle:false
        }
    }
    componentWillMount(){
        console.log('===== moment =====',moment().format());
        firebase.auth().onAuthStateChanged((user)=>{
            let displayName = user.displayName;
            let uid = user.uid;
            this.setState({
                displayName:displayName,
                uid:uid})
                console.log(displayName,uid);
            firebase.database().ref(`/users`).on('value', (user) => {
                
                let uids = [];
                let userNames = [];
                let users = user.val();
                for (let key in users) {
                    console.log(key, uid)
                    if (uid !== key) {
                        userNames.push(users[key]['FullName']);
                        uids.push(key)
                    }
                }
                console.log(userNames, uids);
                this.setState({
                    uids: uids,
                    recipientNames: userNames
                })
            })
        })
    }

   getRecipient=(index)=>{
       
        let recipientUid = this.state.uids[index];
    
       firebase.database().ref(`/users/${this.state.uid}/messages/${recipientUid}`).on('value',(snapshot)=>{
            let messages = snapshot.val();
            let chatMessages = [];
            let filterClasses = [];
            for(let key in messages){
                
                        chatMessages.push(messages[key].message);
                                if (messages[key].To !== this.state.uid) {
                                    filterClasses.push('send')
                                           }
                    else {
                        filterClasses.push('receive')
                                        }
                           
            } 
            this.setState(()=>{return{
                recipient: this.state.recipientNames[index],
                recipientUid: this.state.uids[index],
                chatMessages:chatMessages,
                chatClasses:filterClasses,
                toggle : true
            }})  
        })   
   }

    signOut = (e) => {
        e.preventDefault();
        firebase.auth().signOut().then(() => {
        this.setState({
            displayName: '',
            uid: '',
            uids: [],
            names: []
                })
            this.props.history.push('/');    
            }
        ).catch((error)=>{alert(error.message)});
    }
    render()
        {
    return (
        <div className="main">
                <div className="child-one">
                    <div className="logUser"><h3>{this.state.displayName}</h3></div>
                    <div className="contacts">
                    {this.state.recipientNames.map((name,index)=>{return(<h2 key={index}
                    onClick={()=>{this.getRecipient(index)}}>{name}</h2>)})}
                    </div>
                </div>
                 
                <div className="child-two">
                    <div className="header">
                    <span className="Rname">{this.state.recipient!==''?this.state.recipient:'No User chosen'} </span><span className="Log-Span">
                    <button className="logout-btn" onClick={this.signOut}>LOG OUT</button></span></div>
                  {(this.state.toggle)?
                    <MessageBox 
                        chatMessages={this.state.chatMessages}
                        chatClasses={this.state.chatClasses} 
                        To={this.state.recipientUid}
                        From={this.state.uid}/>
                 :''}
                    
                </div>
            </div>
        )
    }
}
