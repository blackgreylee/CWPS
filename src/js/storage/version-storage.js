# /*

CWPS Enterprise

Version Storage Service

Sprint:

1.4

Build:

0001

Description:

BOM version persistence management

==================================================
*/

class VersionStorage {

```
constructor(){



    this.db =

        new CWPSDatabase();



    this.collection =

        "versions";



    this.db.init();



}









/*
----------------------------------------------

Create New Version


----------------------------------------------

*/


create(data){



    let versions =

        this.getByBatch(

            data.batchId

        );





    let nextVersion =

        this.getNextVersion(

            versions

        );





    let record = {



        id:

            this.generateId(),



        projectId:

            data.projectId || "",



        batchId:

            data.batchId || "",



        version:

            nextVersion,



        sourceFile:

            data.sourceFile || "",



        status:

            "Active",



        importDate:

            new Date()

            .toISOString(),



        note:

            data.note || ""



    };





    this.archiveActiveVersion(

        data.batchId

    );





    return this.db.insert(



        this.collection,

        record



    );



}









/*
----------------------------------------------

Generate Version ID


----------------------------------------------

*/


generateId(){



    return (

        "VER-" +

        Date.now()

    );



}









/*
----------------------------------------------

Calculate Next Version


V001

V002

----------------------------------------------

*/


getNextVersion(

    versions

){



    if(

        versions.length === 0

    ){



        return "V001";



    }





    let max = 0;





    versions.forEach(v=>{



        let num =



            parseInt(

                v.version.replace(

                    "V",

                    ""

                )

            );





        if(

            num > max

        ){



            max=num;



        }



    });





    return (

        "V" +

        String(

            max+1

        )

        .padStart(

            3,

            "0"

        )

    );



}









/*
----------------------------------------------

Archive Previous Version


----------------------------------------------

----------------------------------------------

*/


archiveActiveVersion(

    batchId

){



    let versions =

        this.getByBatch(

            batchId

        );





    versions.forEach(v=>{



        if(

            v.status === "Active"

        ){



            v.status =

                "Archived";





            this.db.update(



                this.collection,

                v.id,

                v



            );



        }



    });



}









/*
----------------------------------------------

Get Versions By Batch


----------------------------------------------

----------------------------------------------

*/


getByBatch(

    batchId

){



    return this.db.get(

        this.collection

    )

    .filter(



        item =>

        item.batchId === batchId



    );



}









/*
----------------------------------------------

Get Current Version


----------------------------------------------

----------------------------------------------

*/


getCurrent(

    batchId

){



    return this.getByBatch(

        batchId

    )

    .find(



        item =>

        item.status === "Active"



    );



}









/*
----------------------------------------------

Change Version Status


----------------------------------------------

----------------------------------------------

*/


changeStatus(

    id,

    status

){



    let version =

        this.db.findById(



            this.collection,

            id



        );





    if(!version){



        return null;



    }





    version.status =

        status;





    return this.db.update(



        this.collection,

        id,

        version



    );



}









/*
----------------------------------------------

Compare Versions


----------------------------------------------

----------------------------------------------

*/


compare(

    versionA,

    versionB,

    bomStorage

){



    let bomA =

        bomStorage.getTree(

            versionA.batchId,

            versionA.version

        );





    let bomB =

        bomStorage.getTree(

            versionB.batchId,

            versionB.version

        );





    if(

        !bomA

        ||

        !bomB

    ){



        return null;



    }





    return bomStorage.compare(



        bomA.tree,

        bomB.tree



    );



}









/*
----------------------------------------------

History


----------------------------------------------

*/


history(

    batchId

){



    return this.getByBatch(

        batchId

    )

    .sort(



        (a,b)=>



        a.version.localeCompare(

            b.version

        )



    );



}









/*
----------------------------------------------

Disable Version


不刪除

----------------------------------------------

*/


disable(id){



    return this.changeStatus(

        id,

        "Disabled"

    );



}
```

}

window.VersionStorage = VersionStorage;
