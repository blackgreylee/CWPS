/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/material-engine.js


 Sprint:
 2.2.2


 Build:
 Enterprise Material Engine Layer


 Description:
 Material Classification & Aggregation Engine


==================================================
*/


(function(global){


"use strict";



class MaterialEngine {



    constructor(){


        this.bomEngine =

            new BOMEngine();


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.bomEngine.init();


    }






    /*
    ==============================================

    Extract Material Nodes

    從 BOM Tree 找材料

    ==============================================
    */


    async extractMaterials(
        versionId
    ){



        const nodes =


            await this.bomEngine.storage.findByVersion(

                versionId

            );





        return nodes.filter(

            node =>



                node.type ===

                CWPSTypes.BOMNodeType.MATERIAL

        );



    }






    /*
    ==============================================

    Group Materials

    材料分類合併

    ==============================================
    */


    groupMaterials(
        materials
    ){



        const result={};





        materials.forEach(

            material=>{



                const key =



                    material.materialCode ||

                    material.code;




                if(!result[key]){



                    result[key]={



                        code:key,



                        name:

                            material.name,



                        category:

                            material.category,



                        unit:

                            material.unit,



                        quantity:0,



                        items:[]



                    };


                }





                result[key].quantity +=



                    Number(

                        material.quantity || 0

                    );





                result[key].items.push(

                    material

                );



            }

        );





        return Object.values(

            result

        );


    }






    /*
    ==============================================

    Calculate Material Usage

    ==============================================
    */


    async calculateUsage(
        versionId
    ){



        const materials =


            await this.extractMaterials(

                versionId

            );





        return this.groupMaterials(

            materials

        );


    }






    /*
    ==============================================

    Find Material By Category

    ==============================================
    */


    filterByCategory(
        materials,
        category
    ){



        return materials.filter(

            material =>



                material.category === category


        );


    }






    /*
    ==============================================

    Calculate Weight

    單重分析基礎

    ==============================================
    */


    calculateWeight(
        material
    ){



        const quantity =


            Number(

                material.quantity || 0

            );



        const weight =


            Number(

                material.singleWeight || 0

            );




        return {


            quantity,


            singleWeight:weight,


            totalWeight:



                quantity *

                weight



        };


    }






    /*
    ==============================================

    Material Summary

    材料統計報表基礎

    ==============================================
    */


    async summary(
        versionId
    ){



        const materials =


            await this.calculateUsage(

                versionId

            );





        let totalWeight = 0;



        materials.forEach(

            material=>{


                totalWeight +=



                    this.calculateWeight(

                        material

                    )

                    .totalWeight;



            }

        );




        return {


            count:

                materials.length,



            materials,



            totalWeight



        };


    }






    /*
    ==============================================

    Compare Material Difference

    ==============================================
    */


    compare(
        oldMaterials,
        newMaterials
    ){



        const result={



            added:[],


            removed:[],


            changed:[]



        };




        const oldMap={};

        const newMap={};




        oldMaterials.forEach(

            item=>{


                oldMap[item.code]=item;


            }

        );




        newMaterials.forEach(

            item=>{


                newMap[item.code]=item;


            }

        );





        Object.keys(newMap)

        .forEach(

            code=>{



                if(!oldMap[code]){



                    result.added.push(

                        newMap[code]

                    );



                }

                else if(



                    oldMap[code].quantity !==

                    newMap[code].quantity



                ){



                    result.changed.push(



                        {


                            old:

                                oldMap[code],



                            new:

                                newMap[code]



                        }


                    );


                }



            }

        );





        Object.keys(oldMap)

        .forEach(

            code=>{



                if(!newMap[code]){



                    result.removed.push(

                        oldMap[code]

                    );


                }



            }

        );





        return result;


    }





}





global.MaterialEngine =

    MaterialEngine;



})(window);
