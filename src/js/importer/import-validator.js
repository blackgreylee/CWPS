# /*

CWPS Enterprise

Import Validator

Sprint:

1.3.3

Build:

0001

Description:

Validate imported BOM data

==================================================
*/

class ImportValidator {

```
constructor(){



    this.errors = [];

    this.warnings = [];



}









/*
----------------------------------------------

Validate All


----------------------------------------------

*/


validate(

    rows,

    materials = []

){



    this.clear();





    this.validateEmptyCode(

        rows

    );





    this.validateDuplicateCode(

        rows

    );





    this.validateQuantity(

        rows

    );





    this.validateMaterial(

        rows,

        materials

    );





    this.validateHierarchy(

        rows

    );





    return {



        valid:

            this.errors.length === 0,



        errors:

            this.errors,



        warnings:

            this.warnings



    };



}









/*
----------------------------------------------

Empty Code Check

----------------------------------------------

*/


validateEmptyCode(rows){



    rows.forEach(row=>{



        if(

            !row.code

        ){



            this.errors.push({



                type:

                "EMPTY_CODE",



                message:

                "圖號不可為空"



            });



        }



    });



}









/*
----------------------------------------------

Duplicate Code Check


----------------------------------------------

*/


validateDuplicateCode(rows){



    let codes=[];





    rows.forEach(row=>{



        if(

            codes.includes(

                row.code

            )

        ){



            this.warnings.push({



                type:

                "DUPLICATE_CODE",



                code:

                row.code,



                message:

                "發現重複圖號"



            });



        }





        codes.push(

            row.code

        );



    });



}









/*
----------------------------------------------

Quantity Check

----------------------------------------------

*/


validateQuantity(rows){



    rows.forEach(row=>{



        if(

            row.quantity <= 0

        ){



            this.errors.push({



                type:

                "INVALID_QTY",



                code:

                row.code,



                message:

                "數量必須大於0"



            });



        }



    });



}









/*
----------------------------------------------

Material Check

----------------------------------------------

*/


validateMaterial(

    rows,

    materials

){



    let materialNames =

        materials.map(

            m =>

            m.materialName

        );





    rows.forEach(row=>{



        if(

            row.material

            &&

            !materialNames.includes(

                row.material

            )

        ){



            this.warnings.push({



                type:

                "UNKNOWN_MATERIAL",



                material:

                row.material,



                message:

                "材料主檔不存在"



            });



        }



    });



}









/*
----------------------------------------------

Hierarchy Check


AC001-1

必須存在 AC001


----------------------------------------------

*/


validateHierarchy(rows){



    let codes =

        rows.map(

            r=>r.code

        );





    rows.forEach(row=>{



        if(

            row.code.includes("-")

        ){



            let parent =

                row.code.split("-")[0];





            if(

                !codes.includes(

                    parent

                )

            ){



                this.errors.push({



                    type:

                    "MISSING_PARENT",



                    code:

                    row.code,



                    message:

                    "找不到父節點:" +

                    parent



                });



            }



        }



    });



}









/*
----------------------------------------------

Compare Existing BOM


----------------------------------------------

*/


compareExisting(

    oldRows,

    newRows

){



    let changes=[];





    oldRows.forEach(oldItem=>{



        let current =

            newRows.find(



                item =>

                item.code ===

                oldItem.code



            );





        if(

            current

            &&

            (

                current.quantity

                !==

                oldItem.quantity

            )

        ){



            changes.push({



                code:

                oldItem.code,



                old:

                oldItem.quantity,



                new:

                current.quantity



            });



        }



    });





    return changes;



}









/*
----------------------------------------------

Clear Result

----------------------------------------------

*/


clear(){



    this.errors=[];

    this.warnings=[];



}
```

}

window.ImportValidator = ImportValidator;
