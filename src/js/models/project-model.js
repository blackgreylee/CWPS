# /*

CWPS Enterprise

Project Data Model

Sprint:
1.3.2

Build:
0001

==================================================
*/

class ProjectModel {

```
constructor(data = {}) {



    this.id = data.id || this.generateId();



    /*
    工程編號

    Example:
    PRJ-001

    */

    this.projectNo = data.projectNo || "";



    /*
    工程名稱

    Example:
    Taipei Curtain Wall Project

    */

    this.projectName = data.projectName || "";



    /*
    業主

    */

    this.customer = data.customer || "";



    /*
    工程地點

    */

    this.location = data.location || "";



    /*
    Project Status

    Draft
    Active
    Completed

    */

    this.status = data.status || "Draft";



    /*
    建立時間

    */

    this.createdDate =

        data.createdDate ||

        new Date().toISOString();




    /*
    最後更新時間

    */

    this.updatedDate =

        data.updatedDate ||

        new Date().toISOString();




    /*
    Batch Collection


    [

        BatchModel,

        BatchModel

    ]

    */


    this.batches = data.batches || [];



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
Add Batch

----------------------------------------------
*/


addBatch(batch){



    this.batches.push(batch);



    this.touch();



}








/*
----------------------------------------------
Remove Batch

----------------------------------------------
*/


removeBatch(batchId){



    this.batches =

        this.batches.filter(



            batch =>

                batch.id !== batchId



        );



    this.touch();



}








/*
----------------------------------------------
Update Timestamp

----------------------------------------------
*/


touch(){



    this.updatedDate =

        new Date().toISOString();



}








/*
----------------------------------------------
Convert To JSON


For LocalStorage / API


----------------------------------------------
*/


toJSON(){



    return {



        id:this.id,


        projectNo:this.projectNo,


        projectName:this.projectName,


        customer:this.customer,


        location:this.location,


        status:this.status,


        createdDate:this.createdDate,


        updatedDate:this.updatedDate,


        batches:this.batches



    };



}








/*
----------------------------------------------
Create From JSON

----------------------------------------------
*/


static fromJSON(json){



    return new ProjectModel(json);



}
```

}

/*
Export

Browser Environment

*/

window.ProjectModel = ProjectModel;
