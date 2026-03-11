import axios from 'axios'
import  { useEffect, useState } from 'react'
import {  Link, useNavigate, useParams } from 'react-router-dom'
import { api } from '../host/host'
import {  Button, Container, Table } from 'react-bootstrap'
import FadeLoader from "react-spinners/FadeLoader";

export default function Comments() {
    const {postId,userId}=useParams()
    const [data, setdata]=useState(null)
    const navigate=useNavigate()
     useEffect(() => {
           if(isNaN(postId)){
               goToUsers()
           } else{
               getData()
           }
           
       }, [postId, navigate])
   const goToUsers=()=>{
       navigate('/')
   }
    const getData=async()=>{
       try{
           var res=await axios.get(`${api}/comments`, {
            params:{postId}
           })
          
             setdata(res.data)
           
           
       }catch(err){
        console.log(err)
       }
    }
  
  return (
     <div className='p-3'>
       <Container>
         {data==null? <div className="loader"><FadeLoader color="#36d7b7" /></div> : <></>}
                <Link  to={`/posts/${userId}`}><Button className="btn btn-secondary mb-2">Back to Posts</Button></Link>
        
            <Table variant='primary' striped hover bordered>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Body</th>
                    
                    </tr>
                </thead>
                <tbody>
                    {
                        data?data.map((item, key)=>{
                            return(
                                <tr key={key}>
                    <td>{key+1}</td>
                    <td>{item.email}</td>
                    <td>{item.name}</td>
                    <td>{item.body}</td>
                   </tr>
                            )
                        }):<></>
                    }
                </tbody>
            </Table>
          
       </Container>
    </div>
  )
}
