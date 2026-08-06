/*
==================================================

 CWPS Enterprise

 File:
 src/js/controllers/menu-controller.js


 Sprint:
 2.6.4


 Build:
 Enterprise Menu Navigation Controller


 Description:
 Main Navigation Controller


==================================================
*/


(function(global){


"use strict";



class MenuController {



    constructor(){


        this.router =

            new Router();



        this.currentMenu = null;



        this.menuItems = {



            dashboard:


            {


                path:

                    "dashboard",



                title:

                    "Dashboard"


            },




            project:


            {


                path:

                    "project",



                title:

                    "Project Management"


            },




            batch:


            {


                path:

                    "batch",



                title:

                    "Batch Management"


            },




            bom:


            {


                path:

                    "bom",



                title:

                    "BOM Management"


            },




            material:


            {


                path:

                    "material",



                title:

                    "Material Management"


            },




            supplier:


            {


                path:

                    "supplier",



                title:

                    "Supplier Management"


            },




            quotation:


            {


                path:

                    "quotation",



                title:

                    "Quotation Management"


            },




            purchase:


            {


                path:

                    "purchase",



                title:

                    "Purchase Management"


            },




            shipment:


            {


                path:

                    "shipment",



                title:

                    "Shipment Management"


            },




            invoice:


            {


                path:

                    "invoice",



                title:

                    "Invoice Management"


            },




            report:


            {


                path:

                    "report",



                title:

                    "Report & Analysis"


            },




            setting:


            {


                path:

                    "setting",



                title:

                    "System Setting"


            }



        };


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    init(){



        this.bindEvents();



    }






    /*
    ==============================================

    Bind Menu Events

    ==============================================
    */


    bindEvents(){



        const menus =


            document.querySelectorAll(

                "[data-menu]"

            );





        menus.forEach(

            menu=>{


                menu.addEventListener(

                    "click",

                    ()=>{


                        const target =


                            menu.dataset.menu;





                        this.open(

                            target

                        );


                    }

                );


            }

        );


    }






    /*
    ==============================================

    Open Menu

    ==============================================
    */


    open(
        menu
    ){



        const item =


            this.menuItems[menu];





        if(!item){


            console.warn(

                "Menu not found:",

                menu

            );


            return;


        }





        this.currentMenu = menu;





        this.router.navigate(

            item.path

        );


        this.setActive(

            menu

        );


    }






    /*
    ==============================================

    Active Menu

    ==============================================
    */


    setActive(
        menu
    ){



        const menus =


            document.querySelectorAll(

                "[data-menu]"

            );





        menus.forEach(

            item=>{


                item.classList.remove(

                    "active"

                );


            }

        );





        const active =


            document.querySelector(

                `[data-menu="${menu}"]`

            );





        if(active){


            active.classList.add(

                "active"

            );


        }


    }






    /*
    ==============================================

    Get Current Menu

    ==============================================
    */


    getCurrent(){



        return this.currentMenu;



    }






    /*
    ==============================================

    Refresh

    ==============================================
    */


    refresh(){



        if(this.currentMenu){


            this.open(

                this.currentMenu

            );


        }


    }





}






global.MenuController =

    MenuController;



})(window);
