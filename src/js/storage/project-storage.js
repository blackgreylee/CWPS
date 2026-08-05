# /*

CWPS Enterprise

Project Storage Service

Sprint:

1.4

Build:

0001

Description:

Project persistence management

==================================================
*/

class ProjectStorage {

```
constructor(){



    this.db =

        new CWPSDatabase();



    this.collection =

        "projects";



    this.db.init();



}









/*
----------------------------------------------

Create Project


----------------------------------------------

*/


create(data){



    let project = {



        id:

            data.id ||

            this.generateId(),



        projectCode:

            data.projectCode || "",



        projectName:

            data.projectName || "",



        customer:

            data.customer || "",



        batches:

            [],



        status:

            "Active",



        remark:

            data.remark || "",



        createdDate:

            new Date()

            .toISOString(),



        updatedDate:

            new Date()

            .toISOString()



    };





    return this.db.insert(



        this.collection,

        project



    );



}









/*
----------------------------------------------

Generate ID


----------------------------------------------

*/


generateId(){



    return (

        "PRJ-" +

        Date.now()

    );



}









/*
----------------------------------------------

Get All Projects


----------------------------------------------

*/


getAll(){



    return this.db.get(

        this.collection

    );



}









/*
----------------------------------------------

Get Project By ID


----------------------------------------------

*/


getById(id){



    return this.db.findById(



        this.collection,

        id



    );



}









/*
----------------------------------------------

Update Project


----------------------------------------------

*/


update(

    id,

    changes

){



    let project =

        this.getById(

            id

        );





    if(!project){



        return null;



    }





    Object.assign(



        project,

        changes



    );





    project.updatedDate =



        new Date()

        .toISOString();





    return this.db.update(



        this.collection,

        id,

        project



    );



}









/*
----------------------------------------------

Add Batch Relation


----------------------------------------------

*/


addBatch(

    projectId,

    batchId

){



    let project =

        this.getById(

            projectId

        );





    if(!project){



        return null;



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





    return this.update(



        projectId,

        {

            batches:

                project.batches

        }



    );



}









/*
----------------------------------------------

Remove Batch Relation


不刪除Batch


----------------------------------------------

*/


removeBatch(

    projectId,

    batchId

){



    let project =

        this.getById(

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





    return this.update(



        projectId,

        {

            batches:

                project.batches

        }



    );



}









/*
----------------------------------------------

Get Project Batches


----------------------------------------------

*/


getProjectBatches(

    projectId,

    batchStorage

){



    let project =

        this.getById(

            projectId

        );





    if(!project){



        return [];



    }





    return project.batches.map(



        id =>

        batchStorage.getById(

            id

        )



    )

    .filter(

        item =>

        item

    );



}









/*
----------------------------------------------

Disable Project


----------------------------------------------

*/


disable(id){



    return this.update(



        id,

        {

            status:

            "Disabled"

        }



    );



}









/*
----------------------------------------------

Search Project


----------------------------------------------

*/


search(keyword){



    let projects =

        this.getAll();





    keyword =

        keyword.toLowerCase();





    return projects.filter(



        project =>



        project.projectName

        .toLowerCase()

        .includes(keyword)



        ||



        project.projectCode

        .toLowerCase()

        .includes(keyword)



    );



}
```

}

window.ProjectStorage = ProjectStorage;
