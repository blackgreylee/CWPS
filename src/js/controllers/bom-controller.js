/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/bom-controller.js


 Sprint:
 2.6.5


 Build:
 Enterprise BOM Controller Layer


 Description:
 BOM Management Controller


==================================================
*/


(function(global){


"use strict";



class BOMController {



    constructor(){


        this.engine =

            new BOMEngine();



        this.storage =

            new BOMStorage();



    }






    /*
    ==============================================

    Load BOM

    ==============================================
    */


    async load(
        projectId
    ){



        const bom =


            await this.storage.getByProject(

                projectId

            );





        if(!bom){


            return null;


        }





        return this.engine.buildTree(

            bom

        );


    }






    /*
    ==============================================

    Get BOM Version

    ==============================================
    */


    async getVersion(
        versionId
    ){



        const bom =


            await this.storage.getVersion(

                versionId

            );





        if(!bom){


            return null;


        }





        return this.engine.buildTree(

            bom

        );


    }






    /*
    ==============================================

    Import BOM

    ==============================================
    */


    async import(
        data
    ){



        const result =


            this.engine.validateImport(

                data

            );





        if(!result.valid){


            throw new Error(

                result.message

            );


        }





        return await this.storage.saveVersion(

            data

        );


    }






    /*
    ==============================================

    Validate BOM

    ==============================================
    */


    validate(
        bom
    ){



        return this.engine.validate(

            bom

        );


    }






    /*
    ==============================================

    Calculate Quantity

    ==============================================
    */


    calculateQuantity(
        bom
    ){



        return this.engine.calculateQuantity(

            bom

        );


    }






    /*
    ==============================================

    Find Node

    ==============================================
    */


    findNode(
        root,
        nodeId
    ){



        return this.engine.findNode(

            root,

            nodeId

        );


    }






    /*
    ==============================================

    Delete Version

    ==============================================
    */


    async voidVersion(
        versionId
    ){



        return await this.storage.voidVersion(

            versionId

        );


    }






    /*
    ==============================================

    Get History

    ==============================================
    */


    async history(
        projectId
    ){



        return await this.storage.getHistory(

            projectId

        );


    }



}






global.BOMController =

    BOMController;



})(window);
