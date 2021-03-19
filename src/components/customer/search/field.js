import React from 'react'
import Icon from '../../../icons/pdf.svg'
// import {Button} from 'react-bootstrap'

class Fields extends React.Component{

   render(){
      return(
         <tr className="">
            <td>{this.props.number}</td>
            <td>{this.props.info.cc}</td>
            <td>{this.props.info.name}</td>
            <td>{this.props.info.date}</td>
            <td> <a href={`#${this.props.info.name}`}className="btn btn-block " onClick={()=> console.log("hello")}><i class="fas fa-file-pdf"></i></a></td>
         </tr>
      )
   }
}

export default Fields;