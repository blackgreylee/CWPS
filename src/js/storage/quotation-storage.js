/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/quotation-storage.js


 Sprint:
 2.9.8


 Build:
 Enterprise Quotation Storage Layer


 Description:
 Supplier Quotation Data Access Layer


==================================================
*/


(function(global){

"use strict";



class QuotationStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "quotations"

            );


    }





    /*
    ==============================================

    Get All Quotations

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get By ID

    ==============================================
    */


    getById(

        quotationId

    ){


        return this.collection.getById(

            quotationId

        );


    }





    /*
    ==============================================

    Get By Requirement

    ==============================================
    */


    getByRequirement(

        requirementId

    ){


        return this.collection.where({

            requirementId

        });


    }





    /*
    ==============================================

    Get By Supplier

    ==============================================
    */


    getBySupplier(

        supplierId

    ){


        return this.collection.where({

            supplierId

        });


    }





    /*
    ==============================================

    Create Quotation

    ==============================================
    */


    create(

        quotation

    ){


        const data = {


            ...quotation,


            status:

                quotation.status

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

    Create Multiple

    ==============================================
    */


    createMany(

        quotations

    ){


        return quotations.map(

            item =>

                this.create(

                    item

                )

        );


    }





    /*
    ==============================================

    Update

    ==============================================
    */


    update(

        quotationId,

        data

    ){



        return this.collection.update(

            quotationId,

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

    Approve Quotation

    ==============================================
    */


    approve(

        quotationId

    ){



        return this.update(

            quotationId,

            {

                status:"Approved"

            }

        );


    }





    /*
    ==============================================

    Reject Quotation

    ==============================================
    */


    reject(

        quotationId

    ){



        return this.update(

            quotationId,

            {

                status:"Rejected"

            }

        );


    }





    /*
    ==============================================

    Get Approved

    ==============================================
    */


    getApproved(

        requirementId

    ){



        return this.collection.where({

            requirementId,

            status:"Approved"

        });


    }





    /*
    ==============================================

    Delete

    ==============================================
    */


    delete(

        quotationId

    ){


        return this.collection.delete(

            quotationId

        );


    }



}





global.QuotationStorage =

    QuotationStorage;



})(window);
