# /*

CWPS Enterprise

Application Controller

Sprint:

1.7.1

Build:

0001

Description:

Main frontend application controller

==================================================
*/

class AppController {

```
constructor(){



    this.appName =

        "CWPS";





    this.version =

        "v0.1 Alpha";





    this.status =

        "Created";





    this.initialized = false;





    this.core = null;





    this.router = null;





    this.ui = null;



}









/*
----------------------------------------------

Initialize Application


----------------------------------------------

*/


init(){



    if(

        this.initialized

    ){



        return;



    }









    this.loadCore();





    this.loadModules();





    this.bindEvents();





    this.status =

        "Running";





    this.initialized = true;





    console.log(



        this.appName +

        " Started"

    );



}









/*
----------------------------------------------

Load CWPS Core


----------------------------------------------

----------------------------------------------

*/


loadCore(){



    if(

        window.CWPS

    ){



        this.core =

            window.CWPS;



        this.core.start();



    }

    else{



        console.error(

            "CWPS Core Missing"

        );



    }



}









/*
----------------------------------------------

Load Frontend Modules


----------------------------------------------

----------------------------------------------

*/


loadModules(){



    if(

        window.Router

    ){



        this.router =

            new Router();



    }









    if(

        window.UIManager

    ){



        this.ui =

            new UIManager();



    }



}









/*
----------------------------------------------

Bind Global Events


----------------------------------------------

----------------------------------------------

*/


bindEvents(){



    document

    .addEventListener(



        "DOMContentLoaded",



        ()=>{



            this.onReady();



        }



    );



}









/*
----------------------------------------------

Application Ready


----------------------------------------------

----------------------------------------------

*/


onReady(){



    console.log(

        "CWPS Ready"

    );





    if(

        this.router

    ){



        this.router.load(

            "dashboard"

        );



    }



}









/*
----------------------------------------------

Navigate Page


----------------------------------------------

----------------------------------------------

*/


navigate(

    page

){



    if(

        this.router

    ){



        return this.router.load(

            page

        );



    }



}









/*
----------------------------------------------

Get Application Info


----------------------------------------------

----------------------------------------------

*/


info(){



    return {



        name:

            this.appName,



        version:

            this.version,



        status:

            this.status,



        initialized:

            this.initialized



    };



}









/*
----------------------------------------------

Shutdown


----------------------------------------------

----------------------------------------------

*/


shutdown(){



    this.status =

        "Stopped";





    this.initialized =

        false;



}
```

}

# /*

Global Application Instance

==================================================
*/

window.CWPSApp =

```
new AppController();
```
