import axios from "axios";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../host/host";
import { Button, Container, Table } from "react-bootstrap";
import FadeLoader from "react-spinners/FadeLoader";

export default function ToDos() {
    const [data, setData] = useState(null)
    const { userId } = useParams()
   const navigate=useNavigate()
     useEffect(() => {
           if(isNaN(userId)){
               goToUsers()
           } else{
               getData()
           }
           
       }, [])
   const goToUsers=()=>{
       navigate('/')
   }
    const getData = async () => {
        try {
            let res = await axios.get(api + '/todos', {
                params: { userId }
            });
            setData(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <Container>
                <Link  to="/"><Button className="btn btn-secondary mb-2 mt-2">Back to Users</Button></Link>
 {data==null? <div className="loader"><FadeLoader color="#36d7b7" /></div> : <></>}
            <Table bordered hover striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th className="text-center">Status</th>
                    </tr>

                </thead>
                <tbody>
                    {data ? data.map((item, key) => {
                        return (
                            <tr key={item.id}>
                                <td>{key + 1}</td>
                                <td>{item.title}</td>
                                <td className="text-center">{item.completed ? <FaCheckCircle className="done" /> : <FaCircleXmark className="undone" />}</td>
                            </tr>
                        )
                    }) : <></>}
                </tbody>

            </Table>

        </Container>
    )
}
