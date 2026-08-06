/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/shipment-engine.js


 Sprint:
 2.3.4


 Build:
 Enterprise Shipment Engine


 Description:
 Shipment Tracking Management Engine


==================================================
*/


(function(global){


"use strict";



class ShipmentEngine {



    constructor(){


        this.storage =

            new ShipmentStorage();


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

    Create Shipment

    建立出貨資料

    ==============================================
    */


    async create(data){



        if(!data){


            throw new Error(

                "Shipment data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.ShipmentStatus.PENDING;





        data.createdAt =


            new Date()

            .toISOString();





        return await this.storage.create(

            data

        );


    }






    /*
    ==============================================

    Generate From Purchase

    Purchase → Shipment

    ==============================================
    */


    async generateFromPurchase(
        purchase
    ){



        if(!purchase){


            throw new Error(

                "Purchase required"

            );


        }





        return {


            purchaseId:

                purchase.id,



            quotationId:

                purchase.quotationId,



            requirementId:

                purchase.requirementId,



            projectId:

                purchase.projectId,



            supplierId:

                purchase.supplierId,



            items:

                purchase.items || [],



            status:

                CWPSTypes.ShipmentStatus.PENDING,



            createdAt:


                new Date()

                .toISOString()



        };


    }






    /*
    ==============================================

    Start Shipment

    出貨

    ==============================================
    */


    async start(
        shipmentId
    ){



        return await this.storage.start(

            shipmentId

        );


    }






    /*
    ==============================================

    Receive Shipment

    收貨確認

    ==============================================
    */


    async receive(
        shipmentId
    ){



        return await this.storage.receive(

            shipmentId

        );


    }






    /*
    ==============================================

    Close Shipment

    ==============================================
    */


    async close(
        shipmentId
    ){



        return await this.storage.close(

            shipmentId

        );


    }






    /*
    ==============================================

    Get All

    ==============================================
    */


    async getAll(){



        return await this.storage.getAll();



    }






    /*
    ==============================================

    Find By Project

    ==============================================
    */


    async findByProject(
        projectId
    ){



        return await this.storage.findByProject(

            projectId

        );


    }






    /*
    ==============================================

    Find By Purchase

    ==============================================
    */


    async findByPurchase(
        purchaseId
    ){



        return await this.storage.findByPurchase(

            purchaseId

        );


    }






    /*
    ==============================================

    Find Supplier Shipment

    ==============================================
    */


    async findBySupplier(
        supplierId
    ){



        return await this.storage.findBySupplier(

            supplierId

        );


    }






    /*
    ==============================================

    Shipment Version

    ==============================================
    */


    async createVersion(
        shipment
    ){



        return await this.storage.createVersion(

            shipment

        );


    }





}






global.ShipmentEngine =

    ShipmentEngine;



})(window);
