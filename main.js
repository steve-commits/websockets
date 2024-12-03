window.onload=(e)=>{
    e.preventDefault()


    let formEl=document.getElementById("message-form")
    let messageEl=document.getElementById("message")
    let submitBtn=document.getElementById("submit")
    let closeBtn=document.getElementById("close")
    let socketStatus= document.getElementById('status');
    const messagesList = document.getElementById("messages-list");

    
    //create a new websocket connection
    let socket =new WebSocket( 'wss://ws.ifelse.io');
    console.log(socket)

    // open the connection
    socket.onopen=(e)=>{
        socketStatus.innerHTML='Connected to: '+e.currentTarget.url
        socketStatus.className='open'

    }
    // handle the error that may occur 
    socket.onerror=(err)=>{
        console.log('Websocket Error', +err)
    }

    // handle incoming messages
    socket.onmessage=(message)=>{
        console.log("Message from the server", message.data)
        messagesList.innerHTML += 
        '<li class="received"><span>Received:</span> ' + message.data + '</li>';
    }

    //handle connection close
    socket.onclose=()=>{
        socketStatus.innerHTML='Disconnected';
         socketStatus.className='open'
    }

    // handle form submission to send data
    formEl.addEventListener("submit", (e)=>{
        e.preventDefault();
        const data=messageEl.value;
        console.log("message:",data)

        if(socket.readyState===WebSocket.OPEN){
            socket.send(data);
            console.log("Sent:",data)
            messageEl.value=''
        }else{
            console.error("WebSocket is not open");
        }
        messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + data +
        '</li>';
        
    })

    closeBtn.addEventListener("click", () => {
        socket.close();
    });


    // socket.send(data)

}
 


