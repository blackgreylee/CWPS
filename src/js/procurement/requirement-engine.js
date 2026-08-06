/*
==================================================

 CWPS Enterprise

 File:
 src/js/procurement/requirement-engine.js


 Sprint:
 2.3.1


 Build:
 Enterprise Procurement Requirement Engine


 Description:
 Material Requirement Generation Engine


==================================================
*/


(function(global){


"use strict";



class RequirementEngine {



    constructor(){


        this.quantityEngine =

            new QuantityEngine();



        this.storage =

            new RequirementStorage();



    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.quantityEngine.init();



        if(this.storage.init){


            await this.storage.init();


        }


    }






    /*
    ==============================================

    Create Requirement

    ==============================================
    */


    async create(data){



        if(!data){


            throw new Error(

                "Requirement data required"

            );


        }





        data.status =


            data.status ||

            CWPSTypes.RequirementStatus.DRAFT;





        data.createdAt =


            new Date()

            .toISOString();





        return await this.storage.create(

            data

        );


    }






    /*
    ==============================================

    Generate From BOM Version

    BOM → Requirement

    ==============================================
    */


    async generateFromBOM(
        versionId
    ){



        const materials =


            await this.quantityEngine.calculateMaterialRequirement(

                versionId

            );





        const requirements = [];





        materials.forEach(

            material=>{



                requirements.push(



                    {


                        versionId,



                        materialCode:

                            material.code,



                        materialName:

                            material.name,



                        quantity:

                            material.quantity,



                        unit:

                            material.unit ||



                            CWPSTypes.UnitType.PCS,



                        status:


                            CWPSTypes.RequirementStatus.DRAFT,



                        createdAt:



                            new Date()

                            .toISOString()



                    }



                );


            }

        );





        return requirements;



    }






    /*
    ==============================================

    Save Generated Requirements

    ==============================================
    */


    async saveGenerated(
        requirements
    ){



        const result=[];




        for(

            const item of requirements

        ){



            result.push(


                await this.create(

                    item

                )


            );


        }




        return result;


    }







    /*
    ==============================================

    Get Requirement List

    ==============================================
    */


    async getAll(){



        return await this.storage.getAll();



    }







    /*
    ==============================================

    Find By Project

    ==============================================
    */


    async findByProject(
        projectId
    ){



        const list =


            await this.getAll();





        return list.filter(

            item =>


                item.projectId === projectId



        );


    }







    /*
    ==============================================

    Confirm Requirement

    ==============================================
    */


    async confirm(
        requirementId
    ){



        const item =


            await this.storage.get(

                requirementId

            );





        if(!item){


            throw new Error(

                "Requirement not found"

            );


        }





        item.status =


            CWPSTypes.RequirementStatus.CONFIRMED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            item

        );


    }






    /*
    ==============================================

    Cancel Requirement

    ==============================================
    */


    async cancel(
        requirementId
    ){



        const item =


            await this.storage.get(

                requirementId

            );





        if(!item){


            throw new Error(

                "Requirement not found"

            );


        }





        item.status =


            CWPSTypes.RequirementStatus.CLOSED;





        item.updatedAt =


            new Date()

            .toISOString();





        return await this.storage.update(

            item

        );


    }





}





global.RequirementEngine =

    RequirementEngine;



})(window);
