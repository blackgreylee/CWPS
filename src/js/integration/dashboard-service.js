# /*

CWPS Enterprise

Dashboard Service

Sprint:

1.6.3

Build:

0001

Description:

Dashboard statistics service layer

==================================================
*/

class DashboardService {

```
constructor(){



    this.data = {};



}









/*
----------------------------------------------

Generate Dashboard Data


----------------------------------------------

*/


generate(

    procurementService,

    purchaseEngine,

    shipmentEngine,

    invoiceEngine

){



    this.data = {



        overview:

            this.getOverview(

                procurementService

            ),





        procurement:

            this.getProcurementStatus(

                procurementService

            ),





        financial:

            this.getFinancial(

                purchaseEngine,

                invoiceEngine

            ),





        shipment:

            this.getShipment(

                shipmentEngine

            ),





        updateTime:



            new Date()

            .toISOString()



    };





    return this.data;



}









/*
----------------------------------------------

Overview Statistics


----------------------------------------------

----------------------------------------------

*/


getOverview(

    service

){



    return {



        projects:



            this.countProjects(

                service

            ),





        requirements:



            service.requirements.length,





        quotations:



            service.quotations.length,





        purchases:



            service.purchases.length,





        shipments:



            service.shipments.length,





        invoices:



            service.invoices.length



    };



}









/*
----------------------------------------------

Count Projects


----------------------------------------------

----------------------------------------------

*/


countProjects(

    service

){



    let projects = [];





    service.requirements.forEach(item=>{



        if(

            !projects.includes(

                item.projectId

            )

        ){



            projects.push(

                item.projectId

            );



        }



    });





    return projects.length;



}









/*
----------------------------------------------

Procurement Status


----------------------------------------------

----------------------------------------------

*/


getProcurementStatus(

    service

){



    return {



        quotation:



            service.quotations.length,



        purchase:



            service.purchases.length,



        shipment:



            service.shipments.length,



        invoice:



            service.invoices.length



    };



}









/*
----------------------------------------------

Financial Analysis


----------------------------------------------

----------------------------------------------

*/


getFinancial(

    purchaseEngine,

    invoiceEngine

){



    let purchaseAmount =



        purchaseEngine.getTotalAmount();





    let invoiceSummary =



        invoiceEngine.summary();





    return {



        purchaseAmount:



            purchaseAmount,





        invoiceAmount:



            invoiceSummary.totalAmount,





        paidAmount:



            invoiceSummary.paidAmount,





        unpaidAmount:



            invoiceSummary.unpaidAmount



    };



}









/*
----------------------------------------------

Shipment Analysis


----------------------------------------------

----------------------------------------------

*/


getShipment(

    shipmentEngine

){



    let shipments =



        shipmentEngine.getAll();





    return {



        total:



            shipments.length,





        completed:



            shipments.filter(



                item =>



                item.status ===

                "Completed"



            ).length,





        shipping:



            shipments.filter(



                item =>



                item.status ===

                "Shipping"



            ).length,





        waiting:



            shipments.filter(



                item =>



                item.status ===

                "Waiting"



            ).length



    };



}









/*
----------------------------------------------

Purchase KPI


----------------------------------------------

----------------------------------------------

*/


getPurchaseKPI(

    purchaseEngine

){



    let orders =



        purchaseEngine.getAll();





    let total = 0;





    orders.forEach(po=>{



        total +=



            po.totalAmount;



    });





    return {



        orderCount:



            orders.length,





        totalAmount:



            total,





        average:



            orders.length > 0

            ?

            total /

            orders.length

            :

            0



    };



}









/*
----------------------------------------------

Refresh Dashboard


----------------------------------------------

----------------------------------------------

*/


refresh(){



    this.data.updateTime =



        new Date()

        .toISOString();





    return this.data;



}
```

}

window.DashboardService = DashboardService;
