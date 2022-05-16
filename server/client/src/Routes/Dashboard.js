import React from 'react';
import './Dashboard.css'
const Dashboard = () => {


    // const [quote, setQuote] = useState('')
    // const [tempQuote, setTempQuote] = useState('')

    // const history = useNavigate();

    // const populateQuote = async () => {

    //     console.log('populated quote')
        // const req = await fetch('http://localhost:1337/dashboard', {
        //     headers: {
        //         'x-access-token': localStorage.getItem('token')
        //     },
        // })
        // const data = await req.json();
        // if(data.status === 'ok') {
        //     setQuote(data.quote)
        // } 
        // else {
        //     alert(data.error)
        // }
    // }

    // const updateQuote = async (event) => {
    //     event.preventDefault();
    //     const req = await fetch('http://localhost:1337/dashboard', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'x-access-token': localStorage.getItem('token')
    //         },
    //         body: JSON.stringify({
    //             quote: tempQuote,
    //         })
    //     })

    //     const data = await req.json();
    //     if(data.status === 'ok') {
    //         setTempQuote('')
    //         setQuote(tempQuote)
    //     } 
    //     else {
    //         alert(data.error)
    //     }
   
    // }
    // useEffect(() => {
    //  const token = localStorage.getItem('token')
    //  if(token) {
    //      const user = jwt.decode(token)
    //      if(!user) {
    //          localStorage.removeItem('token')
    //          history.replace('/login')
    //      }
    //      else {
    //          populateQuote();
    //      }
    //  }

    // }, [])
    return (
        <div className='dash-main'>
            <div  className='row' >
               <div className='col-2 left-side-bar'>
                   <h3 className=''>Dashboard</h3>
               </div>
               <div className='col-10'>
                   <h2>Text</h2>
               </div>
            </div>
         
        </div>
    )
}

export default Dashboard;