# /*

CWPS Enterprise

Material Report

Sprint:

1.9.2

Build:

0001

Description:

Material consumption analysis report

==================================================
*/

class MaterialReport {

```
constructor(){



    this.bomReport =

        null;



    this.materialModel =

        null;



}









/*
----------------------------------------------

Initialize


----------------------------------------------

*/


init(

    bomReport,

    materialModel

){



    this.bomReport =

        bomReport;



    this.materialModel =

        materialModel;



}









/*
----------------------------------------------

Generate Material Report


----------------------------------------------

*/


generate(

    batchId

){



    let bom =



        this.bomReport.generate(

            batchId

        );









    let materials =



        this.bomReport

        .getMaterialSummary(

            bom

        );









    let result = {



        batch:

            batchId,



        materials:[],



        summary:{



            kg:0,

            m:0,

            sqm:0,

            pcs:0,

            set:0



        }



    };









    materials.forEach(

        item=>{



            let reportItem =



            this.analyzeMaterial(

                item

            );









            result.materials.push(

                reportItem

            );









            this.addSummary(

                result.summary,

                reportItem

            );



        }

    );









    return result;



}









/*
----------------------------------------------

Analyze Single Material


----------------------------------------------

*/


analyzeMaterial(

    material

){



    let lossRate =



        material.lossRate

        ||

        0;









    let loss =



        material.quantity *

        (

            lossRate / 100

        );









    return {



        code:

            material.code,



        name:

            material.name,



        unit:

            material.unit,



        quantity:

            material.quantity,



        lossRate:

            lossRate,



        loss:

            loss,



        purchaseQuantity:



            material.quantity +

            loss



    };



}









/*
----------------------------------------------

Summary


----------------------------------------------

*/


addSummary(

    summary,

    item

){



    switch(

        item.unit

    ){



        case "kg":



            summary.kg +=

                item.purchaseQuantity;



            break;





        case "m":



            summary.m +=

                item.purchaseQuantity;



            break;





        case "㎡":



            summary.sqm +=

                item.purchaseQuantity;



            break;





        case "pcs":



            summary.pcs +=

                item.purchaseQuantity;



            break;





        case "set":



            summary.set +=

                item.purchaseQuantity;



            break;



    }



}









/*
----------------------------------------------

Calculate Weight


----------------------------------------------

*/


calculateWeight(

    length,

    weightPerMeter

){



    return Number(

        length

    )

    *

    Number(

        weightPerMeter

    );



}









/*
----------------------------------------------

Material Group


----------------------------------------------

*/


groupByCategory(

    report

){



    let groups = {};









    report.materials.forEach(

        item=>{



            let category =



                item.category

                ||

                "未分類";









            if(

                !groups[category]

            ){



                groups[category]=[];



            }









            groups[category]

            .push(

                item

            );



        }

    );









    return groups;



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
```

}

window.MaterialReport = MaterialReport;
