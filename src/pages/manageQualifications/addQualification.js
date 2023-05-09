import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const AddQualification = () => {
    // const auth = getAuthUser();
    const JobID = useRef(null) ; 
    const JobQualification = useRef(null) ; 
    const [jobs, setJobs] = useState({
        pos: "",
        description: "",
        offer: "",
        max_candidate: "",
        err: "",
        loading: false,
        success: null,
    });



    const CreateQualification = (e) => {
        e.preventDefault();

        setJobs({ ...jobs, loading: true });


        axios
            .post("http://localhost:4000/requirement", {
                // headers: {
                //    token: auth.token,
                //    "Content-Type": "multipart/form-data",

                // },
                job_id : JobID.current.value ,
                requirement : JobQualification.current.value
            })
            .then((resp) => {
                setJobs({
                    pos: "",
                    description: "",
                    offer: "",
                    max_candidate: "",
                    err: null,
                    loading: false,
                    success: "Qualification Created Successfully !",
                });

            })
            .catch((err) => {
                setJobs({
                    ...jobs,
                    loading: false,
                    success: null,
                    err: "Something went wrong, please try again later !",
                });
            });
    };

    return (
        <div className="login-container">
            <h1>Add New Qualification Form</h1>

            {jobs.err && (
                <Alert variant="danger" className="p-2">
                    {jobs.err}
                </Alert>
            )}

            {jobs.success && (
                <Alert variant="success" className="p-2">
                    {jobs.success}
                </Alert>
            )}

            <Form onSubmit={CreateQualification}>
                {/* <Form.Group className="mb-3">
          <Form.Control
            value={jobs.pos}
            onChange={(e) => setJobs({ ...jobs, pos: e.target.value })}
            type="text"
            required
            placeholder="Position"
          />

          
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={jobs.description}
            required
            onChange={(e) =>
              setJobs({ ...jobs, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group> */}

                <Form.Group className="mb-3">
                    <Form.Control
                        value={jobs.max_candidate}
                        onChange={(e) => setJobs({ ...jobs, max_candidate: e.target.value })}
                        type="number"
                        required
                        placeholder="Job ID"
                        ref={JobID}
                    />

                    <Form.Control
                        value={jobs.offer}
                        onChange={(e) => setJobs({ ...jobs, offer: e.target.value })}
                        type="text"
                        required
                        placeholder="Qulification"
                        className="my-3"
                        ref={JobQualification}
                    />

                </Form.Group>

                {
                    /**
                     * <Form.Group className="mb-3">
                    <input type="file" className="form-control" ref={image} required />
                  </Form.Group>
                     */
                }

                <Button className="btn btn-dark w-100" variant="primary" type="submit">
                    Add New Qualification
                </Button>
            </Form>
        </div>
    );
};

export default AddQualification;
