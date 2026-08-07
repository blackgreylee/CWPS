/*
==================================================

 CWPS Enterprise

 File:
 src/js/views/ui-manager.js


 Sprint:
 2.9.37


 Build:
 Enterprise UI Management Layer


 Description:
 Frontend UI Controller Manager


==================================================
*/


(function(global){

"use strict";



class UIManager {



    constructor(){


        this.views = {};


        this.currentView = null;


        this.loading = false;



    }





    /*
    ==============================================

    Register View

    註冊 View

    ==============================================
    */


    register(

        name,

        view

    ){



        this.views[name] =

            view;



    }





    /*
    ==============================================

    Open View

    開啟畫面

    ==============================================
    */


    open(

        name

    ){



        const view =

            this.views[name];





        if(!view){


            throw new Error(

                "View not found: "

                +

                name

            );


        }





        this.currentView =

            view;





        if(view.render){


            view.render();


        }





        return view;



    }





    /*
    ==============================================

    Current View

    ==============================================
    */


    getCurrent(){



        return this.currentView;



    }





    /*
    ==============================================

    Loading

    ==============================================
    */


    showLoading(){



        this.loading = true;





        const element =

            document.getElementById(

                "loading"

            );





        if(element){


            element.style.display =

                "block";


        }



    }





    hideLoading(){



        this.loading = false;





        const element =

            document.getElementById(

                "loading"

            );





        if(element){


            element.style.display =

                "none";


        }



    }





    /*
    ==============================================

    Message

    ==============================================
    */


    message(

        text,

        type="info"

    ){



        const box =

            document.createElement(

                "div"

            );





        box.className =

            "cwps-message "

            +

            type;





        box.innerHTML =

            text;





        document.body

            .appendChild(

                box

            );





        setTimeout(

            ()=>{


                box.remove();


            },


            3000

        );



    }





    /*
    ==============================================

    Confirm

    ==============================================
    */


    confirm(

        text

    ){



        return window.confirm(

            text

        );



    }





    /*
    ==============================================

    Modal

    ==============================================
    */


    openModal(

        title,

        content

    ){



        let modal =

            document.getElementById(

                "cwps-modal"

            );





        if(!modal){



            modal =

            document.createElement(

                "div"

            );



            modal.id =

                "cwps-modal";





            document.body

                .appendChild(

                    modal

                );


        }





        modal.innerHTML =


        `

        <div class="modal-box">


            <h3>

            ${title}

            </h3>


            <div>

            ${content}

            </div>



            <button

            onclick="uiManager.closeModal()">


            Close


            </button>


        </div>


        `;





        modal.style.display =

            "block";



    }





    closeModal(){



        const modal =

            document.getElementById(

                "cwps-modal"

            );





        if(modal){


            modal.style.display =

                "none";


        }



    }





    /*
    ==============================================

    Refresh Current View

    ==============================================
    */


    refresh(){



        if(

            this.currentView

            &&

            this.currentView.refresh

        ){



            this.currentView.refresh();


        }



    }





    /*
    ==============================================

    Clear

    ==============================================
    */


    clear(){



        this.views = {};


        this.currentView = null;



    }



}





global.UIManager =

    UIManager;



})(window);
