# /*

CWPS Enterprise

UI Manager

Sprint:

1.8.6

Build:

0001

Description:

Frontend view lifecycle manager

==================================================
*/

class UIManager {

```
constructor(){



    this.views = {};





    this.controllers = {};





    this.currentView =

        null;





    this.currentPage =

        null;



}









/*
----------------------------------------------

Register View


----------------------------------------------

*/


register(

    name,

    view

){



    this.views[name] =

        view;



}









/*
----------------------------------------------

Register Controller


----------------------------------------------

*/


registerController(

    name,

    controller

){



    this.controllers[name] =

        controller;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(){



    this.bindEvents();



    console.log(

        "UI Manager Ready"

    );



}









/*
----------------------------------------------

Page Event Listener


----------------------------------------------

*/


bindEvents(){



    document.addEventListener(



        "cwps-page-loaded",



        (event)=>{



            this.loadPage(

                event.detail.page

            );



        }



    );



}









/*
----------------------------------------------

Load View By Page


----------------------------------------------

*/


loadPage(

    page

){



    this.currentPage =

        page;









    let view =



        this.views[page];









    if(!view){



        console.warn(

            "View Missing:",

            page

        );



        return;



    }









    this.currentView =

        view;









    if(

        view.load

    ){



        view.load();



    }









    console.log(

        "View Loaded:",

        page

    );



}









/*
----------------------------------------------

Initialize View


----------------------------------------------

*/


initView(

    name,

    service

){



    let view =



        this.views[name];









    if(

        !view

    ){



        return;



    }









    if(

        view.init

    ){



        view.init(

            service

        );



    }



}









/*
----------------------------------------------

Refresh Current View


----------------------------------------------

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
----------------------------------------------

Get Current View


----------------------------------------------

*/


getCurrent(){



    return this.currentView;



}









/*
----------------------------------------------

Destroy View


----------------------------------------------

*/


destroy(){



    this.currentView =

        null;



}
```

}

window.UIManager = UIManager;
