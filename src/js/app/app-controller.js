/*
==================================================

 CWPS Enterprise

 File:
 src/js/app/app-controller.js


 Sprint:
 2.9.38


 Build:
 Enterprise Application Controller Layer


 Description:
 Main Application Bootstrap Controller


==================================================
*/


(function(global){

"use strict";



class AppController {



    constructor(){


        this.started = false;


        this.database = null;


        this.uiManager = null;


        this.menuController = null;


    }





    /*
    ==============================================

    Application Start

    ==============================================
    */


    async start(){



        if(this.started){


            return;


        }





        console.log(

            "CWPS Enterprise Starting..."

        );





        this.initDatabase();


        this.initUI();


        this.initMenu();


        this.registerViews();


        this.started = true;





        console.log(

            "CWPS Enterprise Started"

        );



    }





    /*
    ==============================================

    Database

    ==============================================
    */


    initDatabase(){



        if(

            global.DatabaseInit

        ){



            this.database =

                new global.DatabaseInit();



            this.database

                .initialize();


        }



    }





    /*
    ==============================================

    UI Manager

    ==============================================
    */


    initUI(){



        this.uiManager =

            new global.UIManager();



        global.uiManager =

            this.uiManager;



    }





    /*
    ==============================================

    Menu

    ==============================================
    */


    initMenu(){



        this.menuController =

            new global.MenuController();



        global.menuController =

            this.menuController;



    }





    /*
    ==============================================

    Register Views

    ==============================================
    */


    registerViews(){



        if(!this.uiManager){


            return;


        }





        if(global.DashboardView){



            this.uiManager

            .register(

                "dashboard",

                new global.DashboardView()

            );


        }





        if(global.ProjectView){



            this.uiManager

            .register(

                "project",

                new global.ProjectView()

            );


        }





        if(global.BOMView){



            this.uiManager

            .register(

                "bom",

                new global.BOMView()

            );


        }





        if(global.ProcurementView){



            this.uiManager

            .register(

                "procurement",

                new global.ProcurementView()

            );


        }





        if(global.SupplierView){



            this.uiManager

            .register(

                "supplier",

                new global.SupplierView()

            );


        }



    }





    /*
    ==============================================

    Open Default Page

    ==============================================
    */


    openDefault(){



        if(this.uiManager){



            this.uiManager

            .open(

                "dashboard"

            );


        }



    }





    /*
    ==============================================

    Shutdown

    ==============================================
    */


    shutdown(){



        this.started = false;


        this.database = null;


        console.log(

            "CWPS Shutdown"

        );



    }





    /*
    ==============================================

    Status

    ==============================================
    */


    status(){



        return {


            started:

                this.started,


            database:

                !!this.database,


            ui:

                !!this.uiManager



        };



    }



}





global.AppController =

    AppController;



})(window);
