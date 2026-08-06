/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/ui-manager.js


 Sprint:
 2.7.6


 Build:
 Enterprise UI Manager Layer


 Description:
 View Lifecycle Manager


==================================================
*/


(function(global){


"use strict";



class UIManager {



    constructor(){


        this.views = {};


        this.currentView = null;


        this.containerId = "app";


    }






    /*
    ==============================================

    Initialize

    ==============================================
    */


    init(
        containerId = "app"
    ){



        this.containerId = containerId;



    }






    /*
    ==============================================

    Register View

    ==============================================
    */


    register(
        name,
        view
    ){



        if(!name || !view){


            throw new Error(

                "Invalid View"

            );


        }





        this.views[name] = view;


    }






    /*
    ==============================================

    Open View

    ==============================================
    */


    async open(
        name,
        data = null
    ){



        const view =


            this.views[name];





        if(!view){


            console.error(

                "View not found:",

                name

            );


            return;


        }





        this.showLoading();





        try{


            this.currentView = view;





            if(

                view.init &&

                !view.initialized

            ){


                view.init(

                    view.controller,

                    this.containerId

                );


                view.initialized = true;


            }







            if(view.render){



                if(data){


                    view.render(

                        data

                    );


                }

                else if(view.load){


                    await view.load();


                }


            }





        }

        catch(error){



            this.showError(

                error

            );



        }

        finally{


            this.hideLoading();


        }


    }






    /*
    ==============================================

    Refresh Current View

    ==============================================
    */


    async refresh(){



        if(

            this.currentView &&

            this.currentView.refresh

        ){


            await this.currentView.refresh();


        }


    }






    /*
    ==============================================

    Container Clear

    ==============================================
    */


    clear(){



        const container =


            document.getElementById(

                this.containerId

            );





        if(container){


            container.innerHTML = "";


        }


    }






    /*
    ==============================================

    Loading

    ==============================================
    */


    showLoading(){



        const container =


            document.getElementById(

                this.containerId

            );





        if(!container){


            return;


        }





        const loading =


            document.createElement(

                "div"

            );





        loading.id =

            "cwps-loading";





        loading.innerHTML =


            "Loading...";





        container.appendChild(

            loading

        );


    }






    hideLoading(){



        const loading =


            document.getElementById(

                "cwps-loading"

            );





        if(loading){


            loading.remove();


        }


    }






    /*
    ==============================================

    Error Display

    ==============================================
    */


    showError(
        error
    ){



        console.error(

            error

        );





        const container =


            document.getElementById(

                this.containerId

            );





        if(container){


            container.innerHTML = `


            <div class="error-message">


                ${

                    error.message ||

                    error

                }


            </div>


            `;


        }


    }






    /*
    ==============================================

    Current View

    ==============================================
    */


    getCurrent(){



        return this.currentView;



    }






}






global.UIManager =

    UIManager;



})(window);
