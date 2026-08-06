/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/invoice-engine.js


 Sprint:
 2.3.5


 Build:
 Enterprise Invoice Engine


 Description:
 Invoice & Payment Management Engine


==================================================
*/


(function(global){


"use strict";



class InvoiceEngine {



    constructor(){


        this.storage =

            new InvoiceStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        if(this.storage.init){


            await this.storage.init();


        }


    }






    /*
    ==============================================

    Create Invoice

    建立請款資料

    ==============================================
    */


    async create(data){



        if(!data){


            throw new Error(

                "Invoice data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.InvoiceStatus.DRAFT;





        data.createdAt =


            new Date()

            .toISOString();





        return await this.storage.create(

            data

        );


    }






    /*
    ==============================================

    Generate From Shipment

    Shipment → Invoice

    ==============================================
    */


    async generateFromShipment(
        shipment
    ){



        if(!shipment){


            throw new Error(

                "Shipment required"

            );


        }





        return {


            shipmentId:

                shipment.id,



            purchaseId:

                shipment.purchaseId,



            projectId:

                shipment.projectId,



            supplierId:

                shipment.supplierId,



            items:

                shipment.items || [],



            amount:

                shipment.totalAmount || 0,



            status:

                CWPSTypes.InvoiceStatus.DRAFT,



            createdAt:


                new Date()

                .toISOString()



        };


    }






    /*
    ==============================================

    Submit Invoice

    提交請款

    ==============================================
    */


    async submit(
        invoiceId
    ){



        return await this.storage.submit(

            invoiceId

        );


    }






    /*
    ==============================================

    Approve Invoice

    審核通過

    ==============================================
    */


    async approve(
        invoiceId
    ){



        return await this.storage.approve(

            invoiceId

        );


    }






    /*
    ==============================================

    Pay Invoice

    完成付款

    ==============================================
    */


    async pay(
        invoiceId
    ){



        return await this.storage.pay(

            invoiceId

        );


    }






    /*
    ==============================================

    Close Invoice

    ==============================================
    */


    async close(
        invoiceId
    ){



        return await this.storage.close(

            invoiceId

        );


    }






    /*
    ==============================================

    Query

    ==============================================
    */


    async getAll(){



        return await this.storage.getAll();



    }






    async findByProject(
        projectId
    ){



        return await this.storage.findByProject(

            projectId

        );


    }






    async findByPurchase(
        purchaseId
    ){



        return await this.storage.findByPurchase(

            purchaseId

        );


    }






    async findBySupplier(
        supplierId
    ){



        return await this.storage.findBySupplier(

            supplierId

        );


    }






    /*
    ==============================================

    Cost Summary

    採購成本統計

    ==============================================
    */


    calculateTotal(
        invoices
    ){



        if(!Array.isArray(invoices)){


            return 0;


        }





        return invoices.reduce(

            (total,item)=>{


                return (

                    total +

                    Number(

                        item.amount || 0

                    )

                );


            },

            0

        );


    }






    /*
    ==============================================

    Version Management

    ==============================================
    */


    async createVersion(
        invoice
    ){



        return await this.storage.createVersion(

            invoice

        );


    }





}






global.InvoiceEngine =

    InvoiceEngine;



})(window);
