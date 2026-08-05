# /*

CWPS Enterprise

Material Data Model

Sprint:
1.3.2

Build:
0001

==================================================
*/

class MaterialModel {

```
constructor(data = {}) {



    /*
    System ID

    */

    this.id =

        data.id ||

        this.generateId();






    /*
    Material Code


    Example:

    AL-001


    */

    this.materialCode =

        data.materialCode ||

        "";






    /*
    Material Name


    Example:

    Aluminum Profile


    */

    this.materialName =

        data.materialName ||

        "";






    /*
    Material Category


    Aluminum

    Glass

    Steel

    Hardware


    */

    this.category =

        data.category ||

        "";






    /*
    Specification


    Example:

    6063-T5


    */

    this.specification =

        data.specification ||

        "";






    /*
    Measurement Unit


    m

    ㎡

    PCS

    SET


    */

    this.unit =

        data.unit ||

        "PCS";






    /*
    Single Weight


    kg per unit


    Example:

    2.35


    */

    this.singleWeight =

        data.singleWeight ||

        0;






    /*
    Weight Unit


    kg/m

    kg/㎡


    */

    this.weightUnit =

        data.weightUnit ||

        "kg";






    /*
    Supplier References


    [

        supplierId

    ]

    */


    this.supplierIds =

        data.supplierIds ||

        [];






    /*
    Status


    Active

    Disabled


    */

    this.status =

        data.status ||

        "Active";






    /*
    Remark

    */

    this.remark =

        data.remark ||

        "";






    /*
    Date

    */

    this.createdDate =

        data.createdDate ||

        new Date().toISOString();




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

        "MAT-" +

        Date.now()

    );



}










/*
----------------------------------------------

Calculate Weight


Quantity

x

Single Weight


----------------------------------------------

*/


calculateWeight(quantity){



    return (



        quantity *

        this.singleWeight



    );



}










/*
----------------------------------------------

Add Supplier

----------------------------------------------

*/


addSupplier(supplierId){



    if(

        !this.supplierIds.includes(

            supplierId

        )

    ){



        this.supplierIds.push(

            supplierId

        );



    }



    this.touch();



}










/*
----------------------------------------------

Remove Supplier

----------------------------------------------

*/


removeSupplier(supplierId){



    this.supplierIds =

        this.supplierIds.filter(



            id =>

            id !== supplierId



        );



    this.touch();



}










/*
----------------------------------------------

Update Time

----------------------------------------------

*/


touch(){



    this.updatedDate =

        new Date().toISOString();



}










/*
----------------------------------------------

JSON Convert

----------------------------------------------

*/


toJSON(){



    return {



        id:this.id,


        materialCode:this.materialCode,


        materialName:this.materialName,


        category:this.category,


        specification:this.specification,


        unit:this.unit,


        singleWeight:this.singleWeight,


        weightUnit:this.weightUnit,


        supplierIds:this.supplierIds,


        status:this.status,


        remark:this.remark,


        createdDate:this.createdDate,


        updatedDate:this.updatedDate



    };



}










/*
----------------------------------------------

Restore JSON

----------------------------------------------

*/


static fromJSON(json){



    return new MaterialModel(json);



}
```

}

window.MaterialModel = MaterialModel;
