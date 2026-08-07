/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/requirement-engine.js


 Sprint:
 2.9.15


 Build:
 Enterprise Procurement Requirement Engine Layer


 Description:
 Generate Procurement Requirement From BOM


==================================================
*/


(function(global){

"use strict";



class RequirementEngine {



    constructor(){


        this.quantityEngine =

            new global.QuantityEngine();


        this.requirementStorage =

            new global.RequirementStorage();



    }





    /*
    ==============================================

    Generate Requirement

    ==============================================
    */


    generate(

        versionId,

        projectId

    ){



        const materials =

            this.quantityEngine

            .summarizeByMaterial(

                versionId

            );





        const requirements = [];





        materials.forEach(

            item => {



                requirements.push({


                    projectId,


                    versionId,


                    materialId:

                        item.materialId,


                    materialCode:

                        item.materialCode,


                    quantity:

                        item.quantity,


                    unit:

                        item.unit,


                    source:

                        "BOM",


                    status:

                        "Pending"



                });


            }

        );





        return requirements;



    }





    /*
    ==============================================

    Save Requirement

    ==============================================
    */


    createFromBOM(

        versionId,

        projectId

    ){



        const data =

            this.generate(

                versionId,

                projectId

            );





        return this.requirementStorage

            .createMany(

                data

            );


    }





    /*
    ==============================================

    Validate Requirement

    ==============================================
    */


    validate(

        requirements

    ){



        const errors = [];





        requirements.forEach(

            item => {



                if(!item.materialId){


                    errors.push({

                        message:

                        "Material missing",

                        item


                    });


                }





                if(

                    item.quantity <= 0

                ){


                    errors.push({

                        message:

                        "Quantity invalid",

                        item


                    });


                }





                if(!item.unit){


                    errors.push({

                        message:

                        "Unit missing",

                        item


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





    /*
    ==============================================

    Group Requirement

    ==============================================
    */


    groupByMaterial(

        requirements

    ){



        const result = {};





        requirements.forEach(

            item => {



                if(!result[item.materialId]){


                    result[item.materialId] = [];


                }





                result[item.materialId]

                .push(

                    item

                );



            }

        );





        return result;



    }





    /*
    ==============================================

    Close Requirement

    ==============================================
    */


    close(

        requirementId

    ){



        return this.requirementStorage

            .close(

                requirementId

            );


    }



}





global.RequirementEngine =

    RequirementEngine;



})(window);
