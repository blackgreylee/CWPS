/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/shipment-storage.js


 Sprint:
 2.1.9


 Build:
 Enterprise Procurement Storage


 Description:
 Shipment Repository Service


==================================================
*/


(function(global){


"use strict";



class ShipmentStorage {



    constructor(){


        this.db =

            new CWPSDatabase();



        this.storeName =

            "shipments";


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.db.open();


    }






    /*
    ==============================================

    Create

    ==============================================
    */


    async create(
        shipment
    ){



        if(!shipment){


            throw new Error(

                "Shipment required"

            );


        }





        return await this.db.add(

            this.storeName,

            shipment

        );


    }






    /*
    ==============================================

    Update

    ==============================================
    */


    async update(
        shipment
    ){



        return await this.db.update(

            this.storeName,

            shipment

        );


    }






    /*
    ==============================================

    Get

    ==============================================
    */


    async get(
        id
    ){



        return await this.db.get(

            this.storeName,

            id

        );


    }






    /*
    ==============================================

    Get All

    ==============================================
    */


    async getAll(){



        return await this.db.getAll(

            this.storeName

        );


    }






    /*
    ==============================================

    Find By Project

    ==============================================
    */


    async findByProject(
        projectId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.projectId === projectId



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



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.purchaseId === purchaseId



        );


    }






    /*
    ==============================================

    Find By Supplier

    ==============================================
    */


    async findBySupplier(
        supplierId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.supplierId === supplierId



        );


    }






    /*
    ==============================================

    Find By Status

    ==============================================
    */


    async findByStatus(
        status
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.status === status



        );


    }






    /*
    ==============================================

    Start Shipment

    ==============================================
    */


    async start(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Shipment not found"

            );


        }





        item.status =


            CWPSTypes.ShipmentStatus.SHIPPING;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Receive Shipment

    ==============================================
    */


    async receive(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Shipment not found"

            );


        }





        item.status =


            CWPSTypes.ShipmentStatus.RECEIVED;





        item.receivedDate =


            new Date()

            .toISOString();





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Close Shipment

    ==============================================
    */


    async close(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Shipment not found"

            );


        }





        item.status =


            CWPSTypes.ShipmentStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Version History

    ==============================================
    */


    async createVersion(
        shipment
    ){



        const version = {



            ...shipment,



            version:



                (shipment.version || 0)

                + 1,



            createdAt:



                new Date()

                .toISOString()



        };





        return await this.create(

            version

        );


    }






    /*
    ==============================================

    Remove

    Enterprise:

    不刪除，只關閉

    ==============================================
    */


    async remove(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            return false;


        }





        item.status =


            CWPSTypes.ShipmentStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        await this.update(

            item

        );





        return true;


    }




}






global.ShipmentStorage =

    ShipmentStorage;



})(window);
