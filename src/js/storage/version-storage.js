/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/version-storage.js


 Sprint:
 2.9.4


 Build:
 Enterprise BOM Version Storage Layer


 Description:
 BOM Version Data Access Layer


==================================================
*/


(function(global){

"use strict";



class VersionStorage {



    constructor(){


        this.database =

            global.cwpsDatabase;


        this.collection =

            this.database.collection(

                "bomVersions"

            );


    }





    /*
    ==============================================

    Get All Versions

    ==============================================
    */


    getAll(){


        return this.collection.getAll();


    }





    /*
    ==============================================

    Get Version By ID

    ==============================================
    */


    getById(

        versionId

    ){


        return this.collection.getById(

            versionId

        );


    }





    /*
    ==============================================

    Get Versions By Batch

    ==============================================
    */


    getByBatch(

        batchId

    ){


        return this.collection.where({

            batchId

        });


    }





    /*
    ==============================================

    Get Current Version

    ==============================================
    */


    getCurrent(

        batchId

    ){


        const versions =

            this.getByBatch(

                batchId

            );



        return versions.find(


            version =>


                version.status === "Active"


        )

        || null;



    }





    /*
    ==============================================

    Create New Version

    ==============================================
    */


    create(

        data

    ){



        const versions =

            this.getByBatch(

                data.batchId

            );



        const maxVersion =

            versions.reduce(

                (max,item)=>{


                    return Math.max(

                        max,

                        item.versionNo || 0

                    );


                },

                0

            );





        const version = {


            ...data,


            versionNo:

                maxVersion + 1,


            status:

                "Draft",


            importTime:

                new Date()

                .toISOString()



        };





        return this.collection.insert(

            version

        );



    }





    /*
    ==============================================

    Activate Version

    ==============================================
    */


    activate(

        versionId

    ){



        const version =

            this.getById(

                versionId

            );



        if(!version){


            return null;


        }





        const versions =

            this.getByBatch(

                version.batchId

            );





        versions.forEach(

            item => {


                if(item.status === "Active"){


                    this.collection.update(

                        item.versionId,

                        {

                            status:"Archived"

                        }

                    );


                }


            }

        );





        return this.collection.update(

            versionId,

            {

                status:"Active"

            }

        );



    }





    /*
    ==============================================

    Void Version

    ==============================================
    */


    void(

        versionId

    ){



        return this.collection.update(

            versionId,

            {

                status:"Void"

            }

        );


    }





    /*
    ==============================================

    History

    ==============================================
    */


    history(

        batchId

    ){


        return this.getByBatch(

            batchId

        )

        .sort(

            (a,b)=>

                b.versionNo -

                a.versionNo

        );


    }





    /*
    ==============================================

    Exists

    ==============================================
    */


    exists(

        versionId

    ){


        return !!this.getById(

            versionId

        );


    }



}





global.VersionStorage =

    VersionStorage;



})(window);
