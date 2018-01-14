import React from 'react'

const ContactBox = (props)=>{
    let contact = [], contactKey = [];

    for(let name in props.contacts){
        contact.push(props.contacts[name])
    }

    console.log(props.contacts)
    return(
    <div>
        <div>Logged User Name:{props.loggedUser}</div>

            <div>List of all users Except Logged User
            {contact.map(name =><li key={ name}
            onClick={(e)=>{e.preventDefault()}}>
            {name}</li>)}
            {/* <ul> 
             {props.contacts.map((contact,index)=>{<li key={index}>{contact}</li>})}</ul> */}
        </div>
    </div>
)
}

export default ContactBox;