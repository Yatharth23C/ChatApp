import { Link } from 'react-router-dom'
import { useState ,useEffect} from 'react'


function Home() {
const [username,setusername] = useState("")
const [showPopup , setshowPopup] = useState(false)

useEffect(()=>{
  localStorage.setItem('chatAppSecretCode','')
  const response = localStorage.getItem('chatappUsername')
  if(response){
  setshowPopup(false)
  }else{
  setshowPopup(true)
  }
},[])

const HandleUserName = ()=>{
  if(username.length>1){
  localStorage.setItem('chatappUsername',username)
  setshowPopup(false)
  }else{
    alert('Enter atleast 2 characters')
    setusername('')
  }
}

  return (
<>
  <div className='h-[90%] w-screen bg-black justify-center text-white text-2xl flex'>
    <Link to='privatechatroom'>
      <div className='hover:scale-110 hover:cursor-pointer transition-transform m-3 mt-8 p-3 border border-white rounded-3xl min-w-[30%] h-[80%]'>
        <span className='transition-transform hover:scale-110 m-2 p-2 font-mono  hover:cursor-pointer'>
          Enter a private Chat room
        </span>
      </div>
    </Link>
    <Link to='publicchatroom'>
      <div className='hover:scale-110 hover:cursor-pointer transition-transform m-3 mt-8 p-3 border border-white rounded-3xl min-w-[30%] h-[80%]'>
        <span className='transition-transform hover:scale-110 m-2 p-2 font-mono  hover:cursor-pointer'>Enter a public chatroom</span>
      </div>
    </Link>
    <Link to='randomchat'>
      <div className='hover:scale-110 hover:cursor-pointer transition-transform m-3 mt-8 p-3 border border-white rounded-3xl min-w-[30%] h-[80%]'>
        <span className='transition-transform hover:scale-110 font-mono hover:cursor-pointer'>Enter in a chat with a random Stranger!</span>
      </div>
    </Link>

  </div>
  {showPopup?(
  <div className='w-screen h-screen absolute top-0 backdrop-blur-sm flex items-center justify-center  text-white'>
    <div className='h-[30%] w-[20%]  flex flex-col '>
      <div className='w-full mb-2 font-mono font-semibold'>Enter UserName:</div>
      <input
       maxLength="20" type='text' 
       className='p-3  bg-transparent  font-mono rounded-md outline-none h-min border-2 border-white'
       onKeyDown={(e) => {
        if (e.key === 'Enter') {
        HandleUserName(); 
        }}}
        onChange={(e)=>{
          setusername(e.target.value)
        }}
        value={username}
        ></input>
    </div>
  </div>
  ):(null)}
  
  
</>)
}

export default Home