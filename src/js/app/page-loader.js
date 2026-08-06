/*
==================================================

 CWPS Enterprise

 File:
 src/js/app/page-loader.js


 Sprint:
 2.8.2


 Build:
 Enterprise Page Loader


 Description:
 Dynamic HTML Page Loader


==================================================
*/


(function(global){


"use strict";



class PageLoader {



    constructor(){


        this.basePath =

            "pages/";


        this.containerId =

            "app";


        this.currentPage = null;


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

    Load Page

    ==============================================
    */


    async load(
        page
    ){



        if(!page){


            throw new Error(

                "Page name required"

            );


        }





        const url =


            this.basePath +

            page +

            ".html";





        try{


            const response =


                await fetch(

                    url

                );





            if(!response.ok){


                throw new Error(

                    "Page load failed: "

                    +

                    page

                );


            }





            const html =


                await response.text();





            const container =


                document.getElementById(

                    this.containerId

                );





            if(container){


                container.innerHTML = html;


            }





            this.currentPage = page;





            return html;


        }

        catch(error){



            this.showError(

                error

            );





            throw error;


        }


    }






    /*
    ==============================================

    Load Partial

    ==============================================
    */


    async loadPartial(
        url
    ){



        const response =


            await fetch(

                url

            );





        if(!response.ok){


            throw new Error(

                "Partial load error"

            );


        }





        return await response.text();



    }






    /*
    ==============================================

    Replace Container

    ==============================================
    */


    render(
        html
    ){



        const container =


            document.getElementById(

                this.containerId

            );





        if(container){


            container.innerHTML = html;


        }


    }






    /*
    ==============================================

    Current Page

    ==============================================
    */


    getCurrent(){



        return this.currentPage;



    }






    /*
    ==============================================

    Error

    ==============================================
    */


    showError(
        error
    ){



        const container =


            document.getElementById(

                this.containerId

            );





        if(container){


            container.innerHTML = `



            <div class="page-error">


                Unable to load page


                <br>


                ${

                    error.message

                }


            </div>



            `;


        }





        console.error(

            error

        );


    }



}






global.PageLoader =

    PageLoader;



})(window);
