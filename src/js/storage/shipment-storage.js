/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/shipment-storage.js


 Sprint:
 2.9.10


 Build:
 Enterprise Shipment Storage Layer


 Description:
 Shipment Data Access Layer


==================================================
*/


(function(global){

"use strict";



class ShipmentStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "shipments"

            );


    }





    /*
    ==============================================

    Get All Shipments

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Shipment By ID

    ==============================================
    */


    getById(

        shipmentId

    ){


        return this.collection.getById(

            shipmentId

        );


    }





    /*
    ==============================================

    Get By Shipment No

    ==============================================
    */


    getByNo(

        shipmentNo

    ){



        const result =


            this.collection.where({

                shipmentNo

            });





        return result[0] || null;


    }





    /*
    ==============================================

    Get By Purchase

    ==============================================
    */


    getByPurchase(

        purchaseId

    ){


        return this.collection.where({

            purchaseId

        });


    }





    /*
    ==============================================

    Get By Status

    ==============================================
    */


    getByStatus(

        status

    ){


        return this.collection.where({

            status

        });


    }





    /*
    ==============================================

    Create Shipment

    ==============================================
    */


    create(

        shipment

    ){



        const exists =


            this.getByNo(

                shipment.shipmentNo

            );





        if(exists){


            throw new Error(

                "Shipment No already exists"

            );


        }





        const data = {


            ...shipment,


            status:

                shipment.status

                ||

                "Preparing",


            createDate:

                new Date()

                .toISOString()



        };





        return this.collection.insert(

            data

        );


    }





    /*
    ==============================================

    Update Shipment

    ==============================================
    */


    update(

        shipmentId,

        data

    ){



        return this.collection.update(

            shipmentId,

            {

                ...data,


                updateDate:

                    new Date()

                    .toISOString()


            }

        );


    }





    /*
    ==============================================

    Ship

    ==============================================
    */


    ship(

        shipmentId

    ){



        return this.update(

            shipmentId,

            {

                status:"Shipped",

                shipmentDate:

                    new Date()

                    .toISOString()

            }

        );


    }





    /*
    ==============================================

    Receive

    ==============================================
    */


    receive(

        shipmentId

    ){



        return this.update(

            shipmentId,

            {

                status:"Received",

                receiveDate:

                    new Date()

                    .toISOString()

            }

        );


    }





    /*
    ==============================================

    Cancel

    ==============================================
    */


    cancel(

        shipmentId

    ){



        return this.update(

            shipmentId,

            {

                status:"Cancelled"

            }

        );


    }





    /*
    ==============================================

    Delete

    ==============================================
    */


    delete(

        shipmentId

    ){


        return this.collection.delete(

            shipmentId

        );


    }



}





global.ShipmentStorage =

    ShipmentStorage;



})(window);
