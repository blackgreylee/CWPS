/*
==================================================

 CWPS Enterprise

 File:
 src/js/app/page-loader.js


 Sprint:
 2.9.39


 Build:
 Enterprise Page Loader Layer


 Description:
 Dynamic Page Navigation Loader


==================================================
*/


(function(global){

"use strict";



class PageLoader {



    constructor(){


        this.uiManager =

            null;


        this.menuController =

            null;


        this.currentPage =

            null;


        this.routes = {



            dashboard:

                "dashboard",



            project:

                "project",



            bom:

                "bom",



            procurement:

                "procurement",



            supplier:

                "supplier",



            analysis:

                "analysis"



        };



    }





    /*
    ==============================================

    Initialize

    ==============================================
    */


    init(){



        this.uiManager =

            global.uiManager;



        this.menuController =

            global.menuController;



    }





    /*
    ==============================================

    Load Page

    ==============================================
    */


    load(

        page

    ){



        if(!this.routes[page]){



            throw new Error(

                "Page route not found: "

                +

                page

            );


        }





        if(this.menuController){



            this.menuController

                .navigate(

                    page

                );



        }





        if(this.uiManager){



            this.uiManager

                .open(

                    page

                );



        }





        this.currentPage =

            page;





        return {


            success:true,


            page



        };



    }





    /*
    ==============================================

    Current Page

    ==============================================
    */


    current(){



        return this.currentPage;



    }





    /*
    ==============================================

    Register Route

    ==============================================
    */


    register(

        name,

        viewName

    ){



        this.routes[name] =

            viewName;



    }





    /*
    ==============================================

    Remove Route

    ==============================================
    */


    remove(

        name

    ){



        delete this.routes[name];



    }





    /*
    ==============================================

    Refresh

    ==============================================
    */


    refresh(){



        if(this.uiManager){



            this.uiManager

                .refresh();



        }



    }





    /*
    ==============================================

    Go Home

    ==============================================
    */


    home(){



        return this.load(

            "dashboard"

        );



    }





    /*
    ==============================================

    Get Routes

    ==============================================
    */


    getRoutes(){



        return this.routes;



    }



}





global.PageLoader =

    PageLoader;



})(window);
