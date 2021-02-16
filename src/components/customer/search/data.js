import React from 'react'
import Icon from '../../../icons/pdf.svg'
// import {Button} from 'react-bootstrap'

class Data extends React.Component{

   render(){
      return(
         <tr>
            <td>{this.props.number}</td>
            <td>{this.props.info.cc}</td>
            <td>{this.props.info.name}</td>
            <td>{this.props.info.date}</td>
            <td> <a href={`#${this.props.info.name}`}className="btn btn-block btn-secondary" onClick={()=> console.log("hello")}><img src={Icon} alt="pdfIcon" height="20" width="20"/></a></td>
         </tr>
      )
   }
}

export default Data;