# /*

CWPS Enterprise

Project View

Sprint:

1.8.2

Build:

0001

Description:

Project management UI renderer

==================================================
*/

class ProjectView {

```
constructor(){



    this.containerId =

        "project-container";





    this.controller =

        null;





    this.projects = [];





    this.currentProject =

        null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    projectController

){



    this.controller =

        projectController;



    this.load();



}









/*
----------------------------------------------

Load Projects


----------------------------------------------

*/


load(){



    if(

        !this.controller

    ){



        return;



    }









    this.projects =



        this.controller.projects;





    this.render();



}









/*
----------------------------------------------

Render Main Page


----------------------------------------------

*/


render(){



    let container =



        document.getElementById(

            this.containerId

        );









    if(!container){



        return;



    }









    container.innerHTML = `



    <div class="project-header">



        <h2>

        專案管理

        </h2>



        <button

        id="btn-add-project">

        新增專案

        </button>



    </div>





    <div

    id="project-form">

    </div>





    <div

    id="project-list">

    </div>



    `;









    this.renderList();



    this.bindEvents();



}









/*
----------------------------------------------

Render Project List


----------------------------------------------

*/


renderList(){



    let container =



        document.getElementById(

            "project-list"

        );









    if(!container){



        return;



    }









    let html = `



    <table>



    <thead>



    <tr>



    <th>

    專案編號

    </th>



    <th>

    專案名稱

    </th>



    <th>

    客戶

    </th>



    <th>

    狀態

    </th>



    <th>

    操作

    </th>



    </tr>



    </thead>



    <tbody>



    `;









    this.projects.forEach(

        project=>{



            html += `



            <tr>



            <td>

            ${project.projectNo}

            </td>



            <td>

            ${project.projectName}

            </td>



            <td>

            ${project.customer || ""}

            </td>



            <td>

            ${project.status}

            </td>



            <td>



            <button

            data-id="${project.id}"

            class="btn-view-project">

            查看

            </button>



            </td>



            </tr>



            `;



        }

    );









    html += `



    </tbody>



    </table>



    `;









    container.innerHTML =

        html;



}









/*
----------------------------------------------

Add Project Form


----------------------------------------------

*/


renderForm(){



    let container =



        document.getElementById(

            "project-form"

        );









    container.innerHTML = `



    <div class="form-box">



    <input

    id="project-no"

    placeholder="專案編號">



    <input

    id="project-name"

    placeholder="專案名稱">



    <input

    id="project-customer"

    placeholder="客戶">



    <button

    id="save-project">

    儲存

    </button>



    </div>



    `;



}









/*
----------------------------------------------

Bind Events


----------------------------------------------

*/


bindEvents(){



    let addButton =



        document.getElementById(

            "btn-add-project"

        );









    if(addButton){



        addButton.onclick = ()=>{



            this.renderForm();



        };



    }









    document

    .querySelectorAll(

        ".btn-view-project"

    )

    .forEach(button=>{



        button.onclick = ()=>{



            this.showDetail(

                button.dataset.id

            );



        };



    });



}









/*
----------------------------------------------

Show Detail


----------------------------------------------

*/


showDetail(

    id

){



    let project =



        this.controller

        .getProject(

            id

        );









    this.currentProject =

        project;









    console.log(

        "Current Project",

        project

    );



    return project;



}









/*
----------------------------------------------

Refresh


----------------------------------------------

*/


refresh(){



    this.load();



}
```

}

window.ProjectView = ProjectView;
