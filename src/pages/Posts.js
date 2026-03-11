import React, { useEffect, useState } from 'react'
import { Button,  Container, Table } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { api } from '../host/host';
import axios from 'axios';
import FadeLoader from "react-spinners/FadeLoader";

export default function Posts() {
    const [data, setData] = useState(null)
     const { userId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if(isNaN(userId)){
            goToUsers()
        } else{
            getData()
        }
        
    }, [userId, navigate])
const goToUsers=()=>{
    navigate('/')
}
    const getData = async () => {
        try {
            var res = await axios.get(api + '/posts',{
                params: { userId }
            })
           
            setData(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="p-3">
            <Container>
                 {data==null? <div className="loader"><FadeLoader color="#36d7b7" /></div> : <></>}
                <Link  to="/"><Button className="btn btn-secondary mb-2">Back to Users</Button></Link>
             <Table variant='primary' striped bordered hover>
                    <thead>
                        <tr >
                            <th>#</th>
                            <th>Name</th>
                            <th>Body</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                    <td>{item.title}</td>
                                    <td>{item.body}</td>
                                    <td><Link to={`/comments/${item.userId}/${item.id}`} className='table_btn_box'><Button variant="primary"><FaEye /></Button></Link></td>
                                </tr>
                            )
                        }) : <></>}

                    </tbody>
                </Table>
            </Container>
        </div>
    )
}
