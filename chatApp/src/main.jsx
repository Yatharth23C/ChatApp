import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx'
import PrivateChatRoom from './components/PrivateChatRoom.jsx'
import PublicChatRoom from './components/PublicChatRoom.jsx'
import RandomChat from './components/RandomChat.jsx'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children:[{
      path:'',
      element: <Home />
    },
    {
      path:'privatechatroom',
      element:<PrivateChatRoom />
    },
    {
      path:'publicchatroom',
      element:<PublicChatRoom />
    },
    {
      path:'randomchat',
      element:<RandomChat/>
    },

  ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router= {router} />
  </StrictMode>,
)
