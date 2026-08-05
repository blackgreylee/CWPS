# /*

CWPS Enterprise

Backup Service

Sprint:

1.4

Build:

0001

Description:

Database backup and restore service

==================================================
*/

class BackupService {

```
constructor(){



    this.db =

        new CWPSDatabase();



    this.db.init();



    this.backupVersion =

        "1.0";



}









/*
----------------------------------------------

Create Backup Object


----------------------------------------------

*/


createBackup(){



    return {



        backupInfo:{



            system:

                "CWPS",



            version:

                this.backupVersion,



            createdDate:

                new Date()

                .toISOString()



        },



        database:

            this.db.load()



    };



}









/*
----------------------------------------------

Export JSON


----------------------------------------------

*/


exportJSON(){



    let backup =

        this.createBackup();





    return JSON.stringify(



        backup,



        null,



        4



    );



}









/*
----------------------------------------------

Download Backup File


----------------------------------------------

----------------------------------------------

*/


download(){



    let json =

        this.exportJSON();





    let blob =

        new Blob(



            [

                json

            ],



            {

                type:

                "application/json"

            }



        );





    let url =

        URL.createObjectURL(

            blob

        );





    let link =

        document.createElement(

            "a"

        );





    link.href =

        url;





    link.download =



        "CWPS_Backup_" +

        new Date()

        .toISOString()

        .slice(

            0,

            10

        )

        +

        ".json";





    link.click();





    URL.revokeObjectURL(

        url

    );



}









/*
----------------------------------------------

Validate Backup


----------------------------------------------

*/


validateBackup(

    backup

){



    if(

        !backup.database

    ){



        return false;



    }






    let required = [



        "projects",

        "bom",

        "versions"



    ];





    return required.every(



        key =>



        backup.database

        .hasOwnProperty(

            key

        )



    );



}









/*
----------------------------------------------

Restore Backup


----------------------------------------------

----------------------------------------------

*/


restoreJSON(

    json

){



    let backup;



    try{



        backup =

            JSON.parse(

                json

            );



    }

    catch(e){



        throw new Error(

            "Invalid Backup Format"

        );



    }





    if(

        !this.validateBackup(

            backup

        )

    ){



        throw new Error(

            "Backup Validation Failed"

        );



    }





    this.db.save(

        backup.database

    );





    return true;



}









/*
----------------------------------------------

Get Backup Information


----------------------------------------------

----------------------------------------------

*/


getInfo(

    json

){



    let backup =

        JSON.parse(

            json

        );





    return backup.backupInfo;



}
```

}

window.BackupService = BackupService;
