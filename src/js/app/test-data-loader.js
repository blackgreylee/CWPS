/*
==================================================

 CWPS Enterprise

 File:
 src/js/app/test-data-loader.js


 Sprint:
 2.9.40


 Build:
 Integration Test Data Loader


 Description:
 Load JSON Test Dataset


==================================================
*/


(function(global){

"use strict";



class TestDataLoader {



    constructor(){


        this.basePath =

            "data/";



        this.loaded = false;



        this.data = {



            project:null,


            supplier:null,


            bom:null,


            procurement:null



        };



    }





    /*
    ==============================================

    Load All Data

    ==============================================
    */


    async loadAll(){



        console.log(

            "Loading CWPS Test Data..."

        );





        this.data.project =

            await this.loadJSON(

                "project.json"

            );





        this.data.supplier =

            await this.loadJSON(

                "supplier.json"

            );





        this.data.bom =

            await this.loadJSON(

                "bom.json"

            );





        this.data.procurement =

            await this.loadJSON(

                "procurement.json"

            );





        this.loaded = true;





        this.saveToStorage();





        console.log(

            "CWPS Test Data Loaded"

        );





        return this.data;



    }





    /*
    ==============================================

    Load JSON

    ==============================================
    */


    async loadJSON(

        file

    ){



        const response =

            await fetch(

                this.basePath

                +

                file

            );





        if(!response.ok){



            throw new Error(

                "Cannot load "

                +

                file

            );



        }





        return await response.json();



    }





    /*
    ==============================================

    Save Local Storage

    ==============================================
    */


    saveToStorage(){



        localStorage.setItem(

            "cwps_projects",

            JSON.stringify(

                this.data.project

            )

        );





        localStorage.setItem(

            "cwps_suppliers",

            JSON.stringify(

                this.data.supplier

            )

        );





        localStorage.setItem(

            "cwps_bom",

            JSON.stringify(

                this.data.bom

            )

        );





        localStorage.setItem(

            "cwps_procurement",

            JSON.stringify(

                this.data.procurement

            )

        );



    }





    /*
    ==============================================

    Get Data

    ==============================================
    */


    get(

        name

    ){



        return this.data[name];



    }





    /*
    ==============================================

    Clear Test Data

    ==============================================
    */


    clear(){



        localStorage.removeItem(

            "cwps_projects"

        );


        localStorage.removeItem(

            "cwps_suppliers"

        );


        localStorage.removeItem(

            "cwps_bom"

        );


        localStorage.removeItem(

            "cwps_procurement"

        );



        this.loaded = false;



    }





    /*
    ==============================================

    Status

    ==============================================
    */


    status(){



        return {


            loaded:

                this.loaded,


            datasets:

                Object.keys(

                    this.data

                )



        };



    }



}





global.TestDataLoader =

    TestDataLoader;



})(window);
