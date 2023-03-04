import React from 'react'
import { Navigate } from 'react-router';
import Button from '../components/Button'

function Error() {
    useEffect(() => {

    setTimeout(()=>{
        <Navigate to='\'/>
    },3000);
      return () => {
        
      }
    }, [])
    
  return (
    <div>
        <h1>Page not found</h1>
        <p>Hmm, the page you were looking for doesn't seem to exist</p>
        <Button>Back to Unsplash</Button>
    </div>
  )
}

export default Error