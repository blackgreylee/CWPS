/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/menu-controller.js


 Sprint:
 2.9.31


 Build:
 Enterprise Menu Controller Layer


 Description:
 System Navigation Controller


==================================================
*/


(function(global){

"use strict";



class MenuController {



    constructor(){


        this.currentPage =

            null;



        this.menuItems = [


            {


                id:"dashboard",


                name:"Dashboard",


                page:"dashboard"


            },


            {


                id:"project",


                name:"Project",


                page:"project"


            },


            {


                id:"bom",


                name:"BOM Management",


                page:"bom"


            },


            {


                id:"procurement",


                name:"Procurement",


                page:"procurement"


            },


            {


                id:"supplier",


                name:"Supplier",


                page:"supplier"


            },


            {


                id:"analysis",


                name:"Analysis",


                page:"analysis"


            }



        ];



    }





    /*
    ==============================================

    Get Menu

    ==============================================
    */


    getMenu(){



        return this.menuItems;



    }





    /*
    ==============================================

    Open Page

    ==============================================
    */


    navigate(

        page

    ){



        const menu =

            this.menuItems.find(

                item =>

                item.page === page

            );





        if(!menu){


            throw new Error(

                "Page not found"

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


    getCurrentPage(){



        return this.currentPage;



    }





    /*
    ==============================================

    Check Menu

    ==============================================
    */


    exists(

        page

    ){



        return this.menuItems.some(

            item =>

            item.page === page

        );



    }





    /*
    ==============================================

    Add Menu

    ==============================================
    */


    addMenu(

        item

    ){



        this.menuItems.push(

            item

        );



    }





    /*
    ==============================================

    Remove Menu

    ==============================================
    */


    removeMenu(

        page

    ){



        this.menuItems =

            this.menuItems.filter(

                item =>

                item.page !== page

            );



    }





    /*
    ==============================================

    Reset

    ==============================================
    */


    reset(){



        this.currentPage =

            null;



    }



}





global.MenuController =

    MenuController;



})(window);
