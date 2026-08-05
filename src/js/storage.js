# /*

CWPS Enterprise
Curtain Wall Procurement System

Storage Manager

Version:
Sprint 1.3.1
Build 0001

==================================================
*/

## /*

## CWPS Storage Keys

*/

const CWPS_STORAGE_KEYS = {

```
CONFIG:

    "CWPS_CONFIG",


PROJECT:

    "CWPS_PROJECT",


BATCH:

    "CWPS_BATCH",


BOM:

    "CWPS_BOM",


MATERIAL:

    "CWPS_MATERIAL",


SUPPLIER:

    "CWPS_SUPPLIER",


VERSION:

    "CWPS_VERSION"
```

};

## /*

## Storage Manager Object

*/

const CWPSStorage = {

```
/*
----------------------------------------------
Save Data

key:
storage key

data:
any object

----------------------------------------------
*/


save(key, data) {


    try {


        const jsonData =

            JSON.stringify(data);



        localStorage.setItem(

            key,

            jsonData

        );



        return true;


    }

    catch(error) {


        console.error(

            "CWPS Storage Save Error:",

            error

        );


        return false;


    }


},




/*
----------------------------------------------
Load Data

----------------------------------------------
*/


load(key, defaultValue = null) {


    try {


        const data =

            localStorage.getItem(key);



        if(!data){


            return defaultValue;


        }



        return JSON.parse(data);


    }

    catch(error){


        console.error(

            "CWPS Storage Load Error:",

            error

        );


        return defaultValue;


    }


},




/*
----------------------------------------------
Update Data

----------------------------------------------
*/


update(key, callback){


    const currentData =

        this.load(

            key,

            {}

        );



    const newData =

        callback(currentData);



    return this.save(

        key,

        newData

    );


},




/*
----------------------------------------------
Remove Data

----------------------------------------------
*/


remove(key){


    localStorage.removeItem(key);


},




/*
----------------------------------------------
Clear CWPS Data

----------------------------------------------
*/


clearCWPS(){


    Object.values(

        CWPS_STORAGE_KEYS

    )

    .forEach(key => {


        this.remove(key);


    });


}
```

};

## /*

## Default Configuration

*/

function initializeCWPSStorage(){

```
if(

    !CWPSStorage.load(

        CWPS_STORAGE_KEYS.CONFIG

    )

){



    const defaultConfig = {


        system:

        {

            name:

                "CWPS Enterprise",


            version:

                "Sprint 1.3.1",


            build:

                "0001"


        },


        created:

            new Date().toISOString()


    };



    CWPSStorage.save(

        CWPS_STORAGE_KEYS.CONFIG,

        defaultConfig

    );


}



if(

    !CWPSStorage.load(

        CWPS_STORAGE_KEYS.VERSION

    )

){



    CWPSStorage.save(

        CWPS_STORAGE_KEYS.VERSION,

        {


            sprint:

                "1.3.1",


            build:

                "0001",


            status:

                "Development"


        }


    );


}
```

}

## /*

Auto Initialize

---

*/

document.addEventListener(

```
"DOMContentLoaded",

function(){


    initializeCWPSStorage();



}
```

);

## /*

End of storage.js

---

*/
