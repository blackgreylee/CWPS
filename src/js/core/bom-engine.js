/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/bom-engine.js


 Sprint:
 2.9.12


 Build:
 Enterprise BOM Processing Engine Layer


 Description:
 BOM Business Logic Engine


==================================================
*/


(function(global){

"use strict";



class BOMEngine {



    constructor(){


        this.storage =

            new global.BOMStorage();


    }





    /*
    ==============================================

    Get BOM Tree

    ==============================================
    */


    getTree(

        versionId

    ){


        return this.storage.getTree(

            versionId

        );


    }





    /*
    ==============================================

    Get Nodes

    ==============================================
    */


    getNodes(

        versionId

    ){


        return this.storage.getByVersion(

            versionId

        );


    }





    /*
    ==============================================

    Find Node

    ==============================================
    */


    findNode(

        nodeId

    ){


        return this.storage.getById(

            nodeId

        );


    }





    /*
    ==============================================

    Get Children

    ==============================================
    */


    children(

        nodeId

    ){


        return this.storage.getChildren(

            nodeId

        );


    }





    /*
    ==============================================

    Expand Tree

    ==============================================
    */


    expand(

        nodeId

    ){



        const node =

            this.findNode(

                nodeId

            );





        if(!node){


            return null;


        }





        const children =

            this.children(

                nodeId

            );





        return {


            ...node,


            children:

                children.map(

                    child =>

                        this.expand(

                            child.nodeId

                        )

                )


        };


    }





    /*
    ==============================================

    Get Leaf Nodes

    ==============================================
    */


    getLeafNodes(

        versionId

    ){


        return this.storage.getLeafNodes(

            versionId

        );


    }





    /*
    ==============================================

    Validate BOM

    ==============================================
    */


    validate(

        versionId

    ){



        const nodes =

            this.getNodes(

                versionId

            );





        const errors = [];





        nodes.forEach(

            node => {



                if(!node.nodeCode){


                    errors.push({

                        nodeId:

                            node.nodeId,


                        message:

                            "NodeCode missing"


                    });


                }





                if(

                    node.parentNodeId

                    &&

                    !this.findNode(

                        node.parentNodeId

                    )

                ){



                    errors.push({

                        nodeId:

                            node.nodeId,


                        message:

                            "Parent node not found"


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

    Compare Versions

    ==============================================
    */


    compare(

        oldNodes,

        newNodes

    ){



        const result = {


            added:[],


            removed:[],


            changed:[]



        };





        const oldMap = {};

        const newMap = {};





        oldNodes.forEach(

            item =>

                oldMap[item.nodeCode] = item

        );





        newNodes.forEach(

            item =>

                newMap[item.nodeCode] = item

        );





        Object.keys(newMap)

        .forEach(

            code => {



                if(!oldMap[code]){


                    result.added.push(

                        newMap[code]

                    );


                }

                else if(

                    JSON.stringify(

                        oldMap[code]

                    )

                    !==

                    JSON.stringify(

                        newMap[code]

                    )

                ){


                    result.changed.push({

                        old:

                            oldMap[code],


                        new:

                            newMap[code]


                    });


                }



            }

        );





        Object.keys(oldMap)

        .forEach(

            code => {



                if(!newMap[code]){


                    result.removed.push(

                        oldMap[code]

                    );


                }


            }

        );





        return result;



    }





    /*
    ==============================================

    Count Structure

    ==============================================
    */


    statistics(

        versionId

    ){



        const nodes =

            this.getNodes(

                versionId

            );





        return {


            total:

                nodes.length,


            roots:

                this.storage

                .getRoots(

                    versionId

                )

                .length,


            leaves:

                this.getLeafNodes(

                    versionId

                )

                .length



        };


    }



}





global.BOMEngine =

    BOMEngine;



})(window);
