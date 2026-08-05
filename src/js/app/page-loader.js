# /*

CWPS Enterprise

Page Loader

Sprint:

1.7.2

Build:

0001

Description:

SPA page loading controller

==================================================
*/

class PageLoader {

```
constructor(){



    this.basePath =

        "src/pages/";





    this.currentPage =

        "";





    this.containerId =

        "app";





    this.history = [];



}









/*
----------------------------------------------

Load Page


----------------------------------------------

----------------------------------------------

*/


async load(

    page

){



    let url =



        this.basePath +

        page +

        ".html";









    try{



        let response =



            await fetch(

                url

            );





        if(

            !response.ok

        ){



            throw new Error(

                "Page Not Found"

            );



        }









        let html =



            await response.text();





        this.render(

            html

        );









        this.currentPage =

            page;





        this.history.push(

            page

        );









        this.afterLoad(

            page

        );









        return true;



    }

    catch(error){



        console.error(



            "Load Page Error:",

            error



        );





        this.showError(

            page

        );





        return false;



    }



}









/*
----------------------------------------------

Render Page


----------------------------------------------

----------------------------------------------

*/


render(

    html

){



    let container =



        document.getElementById(

            this.containerId

        );





    if(!container){



        console.error(

            "App Container Missing"

        );



        return;



    }





    container.innerHTML =

        html;



}









/*
----------------------------------------------

After Page Loaded


----------------------------------------------

----------------------------------------------

*/


afterLoad(

    page

){



    console.log(



        "Page Loaded:",

        page



    );









    let event =



        new CustomEvent(

            "cwps-page-loaded",

            {



                detail:{



                    page:

                        page



                }



            }

        );





    document.dispatchEvent(

        event

    );



}









/*
----------------------------------------------

Show Error


----------------------------------------------

----------------------------------------------

*/


showError(

    page

){



    let container =



        document.getElementById(

            this.containerId

        );





    if(container){



        container.innerHTML = `



            <div class="error-box">



                <h3>

                Page Loading Error

                </h3>



                <p>

                Cannot load:

                ${page}

                </p>



            </div>



        `;



    }



}









/*
----------------------------------------------

Reload Current Page


----------------------------------------------

----------------------------------------------

*/


reload(){



    if(

        this.currentPage

    ){



        return this.load(

            this.currentPage

        );



    }



}









/*
----------------------------------------------

Get Current Page


----------------------------------------------

----------------------------------------------

*/


getCurrent(){



    return this.currentPage;



}









/*
----------------------------------------------

Navigation History


----------------------------------------------

----------------------------------------------

*/


getHistory(){



    return this.history;



}
```

}

window.PageLoader = PageLoader;
