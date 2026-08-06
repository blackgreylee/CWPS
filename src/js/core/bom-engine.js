/*
==================================================

 CWPS Enterprise

 File:
 src/js/core/bom-engine.js


 Sprint:
 2.2.1


 Build:
 Enterprise BOM Engine Layer


 Description:
 BOM Tree Processing Engine


==================================================
*/


(function(global){


"use strict";



class BOMEngine {



    constructor(){


        this.storage =

            new BOMStorage();



    }





    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.storage.init();


    }







    /*
    ==============================================

    Create BOM Node

    ==============================================
    */


    async createNode(node){


        if(!node){


            throw new Error(

                "BOM Node required"

            );


        }



        return await this.storage.create(

            node

        );


    }







    /*
    ==============================================

    Add Child Node

    ==============================================
    */


    async addChild(
        parentId,
        childNode
    ){



        const parent =

            await this.storage.get(

                parentId

            );




        if(!parent){


            throw new Error(

                "Parent BOM Node not found"

            );


        }





        childNode.parentId =

            parentId;




        return await this.storage.create(

            childNode

        );


    }







    /*
    ==============================================

    Get BOM Tree

    ==============================================
    */


    async getTree(versionId){


        return await this.storage.getTree(

            versionId

        );


    }







    /*
    ==============================================

    Flatten Tree

    樹狀轉列表

    ==============================================
    */


    flatten(nodes){



        let result=[];




        nodes.forEach(

            node=>{



                result.push(

                    node

                );




                if(

                    node.children &&

                    node.children.length

                ){



                    result =

                        result.concat(

                            this.flatten(

                                node.children

                            )

                        );


                }



            }

        );




        return result;


    }








    /*
    ==============================================

    Find Node

    ==============================================
    */


    async findNode(
        nodeId
    ){


        return await this.storage.get(

            nodeId

        );


    }







    /*
    ==============================================

    Find Nodes By Type

    ==============================================
    */


    async findByType(
        versionId,
        type
    ){



        const nodes =

            await this.storage.findByVersion(

                versionId

            );




        return nodes.filter(

            node =>


                node.type === type


        );


    }







    /*
    ==============================================

    Get Material Nodes

    ==============================================
    */


    async getMaterialNodes(
        versionId
    ){



        return await this.findByType(

            versionId,

            CWPSTypes.BOMNodeType.MATERIAL

        );


    }







    /*
    ==============================================

    Calculate Node Count

    基礎數量累加

    ==============================================
    */


    calculateNodeCount(node){



        let count =


            node.quantity || 1;




        if(

            node.children &&

            node.children.length

        ){



            node.children.forEach(

                child=>{


                    count *=

                        this.calculateNodeCount(

                            child

                        );


                }

            );


        }




        return count;


    }







    /*
    ==============================================

    Compare BOM Version

    ==============================================
    */


    async compareVersion(
        oldVersionId,
        newVersionId
    ){



        const oldNodes =

            await this.storage.findByVersion(

                oldVersionId

            );




        const newNodes =

            await this.storage.findByVersion(

                newVersionId

            );




        const result = {


            added:[],


            removed:[],


            modified:[]


        };




        const oldMap={};


        const newMap={};




        oldNodes.forEach(

            node=>{


                oldMap[node.code]=node;


            }

        );




        newNodes.forEach(

            node=>{


                newMap[node.code]=node;


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

                    JSON.stringify(

                        oldMap[code]

                    )

                    !==

                    JSON.stringify(

                        newMap[code]

                    )

                ){



                    result.modified.push(

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







    /*
    ==============================================

    Create Snapshot

    ==============================================
    */


    async snapshot(
        versionId
    ){


        return await this.storage.createSnapshot(

            versionId

        );


    }




}






global.BOMEngine =

    BOMEngine;



})(window);
