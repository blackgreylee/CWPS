# /*

CWPS Enterprise

Procurement Controller

Sprint:

1.7.5

Build:

0001

Description:

Procurement workflow controller

==================================================
*/

class ProcurementController {

```
constructor(){



    this.service = null;





    this.engines = {};





    this.currentProject = null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    service,

    engines

){



    this.service =

        service;





    this.engines =

        engines;



}









/*
----------------------------------------------

Set Project


----------------------------------------------

----------------------------------------------

*/


setProject(

    project

){



    this.currentProject =

        project;



}









/*
----------------------------------------------

Create Requirement


----------------------------------------------

----------------------------------------------

*/


createRequirement(

    data

){



    if(

        !this.service

    ){



        return null;



    }









    data.projectId =



        this.currentProject.id;









    return this.service

        .createRequirement(

            data

        );



}









/*
----------------------------------------------

Create Quotation


----------------------------------------------

----------------------------------------------

*/


createQuotation(

    requirement

){



    return this.service

        .createQuotation(



            requirement,



            this.engines.quotation



        );



}









/*
----------------------------------------------

Approve Quotation


----------------------------------------------

----------------------------------------------

*/


approveQuotation(

    quotation

){



    return this.service

        .approveQuotation(



            quotation,



            this.engines.quotation



        );



}









/*
----------------------------------------------

Create Purchase Order


----------------------------------------------

----------------------------------------------

*/


createPurchase(

    quotation

){



    return this.service

        .createPurchase(



            quotation,



            this.engines.purchase



        );



}









/*
----------------------------------------------

Create Shipment


----------------------------------------------

----------------------------------------------

*/


createShipment(

    purchase

){



    return this.service

        .createShipment(



            purchase,



            this.engines.shipment



        );



}









/*
----------------------------------------------

Create Invoice


----------------------------------------------

----------------------------------------------

*/


createInvoice(

    purchase,

    shipment

){



    return this.service

        .createInvoice(



            purchase,

            shipment,



            this.engines.invoice



        );



}









/*
----------------------------------------------

Complete Procurement Flow


----------------------------------------------

----------------------------------------------

*/


executeFullProcess(

    requirementData

){



    let requirement =



        this.createRequirement(

            requirementData

        );





    let quotation =



        this.createQuotation(

            requirement

        );





    let purchase =



        this.createPurchase(

            quotation

        );





    let shipment =



        this.createShipment(

            purchase

        );





    let invoice =



        this.createInvoice(

            purchase,

            shipment

        );









    return {



        requirement:

            requirement,



        quotation:

            quotation,



        purchase:

            purchase,



        shipment:

            shipment,



        invoice:

            invoice



    };



}









/*
----------------------------------------------

Get Project Procurement Status


----------------------------------------------

----------------------------------------------

*/


getStatus(){



    if(

        !this.currentProject

    ){



        return null;



    }









    return this.service

        .getProjectStatus(



            this.currentProject.id



        );



}









/*
----------------------------------------------

Validate Process


----------------------------------------------

----------------------------------------------

*/


validate(){



    return this.engines

        .validation

        ?



        this.engines.validation.result()



        :

        null;



}
```

}

window.ProcurementController = ProcurementController;
