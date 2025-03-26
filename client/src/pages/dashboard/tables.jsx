import {useCallback, useEffect, useState} from "react";

import { httpGetAuthors} from "../../http/authors";
import {httpGetProjects} from "@/http/projects.js";

import {Button} from "@material-tailwind/react";

import { authorsTableData, projectsTableData } from "@/data";

import AddingModal from "@/components/modals/AddingModal.jsx";
import ChangeModal from "@/components/modals/ChangeModal.jsx";
import DelModal from "@/components/modals/DelModal.jsx";

import {
  ModuleRegistry,
  AllCommunityModule
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([
  AllCommunityModule,
]);

export function Tables() {

  const [authorsRowData, setAuthorsRowData] = useState([]);
  const [authorsColDefs, setAuthorsColDefs] = useState(authorsTableData);

  const [projectsRowData,setProjectsRowData] = useState([]);
  const [projectsColDefs, setProjectsColDefs] = useState(projectsTableData)

  const [isVisibleAddingModal, setIsVisibleAddingModal] = useState(false);
  const [isVisibleChangeModal, setIsVisibleChangeModal] = useState(false);
  const [isVisibleDelModal, setIsVisibleDelModal] = useState(false);


  useEffect(() => {

    httpGetProjects().then((data)=> {
      setProjectsRowData(data.response)
    }).catch(err=>console.log(err));

    httpGetAuthors(100,0).then(data=>{
      setAuthorsRowData(data.response)
    }).catch(err=>console.log(err));

  }, [isVisibleAddingModal, isVisibleChangeModal, isVisibleDelModal]);

  const getRows = useCallback((params)=>{
    const {startRow,endRow} = params;
    const offset = startRow;
    const limit = endRow - startRow;

    httpGetAuthors(limit, offset).then(data=>{
      const rowsThisPage = data.response;
      const lastRow = data.response.length;
      params.successCallback(rowsThisPage, lastRow)
    })
  }, [])

  const datasource = {
    getRows:getRows
  }
  return (
     <div className="wrapper">


       <div className="dinamica" style={{width:800, margin:"auto"}}>
         <Button onClick={() => setIsVisibleAddingModal(true)}>Добавить</Button>
         <AddingModal show={isVisibleAddingModal} onHide={() => setIsVisibleAddingModal(false)}
                      dto={{authors: authorsRowData}}/>

         <Button onClick={() => setIsVisibleChangeModal(true)} className="ml-5">Изменить</Button>
         <ChangeModal show={isVisibleChangeModal} onHide={() => setIsVisibleChangeModal(false)}
                      dto={{authors: authorsRowData, projects: projectsRowData}}/>

         <Button onClick={() => setIsVisibleDelModal(true)} className="ml-5">Удалить</Button>
         <DelModal show={isVisibleDelModal} onHide={() => setIsVisibleDelModal(false)}
                   dto={{projects: projectsRowData}}/>
       </div>


       <div style={{height: 500, width: 800}} id={"projectsTable"} className="mt-5 m-auto">
           <AgGridReact
               rowData={projectsRowData}
               columnDefs={projectsColDefs}
           />
         </div><br/>

           <div style={{ height: 400, width: 800}} id={"authorsTable"} className="m-auto">
             <AgGridReact
                 columnDefs={authorsColDefs}
                 rowModelType={"infinite"}
                 datasource={datasource}
             />
           </div>

       </div>
  );
}

export default Tables;
