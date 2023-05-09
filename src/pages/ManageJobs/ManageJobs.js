import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuthUser } from "../../helper/Storage";

const ManageJobs = () => {
  const auth = getAuthUser();
  const searchRef = useRef(null);
  let data = localStorage.getItem("user");
  data = JSON.parse(data);
  const [request , setRquest ] = useState([]) ; 

  const showApplicantForJobHandler = async () => {
        await axios.get(`http://localhost:4000/show/showRequests/${searchRef.current.value}` ,
        // {
        //     user_id :"33"
        // }, 
        ).then((res)=>{
          setRquest(res.data)

        }).catch((error)=>{
            console.log(error)
        })
    }

    const deleteRequest = async (ID)=>{
      await axios.post(`http://localhost:4000/response` , {
        
          request_id : ID ,
          response : 0
        
      }).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error) ; 
      })
    }

    const acceptRequest = async (ID)=>{
      await axios.post(`http://localhost:4000/response` , {
        
          request_id : ID ,
          response : 1
        
      }).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error) ; 
      })
    }


    // Second Code 

    // 

    // const showApplicantForJobHandler = async () => {
    //   try {
    //     const response = await axios.get('http://localhost:4000/show/showRequests', {
    //       headers: {
    //         token: auth.token,
    //       },
    //       params: {
    //         user_id: 31
    //       }
    //     });
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }

  //   axios.get('http://localhost:4000/show/showRequests', {
  //     params: {
  //       user_id: 31, // replace with the user ID to search for
  //     },
  //     headers: {
  //       Authorization: `Bearer ${auth.token}`, // replace adminToken with admin user's JWT token
  //     },
  //   }).then(response => {
  //     // handle success
  //     console.log(response.data); // logs the requests made by the user
  //   }).catch(error => {
  //     // handle error
  //     console.error(error.response.data); // logs the error message
  //   });
  // };




  return (
    <div className='container ' style={{ minHeight: "100vh" }}>
      <div className='d-flex my-5'>
        <input className='form-control' ref={searchRef} style={{ width: "200px" }} placeholder='Enter User ID' />
        <button onClick={() => showApplicantForJobHandler()} className='btn btn-success mx-3 ' style={{ width: "100px" }}>Search</button>
      </div>
      <Table striped bordered hover>

        <thead>
          <tr>
            <th>User ID</th>
            <th>Job ID</th>
            <th> Qualification</th>
            <th> Accept Or Decline</th>
          </tr>
        </thead>
        <tbody>
          {
            request.map((item )=>{
              return (
                <tr key={item.id} >
            <td>{item.user_id}</td>
            <td>{item.job_id}</td>
            <td>{item.qualification} </td>
            <td>
              <button 
                onClick={()=>acceptRequest(item.id)}
                className="btn btn-sm btn-success"
              >Accept

              </button>
              <button className='btn btn-sm btn-danger mx-2' onClick={()=>deleteRequest(item.id)}>
              
              Decline
            
              </button>
              

            </td>
          </tr>
              )
            })
          }

        </tbody>
      </Table>
    </div>
  )
}

export default ManageJobs
