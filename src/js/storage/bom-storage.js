/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/bom-storage.js


 Sprint:
 2.9.5


 Build:
 Enterprise BOM Storage Layer


 Description:
 BOM Node Data Access Layer


==================================================
*/


(function(global){

"use strict";



class BOMStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "bomNodes"

            );


    }





    /*
    ==============================================

    Get All Nodes

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Node By ID

    ==============================================
    */


    getById(

        nodeId

    ){


        return this.collection.getById(

            nodeId

        );


    }





    /*
    ==============================================

    Get Nodes By Version

    ==============================================
    */


    getByVersion(

        versionId

    ){


        return this.collection.where({

            versionId

        });


    }





    /*
    ==============================================

    Get Children

    ==============================================
    */


    getChildren(

        parentNodeId

    ){


        return this.collection.where({

            parentNodeId

        });


    }





    /*
    ==============================================

    Get Root Nodes

    ==============================================
    */


    getRoots(

        versionId

    ){



        const nodes =

            this.getByVersion(

                versionId

            );



        return nodes.filter(

            node =>

                !node.parentNodeId

        );


    }





    /*
    ==============================================

    Get Leaf Nodes

    ==============================================
    */


    getLeafNodes(

        versionId

    ){


        const nodes =

            this.getByVersion(

                versionId

            );



        return nodes.filter(

            node => {


                const children =

                    this.getChildren(

                        node.nodeId

                    );



                return children.length === 0;


            }

        );


    }





    /*
    ==============================================

    Insert Node

    ==============================================
    */


    insert(

        node

    ){


        return this.collection.insert(

            node

        );


    }





    /*
    ==============================================

    Insert Multiple Nodes

    ==============================================
    */


    insertMany(

        nodes

    ){



        return nodes.map(

            node =>


                this.insert(

                    node

                )


        );


    }





    /*
    ==============================================

    Update Node

    ==============================================
    */


    update(

        nodeId,

        data

    ){


        return this.collection.update(

            nodeId,

            data

        );


    }





    /*
    ==============================================

    Delete Node

    ==============================================
    */


    delete(

        nodeId

    ){



        const children =

            this.getChildren(

                nodeId

            );



        if(children.length > 0){


            throw new Error(

                "Cannot delete node with children"

            );


        }





        return this.collection.delete(

            nodeId

        );


    }





    /*
    ==============================================

    Get Tree

    ==============================================
    */


    getTree(

        versionId

    ){



        const nodes =

            this.getByVersion(

                versionId

            );



        const map = {};





        nodes.forEach(

            node => {


                map[node.nodeId] = {


                    ...node,


                    children:[]

                };


            }

        );





        const roots = [];





        nodes.forEach(

            node => {


                if(node.parentNodeId){


                    if(map[node.parentNodeId]){


                        map[node.parentNodeId]

                        .children

                        .push(

                            map[node.nodeId]

                        );


                    }


                }

                else{


                    roots.push(

                        map[node.nodeId]

                    );


                }


            }

        );





        return roots;



    }





    /*
    ==============================================

    Count Nodes

    ==============================================
    */


    count(

        versionId

    ){


        return this.getByVersion(

            versionId

        )

        .length;


    }



}





global.BOMStorage =

    BOMStorage;



})(window);
