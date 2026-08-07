/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/cost-analysis.js


 Sprint:
 2.9.23


 Build:
 Enterprise Cost Analysis Engine Layer


 Description:
 Procurement Cost Analysis Engine


==================================================
*/


(function(global){

"use strict";



class CostAnalysis {



    constructor(){


        this.materialStorage =

            new global.MaterialStorage();


        this.priceHistory =

            new global.SupplierPriceHistory();



    }





    /*
    ==============================================

    Calculate Material Cost

    ==============================================
    */


    calculateMaterialCost(

        quantity,

        unitPrice

    ){



        return Number(quantity || 0)

        *

        Number(unitPrice || 0);



    }





    /*
    ==============================================

    Analyze Material Cost

    ==============================================
    */


    analyzeMaterial(

        materialId,

        quantity,

        unitPrice

    ){



        const material =

            this.materialStorage

            .getById(

                materialId

            );





        return {


            materialId,


            materialCode:

                material

                ?

                material.materialCode

                :

                "",


            quantity,


            unit:

                material

                ?

                material.unit

                :

                "",


            unitPrice,


            amount:

                this.calculateMaterialCost(

                    quantity,

                    unitPrice

                )



        };



    }





    /*
    ==============================================

    Calculate Total Cost

    ==============================================
    */


    totalCost(

        items

    ){



        return items.reduce(

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

    Compare Supplier Price

    ==============================================
    */


    compareSupplierPrice(

        materialId,

        suppliers

    ){



        return suppliers.map(

            supplier => {



                const latest =

                    this.priceHistory

                    .latestPrice(

                        supplier.supplierId,

                        materialId

                    );





                return {


                    supplierId:

                        supplier.supplierId,


                    supplierName:

                        supplier.name,


                    unitPrice:

                        latest

                        ?

                        latest.unitPrice

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

    Unit Weight Cost

    單重分析

    ==============================================
    */


    analyzeWeightCost(

        quantity,

        unitWeight,

        unitPrice

    ){



        const weight =


            Number(quantity || 0)

            *

            Number(unitWeight || 0);





        return {


            quantity,


            unitWeight,


            totalWeight:

                weight,


            cost:

                weight *

                Number(unitPrice || 0)



        };



    }





    /*
    ==============================================

    Cost Difference

    ==============================================
    */


    difference(

        oldCost,

        newCost

    ){



        return {


            difference:

                newCost -

                oldCost,


            percentage:


                oldCost

                ?

                (

                    (

                    newCost -

                    oldCost

                    )

                    /

                    oldCost

                )

                *

                100


                :

                0



        };



    }





    /*
    ==============================================

    Summary

    ==============================================
    */


    summary(

        items

    ){



        const total =

            this.totalCost(

                items

            );





        return {


            itemCount:

                items.length,


            totalCost:

                total



        };



    }



}





global.CostAnalysis =

    CostAnalysis;



})(window);
