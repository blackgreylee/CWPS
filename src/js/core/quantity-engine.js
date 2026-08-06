/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/quantity-engine.js


 Sprint:
 2.2.3


 Build:
 Enterprise Quantity Engine Layer


 Description:
 BOM Quantity Calculation Engine


==================================================
*/


(function(global){


"use strict";



class QuantityEngine {



    constructor(){


        this.bomEngine =

            new BOMEngine();



        this.materialEngine =

            new MaterialEngine();



    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.bomEngine.init();


        await this.materialEngine.init();


    }






    /*
    ==============================================

    Calculate Node Quantity

    BOM 節點遞迴計算

    ==============================================
    */


    calculateNodeQuantity(
        node,
        parentQuantity = 1
    ){



        const ownQuantity =


            Number(

                node.quantity || 1

            );




        const total =


            parentQuantity *

            ownQuantity;





        return total;


    }






    /*
    ==============================================

    Expand BOM Quantity

    展開 BOM Tree

    ==============================================
    */


    expandTree(
        nodes,
        parentQuantity = 1
    ){



        let result=[];





        nodes.forEach(

            node=>{



                const quantity =


                    this.calculateNodeQuantity(

                        node,

                        parentQuantity

                    );





                const item={



                    id:

                        node.id,



                    code:

                        node.code,



                    name:

                        node.name,



                    type:

                        node.type,



                    quantity



                };





                result.push(

                    item

                );





                if(

                    node.children &&

                    node.children.length

                ){



                    result =

                        result.concat(



                            this.expandTree(

                                node.children,

                                quantity

                            )



                        );


                }




            }

        );





        return result;


    }







    /*
    ==============================================

    Calculate BOM Version Quantity

    ==============================================
    */


    async calculateVersion(
        versionId
    ){



        const tree =


            await this.bomEngine.getTree(

                versionId

            );





        return this.expandTree(

            tree

        );


    }






    /*
    ==============================================

    Calculate Material Quantity

    ==============================================
    */


    async calculateMaterialRequirement(
        versionId
    ){



        const items =


            await this.calculateVersion(

                versionId

            );





        const materials =

            items.filter(

                item =>



                    item.type ===

                    CWPSTypes.BOMNodeType.MATERIAL



            );





        const result={};





        materials.forEach(

            material=>{



                const key =


                    material.code;





                if(!result[key]){



                    result[key]={



                        code:key,



                        name:

                            material.name,



                        quantity:0



                    };



                }





                result[key].quantity +=



                    material.quantity;



            }

        );





        return Object.values(

            result

        );


    }








    /*
    ==============================================

    Unit Conversion

    單位換算基礎

    ==============================================
    */


    convert(
        value,
        from,
        to
    ){



        if(from === to){


            return value;


        }





        const table={


            M_TO_MM:

                1000,


            MM_TO_M:

                0.001



        };





        const key =



            from +

            "_TO_" +

            to;





        if(table[key]){



            return value *

                table[key];


        }





        throw new Error(

            "Unsupported unit conversion: "

            +

            from

            +

            " to "

            +

            to

        );


    }








    /*
    ==============================================

    Calculate Area

    面積計算

    ==============================================
    */


    calculateArea(
        width,
        height,
        quantity = 1
    ){



        return {


            width,


            height,



            quantity,



            area:



                width *

                height *

                quantity



        };


    }








    /*
    ==============================================

    Calculate Total Weight

    ==============================================
    */


    calculateWeight(
        quantity,
        singleWeight
    ){



        return {


            quantity,



            singleWeight,



            totalWeight:



                quantity *

                singleWeight



        };


    }








    /*
    ==============================================

    Summary

    ==============================================
    */


    async summary(
        versionId
    ){



        const requirements =


            await this.calculateMaterialRequirement(

                versionId

            );





        return {


            materialCount:

                requirements.length,



            materials:

                requirements



        };


    }



}






global.QuantityEngine =

    QuantityEngine;



})(window);
