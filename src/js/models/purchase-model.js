# /*

CWPS Enterprise

Purchase Order Model

Sprint:

1.5.3

Build:

0001

Description:

Purchase order data model

==================================================
*/

class PurchaseModel {

```
constructor(data = {}){



    this.id =



        data.id ||

        this.generateId();





    this.quotationId =



        data.quotationId ||

        "";





    this.projectId =



        data.projectId ||

        "";





    this.batchId =



        data.batchId ||

        "";





    this.supplierId =



        data.supplierId ||

        "";





    this.supplierName =



        data.supplierName ||

        "";





    this.items =



        data.items ||

        [];





    this.totalAmount =



        this.calculateTotal();





    this.currency =



        data.currency ||

        "TWD";





    this.expectedDate =



        data.expectedDate ||

        "";





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

        "PO-" +

        Date.now()

    );



}









/*
----------------------------------------------

Add Purchase Item


----------------------------------------------

*/


addItem(item){



    let purchaseItem = {



        materialCode:

            item.materialCode || "",



        materialName:

            item.materialName || "",



        quantity:

            Number(

                item.quantity

            ) || 0,



        unit:

            item.unit || "PCS",



        unitPrice:

            Number(

                item.unitPrice

            ) || 0,



        amount:

            Number(

                item.quantity

            )

            *

            Number(

                item.unitPrice

            )



    };





    this.items.push(

        purchaseItem

    );





    this.calculateTotal();



}









/*
----------------------------------------------

Calculate Total Amount


----------------------------------------------

*/


calculateTotal(){



    let total = 0;





    this.items.forEach(item=>{



        total +=



            Number(

                item.amount

            )

            || 0;



    });





    this.totalAmount = total;





    return total;



}









/*
----------------------------------------------

Submit Purchase


----------------------------------------------

*/


submit(){



    this.status =

        "Submitted";





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Confirm Purchase


----------------------------------------------

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

Start Processing


----------------------------------------------

----------------------------------------------

*/


processing(){



    this.status =

        "Processing";





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Complete Purchase


----------------------------------------------

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

Cancel Purchase


----------------------------------------------

----------------------------------------------

*/


cancel(){



    this.status =

        "Cancelled";





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Update Delivery Date


----------------------------------------------

----------------------------------------------

*/


updateDeliveryDate(date){



    this.expectedDate = date;





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



        quotationId:

            this.quotationId,



        projectId:

            this.projectId,



        batchId:

            this.batchId,



        supplierId:

            this.supplierId,



        supplierName:

            this.supplierName,



        items:

            this.items,



        totalAmount:

            this.totalAmount,



        currency:

            this.currency,



        expectedDate:

            this.expectedDate,



        status:

            this.status



    };



}
```

}

window.PurchaseModel = PurchaseModel;
