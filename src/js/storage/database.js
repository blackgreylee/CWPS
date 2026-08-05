# /*

CWPS Enterprise

Database Core

Sprint:

1.4

Build:

0001

Description:

Local persistence database adapter

==================================================
*/

class CWPSDatabase {

```
constructor(){



    this.databaseName =

        "CWPS_DB";





    this.defaultSchema = {



        projects: [],



        batches: [],



        bom: [],



        materials: [],



        suppliers: [],



        versions: [],



        importHistory: []



    };



}









/*
----------------------------------------------

Initialize Database


----------------------------------------------

*/


init(){



    let db =

        this.load();



    if(!db){



        this.save(

            this.defaultSchema

        );



    }



    return this.load();



}









/*
----------------------------------------------

Load Database


----------------------------------------------

*/


load(){



    let data =



        localStorage.getItem(

            this.databaseName

        );





    if(!data){



        return null;



    }





    return JSON.parse(

        data

    );



}









/*
----------------------------------------------

Save Database


----------------------------------------------

*/


save(data){



    localStorage.setItem(



        this.databaseName,



        JSON.stringify(

            data

        )



    );



}









/*
----------------------------------------------

Get Collection


Example:


db.get("projects")


----------------------------------------------

*/


get(collection){



    let db =

        this.load();





    if(

        !db[collection]

    ){



        return [];



    }





    return db[collection];



}









/*
----------------------------------------------

Replace Collection


----------------------------------------------

*/


set(

    collection,

    data

){



    let db =

        this.load();





    db[collection] =

        data;





    this.save(

        db

    );



    return data;



}









/*
----------------------------------------------

Insert Record


----------------------------------------------

*/


insert(

    collection,

    record

){



    let data =

        this.get(

            collection

        );





    data.push(

        record

    );





    this.set(

        collection,

        data

    );





    return record;



}









/*
----------------------------------------------

Update Record


----------------------------------------------

*/


update(

    collection,

    id,

    record

){



    let data =

        this.get(

            collection

        );





    let index =

        data.findIndex(



            item =>

            item.id === id



        );





    if(

        index === -1

    ){



        return null;



    }





    data[index] =

        record;





    this.set(

        collection,

        data

    );





    return record;



}









/*
----------------------------------------------

Find Record


----------------------------------------------

*/


findById(

    collection,

    id

){



    let data =

        this.get(

            collection

        );





    return data.find(



        item =>

        item.id === id



    );



}









/*
----------------------------------------------

Remove Record


注意：

CWPS 不真正刪除資料


----------------------------------------------

*/


remove(

    collection,

    id

){



    let record =

        this.findById(

            collection,

            id

        );





    if(!record){



        return false;



    }





    record.status =

        "Disabled";





    this.update(

        collection,

        id,

        record

    );





    return true;



}









/*
----------------------------------------------

Clear Database


僅測試使用


----------------------------------------------

*/


clear(){



    localStorage.removeItem(

        this.databaseName

    );



}









/*
----------------------------------------------

Export Backup JSON


----------------------------------------------

*/


backup(){



    return JSON.stringify(



        this.load(),



        null,

        4



    );



}









/*
----------------------------------------------

Restore Backup


----------------------------------------------

*/


restore(json){



    let data =



        JSON.parse(

            json

        );





    this.save(

        data

    );





    return data;



}
```

}

window.CWPSDatabase = CWPSDatabase;
