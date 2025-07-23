let title    = document.getElementById('title');
let price    = document.getElementById('price');
let taxes    = document.getElementById('taxes');
let ads      = document.getElementById('ads');
let discount = document.getElementById('discount');
let total    = document.getElementById('total');
let count    = document.getElementById('count');
let category = document.getElementById('category');
let submit   = document.getElementById('submit');
let submood  = "create";
let tmp;
/*********************************************      
****************  Get Total  *****************
**********************************************/

function getTotal() {
    if (price.value != "") {
        let subtotal = (+price.value + +taxes.value + +ads.value);
        let numvalue = 0;
        if(discount.value !== "") {
            numvalue = parseFloat(discount.value) / 100; // تحويل قيمة الخصم إلى نسبة مئوية إذا كانت متوفرة
        }
        let discountAmount = subtotal * numvalue; // حساب قيمة الخصم بالقسمة على القيم الأخرى
        let result = subtotal - discountAmount; // حساب النتيجة الإجمالية بعد تطبيق الخصم
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    }else {
        total.innerHTML = "";
        total.style.backgroundColor = "#111";
    }
}

/*********************************************      
*************  Create Product  ***************
**********************************************/
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product);
}else {
    dataPro = [];
}



submit.onclick = function() {
    let newvalue = {
        title:    title.value.toLowerCase(),
        price:    price.value,
        taxes:    taxes.value,
        ads:      ads.value,
        discount: discount.value,
        total:    total.innerHTML,
        count:    count.value,
        category: category.value.toLowerCase(),
    }

    if(title.value != ""&& category.value != ""&& price.value !=""&& count.value < 101) {
    if (submood === "create") {
        if (newvalue.count > 1) {
        for (let i = 0; i < newvalue.count; i++) {
            dataPro.push(newvalue);
        }
        }else {
            dataPro.push(newvalue);
        }
    }else {
        dataPro [tmp] = newvalue;
        submood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
    }
    cleardata();
}
    
/*********************************************      
************  Save Localstorage  *************
**********************************************/
    localStorage.setItem("product", JSON.stringify(dataPro));
    showData();
}



/*********************************************      
***************  Clear Input  ****************
**********************************************/

function cleardata() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}

/*********************************************      
*******************  Read  *******************
**********************************************/

function showData() {
    getTotal();
    let table = ""
    for (let i = 0; i < dataPro.length; i++) {
        table += `
                    <tr>
                        <td>${[i+1]}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button id="delete"onclick="deleteData(${i})">delete</button></td>
                    </tr>
        `

    }
/*********************************************      
******************  Count  *******************
**********************************************/

    document.getElementById("tbody").innerHTML = table;
    let deletebtn = document.getElementById("deleteAll");
    if (dataPro.length > 0) {
        deletebtn.innerHTML = `
            <button onclick="deleteAll()">Delete All (${dataPro.length})</button>
        `
    }else {
        deletebtn.innerHTML = "";
    }
}
showData();



/*********************************************      
*****************  Delete  *******************
**********************************************/

function deleteData(i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData(); 
}

function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData(); 
}

/*********************************************      
*****************  Update  *******************
**********************************************/

function updateData(i) {
    title.value    = dataPro[i].title;
    price.value    = dataPro[i].price;
    taxes.value    = dataPro[i].taxes;
    ads.value      = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    category.value = dataPro[i].category;
    getTotal();
    count.style.display = 'none';
    submit.innerHTML = "Update";
    submood = "update";
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    });
}

/*********************************************      
*****************  Search  *******************
**********************************************/

let searchMood = "title";

function getSearchMood(id) {
    let search = document.getElementById("search");
    if(id == "searchTitle") {
        searchMood = "title";
    }else{
        searchMood = "category";
    }
    search.placeholder = "Search By" + searchMood;
    search.focus();
    search.value = "";
    showData();
}

function searchData(value) {
    let table = "";
    for(let i = 0; i < dataPro.length; i++) {
        if (searchMood == "title"){
                if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${[i]}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button id="delete"onclick="deleteData(${i})">delete</button></td>
                    </tr> `;
                }
        }else{
                if(dataPro[i].category.includes(value.toLowerCase())){
                table += `
                    <tr>
                        <td>${[i]}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">Update</button></td>
                        <td><button id="delete"onclick="deleteData(${i})">delete</button></td>
                    </tr> `;
                } 
        }
    }
    document.getElementById("tbody").innerHTML = table;
}

/*********************************************      
***************  Clean Data  *****************
**********************************************/