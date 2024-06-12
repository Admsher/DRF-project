import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './authentication/login/login';
import Forgotpassword from './authentication/forgotpassword/forgotpassword';
import Otpcheck from './authentication/otpchecking/otpcheck';
import Resetpassword from './authentication/resetpassword/resetpassword';
import Contactsupport from './authentication/contactsupport/contactsupport';
import Welcome from './authentication/welcome';
import Dashboard from './dashboard/dashboard';
import Assessment from './dashboard/assessment/assessment'
import Message from './dashboard/message/message'
import Notification from './dashboard/notification/notification'
import Upload from './dashboard/upload/upload'
import Home from './dashboard/home/home';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Dashboard/>,
    //* All the children will be rendered inside dashboard using outlet
    children:[
      { index: true, element: <Home />},  // *This is the default route which will be rendered in outlet when dashboard page loaded
      { path: '/home', element: <Home/>},
      { path:'/assessment', element: <Assessment/>},
      { path:'/message', element: <Message/>},
      { path:'/notification', element: <Notification/>},
      { path:'/upload', element: <Upload/>},
    ]
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/forgotpassword',
    element: <Forgotpassword/>
  },
  {
    path:'/otpcheck',
    element: <Otpcheck/>
  },
  {
    path:'/resetpassword',
    element: <Resetpassword/>
  },
  {
    path:'/contactsupport',
    element: <Contactsupport/>
  },
  {
    path:'/welcome',
    element: <Welcome/>
  },
])

localStorage.setItem('userDataset', JSON.stringify(
  [
    { username:'bishaka', email: 'bishaka@gmail.com', password: '1234'},
    { username:'deekshit', email: 'deekshit@gmail.com', password: '1234'},
    { username:'pranav', email: 'pranav@gmail.com', password: '1234'},
    { username:'runnu', email: 'runnu@gmail.com', password: '1234'},
    { username:'vishnu', email: 'vishnu@gmail.com', password: '1234'},
  ]
));

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>  
  );
}

export default App;