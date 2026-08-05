# /*

CWPS Enterprise

Invoice Management Engine

Sprint:

1.5.5

Build:

0001

Description:

Invoice workflow and payment tracking engine

==================================================
*/

class InvoiceEngine {

```
constructor(){



    this.invoices = [];



}









/*
----------------------------------------------

Create Invoice From Purchase


----------------------------------------------

*/


createInvoice(

    purchase,

    shipment = null

){



    let amount = 0;





    purchase.items.forEach(item=>{



        amount +=



            Number(

                item.amount

            )

            ||



            (

                item.quantity *

                item.unitPrice

            );



    });







    let invoice =



        new InvoiceModel({



            purchaseId:

                purchase.id,



            shipmentId:

                shipment

                ?

                shipment.id

                :

                "",



            projectId:

                purchase.projectId,



            batchId:

                purchase.batchId,



            supplierId:

                purchase.supplierId,



            supplierName:

                purchase.supplierName,



            amount:

                amount



        });









    this.invoices.push(

        invoice

    );





    return invoice;



}









/*
----------------------------------------------

Add Invoice


----------------------------------------------

*/


addInvoice(

    invoice

){



    this.invoices.push(

        invoice

    );





    return invoice;



}









/*
----------------------------------------------

Get All Invoices


----------------------------------------------

*/


getAll(){



    return this.invoices;



}









/*
----------------------------------------------

Get Invoice By ID


----------------------------------------------

*/


getById(

    id

){



    return this.invoices.find(



        item =>



        item.id === id



    );



}









/*
----------------------------------------------

Find By Purchase Order


----------------------------------------------

*/


getByPurchase(

    purchaseId

){



    return this.invoices.filter(



        item =>



        item.purchaseId === purchaseId



    );



}









/*
----------------------------------------------

Issue Invoice


----------------------------------------------

*/


issueInvoice(

    invoiceId

){



    let invoice =



        this.getById(

            invoiceId

        );





    if(!invoice){



        return null;



    }





    invoice.issue();





    return invoice;



}









/*
----------------------------------------------

Verify Invoice


----------------------------------------------

----------------------------------------------

*/


verifyInvoice(

    invoiceId

){



    let invoice =



        this.getById(

            invoiceId

        );





    if(!invoice){



        return null;



    }





    invoice.verify();





    return invoice;



}









/*
----------------------------------------------

Approve Invoice


----------------------------------------------

----------------------------------------------

*/


approveInvoice(

    invoiceId

){



    let invoice =



        this.getById(

            invoiceId

        );





    if(!invoice){



        return null;



    }





    invoice.approve();





    return invoice;



}









/*
----------------------------------------------

Payment Record


----------------------------------------------

----------------------------------------------

*/


recordPayment(

    invoiceId,

    amount

){



    let invoice =



        this.getById(

            invoiceId

        );





    if(!invoice){



        return null;



    }





    invoice.pay(

        amount

    );





    return invoice;



}









/*
----------------------------------------------

Get Unpaid Invoice


----------------------------------------------

----------------------------------------------

*/


getUnpaidInvoices(){



    return this.invoices.filter(



        invoice =>



        invoice.paymentStatus

        !==

        "Paid"



    );



}









/*
----------------------------------------------

Calculate Outstanding Amount


----------------------------------------------

----------------------------------------------

*/


getOutstandingAmount(){



    let total = 0;





    this.getUnpaidInvoices()

    .forEach(invoice=>{



        total +=



            invoice.getRemainingAmount();



    });





    return total;



}









/*
----------------------------------------------

Invoice Summary


----------------------------------------------

----------------------------------------------

*/


summary(){



    let total = 0;



    let paid = 0;



    let unpaid = 0;





    this.invoices.forEach(invoice=>{



        total +=



            invoice.totalAmount;





        paid +=



            invoice.paidAmount;



    });





    unpaid =

        total -

        paid;





    return {



        invoiceCount:

            this.invoices.length,



        totalAmount:

            total,



        paidAmount:

            paid,



        unpaidAmount:

            unpaid,



        generatedDate:

            new Date()

            .toISOString()



    };



}









/*
----------------------------------------------

Close Invoice


----------------------------------------------

----------------------------------------------

*/


closeInvoice(

    invoiceId

){



    let invoice =



        this.getById(

            invoiceId

        );





    if(!invoice){



        return null;



    }





    invoice.close();





    return invoice;



}
```

}

window.InvoiceEngine = InvoiceEngine;
