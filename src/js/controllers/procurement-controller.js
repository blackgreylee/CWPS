/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/procurement-controller.js


 Sprint:
 2.9.29


 Build:
 Enterprise Procurement Controller Layer


 Description:
 Procurement Workflow Controller


==================================================
*/


(function(global){

"use strict";



class ProcurementController {



    constructor(){


        this.requirementEngine =

            new global.RequirementEngine();


        this.quotationEngine =

            new global.QuotationEngine();


        this.purchaseEngine =

            new global.PurchaseEngine();


        this.shipmentEngine =

            new global.ShipmentEngine();


        this.invoiceEngine =

            new global.InvoiceEngine();



        this.currentProject = null;



    }





    /*
    ==============================================

    Set Project Context

    ==============================================
    */


    setProject(

        projectId

    ){


        this.currentProject =

            projectId;


    }





    /*
    ==============================================

    Requirement

    採購需求

    ==============================================
    */


    getRequirements(){



        return this.requirementEngine

            .getAll();



    }





    createRequirement(

        data

    ){



        return this.requirementEngine

            .create(

                {

                    ...data,


                    projectId:

                        this.currentProject


                }

            );


    }





    /*
    ==============================================

    Quotation

    報價

    ==============================================
    */


    createQuotationRequest(

        requirementId,

        supplierId

    ){



        return this.quotationEngine

            .createRequest(

                requirementId,

                supplierId

            );


    }





    saveQuotation(

        data

    ){



        return this.quotationEngine

            .createQuotation(

                data

            );


    }





    approveQuotation(

        quotationId

    ){



        return this.quotationEngine

            .approve(

                quotationId

            );


    }





    /*
    ==============================================

    Purchase

    採購單

    ==============================================
    */


    createPurchase(

        quotationId

    ){



        const purchase =

            this.purchaseEngine

            .createFromQuotation(

                quotationId

            );





        return this.purchaseEngine

            .createPurchase(

                purchase

            );



    }





    confirmPurchase(

        purchaseId

    ){



        return this.purchaseEngine

            .confirm(

                purchaseId

            );


    }





    /*
    ==============================================

    Shipment

    出貨

    ==============================================
    */


    createShipment(

        purchaseId

    ){



        const shipment =

            this.shipmentEngine

            .createFromPurchase(

                purchaseId

            );





        return this.shipmentEngine

            .createShipment(

                shipment

            );


    }





    receiveShipment(

        shipmentId

    ){



        return this.shipmentEngine

            .receive(

                shipmentId

            );


    }





    /*
    ==============================================

    Invoice

    發票

    ==============================================
    */


    createInvoice(

        shipmentId

    ){



        const invoice =

            this.invoiceEngine

            .createFromShipment(

                shipmentId

            );





        return this.invoiceEngine

            .createInvoice(

                invoice

            );



    }





    paidInvoice(

        invoiceId

    ){



        return this.invoiceEngine

            .paid(

                invoiceId

            );


    }





    /*
    ==============================================

    Procurement Summary

    ==============================================
    */


    summary(){



        return {


            requirements:

                this.getRequirements(),


            project:

                this.currentProject



        };


    }



}





global.ProcurementController =

    ProcurementController;



})(window);
