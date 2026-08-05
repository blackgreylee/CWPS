# /*

CWPS Enterprise

Material Requirement Engine

Sprint:

1.5.1

Build:

0001

Description:

Generate procurement requirements
from BOM data

==================================================
*/

class RequirementEngine {

```
constructor(){



    this.requirements = [];



}









/*
----------------------------------------------

Generate Requirement From BOM


BOM Tree

↓

Requirement List


----------------------------------------------

*/


generateFromBOM(

    bomTree,

    projectId,

    batchId

){



    let parts =

        this.flattenBOM(

            bomTree

        );





    let result = [];





    parts.forEach(node=>{



        if(

            this.isMaterialNode(

                node

            )

        ){



            let req =



                new RequirementModel({



                    projectId:

                        projectId,



                    batchId:

                        batchId,



                    materialId:

                        node.materialId || "",



                    materialCode:

                        node.code,



                    materialName:

                        node.name,



                    category:

                        node.category || "",



                    quantity:

                        node.quantity,



                    unit:

                        node.unit,



                    singleWeight:

                        node.singleWeight || 0



                });





            result.push(

                req

            );



        }



    });





    return this.mergeRequirements(

        result

    );



}









/*
----------------------------------------------

Flatten BOM


----------------------------------------------

*/


flattenBOM(

    tree

){



    let result = [];





    const walk = node => {



        result.push(

            node

        );





        if(

            node.children

        ){



            node.children.forEach(

                child =>

                walk(child)

            );



        }



    };





    tree.forEach(

        node =>

        walk(node)

    );





    return result;



}









/*
----------------------------------------------

Detect Material Node


----------------------------------------------

----------------------------------------------

*/


isMaterialNode(

    node

){



    return (



        node.type === "PART"



        ||



        node.type === "GLASS"



        ||



        node.material



    );



}









/*
----------------------------------------------

Merge Same Material


----------------------------------------------

----------------------------------------------

*/


mergeRequirements(

    list

){



    let map = {};





    list.forEach(req=>{



        let key =



            req.materialCode;



        if(

            !map[key]

        ){



            map[key] = req;



        }

        else{



            map[key].quantity +=



                req.quantity;



            map[key].calculateWeight();



        }



    });





    return Object.values(

        map

    );



}









/*
----------------------------------------------

Group Material Category


----------------------------------------------

----------------------------------------------

*/


groupByMaterial(

    requirements

){



    let groups = {};





    requirements.forEach(req=>{



        let key =

            req.category ||

            "未分類";





        if(

            !groups[key]

        ){



            groups[key]=[];



        }





        groups[key].push(

            req

        );



    });





    return groups;



}









/*
----------------------------------------------

Calculate Total Weight


----------------------------------------------

----------------------------------------------

*/


calculateWeight(

    requirements

){



    let total = 0;





    requirements.forEach(req=>{



        total +=



            req.calculateWeight();



    });





    return total;



}









/*
----------------------------------------------

Validate Requirement


----------------------------------------------

----------------------------------------------

*/


validateRequirement(

    requirement

){



    let errors=[];





    if(

        !requirement.materialCode

    ){



        errors.push(

            "缺少材料編號"

        );



    }





    if(

        requirement.quantity <= 0

    ){



        errors.push(

            "數量錯誤"

        );



    }





    return {



        valid:

            errors.length===0,



        errors:

            errors



    };



}









/*
----------------------------------------------

Summary


----------------------------------------------

----------------------------------------------

*/


summary(

    requirements

){



    return {



        materialCount:

            requirements.length,



        totalWeight:

            this.calculateWeight(

                requirements

            ),



        generatedDate:

            new Date()

            .toISOString()



    };



}
```

}

window.RequirementEngine = RequirementEngine;
