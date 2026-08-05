# /*

CWPS Enterprise

Dashboard View

Sprint:

1.8.1

Build:

0001

Description:

Dashboard UI renderer

==================================================
*/

class DashboardView {

```
constructor(){



    this.containerId =

        "dashboard-container";





    this.dashboardService =

        null;





    this.data = null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    dashboardService

){



    this.dashboardService =

        dashboardService;



}









/*
----------------------------------------------

Load Dashboard Data


----------------------------------------------

*/


load(){



    if(

        !this.dashboardService

    ){



        console.error(

            "Dashboard Service Missing"

        );



        return;



    }









    this.data =



        this.dashboardService.generate();



    this.render();



}









/*
----------------------------------------------

Render Dashboard


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



    <div class="dashboard-header">



        <h2>

        CWPS Dashboard

        </h2>



    </div>





    <div class="dashboard-cards">



        ${

            this.renderOverview()

        }



    </div>





    <div class="dashboard-section">



        ${

            this.renderFinancial()

        }



    </div>





    <div class="dashboard-section">



        ${

            this.renderShipment()

        }



    </div>



    `;



}









/*
----------------------------------------------

Overview Cards


----------------------------------------------

*/


renderOverview(){



    let data =



        this.data.overview;









    return `



    <div class="card">



        <h4>專案數</h4>



        <span>

        ${data.projects}

        </span>



    </div>





    <div class="card">



        <h4>需求數</h4>



        <span>

        ${data.requirements}

        </span>



    </div>





    <div class="card">



        <h4>採購單</h4>



        <span>

        ${data.purchases}

        </span>



    </div>





    <div class="card">



        <h4>出貨單</h4>



        <span>

        ${data.shipments}

        </span>



    </div>



    `;



}









/*
----------------------------------------------

Financial


----------------------------------------------

*/


renderFinancial(){



    let data =



        this.data.financial;









    return `



    <h3>

    採購金額分析

    </h3>



    <table>



    <tr>

    <td>

    採購總額

    </td>


    <td>

    ${data.purchaseAmount}

    </td>


    </tr>





    <tr>

    <td>

    發票金額

    </td>


    <td>

    ${data.invoiceAmount}

    </td>


    </tr>





    <tr>

    <td>

    已付款

    </td>


    <td>

    ${data.paidAmount}

    </td>


    </tr>





    <tr>

    <td>

    未付款

    </td>


    <td>

    ${data.unpaidAmount}

    </td>


    </tr>



    </table>



    `;



}









/*
----------------------------------------------

Shipment Status


----------------------------------------------

*/


renderShipment(){



    let data =



        this.data.shipment;









    return `



    <h3>

    出貨狀態

    </h3>



    <ul>



    <li>

    總出貨：

    ${data.total}

    </li>



    <li>

    已完成：

    ${data.completed}

    </li>



    <li>

    運送中：

    ${data.shipping}

    </li>



    <li>

    等待：

    ${data.waiting}

    </li>



    </ul>



    `;



}









/*
----------------------------------------------

Refresh


----------------------------------------------

*/


refresh(){



    this.load();



}









/*
----------------------------------------------

Get Data


----------------------------------------------

*/


getData(){



    return this.data;



}
```

}

window.DashboardView = DashboardView;
