import React from 'react'

class NotFound extends React.Component{
   componentDidMount(){
      setTimeout(()=>{
         this.props.history.push('/')
      },2000)
   }
   render(){
      return(
         <h2>
            Page Not Found
         </h2>
      )
   }
}

export default NotFound;