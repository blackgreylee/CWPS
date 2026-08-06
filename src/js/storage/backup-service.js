/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/backup-service.js


 Sprint:
 2.1.5


 Build:
 Enterprise Persistence Layer


 Description:
 Database Backup / Restore Service


==================================================
*/


(function(global){


"use strict";



class BackupService {



    constructor(){


        this.db =

            new CWPSDatabase();



    }





    /*
    ==============================================

    Initialize

    ==============================================
    */


    async init(){


        await this.db.open();


    }






    /*
    ==============================================

    Export Database

    ==============================================
    */


    async export(){



        const backup = {



            system:


            {


                name:
                    "CWPS Enterprise",


                version:
                    "2.1.5",


                createdAt:

                    new Date()

                    .toISOString()


            },



            data:{}



        };





        for(
            const storeName of

            Object.values(

                this.db.stores

            )

        ){



            backup.data[storeName] =


                await this.db.getAll(

                    storeName

                );


        }





        return backup;



    }






    /*
    ==============================================

    Download JSON Backup

    ==============================================
    */


    async download(){



        const backup =


            await this.export();




        const json =


            JSON.stringify(

                backup,

                null,

                4

            );




        const blob =


            new Blob(

                [json],

                {


                    type:

                    "application/json"


                }

            );





        const url =


            URL.createObjectURL(

                blob

            );





        const link =


            document.createElement(

                "a"

            );





        link.href = url;



        link.download =


            "CWPS_Backup_" +

            new Date()

            .toISOString()

            .slice(0,10)

            +

            ".json";





        link.click();




        URL.revokeObjectURL(

            url

        );



    }






    /*
    ==============================================

    Import Backup

    ==============================================
    */


    async import(data){



        if(
            !data ||
            !data.data
        ){



            throw new Error(

                "Invalid backup file"

            );


        }






        for(

            const storeName of

            Object.keys(

                data.data

            )

        ){



            const records =


                data.data[storeName];





            await this.db.clear(

                storeName

            );





            for(

                const record of records

            ){



                await this.db.add(

                    storeName,

                    record

                );


            }


        }





        return true;



    }






    /*
    ==============================================

    Restore From File

    ==============================================
    */


    async restoreFile(file){



        const text =


            await file.text();




        const json =


            JSON.parse(

                text

            );




        return await this.import(

            json

        );


    }






    /*
    ==============================================

    Create Backup Record

    ==============================================
    */


    async createBackupRecord(){



        const record = {



            id:

            crypto.randomUUID(),



            type:

            "DATABASE_BACKUP",



            createdAt:

                new Date()

                .toISOString()



        };




        return await this.db.add(

            "cwps_meta",

            record

        );



    }




}



global.BackupService =

    BackupService;



})(window);
