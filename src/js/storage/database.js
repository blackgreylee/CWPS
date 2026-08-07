/*
==================================================

 CWPS Enterprise

 File:
 src/js/storage/database.js


 Sprint:
 2.9.2


 Build:
 Enterprise Database Core Layer


 Description:
 Schema Based Database Manager


==================================================
*/


(function(global){


"use strict";



class Database {



    constructor(){


        this.name =

            "CWPS_DATABASE";


        this.schema =

            global.CWPS_SCHEMA;


        this.data = {};


        this.initialized = false;



    }





    /*
    ==============================================

    Initialize Database

    ==============================================
    */


    async init(){



        if(this.initialized){


            return;


        }





        this.createCollections();



        this.load();



        this.initialized = true;



        console.log(

            "CWPS Database Ready"

        );


    }





    /*
    ==============================================

    Create Collections

    ==============================================
    */


    createCollections(){



        Object.keys(

            this.schema.collections

        )

        .forEach(

            collection => {



                if(!this.data[collection]){


                    this.data[collection] = [];


                }


            }

        );



    }





    /*
    ==============================================

    Load

    ==============================================
    */


    load(){



        const saved =


            localStorage.getItem(

                this.name

            );





        if(saved){


            try{


                this.data =

                    JSON.parse(

                        saved

                    );


            }

            catch(error){


                console.error(

                    "Database Load Error",

                    error

                );


                this.createCollections();


            }


        }



    }





    /*
    ==============================================

    Save

    ==============================================
    */


    save(){



        localStorage.setItem(

            this.name,

            JSON.stringify(

                this.data

            )

        );


    }





    /*
    ==============================================

    Collection

    ==============================================
    */


    collection(
        name
    ){



        if(!this.schema.collections[name]){


            throw new Error(

                `Unknown collection: ${name}`

            );


        }





        return new Collection(

            this,

            name

        );


    }





    /*
    ==============================================

    Clear

    ==============================================
    */


    clear(){



        this.data = {};


        this.createCollections();


        this.save();


    }





    /*
    ==============================================

    Export

    ==============================================
    */


    export(){



        return JSON.parse(

            JSON.stringify(

                this.data

            )

        );


    }





    /*
    ==============================================

    Import

    ==============================================
    */


    import(
        data
    ){



        this.data = data;


        this.save();


    }


}









class Collection {



    constructor(
        database,
        name
    ){


        this.database = database;


        this.name = name;


        this.items =

            database.data[name];


        this.schema =

            database.schema.collections[name];


    }





    /*
    ==============================================

    Get All

    ==============================================
    */


    getAll(){



        return [

            ...this.items

        ];



    }





    /*
    ==============================================

    Get By Id

    ==============================================
    */


    getById(
        id
    ){



        return this.items.find(


            item =>


                item[

                    this.schema.primaryKey

                ]

                ===

                id


        );


    }





    /*
    ==============================================

    Insert

    ==============================================
    */


    insert(
        data
    ){



        const key =


            this.schema.primaryKey;





        if(!data[key]){


            throw new Error(

                "Primary key required"

            );


        }





        this.items.push(

            data

        );


        this.database.save();



        return data;


    }





    /*
    ==============================================

    Update

    ==============================================
    */


    update(
        id,

        data
    ){



        const index =


            this.items.findIndex(


                item =>


                item[

                    this.schema.primaryKey

                ]

                ===

                id


            );





        if(index < 0){


            return null;


        }





        this.items[index] = {


            ...

            this.items[index],


            ...

            data


        };





        this.database.save();



        return this.items[index];


    }





    /*
    ==============================================

    Delete

    ==============================================
    */


    delete(
        id
    ){



        const index =


            this.items.findIndex(


                item =>


                item[

                    this.schema.primaryKey

                ]

                ===

                id


            );





        if(index < 0){


            return false;


        }





        this.items.splice(

            index,

            1

        );





        this.database.save();



        return true;


    }





    /*
    ==============================================

    Where

    ==============================================
    */


    where(
        condition
    ){



        return this.items.filter(


            item => {



                return Object.keys(condition)

                .every(


                    key =>


                    item[key]

                    ===

                    condition[key]


                );


            }


        );


    }



}







global.Database = Database;

global.Collection = Collection;



})(window);
