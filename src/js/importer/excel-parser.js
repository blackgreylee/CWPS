# /*

CWPS Enterprise

Excel BOM Parser

Sprint:

1.3.3

Build:

0001

Description:

Excel raw data parser and formatter

==================================================
*/

class ExcelParser {

```
constructor(){


    /*
    Excel Column Alias


    支援不同 Excel 欄位名稱


    */


    this.columnAlias = {



        code:[

            "圖號",

            "編號",

            "料號",

            "Code",

            "Item"

        ],




        name:[

            "名稱",

            "品名",

            "描述",

            "Name"

        ],




        quantity:[

            "數量",

            "Qty",

            "Quantity"

        ],




        unit:[

            "單位",

            "Unit"

        ],




        material:[

            "材料",

            "材質",

            "Material"

        ],




        remark:[

            "備註",

            "Remark"

        ]



    };


}









/*
----------------------------------------------

Parse Sheet


Input:

Excel Sheet JSON


Output:

Standard BOM Array


----------------------------------------------

*/


parse(sheetData){



    if(

        !Array.isArray(sheetData)

    ){



        throw new Error(

            "Invalid Excel Data"

        );



    }





    let header =

        sheetData[0];





    let rows =

        sheetData.slice(1);





    let mapping =

        this.detectColumns(

            header

        );





    return rows

        .map(

            row =>

            this.convertRow(

                row,

                mapping

            )

        )

        .filter(

            item =>

            item.code !== ""

        );



}









/*
----------------------------------------------

Detect Column Mapping


----------------------------------------------

*/


detectColumns(headers){



    let result = {};





    Object.keys(

        this.columnAlias

    )

    .forEach(key=>{





        let index =

            headers.findIndex(



                h =>

                this.columnAlias[key]

                .includes(h)



            );





        result[key] = index;



    });





    return result;



}









/*
----------------------------------------------

Convert Row


----------------------------------------------

*/


convertRow(row,mapping){



    return {



        code:

            this.getValue(

                row,

                mapping.code

            ),




        name:

            this.getValue(

                row,

                mapping.name

            ),




        quantity:

            Number(

                this.getValue(

                    row,

                    mapping.quantity

                )

            )

            || 0,





        unit:

            this.getValue(

                row,

                mapping.unit

            ),





        material:

            this.getValue(

                row,

                mapping.material

            ),




        remark:

            this.getValue(

                row,

                mapping.remark

            ),




        type:

            this.detectType(

                this.getValue(

                    row,

                    mapping.code

                )

            )



    };



}









/*
----------------------------------------------

Safe Get Value


----------------------------------------------

*/


getValue(row,index){



    if(

        index === -1 ||

        index === undefined

    ){



        return "";



    }





    return (

        row[index]

        ||

        ""

    ).toString().trim();



}









/*
----------------------------------------------

Detect BOM Type


規則:

AUxxx

ACxxx

其他加工件


----------------------------------------------

*/


detectType(code){



    if(

        !code

    ){



        return "PART";



    }





    code =

        code.toUpperCase();






    if(

        code.startsWith(

            "AU"

        )

    ){



        return "AU";



    }







    if(

        code.startsWith(

            "AC"

        )

    ){



        return "AC";



    }







    if(

        code.startsWith(

            "GL"

        )

    ){



        return "GLASS";



    }





    return "PART";



}









/*
----------------------------------------------

Add Custom Alias


----------------------------------------------

*/


addAlias(type,name){



    if(

        this.columnAlias[type]

    ){



        this.columnAlias[type]

        .push(name);



    }



}
```

}

window.ExcelParser = ExcelParser;
