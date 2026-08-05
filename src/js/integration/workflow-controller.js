# /*

CWPS Enterprise

Workflow Controller

Sprint:

1.6.1

Build:

0001

Description:

Central workflow controller

==================================================
*/

class WorkflowController {

```
constructor(){



    this.status =

        "Initialized";





    this.history = [];



}









/*
----------------------------------------------

Initialize Workflow


----------------------------------------------

*/


start(){



    this.status =

        "Running";





    this.log(

        "Workflow Started"

    );





    return this.status;



}









/*
----------------------------------------------

Create Quotation Flow


----------------------------------------------

----------------------------------------------

*/


createQuotation(

    requirement,

    quotationEngine

){



    if(

        !requirement

    ){



        throw new Error(

            "Requirement Missing"

        );



    }





    let quotation =



        quotationEngine.createQuotation({



            requirementId:

                requirement.id,



            projectId:

                requirement.projectId,



            materialCode:

                requirement.materialCode,



            materialName:

                requirement.materialName,



            quantity:

                requirement.quantity,



            unit:

                requirement.unit



        });







    this.log(

        "Quotation Created"

    );





    return quotation;



}









/*
----------------------------------------------

Create Purchase Flow


----------------------------------------------

----------------------------------------------

*/


createPurchase(

    quotation,

    purchaseEngine

){



    if(

        quotation.status

        !==

        "Approved"

    ){



        throw new Error(

            "Quotation Not Approved"

        );



    }





    let purchase =



        purchaseEngine.createPurchaseOrder(

            quotation

        );





    this.log(

        "Purchase Created"

    );





    return purchase;



}









/*
----------------------------------------------

Create Shipment Flow


----------------------------------------------

----------------------------------------------

*/


createShipment(

    purchase,

    shipmentEngine

){



    if(

        purchase.status

        !==

        "Confirmed"

    ){



        throw new Error(

            "Purchase Not Confirmed"

        );



    }





    let shipment =



        shipmentEngine.createShipment(

            purchase

        );





    this.log(

        "Shipment Created"

    );





    return shipment;



}









/*
----------------------------------------------

Create Invoice Flow


----------------------------------------------

----------------------------------------------

*/


createInvoice(

    purchase,

    shipment,

    invoiceEngine

){



    if(

        shipment.status

        !==

        "Completed"

    ){



        throw new Error(

            "Shipment Not Completed"

        );



    }





    let invoice =



        invoiceEngine.createInvoice(

            purchase,

            shipment

        );





    this.log(

        "Invoice Created"

    );





    return invoice;



}









/*
----------------------------------------------

Check Workflow Status


----------------------------------------------

----------------------------------------------

*/


checkStatus(

    object

){



    return {



        id:

            object.id,



        status:

            object.status



    };



}









/*
----------------------------------------------

Workflow History


----------------------------------------------

----------------------------------------------

*/


log(

    message

){



    this.history.push({



        message:

            message,



        time:



            new Date()

            .toISOString()



    });



}









getHistory(){



    return this.history;



}









/*
----------------------------------------------

Reset Workflow


----------------------------------------------

----------------------------------------------

*/


reset(){



    this.status =

        "Initialized";





    this.history = [];



}
```

}

window.WorkflowController = WorkflowController;
