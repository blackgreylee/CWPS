# /*

CWPS Enterprise

Procurement Service

Sprint:

1.6.2

Build:

0001

Description:

Procurement business service layer

==================================================
*/

class ProcurementService {

```
constructor(){



    this.requirements = [];



    this.quotations = [];



    this.purchases = [];



    this.shipments = [];



    this.invoices = [];



}









/*
----------------------------------------------

Create Requirement


----------------------------------------------

*/


createRequirement(

    data

){



    let requirement =



        new RequirementModel(

            data

        );





    this.requirements.push(

        requirement

    );





    return requirement;



}









/*
----------------------------------------------

Create Quotation


----------------------------------------------

----------------------------------------------

*/


createQuotation(

    requirement,

    quotationEngine

){



    let quotation =



        quotationEngine.createQuotation({



            requirementId:

                requirement.id,



            projectId:

                requirement.projectId,



            batchId:

                requirement.batchId,



            materialCode:

                requirement.materialCode,



            materialName:

                requirement.materialName,



            quantity:

                requirement.quantity,



            unit:

                requirement.unit



        });





    quotationEngine.addQuotation(

        quotation

    );





    this.quotations.push(

        quotation

    );





    return quotation;



}









/*
----------------------------------------------

Approve Quotation


----------------------------------------------

----------------------------------------------

*/


approveQuotation(

    quotation,

    quotationEngine

){



    quotationEngine.approveQuotation(

        quotation.id

    );





    return quotation;



}









/*
----------------------------------------------

Create Purchase


----------------------------------------------

----------------------------------------------

*/


createPurchase(

    quotation,

    purchaseEngine

){



    let purchase =



        purchaseEngine.createPurchaseOrder(

            quotation

        );





    this.purchases.push(

        purchase

    );





    return purchase;



}









/*
----------------------------------------------

Create Shipment


----------------------------------------------

----------------------------------------------

*/


createShipment(

    purchase,

    shipmentEngine

){



    let shipment =



        shipmentEngine.createShipment(

            purchase

        );





    this.shipments.push(

        shipment

    );





    return shipment;



}









/*
----------------------------------------------

Create Invoice


----------------------------------------------

----------------------------------------------

*/


createInvoice(

    purchase,

    shipment,

    invoiceEngine

){



    let invoice =



        invoiceEngine.createInvoice(

            purchase,

            shipment

        );





    this.invoices.push(

        invoice

    );





    return invoice;



}









/*
----------------------------------------------

Get Project Status


----------------------------------------------

----------------------------------------------

*/


getProjectStatus(

    projectId

){



    return {



        projectId:



            projectId,



        requirementCount:



            this.requirements.filter(



                item =>



                item.projectId === projectId



            ).length,



        quotationCount:



            this.quotations.filter(



                item =>



                item.projectId === projectId



            ).length,



        purchaseCount:



            this.purchases.filter(



                item =>



                item.projectId === projectId



            ).length,



        shipmentCount:



            this.shipments.filter(



                item =>



                item.projectId === projectId



            ).length,



        invoiceCount:



            this.invoices.filter(



                item =>



                item.projectId === projectId



            ).length



    };



}









/*
----------------------------------------------

Get Batch Status


----------------------------------------------

----------------------------------------------

*/


getBatchStatus(

    batchId

){



    return {



        batchId:



            batchId,



        requirements:



            this.requirements.filter(



                item =>



                item.batchId === batchId



            ).length,



        purchases:



            this.purchases.filter(



                item =>



                item.batchId === batchId



            ).length,



        shipments:



            this.shipments.filter(



                item =>



                item.batchId === batchId



            ).length



    };



}









/*
----------------------------------------------

Procurement Summary


----------------------------------------------

----------------------------------------------

*/


summary(){



    return {



        requirements:

            this.requirements.length,



        quotations:

            this.quotations.length,



        purchases:

            this.purchases.length,



        shipments:

            this.shipments.length,



        invoices:

            this.invoices.length,



        updated:

            new Date()

            .toISOString()



    };



}
```

}

window.ProcurementService = ProcurementService;
