/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/material-analysis.js


 Sprint:
 2.9.24


 Build:
 Enterprise Material Analysis Engine Layer


 Description:
 Material Consumption Analysis Engine


==================================================
*/


(function(global){

"use strict";



class MaterialAnalysis {



    constructor(){


        this.materialStorage =

            new global.MaterialStorage();


        this.quantityEngine =

            new global.QuantityEngine();



    }





    /*
    ==============================================

    Get Material Info

    ==============================================
    */


    getMaterial(

        materialId

    ){



        return this.materialStorage

            .getById(

                materialId

            );


    }





    /*
    ==============================================

    Analyze Material Usage

    ==============================================
    */


    analyzeUsage(

        versionId

    ){



        const items =

            this.quantityEngine

            .summarizeByMaterial(

                versionId

            );





        return items.map(

            item => {


                const material =

                    this.getMaterial(

                        item.materialId

                    );





                return {


                    materialId:

                        item.materialId,


                    materialCode:

                        item.materialCode,


                    category:

                        material

                        ?

                        material.category

                        :

                        "",


                    quantity:

                        item.quantity,


                    unit:

                        item.unit



                };


            }

        );



    }





    /*
    ==============================================

    Group By Material Category

    ==============================================
    */


    groupByCategory(

        materials

    ){



        const result = {};





        materials.forEach(

            item=>{


                const category =

                    item.category

                    ||

                    "Unknown";





                if(!result[category]){


                    result[category] = [];


                }





                result[category]

                .push(

                    item

                );



            }

        );





        return result;



    }





    /*
    ==============================================

    Calculate Total Quantity

    ==============================================
    */


    totalQuantity(

        items

    ){



        return items.reduce(

            (sum,item)=>{


                return sum +

                Number(

                    item.quantity || 0

                );


            },

            0

        );



    }





    /*
    ==============================================

    Weight Analysis

    單重分析

    ==============================================
    */


    analyzeWeight(

        items

    ){



        return items.map(

            item=>{


                const material =

                    this.getMaterial(

                        item.materialId

                    );





                const unitWeight =

                    material

                    ?

                    Number(

                        material.unitWeight || 0

                    )

                    :

                    0;





                return {


                    materialId:

                        item.materialId,


                    materialCode:

                        item.materialCode,


                    quantity:

                        item.quantity,


                    unitWeight,


                    totalWeight:


                        Number(

                            item.quantity

                        )

                        *

                        unitWeight



                };


            }

        );



    }





    /*
    ==============================================

    Heavy Material Ranking

    ==============================================
    */


    weightRanking(

        items

    ){



        return this.analyzeWeight(

            items

        )

        .sort(

            (a,b)=>{


                return b.totalWeight -

                    a.totalWeight;


            }

        );



    }





    /*
    ==============================================

    Quantity Ranking

    ==============================================
    */


    quantityRanking(

        items

    ){



        return items.sort(

            (a,b)=>{


                return b.quantity -

                    a.quantity;


            }

        );



    }





    /*
    ==============================================

    Material Summary

    ==============================================
    */


    summary(

        versionId

    ){



        const usage =

            this.analyzeUsage(

                versionId

            );





        return {


            materialCount:

                usage.length,


            categories:

                Object.keys(

                    this.groupByCategory(

                        usage

                    )

                ),


            totalQuantity:

                this.totalQuantity(

                    usage

                )



        };



    }



}





global.MaterialAnalysis =

    MaterialAnalysis;



})(window);
