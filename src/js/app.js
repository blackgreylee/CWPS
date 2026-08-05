# /*

CWPS Enterprise
Curtain Wall Procurement System

Application Core

Version:
Sprint 1.3.1
Build 0001

==================================================
*/

## /*

## CWPS Application Object

*/

const CWPSApp = {

```
version:

    "Sprint 1.3.1",



build:

    "0001",




/*
----------------------------------------------
Initialize Application
----------------------------------------------
*/


initialize(){



    console.log(

        "Starting CWPS Enterprise..."

    );



    this.loadSystemInfo();



    this.initializeEvents();



    this.checkEnvironment();



},






/*
----------------------------------------------
Load System Information
----------------------------------------------
*/


loadSystemInfo(){



    const versionElement =

        document.getElementById(

            "system-version"

        );



    if(versionElement){


        versionElement.innerHTML =


            this.version

            +

            " Build "

            +

            this.build;


    }



},






/*
----------------------------------------------
Environment Check
----------------------------------------------
*/


checkEnvironment(){



    if(

        typeof localStorage === "undefined"

    ){



        console.error(

            "CWPS requires Local Storage"

        );



        return false;


    }



    return true;


},






/*
----------------------------------------------
Event Binding
----------------------------------------------
*/


initializeEvents(){



    document.addEventListener(

        "click",

        function(event){



            const link =

                event.target.closest(

                    "[data-cwps-action]"

                );



            if(!link){


                return;


            }



            const action =

                link.dataset.cwpsAction;



            CWPSApp.handleAction(

                action

            );



        }


    );



},






/*
----------------------------------------------
Action Handler
----------------------------------------------
*/


handleAction(action){



    switch(action){



        case "refresh":



            location.reload();



            break;




        case "clear-data":



            if(

                CWPSUI.confirm(

                    "Clear CWPS Data?"

                )

            ){



                CWPSStorage.clearCWPS();



                CWPSUI.toast(

                    "Data cleared",

                    "success"

                );


            }



            break;




        default:



            console.log(

                "Unknown action:",

                action

            );



    }



},







/*
----------------------------------------------
Get Application Info
----------------------------------------------
*/


info(){



    return {



        name:

            "CWPS Enterprise",



        version:

            this.version,



        build:

            this.build,



        status:

            "Development"



    };


}
```

};

## /*

## Global Error Handler

*/

window.onerror = function(

```
message,

source,

line,

column,

error
```

){

```
console.error(

    "CWPS Error:",

    {

        message,

        source,

        line,

        column,

        error

    }

);
```

};

## /*

Application Start

---

*/

document.addEventListener(

```
"DOMContentLoaded",

function(){



    CWPSApp.initialize();



}
```

);

## /*

End of app.js

---

*/
