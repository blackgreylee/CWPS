/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/shipment-engine.js


 Sprint:
 2.9.18


 Build:
 Enterprise Procurement Shipment Engine Layer


 Description:
 Shipment Processing Engine


==================================================
*/


(function(global){

"use strict";



class ShipmentEngine {



    constructor(){


        this.purchaseStorage =

            new global.PurchaseStorage();


        this.shipmentStorage =

            new global.ShipmentStorage();



    }





    /*
    ==============================================

    Create Shipment From Purchase

    ==============================================
    */


    createFromPurchase(

        purchaseId

    ){



        const purchase =

            this.purchaseStorage

            .getById(

                purchaseId

            );





        if(!purchase){


            throw new Error(

                "Purchase not found"

            );


        }





        return {


            purchaseId,


            supplierId:

                purchase.supplierId,


            materialId:

                purchase.materialId,


            quantity:

                purchase.quantity,


            unit:

                purchase.unit,


            status:

                "Preparing"



        };


    }





    /*
    ==============================================

    Save Shipment

    ==============================================
    */


    createShipment(

        data

    ){



        return this.shipmentStorage

            .create(

                data

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



        return this.shipmentStorage

            .ship(

                shipmentId

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



        return this.shipmentStorage

            .receive(

                shipmentId

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



        return this.shipmentStorage

            .cancel(

                shipmentId

            );


    }





    /*
    ==============================================

    Validate Shipment

    ==============================================
    */


    validate(

        shipment

    ){



        const errors = [];





        if(!shipment.purchaseId){


            errors.push(

                "Purchase missing"

            );


        }





        if(!shipment.materialId){


            errors.push(

                "Material missing"

            );


        }





        if(

            Number(

                shipment.quantity || 0

            )

            <=0

        ){


            errors.push(

                "Quantity invalid"

            );


        }





        if(!shipment.unit){


            errors.push(

                "Unit missing"

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

    Quantity Check

    ==============================================
    */


    checkQuantity(

        purchase,

        shipment

    ){



        return {


            valid:

                Number(

                    shipment.quantity

                )

                <=

                Number(

                    purchase.quantity

                ),



            purchaseQuantity:

                purchase.quantity,


            shipmentQuantity:

                shipment.quantity



        };



    }



}





global.ShipmentEngine =

    ShipmentEngine;



})(window);
