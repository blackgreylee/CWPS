/*
==================================================

 CWPS Enterprise

 File:
 src/js/analysis/material-analysis.js


 Sprint:
 2.5.2


 Build:
 Enterprise Material Analysis Layer


 Description:
 Material Usage & Consumption Analysis Service


==================================================
*/


(function(global){


"use strict";



class MaterialAnalysis {



    constructor(){


        this.materialStorage =

            new MaterialStorage();



        this.bomStorage =

            new BOMStorage();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        if(this.materialStorage.init){


            await this.materialStorage.init();


        }



        if(this.bomStorage.init){


            await this.bomStorage.init();


        }


    }






    /*
    ==============================================

    Material Summary

    材料總表

    ==============================================
    */


    summarize(
        materials
    ){



        if(

            !Array.isArray(materials)

        ){


            return [];


        }





        const map = {};





        materials.forEach(

            item=>{


                const code =


                    item.materialCode ||

                    "UNKNOWN";





                if(!map[code]){


                    map[code] = {



                        materialCode:

                            code,



                        materialName:

                            item.materialName,



                        unit:

                            item.unit,



                        quantity:

                            0,



                        weight:

                            0,



                        area:

                            0



                    };


                }





                map[code].quantity +=


                    Number(

                        item.quantity || 0

                    );





                map[code].weight +=


                    Number(

                        item.weight || 0

                    );





                map[code].area +=


                    Number(

                        item.area || 0

                    );


            }

        );





        return Object.values(

            map

        );


    }






    /*
    ==============================================

    Group By Material Type

    材料分類統計

    ==============================================
    */


    groupByCategory(
        materials
    ){



        if(

            !Array.isArray(materials)

        ){


            return [];


        }





        const map = {};





        materials.forEach(

            item=>{


                const category =


                    item.category ||

                    "OTHER";





                if(!map[category]){


                    map[category] = {



                        category:

                            category,



                        count:

                            0,



                        quantity:

                            0



                    };


                }





                map[category].count++;





                map[category].quantity +=


                    Number(

                        item.quantity || 0

                    );


            }

        );





        return Object.values(

            map

        );


    }






    /*
    ==============================================

    Calculate Consumption

    用量計算

    ==============================================
    */


    calculateConsumption(
        required,
        purchased
    ){



        return {



            required:


                Number(

                    required || 0

                ),



            purchased:


                Number(

                    purchased || 0

                ),



            difference:


                Number(

                    purchased || 0

                )

                -

                Number(

                    required || 0

                )



        };


    }






    /*
    ==============================================

    Calculate Waste Rate

    損耗率

    ==============================================
    */


    calculateWasteRate(
        required,
        purchased
    ){



        if(

            Number(required) === 0

        ){


            return 0;


        }





        return Number(

            (

                (

                    purchased -

                    required

                )

                /

                required *

                100

            )

            .toFixed(2)

        );


    }






    /*
    ==============================================

    Material Cost Distribution

    材料成本分布

    ==============================================
    */


    costDistribution(
        materials
    ){



        const total =


            materials.reduce(

                (sum,item)=>{


                    return sum +

                    Number(

                        item.amount || 0

                    );


                },

                0

            );





        return materials.map(

            item=>{


                return {



                    ...item,



                    percentage:


                        total === 0

                        ?

                        0

                        :

                        Number(

                            (

                                item.amount /

                                total *

                                100

                            )

                            .toFixed(2)

                        )



                };


            }

        );


    }






    /*
    ==============================================

    Compare BOM And Purchase

    BOM 與採購比較

    ==============================================
    */


    compareRequirement(
        bomQuantity,
        purchaseQuantity
    ){



        const bom =


            Number(

                bomQuantity || 0

            );





        const purchase =


            Number(

                purchaseQuantity || 0

            );





        return {



            bomQuantity:

                bom,



            purchaseQuantity:

                purchase,



            variance:


                purchase -

                bom,



            percentage:


                bom === 0

                ?

                0

                :

                Number(

                    (

                        (

                            purchase -

                            bom

                        )

                        /

                        bom *

                        100

                    )

                    .toFixed(2)

                )



        };


    }






}






global.MaterialAnalysis =

    MaterialAnalysis;



})(window);
