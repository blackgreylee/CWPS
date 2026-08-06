/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/purchase-storage.js


 Sprint:
 2.1.8


 Build:
 Enterprise Procurement Storage


 Description:
 Purchase Repository Service


==================================================
*/


(function(global){


"use strict";



class PurchaseStorage {



    constructor(){


        this.db =

            new CWPSDatabase();



        this.storeName =

            "purchases";


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
        purchase
    ){



        if(!purchase){


            throw new Error(

                "Purchase required"

            );


        }





        return await this.db.add(

            this.storeName,

            purchase

        );


    }






    /*
    ==============================================

    Update

    ==============================================
    */


    async update(
        purchase
    ){



        return await this.db.update(

            this.storeName,

            purchase

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

    Find By Quotation

    ==============================================
    */


    async findByQuotation(
        quotationId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.quotationId === quotationId



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

    Approve Purchase

    ==============================================
    */


    async approve(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Purchase not found"

            );


        }





        item.status =


            CWPSTypes.PurchaseStatus.APPROVED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Order Purchase

    ==============================================
    */


    async order(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Purchase not found"

            );


        }





        item.status =


            CWPSTypes.PurchaseStatus.ORDERED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Receive Purchase

    ==============================================
    */


    async receive(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Purchase not found"

            );


        }





        item.status =


            CWPSTypes.PurchaseStatus.RECEIVED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Close Purchase

    ==============================================
    */


    async close(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Purchase not found"

            );


        }





        item.status =


            CWPSTypes.PurchaseStatus.CLOSED;





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

    採購修改保留版本

    ==============================================
    */


    async createVersion(
        purchase
    ){



        const version = {



            ...purchase,



            version:



                (purchase.version || 0)

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

    不刪除資料

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


            CWPSTypes.PurchaseStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        await this.update(

            item

        );





        return true;


    }




}






global.PurchaseStorage =

    PurchaseStorage;



})(window);
