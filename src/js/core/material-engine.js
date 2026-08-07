/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/material-engine.js


 Sprint:
 2.9.13


 Build:
 Enterprise Material Analysis Engine Layer


 Description:
 Material Business Logic Engine


==================================================
*/


(function(global){

"use strict";



class MaterialEngine {



    constructor(){


        this.materialStorage =

            new global.MaterialStorage();


        this.bomStorage =

            new global.BOMStorage();



    }





    /*
    ==============================================

    Get Material

    ==============================================
    */


    getMaterial(

        materialId

    ){


        return this.materialStorage.getById(

            materialId

        );


    }





    /*
    ==============================================

    Get BOM Materials

    ==============================================
    */


    getBOMMaterials(

        versionId

    ){



        const nodes =


            this.bomStorage.getLeafNodes(

                versionId

            );





        return nodes.filter(

            node =>

                node.materialId

        );


    }





    /*
    ==============================================

    Material Summary

    ==============================================
    */


    summarize(

        versionId

    ){



        const nodes =

            this.getBOMMaterials(

                versionId

            );





        const result = {};





        nodes.forEach(

            node => {



                const material =

                    this.getMaterial(

                        node.materialId

                    );





                if(!material){


                    return;


                }





                const key =

                    material.materialId;





                if(!result[key]){



                    result[key] = {


                        materialId:

                            material.materialId,


                        materialCode:

                            material.materialCode,


                        materialName:

                            material.materialName,


                        category:

                            material.category,


                        quantity:

                            0,


                        unitWeight:

                            material.unitWeight || 0,


                        weight:

                            0



                    };


                }





                result[key].quantity +=


                    Number(

                        node.quantity || 0

                    );





                result[key].weight =


                    result[key].quantity *

                    result[key].unitWeight;



            }

        );





        return Object.values(

            result

        );


    }





    /*
    ==============================================

    Group By Category

    ==============================================
    */


    groupByCategory(

        versionId

    ){



        const materials =

            this.summarize(

                versionId

            );





        const result = {};





        materials.forEach(

            item => {



                if(!result[item.category]){


                    result[item.category] = [];


                }





                result[item.category]

                .push(

                    item

                );


            }

        );





        return result;



    }





    /*
    ==============================================

    Total Weight

    ==============================================
    */


    totalWeight(

        versionId

    ){



        return this.summarize(

            versionId

        )

        .reduce(

            (sum,item)=>{


                return sum +

                Number(

                    item.weight || 0

                );


            },

            0

        );



    }





    /*
    ==============================================

    Missing Material Check

    ==============================================
    */


    validate(

        versionId

    ){



        const nodes =

            this.bomStorage.getLeafNodes(

                versionId

            );





        const errors = [];





        nodes.forEach(

            node => {



                if(

                    !node.materialId

                ){



                    errors.push({

                        nodeId:

                            node.nodeId,


                        message:

                            "Material missing"


                    });


                }



            }

        );





        return {


            valid:

                errors.length === 0,


            errors



        };



    }



}





global.MaterialEngine =

    MaterialEngine;



})(window);
