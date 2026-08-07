/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/invoice-storage.js


 Sprint:
 2.9.11


 Build:
 Enterprise Invoice Storage Layer


 Description:
 Invoice Data Access Layer


==================================================
*/


(function(global){

"use strict";



class InvoiceStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "invoices"

            );


    }





    /*
    ==============================================

    Get All Invoices

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Invoice By ID

    ==============================================
    */


    getById(

        invoiceId

    ){


        return this.collection.getById(

            invoiceId

        );


    }





    /*
    ==============================================

    Get By Invoice No

    ==============================================
    */


    getByNo(

        invoiceNo

    ){



        const result =


            this.collection.where({

                invoiceNo

            });





        return result[0] || null;


    }





    /*
    ==============================================

    Get By Shipment

    ==============================================
    */


    getByShipment(

        shipmentId

    ){



        return this.collection.where({

            shipmentId

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

    Create Invoice

    ==============================================
    */


    create(

        invoice

    ){



        const exists =


            this.getByNo(

                invoice.invoiceNo

            );





        if(exists){


            throw new Error(

                "Invoice No already exists"

            );


        }





        const data = {


            ...invoice,


            status:

                invoice.status

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

    Update Invoice

    ==============================================
    */


    update(

        invoiceId,

        data

    ){



        return this.collection.update(

            invoiceId,

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

    Issue Invoice

    ==============================================
    */


    issue(

        invoiceId

    ){



        return this.update(

            invoiceId,

            {

                status:"Issued",

                issueDate:

                    new Date()

                    .toISOString()

            }

        );


    }





    /*
    ==============================================

    Pay Invoice

    ==============================================
    */


    paid(

        invoiceId

    ){



        return this.update(

            invoiceId,

            {

                status:"Paid",

                paidDate:

                    new Date()

                    .toISOString()

            }

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



        return this.update(

            invoiceId,

            {

                status:"Cancelled"

            }

        );


    }





    /*
    ==============================================

    Total Amount

    ==============================================
    */


    totalAmount(){



        return this.getAll()

        .reduce(

            (sum,item)=>{


                return sum +

                Number(

                    item.amount || 0

                );


            },

            0

        );


    }





    /*
    ==============================================

    Delete

    ==============================================
    */


    delete(

        invoiceId

    ){


        return this.collection.delete(

            invoiceId

        );


    }



}





global.InvoiceStorage =

    InvoiceStorage;



})(window);
