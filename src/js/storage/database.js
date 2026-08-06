/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/database.js


 Sprint:
 2.1.1


 Build:
 Enterprise Persistence Layer


 Description:
 IndexedDB Database Core


==================================================
*/


(function (global) {


    "use strict";



    class CWPSDatabase {



        constructor() {


            this.databaseName =

                "CWPS_DATABASE";



            this.version = 2;



            this.db = null;



            this.isReady = false;



            this.stores = {


                meta:
                    "cwps_meta",



                projects:
                    "projects",



                batches:
                    "batches",



                versions:
                    "versions",



                bom:
                    "bom",



                materials:
                    "materials",



                materialUsages:
                    "materialUsages",



                suppliers:
                    "suppliers",



                requirements:
                    "requirements",



                quotations:
                    "quotations",



                purchases:
                    "purchases",



                shipments:
                    "shipments",



                invoices:
                    "invoices"


            };


        }




        /*
        ==============================================
        
        Initialize Database
        
        ==============================================
        */


        async open() {


            if (this.isReady && this.db) {


                return this.db;


            }



            return new Promise(

                (resolve, reject) => {



                    const request =

                        indexedDB.open(

                            this.databaseName,

                            this.version

                        );





                    request.onupgradeneeded =

                        event => {



                            const db =

                                event.target.result;



                            this.upgradeDatabase(

                                db,

                                event.oldVersion,

                                event.newVersion

                            );



                        };





                    request.onsuccess =

                        event => {



                            this.db =

                                event.target.result;



                            this.isReady = true;



                            resolve(this.db);



                        };





                    request.onerror =

                        event => {



                            reject(

                                this.error(

                                    "Database open failed",

                                    event.target.error

                                )

                            );



                        };



                }


            );


        }






        /*
        ==============================================

        Database Upgrade

        ==============================================
        */


        upgradeDatabase(
            db,
            oldVersion,
            newVersion
        ) {



            Object.values(

                this.stores

            ).forEach(

                storeName => {



                    if (

                        !db.objectStoreNames.contains(

                            storeName

                        )

                    ) {



                        const store =

                            db.createObjectStore(

                                storeName,

                                {

                                    keyPath:"id"

                                }

                            );



                        store.createIndex(

                            "createdAt",

                            "createdAt",

                            {

                                unique:false

                            }

                        );



                    }



                }

            );



        }






        /*
        ==============================================

        Transaction Helper

        ==============================================
        */


        async transaction(
            storeNames,
            mode,
            callback
        ) {


            const db =

                await this.open();



            return new Promise(

                (resolve,reject)=> {



                    const tx =

                        db.transaction(

                            storeNames,

                            mode

                        );



                    const stores = {};



                    storeNames.forEach(

                        name => {



                            stores[name] =

                                tx.objectStore(name);



                        }

                    );



                    Promise.resolve(

                        callback(stores)

                    )

                    .then(

                        result => {



                            tx.oncomplete =

                                ()=>resolve(result);



                        }

                    )

                    .catch(

                        error => {



                            tx.abort();



                            reject(error);



                        }

                    );



                    tx.onerror =

                        event => {



                            reject(

                                event.target.error

                            );


                        };



                }

            );


        }






        /*
        ==============================================

        Add

        ==============================================
        */


        async add(
            storeName,
            data
        ) {


            return this.transaction(

                [storeName],

                "readwrite",

                stores => {



                    stores[storeName].add(data);



                    return data;



                }

            );


        }






        /*
        ==============================================

        Update

        ==============================================
        */


        async update(
            storeName,
            data
        ) {


            return this.transaction(

                [storeName],

                "readwrite",

                stores => {



                    stores[storeName].put(data);



                    return data;



                }

            );


        }






        /*
        ==============================================

        Get

        ==============================================
        */


        async get(
            storeName,
            id
        ) {


            const db =

                await this.open();



            return new Promise(

                (resolve,reject)=> {



                    const tx =

                        db.transaction(

                            storeName,

                            "readonly"

                        );



                    const request =

                        tx.objectStore(

                            storeName

                        )

                        .get(id);



                    request.onsuccess =

                        ()=> {



                            resolve(

                                request.result || null

                            );



                        };



                    request.onerror =

                        event => {



                            reject(

                                event.target.error

                            );



                        };



                }

            );


        }






        /*
        ==============================================

        Get All

        ==============================================
        */


        async getAll(
            storeName
        ) {


            const db =

                await this.open();



            return new Promise(

                (resolve,reject)=> {



                    const request =

                        db.transaction(

                            storeName,

                            "readonly"

                        )

                        .objectStore(

                            storeName

                        )

                        .getAll();




                    request.onsuccess =

                        ()=>resolve(

                            request.result

                        );



                    request.onerror =

                        event=>reject(

                            event.target.error

                        );



                }

            );


        }






        /*
        ==============================================

        Remove

        ==============================================
        */


        async remove(
            storeName,
            id
        ) {


            return this.transaction(

                [storeName],

                "readwrite",

                stores=> {



                    stores[storeName]

                    .delete(id);



                    return true;



                }

            );


        }






        /*
        ==============================================

        Clear

        ==============================================
        */


        async clear(
            storeName
        ) {


            return this.transaction(

                [storeName],

                "readwrite",

                stores=> {



                    stores[storeName]

                    .clear();



                    return true;



                }

            );


        }






        /*
        ==============================================

        Metadata

        ==============================================
        */


        async saveMeta(data) {


            return this.update(

                this.stores.meta,

                {


                    id:"database",


                    version:this.version,


                    updatedAt:

                        new Date()

                        .toISOString(),


                    ...data


                }

            );


        }






        async getMeta() {


            return this.get(

                this.stores.meta,

                "database"

            );


        }






        /*
        ==============================================

        Error Handler

        ==============================================
        */


        error(
            message,
            detail
        ) {


            return {


                message,


                detail,


                time:

                    new Date()

                    .toISOString()


            };


        }



    }




    global.CWPSDatabase =

        CWPSDatabase;



})(window);
