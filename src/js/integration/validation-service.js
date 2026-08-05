# /*

CWPS Enterprise

Validation Service

Sprint:

1.6.4

Build:

0001

Description:

Data validation and warning service

==================================================
*/

class ValidationService {

```
constructor(){



    this.errors = [];



    this.warnings = [];



}









/*
----------------------------------------------

Reset Validation Result


----------------------------------------------

*/


reset(){



    this.errors = [];



    this.warnings = [];



}









/*
----------------------------------------------

Add Warning


----------------------------------------------

*/


warning(

    message,

    data = null

){



    this.warnings.push({



        message:

            message,



        data:

            data,



        time:



            new Date()

            .toISOString()



    });



}









/*
----------------------------------------------

Add Error


----------------------------------------------

*/


error(

    message,

    data = null

){



    this.errors.push({



        message:

            message,



        data:

            data,



        time:



            new Date()

            .toISOString()



    });



}









/*
----------------------------------------------

Validate Requirement Quantity


----------------------------------------------

----------------------------------------------

*/


validateRequirement(

    requirement,

    purchase

){



    let item =



        purchase.items.find(



            x =>



            x.materialCode ===

            requirement.materialCode



        );





    if(!item){



        this.error(

            "採購缺少材料",

            requirement

        );



        return false;



    }









    if(

        item.quantity <

        requirement.quantity

    ){



        this.warning(

            "採購數量不足",

            {



                required:

                    requirement.quantity,



                purchase:

                    item.quantity



            }

        );



    }





    return true;



}









/*
----------------------------------------------

Validate Quotation Price


----------------------------------------------

----------------------------------------------

*/


validateQuotationPrice(

    quotationEngine,

    materialCode

){



    let analysis =



        quotationEngine.priceAnalysis(

            materialCode

        );





    if(!analysis){



        return false;



    }









    quotationEngine

    .getByMaterial(

        materialCode

    )

    .forEach(item=>{



        if(

            item.unitPrice >

            analysis.average *

            1.3

        ){



            this.warning(

                "報價高於平均價格30%",

                item

            );



        }



    });





    return true;



}









/*
----------------------------------------------

Validate BOM Version Conflict


----------------------------------------------

----------------------------------------------

*/


validateBOMConflict(

    list

){



    let map = {};





    list.forEach(item=>{



        let key =



            item.code;



        if(

            map[key]

            &&

            map[key].quantity

            !==

            item.quantity

        ){



            this.warning(

                "BOM資料版本衝突",

                {



                    code:

                        item.code,



                    old:

                        map[key].quantity,



                    new:

                        item.quantity



                }

            );



        }





        map[key] = item;



    });





    return this.warnings;



}









/*
----------------------------------------------

Validate Shipment


----------------------------------------------

----------------------------------------------

*/


validateShipment(

    purchase,

    shipmentEngine

){



    purchase.items.forEach(item=>{



        let remain =



            shipmentEngine.getRemainingQuantity(



                purchase,



                item.materialCode



            );





        if(

            remain > 0

        ){



            this.warning(

                "尚有材料未交付",

                {



                    material:

                        item.materialCode,



                    remaining:

                        remain



                }

            );



        }



    });





    return this.warnings;



}









/*
----------------------------------------------

Validate Workflow


----------------------------------------------

----------------------------------------------

*/


validateWorkflow(

    from,

    to

){



    let rules = {



        Quotation:[

            "Purchase"

        ],



        Purchase:[

            "Shipment"

        ],



        Shipment:[

            "Invoice"

        ]



    };





    if(

        !rules[from]

        ||

        !rules[from]

        .includes(to)

    ){



        this.error(

            "流程順序錯誤",

            {

                from:

                    from,

                to:

                    to

            }

        );



        return false;



    }





    return true;



}









/*
----------------------------------------------

Result


----------------------------------------------

----------------------------------------------

*/


result(){



    return {



        success:



            this.errors.length === 0,





        errors:

            this.errors,





        warnings:

            this.warnings



    };



}
```

}

window.ValidationService = ValidationService;
