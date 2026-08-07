/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/purchase-storage.js


 Sprint:
 2.9.9


 Build:
 Enterprise Purchase Storage Layer


 Description:
 Purchase Order Data Access Layer


==================================================
*/


(function(global){

"use strict";



class PurchaseStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "purchases"

            );


    }





    /*
    ==============================================

    Get All Purchases

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Purchase By ID

    ==============================================
    */


    getById(

        purchaseId

    ){


        return this.collection.getById(

            purchaseId

        );


    }





    /*
    ==============================================

    Get By Purchase No

    ==============================================
    */


    getByNo(

        purchaseNo

    ){



        const result =

            this.collection.where({

                purchaseNo

            });





        return result[0] || null;


    }





    /*
    ==============================================

    Get By Quotation

    ==============================================
    */


    getByQuotation(

        quotationId

    ){



        return this.collection.where({

            quotationId

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

    Create Purchase

    ==============================================
    */


    create(

        purchase

    ){



        const exists =


            this.getByNo(

                purchase.purchaseNo

            );





        if(exists){


            throw new Error(

                "Purchase No already exists"

            );


        }





        const data = {


            ...purchase,


            status:

                purchase.status

                ||

                "Draft",


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

    Update Purchase

    ==============================================
    */


    update(

        purchaseId,

        data

    ){



        return this.collection.update(

            purchaseId,

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

    Confirm Purchase

    ==============================================
    */


    confirm(

        purchaseId

    ){



        return this.update(

            purchaseId,

            {

                status:"Confirmed"

            }

        );


    }





    /*
    ==============================================

    Complete Purchase

    ==============================================
    */


    complete(

        purchaseId

    ){



        return this.update(

            purchaseId,

            {

                status:"Completed"

            }

        );


    }





    /*
    ==============================================

    Cancel Purchase

    ==============================================
    */


    cancel(

        purchaseId

    ){



        return this.update(

            purchaseId,

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

        purchaseId

    ){


        return this.collection.delete(

            purchaseId

        );


    }



}





global.PurchaseStorage =

    PurchaseStorage;



})(window);
