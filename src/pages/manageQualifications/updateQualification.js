import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateQualification = () => {
  let { id } = useParams();
  const auth = getAuthUser();
  const inputUpdateRef = useRef(null)
  const [movie, setMovie] = useState({
    position: "",
    description: "",
    offer: "",
    max_candidate :"",
    err: "",
    loading: false,
    reload: false,
    success: null,
  });
  const image = useRef(null);
 

  const updateQulaification = (e) => {
    e.preventDefault();

    setMovie({ ...movie, loading: true });

    

    axios
      .put("http://localhost:4000/requirement/" + id,  {
        requirement : inputUpdateRef.current.value
      })
      .then((resp) => {
        setMovie({
          ...movie,
          loading: false,
          success: "Qualification updated successfully !",
          reload: movie.reload + 1,
        });
      })
      .catch((err) => {
        setMovie({
          ...movie,
          loading: false,
          success: null,
          err: "Something went wrong, please try again later !",
        });
      });
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4000/m" + id)
  //     .then((resp) => {
  //       setMovie({
  //         ...movie,
  //         name: resp.data.name,
  //         description: resp.data.description,
  //         image_url: resp.data.image_url,
  //       });
  //     })
  //     .catch((err) => {
  //       setMovie({
  //         ...movie,
  //         loading: false,
  //         success: null,
  //         err: "Something went wrong, please try again later !",
  //       });
  //     });
  // }, [movie.reload]);

  return (
    <div className="login-container">
      <h1>Update Qualification Form</h1>

      {movie.err && (
        <Alert variant="danger" className="p-2">
          {movie.err}
        </Alert>
      )}

      {movie.success && (
        <Alert variant="success" className="p-2">
          {movie.success}
        </Alert>
      )}

      <Form onSubmit={updateQulaification} className="text-center py-2">
        

        

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Enter Qualification...."
            value={movie.description}
            ref={inputUpdateRef}
            onChange={(e) =>
              setMovie({ ...movie, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>

        

        <Button className="btn btn-dark w-100" variant="primary" type="submit">
          Update Qualification
        </Button>
      </Form>
    </div>
  );
};

export default UpdateQualification;
