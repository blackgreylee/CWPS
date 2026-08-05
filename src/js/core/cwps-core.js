# /*

CWPS Enterprise

CWPS Core

Sprint:

1.6.5

Build:

0001

Description:

Main application core

==================================================
*/

class CWPSCore {

```
constructor(){



    this.version =

        "CWPS v0.1 Alpha";





    this.status =

        "Created";





    this.engines = {};





    this.services = {};





    this.initialized = false;



}









/*
----------------------------------------------

Initialize System


----------------------------------------------

*/


initialize(){



    if(

        this.initialized

    ){



        return this;



    }









    this.loadEngines();





    this.loadServices();





    this.status =

        "Running";





    this.initialized = true;





    console.log(

        "CWPS System Initialized"

    );





    return this;



}









/*
----------------------------------------------

Load Engines


----------------------------------------------

----------------------------------------------

*/


loadEngines(){



    this.engines = {



        requirement:



            new RequirementEngine(),





        quotation:



            new QuotationEngine(),





        purchase:



            new PurchaseEngine(),





        shipment:



            new ShipmentEngine(),





        invoice:



            new InvoiceEngine()



    };



}









/*
----------------------------------------------

Load Services


----------------------------------------------

----------------------------------------------

*/


loadServices(){



    this.services = {



        workflow:



            new WorkflowController(),





        procurement:



            new ProcurementService(),





        dashboard:



            new DashboardService(),





        validation:



            new ValidationService()



    };



}









/*
----------------------------------------------

Start Workflow


----------------------------------------------

----------------------------------------------

*/


start(){



    this.initialize();





    this.services.workflow.start();





    return this;



}









/*
----------------------------------------------

Get Engine


----------------------------------------------

----------------------------------------------

*/


getEngine(

    name

){



    return this.engines[name];



}









/*
----------------------------------------------

Get Service


----------------------------------------------

----------------------------------------------

*/


getService(

    name

){



    return this.services[name];



}









/*
----------------------------------------------

System Information


----------------------------------------------

----------------------------------------------

*/


info(){



    return {



        version:

            this.version,



        status:

            this.status,



        engines:



            Object.keys(

                this.engines

            ),



        services:



            Object.keys(

                this.services

            ),



        initialized:

            this.initialized



    };



}









/*
----------------------------------------------

Reset System


----------------------------------------------

----------------------------------------------

*/


reset(){



    this.engines = {};



    this.services = {};



    this.initialized = false;





    this.status =

        "Reset";



}
```

}

# /*

Global CWPS Instance

==================================================
*/

window.CWPS = new CWPSCore();
