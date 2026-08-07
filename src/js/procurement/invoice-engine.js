/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/invoice-engine.js


 Sprint:
 2.9.19


 Build:
 Enterprise Procurement Invoice Engine Layer


 Description:
 Invoice Processing Engine


==================================================
*/


(function(global){

"use strict";



class InvoiceEngine {



    constructor(){


        this.shipmentStorage =

            new global.ShipmentStorage();


        this.invoiceStorage =

            new global.InvoiceStorage();



    }





    /*
    ==============================================

    Create Invoice From Shipment

    ==============================================
    */


    createFromShipment(

        shipmentId

    ){



        const shipment =

            this.shipmentStorage

            .getById(

                shipmentId

            );





        if(!shipment){


            throw new Error(

                "Shipment not found"

            );


        }





        return {


            shipmentId,


            purchaseId:

                shipment.purchaseId,


            supplierId:

                shipment.supplierId,


            materialId:

                shipment.materialId,


            quantity:

                shipment.quantity,


            unit:

                shipment.unit,


            amount:

                shipment.amount || 0,


            status:

                "Draft"



        };


    }





    /*
    ==============================================

    Save Invoice

    ==============================================
    */


    createInvoice(

        data

    ){



        return this.invoiceStorage

            .create(

                data

            );


    }





    /*
    ==============================================

    Issue Invoice

    ==============================================
    */


    issue(

        invoiceId

    ){



        return this.invoiceStorage

            .issue(

                invoiceId

            );


    }





    /*
    ==============================================

    Paid Invoice

    ==============================================
    */


    paid(

        invoiceId

    ){



        return this.invoiceStorage

            .paid(

                invoiceId

            );


    }





    /*
    ==============================================

    Cancel Invoice

    ==============================================
    */


    cancel(

        invoiceId

    ){



        return this.invoiceStorage

            .cancel(

                invoiceId

            );


    }





    /*
    ==============================================

    Validate Invoice

    ==============================================
    */


    validate(

        invoice

    ){



        const errors = [];





        if(!invoice.shipmentId){


            errors.push(

                "Shipment missing"

            );


        }





        if(!invoice.supplierId){


            errors.push(

                "Supplier missing"

            );


        }





        if(

            Number(

                invoice.amount || 0

            )

            <=0

        ){


            errors.push(

                "Amount invalid"

            );


        }





        return {


            valid:

                errors.length===0,


            errors



        };



    }





    /*
    ==============================================

    Calculate Invoice Amount

    ==============================================
    */


    calculateAmount(

        quantity,

        unitPrice

    ){



        return Number(quantity || 0)

        *

        Number(unitPrice || 0);



    }





    /*
    ==============================================

    Total Invoice Amount

    ==============================================
    */


    totalAmount(

        invoices

    ){



        return invoices.reduce(

            (sum,item)=>{


                return sum +

                Number(

                    item.amount || 0

                );


            },

            0

        );


    }



}





global.InvoiceEngine =

    InvoiceEngine;



})(window);
