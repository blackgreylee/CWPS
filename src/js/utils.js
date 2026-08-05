# /*

CWPS Enterprise
Curtain Wall Procurement System

Utility Functions

Version:
Sprint 1.3.1
Build 0001

==================================================
*/

## /*

ID Generator

Format:

CWPS-YYYYMMDD-HHMMSS-RANDOM

---

*/

function generateCWPSId(prefix = "CWPS"){

```
const now = new Date();


const timestamp =

    now.getFullYear().toString()

    +

    String(now.getMonth()+1).padStart(2,"0")

    +

    String(now.getDate()).padStart(2,"0")

    +

    "-"

    +

    String(now.getHours()).padStart(2,"0")

    +

    String(now.getMinutes()).padStart(2,"0")

    +

    String(now.getSeconds()).padStart(2,"0");



const random =

    Math.floor(

        Math.random()*9000

    )

    +

    1000;



return (

    prefix

    +

    "-"

    +

    timestamp

    +

    "-"

    +

    random

);
```

}

## /*

Date Formatter

input:

Date Object

output:

YYYY-MM-DD

---

*/

function formatDate(date){

```
if(!date){

    return "";

}



const d =

    new Date(date);



return (

    d.getFullYear()

    +

    "-"

    +

    String(

        d.getMonth()+1

    ).padStart(2,"0")

    +

    "-"

    +

    String(

        d.getDate()

    ).padStart(2,"0")

);
```

}

## /*

Date Time Formatter

output:

YYYY-MM-DD HH:mm:ss

---

*/

function formatDateTime(date){

```
if(!date){

    return "";

}



const d =

    new Date(date);



return (

    formatDate(d)

    +

    " "

    +

    String(

        d.getHours()

    ).padStart(2,"0")

    +

    ":"

    +

    String(

        d.getMinutes()

    ).padStart(2,"0")

    +

    ":"

    +

    String(

        d.getSeconds()

    ).padStart(2,"0")

);
```

}

## /*

Number Formatter

Example:

1234567

=>

1,234,567

---

*/

function formatNumber(value){

```
if(

    value === null

    ||

    value === undefined

    ||

    value === ""

){

    return "0";

}



return Number(value)

    .toLocaleString();
```

}

## /*

Currency Formatter

---

*/

function formatCurrency(value){

```
return (

    "NT$ "

    +

    formatNumber(value)

);
```

}

## /*

Check Empty Value

---

*/

function isEmpty(value){

```
return (

    value === null

    ||

    value === undefined

    ||

    value === ""

);
```

}

## /*

Deep Clone Object

---

*/

function cloneObject(object){

```
return JSON.parse(

    JSON.stringify(object)

);
```

}

## /*

JSON Safe Parse

---

*/

function parseJSON(json, defaultValue = null){

```
try{


    return JSON.parse(json);


}

catch(error){


    return defaultValue;


}
```

}

## /*

Delay Function

Usage:

await delay(1000)

---

*/

function delay(milliseconds){

```
return new Promise(

    resolve =>

        setTimeout(

            resolve,

            milliseconds

        )

);
```

}

## /*

Array Utilities

---

*/

function findById(array,id){

```
if(!Array.isArray(array)){


    return null;


}



return array.find(

    item =>

        item.id === id

);
```

}

function removeById(array,id){

```
if(!Array.isArray(array)){


    return [];


}



return array.filter(

    item =>

        item.id !== id

);
```

}

## /*

Console Logger

---

*/

function cwpsLog(message,data=null){

```
console.log(

    "[CWPS]",

    message,

    data ?? ""

);
```

}

## /*

End of utils.js

---

*/
