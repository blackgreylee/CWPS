# /*

CWPS Enterprise

Batch Data Model

Sprint:
1.3.2

Build:
0001

==================================================
*/

class BatchModel {

```
constructor(data = {}) {



    /*
    System ID

    */

    this.id =

        data.id ||

        this.generateId();






    /*
    Batch Number

    Example:

    Z05

    */

    this.batchNo =

        data.batchNo ||

        "";






    /*
    Parent Project

    */

    this.projectId =

        data.projectId ||

        "";






    /*
    Batch Description

    */

    this.description =

        data.description ||

        "";






    /*
    BOM Version


    Example:

    V001

    */

    this.version =

        data.version ||

        "V001";






    /*
    Status


    Draft

    Active

    Locked

    Obsolete


    */

    this.status =

        data.status ||

        "Draft";






    /*
    BOM Tree Nodes


    [

        BOMNode

    ]

    */

    this.bomNodes =

        data.bomNodes ||

        [];






    /*
    Import History


    [

        {

            version,

            date,

            user,

            status

        }

    ]

    */


    this.importHistory =

        data.importHistory ||

        [];






    /*
    Soft Delete


    不允許真正刪除


    */

    this.isDeleted =

        data.isDeleted ||

        false;






    /*
    Created Date

    */

    this.createdDate =

        data.createdDate ||

        new Date().toISOString();






    /*
    Updated Date

    */

    this.updatedDate =

        data.updatedDate ||

        new Date().toISOString();



}










/*
----------------------------------------------

Generate ID

----------------------------------------------

*/


generateId(){



    return (

        "BAT-" +

        Date.now()

    );



}










/*
----------------------------------------------

Add BOM Node

----------------------------------------------

*/


addBomNode(node){



    this.bomNodes.push(node);



    this.touch();



}










/*
----------------------------------------------

Create New Version


Example:

V001

→

V002


----------------------------------------------

*/


createNewVersion(){



    let current =

        parseInt(

            this.version.replace(

                "V",

                ""

            )

        );



    current++;




    this.version =

        "V" +

        current

            .toString()

            .padStart(3,"0");





    this.importHistory.push({



        version:this.version,


        date:new Date().toISOString(),


        status:"Created"



    });





    this.touch();



    return this.version;



}










/*
----------------------------------------------

Disable Batch


不刪除資料

----------------------------------------------

*/


disable(){



    this.status =

        "Obsolete";



    this.isDeleted =

        true;



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

Convert JSON

----------------------------------------------

*/


toJSON(){



    return {



        id:this.id,


        batchNo:this.batchNo,


        projectId:this.projectId,


        description:this.description,


        version:this.version,


        status:this.status,


        bomNodes:this.bomNodes,


        importHistory:this.importHistory,


        isDeleted:this.isDeleted,


        createdDate:this.createdDate,


        updatedDate:this.updatedDate



    };



}










/*
----------------------------------------------

Create From JSON

----------------------------------------------

*/


static fromJSON(json){



    return new BatchModel(json);



}
```

}

window.BatchModel = BatchModel;
