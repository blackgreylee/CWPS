/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/invoice-storage.js


 Sprint:
 2.1.10


 Build:
 Enterprise Procurement Storage


 Description:
 Invoice Repository Service


==================================================
*/


(function(global){


"use strict";



class InvoiceStorage {



    constructor(){


        this.db =

            new CWPSDatabase();



        this.storeName =

            "invoices";


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
        invoice
    ){



        if(!invoice){


            throw new Error(

                "Invoice required"

            );


        }





        return await this.db.add(

            this.storeName,

            invoice

        );


    }






    /*
    ==============================================

    Update

    ==============================================
    */


    async update(
        invoice
    ){



        return await this.db.update(

            this.storeName,

            invoice

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

    Submit Invoice

    提交請款

    ==============================================
    */


    async submit(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Invoice not found"

            );


        }





        item.status =


            CWPSTypes.InvoiceStatus.SUBMITTED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.update(

            item

        );


    }






    /*
    ==============================================

    Approve Invoice

    核准請款

    ==============================================
    */


    async approve(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Invoice not found"

            );


        }





        item.status =


            CWPSTypes.InvoiceStatus.APPROVED;





        item.approvedDate =


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

    Pay Invoice

    付款完成

    ==============================================
    */


    async pay(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Invoice not found"

            );


        }





        item.status =


            CWPSTypes.InvoiceStatus.PAID;





        item.paidDate =


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

    Close Invoice

    ==============================================
    */


    async close(
        id
    ){



        const item =


            await this.get(id);





        if(!item){


            throw new Error(

                "Invoice not found"

            );


        }





        item.status =


            CWPSTypes.InvoiceStatus.CLOSED;





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
        invoice
    ){



        const version = {



            ...invoice,



            version:



                (invoice.version || 0)

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


            CWPSTypes.InvoiceStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        await this.update(

            item

        );





        return true;


    }




}






global.InvoiceStorage =

    InvoiceStorage;



})(window);
