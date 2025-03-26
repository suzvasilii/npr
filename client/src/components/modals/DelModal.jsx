import React, {useRef} from 'react';
import {Form, Modal} from "react-bootstrap";
import {Button} from "@material-tailwind/react";
import {httpDelProject} from "@/http/projects.js";

const DelModal = (props) => {
    const projects = props.dto.projects
    const projectIdRef = useRef("")
    function sendData(){
        httpDelProject(projectIdRef.current.value).then(data=> {
            console.log(data)
            props.onHide()
        }).catch(err=> {
            console.log(err.response.data)
            alert(err.response.data.response)
        })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Удаление
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Выберите проект на удаление</p>
                <Form.Select aria-label="Default select example" ref={projectIdRef}>
                    {projects.map(project=><option key={project.id} value={project.id}>{project.company_name}</option>)}
                </Form.Select>
                <br/>
                <Button onClick={sendData}>Занести эту ифнормацию в базу данных</Button>
            </Modal.Body>
        </Modal>
    );
};

export default DelModal;