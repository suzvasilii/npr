import React, {useRef} from 'react';
import {Modal, Form} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from "@material-tailwind/react";
import {httpUpdateProject} from "@/http/projects.js";

const ChangeModal = (props) => {

    const companyNameRef = useRef("")
    const authorNameRef = useRef("");
    const budgetRef = useRef(0);
    const completionRef = useRef(0)

    const authors = props.dto.authors;
    const projects = props.dto.projects;
    function sendData(){
        const formData = new FormData();
        formData.append("ownerId", authorNameRef.current.value)
        formData.append("id", companyNameRef.current.value);
        formData.append("budget", budgetRef.current.value);
        formData.append("completion", completionRef.current.value)

        httpUpdateProject(formData).then(data=> {
            console.log(data)
            props.onHide()
        }).catch(err=> {
            alert(err.response.data.response)
            console.log(err.response.data)
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
                    Изменение записи
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Выберите проект</p>
                <Form.Select aria-label="Default select example" ref={companyNameRef}>
                    {projects.map(project => <option key={project.id} value={project.id}>{project.company_name}</option>)}
                </Form.Select>
                <br/>
                <p>Выберите, кто назначен на этот проект</p>
                <Form.Select aria-label="Default select example" ref={authorNameRef}>
                    {authors.map(author => <option key={author.id} value={author.id}>{author.name}</option>)}
                </Form.Select>
                <br/>
                <Form.Control type="number" placeholder="Бюджет комании" ref={budgetRef}/>
                <br/>
                <Form.Control type="number" placeholder="Стадия готовности (%)" ref={completionRef}/>
                <br/>
                <Button onClick={sendData}>Занести эту ифнормацию в базу данных</Button>
            </Modal.Body>
        </Modal>
    );
};

export default ChangeModal;