/*
==================================================

 CWPS Enterprise

 File:
 src/js/app/database-init.js


 Sprint:
 2.9.2.1


 Build:
 Enterprise Database Initialization Layer


 Description:
 Database Instance Bootstrap


==================================================
*/


(function(global){

"use strict";



class DatabaseInitializer {



    constructor(){


        this.database = null;


    }





    /*
    ==============================================

    Initialize Database

    ==============================================
    */


    async init(){



        if(this.database){


            return this.database;


        }





        if(!global.Database){


            throw new Error(

                "Database class not loaded"

            );


        }





        if(!global.CWPS_SCHEMA){


            throw new Error(

                "Database schema not loaded"

            );


        }





        this.database =

            new global.Database();





        await this.database.init();





        global.cwpsDatabase =

            this.database;





        console.log(

            "CWPS Database Initialized"

        );





        return this.database;


    }



}





/*
==================================================

 Auto Start

==================================================
*/


global.DatabaseInitializer =

    DatabaseInitializer;





global.initCWPSDatabase = async function(){



    const initializer =

        new DatabaseInitializer();




    return await initializer.init();



};



})(window);
