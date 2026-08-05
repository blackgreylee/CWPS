# /*

CWPS Enterprise

Quantity Calculation Engine

Sprint:

1.3.2

Build:

0001

Description:

BOM quantity expansion engine

==================================================
*/

class QuantityEngine {

```
constructor(){


    this.results = [];


}









/*
----------------------------------------------

Calculate Single Tree


Root Node

   |

   Children


----------------------------------------------

*/


calculate(node, parentQty = 1){



    this.results = [];



    this.expandNode(

        node,

        parentQty

    );



    return this.results;



}









/*
----------------------------------------------

Recursive Expand


----------------------------------------------

*/


expandNode(node, parentQty){



    let totalQty =



        parentQty *

        (

            node.quantity || 1

        );





    this.results.push({



        id:node.id,


        code:node.code,


        name:node.name,


        type:node.type,


        quantity:totalQty,


        unit:node.unit,


        materialId:node.materialId



    });








    node.children.forEach(



        child => {



            this.expandNode(

                child,

                totalQty

            );



        }



    );



}










/*
----------------------------------------------

Calculate Multiple Root


Batch BOM


----------------------------------------------

*/


calculateBatch(nodes){



    this.results = [];





    nodes.forEach(node=>{



        this.expandNode(

            node,

            1

        );



    });





    return this.results;



}









/*
----------------------------------------------

Find Quantity By Code


----------------------------------------------

*/


getQuantity(code){



    let item =



        this.results.find(



            row =>

            row.code === code



        );




    return item

        ? item.quantity

        : 0;



}









/*
----------------------------------------------

Group Result By Material


----------------------------------------------

----------------------------------------------

*/


groupByMaterial(){



    let summary = {};





    this.results.forEach(item=>{



        if(

            !item.materialId

        ){

            return;

        }





        if(

            !summary[item.materialId]

        ){



            summary[item.materialId] = 0;



        }





        summary[item.materialId]

            += item.quantity;



    });





    return summary;



}









/*
----------------------------------------------

Clear Result

----------------------------------------------

*/


clear(){



    this.results = [];



}
```

}

window.QuantityEngine = QuantityEngine;
