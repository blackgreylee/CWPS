# /*

CWPS Enterprise

Shipment Model

Sprint:

1.5.4

Build:

0001

Description:

Shipment tracking data model

==================================================
*/

class ShipmentModel {

```
constructor(data = {}){



    this.id =



        data.id ||

        this.generateId();





    this.purchaseId =



        data.purchaseId ||

        "";





    this.projectId =



        data.projectId ||

        "";





    this.batchId =



        data.batchId ||

        "";





    this.supplierId =



        data.supplierId ||

        "";





    this.supplierName =



        data.supplierName ||

        "";





    this.items =



        data.items ||

        [];





    this.shipDate =



        data.shipDate ||

        "";





    this.arrivalDate =



        data.arrivalDate ||

        "";





    this.driver =



        data.driver ||

        "";





    this.vehicle =



        data.vehicle ||

        "";





    this.status =



        data.status ||

        "Waiting";





    this.receiveStatus =



        data.receiveStatus ||

        "Pending";





    this.remark =



        data.remark ||

        "";





    this.createdDate =



        data.createdDate ||

        new Date()

        .toISOString();





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Generate ID


----------------------------------------------

*/


generateId(){



    return (

        "SHIP-" +

        Date.now()

    );



}









/*
----------------------------------------------

Add Shipment Item


----------------------------------------------

*/


addItem(item){



    this.items.push({



        materialCode:

            item.materialCode || "",



        materialName:

            item.materialName || "",



        quantity:

            Number(

                item.quantity

            ) || 0,



        unit:

            item.unit || "PCS"



    });





    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Start Preparing


----------------------------------------------

*/


prepare(){



    this.status =

        "Preparing";





    this.updateTime();



}









/*
----------------------------------------------

Ship


----------------------------------------------

*/


ship(){



    this.status =

        "Shipping";





    this.updateTime();



}









/*
----------------------------------------------

Arrival Confirm


----------------------------------------------

*/


arrive(){



    this.status =

        "Arrived";





    this.receiveStatus =

        "Waiting Check";





    this.updateTime();



}









/*
----------------------------------------------

Quality Check Complete


----------------------------------------------

*/


check(){



    this.status =

        "Checked";





    this.receiveStatus =

        "Passed";





    this.updateTime();



}









/*
----------------------------------------------

Complete Shipment


----------------------------------------------

*/


complete(){



    this.status =

        "Completed";





    this.receiveStatus =

        "Completed";





    this.updateTime();



}









/*
----------------------------------------------

Update Date


----------------------------------------------

*/


updateShipDate(date){



    this.shipDate = date;



    this.updateTime();



}









/*
----------------------------------------------

Update Arrival Date


----------------------------------------------

*/


updateArrivalDate(date){



    this.arrivalDate = date;



    this.updateTime();



}









/*
----------------------------------------------

Update Time


----------------------------------------------

*/


updateTime(){



    this.updatedDate =



        new Date()

        .toISOString();



}









/*
----------------------------------------------

Get Total Quantity


----------------------------------------------

*/


getTotalQuantity(){



    let total = 0;





    this.items.forEach(item=>{



        total +=



            Number(

                item.quantity

            ) || 0;



    });





    return total;



}









/*
----------------------------------------------

Convert JSON


----------------------------------------------

*/


toJSON(){



    return {



        id:

            this.id,



        purchaseId:

            this.purchaseId,



        projectId:

            this.projectId,



        batchId:

            this.batchId,



        supplierId:

            this.supplierId,



        supplierName:

            this.supplierName,



        items:

            this.items,



        shipDate:

            this.shipDate,



        arrivalDate:

            this.arrivalDate,



        status:

            this.status,



        receiveStatus:

            this.receiveStatus



    };



}
```

}

window.ShipmentModel = ShipmentModel;
