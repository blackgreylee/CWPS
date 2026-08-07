/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/supplier-controller.js


 Sprint:
 2.9.30


 Build:
 Enterprise Supplier Controller Layer


 Description:
 Supplier Management Controller


==================================================
*/


(function(global){

"use strict";



class SupplierController {



    constructor(){


        this.supplierEngine =

            new global.SupplierEngine();


        this.rating =

            new global.SupplierRating();


        this.priceHistory =

            new global.SupplierPriceHistory();


        this.supplierAnalysis =

            new global.SupplierAnalysis();



    }





    /*
    ==============================================

    Supplier List

    ==============================================
    */


    getSuppliers(){



        return this.supplierEngine

            .getAll();



    }





    /*
    ==============================================

    Supplier Detail

    ==============================================
    */


    getSupplier(

        supplierId

    ){



        return this.supplierEngine

            .getById(

                supplierId

            );


    }





    /*
    ==============================================

    Search Supplier

    ==============================================
    */


    search(

        keyword

    ){



        return this.supplierEngine

            .search(

                keyword

            );


    }





    /*
    ==============================================

    Create Supplier

    ==============================================
    */


    create(

        data

    ){



        const validation =

            this.supplierEngine

            .validate(

                data

            );





        if(!validation.valid){


            return {


                success:false,


                errors:

                    validation.errors



            };


        }





        return {


            success:true,


            data:

                this.supplierEngine

                .create(

                    data

                )



        };



    }





    /*
    ==============================================

    Update Supplier

    ==============================================
    */


    update(

        supplierId,

        data

    ){



        return this.supplierEngine

            .update(

                supplierId,

                data

            );


    }





    /*
    ==============================================

    Rating

    ==============================================
    */


    addRating(

        data

    ){



        return this.rating

            .create(

                data

            );


    }





    getRating(

        supplierId

    ){



        return this.rating

            .getBySupplier(

                supplierId

            );


    }





    /*
    ==============================================

    Price History

    ==============================================
    */


    addPriceRecord(

        data

    ){



        return this.priceHistory

            .create(

                data

            );


    }





    getPriceHistory(

        supplierId,

        materialId

    ){



        return this.priceHistory

            .getHistory(

                supplierId,

                materialId

            );


    }





    /*
    ==============================================

    Supplier Ranking

    ==============================================
    */


    ranking(){



        return this.supplierAnalysis

            .ranking();



    }





    /*
    ==============================================

    Best Supplier

    ==============================================
    */


    bestSupplier(){



        return this.supplierAnalysis

            .bestSupplier();



    }





    /*
    ==============================================

    Dashboard Summary

    ==============================================
    */


    summary(){



        return this.supplierAnalysis

            .summary();



    }



}





global.SupplierController =

    SupplierController;



})(window);
