/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/bom-controller.js


 Sprint:
 2.9.27


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


        this.bomEngine =

            new global.BOMEngine();


        this.bomStorage =

            new global.BOMStorage();



    }





    /*
    ==============================================

    Load BOM Version

    ==============================================
    */


    loadVersion(

        versionId

    ){



        return {


            versionId,


            tree:

                this.bomEngine

                .getTree(

                    versionId

                )



        };


    }





    /*
    ==============================================

    Get BOM List

    ==============================================
    */


    getList(){



        return this.bomStorage

            .getAll();



    }





    /*
    ==============================================

    Import BOM

    ==============================================
    */


    import(

        data

    ){



        const result =

            this.bomEngine

            .validateImport(

                data

            );





        if(!result.valid){


            return {


                success:false,


                errors:

                    result.errors



            };


        }





        return {


            success:true,


            data:

                this.bomStorage

                .createVersion(

                    data

                )



        };



    }





    /*
    ==============================================

    Expand BOM

    ==============================================
    */


    expand(

        nodeId

    ){



        return this.bomEngine

            .expandNode(

                nodeId

            );



    }





    /*
    ==============================================

    Calculate Quantity

    ==============================================
    */


    calculateQuantity(

        versionId

    ){



        return this.bomEngine

            .calculateQuantity(

                versionId

            );



    }





    /*
    ==============================================

    BOM Summary

    ==============================================
    */


    summary(

        versionId

    ){



        const tree =

            this.loadVersion(

                versionId

            );





        return {


            versionId,


            nodeCount:

                this.countNodes(

                    tree.tree

                )



        };



    }





    /*
    ==============================================

    Count Nodes

    ==============================================
    */


    countNodes(

        node

    ){



        if(!node){


            return 0;


        }





        let count = 1;





        if(node.children){


            node.children

            .forEach(

                child=>{


                    count +=

                    this.countNodes(

                        child

                    );


                }

            );


        }





        return count;



    }



}





global.BOMController =

    BOMController;



})(window);
