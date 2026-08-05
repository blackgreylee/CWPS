# /*

CWPS Enterprise

Material Aggregation Engine

Sprint:

1.3.2

Build:

0001

Description:

Material quantity and weight analysis engine

==================================================
*/

class MaterialEngine {

```
constructor(){


    this.summary = {};


}









/*
----------------------------------------------

Analyze Quantity Result


Input:


QuantityEngine Result


----------------------------------------------

*/


analyze(quantityResults, materials=[]){



    this.summary = {};




    quantityResults.forEach(item=>{



        if(!item.materialId){



            return;



        }





        let material =



            materials.find(



                m =>

                m.id === item.materialId



            );





        if(!material){



            return;



        }






        this.addMaterial(



            material,

            item.quantity



        );





    });





    return this.summary;



}









/*
----------------------------------------------

Add Material


----------------------------------------------

*/


addMaterial(material, quantity){



    let key = material.id;





    if(

        !this.summary[key]

    ){



        this.summary[key] = {



            materialId:

                material.id,



            code:

                material.materialCode,



            name:

                material.materialName,



            category:

                material.category,



            unit:

                material.unit,



            quantity:0,



            singleWeight:

                material.singleWeight,



            totalWeight:0



        };



    }






    this.summary[key].quantity

        += quantity;






    this.summary[key].totalWeight =



        this.summary[key].quantity *

        this.summary[key].singleWeight;




}









/*
----------------------------------------------

Group By Category


----------------------------------------------

*/


groupByCategory(){



    let result = {};





    Object.values(

        this.summary

    )

    .forEach(item=>{



        let category =

            item.category;





        if(

            !result[category]

        ){



            result[category] = [];



        }





        result[category].push(

            item

        );



    });





    return result;



}









/*
----------------------------------------------

Get Total Weight


----------------------------------------------

*/


getTotalWeight(){



    return Object.values(

        this.summary

    )

    .reduce(



        (

            total,

            item

        )=>



            total +

            item.totalWeight,



        0



    );



}









/*
----------------------------------------------

Get Purchase Summary


----------------------------------------------

*/


getPurchaseSummary(){



    return Object.values(

        this.summary

    )

    .map(item=>({



        materialCode:

            item.code,



        materialName:

            item.name,



        category:

            item.category,



        quantity:

            item.quantity,



        unit:

            item.unit,



        weight:

            item.totalWeight



    }));



}









/*
----------------------------------------------

Clear

----------------------------------------------

*/


clear(){



    this.summary = {};



}
```

}

window.MaterialEngine = MaterialEngine;
