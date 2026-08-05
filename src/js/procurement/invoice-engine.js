# /*

CWPS Enterprise

Invoice Model

Sprint:

1.5.5

Build:

0001

Description:

Invoice and payment tracking data model

==================================================
*/

class InvoiceModel {

```
constructor(data = {}){



    this.id =



        data.id ||

        this.generateId();





    this.purchaseId =



        data.purchaseId ||

        "";





    this.shipmentId =



        data.shipmentId ||

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





    this.invoiceNo =



        data.invoiceNo ||

        "";





    this.invoiceDate =



        data.invoiceDate ||

        "";





    this.amount =



        Number(

            data.amount

        )

        || 0;





    this.taxRate =



        Number(

            data.taxRate

        )

        || 5;





    this.tax =



        this.calculateTax();





    this.totalAmount =



        this.amount +

        this.tax;





    this.status =



        data.status ||

        "Draft";





    this.paymentStatus =



        data.paymentStatus ||

        "Unpaid";





    this.paidAmount =



        Number(

            data.paidAmount

        )

        || 0;





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

        "INV-" +

        Date.now()

    );



}









/*
----------------------------------------------

Calculate Tax


----------------------------------------------

*/


calculateTax(){



    return Math.round(



        this.amount *

        (

            this.taxRate /

            100

        )



    );



}









/*
----------------------------------------------

Calculate Total


----------------------------------------------

*/


calculateTotal(){



    this.tax =

        this.calculateTax();





    this.totalAmount =



        this.amount +

        this.tax;





    return this.totalAmount;



}









/*
----------------------------------------------

Issue Invoice


----------------------------------------------

*/


issue(){



    this.status =

        "Issued";





    this.updateTime();



}









/*
----------------------------------------------

Verify Invoice


----------------------------------------------

----------------------------------------------

*/


verify(){



    this.status =

        "Verified";





    this.updateTime();



}









/*
----------------------------------------------

Approve Invoice


----------------------------------------------

----------------------------------------------

*/


approve(){



    this.status =

        "Approved";





    this.updateTime();



}









/*
----------------------------------------------

Record Payment


----------------------------------------------

----------------------------------------------

*/


pay(amount){



    this.paidAmount +=



        Number(amount)

        || 0;





    if(

        this.paidAmount >=

        this.totalAmount

    ){



        this.paymentStatus =

            "Paid";



    }

    else if(

        this.paidAmount > 0

    ){



        this.paymentStatus =

            "Partial";



    }





    this.updateTime();



}









/*
----------------------------------------------

Close Invoice


----------------------------------------------

----------------------------------------------

*/


close(){



    this.status =

        "Closed";





    this.updateTime();



}









/*
----------------------------------------------

Remaining Payment


----------------------------------------------

----------------------------------------------

*/


getRemainingAmount(){



    return (



        this.totalAmount -

        this.paidAmount



    );



}









/*
----------------------------------------------

Update Time


----------------------------------------------

----------------------------------------------

*/


updateTime(){



    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Convert JSON


----------------------------------------------

----------------------------------------------

*/


toJSON(){



    return {



        id:

            this.id,



        purchaseId:

            this.purchaseId,



        shipmentId:

            this.shipmentId,



        supplierId:

            this.supplierId,



        supplierName:

            this.supplierName,



        invoiceNo:

            this.invoiceNo,



        amount:

            this.amount,



        tax:

            this.tax,



        totalAmount:

            this.totalAmount,



        status:

            this.status,



        paymentStatus:

            this.paymentStatus,



        paidAmount:

            this.paidAmount



    };



}
```

}

window.InvoiceModel = InvoiceModel;
