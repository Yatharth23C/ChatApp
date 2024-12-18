import {Link} from 'react-router-dom'

export default function App(){
    return(
    <div className=" min-h-[10%] z-1 bg-black border-b-2 w-screen sticky top-0 text-white border-white justify-center font-mono flex ">
        <Link to='/'><span className="text-4xl pt-4">CHAT FOR FREE !</span></Link>
    
    </div>
    )
}