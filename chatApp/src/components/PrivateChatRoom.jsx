import {useState,useEffect} from'react'
import { useNavigate } from 'react-router-dom';
import {io} from 'socket.io-client'

function App(){
const [AllMessages ,setAllMessages] = useState([]);
const [CurrentMessage,setCurrentMessage] = useState("");
const [socket,setsocket] = useState(null)
const [socketId,setsocketId] = useState("")
const [userName,setusername] = useState("")
const [secretCode,setsecretCode] = useState("")
const [showPopup,setshowPopup] = useState(false)
const navigate = useNavigate();

useEffect(()=>{
    const code = localStorage.getItem('chatAppSecretCode')
    if(!code){
        setshowPopup(true)
    }else{

        
        setsecretCode(code)
        setshowPopup(false)
    } 
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

        console.log(`this users id :`,socketId);
    })
    newsocket.on('privatemessage',(msg)=>{
        setAllMessages((prevMessages) => [...prevMessages, msg])
    })
    return () => {
        newsocket.disconnect(); 
    };
},[])
const HandleSend = async ()=>{
    console.log(socketId);
    try{
        socket.emit('privatemessage',{id:socketId ,text:CurrentMessage,Uname:userName,sc:secretCode},(response)=>{
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
const Handlecode= ()=>{
    if(secretCode.length>4){
        localStorage.setItem('chatAppSecretCode',secretCode)
        setshowPopup(false)
    }else{
        alert('please enter atleast 5 character code!')
        setsecretCode('')
    }
  }
return(
<>
<div className=' text-white h-[90%] bg-black flex flex-col font-mono ' >
    <div className=' flex-grow bg-black text-black '>
        {AllMessages.map((msg,key)=>(
            <div className=' min-[50px] m-2 p-2 text-left flex-col flex   '>
                <div key={key}  className={`bg-white p-2 rounded-lg m-1 min-w-fit flex-col flex ${msg.id===socketId?'self-end':'self-start'}   `}>
                    <span className='font-semibold text-sm'>{msg.Uname}</span>
                    <span className='mt-1 text-'>{msg.text}</span>
                </div>
            </div>))
        }
        
    </div>

    <div className='w-full h-[7%]  bg-white flex flex-row border  '>
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
{showPopup?(
  <div className='w-screen h-screen absolute top-0 backdrop-blur-sm flex items-center justify-center  text-white'>
    <div className='h-[30%] w-[20%]  flex flex-col '>
      <div className='w-full mb-2 font-mono font-semibold'>Enter Secret Code!:</div>
      <input
       maxLength="20" type='text' 
       className='p-3  bg-transparent  font-mono rounded-md outline-none h-min border-2 border-white'
       onKeyDown={(e) => {
        if (e.key === 'Enter') {
        Handlecode(); 
        }}}
        onChange={(e)=>{
          setsecretCode(e.target.value)
        }}
        value={secretCode}
        ></input>
    </div>
  </div>
  ):(null)}  
</>
)
}

export default App