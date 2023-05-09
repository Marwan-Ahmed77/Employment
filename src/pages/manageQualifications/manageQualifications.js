import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/ManageMovies.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";

const ManageQualification = () => {
  
  const auth = getAuthUser();
  const [movies, setMovies] = useState({
    loading: true,
    results: [],
    err: null,
    reload: 0,
  });

  useEffect(() => {
    setMovies({ ...movies, loading: true });
    axios
      .get("http://localhost:4000/requirement" , 
      )
      .then((resp) => {
        console.log(resp.data)
        setMovies({ ...movies, results: resp.data, loading: false, err: null });
      })
      .catch((err) => {
        setMovies({
          ...movies,
          loading: false,
          err: " something went wrong, please try again later ! ",
        });
      });
  }, [movies.reload]);


  const deleteMovie = (id) => {
    axios
      .delete("http://localhost:4000/requirement/" + id, {
        headers: {
          token: auth.token,
        },
      })
      .then((resp) => {
        setMovies({ ...movies, reload: movies.reload + 1 });
      })
      .catch((err) => {});
  };
  const showRequiremnt  = movies.results
  console.log(movies)

  return (
    <div className="manage-movies p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h3 className="text-center ">Manage Qualifications</h3>
        <Link to={"/add-qual"} className="btn btn-success">
          Add New Qualiification +
        </Link>
      </div>

      {/* <Alert variant="danger" className="p-2">
        This is simple alert
      </Alert>

      <Alert variant="success" className="p-2">
        This is simple alert
      </Alert> */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>jobID</th>
            {/* <th>Position</th>
            <th> Offer</th> */}
            <th> Qualifications</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {showRequiremnt.map((item , idx) => (
            <tr key={idx}>
              <td>{item.job_id}</td>
              {/* <td>
                <h2  style={{fontSize:"15px"}}>{movie.position}</h2>
              </td>
              <td> {movie.offer} </td> */}
              <td>{item.requirement}</td>
              <td className="" style={{width:"230px"}}>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    
                    deleteMovie(item.id);
                  }}>
                  Delete
                </button>
                <Link
                  to={"/update-qual/" + item.id}
                  className="btn btn-sm btn-primary mx-2">
                  Update
                </Link>
                {/* <Link to={"/" + movie.id} className="btn btn-sm btn-info">
                  show
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageQualification;
