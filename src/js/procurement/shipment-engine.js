# /*

CWPS Enterprise

Shipment Tracking Engine

Sprint:

1.5.4

Build:

0001

Description:

Shipment workflow and delivery tracking engine

==================================================
*/

class ShipmentEngine {

```
constructor(){



    this.shipments = [];



}









/*
----------------------------------------------

Create Shipment From Purchase Order


----------------------------------------------

*/


createShipment(

    purchase

){



    let shipment =



        new ShipmentModel({



            purchaseId:

                purchase.id,



            projectId:

                purchase.projectId,



            batchId:

                purchase.batchId,



            supplierId:

                purchase.supplierId,



            supplierName:

                purchase.supplierName



        });







    purchase.items.forEach(item=>{



        shipment.addItem({



            materialCode:

                item.materialCode,



            materialName:

                item.materialName,



            quantity:

                item.quantity,



            unit:

                item.unit



        });



    });





    this.shipments.push(

        shipment

    );





    return shipment;



}









/*
----------------------------------------------

Add Shipment


----------------------------------------------

*/


addShipment(

    shipment

){



    this.shipments.push(

        shipment

    );





    return shipment;



}









/*
----------------------------------------------

Get All Shipments


----------------------------------------------

*/


getAll(){



    return this.shipments;



}









/*
----------------------------------------------

Get Shipment By ID


----------------------------------------------

*/


getById(

    id

){



    return this.shipments.find(



        item =>



        item.id === id



    );



}









/*
----------------------------------------------

Get Shipments By Purchase


----------------------------------------------

----------------------------------------------

*/


getByPurchase(

    purchaseId

){



    return this.shipments.filter(



        item =>



        item.purchaseId === purchaseId



    );



}









/*
----------------------------------------------

Update Shipment Status


----------------------------------------------

----------------------------------------------

*/


updateStatus(

    shipmentId,

    status

){



    let shipment =



        this.getById(

            shipmentId

        );





    if(!shipment){



        return null;



    }





    switch(status){



        case "Preparing":



            shipment.prepare();

            break;





        case "Shipping":



            shipment.ship();

            break;





        case "Arrived":



            shipment.arrive();

            break;





        case "Checked":



            shipment.check();

            break;





        case "Completed":



            shipment.complete();

            break;



    }





    return shipment;



}









/*
----------------------------------------------

Calculate Delivered Quantity


----------------------------------------------

----------------------------------------------

*/


getDeliveredQuantity(

    purchaseId,

    materialCode

){



    let shipments =



        this.getByPurchase(

            purchaseId

        );





    let total = 0;





    shipments.forEach(ship=>{



        ship.items.forEach(item=>{



            if(

                item.materialCode === materialCode

            ){



                if(

                    ship.status === "Arrived"

                    ||

                    ship.status === "Checked"

                    ||

                    ship.status === "Completed"

                ){



                    total +=



                        item.quantity;



                }



            }



        });



    });





    return total;



}









/*
----------------------------------------------

Calculate Remaining Quantity


----------------------------------------------

----------------------------------------------

*/


getRemainingQuantity(

    purchase,

    materialCode

){



    let purchased = 0;





    purchase.items.forEach(item=>{



        if(

            item.materialCode === materialCode

        ){



            purchased =

                item.quantity;



        }



    });





    let delivered =



        this.getDeliveredQuantity(



            purchase.id,



            materialCode



        );





    return purchased - delivered;



}









/*
----------------------------------------------

Delivery Progress


----------------------------------------------

----------------------------------------------

*/


getProgress(

    purchase

){



    let total = 0;



    let delivered = 0;





    purchase.items.forEach(item=>{



        total +=

            item.quantity;





        delivered +=



            this.getDeliveredQuantity(



                purchase.id,



                item.materialCode



            );



    });





    let percent = 0;





    if(total > 0){



        percent =



            Math.round(



                delivered /

                total *

                100



            );



    }





    return {



        totalQuantity:

            total,



        deliveredQuantity:

            delivered,



        remainingQuantity:

            total - delivered,



        progress:

            percent + "%"



    };



}









/*
----------------------------------------------

Shipment Summary


----------------------------------------------

----------------------------------------------

*/


summary(){



    return {



        shipmentCount:

            this.shipments.length,



        completed:

            this.shipments.filter(



                item =>



                item.status === "Completed"



            ).length,



        generatedDate:

            new Date()

            .toISOString()



    };



}
```

}

window.ShipmentEngine = ShipmentEngine;
