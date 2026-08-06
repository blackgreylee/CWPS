/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/version-storage.js


 Sprint:
 2.1.3


 Build:
 Enterprise Persistence Layer


 Description:
 Batch Version Repository Service


==================================================
*/


(function (global) {


    "use strict";



    class VersionStorage {



        constructor() {


            this.db =

                new CWPSDatabase();



            this.storeName =

                "versions";


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

        Create Version

        ==============================================
        */


        async create(version) {



            if (!version) {


                throw new Error(

                    "Version data required"

                );


            }




            const data =


                version.toJSON

                    ?

                    version.toJSON()

                    :

                    version;




            return await this.db.add(

                this.storeName,

                data

            );


        }






        /*
        ==============================================

        Get Version

        ==============================================
        */


        async get(versionId) {



            return await this.db.get(

                this.storeName,

                versionId

            );


        }






        /*
        ==============================================

        Get All Versions

        ==============================================
        */


        async getAll() {



            return await this.db.getAll(

                this.storeName

            );


        }






        /*
        ==============================================

        Get Versions By Batch

        ==============================================
        */


        async findByBatch(batchId) {



            const versions =


                await this.getAll();




            return versions.filter(

                version =>


                    version.batchId === batchId


            );


        }






        /*
        ==============================================

        Get Active Version

        ==============================================
        */


        async getActive(batchId) {



            const versions =


                await this.findByBatch(

                    batchId

                );




            return versions.find(

                version =>


                    version.status ===

                    CWPSTypes.VersionStatus.ACTIVE


            ) || null;


        }






        /*
        ==============================================

        Update Version

        ==============================================
        */


        async update(version) {



            if (!version) {


                throw new Error(

                    "Version data required"

                );


            }




            const data =


                version.toJSON

                    ?

                    version.toJSON()

                    :

                    version;




            return await this.db.update(

                this.storeName,

                data

            );


        }






        /*
        ==============================================

        Activate Version

        ==============================================
        */


        async activate(versionId) {



            const version =


                await this.get(

                    versionId

                );




            if (!version) {


                throw new Error(

                    "Version not found"

                );


            }





            version.status =


                CWPSTypes.VersionStatus.ACTIVE;



            version.updatedAt =


                new Date()

                .toISOString();





            return await this.update(

                version

            );


        }






        /*
        ==============================================

        Archive Version

        ==============================================
        */


        async archive(versionId) {



            const version =


                await this.get(

                    versionId

                );




            if (!version) {


                throw new Error(

                    "Version not found"

                );


            }




            version.status =


                CWPSTypes.VersionStatus.ARCHIVED;




            version.updatedAt =


                new Date()

                .toISOString();




            return await this.update(

                version

            );


        }






        /*
        ==============================================

        Void Version

        ==============================================
        */


        async void(versionId) {



            const version =


                await this.get(

                    versionId

                );




            if (!version) {


                throw new Error(

                    "Version not found"

                );


            }




            version.status =


                CWPSTypes.VersionStatus.VOID;




            version.updatedAt =


                new Date()

                .toISOString();




            return await this.update(

                version

            );


        }






        /*
        ==============================================

        Set Current Version

        ==============================================
        */


        async setCurrent(versionId) {



            const version =


                await this.get(

                    versionId

                );




            if (!version) {


                throw new Error(

                    "Version not found"

                );


            }





            version.isCurrent = true;



            version.updatedAt =


                new Date()

                .toISOString();





            return await this.update(

                version

            );


        }






        /*
        ==============================================

        Delete Version

        ==============================================
        
        注意:
        Enterprise 不允許真正刪除版本
        
        ==============================================
        */


        async remove(versionId) {


            throw new Error(

                "CWPS Version cannot be deleted. Use void() instead."

            );


        }



    }




    global.VersionStorage =

        VersionStorage;



})(window);
