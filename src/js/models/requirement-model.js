# /*

CWPS Enterprise

Material Requirement Model

Sprint:

1.5.1

Build:

0001

Description:

Procurement material requirement data model

==================================================
*/

class RequirementModel {

```
constructor(data = {}){



    this.id =



        data.id ||

        this.generateId();





    this.projectId =



        data.projectId ||

        "";





    this.batchId =



        data.batchId ||

        "";





    this.materialId =



        data.materialId ||

        "";





    this.materialCode =



        data.materialCode ||

        "";





    this.materialName =



        data.materialName ||

        "";





    this.category =



        data.category ||

        "";





    this.quantity =



        Number(

            data.quantity

        )

        || 0;





    this.unit =



        data.unit ||

        "PCS";





    this.singleWeight =



        Number(

            data.singleWeight

        )

        || 0;





    this.totalWeight =



        this.quantity *

        this.singleWeight;





    this.source =



        data.source ||

        "BOM";





    this.status =



        data.status ||

        "Draft";





    this.remark =



        data.remark ||

        "";





    this.createdDate =



        data.createdDate ||

        new Date()

        .toISOString();





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Generate ID


----------------------------------------------

*/


generateId(){



    return (

        "REQ-" +

        Date.now()

    );



}









/*
----------------------------------------------

Confirm Requirement


----------------------------------------------

*/


confirm(){



    this.status =

        "Confirmed";



    this.updatedDate =

        new Date()

        .toISOString();



}









/*
----------------------------------------------

Mark Quoted


----------------------------------------------

*/


quoted(){



    this.status =

        "Quoted";



    this.updatedDate =

        new Date()

        .toISOString();



}









/*
----------------------------------------------

Mark Purchased


----------------------------------------------

*/


purchased(){



    this.status =

        "Purchased";



    this.updatedDate =

        new Date()

        .toISOString();



}









/*
----------------------------------------------

Complete


----------------------------------------------

*/


complete(){



    this.status =

        "Completed";



    this.updatedDate =

        new Date()

        .toISOString();



}









/*
----------------------------------------------

Calculate Weight


----------------------------------------------

*/


calculateWeight(){



    this.totalWeight =



        this.quantity *

        this.singleWeight;



    return this.totalWeight;



}









/*
----------------------------------------------

Update Quantity


----------------------------------------------

*/


updateQuantity(qty){



    this.quantity =



        Number(qty)

        || 0;





    this.calculateWeight();





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Convert JSON


----------------------------------------------

*/


toJSON(){



    return {



        id:

            this.id,



        projectId:

            this.projectId,



        batchId:

            this.batchId,



        materialId:

            this.materialId,



        materialCode:

            this.materialCode,



        materialName:

            this.materialName,



        category:

            this.category,



        quantity:

            this.quantity,



        unit:

            this.unit,



        singleWeight:

            this.singleWeight,



        totalWeight:

            this.totalWeight,



        status:

            this.status



    };



}
```

}

window.RequirementModel = RequirementModel;
