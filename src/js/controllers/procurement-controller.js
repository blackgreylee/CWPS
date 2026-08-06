/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/procurement-controller.js


 Sprint:
 2.6.2


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

            new RequirementEngine();



        this.quotationEngine =

            new QuotationEngine();



        this.purchaseEngine =

            new PurchaseEngine();



        this.shipmentEngine =

            new ShipmentEngine();



        this.invoiceEngine =

            new InvoiceEngine();



        this.analysis =

            new ProcurementAnalysis();



        this.view = null;


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(view){



        this.view = view;



        await this.requirementEngine.init();


        await this.quotationEngine.init();


        await this.purchaseEngine.init();


        await this.shipmentEngine.init();


        await this.invoiceEngine.init();


        await this.analysis.init();



        await this.load();


    }






    /*
    ==============================================

    Load Procurement Dashboard

    ==============================================
    */


    async load(){



        const data = {


            requirements:


                await this.requirementEngine.getAll(),



            quotations:


                await this.quotationEngine.getAll(),



            purchases:


                await this.purchaseEngine.getAll(),



            shipments:


                await this.shipmentEngine.getAll(),



            invoices:


                await this.invoiceEngine.getAll()



        };





        if(

            this.view &&

            this.view.render

        ){


            this.view.render(

                data

            );


        }





        return data;


    }






    /*
    ==============================================

    Requirement

    採購需求

    ==============================================
    */


    async createRequirement(
        data
    ){



        const result =


            await this.requirementEngine.create(

                data

            );





        await this.load();





        return result;


    }






    async getRequirements(
        projectId
    ){



        return await this.requirementEngine.findByProject(

            projectId

        );


    }






    /*
    ==============================================

    Quotation

    詢價

    ==============================================
    */


    async createQuotation(
        data
    ){



        const result =


            await this.quotationEngine.create(

                data

            );





        await this.load();





        return result;


    }






    async submitQuotation(
        quotationId
    ){



        return await this.quotationEngine.submit(

            quotationId

        );


    }






    /*
    ==============================================

    Purchase

    採購單

    ==============================================
    */


    async createPurchase(
        data
    ){



        const result =


            await this.purchaseEngine.create(

                data

            );





        await this.load();





        return result;


    }






    async approvePurchase(
        purchaseId
    ){



        return await this.purchaseEngine.approve(

            purchaseId

        );


    }






    /*
    ==============================================

    Shipment

    出貨

    ==============================================
    */


    async createShipmentFromPurchase(
        purchase
    ){



        const data =


            await this.shipmentEngine.generateFromPurchase(

                purchase

            );





        return await this.shipmentEngine.create(

            data

        );


    }






    async receiveShipment(
        shipmentId
    ){



        return await this.shipmentEngine.receive(

            shipmentId

        );


    }






    /*
    ==============================================

    Invoice

    請款

    ==============================================
    */


    async createInvoiceFromShipment(
        shipment
    ){



        const data =


            await this.invoiceEngine.generateFromShipment(

                shipment

            );





        return await this.invoiceEngine.create(

            data

        );


    }






    async approveInvoice(
        invoiceId
    ){



        return await this.invoiceEngine.approve(

            invoiceId

        );


    }






    async payInvoice(
        invoiceId
    ){



        return await this.invoiceEngine.pay(

            invoiceId

        );


    }






    /*
    ==============================================

    Project Summary

    專案採購分析

    ==============================================
    */


    async projectSummary(
        projectId
    ){



        return await this.analysis.projectSummary(

            projectId

        );


    }






    /*
    ==============================================

    Procurement Cost

    採購成本

    ==============================================
    */


    async calculateCost(
        purchases
    ){



        return this.analysis.calculatePurchaseAmount(

            purchases

        );


    }






}






global.ProcurementController =

    ProcurementController;



})(window);
