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
            names:[]
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
                let names = [];
                let users = user.val();
                for (let key in users) {
                    console.log(key, uid)
                    if (uid !== key) {
                        names.push(users[key]['FullName']);
                        uids.push(key)
                    }
                }
                this.setState({
                    uids: uids,
                    names: names
                })
                console.log(names, uids);
            })
        })
    }
   getRecipient=(index)=>{
        let Recipient = this.state.names[index];
        let recipientUid = this.state.uids[index];
        firebase.database().ref(`/messages/`).on('value',(snapshot)=>{
            let messages = snapshot.val();
            

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
                <div className="child-one">&nbsp;
                    <div className="logUser">{this.state.displayName}</div>
                    <div className="contacts">&nbsp;
                    {this.state.names.map((name,index)=>{return(<h4 key={index}>{name}</h4>)})}
                    
                    </div>
                </div>
                 
                <div className="child-two">&nbsp;
                    <div className="header">&nbsp;
                    <span className="Rname">Recipient Name </span><span className="Log-Span">
                    <button className="logout-btn" onClick={this.signOut}>LOG OUT</button></span></div>
                   <MessageBox />
                    
                </div>
            </div>
        )
    }
}
