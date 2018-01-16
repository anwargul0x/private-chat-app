import React ,{Component} from 'react'
import * as firebase from 'firebase'
import MessageBox from './messageBox'
import './chat.css'

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
        console.log(this.state.names)
    }
    componentWillMount(){
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
        let recipient = this.state.recipientNames[index];
        let recipientUid = this.state.uids[index];
    console.log(recipientUid+" line 56 recipient uid");
       firebase.database().ref().child(`messages/`).on('value',(snapshot)=>{
            let messages = snapshot.val();
           let chatMessages = [];
           let filterClasses = [];
            console.log(messages,recipientUid);
            for(let key in messages){

               
                if ((recipientUid === messages[key].To && this.state.uid === messages[key].From) || (this.state.uid === messages[key].To && recipientUid === messages[key].From ))
                {
                    chatMessages.push(messages[key].message);
                    console.log(chatMessages);
                    if (messages[key].From === this.state.uid) {
                        filterClasses.push('send')
                        console.log('send push')
                    }
                    else {
                        filterClasses.push('receive')
                        console.log('push recieve')
                }
               
            }
            } console.log(chatMessages)
            this.setState(()=>{return{
                recipient: this.state.recipientNames[index],
                recipientUid: this.state.uids[index],
                chatMessages:chatMessages,
                chatClasses:filterClasses,
                toggle : true
            }})
            console.log(filterClasses)
        })
        console.log(`to ${this.state.recipientNames[index]} & uid ${recipientUid} from ${this.state.displayName} message ${this.state.chatMessage}`)
        
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
