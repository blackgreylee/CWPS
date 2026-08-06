/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/bom-storage.js


 Sprint:
 2.1.4


 Build:
 Enterprise Persistence Layer


 Description:
 BOM Repository Service


==================================================
*/


(function (global) {


    "use strict";



    class BOMStorage {



        constructor() {


            this.db =

                new CWPSDatabase();



            this.storeName =

                "bom";


        }





        /*
        ==============================================

        Initialize

        ==============================================
        */


        async init() {


            await this.db.open();


        }






        /*
        ==============================================

        Create BOM Node

        ==============================================
        */


        async create(node) {



            if (!node) {


                throw new Error(

                    "BOM Node required"

                );


            }





            const data =


                node.toJSON

                    ?

                    node.toJSON()

                    :

                    node;




            return await this.db.add(

                this.storeName,

                data

            );


        }






        /*
        ==============================================

        Update BOM Node

        ==============================================
        */


        async update(node) {



            if (!node) {


                throw new Error(

                    "BOM Node required"

                );


            }




            const data =


                node.toJSON

                    ?

                    node.toJSON()

                    :

                    node;




            return await this.db.update(

                this.storeName,

                data

            );


        }






        /*
        ==============================================

        Get Node

        ==============================================
        */


        async get(nodeId) {


            return await this.db.get(

                this.storeName,

                nodeId

            );


        }






        /*
        ==============================================

        Get All Nodes

        ==============================================
        */


        async getAll() {


            return await this.db.getAll(

                this.storeName

            );


        }






        /*
        ==============================================

        Find BOM By Version

        ==============================================
        */


        async findByVersion(versionId) {



            const nodes =


                await this.getAll();




            return nodes.filter(

                node =>


                    node.versionId === versionId


            );


        }






        /*
        ==============================================

        Find Root Nodes

        ==============================================
        */


        async findRoots(versionId) {



            const nodes =


                await this.findByVersion(

                    versionId

                );




            return nodes.filter(

                node =>


                    !node.parentId


            );


        }






        /*
        ==============================================

        Find Children

        ==============================================
        */


        async findChildren(nodeId) {



            const nodes =


                await this.getAll();




            return nodes.filter(

                node =>


                    node.parentId === nodeId


            );


        }






        /*
        ==============================================

        Build BOM Tree

        ==============================================
        */


        async getTree(versionId) {



            const nodes =


                await this.findByVersion(

                    versionId

                );




            const map = {};




            nodes.forEach(

                node => {



                    map[node.id] = {


                        ...node,


                        children:[]


                    };


                }

            );





            const roots = [];





            nodes.forEach(

                node => {



                    if (node.parentId) {



                        const parent =

                            map[node.parentId];



                        if(parent){



                            parent.children.push(

                                map[node.id]

                            );



                        }



                    }

                    else {



                        roots.push(

                            map[node.id]

                        );


                    }



                }

            );




            return roots;


        }






        /*
        ==============================================

        Add Material Usage

        ==============================================
        */


        async attachMaterial(
            nodeId,
            materialUsage
        ) {



            const node =


                await this.get(

                    nodeId

                );




            if(!node){


                throw new Error(

                    "BOM Node not found"

                );


            }




            if(!node.materialUsages){


                node.materialUsages = [];


            }





            node.materialUsages.push(

                materialUsage

            );




            return await this.update(

                node

            );


        }






        /*
        ==============================================

        Snapshot

        ==============================================
        */


        async createSnapshot(
            versionId
        ) {



            const tree =


                await this.getTree(

                    versionId

                );




            return {


                versionId,


                snapshot:


                    JSON.parse(

                        JSON.stringify(tree)

                    ),



                createdAt:

                    new Date()

                    .toISOString()



            };


        }






        /*
        ==============================================

        Remove

        ==============================================
        */


        async remove(nodeId) {


            return await this.db.remove(

                this.storeName,

                nodeId

            );


        }




    }




    global.BOMStorage =

        BOMStorage;



})(window);
