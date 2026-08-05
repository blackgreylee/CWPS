# /*

CWPS Enterprise

Project Controller

Sprint:

1.7.4

Build:

0001

Description:

Project management controller

==================================================
*/

class ProjectController {

```
constructor(){



    this.projects = [];





    this.currentProject =

        null;





    this.storage =

        null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    storage = null

){



    this.storage =

        storage;





    this.loadProjects();



}









/*
----------------------------------------------

Load Projects


----------------------------------------------

----------------------------------------------

*/


loadProjects(){



    if(

        this.storage

    ){



        this.projects =



            this.storage.getAll();



    }



}









/*
----------------------------------------------

Create Project


----------------------------------------------

----------------------------------------------

*/


createProject(

    data

){



    let project =



        new ProjectModel(

            data

        );





    this.projects.push(

        project

    );





    this.save();



    return project;



}









/*
----------------------------------------------

Update Project


----------------------------------------------

----------------------------------------------

*/


updateProject(

    id,

    data

){



    let project =



        this.getProject(

            id

        );





    if(!project){



        return null;



    }









    Object.assign(

        project,

        data

    );





    this.save();





    return project;



}









/*
----------------------------------------------

Delete Project


----------------------------------------------

----------------------------------------------

*/


deleteProject(

    id

){



    this.projects =



        this.projects.filter(



            item =>



            item.id !== id



        );





    this.save();



}









/*
----------------------------------------------

Get Project


----------------------------------------------

----------------------------------------------

*/


getProject(

    id

){



    return this.projects.find(



        item =>



        item.id === id



    );



}









/*
----------------------------------------------

Get By Project No


----------------------------------------------

----------------------------------------------

*/


getByProjectNo(

    projectNo

){



    return this.projects.find(



        item =>



        item.projectNo === projectNo



    );



}









/*
----------------------------------------------

Select Current Project


----------------------------------------------

----------------------------------------------

*/


selectProject(

    id

){



    this.currentProject =



        this.getProject(

            id

        );





    return this.currentProject;



}









/*
----------------------------------------------

Add Batch To Project


----------------------------------------------

----------------------------------------------

*/


addBatch(

    projectId,

    batchId

){



    let project =



        this.getProject(

            projectId

        );





    if(!project){



        return null;



    }









    if(

        !project.batches

    ){



        project.batches = [];



    }









    if(

        !project.batches.includes(

            batchId

        )

    ){



        project.batches.push(

            batchId

        );



    }





    this.save();





    return project;



}









/*
----------------------------------------------

Remove Batch


----------------------------------------------

----------------------------------------------

*/


removeBatch(

    projectId,

    batchId

){



    let project =



        this.getProject(

            projectId

        );





    if(!project){



        return null;



    }









    project.batches =



        project.batches.filter(



            id =>



            id !== batchId



        );





    this.save();





    return project;



}









/*
----------------------------------------------

Search Project


----------------------------------------------

----------------------------------------------

*/


search(

    keyword

){



    return this.projects.filter(



        item =>



        item.projectName

        .includes(

            keyword

        )

        ||

        item.projectNo

        .includes(

            keyword

        )



    );



}









/*
----------------------------------------------

Save


----------------------------------------------

----------------------------------------------

*/


save(){



    if(

        this.storage

    ){



        this.storage.saveAll(

            this.projects

        );



    }



}









/*
----------------------------------------------

Summary


----------------------------------------------

----------------------------------------------

*/


summary(){



    return {



        total:



            this.projects.length,



        active:



            this.projects.filter(



                item =>



                item.status ===

                "Active"



            ).length,



        completed:



            this.projects.filter(



                item =>



                item.status ===

                "Completed"



            ).length



    };



}
```

}

window.ProjectController = ProjectController;
