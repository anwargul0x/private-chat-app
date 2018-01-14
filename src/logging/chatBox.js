import React ,{Component} from 'react'
import MessagingForm from './messagingForm'
import RecipientAndLogOut from './recipientAndLogOut'
import MessageBox from './messageBox'
import ContactBox from './contactBox'
import * as firebase from  'firebase'

const auth =  firebase.auth();
const database = firebase.database();

export default class ChatBox extends Component{
    constructor(){
        super();
        this.state = {
            message:'',
            recipientName: '',
            messages:['Hello','Hi i am Anwar']
        }
    }
    // componentwillMount() {
    //     firebase.auth().onAuthStateChanged(User => {
    //         const userName = User.displayName;
    //         const userEmail = User.email;
    //         const uid = User.uid;
    //         this.setState({
    //             loggedUser: userName,
    //             useremail: userEmail,
    //             loggedUid: uid
    //         })
    //         console.log(this.state.loggedUser, uid);
    //     })
    // }
    componentDidMount(){
        firebase.auth().onAuthStateChanged(User => {
            const userName = User.displayName;
            const userEmail = User.email;
            const uid = User.uid;
            this.setState({
                loggedUser: userName,
                useremail: userEmail,
                loggedUid: uid
            })
            console.log(this.state.loggedUser, uid);
        })

        //Users List
        database.ref(`/users`).on("value", (snapshot) => {
            const List = snapshot.val();
            console.log(List);
            let info = [];
            let uids = [];
            for (let key in List) {
                if (List[key].name !== this.state.loggedUser) {
                    info.push(List[key].name);
                    uids.push(key);
                }
            }
        //     const foo=Object.values(List)
        //    console.log(Object.keys(List),Object.values(foo));
            this.setState({
                names: info,
                uids: uids
            });
            console.log();
        });
    }
    updateMessage(Value){
        let newMessage = Value.target.value;
        this.setState({
            message: newMessage
        })
    }
    signOut() {
        auth.signOut();
        this.setState({
            names: [],
            uids: '',
            loggedUser: '',
            loggedUid: '',
            useremail: '',
            message: '',
            To: '',
            recipientName: ''
        });
        this.props.history.push('/');
    }
    demoDataPush(pushValue){
        let demoPush = this.state.messages;
        pushValue!==null&& demoPush.push(pushValue)
        console.log(demoPush,pushValue)
        this.setState({messages:demoPush})
    }
    render(){
        return( 
       <div>
        <MessagingForm
            message = {this.state.message}
            updateMessage = {this.updateMessage.bind(this)}
            datapush = {this.demoDataPush.bind(this)}/>
        <RecipientAndLogOut 
            name={this.state.recipientName}
            signOut = {this.signOut.bind(this)}/>
        <MessageBox 
        messages = { this.state.messages}
        />
        <ContactBox 
        loggedUser={this.state.loggedUser}
        contacts={this.state.names}
        contactsUids={this.state.uids}/>
    </div>
    )}
}
