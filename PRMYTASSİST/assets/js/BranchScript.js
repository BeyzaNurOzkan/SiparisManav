function orderRandomCode() {
    $.ajax({
        type: "POST",
        url: '/Order/randomOrderNo',
        success: function (Rnd) {
            $('#orderNewCode').val(Rnd);
            $('#orderNewCode2').val(Rnd);
            $('#orderNoAbs').text(Rnd);
            var a = $('#kt_datepicker_2').val();
            $('#orderdateabs').text(a);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Sipariş No bulunamadı", "error");
        }
    });
};
function UTCToday() {
    debugger
    var deneme = $('#kt_datepicker_2').val();
    var deneme2 = $('#kt_datepicker_21').val();
    var deneme3 = $('#kt_datepicker_report').val();

    if (deneme == "" || deneme2 == "" || deneme3 == "") {
        var myDate = new Date();
        var date = myDate;

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#kt_datepicker_2').val(today);
        $('#kt_datepicker_3').val(today);
        $('#kt_datepicker_21').val(today);
        $('#kt_datepicker_report').val(today);


    }
};
function getOrderProducts(groupId, branchID) {
    debugger
    var table = $("#tablenew_" + groupId);

    var date = $('#kt_datepicker_2').val();
    var t = table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Order/GetOrderProducts?groupId=' + groupId + '&branchCode=' + branchID + '&date=' + date,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        dom: `
            <'row'<'col-lg-3 text-left'f><'col-lg-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline ml-4 pt-2 mt-0 pb-2 mb-0',
            buttons: [
                'excel',
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        columns: [
            {
                data: 'Code',
                width: '1%',
            },
            {
                data: 'Name',
                orderable: false,
                className: 'dt-left',
                width: '15%',


            },
            {
                data: 'Code',
                orderable: false,
                width: '1%',


            },
            {
                data: 'Code',
                orderable: false,

            },
            {
                data: 'Code',
                className: 'dt-center',
                orderable: false,
            },

            {
                data: 'UnitWeight',
                width: '5%',

            },

            {
                data: 'MaxCapacity',
                className: 'dt-center',
                width: '5%',

            },
            {
                data: 'Code',
                className: 'dt-center',
                width: '5%',

            },
            {
                data: 'Comment',
            },
            {
                data: 'UnitPrices',
            },
        ],
        order: [[2, 'asc'], [1, 'asc']],
        columnDefs: [
            {
                orderable: false,
                targets: 0,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml = "";
                  
                        returnHtml = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;
                    return returnHtml;
                },
            },
            {
                targets: 2,
                width: '10px',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var Check = full['CheckBox'];
                    var returnHtml = "";
                    if (Check == "True")
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                    else
                        if ((full['MaxCapacity']) == 0) {
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> b </b> 
                                            <input disabled id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                        }
                        else
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml

                        returnHtml = `<div  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b></div> `;
                    return returnHtml;
                },
            },

            {
                targets: 5,
                className: 'dt-center',
                orderable: false,
                render: function (data, type, full, meta) {
                    var returnHtml = `<div  style="min-width:40px; font-size: 1.3rem;    text-align: center;"><b> ` + full['UnitWeight'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 9,
                width: '5%',
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var totalPrintFormat = full['UnitPrices'].toString();
                    var split = totalPrintFormat.split('.');
                    var last = "";
                    for (var i = split[0].length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                            last = last + ".";
                        }
                        last = last + split[0][split[0].length - i];
                    }
                    if (split.length > 1)
                        result = last + "," + split[1].substring(0, 2);
                    else
                        result = last + ",00";
                    var returnHtml = `<div style="min-width:60px; padding-left:10px; color:blue; padding-top: 2px;    text-align: center;"> ` + result + `</div> `;
                    return returnHtml;
                },
            },
            {
                targets: 4,
                orderable: false,
                width: '5%',
                className: 'dt-center',
                render: function (data, type, full, meta) {

                    if ((full['subtotal']) == "0" && full['CheckBox'] == "True")
                        full['subtotal'] = "Yok";

                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 45%;padding: 0rem 0.7rem;border-color: #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 45%;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }

                    var totalPrintFormat = full['subtotal'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var returnHtml;
                    if (full['subtotal'] == "Yok")
                        returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px;">
                                    <input disabled type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                    else
                        returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px; ">
                                    <input disabled type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                    //                    var returnHtml;
                    //                    returnHtml = `
                    //                            <div id="bc`+ full['ID'] + `" class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                    //                                    <input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="azalt(` + full['ID'] + `); toBasket(count_` + full['ID'] + `.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                    //                    if (full['subtotal'] != "") {
                    //                        returnHtml += `<input type="text" style="width: 50px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"  oninput= " hesapla(` + full['ID'] + `); toBasket(this.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)"  class="form-control" id="count_` + full['ID'] + `">`;
                    //                    }
                    //                    else {
                    //                        returnHtml += `<input type="text" style="width: 50px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="" oninput= "hesapla(` + full['ID'] + `); toBasket(this.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)" class="form-control" id="count_` + full['ID'] + `">
                    //`;
                    //                    }
                    //                    returnHtml += `<input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="arttir(` + full['ID'] + `); toBasket(count_` + full['ID'] + `.value,` + full['ID'] + `);  changeBG3(` + full['ID'] + `,` + branchID + `)"  id="subTotalPlus1_` + full['ID'] + `"/>
                    //                            </div>`;
                    return returnHtml;
                },
            },
            {
                targets: 6,
                orderable: false,
                width: '7%',
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {

                    var totalPrintFormat = full['MaxCapacity'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var returnHtml = `
                            <input hidden id = "MaxCapacity_` + full["ID"] + `" style=" font-size: 1.3rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['MaxCapacity'] + `"  name="demo0" placeholder="">
                            <input disabled  style=" font-size: 1.3rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + last + `"  placeholder="">`;
                    return returnHtml;
                },
            },
            {
                targets: 3,
                className: '',
                width: '11%',
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml;
                    var colorUnit;

                    if ((full['MaxCapacity']) == 0) {
                        full['quantity'] = "0";
                    }
                    if ((full['ProductUnitName']) == null) {
                        full['ProductUnitName'] = "-";
                    }
                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }
                    var discount = 1;
                   
                    if (full['quantity'] != "") {
                        if ((full['MaxCapacity']) == 0) {
                            returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"    id="subTotalNeg_` + full['ID'] + `"/>
                                    <input disabled required type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: red;" value="`+ full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInput(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" /> ` + colorUnit + `
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+"  id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        else
                            returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg(` + full["ID"] + `,` + branchID + `,` + discount + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input required type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="`+ full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInput(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    else {
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNeg(` + full["ID"] + `,` + branchID + `,` + discount + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input required type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInput(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  >` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 7,
                width: '7%',
                orderable: false,
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {
                    var id = full["ID"];
                    var tr = $(this).parents('tr');
                    var siparismiktar = full['quantity'];
                    if (full['subtotal'] != "") {
                        var eldekistok = full['subtotal'];
                    }
                    else {
                        var eldekistok = 0;
                    }
                    var MaxCapacity = full['MaxCapacity'];
                    var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);
                    if (isNaN(x))
                        x = "-";
                    //changeOrderControl(full["ID"], x, MaxCapacity)
                    var returnHtml;
                    if (x == 0) {
                        returnHtml = `<input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px;color:green;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
                        <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    else if (x > 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="+` + x + `" name="demo0" placeholder="">
                            <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type = "text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "+` + last + `" name = "demo0" placeholder = "" >`;

                    }
                    else if (x < 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input disabled id = "OrderControlPoint_` + full["ID"] + `" style="font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type="text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + last + `" name="demo0" placeholder="">
                            <input hidden id="OrderControl_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    else {

                        returnHtml = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type="text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
                        <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    return returnHtml;

                },
            },
            {
                targets: 8,
                className: 'dt-center',
                width: '10%',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['Comment'];
                    var output;
                    if ((full['MaxCapacity']) == 0) {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input disabled autocomplete="off" type="text"  value="" style="min-width:100px;background-color:#f5e9f0;border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                    }
                    else if (name != null) {
                        output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" style="min-width:100px;background-color: #f5e9f0;     border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                    }
                    else {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  value="" style="min-width:100px;background-color:#f5e9f0;border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                    }

                    return output;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });

    table.on('change', '.SelectBranch', function () {

        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');
        var id = $(this).val();
        var discount = document.getElementById(`discount_` + id);
        var OrderControl = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
        var OrderControl2 = document.getElementById(`OrderControlPoint_` + id);


        if (checked == true) {

            $(this).prop('checked', true);
            siparismiktar2.style.color = "blue";
            siparismiktar.value = "Yok";
            siparismiktar2.value = "Yok";
            OrderControl.value = "-";
            OrderControl2.value = "-";
            BasketToCheck(true, id, discount.value);

        }
        else {

            $(this).prop('checked', false);
            $(this).closest('tr').removeClass('active');

            OrderControl.value = 0;
            OrderControl2.value = 0;
            siparismiktar2.style.color = "black";
            siparismiktar.value = 0;
            siparismiktar2.value = 0;

            BasketToCheck(false, id, discount.value);
        }
    });
    table.on('change', 'tbody tr .kt-checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });

};
function getCategoryForOrder(id) {
    var table = $('#kt_table_braches');
    table.DataTable({
        ajax: {
            url: '/Branch/GetUserBranch?id=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
            },
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline  pt-2 mt-0 pb-2 mb-0',
            buttons: [
                'excel',
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        columns: [
            { data: 'deneme' },
            { data: 'BranchName' },
            { data: 'BranchCode' },
            { data: 'BranchCreatedDate' },

        ],
        // Order settings
        order: [[1, 'asc']],
        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                        <input type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
        },
        columnDefs: [
            {
                targets: 0,
                width: '10px',
                className: 'dt-right',
                orderable: false,
                render: function (data, type, full, meta) {
                    var branchId = full['ID'];
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                    for (let user of full['User']) {
                        for (let branch of user['Branches']) {

                            if (branch['BranchId'] == branchId) {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input checked type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                                break;
                            }
                            else {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                            }
                        }
                        break;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var id = full['BranchCreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    table.on('change', '.kt-group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $(this).prop('checked', true);
                $(this).closest('tr').addClass('active');
            }
            else {
                $(this).prop('checked', false);
                $(this).closest('tr').removeClass('active');
            }
        });
    });
    table.on('change', 'tbody tr .kt-checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
};
function getOrderAbs(branchID) {

    var d = 0;
    var z = "";
    var table = $("#tableOrderAbstract");
    var t = table.DataTable({
        "bDestroy": true,
        paging: true,
        ajax: {
            url: '/Order/getOrderAbs?branchID=' + branchID,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
            <'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline  pt-2 mt-0 pb-2 mb-0',
            buttons: [
                {
                    extend: 'excelHtml5',
                    footer: true,
                    exportOptions: {
                        columns: ':visible',
                        orthogonal: 'export'
                    },
                    customize: function (xlsx) {

                        var sheet = xlsx.xl.worksheets['sheet1.xml'];
                        // jQuery selector to add a border
                        $('c[r=A1] t', sheet).text('Günlük Hal Siparişi');
                        $('row c[r*="A"]', sheet).attr('s', '25');
                        $('row c[r*="B"]', sheet).attr('s', '25');
                        $('row c[r*="C"]', sheet).attr('s', '25');
                        $('row c[r*="D"]', sheet).attr('s', '25');
                        $('row c[r*="E"]', sheet).attr('s', '25');
                        $('row c[r*="F"]', sheet).attr('s', '25');
                        $('row c[r*="G"]', sheet).attr('s', '25');
                        $('row c[r*="H"]', sheet).attr('s', '25');
                        $('row c[r*="I"]', sheet).attr('s', '25');
                        $('row c[r*="J"]', sheet).attr('s', '25');

                        $('row c[r="A2"]', sheet).attr('s', '47');
                        $('row c[r="B2"]', sheet).attr('s', '47');
                        $('row c[r="C2"]', sheet).attr('s', '47');
                        $('row c[r="D2"]', sheet).attr('s', '47');
                        $('row c[r="E2"]', sheet).attr('s', '47');
                        $('row c[r="F2"]', sheet).attr('s', '47');
                        $('row c[r="G2"]', sheet).attr('s', '47');
                        $('row c[r="H2"]', sheet).attr('s', '47');
                        $('row c[r="I2"]', sheet).attr('s', '47');
                        $('row c[r="J2"]', sheet).attr('s', '47');
                        $('c[r=A21] t', sheet).text('');
                        $('c[r=B21] t', sheet).text('');
                        $('c[r=C21] t', sheet).text('');
                        $('c[r=D21] t', sheet).text('');
                        $('row:first c', sheet).attr('s', '51');
                        $('row:last c', sheet).attr('s', '47');
                    },
                    customizeData: function (data) {
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][4] = '\u200C' + data.body[i][4];
                            }

                        }
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][2] = '\u200C' + data.body[i][2];
                            }
                        }
                        for (var i = 0; i < data.body.length; i++) {
                            for (var j = 0; j < data.body[i].length; j++) {
                                data.body[i][0] = (i + 1);
                            }
                        }
                        for (var i = 0; i < data.footer.length; i++) {

                            data.footer[2] = '\u200C' + data.footer[2];
                            data.footer[4] = '\u200C' + data.footer[4];
                        }
                    }
                },
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        initComplete: function () {
            this.api().columns([1]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Ürün Grubu</option></select>')
                    .appendTo($(column.header()))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>')
                });
            });
        },
        columns: [
            {
                targets: 0,
                width: '10%',
                className: 'dt-center',
                orderable: false,
                "render": function (data, type, full, meta) {
                    return `<div style="width:100%;"> ` + (meta.row + 1) + `</div> `;
                }
            },
            {
                data: 'Group',
                orderable: false,
                width: '10%',

            },
            {
                data: 'Code',
                orderable: false,
                className: 'dt-center',
                width: '8%',

            },
            {
                data: 'Name',

            },
            {
                data: 'ProductUnitName',
                orderable: false,

            },
            {
                data: 'subtotal',
                className: 'dt-center',
                width: '20px',
                orderable: false,

            },
            {
                data: 'quantity',
                className: 'dt-center',
                orderable: false,
                width: '5%',

            },
            {
                data: 'MaxCapacity',
                className: 'dt-center',
                orderable: false,
                width: '5%',

            },
            {
                data: 'subtotal',
                className: 'dt-center',
                orderable: false,
                width: '5%',

            },
            {
                data: 'Comment',
                className: 'dt-center',
                orderable: false,

            },
            {
                data: 'Group2',
                visible: false

            },
        ],
        order: [[10, 'asc'], [3, 'asc']],
        columnDefs: [
            {
                targets: 2,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div"><b style="color:blue;"> ` + full['Code'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 4,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div style="text-transform: uppercase;"><b > ` + full['ProductUnitName'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 5,
                className: '',
                render: function (data, type, full, meta) {

                    var subtotal = full['subtotal'];

                    if (full['CheckBox'] == true) {
                        subtotal = "Yok";
                    }
                    var returnHtml;
                    if (subtotal == "Yok")
                        returnHtml = `<div"><b style="color:blue;"> ` + subtotal + `</b></div> `;
                    else {
                        var totalPrintFormatt = full['subtotal'].toString();
                        var lastt = "";
                        for (var i = totalPrintFormatt.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormatt.length && totalPrintFormatt.length > 3) {
                                lastt = lastt + ".";
                            }
                            lastt = lastt + totalPrintFormatt[totalPrintFormatt.length - i];
                        }
                        returnHtml = `<div"><b > ` + lastt + `</b></div> `;
                    }
                    if (full['subtotal'] == "Yok")
                        full['subtotal'] = 0
                    return returnHtml;
                },
            },
            {
                targets: 6,
                className: '',
                render: function (data, type, full, meta) {
                    var totalPrintFormatt = full['quantity'].toString();
                    var lastt = "";
                    for (var i = totalPrintFormatt.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormatt.length && totalPrintFormatt.length > 3) {
                            lastt = lastt + ".";
                        }
                        lastt = lastt + totalPrintFormatt[totalPrintFormatt.length - i];
                    }
                    returnHtml = `<div"><b > ` + lastt + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 7,
                className: '',
                render: function (data, type, full, meta) {
                    var totalPrintFormatt = full['MaxCapacity'].toString();
                    var lastt = "";
                    for (var i = totalPrintFormatt.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormatt.length && totalPrintFormatt.length > 3) {
                            lastt = lastt + ".";
                        }
                        lastt = lastt + totalPrintFormatt[totalPrintFormatt.length - i];
                    }
                    returnHtml = `<div"><b > ` + lastt + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 3,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div"><b style="color:red;"> ` + full['Name'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 8,
                render: function (data, type, full, meta) {
                    var siparismiktar = full['quantity'];
                    if (full['subtotal'] != "") {
                        var eldekistok = full['subtotal'];
                    }

                    else {
                        var eldekistok = 0;
                    }
                    var MaxCapacity = full['MaxCapacity'];
                    var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);
                    if (isNaN(x))
                        x = "-";
                    if (x > 0 || x < 0) {
                        d = d + x;
                        z = z + "," + full['ID'];
                        var split = z.split(",");
                        for (var i = 0; i < split.length - 1; i++) {
                            if (split[i] == full['ID']) {
                                d = d - x;
                                split.splice(-1, 1);
                                z = split.join(',');
                            }
                        }
                    }
                    var returnHtml;
                    if (x == 0) {
                        returnHtml = `<div style="width:100%; color:green; font-weight: bold; ">` + x + `</div>`;
                    }
                    else if (x > 0) {
                        var totalPrintFormatt = x.toString();
                        var lastt = "";
                        for (var i = totalPrintFormatt.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormatt.length && totalPrintFormatt.length > 3) {
                                lastt = lastt + ".";
                            }
                            lastt = lastt + totalPrintFormatt[totalPrintFormatt.length - i];
                        }
                        returnHtml = `<div style="width:100%; color:blue; font-weight: bold; ">` + lastt + `</div>`;

                    }
                    else {
                        var totalPrintFormatt = x.toString();
                        var lastt = "";
                        for (var i = totalPrintFormatt.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormatt.length && totalPrintFormatt.length > 3) {
                                lastt = lastt + ".";
                            }
                            lastt = lastt + totalPrintFormatt[totalPrintFormatt.length - i];
                        }
                        returnHtml = `<div style="width:100%; color:red; font-weight: bold; ">` + lastt + `</div>`;
                    }


                    return returnHtml;
                }
            },
        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

        "footerCallback": function (row, data, start, end, display) {
            debugger
            var api = this.api(), data;
            // converting to interger to find total
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // computing column Total of the complete result 


            var tueTotal = api
                .column(5)
                .data()
                .reduce(function (a, b) {
                    return intVal(a) + intVal(b);
                }, 0);

            var totalPrintFormat = tueTotal.toString();
            var last = "";
            for (var i = totalPrintFormat.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                    last = last + ".";
                }
                last = last + totalPrintFormat[totalPrintFormat.length - i];
            }

            var wedTotal = api
                .column(6)
                .data()
                .reduce(function (a, b) {
                    var result = intVal(a) + intVal(b);
                    return result
                }, 0);

            var totalPrintFormat2 = wedTotal.toString();
            var last2 = "";
            for (var i = totalPrintFormat2.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                    last2 = last2 + ".";
                }
                last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
            }


            // Update footer by showing the total with the reference of the column index 
            $(api.column(0).footer()).html(' ').addClass("bg-primary dt-center");
            $(api.column(1).footer()).html(' ').addClass("bg-primary dt-center");
            $(api.column(2).footer()).html(' ').addClass("bg-primary dt-center");
            $(api.column(3).footer()).html('Toplam').addClass("bg-primary dt-center");
            $(api.column(5).footer()).html(last).addClass("dt-center bg-primary");
            $(api.column(6).footer()).html(last2).addClass("bg-primary");
            $(api.column(7).footer()).html('').addClass("bg-primary");
            $(api.column(8).footer()).html('').addClass("bg-primary");
            $(api.column(9).footer()).html('').addClass("bg-primary dt-center");
            d = 0;
            z = "";

        },

    });
    t.on('draw.dt', function () {
        var PageInfo = $('#tableOrderAbstract').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
function ProductFormat(branchID) {
    $.ajax({
        type: "POST",
        url: '/Order/ProductFormat?branchID=' + branchID,
        success: function (Total) {
            $('#FormatName').val(Total);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function getEditLogoCompany1() {
    companyLogoCode = 50598;
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/companyLogoLayout?companyLogoCode=' + companyLogoCode,
        success: function (data) {
            debugger
            $('#companyLogoLayout').attr('src', data['SettingsVal']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function UTCWeekforBranchOrderList() {
    debugger
    var deneme = $('#StartDate').val();
    var deneme1 = $('#EndDate').val();

    if (deneme1 == "") {
        var myDate = new Date();
        var date = myDate;

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#EndDate').val(today);
    }

    if (deneme == "") {
        var myDate = new Date();
        var date = myDate;
        date.setDate(date.getDate() - 7);
        var day = date.getDate();

        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = day + "/" + month + "/" + year;

        $('#StartDate').val(today);
    }
};
function getBranchOrderList(StartDate, EndDate, UserID) {
    debugger
    var table = $('#kt_table_getBranchOrderList');
    var t = table.DataTable({
        ajax: {
            url: '/Branch/GetOrder?StartDate=' + StartDate + '&EndDate=' + EndDate + '&UserID=' + UserID,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-lg-3 text-left'f><'col-lg-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,
        colReorder: true,
        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline ml-4 pt-2 mt-0 pb-2 mb-0 Excel',
            buttons: [
                'excel',
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        initComplete: function () {
            this.api().columns([3]).every(function () {
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Şube Adı</option></select>')
                    .appendTo($(column.header()))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );
                        var StartDate = $('#StartDate').val();
                        var EndDate = $('#EndDate').val();
                        OrderCountAndAppCount(val, StartDate, EndDate);
                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {

                    select.append('<option value="' + d + '">' + d + '</option>')

                });
            });
            this.api().columns([4]).every(function () {
                var bekleme = "Beklemede";
                var onaylı = "Onaylandı";
                var red = "Red";
                var column = this;
                $(column.header()).empty();
                var select = $('<select class="bootstrap-select" style="width:100%; font-weight: bold; font-family:segoe ui;"><option value="">Onay Durumu</option></select>')
                    .appendTo($(column.header()))
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        column
                            .search(val ? '^' + val + '$' : '', true, false)
                            .draw();
                    });

                column.data().unique().sort().each(function (d, j) {

                    if (d == 0) {
                        select.append('<option value="' + bekleme + '">' + bekleme + '</option>')
                    }
                    else if (d == 1) {
                        select.append('<option value="' + onaylı + '">' + onaylı + '</option>')
                    }
                    else {
                        select.append('<option value="' + red + '">' + red + '</option>')
                    }
                });
            });
        },

        columns: [
            {
                data: 'S/N',
                orderable: false,
                className: 'dt-center',
                searchable: false,

            },
            {
                data: 'OrderNo',
                className: 'dt-center',
                orderable: false,
                width: "8%",

            },
            {
                data: 'CreateDate',
                className: 'dt-center font-weight-bold',
                width: "12%",

            },
            {

                data: 'BranchName',
                orderable: false,
                className: 'font-weight-bold',

            },
            {
                data: 'ApprovalStatus',
                className: 'dt-center',
                orderable: false,
            },
            {
                data: 'NumberofProduct',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'Safe',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'Point',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'Box',
                className: 'font-weight-bold dt-center',
                orderable: false,
            },
            {
                data: 'UserName',
                orderable: false,
                width: "14%",
            },
            {
                data: 'İşlemler',
                width: "8%",
            },
        ],
        order: [[1, 'desc']],

        columnDefs: [
            {
                targets: -1,
                title: 'İşlemler',
                orderable: false,
                "width": "14%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ApprovalStatus']) {
                        case 0:
                            result = `

                         <a onclick="DeleteBranchOrder(` + full['ID'] + `)" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Sil">
                         <i class="la la-trash"></i>
                         </a>
                         `;
                            break;

                        case 1:
                            result = `
                         <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
                         <i class="la la-eye"></i>
                         </a>
                         `;
                            break
                        case 2:
                            result = `
                        <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"  class="btn btn-sm btn-clean btn-icon btn-icon-md" title="Görüntüle">
                         <i class="la la-eye"></i>
                         </a>
                         `;
                            break;
                    }
                    return result;
                }
            },

            {
                targets: 4,
                title: 'Onay Durumu',
                orderable: false,
                "width": "14%",
                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ApprovalStatus']) {
                        case 0:
                            result = `<a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"><span style="width: 100%;"><span class="kt-badge  kt-badge--brand kt-badge--inline kt-badge--pill" style="width: 100%; font-size: 11px; height: 20px; text-align: center;">Beklemede</span></span></a>`;
                            break;
                        case 1:
                            result = `<a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"><span style="width: 100%;"><span class="kt-badge  kt-badge--success  kt-badge--inline kt-badge--pill" style="width: 100%; font-size: 11px; height: 20px; text-align: center;">Onaylandı</span></span></a>`;
                            break;
                        case 2:
                            result = `<a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList"><span style="width: 100%;"><span class="kt-badge  kt-badge--danger  kt-badge--inline kt-badge--pill" style="width: 100%; font-size: 11px; height: 20px; text-align: center;">Red</span></span></a>`;
                            break;

                    }
                    return result;
                }
            },
            {
                targets: 2,
                render: function (data, type, full, meta) {
                    var id = full['CreateDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm');
                    return result;
                },
            },
            {
                targets: 5,
                render: function (data, type, full, meta) {
                    var result = `<div class="pt-2" style="text-align: center;">` + full['NumberofProduct'] + ` </div>`;
                    return result;
                },
            },
            {
                targets: 6,
                render: function (data, type, full, meta) {
                    var totalPrintFormat = full['Safe'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var result = `<div class="pt-2" style="text-align: center;">` + last + ` </div>`;
                    return result;
                },
            },
            {
                targets: 7,
                render: function (data, type, full, meta) {
                    var totalPrintFormat = full['Point'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var result = `<div class="pt-2" style="text-align: center;">` + last + ` </div>`;
                    return result;
                },
            },
            {
                targets: 0,
                render: function (data, type, full, meta) {

                    result = ``;

                    return result;
                }

            },
            {
                targets: 1,
                title: 'Siparis No',

                render: function (data, type, full, meta) {
                    var id = full['ID'];
                    var result = "";
                    switch (full['ApprovalStatus']) {
                        case 0:
                            result = ` <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn pt-0 mt-0 pb-0 mb-0"  title="" style=" cursor: pointer; font-size: 11px;     font-weight: bold; color:blue;" >` + full['OrderNo'] + `</a>`;
                            break
                        case 1:
                            result = ` <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn pt-0 mt-0 pb-0 mb-0"  title="" style="cursor: pointer; font-size: 11px;     font-weight: bold;  color:blue;" >` + full['OrderNo'] + `</a>`;
                            break
                        case 2:
                            result = ` <a href="/Center/StateOrderListViewOff?id=` + full['ID'] + `" onclick="ShowBranchOrderList" class="btn pt-0 mt-0 pb-0 mb-0"  title="" style=" cursor: pointer; font-size: 11px;     font-weight: bold;  color:blue;" >` + full['OrderNo'] + `</a>`;
                            break
                    }
                    return result;
                }
            },
            {
                targets: 3,
                orderable: false,
                "width": "15%",

                render: function (data, type, full, meta) {
                    var id = full['BranchName'];
                    result = `<span style="color:red;">` + id + `</span>`;

                    return result;
                }
            },
            {
                targets: 8,
                render: function (data, type, full, meta) {
                    result = "";
                    if (full['Box'] != "") {

                        var totalPrintFormat = full['Box'].toString();
                        var split = totalPrintFormat.split('.');
                        var last = "";
                        for (var i = split[0].length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                                last = last + ".";
                            }
                            last = last + split[0][split[0].length - i];
                        }
                        if (split.length > 1)
                            result = last + "," + split[1].substring(0, 2);
                        else
                            result = last + ",00";
                    }
                    var result = `<div class="pt-2" style="text-align: center;">` + result + ` </div>`;
                    return result;
                }
            },
        ],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });

    t.on('draw.dt', function () {
        var PageInfo = $('#kt_table_getBranchOrderList').DataTable().page.info();
        t.column(0, { page: 'current' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1 + PageInfo.start;
        });
    });
};
$('#kt_datepicker_2').change(function myfunction() {
    debugger
    $('#kt_datepicker_3').datepicker('hide');
    var dateID = $('#kt_datepicker_2').val();
    $('#kt_datepicker_3').val(dateID);
    var branchID = $('#branch').val();
    $("#groupIds > option").each(function () {
        getOrderProducts(this.value, branchID);
    });


    getStockProducts(dateID);
    var region = $('#branchForRegionsDisSelect').val();
    var format = $('#branchForFormatsDisSelect').val();
    var url = window.location.href;
    var OrderCode = url.substring(url.lastIndexOf('=') + 1);
    if (url == OrderCode) {
        OrderCode = 0;
    }
    getBranchesToDist(region, format, OrderCode, dateID);
});
$('#branch').change(function () {
    var id = this.value;
    $("#groupIds > option").each(function () {
        getOrderProducts(this.value, id);
    });
});
$('#branch').change(function () {

    var branchID = $('#branch').val();
    ProductFormat(branchID);
    orderAbsBranch(branchID);
    getOrderAbs(branchID);
});
function reloadtableabs() {
    var branchID = $('#branch').val();
    $.ajax({
        type: "POST",
        url: '/Order/orderAbsBranch?branchID=' + branchID,
        success: function (brnch) {
            $('#orderAbsBranch').val('Sipariş Özeti - ' + brnch);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Sipariş No bulunamadı", "error");
        }
    });
    getOrderAbs(branchID);
};
function getProductGroup2(ProductGroup, branchID) {
    debugger
    var tab = document.getElementById(`myTab`);
    tab.innerHTML = '';
    $.ajax({
        type: "POST",
        url: '/Order/getProductGroup2?ProductGroup=' + ProductGroup + '&branchID=' + branchID,
        success: function (data) {
            debugger
            var c = data.data.length;
            var z = c;
            var control = 0;
            for (var i = 0; i < c; i++) {
                if (data.data[i]['Count'] != 0) {

                    if (data.data[i]['Priority'] != 0) {

                        if (z > i && i != 0 || i == 0) {
                            z = i;
                        }
                        if (i == z) {
                            control = 1;
                            tab.innerHTML += ` <li class="nav-item mt-1 mb-2" style=" border: 1px solid #003366; background-color: #ffb82236; border-radius: 0.25rem; ">
      <a class="nav-link active" style = "min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#TabPanel_" role = "tab" aria-controls="profile" aria-selected="false" onclick="reloadtable(` + data.data[i]['ID'] + `)"> <b>` + data.data[i]['Name'] + ` (` + data.data[i]['Count'] + `)</b></a>
                                        </li>`;
                            reloadtable(data.data[i]['ID']);
                        }
                        else {
                            tab.innerHTML += ` <li class="nav-item mt-1 mb-2" style=" border: 1px solid #003366; background-color: #ffb82236; border-radius: 0.25rem; ">
      <a class="nav-link" style = "min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#TabPanel_" role = "tab" aria-controls="profile" aria-selected="false"onclick="reloadtable(` + data.data[i]['ID'] + `)" > <b>` + data.data[i]['Name'] + ` (` + data.data[i]['Count'] + `)</b></a>
                                        </li>`;
                        }
                    }

                }
            }
            for (var i = 0; i < c; i++) {
                if (data.data[i]['Count'] != 0) {

                    if (data.data[i]['Priority'] == 0) {

                        if (z > i && i != 0 || i == 0) {
                            z = i;
                        }
                        if (i == z && control == 0) {
                            tab.innerHTML += ` <li class="nav-item mt-1 mb-2" style=" border: 1px solid #003366; background-color: #ffb82236; border-radius: 0.25rem; ">
      <a class="nav-link active" style = "min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#TabPanel_" role = "tab" aria-controls="profile" aria-selected="false" onclick="reloadtable(` + data.data[i]['ID'] + `)"> <b>` + data.data[i]['Name'] + ` (` + data.data[i]['Count'] + `)</b></a>
                                        </li>`;
                            reloadtable(data.data[i]['ID']);
                        }
                        else {
                            tab.innerHTML += ` <li class="nav-item mt-1 mb-2" style=" border: 1px solid #003366; background-color: #ffb82236; border-radius: 0.25rem; ">
      <a class="nav-link" style = "min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#TabPanel_" role = "tab" aria-controls="profile" aria-selected="false"onclick="reloadtable(` + data.data[i]['ID'] + `)" > <b>` + data.data[i]['Name'] + ` (` + data.data[i]['Count'] + `)</b></a>
                                        </li>`;
                        }
                    }

                }
            }

            tab.innerHTML += `<li class="nav-item mt-1 mb-2" style="border: 1px solid #003366; background-color: #ffb82236; border-radius: 0.25rem; ">
                <a class="nav-link" style="min-width: 100px; text-align: center;" id="profile-tab" data-toggle="tab" href="#OrderBrief" role="tab" aria-controls="profile" aria-selected="false" onclick="reloadtableabs()"><b>SİPARİŞ ÖZETİ</b></a>
            </li>`;




        },
        error: function (request, status, error) {
            debugger
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Sipariş No bulunamadı", "error");
        }
    });

};
$('#branch').change(function () {
    debugger
    var ProductGroup = $('#ProductGroup').val();
    getProductGroup2(ProductGroup, this.value);
});
$('#ProductGroup').change(function () {
    debugger

    var branchID = $('#branch').val();

    getProductGroup2(this.value, branchID);
});
function getCategoryForOrder(id) {
    var table = $('#kt_table_braches');
    table.DataTable({
        ajax: {
            url: '/Branch/GetUserBranch?id=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: "json",
            data: {
            },
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `<'row'<'col-sm-3 text-left'f><'col-sm-9 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>`,

        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline  pt-2 mt-0 pb-2 mb-0',
            buttons: [
                'excel',
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        columns: [
            { data: 'deneme' },
            { data: 'BranchName' },
            { data: 'BranchCode' },
            { data: 'BranchCreatedDate' },

        ],
        // Order settings
        order: [[1, 'asc']],
        headerCallback: function (thead, data, start, end, display) {
            thead.getElementsByTagName('th')[0].innerHTML = `
                    <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                        <input type="checkbox" value="" class="m-group-checkable">
                        <span></span>
                    </label>`;
        },
        columnDefs: [
            {
                targets: 0,
                width: '10px',
                className: 'dt-right',
                orderable: false,
                render: function (data, type, full, meta) {
                    var branchId = full['ID'];
                    var returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                    for (let user of full['User']) {
                        for (let branch of user['Branches']) {

                            if (branch['BranchId'] == branchId) {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input checked type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                                break;
                            }
                            else {
                                returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid">
                                            <input type="checkbox" value="` + full['ID'] + `" class="m-checkable branch">
                                            <span></span>
                                        </label>`;
                            }
                        }
                        break;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 3,
                render: function (data, type, full, meta) {
                    var id = full['BranchCreatedDate'];
                    var result = moment(id).format('DD.MM.YYYY - HH:mm ');
                    return result;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
        stateSave: true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });
    table.on('change', '.kt-group-checkable', function () {
        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');

        $(set).each(function () {
            if (checked) {
                $(this).prop('checked', true);
                $(this).closest('tr').addClass('active');
            }
            else {
                $(this).prop('checked', false);
                $(this).closest('tr').removeClass('active');
            }
        });
    });
    table.on('change', 'tbody tr .kt-checkbox', function () {
        $(this).parents('tr').toggleClass('active');
    });
};
function productCountTotal(branchID) {
    $.ajax({
        type: "POST",
        url: '/Order/productCountTotal?branchID=' + branchID,
        success: function (Total) {
            $('#productCountTotal').val(Total);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function getEditLogoCompany1() {
    companyLogoCode = 50598;
    debugger
    $.ajax({
        type: "POST",
        url: '/GeneralSettings/companyLogoLayout?companyLogoCode=' + companyLogoCode,
        success: function (data) {
            debugger
            $('#companyLogoLayout').attr('src', data['SettingsVal']);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function getOrderProductsListView(groupId, branchID) {

    var table = $("#tablenew_");

    var date = $('#kt_datepicker_2').val();
    var t = table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Order/GetOrderProductsListView?groupId=' + groupId + '&branchCode=' + branchID + '&date=' + date,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],

        dom: `
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline ml-4 pt-2 mt-0 pb-2 mb-0',

        }],
        columns: [
            {
                data: 'Code',
                width: '1%',
            },
            {
                data: 'Name',
                orderable: false,
                className: 'dt-left',
                width: '15%',


            },
            {
                data: 'UnitPrices',
                width: '5%',
            },
            {
                data: 'Code',
                orderable: false,
                width: '10%',

            },
            {
                data: 'Code',
                className: 'dt-center',
                orderable: false,
                width: '10%',
            },

            {
                data: 'Code',
                orderable: false,
                width: '1%',


            },
            {
                data: 'MaxCapacity',
                className: 'dt-center',
                width: '5%',

            },
            {
                data: 'Code',
                className: 'dt-center',
                width: '5%',

            },
            {
                data: 'Comment',
            },

        ],
        order: [[5, 'asc'], [1, 'asc']],
        columnDefs: [
            {
                orderable: false,
                targets: 0,
                className: 'dt-center',
                render: function (data, type, full, meta) {

                    var returnHtml = "";
                    
                        returnHtml = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;
                    return returnHtml;
                },
            },
            {
                targets: 7,
                width: '7%',
                orderable: false,
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {
                    var id = full["ID"];
                    var tr = $(this).parents('tr');
                    var siparismiktar = full['quantity'];
                    if (full['subtotal'] != "") {
                        var eldekistok = full['subtotal'];
                    }
                    else {
                        var eldekistok = 0;
                    }
                    var MaxCapacity = full['MaxCapacity'];
                    var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);
                    if (isNaN(x))
                        x = "-";
                    //changeOrderControl(full["ID"], x, MaxCapacity)
                    var returnHtml;
                    if (x == 0) {
                        returnHtml = `<input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px;color:green;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
                        <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type = "text" class=" pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    else if (x > 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="+` + x + `" name="demo0" placeholder="">
                            <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type = "text" class="pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "+` + last + `" name = "demo0" placeholder = "" >`;

                    }
                    else if (x < 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input disabled id = "OrderControlPoint_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type="text" class=" pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + last + `" name="demo0" placeholder="">
                            <input hidden id="OrderControl_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    else {

                        returnHtml = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type="text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
                        <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type = "text" class=" pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    return returnHtml;

                },
            },
            {
                targets: 6,
                orderable: false,
                width: '7%',
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {

                    var totalPrintFormat = full['MaxCapacity'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var returnHtml = `
                            <input hidden id = "MaxCapacity_` + full["ID"] + `" style=" font-size: 1.3rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['MaxCapacity'] + `"  name="demo0" placeholder="">
                            <input disabled  style=" font-size: 1.3rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + last + `"  placeholder="">`;
                    return returnHtml;
                },
            },
            {
                targets: 5,
                width: '10px',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var Check = full['CheckBox'];
                    var returnHtml = "";

                    if (Check == "True")
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                    else

                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml

                   
                        returnHtml = `<div  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b></div> `;
                    return returnHtml;
                },
            },


            {
                targets: 2,
                width: '5%',
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var totalPrintFormat = full['UnitPrices'].toString();
                    var split = totalPrintFormat.split('.');
                    var last = "";
                    for (var i = split[0].length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                            last = last + ".";
                        }
                        last = last + split[0][split[0].length - i];
                    }
                    if (split.length > 1)
                        result = last + "," + split[1].substring(0, 2);
                    else
                        result = last + ",00";
                    var returnHtml = `<div style="min-width:60px; padding-left:10px; color:blue; padding-top: 2px;    text-align: center;"> ` + result + `</div> `;
                    return returnHtml;
                },
            },
            {
                targets: 4,
                orderable: false,
                width: '5%',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtmlSUB;
                    var colorUnit;
                    var subtotal = full['subtotal'];
                    var Required = "";
                    var discount = 1;
                    

                    if (full['settings'] == "1") {

                        Required = "required";
                    }
                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 45px;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius:  0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }
                    if (full['CheckBox'] == "True") {
                        returnHtmlSUB = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input type="button" disabled class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg2(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                        subtotal = "Yok";
                        returnHtmlSUB += `<input type="text"` + Required + `  style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius:  4px 0px 0px 4px;height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.2rem;"  value="` + subtotal + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInput2(` + full["ID"] + `,` + branchID + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `" >` + colorUnit + `
`;
                        returnHtmlSUB += `<input disabled type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos2(` + full["ID"] + `,` + branchID + `,` + discount + `)"   id="subTotalPlus1_` + full['ID'] + `"/>
                            </div>`;
                    }
                    else {
                        returnHtmlSUB = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg2(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                        if (full['CheckBox'] == "True") {

                        }
                        else if (full['subtotal'] != "") {
                            returnHtmlSUB += `<input ` + Required + ` type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius:  4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + subtotal + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInput2(` + full["ID"] + `,` + branchID + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">` + colorUnit + ``;
                        }

                        else {
                            returnHtmlSUB += `<input ` + Required + ` type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius:  4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInput2(` + full["ID"] + `,` + branchID + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">` + colorUnit + `
`;
                        }
                        returnHtmlSUB += `<input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos2(` + full["ID"] + `,` + branchID + `,` + discount + `)"   id="subTotalPlus1_` + full['ID'] + `"/>
                            </div>`;
                    }




                    //var totalPrintFormat = full['subtotal'].toString();
                    //var last = "";
                    //for (var i = totalPrintFormat.length; i > 0; i--) {
                    //    if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                    //        last = last + ".";
                    //    }
                    //    last = last + totalPrintFormat[totalPrintFormat.length - i];
                    //}
                    //var returnHtml;
                    //if (full['subtotal'] == "Yok")
                    //    returnHtml = `
                    //        <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px;">
                    //                <input disabled type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                    //                <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    //</div >`;
                    //else
                    //    returnHtml = `
                    //        <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px; ">
                    //                <input disabled type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                    //                <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    //</div >`;
                    //                    var returnHtml;
                    //                    returnHtml = `
                    //                            <div id="bc`+ full['ID'] + `" class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                    //                                    <input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="azalt(` + full['ID'] + `); toBasket(count_` + full['ID'] + `.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                    //                    if (full['subtotal'] != "") {
                    //                        returnHtml += `<input type="text" style="width: 50px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"  oninput= " hesapla(` + full['ID'] + `); toBasket(this.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)"  class="form-control" id="count_` + full['ID'] + `">`;
                    //                    }
                    //                    else {
                    //                        returnHtml += `<input type="text" style="width: 50px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="" oninput= "hesapla(` + full['ID'] + `); toBasket(this.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)" class="form-control" id="count_` + full['ID'] + `">
                    //`;
                    //                    }
                    //                    returnHtml += `<input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="arttir(` + full['ID'] + `); toBasket(count_` + full['ID'] + `.value,` + full['ID'] + `);  changeBG3(` + full['ID'] + `,` + branchID + `)"  id="subTotalPlus1_` + full['ID'] + `"/>
                    //                            </div>`;
                    return returnHtmlSUB;
                },
            },

            {
                targets: 3,
                className: '',
                width: '11%',
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml;
                    var colorUnit;
                    var Required = "";

                    if (full['settings'] == "1") {
                        Required = "required";
                    }

                    if ((full['ProductUnitName']) == null) {
                        full['ProductUnitName'] = "-";
                    }
                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }
                    var discount = 1;
                  
                    if (full['quantity'] != "") {

                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg(` + full["ID"] + `,` + branchID + `,` + discount + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + ` type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.2rem;   color: #002952;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInput(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `"/>
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    else {
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNeg(` + full["ID"] + `,` + branchID + `,` + discount + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + ` type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: aliceblue;text-align: center; font-size: 1.2rem;   color: #002952;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInput(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  />` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `"/>
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    return returnHtml;
                },
            },

            {
                targets: 8,
                className: 'dt-center',
                width: '10%',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['Comment'];
                    var output;
                    if (name != null) {
                        output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                    }
                    else {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  value="" placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                    }

                    return output;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });


    table.on('change', '.SelectBranch', function () {

        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');
        var id = $(this).val();
        var discount = document.getElementById(`discount_` + id);

        var siparismiktar = document.getElementById(`count_` + id);
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        var sonuc = document.getElementById(`subTotal_` + id);


        if (checked == true) {

            $(this).prop('checked', true);
            $(this).prop('disabled', true);
            $('#subTotalPlus1_' + id).prop('disabled', true);
            $('#subTotalNeg1_' + id).prop('disabled', true);


            siparismiktar.style.color = "blue";
            siparismiktar.value = "Yok";
            BasketToCheck(true, id, discount.value);
            if (sipariskontrol != null) {

                var z = Number(sonuc.value) - Number(MaxCapacity.value);
                var kontrol = Number(z).toLocaleString('tr');
                sipariskontrol2.value = kontrol;
                sipariskontrol.value = kontrol;
            }
        }
        else {

            $(this).prop('checked', false);
            $(this).prop('disabled', true);

            $(this).closest('tr').removeClass('active');
            $('#subTotalPlus1_' + id).prop('disabled', false);
            $('#subTotalNeg1_' + id).prop('disabled', false);
            siparismiktar.style.color = "black";
            siparismiktar.value = 0;
            if (sipariskontrol != null) {

                var z = Number(sonuc.value) - Number(MaxCapacity.value);
                var kontrol = Number(z).toLocaleString('tr');
                sipariskontrol2.value = kontrol;
                sipariskontrol.value = kontrol;
            }
            BasketToCheck(false, id, discount.value);
        }
    });

};
function reloadtable(GroupId) {
    debugger

    var branchID = $('#branch').val();

    var url = window.location.href;
    var OrderCode = url.substring(url.lastIndexOf('?') + 1);
    var settings = $('#settings').val();
    var settings2 = $('#settings2').val();

    if (settings == "1" && settings2 == "1") {
        if (OrderCode == "list") {
            getOrderProductsListViewCap(GroupId, branchID);
        }
        else {
            getOrderProductsCap(GroupId, branchID);
        }
    }
    else {
        if (OrderCode == "list") {
            getOrderProductsListView(GroupId, branchID);
            if (settings == "0") {
                debugger
                let group = Number(GroupId);
                var table = $("#tablenew_").DataTable();
                table.column(6).visible(false);
                table.column(7).visible(false);
            }
        }
        else {
            getOrderProducts(GroupId, branchID);
        }
    }
};
function getOrderProductsCap(groupId, branchID) {
    debugger

    var date = $('#kt_datepicker_2').val();
    for (var i = 1; i < 5; i++) {
        var tables = $("#tablenewcapa" + i + "_");

        var t = tables.DataTable({
            ajax: {
                url: '/Order/GetOrderProducts' + 1 + '?groupId=' + groupId + '&branchCode=' + branchID + '&date=' + date + '&ColumnNumber=' + i,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
            },
            "bDestroy": true,
            "paging": false,
            "info": false,
            "searching": false,
            "bSort": false,
            'stripeClasses': ['stripe1', 'stripe2'],

            dom: `
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
            buttons: [{
                extend: 'collection',
                text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
                className: 'btn btn-outline-info dropleft-inline ml-4 pt-2 mt-0 pb-2 mb-0',
                buttons: [
                    'excel',
                    'print',
                    'csv',
                    'pdf',
                    'copy',
                    'colvis',
                ],
            }],
            columns: [
                {

                    data: 'Code',

                },

            ],
            columnDefs: [
                {
                    orderable: false,
                    targets: 0,
                    class: "dt-center",
                    render: function (data, type, full, meta) {
                        debugger
                        var Required = "";
                        debugger
                        if (full['settings'] == "1") {

                            Required = "required";
                        }
                        var img = full['GroupImage'];
                        if (img != null) {
                            output2 = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <img src="` + img + `" class="m-img-rounded kt-marginless" alt="photo">
                                    </div>
                                </div>`;
                        }
                        else {
                            output2 = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <img src="./assets/media/resim-yok.jpg " class="m-img-rounded kt-marginless" alt="photo">
                                    </div>
                                </div>`;
                        }
                        debugger

                        var barcode = "";
                        
                            barcode = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;

                        var Check = full['CheckBox'];
                        var checkbox = "";
                        if (Check == "True")
                            checkbox = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger mt-0"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                        else {
                            if ((full['MaxCapacity']) == 0) {
                                checkbox = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger mt-0"><b hidden style=" width:300px;  color:red;"> b </b>
                                            <input disabled id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                            }
                            else
                                checkbox = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger mt-0"><b hidden style=" width:300px;  color:red;"> a </b>
                                            <input  id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;

                        }
                        var unitweight = `<span style="color:green;"> (` + full['UnitFactor'] + `)</span> `;
                        if ((full['subtotal']) == "0" && full['CheckBox'] == "True")
                            full['subtotal'] = "Yok";

                        if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                            colorUnit = `<span   style="color: red;">` + full['ProductUnitName'].toLocaleUpperCase() + `<span/>`;

                        }
                        else {
                            colorUnit = `<span   style="color: black;">` + full['ProductUnitName'].toLocaleUpperCase() + `<span/>`;
                        }

                        var totalPrintFormat = full['subtotal'].toString();
                        var last5 = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last5 = last5 + ".";
                            }
                            last5 = last5 + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        var returnHtml;
                        if (full['subtotal'] == "Yok")
                            returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px;">
                                    <input disabled type="text" style="width: 45%;text-align: center;border-color: #ffe8d6;border-radius: 4px 4px 4px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + last5 + `"class="form-control" id="countPoint_` + full['ID'] + `"> 
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 4px 4px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                        else
                            returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px; ">
                                    <input disabled type="text" style="width: 45%;text-align: center;border-color: #ffe8d6;border-radius:4px 4px 4px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + last5 + `"class="form-control" id="countPoint_` + full['ID'] + `">
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;

                        var totalPrintFormat = Number(full['UnitPrices']);
                        var format5 = (totalPrintFormat).toLocaleString('tr');
                        var format = format5;
                        if (Number(format5).toFixed(2) != "NaN") {
                            format = format5 + ",00";
                        }
                        var name = full['Comment'];
                        var output;
                        if ((full['MaxCapacity']) == 0) {
                            output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input disabled autocomplete="off" type="text"  placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                        }

                        else if (name != null) {
                            output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" style="text-transform: uppercase;min-width:100px; height:25px;background-color: #fff0d0;     border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                        }
                        else {
                            output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                        }
                        var totalPrintFormat2 = Number(full['MaxCapacity']);
                        var format2 = (totalPrintFormat2).toLocaleString('tr');
                        var siparismiktar = full['quantity'];
                        if (full['subtotal'] != "") {
                            var eldekistok = full['subtotal'];
                        }
                        else {
                            var eldekistok = 0;
                        }
                        var MaxCapacity = full['MaxCapacity'];
                        var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);
                        if (isNaN(x))
                            x = "-";
                        //changeOrderControl(full["ID"], x, MaxCapacity)
                        var control;
                        if (x == 0) {
                            control = `<input hidden id = "OrderControl_` + full["ID"] + `" style="padding-top: 0;margin-top: 0; font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px;color:green;" type="text" class="pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >
`;

                        }
                        else if (x > 0) {
                            var totalPrintFormatx = Number(x);
                            var lastx = (totalPrintFormatx).toLocaleString('tr');
                            control = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="padding-top: 0;margin-top: 0; font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type="text" class="pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="+` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + lastx + `" name = "demo0" placeholder = "" >
`;

                        }
                        else if (x < 0) {
                            var lastx = (x).toLocaleString('tr');

                            control = `
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + lastx + `" name = "demo0" placeholder = "" >
                            <input hidden id="OrderControl_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                        }
                        else {

                            control = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type="text" class=" pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >
`;

                        }
                        var capacity = `
                            <span  name="demo0" placeholder="">` + format2 + `</span>

                            <input hidden id = "MaxCapacity_` + full["ID"] + `" style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.2rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['MaxCapacity'] + `"  name="demo0" placeholder="">
`;
                        var QuantityReturn;
                        var colorUnit2;

                        if ((full['MaxCapacity']) == 0) {
                            full['quantity'] = "0";
                        }
                        if ((full['ProductUnitName']) == null) {
                            full['ProductUnitName'] = "-";
                        }
                        if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                            colorUnit2 = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                        }
                        else {
                            colorUnit2 = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                        }
                        var discount3 = 1;
                       
                        if (full['quantity'] != "") {
                            if ((full['MaxCapacity']) == 0) {
                                QuantityReturn = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input disabled type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"    id="subTotalNeg_` + full['ID'] + `"/>
                                    <input disabled ` + Required + ` type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #dbeeff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: #dbeeff;text-align: center; font-size: 1.2rem;   color: red;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />
                                    <input disabled type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+"  id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                            }
                            else
                                QuantityReturn = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + `  type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #dbeeff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: #dbeeff;text-align: center; font-size: 1.2rem;   color: #002952;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + discount3 + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        else {
                            QuantityReturn = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNegCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + `  type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: #dbeeff;text-align: center; font-size: 1.2rem;   color: #002952;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInputCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  >
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + discount3 + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosCap(` + full["ID"] + `,` + branchID + `,` + discount3 + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        debugger
                        var last = `<div class="row">
                        <div class="col-2 pl-5" style="align-self:center;">
                            ` + output2 + `
                        </div>
                        <div class="col-10 pt-1">
                            <div class="row">
                                <div class="col-12" style="text-align: left;">
                                    <span  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `&nbsp;&nbsp;&nbsp;&nbsp;</b> (` + format + " TL" + `) ` + `</span>
                                </div>
                                <div class="col-12">
                                   <div class="row">
                                        
                                        <div class="col-12 " style="text-align:left;">
                                       ` + barcode + ` - ` + colorUnit + unitweight + `
                                        </div>
                                        
                                     
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-6 pl-5 mr-0" style="text-align:left;" >
                                            <label>Eldeki Stok</label>
                                        </div>
                                        <div class="col-4 pl-4" style="text-align:left;">
                                            <label>Sipariş</label>
                                        </div>
                                 <div class="col-1 " style="text-align:left;">
                                            <label>Yok</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 pl-0">
                                        ` + QuantityReturn + `
                                        </div>
                                        <div class="col-5">
                                                ` + returnHtml + `
                                        </div>
                                        <div class="col-2" style="text-align:left;">
                                        ` + checkbox + `
                                        </div>
                                    </div>
                                </div>
                                    <div class="col-12">
                                    <div class="row">
                                        <div class="col-4 pl-0 mr-0" style="align-self: center; text-align:center;" >
                                            <label>Kapasite: ` + capacity + `</label>
                                        </div>
                                        
                                         <div class="col-5 pr-1 mr-0" style="align-self: center;text-align:right;"  >
                                    <label>Sipariş Kontrol:</label>

                                </div>
                                <div class="col-3 pl-0 ml-0" style="align-self: center;text-align:left;" >
                                    <label>` + control + `</label>

                                </div>
                                        
                                </div>
                                
                                    <div class="col-12 pt-2 pb-2 pr-4">
                                         ` + output + `
                                     </div>
                            </div>
                        </div>
                    </div >`;
                        return last;
                    },
                },
            ],

            responsive: false,
            "scrollX": false,
            orderCellsTop: true,
            fixedHeader: true,
            "destroy": true,

        });

        tables.on('change', '.SelectBranch', function () {

            var set = $(this).closest('tables').find('td:first-child .kt-checkable');
            var checked = $(this).is(':checked');
            var id = $(this).val();
            var discount = document.getElementById(`discount_` + id);
            var OrderControl = document.getElementById(`OrderControl_` + id);
            var siparismiktar = document.getElementById(`count_` + id);
            var siparismiktar2 = document.getElementById(`countPoint_` + id);
            var OrderControl2 = document.getElementById(`OrderControlPoint_` + id);


            if (checked == true) {

                $(this).prop('checked', true);
                siparismiktar2.style.color = "blue";
                siparismiktar.value = "Yok";
                siparismiktar2.value = "Yok";
                OrderControl.value = "-";
                OrderControl2.value = "-";
                BasketToCheck(true, id, discount.value);

            }
            else {

                $(this).prop('checked', false);
                $(this).closest('tr').removeClass('active');

                OrderControl.value = 0;
                OrderControl2.value = 0;
                siparismiktar2.style.color = "black";
                siparismiktar.value = 0;
                siparismiktar2.value = 0;

                BasketToCheck(false, id, discount.value);
            }
        });

    }

};
function getOrderProductsListViewCap(groupId, branchID) {

    var table = $("#tablenewCap_");

    var date = $('#kt_datepicker_2').val();
    var t = table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Order/GetOrderProductsListView?groupId=' + groupId + '&branchCode=' + branchID + '&date=' + date,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],

        dom: `
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
        buttons: [{
            extend: 'collection',
            text: '<i class="flaticon2-gear" style= "font-size:16px; "></i>',
            className: 'btn btn-outline-info dropleft-inline ml-4 pt-2 mt-0 pb-2 mb-0',
            buttons: [
                'excel',
                'print',
                'csv',
                'pdf',
                'copy',
                'colvis',
            ],
        }],
        columns: [
            {
                data: 'Code',
                width: '1%',
            },
            {
                data: 'Name',
                orderable: false,
                className: 'dt-left',
                width: '15%',


            },
            {
                data: 'UnitPrices',
            },

            {
                data: 'Code',
                orderable: false,
                width: '10%',

            },
            {
                data: 'Code',
                className: 'dt-center',
                orderable: false,
                width: '10%',

            },
            {
                data: 'Code',
                orderable: false,
                width: '1%',


            },
            {
                data: 'UnitWeight',
                width: '5%',

            },

            {
                data: 'MaxCapacity',
                className: 'dt-center',
                width: '5%',

            },
            {
                data: 'Code',
                className: 'dt-center',
                width: '5%',

            },
            {
                data: 'Comment',
            },

        ],
        order: [[5, 'asc'], [1, 'asc']],
        columnDefs: [
            {
                orderable: false,
                targets: 0,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml = "";
                 
                        returnHtml = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;
                    return returnHtml;
                },
            },
            {
                targets: 5,
                width: '10px',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var Check = full['CheckBox'];
                    var returnHtml = "";
                    if (Check == "True")
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                    else
                        if ((full['MaxCapacity']) == 0) {
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> b </b> 
                                            <input disabled id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                        }
                        else
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranch` + full['ID'] + `"  name="SelectBranch" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranch">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml

                   
                        returnHtml = `<div  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b></div> `;
                    return returnHtml;
                },
            },

            {
                targets: 6,
                className: 'dt-center',
                orderable: false,
                render: function (data, type, full, meta) {
                    var returnHtml = `<div  style="min-width:40px; font-size: 1.3rem;    text-align: center;"><b> ` + full['UnitFactor'] + `</b></div> `;
                    return returnHtml;
                },
            },
            {
                targets: 2,
                width: '5%',
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var totalPrintFormat = full['UnitPrices'].toString();
                    var split = totalPrintFormat.split('.');
                    var last = "";
                    for (var i = split[0].length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != split[0].length && split[0].length > 3) {
                            last = last + ".";
                        }
                        last = last + split[0][split[0].length - i];
                    }
                    if (split.length > 1)
                        result = last + "," + split[1].substring(0, 2);
                    else
                        result = last + ",00";
                    var returnHtml = `<div style="min-width:60px; padding-left:10px; color:blue; padding-top: 2px;    text-align: center;"> ` + result + `</div> `;
                    return returnHtml;
                },
            },
            {
                targets: 4,
                orderable: false,
                width: '5%',
                className: 'dt-center',
                render: function (data, type, full, meta) {

                    if ((full['subtotal']) == "0" && full['CheckBox'] == "True")
                        full['subtotal'] = "Yok";

                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 35%;padding: 0rem 0.7rem;border-color: #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 35%;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }

                    var totalPrintFormat = full['subtotal'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var returnHtml;
                    if (full['subtotal'] == "Yok")
                        returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100%;">
                                    <input disabled type="text" style="width: 35%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                    else
                        returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px; ">
                                    <input disabled type="text" style="width: 35%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                    //                    var returnHtml;
                    //                    returnHtml = `
                    //                            <div id="bc`+ full['ID'] + `" class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                    //                                    <input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="azalt(` + full['ID'] + `); toBasket(count_` + full['ID'] + `.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                    //                    if (full['subtotal'] != "") {
                    //                        returnHtml += `<input type="text" style="width: 50px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"  oninput= " hesapla(` + full['ID'] + `); toBasket(this.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)"  class="form-control" id="count_` + full['ID'] + `">`;
                    //                    }
                    //                    else {
                    //                        returnHtml += `<input type="text" style="width: 50px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="" oninput= "hesapla(` + full['ID'] + `); toBasket(this.value,` + full['ID'] + `); changeBG2(` + full['ID'] + `,` + branchID + `)" class="form-control" id="count_` + full['ID'] + `">
                    //`;
                    //                    }
                    //                    returnHtml += `<input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="arttir(` + full['ID'] + `); toBasket(count_` + full['ID'] + `.value,` + full['ID'] + `);  changeBG3(` + full['ID'] + `,` + branchID + `)"  id="subTotalPlus1_` + full['ID'] + `"/>
                    //                            </div>`;
                    return returnHtml;
                },
            },
            {
                targets: 7,
                orderable: false,
                width: '7%',
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {

                    var totalPrintFormat = full['MaxCapacity'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var returnHtml = `
                            <input hidden id = "MaxCapacity_` + full["ID"] + `" style=" font-size: 1.2rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['MaxCapacity'] + `"  name="demo0" placeholder="">
                            <input disabled  style=" font-size: 1.2rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + last + `"  placeholder="">`;
                    return returnHtml;
                },
            },
            {
                targets: 3,
                className: '',
                width: '11%',
                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml;
                    var colorUnit;
                    var Required = "";

                    if (full['settings'] == "1") {

                        Required = "required";
                    }
                    if ((full['MaxCapacity']) == 0) {
                        full['quantity'] = "0";
                    }
                    if ((full['ProductUnitName']) == null) {
                        full['ProductUnitName'] = "-";
                    }
                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 55px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 0px 4px 4px 0px; height:2rem;background-color: aliceblue;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }
                    var discount = 1;
                   
                    if (full['quantity'] != "") {
                        if ((full['MaxCapacity']) == 0) {
                            returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"    id="subTotalNeg_` + full['ID'] + `"/>
                                    <input disabled ` + Required + ` type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.2rem;   color: red;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputCap(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" /> ` + colorUnit + `
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+"  id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        else
                            returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegCap(` + full["ID"] + `,` + branchID + `,` + discount + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + ` type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.2rem;   color: #002952;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputCap(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosCap(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    else {
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNegCap(` + full["ID"] + `,` + branchID + `,` + discount + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + ` type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: aliceblue;text-align: center; font-size: 1.2rem;   color: #002952;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInputCap(` + full["ID"] + `,` + branchID + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  >` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.2rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosCap(` + full["ID"] + `,` + branchID + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    return returnHtml;
                },
            },
            {
                targets: 8,
                width: '7%',
                orderable: false,
                className: 'dt-center mt-0 mb-0 pt-0 pb-0',
                render: function (data, type, full, meta) {
                    var id = full["ID"];
                    var tr = $(this).parents('tr');
                    var siparismiktar = full['quantity'];
                    if (full['subtotal'] != "") {
                        var eldekistok = full['subtotal'];
                    }
                    else {
                        var eldekistok = 0;
                    }
                    var MaxCapacity = full['MaxCapacity'];
                    var x = Number(siparismiktar) + Number(eldekistok) - Number(MaxCapacity);
                    if (isNaN(x))
                        x = "-";
                    //changeOrderControl(full["ID"], x, MaxCapacity)
                    var returnHtml;
                    if (x == 0) {
                        returnHtml = `<input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px;color:green;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
                        <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type = "text" class=" pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    else if (x > 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type="text" class="pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="+` + x + `" name="demo0" placeholder="">
                            <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type = "text" class="pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "+` + last + `" name = "demo0" placeholder = "" >`;

                    }
                    else if (x < 0) {
                        var totalPrintFormat = x.toString();
                        var last = "";
                        for (var i = totalPrintFormat.length; i > 0; i--) {
                            if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                                last = last + ".";
                            }
                            last = last + totalPrintFormat[totalPrintFormat.length - i];
                        }
                        returnHtml = `
                            <input disabled id = "OrderControlPoint_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type="text" class=" pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + last + `" name="demo0" placeholder="">
                            <input hidden id="OrderControl_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    else {

                        returnHtml = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type="text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
                        <input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.2rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type = "text" class=" pl-0 ml-0 mr-0 pr-4 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                    }
                    return returnHtml;

                },
            },
            {
                targets: 9,
                className: 'dt-center',
                width: '10%',
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['Comment'];
                    var output;
                    if ((full['MaxCapacity']) == 0) {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input disabled autocomplete="off" type="text"  value="" placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                    }
                    else if (name != null) {
                        output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                    }
                    else {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  value="" placeholder="Açıklama" style="text-transform: uppercase;height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;"  type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2(this.value,` + full['ID'] + `)" id = "comment">
                                </div>
                  `;
                    }

                    return output;
                },
            },
        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

    });

    table.on('change', '.SelectBranch', function () {

        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');
        var id = $(this).val();
        var discount = document.getElementById(`discount_` + id);
        var OrderControl = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
        var OrderControl2 = document.getElementById(`OrderControlPoint_` + id);


        if (checked == true) {

            $(this).prop('checked', true);
            siparismiktar2.style.color = "blue";
            siparismiktar.value = "Yok";
            siparismiktar2.value = "Yok";
            OrderControl.value = "-";
            OrderControl2.value = "-";
            BasketToCheck(true, id, discount.value);

        }
        else {

            $(this).prop('checked', false);
            $(this).closest('tr').removeClass('active');

            OrderControl.value = 0;
            OrderControl2.value = 0;
            siparismiktar2.style.color = "black";
            siparismiktar.value = 0;
            siparismiktar2.value = 0;

            BasketToCheck(false, id, discount.value);
        }
    });



};
function ChangeDateRange2() {

    var branchID = "";
    var StartDate = $('#StartDate').val();
    var EndDate = $('#EndDate').val();
    getBranchOrderListCenter(StartDate, EndDate);
    OrderCountAndAppCount(branchID, StartDate, EndDate);
};
function checkedOrderToBranch() {

    table = $('#kt_table_getBranchOrderListCenter');
    var currentUserID = $('#CurrentUserID').val();
    var checkboxes = $(".branchOrder");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    $.ajax({
        type: 'POST',
        url: '/Order/OrderToBranch',
        dataType: "json",
        data: { "orders": checkboxesChecked },
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                    ChangeDateRange2();
                    checkedOrderToBranchNotif(currentUserID, checkboxesChecked);

                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function checkedOrderToBranchNeg() {
    var currentUserID = $('#CurrentUserID').val();
    table = $('#kt_table_getBranchOrderListCenter');
    var checkboxes = $(".branchOrder");
    var checkboxesChecked = [];
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkboxesChecked.push(checkboxes[i].value);
        }
    }
    $.ajax({
        type: 'POST',
        url: '/Order/OrderToBranchNeg',
        dataType: "json",
        data: { "orders": checkboxesChecked },
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                    ChangeDateRange2();
                    checkedOrderToBranchNotif(currentUserID, checkboxesChecked);

                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
}
function ConfirmBranchOrderList(id) {
    debugger
    var currentUserID = $('#CurrentUserID').val();
    var table = $('#kt_table_getBranchOrderListCenter');
    $.ajax({
        type: "POST",
        url: '/Branch/ConfirmBranchOrderList/' + id,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                    ChangeDateRange2();
                    waitingOrderCountScrpt();
                    NotificationSend(id, currentUserID);
                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function CancelBranchOrderList(id) {
    var currentUserID = $('#CurrentUserID').val();
    var table = $('#kt_table_getBranchOrderListCenter');
    $.ajax({
        type: "POST",
        url: '/Branch/CancelBranchOrderList/' + id,
        success: function (data) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                    ChangeDateRange2();
                    waitingOrderCountScrpt();
                    NotificationSend(id, currentUserID);

                }
            });
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı!", "error");
        }
    });
};
function QuantityClickNeg(id, branchId, discount) {
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalNeg_' + id).prop('disabled', true);
    var siparismiktar = document.getElementById(`count_` + id);
    if (sonuc.value > 0) {
        sonuc.value = Number(sonuc.value) - 1;
    }
    else if (sonuc.value == "") {
        sonuc.value = Number(0);
    }
    var branchId = $('#branch').val();
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    debugger
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    if (sipariskontrol != null) {
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        var z = Number(sonuc.value) + Number(siparismiktar.value) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#subTotalNeg_' + id).prop('disabled', false);
            $('#productCountTotal').val(Total);
        },
        error: function (request, status, error) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error").then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
        }
    });

};
function QuantityClickPos(id, branchId, discount) {
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalPlus_' + id).prop('disabled', true);
    if (sonuc.value >= 0) {
        sonuc.value = Number(sonuc.value) + 1;
        var siparismiktar = document.getElementById(`count_` + id);
    }
    var branchId = $('#branch').val();
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(siparismiktar.value) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#subTotalPlus_' + id).prop('disabled', false);
            $('#productCountTotal').val(Total);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function QuantityClickInput(id, branchId, discount) {
    var sonuc = document.getElementById(`subTotal_` + id);
    debugger
    if (sonuc.value >= 0 && sonuc.value != "") {
        var siparismiktar = document.getElementById(`count_` + id);
        var branchId = $('#branch').val();
        var count = siparismiktar.value;
        if (siparismiktar.value == "Yok")
            count = 0;
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        if (sipariskontrol != null) {

            var z = Number(sonuc.value) + Number(siparismiktar.value) - Number(MaxCapacity.value);
            var kontrol = Number(z).toLocaleString('tr');
            sipariskontrol2.value = kontrol;
            sipariskontrol.value = kontrol;
        }
        $.ajax({
            type: 'POST',
            url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count,
            dataType: "json",
            dataType: "json",
            success: function (Total) {
                $('#productCountTotal').val(Total);
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
            }
        });
    }
};
function QuantityClickNeg2(id, branchId, discount) {
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalNeg1_' + id).prop('disabled', true);
    var count = document.getElementById(`count_` + id);

    if (count.value > 0) {
        count.value = Number(count.value) - 1;
    }
    else if (sonuc.value == "") {
        sonuc.value = Number(0);
    }
    var branchId = $('#branch').val();
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count.value) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count.value,
        dataType: "json",
        success: function (Total) {
            $('#subTotalNeg1_' + id).prop('disabled', false);
            $('#productCountTotal').val(Total);
        },
        error: function (request, status, error) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error").then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
        }
    });

};
function QuantityClickPos2(id, branchId, discount) {
    var sonuc = document.getElementById(`subTotal_` + id);
    var count = document.getElementById(`count_` + id);
    count.value = Number(count.value) + 1;
    $('#subTotalPlus1_' + id).prop('disabled', true);

    var branchId = $('#branch').val();
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count.value) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count.value,
        dataType: "json",
        success: function (Total) {
            $('#subTotalPlus1_' + id).prop('disabled', false);
            $('#productCountTotal').val(Total);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function QuantityClickInput2(id, branchId, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);
    var count = document.getElementById(`count_` + id);
    debugger
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count.value) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    if (count.value >= 0 && count.value != "") {
        var branchId = $('#branch').val();

        $.ajax({
            type: 'POST',
            url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count.value,
            dataType: "json",
            dataType: "json",
            success: function (Total) {
                $('#productCountTotal').val(Total);
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
            }
        });
    }
};
function QuantityClickNegCap(id, branchId, discount) {


    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalNeg_' + id).prop('disabled', true);

    if (sonuc.value > 0) {
        sonuc.value = Number(sonuc.value) - 1;
    }
    else if (sonuc.value == "") {

        sonuc.value = Number(0);
    }
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var siparismiktar = document.getElementById(`count_` + id);
    var siparismiktar2 = document.getElementById(`countPoint_` + id);
    var eldekistok = sonuc;
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);

    if (MaxCapacity.value != 0) {
        if (sipariskontrol == null) {
            sipariskontrol.value = 0;
            siparismiktar.value = 0;
            sipariskontrol2.value = 0;
            siparismiktar2.value = 0;
        }
        else {
            var y = (Number(MaxCapacity.value) - Number(eldekistok.value)) * discount;
            var last = (y).toLocaleString('tr');
            var CheckBox = $(`#SelectBranch` + id).is(':checked');

            if (y >= 0 && CheckBox == false) {
                siparismiktar.value = y;
                siparismiktar2.value = last;

                var x = Number(siparismiktar.value) + Number(eldekistok.value) - Number(MaxCapacity.value);
                var last = (x).toLocaleString('tr');
                sipariskontrol.value = x;
                if (x == 0)
                    sipariskontrol2.value = last;
                if (x > 0)
                    sipariskontrol2.style.color = "blue";
                sipariskontrol2.value = "+" + last;


            }
            else if (y < 0 && CheckBox == false) {
                siparismiktar.value = 0;
                siparismiktar2.value = 0;
                var x = Number(siparismiktar.value) + Number(eldekistok.value) - Number(MaxCapacity.value);
                var last = (x).toLocaleString('tr');

                sipariskontrol.value = x;
                sipariskontrol2.value = "+" + last;
            }
            else {
                siparismiktar.value = "Yok";
                siparismiktar2.value = "Yok";
            }
            //table.DataTable().ajax.reload();
        }
    }


    var branchId = $('#branch').val();
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#productCountTotal').val(Total);
            $('#subTotalNeg_' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire({
                title: "Başarılı!",
                text: data,
                type: "success",
                buttonsStyling: false,
                confirmButtonText: "Tamam!",
                confirmButtonClass: "btn btn-brand"
            }).then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error").then(function (result) {
                if (result.value) {
                    table.DataTable().ajax.reload();
                }
            });
        }
    });

};
function QuantityClickPosCap(id, branchId, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalPlus_' + id).prop('disabled', true);

    if (sonuc.value >= 0) {
        sonuc.value = Number(sonuc.value) + 1;
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
        var eldekistok = sonuc;
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
        if (MaxCapacity.value != 0) {
            if (Number(MaxCapacity.value) < Number(sonuc.value))
                sonuc.value = MaxCapacity.value;
            if (sipariskontrol == null) {
                sipariskontrol.value = 0;
                siparismiktar.value = 0;
                sipariskontrol2.value = 0;
                siparismiktar2.value = 0;
            }
            else {
                var y = (Number(MaxCapacity.value) - Number(eldekistok.value)) * discount;
                var last = (y).toLocaleString('tr');

                var CheckBox = $(`#SelectBranch` + id).is(':checked');

                if (y >= 0 && CheckBox == false) {
                    siparismiktar.value = y;
                    siparismiktar2.value = last;

                    var x = Number(siparismiktar.value) + Number(eldekistok.value) - Number(MaxCapacity.value);
                    var last = (x).toLocaleString('tr');


                    sipariskontrol.value = x;
                    if (x == 0)
                        sipariskontrol2.value = last;
                    else if (x > 0)
                        sipariskontrol2.style.color = "blue";
                    sipariskontrol2.value = "+" + last;


                }
                else if (y < 0 && CheckBox == false) {
                    siparismiktar.value = 0;
                    siparismiktar2.value = 0;
                    var x = Number(siparismiktar.value) + Number(eldekistok.value) - Number(MaxCapacity.value);
                    var last = (x).toLocaleString('tr');


                    sipariskontrol.value = x;
                    sipariskontrol2.style.color = "blue";
                    sipariskontrol2.value = "+" + last;
                }
                else {
                    siparismiktar.value = "Yok";
                    siparismiktar2.value = "Yok";
                }
                //table.DataTable().ajax.reload();
            }
        }
    }
    var branchId = $('#branch').val();
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#productCountTotal').val(Total);
            $('#subTotalPlus_' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
    /*productCountTotal(branchId);*/

};
function QuantityClickInputCap(id, branchId, discount) {

    var sonuc = document.getElementById(`subTotal_` + id);
    //if (sonuc.value == "")
    //    sonuc.value = 0;
    if (sonuc.value >= 0 && sonuc.value != "") {
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);

        var eldekistok = sonuc;
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);

        if (MaxCapacity.value != 0) {
            if (Number(MaxCapacity.value) < Number(sonuc.value))
                sonuc.value = MaxCapacity.value;
            if (sipariskontrol == null) {
                sipariskontrol.value = 0;
                siparismiktar.value = 0;
                sipariskontrol2.value = 0;
                siparismiktar2.value = 0;
            }
            else {
                var y = (Number(MaxCapacity.value) - Number(eldekistok.value)) * discount;
                var last = (y).toLocaleString('tr');

                var CheckBox = $(`#SelectBranch` + id).is(':checked');
                var CheckBox = $(`#SelectBranchUpdate` + id).is(':checked');
                if (y >= 0 && CheckBox == false) {
                    siparismiktar.value = y;
                    siparismiktar2.value = last;

                    var x = Number(siparismiktar.value) + Number(eldekistok.value) - Number(MaxCapacity.value);
                    var last = (x).toLocaleString('tr');

                    sipariskontrol.value = x;
                    if (x == 0)
                        sipariskontrol2.value = last;
                    if (x > 0)
                        sipariskontrol2.style.color = "blue";
                    sipariskontrol2.value = "+" + last;
                }
                else if (y < 0 && CheckBox == false) {
                    siparismiktar.value = 0;
                    siparismiktar2.value = 0;
                    var x = Number(siparismiktar.value) + Number(eldekistok.value) - Number(MaxCapacity.value);
                    var last = (x).toLocaleString('tr');

                    sipariskontrol.value = x;
                    sipariskontrol2.value = "+" + last;
                }
                else {
                    siparismiktar.value = "Yok";
                    siparismiktar2.value = "Yok";
                }
                //table.DataTable().ajax.reload();
            }
        }
        var branchId = $('#branch').val();
        var count = siparismiktar.value;
        if (siparismiktar.value == "Yok")
            count = 0;
        $.ajax({
            type: 'POST',
            url: '/Order/ToBasketOtoOrder?productId=' + id + '&branchId=' + branchId + '&subTotal=' + sonuc.value + '&count=' + count,
            dataType: "json",
            dataType: "json",
            success: function (Total) {
                $('#productCountTotal').val(Total);
            },
            error: function (request, status, error) {
                swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
            }
        });
    }


    /*productCountTotal(branchId);*/

};