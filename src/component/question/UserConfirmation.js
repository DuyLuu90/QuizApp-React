import React from 'react'
import ReactDOM from 'react-dom'
import { Confirm } from 'semantic-ui-react'


const UserConfirmation=(message,callback)=>{
    
    const container= document.createElement("div")
    container.setAttribute("custom-confirmation-navigation", "");
    document.body.appendChild(container);

    const closeModal = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        callback(callbackState);
    };

    const textObj = JSON.parse(message)

    ReactDOM.render(
        <Confirm
            open={true}
            header='Confirmation'
            content= {textObj.content}
            onCancel= {()=>closeModal(false)}
            onConfirm={()=>closeModal(true)}
        />,container) 
    
}

export default UserConfirmation