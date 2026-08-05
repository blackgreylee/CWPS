# /*

CWPS Enterprise

Supplier Quotation Model

Sprint:

1.5.2

Build:

0001

Description:

Supplier quotation data model

==================================================
*/

class QuotationModel {

```
constructor(data = {}){



    this.id =



        data.id ||

        this.generateId();





    this.requirementId =



        data.requirementId ||

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





    this.unitPrice =



        Number(

            data.unitPrice

        )

        || 0;





    this.totalAmount =



        this.quantity *

        this.unitPrice;





    this.currency =



        data.currency ||

        "TWD";





    this.deliveryDays =



        Number(

            data.deliveryDays

        )

        || 0;





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

        "QUO-" +

        Date.now()

    );



}









/*
----------------------------------------------

Calculate Total Amount


----------------------------------------------

*/


calculateAmount(){



    this.totalAmount =



        this.quantity *

        this.unitPrice;



    return this.totalAmount;



}









/*
----------------------------------------------

Update Price


----------------------------------------------

*/


updatePrice(

    price

){



    this.unitPrice =



        Number(price)

        || 0;





    this.calculateAmount();





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Send Quotation Request


----------------------------------------------

*/


send(){



    this.status =

        "Sent";





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Supplier Submitted


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

Approve Quotation


----------------------------------------------

*/


approve(){



    this.status =

        "Approved";





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Reject Quotation


----------------------------------------------

*/


reject(){



    this.status =

        "Rejected";





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Get Price Per Unit


----------------------------------------------

*/


getUnitPrice(){



    return this.unitPrice;



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



        requirementId:

            this.requirementId,



        supplierId:

            this.supplierId,



        supplierName:

            this.supplierName,



        materialCode:

            this.materialCode,



        materialName:

            this.materialName,



        quantity:

            this.quantity,



        unit:

            this.unit,



        unitPrice:

            this.unitPrice,



        totalAmount:

            this.totalAmount,



        currency:

            this.currency,



        deliveryDays:

            this.deliveryDays,



        status:

            this.status



    };



}
```

}

window.QuotationModel = QuotationModel;
