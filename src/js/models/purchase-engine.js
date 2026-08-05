# /*

CWPS Enterprise

Purchase Order Engine

Sprint:

1.5.3

Build:

0001

Description:

Purchase order workflow engine

==================================================
*/

class PurchaseEngine {

```
constructor(){



    this.purchaseOrders = [];



}









/*
----------------------------------------------

Create Purchase Order


From Approved Quotation


----------------------------------------------

*/


createPurchaseOrder(

    quotation

){



    let purchase =



        new PurchaseModel({



            quotationId:

                quotation.id,



            projectId:

                quotation.projectId,



            batchId:

                quotation.batchId,



            supplierId:

                quotation.supplierId,



            supplierName:

                quotation.supplierName



        });







    purchase.addItem({



        materialCode:

            quotation.materialCode,



        materialName:

            quotation.materialName,



        quantity:

            quotation.quantity,



        unit:

            quotation.unit,



        unitPrice:

            quotation.unitPrice



    });





    this.purchaseOrders.push(

        purchase

    );





    return purchase;



}









/*
----------------------------------------------

Add Purchase Order


----------------------------------------------

*/


addPurchaseOrder(

    purchase

){



    this.purchaseOrders.push(

        purchase

    );





    return purchase;



}









/*
----------------------------------------------

Get All Purchase Orders


----------------------------------------------

*/


getAll(){



    return this.purchaseOrders;



}









/*
----------------------------------------------

Find Purchase Order


----------------------------------------------

*/


getById(

    id

){



    return this.purchaseOrders.find(



        item =>



        item.id === id



    );



}









/*
----------------------------------------------

Submit Purchase


----------------------------------------------

*/


submitPurchase(

    id

){



    let purchase =

        this.getById(

            id

        );





    if(!purchase){



        return null;



    }





    purchase.submit();





    return purchase;



}









/*
----------------------------------------------

Confirm Purchase


----------------------------------------------

----------------------------------------------

*/


confirmPurchase(

    id

){



    let purchase =

        this.getById(

            id

        );





    if(!purchase){



        return null;



    }





    purchase.confirm();





    return purchase;



}









/*
----------------------------------------------

Start Processing


----------------------------------------------

----------------------------------------------

*/


processing(

    id

){



    let purchase =

        this.getById(

            id

        );





    if(!purchase){



        return null;



    }





    purchase.processing();





    return purchase;



}









/*
----------------------------------------------

Complete Purchase


----------------------------------------------

----------------------------------------------

*/


complete(

    id

){



    let purchase =

        this.getById(

            id

        );





    if(!purchase){



        return null;



    }





    purchase.complete();





    return purchase;



}









/*
----------------------------------------------

Cancel Purchase


----------------------------------------------

----------------------------------------------

*/


cancel(

    id

){



    let purchase =

        this.getById(

            id

        );





    if(!purchase){



        return null;



    }





    purchase.cancel();





    return purchase;



}









/*
----------------------------------------------

Get Purchase By Supplier


----------------------------------------------

----------------------------------------------

*/


getBySupplier(

    supplierId

){



    return this.purchaseOrders.filter(



        item =>



        item.supplierId === supplierId



    );



}









/*
----------------------------------------------

Calculate Total Purchase Amount


----------------------------------------------

----------------------------------------------

*/


getTotalAmount(){



    let total = 0;





    this.purchaseOrders.forEach(po=>{



        total +=



            po.totalAmount;



    });





    return total;



}









/*
----------------------------------------------

Purchase Summary


----------------------------------------------

----------------------------------------------

*/


summary(){



    return {



        count:

            this.purchaseOrders.length,



        totalAmount:

            this.getTotalAmount(),



        generatedDate:

            new Date()

            .toISOString()



    };



}









/*
----------------------------------------------

Convert To Shipment Data


下一階段使用


----------------------------------------------

*/


prepareShipment(

    purchaseId

){



    let purchase =

        this.getById(

            purchaseId

        );





    if(!purchase){



        return null;



    }





    return {



        purchaseId:

            purchase.id,



        supplierId:

            purchase.supplierId,



        supplierName:

            purchase.supplierName,



        items:

            purchase.items,



        status:

            "Waiting Shipment"



    };



}
```

}

window.PurchaseEngine = PurchaseEngine;
