# /*

CWPS Enterprise

BOM Report

Sprint:

1.9.1

Build:

0001

Description:

BOM structure analysis report engine

==================================================
*/

class BOMReport {

```
constructor(){



    this.bomEngine =

        null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    bomEngine

){



    this.bomEngine =

        bomEngine;



}









/*
----------------------------------------------

Generate BOM Report


----------------------------------------------

*/


generate(

    batchId

){



    let tree =



        this.bomEngine

        .getTree(

            batchId

        );









    let result = {



        batch:

            batchId,



        itemCount:

            0,



        materialCount:

            0,



        totalQuantity:

            0,



        materials:{},



        tree:tree



    };









    this.analyzeNode(

        tree,

        result

    );









    result.materialCount =



        Object.keys(

            result.materials

        ).length;









    return result;



}









/*
----------------------------------------------

Analyze BOM Node


----------------------------------------------

*/


analyzeNode(

    nodes,

    result

){



    if(

        !nodes

        ||

        nodes.length===0

    ){



        return;



    }









    nodes.forEach(

        node=>{



            result.itemCount++;









            if(

                node.material

            ){



                this.collectMaterial(

                    node,

                    result

                );



            }









            if(

                node.children

                &&

                node.children.length

            ){



                this.analyzeNode(

                    node.children,

                    result

                );



            }



        }

    );



}









/*
----------------------------------------------

Collect Material


----------------------------------------------

*/


collectMaterial(

    node,

    result

){



    let key =



        node.material.code

        ||

        node.material.name;









    if(

        !result.materials[key]

    ){



        result.materials[key]={



            code:

                node.material.code,



            name:

                node.material.name,



            unit:

                node.unit,



            quantity:0



        };



    }









    result.materials[key]

    .quantity +=



        Number(

            node.quantity || 0

        );









    result.totalQuantity +=



        Number(

            node.quantity || 0

        );



}









/*
----------------------------------------------

Material Summary


----------------------------------------------

*/


getMaterialSummary(

    report

){



    return Object.values(

        report.materials

    );



}









/*
----------------------------------------------

Export


----------------------------------------------

*/


exportJSON(

    batchId

){



    return JSON.stringify(

        this.generate(

            batchId

        ),

        null,

        4

    );



}









/*
----------------------------------------------

Compare Batch


----------------------------------------------

*/


compare(

    batchA,

    batchB

){



    let reportA =

        this.generate(

            batchA

        );





    let reportB =

        this.generate(

            batchB

        );









    return {



        batchA:

            reportA,



        batchB:

            reportB,



        difference:

            this.calculateDifference(

                reportA,

                reportB

            )



    };



}









/*
----------------------------------------------

Difference


----------------------------------------------

*/


calculateDifference(

    a,

    b

){



    return {



        itemDifference:

            b.itemCount -

            a.itemCount,



        quantityDifference:

            b.totalQuantity -

            a.totalQuantity



    };



}
```

}

window.BOMReport = BOMReport;
