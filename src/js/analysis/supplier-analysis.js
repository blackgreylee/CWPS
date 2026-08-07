/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/supplier-analysis.js


 Sprint:
 2.9.26


 Build:
 Enterprise Supplier Analysis Engine Layer


 Description:
 Supplier Performance Analysis Engine


==================================================
*/


(function(global){

"use strict";



class SupplierAnalysis {



    constructor(){


        this.supplierEngine =

            new global.SupplierEngine();


        this.rating =

            new global.SupplierRating();


        this.priceHistory =

            new global.SupplierPriceHistory();


        this.quotationStorage =

            new global.QuotationStorage();



    }





    /*
    ==============================================

    Supplier Overview

    ==============================================
    */


    overview(){



        const suppliers =

            this.supplierEngine

            .getAll();





        return {


            total:

                suppliers.length,


            active:

                suppliers.filter(

                    item=>

                    item.status==="Active"

                )

                .length



        };


    }





    /*
    ==============================================

    Supplier Rating Analysis

    ==============================================
    */


    ratingAnalysis(){



        const suppliers =

            this.supplierEngine

            .getAll();





        return suppliers.map(

            supplier=>{


                return {


                    supplierId:

                        supplier.id,


                    supplierName:

                        supplier.name,


                    score:

                        this.rating

                        .average(

                            supplier.id

                        ),


                    grade:

                        this.rating

                        .latest(

                            supplier.id

                        )

                        ?

                        this.rating

                        .latest(

                            supplier.id

                        )

                        .grade

                        :

                        "N/A"



                };


            }

        )

        .sort(

            (a,b)=>{


                return b.score -

                    a.score;


            }

        );



    }





    /*
    ==============================================

    Price Competitiveness

    ==============================================
    */


    priceAnalysis(

        materialId

    ){



        const suppliers =

            this.supplierEngine

            .getActive();





        return suppliers.map(

            supplier=>{


                const price =

                    this.priceHistory

                    .latestPrice(

                        supplier.id,

                        materialId

                    );





                return {


                    supplierId:

                        supplier.id,


                    supplierName:

                        supplier.name,


                    unitPrice:

                        price

                        ?

                        price.unitPrice

                        :

                        0



                };


            }

        )

        .sort(

            (a,b)=>{


                return a.unitPrice -

                    b.unitPrice;


            }

        );



    }





    /*
    ==============================================

    Quotation Analysis

    ==============================================
    */


    quotationAnalysis(){



        const quotations =

            this.quotationStorage

            .getAll();





        const result = {};





        quotations.forEach(

            item=>{


                if(!result[item.supplierId]){


                    result[item.supplierId] = {


                        count:0,


                        totalAmount:0



                    };


                }





                result[item.supplierId]

                .count++;





                result[item.supplierId]

                .totalAmount +=

                    Number(

                        item.amount || 0

                    );



            }

        );





        return result;



    }





    /*
    ==============================================

    Supplier Ranking

    ==============================================
    */


    ranking(){



        return this.ratingAnalysis();



    }





    /*
    ==============================================

    Best Supplier

    ==============================================
    */


    bestSupplier(){



        const list =

            this.ranking();





        return list.length

            ?

            list[0]

            :

            null;


    }





    /*
    ==============================================

    Dashboard Summary

    ==============================================
    */


    summary(){



        return {


            supplier:

                this.overview(),


            ranking:

                this.ranking(),


            best:

                this.bestSupplier()



        };


    }



}





global.SupplierAnalysis =

    SupplierAnalysis;



})(window);
