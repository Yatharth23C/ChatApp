import { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import { useNavigate } from 'react-router-dom';

function App() {
    
const [AllMessages ,setAllMessages] = useState([]);
const [CurrentMessage,setCurrentMessage] = useState("");
const [socket,setsocket] = useState(null)
const [socketId,setsocketId] = useState("")
const [userName,setusername] = useState("")
const [roomName,setroomName] = useState("")
const navigate = useNavigate();
useEffect(()=>{
    
    const un = localStorage.getItem('chatappUsername')
    if(un){
        setusername(un)
    }else{
        navigate('/')
    }
    const newsocket = io('http://localhost:3000');
    setsocket(newsocket)
    newsocket.on('connect',()=>{
        setsocketId(newsocket.id)
        newsocket.emit('joinRandomQueue',  );     
    })
    newsocket.on('randomMatched',(roomName)=>{
        setroomName(roomName)    
        
    })
    newsocket.on('randomChat',(msg)=>{
        console.log('received msg from',msg);       
        setAllMessages((prevMessages) => [...prevMessages, msg]);
    })
    return () => {
        newsocket.disconnect(); 
    };
},[])

const HandleSend = async ()=>{
    console.log(roomName);
   
if(roomName){
    try{
        socket.emit('randomChat',{id:socketId,roomName:roomName ,text:CurrentMessage,Uname:userName},(response)=>{
            if(response.status==='success'){  
                setCurrentMessage("")
                console.log('Message sent successfully at',response.timestamp)
            }else {
                console.error("There was an error sending the message",response.error)}
        })
    }catch(error){
        console.error(error)
    }
}
}
return (
<div className=' text-white h-[90%] bg-black flex flex-col font-mono  ' >
    <div className=' flex-grow bg-black text-black overflow-y-scroll no-scrollbar '>
        {AllMessages.map((msg,key)=>(
            <div key={key} className=' min-[50px] m-2 p-2 text-left flex-col flex   '>
                <div key={key}  className={`bg-white p-2 rounded-lg m-1 min-w-fit flex-col flex ${msg.id===socketId?'self-end':'self-start'}   `}>
                    <span className='font-semibold text-sm'>{msg.Uname}</span>
                    <span className='mt-1 text-'>{msg.text}</span>
                </div>
            </div>))
        }
        
    </div>

    <div className='w-full h-[7%] sticky  bg-white flex flex-row border  '>
        <input
            value={CurrentMessage}
            onChange={(e)=>{setCurrentMessage(e.target.value)}}
            className='h-full outline-none text-black w-full' 
            onKeyDown={(e) => {
            if (e.key === 'Enter') {
            HandleSend(); 
            }}}
            />
        <button onClick={HandleSend} className='text-white font-semibold m-1 bg-black rounded  pr-2 pl-2'>Send</button>
    </div>
</div>
)
}

export default App