# /*

CWPS Enterprise

Procurement View

Sprint:

1.8.4

Build:

0001

Description:

Procurement workflow UI renderer

==================================================
*/

class ProcurementView {

```
constructor(){



    this.containerId =

        "procurement-container";





    this.controller =

        null;





    this.project =

        null;





    this.data = null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    procurementController

){



    this.controller =

        procurementController;



}









/*
----------------------------------------------

Load Procurement Data


----------------------------------------------

*/


load(

    project

){



    this.project =

        project;









    this.controller

    .setProject(

        project

    );









    this.data =



        this.controller

        .getStatus();









    this.render();



}









/*
----------------------------------------------

Render Page


----------------------------------------------

*/


render(){



    let container =



        document.getElementById(

            this.containerId

        );









    if(!container){



        return;



    }









    container.innerHTML = `



    <div class="procurement-header">



        <h2>

        採購管理

        </h2>



        <p>

        專案：

        ${

            this.project.projectName

        }

        </p>



    </div>





    <div id="requirement-panel">

    </div>





    <div id="quotation-panel">

    </div>





    <div id="purchase-panel">

    </div>





    <div id="shipment-panel">

    </div>





    <div id="invoice-panel">

    </div>



    `;









    this.renderRequirement();



    this.renderQuotation();



    this.renderPurchase();



    this.renderShipment();



    this.renderInvoice();



}









/*
----------------------------------------------

Requirement


----------------------------------------------

*/


renderRequirement(){



    let box =



        document.getElementById(

            "requirement-panel"

        );









    box.innerHTML = `



    <h3>

    材料需求

    </h3>



    <p>

    需求數量：

    ${

        this.data.requirementCount || 0

    }

    </p>



    `;



}









/*
----------------------------------------------

Quotation


----------------------------------------------

*/


renderQuotation(){



    let box =



        document.getElementById(

            "quotation-panel"

        );









    box.innerHTML = `



    <h3>

    詢價管理

    </h3>



    <p>

    詢價單：

    ${

        this.data.quotationCount || 0

    }

    </p>



    `;



}









/*
----------------------------------------------

Purchase


----------------------------------------------

*/


renderPurchase(){



    let box =



        document.getElementById(

            "purchase-panel"

        );









    box.innerHTML = `



    <h3>

    採購單

    </h3>



    <p>

    採購數量：

    ${

        this.data.purchaseCount || 0

    }

    </p>



    `;



}









/*
----------------------------------------------

Shipment


----------------------------------------------

*/


renderShipment(){



    let box =



        document.getElementById(

            "shipment-panel"

        );









    box.innerHTML = `



    <h3>

    出貨追蹤

    </h3>



    <p>

    出貨單：

    ${

        this.data.shipmentCount || 0

    }

    </p>



    `;



}









/*
----------------------------------------------

Invoice


----------------------------------------------

*/


renderInvoice(){



    let box =



        document.getElementById(

            "invoice-panel"

        );









    box.innerHTML = `



    <h3>

    發票管理

    </h3>



    <p>

    發票：

    ${

        this.data.invoiceCount || 0

    }

    </p>



    `;



}









/*
----------------------------------------------

Create Requirement


----------------------------------------------

*/


createRequirement(

    data

){



    return this.controller

        .createRequirement(

            data

        );



}









/*
----------------------------------------------

Refresh


----------------------------------------------

*/


refresh(){



    if(

        this.project

    ){



        this.load(

            this.project

        );



    }



}
```

}

window.ProcurementView = ProcurementView;
