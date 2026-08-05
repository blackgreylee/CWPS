# /*

CWPS Enterprise

Supplier Data Model

Sprint:
1.3.2

Build:
0001

==================================================
*/

class SupplierModel {

```
constructor(data = {}) {



    /*
    System ID

    */

    this.id =

        data.id ||

        this.generateId();






    /*
    Supplier Code


    Example:

    SUP-001


    */

    this.supplierCode =

        data.supplierCode ||

        "";






    /*
    Supplier Name

    */

    this.supplierName =

        data.supplierName ||

        "";






    /*
    Supplier Type


    PROCESSING_FACTORY

    ALUMINUM_SUPPLIER

    GLASS_SUPPLIER

    HARDWARE_SUPPLIER


    */

    this.supplierType =

        data.supplierType ||

        "OTHER";






    /*
    Contact Person

    */

    this.contactPerson =

        data.contactPerson ||

        "";






    /*
    Phone

    */

    this.phone =

        data.phone ||

        "";






    /*
    Email

    */

    this.email =

        data.email ||

        "";






    /*
    Address

    */

    this.address =

        data.address ||

        "";






    /*
    Supplied Materials


    [

        materialId

    ]

    */

    this.materialIds =

        data.materialIds ||

        [];






    /*
    Supplier Status


    Active

    Disabled

    Blacklist


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

        "SUP-" +

        Date.now()

    );



}










/*
----------------------------------------------

Add Material Relation

----------------------------------------------

*/


addMaterial(materialId){



    if(

        !this.materialIds.includes(

            materialId

        )

    ){



        this.materialIds.push(

            materialId

        );



    }



    this.touch();



}










/*
----------------------------------------------

Remove Material Relation

----------------------------------------------

*/


removeMaterial(materialId){



    this.materialIds =

        this.materialIds.filter(



            id =>

            id !== materialId



        );



    this.touch();



}










/*
----------------------------------------------

Disable Supplier


不刪除資料


----------------------------------------------

*/


disable(){



    this.status =

        "Disabled";



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


        supplierCode:this.supplierCode,


        supplierName:this.supplierName,


        supplierType:this.supplierType,


        contactPerson:this.contactPerson,


        phone:this.phone,


        email:this.email,


        address:this.address,


        materialIds:this.materialIds,


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



    return new SupplierModel(json);



}
```

}

window.SupplierModel = SupplierModel;
