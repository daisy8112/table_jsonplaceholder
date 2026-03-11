import { useEffect, useState } from 'react'
import { Button, Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { api } from '../host/host';
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";
export default function Users() {
  const [data, setData] = useState(null)

  useEffect(()=>{
    getData()
  },[])

  const getData= async()=>{
  try{
     var res = await axios.get(api+'/users')
   setData(res.data)
  }
  catch(err){
    console.log(err)
  }
  }

  return (
    <div className="p-3">
               <Container>
                {data==null? <div className="loader"><FadeLoader color="#36d7b7" /></div> : <></>}
                <Table variant='primary' striped bordered hover>
                 <thead>
                  <tr >
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Address</th>
                    <th>Website</th>
                    <th>Posts</th>
                    <th>Todos</th>
                  </tr>
                 </thead>
                 <tbody>
                  {data? data.map((item,key)=>{
                    return(
                      <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.company.name}</td>
                       <td>{item.address.city}, {item.address.street}, {item.address.suite}</td>
                        <td><a target='_blank' href={"https://"+item.website}>{item.website}</a></td>
                        <td><Link to={'posts/'+item.id}  className='table_btn_box'><Button variant="primary"><FaEye /></Button></Link></td>
                        <td><Link to={'todos/'+item.id}  className='table_btn_box'><Button variant="primary"><FaEye /></Button></Link></td>
                      </tr>
                    )
                  }):<></>}

                 </tbody>
                </Table>
               </Container>
    </div>
  )
}
