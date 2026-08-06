/*
==================================================

 CWPS Enterprise

 File:
 src/js/app/app-controller.js


 Sprint:
 2.8.1


 Build:
 Enterprise Application Controller


 Description:
 Main Application Bootstrap Controller


==================================================
*/


(function(global){


"use strict";



class AppController {



    constructor(){



        this.database =

            new Database();



        this.router =

            new Router();



        this.uiManager =

            new UIManager();



        this.controllers = {};



        this.views = {};



        this.initialized = false;



    }






    /*
    ==============================================

    Application Initialize

    ==============================================
    */


    async init(){



        if(this.initialized){


            return;


        }





        console.log(

            "CWPS Enterprise Starting..."

        );





        await this.initDatabase();



        this.initUI();



        this.initControllers();



        this.initViews();



        this.initRouter();





        this.initialized = true;





        console.log(

            "CWPS Enterprise Ready"

        );



    }






    /*
    ==============================================

    Database

    ==============================================
    */


    async initDatabase(){



        await this.database.init();



    }






    /*
    ==============================================

    UI Manager

    ==============================================
    */


    initUI(){



        this.uiManager.init(

            "app"

        );



    }






    /*
    ==============================================

    Controllers

    ==============================================
    */


    initControllers(){



        this.controllers.project =


            new ProjectController();





        this.controllers.supplier =


            new SupplierController();





        this.controllers.procurement =


            new ProcurementController();



    }






    /*
    ==============================================

    Views

    ==============================================
    */


    initViews(){



        /*
        Project
        */


        this.views.project =


            new ProjectView();





        this.views.project.controller =


            this.controllers.project;





        this.uiManager.register(

            "project",

            this.views.project

        );







        /*
        Supplier
        */


        this.views.supplier =


            new SupplierView();





        this.views.supplier.controller =


            this.controllers.supplier;





        this.uiManager.register(

            "supplier",

            this.views.supplier

        );







        /*
        Procurement
        */


        this.views.procurement =


            new ProcurementView();





        this.views.procurement.controller =


            this.controllers.procurement;





        this.uiManager.register(

            "procurement",

            this.views.procurement

        );







        /*
        Dashboard
        */


        this.views.dashboard =


            new DashboardView();





        this.views.dashboard.service =


            new DashboardService();





        this.uiManager.register(

            "dashboard",

            this.views.dashboard

        );







        /*
        BOM

        */

        this.views.bom =


            new BOMView();





        this.views.bom.controller =


            new BOMController();





        this.uiManager.register(

            "bom",

            this.views.bom

        );



    }






    /*
    ==============================================

    Router

    ==============================================
    */


    initRouter(){



        this.router.init(

            this.uiManager

        );



    }






    /*
    ==============================================

    Start Default Page

    ==============================================
    */


    async start(){



        await this.init();



        await this.router.navigate(

            "dashboard"

        );



    }






    /*
    ==============================================

    Get Controller

    ==============================================
    */


    getController(
        name
    ){



        return this.controllers[name];



    }






    /*
    ==============================================

    Get View

    ==============================================
    */


    getView(
        name
    ){



        return this.views[name];



    }



}






global.AppController =

    AppController;



})(window);
