import axios from "axios";

export async function httpGetProjects(){
        const {data} = await axios.get("http://localhost:5000/api/projects/get-projects");
        return data;
}

export async function httpAddProject(formData){
        const {data} = await axios.post("http://localhost:5000/api/projects/add-project", formData, {
                headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
}

export async function httpUpdateProject(formData){
        const {data} = await axios.put("http://localhost:5000/api/projects/update-project", formData, {
                headers: { "Content-Type": "multipart/form-data" }
        });
        return data;
}

export async function httpDelProject(id){
        const {data} = await axios.delete(`http://localhost:5000/api/projects/del-project/${id}`);
        return data;
}