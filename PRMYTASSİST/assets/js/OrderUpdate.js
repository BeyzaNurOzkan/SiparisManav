function backToNewOrder(id) {
    debugger
    $.ajax({
        type: "POST",
        url: '/Order/backToNewOrder?id=' + id,
        success: function (data) {
            debugger
            var CreDate = data['createDate'];
            var branchID = data['branchId'];
            var printDate = moment(CreDate).format('DD.MM.YYYY');
            $('#orderNewCodeforUpdate').val(data['orderNo']);
            switch (data['approvalStatus']) {
                case 0:
                    result = `Beklemede`;
                    result2 = 'kt-badge--primary';
                    break;
                case 1:
                    result = `Onaylandı`;
                    result2 = 'kt-badge--success';
                    break;
                case 2:
                    result = `Reddedildi`;
                    result2 = 'kt-badge--danger';
                    break;
            }

            $('#approvalstatus').text(result);

            $('#orderNewCode2forUpdate').val(data['orderNo']);
            $('#kt_datepicker_2').val(printDate);
            $('#kt_datepicker_4').val(printDate);
            //$('#FormatName').val(data['formatName']);
            $('#userName').val(data['UserName']);
            $('#branch').val(data['branchId']);
            $('#branchforName').val(data['BranchName']);
            var a = $('#kt_datepicker_2').val();
            $('#orderdateabs').text(a);

            debugger
            var branchID = $('#branch').val();
            var url = window.location.href;
            var OrderCode = url.substring(url.lastIndexOf('?') + 1);
            var settings = $('#settings').val();
            var settings2 = $('#settings2').val();
            
            if (settings == "1" && settings2 == "1") {
                if (OrderCode == "list") {
                    $("#groupIds > option").each(function () {
                        getOrderProductsUpdateListViewCap(this.value, branchID,id);
                    });
                }
                else {
                    $("#groupIds > option").each(function () {
                        getOrderProductsUpdateCap(this.value, branchID,id);
                    });
                }
            }
            else {
                if (OrderCode == "list") {
                    $("#groupIds > option").each(function () {
                        getOrderProductsUpdateListView(this.value, branchID,id);
                    });
                    if (settings == "0") {
                        $("#groupIds > option").each(function () {
                            debugger
                            let group = Number(this.value);
                            var table = $("#table_" + group).DataTable();
                            table.column(6).visible(false);
                            table.column(7).visible(false);
                        });
                    }
                }
                else {
                    $("#groupIds > option").each(function () {
                        getOrderProductsUpdate(this.value, branchID,id);
                    });
                }
            }        
            getCategoryForOrder(branchID);
            productCountTotalUpdate(id);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function getOrderProductsUpdate(groupId, branchID, id) {
    debugger
    for (var i = 1; i < 5; i++) {
        var toolbar = "bos";
        if (i == 1)
            toolbar = "toolbar"
        var tables = $("#table" + i + "_" + groupId);
        tables.DataTable({
            "bDestroy": true,
            "paging": false,
            "info": false,
            "searching": false,
            "bSort": false,
            ajax: {
                url: '/Order/GetOrderProductsUpdate' + i + '?groupId=' + groupId + '&branchCode=' + branchID + '&orderID=' + id,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
            },
            "pageLength": 100,
            'stripeClasses': ['stripe1', 'stripe2'],
            dom: `<'row'<'col-sm-12 mb-1 ml-0 text-left'<" ` + toolbar +`">>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,

            columns: [
                {
                    data: 'Code',

                    orderable: false,
                },
            ],

            columnDefs: [
                {

                    targets: 0,
                    "orderable": false,

                    render: function (data, type, full, meta) {
                        debugger
                        var returnHtmlSUB;
                        var subtotal = full['subtotal'];
                        var Required = "";
                        debugger
                        //if (full['settings'] == "1") {

                        //    Required = "required";
                        //}
                        if (full['CheckBox'] == "True") {
                            returnHtmlSUB = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input type="button" disabled class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg2Update(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                            subtotal = "Yok";
                            returnHtmlSUB += `<input type="text"` + Required + `  style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;"  value="` + subtotal + `"  oninput="QuantityClickInput2Update(` + full["ID"] + `,` + id + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">
`;
                            returnHtmlSUB += `<input disabled type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos2Update(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalPlus1_` + full['ID'] + `"/>
                            </div>`;
                        }
                        else {
                            returnHtmlSUB = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg2Update(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                            if (full['CheckBox'] == "True") {

                            }
                            else if (full['subtotal'] != "") {
                                returnHtmlSUB += `<input ` + Required + ` type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + subtotal + `"  oninput="QuantityClickInput2Update(` + full["ID"] + `,` + id + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">`;
                            }

                            else {
                                returnHtmlSUB += `<input ` + Required + ` type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffdc99; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="" oninput="QuantityClickInput2Update(` + full["ID"] + `,` + id + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">
`;
                            }
                            returnHtmlSUB += `<input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos2Update(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalPlus1_` + full['ID'] + `"/>
                            </div>`;
                        }
                        var Check = full['CheckBox'];
                        var returnHtml2 = "";
                        if (Check == "True")
                            returnHtml2 = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                        else

                            returnHtml2 = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                        var output2;
                        var id2 = full['GroupImage'];
                        if (id2 != null) {
                            output2 = `
                                <div style="justify-content: center;" class="kt-user-card-v2">
                                    <div class="kt-user-card-v2__pic">
                                        <img src="` + id2 + `" class="m-img-rounded kt-marginless" alt="photo">
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
                        var name = full['Comment'];
                        var output;

                        if (name != null) {
                            output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" style="min-width:100px; height:25px;background-color: #fff0d0;     border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                        }
                        else {
                            output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  placeholder="Açıklama" style="height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)" id = "comment">
                                </div>
                  `;
                        }

                        var x = Number(full['UnitPrices'])
                        var Prices = (x).toLocaleString('tr');
                        var returnHtml;
                        var colorUnit;

                        var settings = $('#settings').val();
                        if ((full['ProductUnitName']) == null) {
                            full['ProductUnitName'] = "-";
                        }
                        if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                            colorUnit = `<span style=" color: red;"  /> - ` + full['ProductUnitName'].toLocaleUpperCase() + `</span>`;

                        }
                        else {
                            colorUnit = `<span /> - ` + full['ProductUnitName'].toLocaleUpperCase() + `</span>`;
                        }
                        var discount = 1;
                        if (full['DiscountProd'] != "")
                            discount = parseInt(full['Coefficient']);
                        if (isNaN(discount))
                            discount = 1;
                        if (full['quantity'] != "") {

                            returnHtml = `
                            <div class="row pl-3" style="min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + `  type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #dbeeff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: #dbeeff;text-align: center; font-size: 1.3rem;   color: #002952;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdate(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        else {
                            returnHtml = `
                            <div class="row pl-3" style="min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNegUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + `  type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #dbeeff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: #dbeeff;text-align: center; font-size: 1.3rem;   color: #002952;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInputUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  >
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdate(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        var unitweight = `<span style="color:green;"> (` + full['UnitFactor'] + `)</span> `;
                        var maxcapacity = Number(full['MaxCapacity']);
                        var capacityval = (maxcapacity).toLocaleString('tr');
                        debugger
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
                        var control;
                        if (x == 0) {
                            control = `<input hidden id = "OrderControl_` + full["ID"] + `" style="padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px;color:green;" type="text" class="pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >
`;

                        }
                        else if (x > 0) {
                            var totalPrintFormatx = Number(x);
                            var lastx = (totalPrintFormatx).toLocaleString('tr');
                            control = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type="text" class="pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="+` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "+` + lastx + `" name = "demo0" placeholder = "" >
`;

                        }
                        else if (x < 0) {
                            var lastx = (x).toLocaleString('tr');

                            control = `
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pt-0 mt-0 pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + lastx + `" name = "demo0" placeholder = "" >
                            <input hidden id="OrderControl_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                        }
                        else {

                            control = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type="text" class=" pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >
`;

                        }
                        var capacity = `
                            <input disabled style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.3rem;   background-color: transparent;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + capacityval + `"  name="demo0" placeholder="">

                            <input hidden id = "MaxCapacity_` + full["ID"] + `" style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.3rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['MaxCapacity'] + `"  name="demo0" placeholder="">
`;
                        var last = `<div class="row">
                        <div class="col-2 pl-5" style="align-self:center;">
                            ` + output2 + `
                        </div>
                        <div class="col-10 pt-1">
                            <div class="row">
<div class="col-12">
                                    <span  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b> (` + Prices + ` TL) ` + `</span>
<input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + id + `"class="form-control" id="order_` + full['ID'] + `">

                                </div>
                                                               <div class="col-12">
                                   <div class="row">
                                        <div class="col-12 ">
                                       <span class="" style="color:blue;">` + full['Code'] + `     </span ` + colorUnit + unitweight + `
                                        </div>
                                        
                                     
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5" style="text-align:center;">
                                            <label>Eldeki Stok</label>
                                        </div>
                                        <div class="col-5" style="text-align:center;">
                                            <label>Sipariş</label>
                                        </div>
 <div class="col-2">
                                            <label>Yok</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5 pl-4" >
                                        ` + returnHtml + `
                                        </div>
                                        <div class="col-5 pl-4">
                                                ` + returnHtmlSUB + `
                                        </div>
                                        <div class="col-2" style="text-align-last:center;">
                                        ` + returnHtml2 + `
                                        </div>
                                    </div>
                                </div>`;

                        if (settings == "1") {
                            last += `<div class="col-12">
                            <div class="row">
                                <div class="col-3 pr-0 mr-0" style="align-self: center; text-align:right;" >
                                    <label>Kapasite:</label>
                                </div>
                                <div class="col-2 pl-2 ml-0" >
                                    <label>  ` + capacity + `</label>
                                </div>
                                <div class="col-4 pr-0 mr-0" style="align-self: center;text-align:right;"  >
                                    <label>Sipariş Kontrol:</label>

                                </div>
                                <div class="col-2 pl-2 ml-0 mr-0 pr-0" >
                                    <label>` + control + `</label>

                                </div>
                            </div>`;

                        }
                        last += `<div class="col-12 pt-2 pb-2 pr-4" >
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
        tables.on('change', '.SelectBranchUpdate', function () {
            debugger
            var set = $(this).closest('tables').find('td:first-child .kt-checkable');
            var checked = $(this).is(':checked');
            var id = $(this).val();
            var order = document.getElementById(`order_` + id);
            var discount = document.getElementById(`discount_` + id);
            var sipariskontrol = document.getElementById(`OrderControl_` + id);
            var siparismiktar = document.getElementById(`count_` + id);
            var siparismiktar2 = document.getElementById(`countPoint_` + id);
            var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
            var sonuc = document.getElementById(`subTotal_` + id);
            var MaxCapacity = document.getElementById(`MaxCapacity_` + id);

            if (checked == true) {
                debugger
                $(this).prop('checked', true);
                $(this).prop('disabled', true);
                $('#subTotalPlus1_' + id).prop('disabled', true);
                $('#subTotalNeg1_' + id).prop('disabled', true);
                siparismiktar.style.color = "blue";
                siparismiktar.value = "Yok";

                BasketToCheckUpdate(true, id, discount.value, order.value);
                if (sipariskontrol != null) {

                    var z = Number(sonuc.value) - Number(MaxCapacity.value);
                    var kontrol = Number(z).toLocaleString('tr');
                    sipariskontrol2.value = kontrol;
                    sipariskontrol.value = kontrol;
                }

            }
            else {
                debugger
                $(this).prop('checked', false);
                $(this).prop('disabled', true);
                $('#subTotalPlus1_' + id).prop('disabled', false);
                $('#subTotalNeg1_' + id).prop('disabled', false);
                $(this).closest('tr').removeClass('active');
                debugger

                siparismiktar.style.color = "black";
                siparismiktar.value = 0;
                if (sipariskontrol != null) {

                    var z = Number(sonuc.value) - Number(MaxCapacity.value);
                    var kontrol = Number(z).toLocaleString('tr');
                    sipariskontrol2.value = kontrol;
                    sipariskontrol.value = kontrol;
                }
                BasketToCheckUpdate(false, id, discount.value, order.value);
            }
        });
        $("div.toolbar").html(`
                        
                                    <a href="/Branch/UpdateOrder?id=`+id+`?list" onclick="window.location.reload()" class="kt-menu__link pr-0">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <path d="M10.5,5 L19.5,5 C20.3284271,5 21,5.67157288 21,6.5 C21,7.32842712 20.3284271,8 19.5,8 L10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 Z M10.5,10 L19.5,10 C20.3284271,10 21,10.6715729 21,11.5 C21,12.3284271 20.3284271,13 19.5,13 L10.5,13 C9.67157288,13 9,12.3284271 9,11.5 C9,10.6715729 9.67157288,10 10.5,10 Z M10.5,15 L19.5,15 C20.3284271,15 21,15.6715729 21,16.5 C21,17.3284271 20.3284271,18 19.5,18 L10.5,18 C9.67157288,18 9,17.3284271 9,16.5 C9,15.6715729 9.67157288,15 10.5,15 Z" fill="#003366" />
                                                        <path d="M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 C6.32842712,10 7,10.6715729 7,11.5 C7,12.3284271 6.32842712,13 5.5,13 Z M5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 C6.32842712,15 7,15.6715729 7,16.5 C7,17.3284271 6.32842712,18 5.5,18 Z" fill="#003366" opacity="0.3" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                    <a  class="kt-menu__link">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class="svg-icon svg-icon-primary" style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <rect fill="#ffb822" opacity="0.3" x="4" y="4" width="4" height="4" rx="1" />
                                                        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#ffb822" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                `
        );
        $("div.bos").html(`
                    <a class="kt-menu__link pr-0">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                              `
        );
    }



};
function getOrderProductsUpdateListViewCap(groupId, branchID, id) {
    debugger
    var table = $("#table_" + groupId);
    table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Order/GetOrderProductsUpdate?groupId=' + groupId + '&branchCode=' + branchID + '&orderID=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
           <'row'<'col-sm-12 mb-1 ml-0 text-left'<"toolbar">>>
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
                width: '1%',
            },
            {
                data: 'Code',
            },
            {
                data: 'Code',
            },
            {
                data: 'Code',
                className: 'dt-center',
            },

            {
                data: 'UnitWeight',
            },

            {
                data: 'MaxCapacity',
                className: 'dt-center',
            },
            {
                data: 'Code',
                className: 'dt-center',
            },
            { data: 'Comment', },
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
                    if (full['DiscountProd'] != "") {
                        returnHtml = `<div><i class="pr-2 icon-2x flaticon-add-label-button" style="font-size:15px;color:green;"></i> <span class="pb-1" style="color:green;">` + full['Code'] + `</span></div> `;
                    }
                    else
                        returnHtml = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;

                    return returnHtml;
                },
            },
            {
                targets: 2,
                width: '10px',
                className: 'dt-center',
                orderable: false,
                render: function (data, type, full, meta) {
                    var Check = full['CheckBox'];
                    var returnHtml = "";
                    if (Check == "True")
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                    else
                        if ((full['MaxCapacity']) == 0) {
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> b </b> 
                                            <input disabled id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                        }
                        else
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b> 
<input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + id + `"class="form-control" id="order_` + full['ID'] + `">
</div> `;
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
                width: '11%',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    debugger
                    if ((full['subtotal']) == "0" && full['CheckBox'] == "True")
                        full['subtotal'] = "Yok";

                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 50%;padding: 0rem 0.7rem;border-color: #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 50%;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
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
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input disabled type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last + `"class="form-control" id="countPoint_` + full['ID'] + `"> ` + colorUnit + `
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                    else
                        returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
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
                width: '13%',

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
                    if (full['DiscountProd'] != "")
                        discount = parseInt(full['Coefficient']);
                    if (isNaN(discount))
                        discount = 1;
                    if (full['quantity'] != "") {
                        if ((full['MaxCapacity']) == 0) {
                            returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"    id="subTotalNeg_` + full['ID'] + `"/>
                                    <input disabled required type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: red;" value="`+ full['quantity'] + `" onkeydown="UpDownKey(event)"  oninput="QuantityClickInputUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)"   class="form-control" id="subTotal_` + full['ID'] + `" /> ` + colorUnit + `
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+"  id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;


                        }
                        else
                            returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input required type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="`+ full['quantity'] + `" onkeydown="UpDownKey(event)"  oninput="QuantityClickInputUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    else {
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNegUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input required type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="" onkeydown="UpDownKey(event)"  oninput="QuantityClickInputUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  >` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdateCap(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
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
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['Comment'];
                    var output;
                    if (name != null) {
                        output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" style="min-width:180px;background-color: #f5e9f0;     border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                    }
                    else {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  value="" style="min-width:180px;background-color:#f5e9f0;border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)" id = "comment">
                                </div>
                  `;
                    }

                    return output;
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
    
    table.on('change', '.SelectBranchUpdate', function () {

        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');
        var id = $(this).val();
        var order = document.getElementById(`order_` + id);
        var discount = document.getElementById(`discount_` + id);
        var OrderControl = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
        var OrderControl2 = document.getElementById(`OrderControlPoint_` + id);

        if (checked == true) {
            debugger
            $(this).prop('checked', true);
            siparismiktar2.style.color = "blue";
            siparismiktar.value = "Yok";
            siparismiktar2.value = "Yok";
            OrderControl.value = "-";
            OrderControl2.value = "-";
            BasketToCheckUpdateCap(true, id, discount.value, order.value);

        }
        else {
            debugger
            $(this).prop('checked', false);
            $(this).closest('tr').removeClass('active');
            debugger
            OrderControl.value = 0;
            OrderControl2.value = 0;
            siparismiktar2.style.color = "black";
            siparismiktar.value = 0;
            siparismiktar2.value = 0;
            BasketToCheckUpdateCap(false, id, discount.value, order.value);
        }
    });
    $("div.toolbar").html(`
                    <a  class="kt-menu__link pr-0">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <path d="M10.5,5 L19.5,5 C20.3284271,5 21,5.67157288 21,6.5 C21,7.32842712 20.3284271,8 19.5,8 L10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 Z M10.5,10 L19.5,10 C20.3284271,10 21,10.6715729 21,11.5 C21,12.3284271 20.3284271,13 19.5,13 L10.5,13 C9.67157288,13 9,12.3284271 9,11.5 C9,10.6715729 9.67157288,10 10.5,10 Z M10.5,15 L19.5,15 C20.3284271,15 21,15.6715729 21,16.5 C21,17.3284271 20.3284271,18 19.5,18 L10.5,18 C9.67157288,18 9,17.3284271 9,16.5 C9,15.6715729 9.67157288,15 10.5,15 Z" fill="#ffb822" />
                                                        <path d="M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 C6.32842712,10 7,10.6715729 7,11.5 C7,12.3284271 6.32842712,13 5.5,13 Z M5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 C6.32842712,15 7,15.6715729 7,16.5 C7,17.3284271 6.32842712,18 5.5,18 Z" fill="#ffb822" opacity="0.3" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                    <a href="/Branch/UpdateOrder?id=`+ id + `" onclick="window.location.reload()" class="kt-menu__link">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class="svg-icon svg-icon-primary" style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <rect fill="#003366" opacity="0.3" x="4" y="4" width="4" height="4" rx="1" />
                                                        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#003366" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>`
    );
};
function getOrderProductsUpdateListView(groupId, branchID, id) {
    debugger
    var table = $("#table_" + groupId);
    table.DataTable({
        "bDestroy": true,
        ajax: {
            url: '/Order/GetOrderProductsUpdate?groupId=' + groupId + '&branchCode=' + branchID + '&orderID=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
            <'row'<'col-sm-12 mb-1 ml-0 text-left'<"toolbar">>>
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
                width: '10%',

            },
           
        ],
        order: [ [1, 'asc']],
        columnDefs: [
            {
                orderable: false,
                targets: 0,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml = "";
                    if (full['DiscountProd'] != "") {
                        returnHtml = `<div><i class="pr-2 icon-2x flaticon-add-label-button" style="font-size:15px;color:green;"></i> <span class="pb-1" style="color:green;">` + full['Code'] + `</span></div> `;
                    }
                    else
                        returnHtml = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;

                    return returnHtml;
                },
            },
            {
                targets: 5,
                width: '10px',
                className: 'dt-center',
                orderable: false,
                render: function (data, type, full, meta) {
                    var Check = full['CheckBox'];
                    var returnHtml = "";
                    if (Check == "True")
                        returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                    else
                      
                            returnHtml = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                    return returnHtml;
                },
            },
            {
                targets: 1,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b> 
<input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + id + `"class="form-control" id="order_` + full['ID'] + `">
</div> `;
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
                width: '11%',
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    debugger
                    var discount = 1;
                    if (full['DiscountProd'] != "")
                        discount = parseInt(full['Coefficient']);
                    if (isNaN(discount))
                        discount = 1;
                    if ((full['subtotal']) == "0" && full['CheckBox'] == "True")
                        full['subtotal'] = "Yok";

                    if ((full['ProductUnitName']) == "ADET" || (full['ProductUnitName']) == "adet" || (full['ProductUnitName']) == "Adet") {
                        colorUnit = `<input disabled type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: red;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;

                    }
                    else {
                        colorUnit = `<input disabled type="text" style="width: 45px;padding: 0rem 0.7rem;border-color:  #ffe8d6; border-radius: 0px 4px 4px 0px; height:2rem;background-color: #ffe8d6;text-align: left; font-size: 11px;   color: #002952;" value="` + full['ProductUnitName'].toLocaleUpperCase() + `" class="form-control" />`;
                    }

                    var totalPrintFormat = full['subtotal'].toString();
                    var last = "";
                    for (var i = totalPrintFormat.length; i > 0; i--) {
                        if (i % 3 == 0 && i != 0 && i != totalPrintFormat.length && totalPrintFormat.length > 3) {
                            last = last + ".";
                        }
                        last = last + totalPrintFormat[totalPrintFormat.length - i];
                    }
                    var returnHtmlSUB;
                    var subtotal = full['subtotal'];
                    var Required = "";
                    debugger
                    if (full['settings'] == "1") {

                        Required = "required";
                    }
                    if (full['CheckBox'] == "True") {
                        returnHtmlSUB = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input type="button" disabled class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg2Update(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                        subtotal = "Yok";
                        returnHtmlSUB += `<input type="text"` + Required + `  style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-radius:  4px 0px 0px 4px;border-color: #ffe8d6; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;"  value="` + subtotal + `"  oninput="QuantityClickInput2Update(` + full["ID"] + `,` + id + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">` + colorUnit ;
                        returnHtmlSUB += `<input disabled type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; border-radius:  4px 0px 0px 4px;height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos2Update(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalPlus1_` + full['ID'] + `"/>
                            </div>`;
                    }
                    else {
                        returnHtmlSUB = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 100px;">
                                    <input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNeg2Update(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalNeg1_` + full['ID'] + `"/>`;
                        if (full['CheckBox'] == "True") {

                        }
                        else if (full['subtotal'] != "") {
                            returnHtmlSUB += `<input ` + Required + ` type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6; border-radius:  4px 0px 0px 4px;height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + subtotal + `"  oninput="QuantityClickInput2Update(` + full["ID"] + `,` + id + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `">` + colorUnit;
                        }

                        else {
                            returnHtmlSUB += `<input ` + Required + ` type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius:  4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="" oninput="QuantityClickInput2Update(` + full["ID"] + `,` + id + `,` + discount + `)" class="form-control" id="count_` + full['ID'] + `"> ` + colorUnit ;
                        }
                        returnHtmlSUB += `<input type="button" class="btn btn-outline-warning btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPos2Update(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalPlus1_` + full['ID'] + `"/>
                            </div>`;
                    }
                   
                    
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
                width: '13%',

                orderable: false,
                className: 'dt-center',
                render: function (data, type, full, meta) {
                    var returnHtml;
                    var colorUnit;

                   
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
                    if (full['DiscountProd'] != "")
                        discount = parseInt(full['Coefficient']);
                    if (isNaN(discount))
                        discount = 1;
                    if (full['quantity'] != "") {

                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"   id="subTotalNeg_` + full['ID'] + `"/>
                                    <input required type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="`+ full['quantity'] + `" onkeydown="UpDownKey(event)"  oninput="QuantityClickInputUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdate(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                    }
                    
                    else {
                        returnHtml = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"  onclick="QuantityClickNegUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"  id="subTotalNeg_` + full['ID'] + `"/>
                                    <input required type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="" onkeydown="UpDownKey(event)"  oninput="QuantityClickInputUpdate(` + full["ID"] + `,` + id + `,` + discount + `)"  class="form-control" id="subTotal_` + full['ID'] + `"  >` + colorUnit + `
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdate(` + full["ID"] + `,` + id + `,` + discount + `)" id="subTotalPlus_` + full['ID'] + `"/>
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
                orderable: false,
                render: function (data, type, full, meta) {
                    var name = full['Comment'];
                    var output;
                    if (name != null) {
                        output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" style="min-width:180px;background-color: #f5e9f0;     border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)" id = "comment_` + full['ID'] + `" >

                                </div>`;
                    }
                    else {
                        output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  value="" style="min-width:180px;background-color:#f5e9f0;border: 2px solid #ffd3e2;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)" id = "comment">
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
   
    table.on('change', '.SelectBranchUpdate', function () {
        debugger
        var set = $(this).closest('table').find('td:first-child .kt-checkable');
        var checked = $(this).is(':checked');
        var id = $(this).val();
        var order = document.getElementById(`order_` + id);
        var discount = document.getElementById(`discount_` + id);
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
        var sonuc = document.getElementById(`subTotal_` + id);
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);

        if (checked == true) {
            debugger
            $(this).prop('checked', true);
            $(this).prop('disabled', true);
            $('#subTotalPlus1_' + id).prop('disabled', true);
            $('#subTotalNeg1_' + id).prop('disabled', true);
            siparismiktar.style.color = "blue";
            siparismiktar.value = "Yok";
           
            BasketToCheckUpdate(true, id, discount.value, order.value);
            if (sipariskontrol != null) {

                var z = Number(sonuc.value) - Number(MaxCapacity.value);
                var kontrol = Number(z).toLocaleString('tr');
                sipariskontrol2.value = kontrol;
                sipariskontrol.value = kontrol;
            }

        }
        else {
            debugger
            $(this).prop('checked', false);
            $(this).prop('disabled', true);
            $('#subTotalPlus1_' + id).prop('disabled', false);
            $('#subTotalNeg1_' + id).prop('disabled', false);
            $(this).closest('tr').removeClass('active');
            debugger

            siparismiktar.style.color = "black";
            siparismiktar.value = 0;
            if (sipariskontrol != null) {

                var z = Number(sonuc.value) - Number(MaxCapacity.value);
                var kontrol = Number(z).toLocaleString('tr');
                sipariskontrol2.value = kontrol;
                sipariskontrol.value = kontrol;
            }
            BasketToCheckUpdate(false, id, discount.value, order.value);
        }
    });
    $("div.toolbar").html(`
                    <a  class="kt-menu__link pr-0">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <path d="M10.5,5 L19.5,5 C20.3284271,5 21,5.67157288 21,6.5 C21,7.32842712 20.3284271,8 19.5,8 L10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 Z M10.5,10 L19.5,10 C20.3284271,10 21,10.6715729 21,11.5 C21,12.3284271 20.3284271,13 19.5,13 L10.5,13 C9.67157288,13 9,12.3284271 9,11.5 C9,10.6715729 9.67157288,10 10.5,10 Z M10.5,15 L19.5,15 C20.3284271,15 21,15.6715729 21,16.5 C21,17.3284271 20.3284271,18 19.5,18 L10.5,18 C9.67157288,18 9,17.3284271 9,16.5 C9,15.6715729 9.67157288,15 10.5,15 Z" fill="#ffb822" />
                                                        <path d="M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 C6.32842712,10 7,10.6715729 7,11.5 C7,12.3284271 6.32842712,13 5.5,13 Z M5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 C6.32842712,15 7,15.6715729 7,16.5 C7,17.3284271 6.32842712,18 5.5,18 Z" fill="#ffb822" opacity="0.3" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                    <a href="/Branch/UpdateOrder?id=`+id+`" onclick="window.location.reload()" class="kt-menu__link">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class="svg-icon svg-icon-primary" style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <rect fill="#003366" opacity="0.3" x="4" y="4" width="4" height="4" rx="1" />
                                                        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#003366" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>`
    );
};
function getOrderProductsUpdateCap(groupId, branchID,id) {
    debugger

    for (var i = 1; i < 5; i++) {
        var tables = $("#table" + i + "cap_" + groupId);
        var toolbar = "bos";
        if (i == 1)
            toolbar = "toolbar"
        var t = tables.DataTable({
            ajax: {
                url: '/Order/GetOrderProductsUpdate' + i + '?groupId=' + groupId + '&branchCode=' + branchID + '&orderID=' + id,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
            },
            "bDestroy": true,
            "paging": false,
            "info": false,
            "searching": false,
            "bSort": false,
            'stripeClasses': ['stripe1', 'stripe2'],

            dom: `<'row'<'col-sm-12 mb-1 ml-0 text-left'<" ` + toolbar +`">>>
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
                        if (full['DiscountProd'] != "") {
                            barcode = `<div><i class="pr-2 icon-2x flaticon-add-label-button" style="font-size:15px;color:green;"></i> <span class="pb-1" style="color:green;">` + full['Code'] + `</span></div> `;
                        }
                        else
                            barcode = `<span class="" style="color:blue;">` + full['Code'] + `</span> `;

                        var Check = full['CheckBox'];
                        var checkbox = "";
                        if (Check == "True")
                            checkbox = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input checked id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                        else {
                            if ((full['MaxCapacity']) == 0) {
                                checkbox = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> b </b> 
                                            <input disabled id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
                                            <span></span>
                                        </label>`;
                            }
                            else
                                checkbox = `
                                        <label class="kt-checkbox kt-checkbox--single kt-checkbox--solid kt-checkbox--danger"><b hidden style=" width:300px;  color:red;"> a </b> 
                                            <input  id="SelectBranchUpdate` + full['ID'] + `"  name="SelectBranchUpdate" type="checkbox" value="` + full['ID'] + `" class="m-checkable SelectBranchUpdate">
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
                                    <input disabled type="text" style="width: 45%;text-align: center;border-color: #ffe8d6;border-radius: 4px 4px 4px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last5 + `"class="form-control" id="countPoint_` + full['ID'] + `"> 
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 4px 4px 4px; height:2rem; color: blue;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

                    </div >`;
                        else
                            returnHtml = `
                            <div class="row pr-0 mr-0" style="justify-content: center;min-width: 130px; ">
                                    <input disabled type="text" style="width: 45%;text-align: center;border-color: #ffe8d6;border-radius:4px 4px 4px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + last5 + `"class="form-control" id="countPoint_` + full['ID'] + `">
                                    <input hidden type="text" style="width: 45%;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + full['subtotal'] + `"class="form-control" id="count_` + full['ID'] + `"> 

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
                                    <input disabled autocomplete="off" type="text"  placeholder="Açıklama" style="height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)"  id = "comment">
                                </div>
                  `;
                        }

                        else if (name != null) {
                            output = `
                               <div class="" style="justify-content: center;width:100%;">
                                 <input type="text" value="` + name + `" style="min-width:100px; height:25px;background-color: #fff0d0;     border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)"   id = "comment_` + full['ID'] + `" >

                                </div>`;
                        }
                        else {
                            output = `
                                <div id = "barcode_` + full['ID'] + `" class="" style="justify-content: center;width:100%;">
                                    <input autocomplete="off" type="text"  placeholder="Açıklama" style="height:25px; min-width:100px;background-color:#fff0d0;border: 1px solid #c3c3c3;font-size: 11px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" oninput= "UpdateOrderDet2Update(this.value,` + full['ID'] + `,` + id + `)"   id = "comment">
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
                            control = `<input hidden id = "OrderControl_` + full["ID"] + `" style="padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px;color:green;" type="text" class="pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >
`;

                        }
                        else if (x > 0) {
                            var totalPrintFormatx = Number(x);
                            var lastx = (totalPrintFormatx).toLocaleString('tr');
                            control = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:blue;" type="text" class="pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="+` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + lastx + `" name = "demo0" placeholder = "" >
`;

                        }
                        else if (x < 0) {
                            var lastx = (x).toLocaleString('tr');

                            control = `
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + lastx + `" name = "demo0" placeholder = "" >
                            <input hidden id="OrderControl_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >`;

                        }
                        else {

                            control = `
                            <input hidden id = "OrderControl_` + full["ID"] + `" style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.3rem;background-color: transparent;width:100%;text-align: center;border: 0px; color:green;" type="text" class=" pl-0 ml-0  form-control bootstrap-touchspin-vertical-btn MaxCapacity" value="` + x + `" name="demo0" placeholder="">
<input disabled id="OrderControlPoint_` + full["ID"] + `" style = "font-size: 1.3rem;background-color: transparent;width:100%;text-align: left;border: 0px; color:red;" type = "text" class=" pl-0 ml-0 mr-0 pr-0 form-control bootstrap-touchspin-vertical-btn MaxCapacity" value = "` + x + `" name = "demo0" placeholder = "" >
`;

                        }
                        var capacity = `
                            <span  name="demo0" placeholder="">` + format2 + `</span>

                            <input hidden id = "MaxCapacity_` + full["ID"] + `" style="padding-bottom: 0;padding-left: 0;padding-top: 0;margin-top: 0; font-size: 1.3rem;   background-color: transparent;width:100%;text-align: center;border: 0px;" type="text" class="form-control bootstrap-touchspin-vertical-btn" value="` + full['MaxCapacity'] + `"  name="demo0" placeholder="">
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
                        if (full['DiscountProd'] != "")
                            discount3 = parseInt(full['Coefficient']);
                        debugger
                        if (isNaN(discount3))
                            discount3 = 1;
                        if (full['quantity'] != "") {
                            if ((full['MaxCapacity']) == 0) {
                                QuantityReturn = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input disabled type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-"    id="subTotalNeg_` + full['ID'] + `"/>
                                    <input disabled ` + Required + ` type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: red;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)" class="form-control" id="subTotal_` + full['ID'] + `" />
                                    <input disabled type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+"  id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                            }
                            else
                                QuantityReturn = `
                            <div class="row" style="justify-content: center;min-width: 155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)"id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + `  type="text" style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px; height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="` + full['quantity'] + `" onkeydown="UpDownKey(event)" oninput="QuantityClickInputUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)"  class="form-control" id="subTotal_` + full['ID'] + `" />
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount3 + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)"id="subTotalPlus_` + full['ID'] + `"/>
                            </div>`;
                        }
                        else {
                            QuantityReturn = `
                            <div class="row" style="justify-content: center;min-width:155px;">
                                   <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.6rem; height: 2rem;font-size: 14px;" value="-" onclick="QuantityClickNegUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)"id="subTotalNeg_` + full['ID'] + `"/>
                                    <input ` + Required + `  type="text"  style="width: 45px;padding: 0rem 0.7rem;border-color: #f0f8ff; border-radius: 4px 0px 0px 4px;height:2rem;background-color: aliceblue;text-align: center; font-size: 1.3rem;   color: #002952;" value="" onkeydown="UpDownKey(event)" oninput="QuantityClickInputUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)" class="form-control" id="subTotal_` + full['ID'] + `"  >
                                    <input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + discount3 + `"class="form-control" id="discount_` + full['ID'] + `">
                                    <input type="button" class="btn btn-outline-brand btn-elevate" style="padding: 0.0rem 0.4rem; height: 2rem;font-size: 14px;" value="+" onclick="QuantityClickPosUpdateCap(` + full["ID"] + `,` + id + `,` + discount3 + `)" id="subTotalPlus_` + full['ID'] + `"/>
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
                                    <span  style="width:185px;"><b style=" width:300px;  color:red;"> ` + full['Name'] + `</b> (` + format + " TL" + `) ` + `</span>
<input hidden type="text" style="width: 45px;text-align: center;padding: 0rem 0.7rem;border-color: #ffe8d6;border-radius: 4px 0px 0px 4px; height:2rem; color: #000000;;background-color: #ffe8d6;font-size: 1.3rem;" value="` + id + `"class="form-control" id="order_` + full['ID'] + `">

                                </div>
                                <div class="col-12">
                                   <div class="row">
                                        
                                        <div class="col-12 " style="text-align:left;">
                                       <span class="" style="color:blue;">` + barcode + ` - </span>   ` + colorUnit + unitweight + `
                                        </div>
                                        
                                     
                                    </div>
                                </div>
                                
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-6 pr-5 mr-0">
                                            <label>Eldeki Stok</label>
                                        </div>
                                        <div class="col-4 pr-0" style="text-align:left;">
                                            <label>Sipariş</label>
                                        </div>
                                 <div class="col-1 " style="text-align:left;">
                                            <label>Yok</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-5">
                                        ` + QuantityReturn + `
                                        </div>
                                        <div class="col-5">
                                                ` + returnHtml + `
                                        </div>
                                        <div class="col-2" style="text-align:center;text-align:left;">
                                        ` + checkbox + `
                                        </div>
                                    </div>
                                </div>
                                    <div class="col-12">
                                    <div class="row">
                                        <div class="col-6 pr-0 mr-0" style="align-self: center; text-align:center;" >
                                            <label>Kapasite: ` + capacity + `</label>
                                        </div>
                                        
                                       <div class="col-4 pr-0 mr-0" style="align-self: center;text-align:left;"  >
                                    <label>Sipariş Kontrol:</label>

                                </div>
                                <div class="col-2" style="align-self: center;text-align:left;" >
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

        tables.on('change', '.SelectBranchUpdate', function () {
            debugger
            var set = $(this).closest('tables').find('td:first-child .kt-checkable');
            var checked = $(this).is(':checked');
            var id = $(this).val();
            var discount = document.getElementById(`discount_` + id);
            var siparismiktar = document.getElementById(`count_` + id);
            var siparismiktar2 = document.getElementById(`countPoint_` + id);
            var OrderControl = document.getElementById(`OrderControl_` + id);       
            var OrderControl2 = document.getElementById(`OrderControlPoint_` + id);
            var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
            var sonuc = document.getElementById(`subTotal_` + id);

            var order = document.getElementById(`order_` + id);
            if (checked == true) {
                debugger
                $(this).prop('checked', true);
                $(this).prop('disabled', true);

                siparismiktar2.style.color = "blue";
                siparismiktar.value = "Yok";
                siparismiktar2.value = "Yok";
                OrderControl.value = "-";
                OrderControl2.value = "-";
                BasketToCheckUpdateCap(true, id, discount.value, order.value);

            }
            else {
                debugger
                $(this).prop('checked', false);
                $(this).prop('disabled', true);

                $(this).closest('tr').removeClass('active');
                
                siparismiktar2.style.color = "black";
                var y = Number(MaxCapacity.value) - Number(sonuc.value);
                var kontrolOrder = Number(y).toLocaleString('tr');
                siparismiktar.value = kontrolOrder;
                siparismiktar2.value = kontrolOrder;
                var z = Number(sonuc.value) + Number(siparismiktar.value) - Number(MaxCapacity.value);
               
                var kontrol = Number(z).toLocaleString('tr');
                OrderControl2.value = kontrol;
                OrderControl.value = kontrol;
                BasketToCheckUpdateCap(false, id, discount.value, order.value);
            }
        });
        $("div.toolbar").html(`
                        
                                    <a href="/Branch/UpdateOrder?id=`+ id + `?list" onclick="window.location.reload()" class="kt-menu__link pr-0">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <path d="M10.5,5 L19.5,5 C20.3284271,5 21,5.67157288 21,6.5 C21,7.32842712 20.3284271,8 19.5,8 L10.5,8 C9.67157288,8 9,7.32842712 9,6.5 C9,5.67157288 9.67157288,5 10.5,5 Z M10.5,10 L19.5,10 C20.3284271,10 21,10.6715729 21,11.5 C21,12.3284271 20.3284271,13 19.5,13 L10.5,13 C9.67157288,13 9,12.3284271 9,11.5 C9,10.6715729 9.67157288,10 10.5,10 Z M10.5,15 L19.5,15 C20.3284271,15 21,15.6715729 21,16.5 C21,17.3284271 20.3284271,18 19.5,18 L10.5,18 C9.67157288,18 9,17.3284271 9,16.5 C9,15.6715729 9.67157288,15 10.5,15 Z" fill="#003366" />
                                                        <path d="M5.5,8 C4.67157288,8 4,7.32842712 4,6.5 C4,5.67157288 4.67157288,5 5.5,5 C6.32842712,5 7,5.67157288 7,6.5 C7,7.32842712 6.32842712,8 5.5,8 Z M5.5,13 C4.67157288,13 4,12.3284271 4,11.5 C4,10.6715729 4.67157288,10 5.5,10 C6.32842712,10 7,10.6715729 7,11.5 C7,12.3284271 6.32842712,13 5.5,13 Z M5.5,18 C4.67157288,18 4,17.3284271 4,16.5 C4,15.6715729 4.67157288,15 5.5,15 C6.32842712,15 7,15.6715729 7,16.5 C7,17.3284271 6.32842712,18 5.5,18 Z" fill="#003366" opacity="0.3" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                    <a  class="kt-menu__link">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class="svg-icon svg-icon-primary" style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <rect x="0" y="0" width="30" height="30" />
                                                        <rect fill="#ffb822" opacity="0.3" x="4" y="4" width="4" height="4" rx="1" />
                                                        <path d="M5,10 L7,10 C7.55228475,10 8,10.4477153 8,11 L8,13 C8,13.5522847 7.55228475,14 7,14 L5,14 C4.44771525,14 4,13.5522847 4,13 L4,11 C4,10.4477153 4.44771525,10 5,10 Z M11,4 L13,4 C13.5522847,4 14,4.44771525 14,5 L14,7 C14,7.55228475 13.5522847,8 13,8 L11,8 C10.4477153,8 10,7.55228475 10,7 L10,5 C10,4.44771525 10.4477153,4 11,4 Z M11,10 L13,10 C13.5522847,10 14,10.4477153 14,11 L14,13 C14,13.5522847 13.5522847,14 13,14 L11,14 C10.4477153,14 10,13.5522847 10,13 L10,11 C10,10.4477153 10.4477153,10 11,10 Z M17,4 L19,4 C19.5522847,4 20,4.44771525 20,5 L20,7 C20,7.55228475 19.5522847,8 19,8 L17,8 C16.4477153,8 16,7.55228475 16,7 L16,5 C16,4.44771525 16.4477153,4 17,4 Z M17,10 L19,10 C19.5522847,10 20,10.4477153 20,11 L20,13 C20,13.5522847 19.5522847,14 19,14 L17,14 C16.4477153,14 16,13.5522847 16,13 L16,11 C16,10.4477153 16.4477153,10 17,10 Z M5,16 L7,16 C7.55228475,16 8,16.4477153 8,17 L8,19 C8,19.5522847 7.55228475,20 7,20 L5,20 C4.44771525,20 4,19.5522847 4,19 L4,17 C4,16.4477153 4.44771525,16 5,16 Z M11,16 L13,16 C13.5522847,16 14,16.4477153 14,17 L14,19 C14,19.5522847 13.5522847,20 13,20 L11,20 C10.4477153,20 10,19.5522847 10,19 L10,17 C10,16.4477153 10.4477153,16 11,16 Z M17,16 L19,16 C19.5522847,16 20,16.4477153 20,17 L20,19 C20,19.5522847 19.5522847,20 19,20 L17,20 C16.4477153,20 16,19.5522847 16,19 L16,17 C16,16.4477153 16.4477153,16 17,16 Z" fill="#ffb822" />
                                                    </g>
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                                `
        );
        $("div.bos").html(`
                    <a class="kt-menu__link pr-0">
                                        <span class="kt-menu__link-text" style=" font-size: 14px; ">
                                            <span class=" svg-icon svg-icon-primary " style="padding-top:2px;">
                                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="30px" height="30px" viewBox="0 0 24 24" version="1.1">
                                                    
                                                </svg><!--end::Svg Icon-->
                                            </span>
                                        </span>
                                    </a>
                              `
        );
    }

};
function BasketToCheckUpdate(bool, id, discount, order) {

    $.ajax({
        type: 'POST',
        url: '/Order/BasketToCheckUpdate?CheckBox=' + bool + '&ProductID=' + id + '&OrderID=' + order + '&discount=' + discount,
        success: function (Subtotal) {
            $('#SelectBranchUpdate' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Sipariş No bulunamadı", "error");
        }
    });
};

function QuantityClickPosUpdate(id, OrderID, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalPlus_' + id).prop('disabled', true);

    if (sonuc.value >= 0) {

        sonuc.value = Number(sonuc.value) + 1;
        var siparismiktar = document.getElementById(`count_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);

        var eldekistok = sonuc;


        //table.DataTable().ajax.reload();

    }
    
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
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
function QuantityClickInputUpdate(id, OrderID, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);

    if (sonuc.value >= 0 && sonuc.value != "") {
        var siparismiktar = document.getElementById(`count_` + id);

        var count = siparismiktar.value;
        if (siparismiktar.value == "Yok")
            count = 0;
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        if (sipariskontrol != null) {

            var z = Number(sonuc.value) + Number(count) - Number(MaxCapacity.value);
            var kontrol = Number(z).toLocaleString('tr');
            sipariskontrol2.value = kontrol;
            sipariskontrol.value = kontrol;
        }
        $.ajax({
            type: 'POST',
            url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
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
function QuantityClickNegUpdate(id, OrderID, discount) {
    debugger

    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalNeg_' + id).prop('disabled', true);

    if (sonuc.value > 0) {
        sonuc.value = Number(sonuc.value) - 1;
    }
    else if (sonuc.value == "") {

        sonuc.value = Number(0);
    }

    var siparismiktar = document.getElementById(`count_` + id);


    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#productCountTotal').val(Total);
            $('#subTotalNeg_' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });

};
function QuantityClickPos2Update(id, OrderID, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalPlus1_' + id).prop('disabled', true);
    var siparismiktar = document.getElementById(`count_` + id);

    if (siparismiktar.value >= 0) {

        siparismiktar.value = Number(siparismiktar.value) + 1;

        //table.DataTable().ajax.reload();

    }

    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#productCountTotal').val(Total);
            $('#subTotalPlus1_' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
    /*productCountTotal(branchId);*/

};
function QuantityClickInput2Update(id, OrderID, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);
    var siparismiktar = document.getElementById(`count_` + id);

    if (siparismiktar.value >= 0 && siparismiktar.value != "") {

        var count = siparismiktar.value;
        if (siparismiktar.value == "Yok")
            count = 0;
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        if (sipariskontrol != null) {

            var z = Number(sonuc.value) + Number(count) - Number(MaxCapacity.value);
            var kontrol = Number(z).toLocaleString('tr');
            sipariskontrol2.value = kontrol;
            sipariskontrol.value = kontrol;
        }
        $.ajax({
            type: 'POST',
            url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
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
function QuantityClickNeg2Update(id, OrderID, discount) {
    debugger

    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalNeg1_' + id).prop('disabled', true);
    var siparismiktar = document.getElementById(`count_` + id);
    if (siparismiktar.value > 0) {
        siparismiktar.value = Number(siparismiktar.value) - 1;
    }
    else if (siparismiktar.value == "") {

        siparismiktar.value = Number(0);
    }

    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var sipariskontrol2 = document.getElementById(`OrderControlPoint_` + id);
    var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
    if (sipariskontrol != null) {

        var z = Number(sonuc.value) + Number(count) - Number(MaxCapacity.value);
        var kontrol = Number(z).toLocaleString('tr');
        sipariskontrol2.value = kontrol;
        sipariskontrol.value = kontrol;
    }
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#productCountTotal').val(Total);
            $('#subTotalNeg1_' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });

};
function BasketToCheckUpdateCap(bool, id, discount, order) {

    $.ajax({
        type: 'POST',
        url: '/Order/BasketToCheckUpdateCap?CheckBox=' + bool + '&ProductID=' + id + '&OrderID=' + order + '&discount=' + discount,
        success: function (Subtotal) {
            $('#SelectBranchUpdate' + id).prop('disabled', false);

            if (bool == false) {
                debugger
                var siparismiktar = document.getElementById(`count_` + id);
                var siparismiktar2 = document.getElementById(`countPoint_` + id);
                siparismiktar.value = Subtotal;
                var totalPrintFormat = Number(Subtotal).toLocaleString('tr');
               
                siparismiktar2.value = totalPrintFormat;

            }
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Sipariş No bulunamadı", "error");
        }
    });
};
function QuantityClickPosUpdateCap(id, OrderID, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);
    $('#subTotalPlus_' + id).prop('disabled', true);

    if (sonuc.value >= 0) {

        sonuc.value = Number(sonuc.value) + 1;
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
    }
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
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
function QuantityClickInputUpdateCap(id, OrderID, discount) {
    debugger
    var sonuc = document.getElementById(`subTotal_` + id);

    if (sonuc.value >= 0 && sonuc.value != "") {
        var sipariskontrol = document.getElementById(`OrderControl_` + id);
        var siparismiktar = document.getElementById(`count_` + id);
        var eldekistok = sonuc;
        var MaxCapacity = document.getElementById(`MaxCapacity_` + id);
        var siparismiktar2 = document.getElementById(`countPoint_` + id);
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
        var count = siparismiktar.value;
        if (siparismiktar.value == "Yok")
            count = 0;
        $.ajax({
            type: 'POST',
            url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
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
function QuantityClickNegUpdateCap(id, OrderID, discount) {
    debugger

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
    var count = siparismiktar.value;
    if (siparismiktar.value == "Yok")
        count = 0;
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketOtoOrderUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + sonuc.value + '&count=' + count,
        dataType: "json",
        success: function (Total) {
            $('#productCountTotal').val(Total);
            $('#subTotalNeg_' + id).prop('disabled', false);

        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });

};
function productCountTotalUpdate(OrderID) {
    $.ajax({
        type: "POST",
        url: '/Order/productCountTotalUpdate?OrderID=' + OrderID,
        success: function (Total) {
            $('#productCountTotal').val(Total);
        },
        error: function (request, status, error) {
            swal.fire("Hata!", "Bir sorun ile karşılaşıldı! Ürün Sayısı Bulunamadı...", "error");
        }
    });
};
function UpdateOrderDet2Update(val, id, GroupID) {
    debugger
    $.ajax({
        type: 'POST',
        url: '/Order/ForSaveOrderUpdate?productId=' + id + '&GroupID=' + GroupID + '&comment=' + val,
        dataType: "json",
    });
};
function toBasket2Update(val, id, OrderID) {
    debugger
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasketUpdate?productId=' + id + '&OrderID=' + OrderID + '&subTotal=' + val,
        dataType: "json"
    });
};
function toBasketUpdate(val, id, OrderID) {
    debugger
    $.ajax({
        type: 'POST',
        url: '/Order/ToBasket2Update?productId=' + id + '&OrderID=' + OrderID + '&count=' + val,
        dataType: "json"
    });
};
function reloadTableUpdate(id, GroupID) {
    debugger
    var branchId = $('#branch').val();
    var table = $("#table_" + id);
    getOrderProductsUpdate(GroupID, branchId, id);
    table.DataTable().ajax.reload();

};

function reloadTableAbsUpdate() {
    debugger
    var url = window.location.href;
    var OrderCode = url.substring(url.lastIndexOf('=') + 1);
    getOrderAbsUpdate(OrderCode);

};
function changeBGUpdate(id, GroupID) {
    productCountTotalUpdate(GroupID);
    var btn = $("#subTotalNeg_" + id);
    var inputCtrl = $("#OrderControl_" + id);
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var tr = btn.parents('tr');
    if (sipariskontrol.value < 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-primary');
        tr.addClass('bg-danger');
        inputCtrl.addClass('text-danger');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-success');
    }
    else if (sipariskontrol.value > 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-danger');
        tr.addClass('bg-primary');
        inputCtrl.addClass('text-primary');
        inputCtrl.removeClass('text-success');
        inputCtrl.removeClass('text-danger');
    }
    else if (sipariskontrol.value == 0) {
        tr.addClass('bg-success');
        tr.removeClass('bg-primary');
        tr.removeClass('bg-danger');
        inputCtrl.addClass('text-success');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-danger');
    }
}
function changeBG1Update(id, GroupID) {
    productCountTotalUpdate(GroupID);
    var inputCtrl = $("#OrderControl_" + id);
    var btn = $("#subTotalPlus_" + id);
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var tr = btn.parents('tr');
    if (sipariskontrol.value < 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-primary');
        tr.addClass('bg-danger');
        inputCtrl.addClass('text-danger');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-success');
    }
    else if (sipariskontrol.value > 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-danger');
        tr.addClass('bg-primary');
        inputCtrl.addClass('text-primary');
        inputCtrl.removeClass('text-success');
        inputCtrl.removeClass('text-danger');
    }
    else if (sipariskontrol.value == 0) {
        tr.addClass('bg-success');
        tr.removeClass('bg-primary');
        tr.removeClass('bg-danger');
        inputCtrl.addClass('text-success');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-danger');
    }
}
function changeBG2Update(id, GroupID) {
    productCountTotalUpdate(GroupID);
    var inputCtrl = $("#OrderControl_" + id);
    var btn = $("#subTotalNeg1_" + id);
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var tr = btn.parents('tr');
    if (sipariskontrol.value < 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-primary');
        tr.addClass('bg-danger');
        inputCtrl.addClass('text-danger');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-success');
    }
    else if (sipariskontrol.value > 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-danger');
        tr.addClass('bg-primary');
        inputCtrl.addClass('text-primary');
        inputCtrl.removeClass('text-success');
        inputCtrl.removeClass('text-danger');
    }
    else if (sipariskontrol.value == 0) {
        tr.addClass('bg-success');
        tr.removeClass('bg-primary');
        tr.removeClass('bg-danger');
        inputCtrl.addClass('text-success');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-danger');
    }
}
function changeBG3Update(id, GroupID) {
    productCountTotalUpdate(GroupID);
    var inputCtrl = $("#OrderControl_" + id);
    var btn = $("#subTotalPlus1_" + id);
    var sipariskontrol = document.getElementById(`OrderControl_` + id);
    var tr = btn.parents('tr');
    if (sipariskontrol.value < 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-primary');
        tr.addClass('bg-danger');
        inputCtrl.addClass('text-danger');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-success');
    }
    else if (sipariskontrol.value > 0) {
        tr.removeClass('bg-success');
        tr.removeClass('bg-danger');
        tr.addClass('bg-primary');
        inputCtrl.addClass('text-primary');
        inputCtrl.removeClass('text-success');
        inputCtrl.removeClass('text-danger');
    }
    else if (sipariskontrol.value == 0) {
        tr.addClass('bg-success');
        tr.removeClass('bg-primary');
        tr.removeClass('bg-danger');
        inputCtrl.addClass('text-success');
        inputCtrl.removeClass('text-primary');
        inputCtrl.removeClass('text-danger');
    }
}
function getOrderAbsUpdate(id) {
    debugger
    var d = 0;
    var z = "";

    var table = $("#tableOrderAbstract");
    var t = table.DataTable({
        "bDestroy": true,
        paging: true,

        ajax: {
            url: '/Order/getOrderAbsUpdate?OrderID=' + id,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
        },
        "pageLength": 100,
        'stripeClasses': ['stripe1', 'stripe2'],
        dom: `
            <'row'<'col-sm-6 text-left'f><'col-sm-6 text-right'B>>
			<'row'<'col-sm-12'tr>>
			<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7 dataTables_pager'lp>>
            `,
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
                width: '5%',

            },
            {
                data: 'Code',
                orderable: false,
                className: 'dt-center',
                width: '10%',

            },
            {
                data: 'Name',
                orderable: false,

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
                data: 'Comment',
                className: 'dt-center',
                orderable: false,

            },
            {
                data: 'Group2',
                visible: false

            },

        ],
        order: [[8, 'asc'], [3, 'asc']],
        columnDefs: [
            {
                targets: 2,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div><b style="color:blue;"> ` + full['Code'] + `</b></div> `;
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
                targets: 3,
                className: '',
                render: function (data, type, full, meta) {
                    var returnHtml = `<div><b style="color:red;"> ` + full['Name'] + `</b></div> `;
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

        ],

        responsive: false,
        "scrollX": true,
        orderCellsTop: true,
        fixedHeader: true,
        "destroy": true,

        "footerCallback": function (row, data, start, end, display) {
            var api = this.api(), data;

            // converting to interger to find total
            var intVal = function (i) {
                return typeof i === 'string' ?
                    i.replace(/[\$,]/g, '') * 1 :
                    typeof i === 'number' ?
                        i : 0;
            };

            // computing column Total of the complete result 
            debugger

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
            debugger
            var totalPrintFormat2 = wedTotal.toString();
            var last2 = "";
            for (var i = totalPrintFormat2.length; i > 0; i--) {
                if (i % 3 == 0 && i != 0 && i != totalPrintFormat2.length && totalPrintFormat2.length > 3) {
                    last2 = last2 + ".";
                }
                last2 = last2 + totalPrintFormat2[totalPrintFormat2.length - i];
            }
            // Update footer by showing the total with the reference of the column index 
            $(api.column(0).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(1).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(2).footer()).html('').addClass("bg-primary dt-center");
            $(api.column(3).footer()).html('Toplam').addClass("bg-primary dt-center");
            $(api.column(5).footer()).html(last).addClass("dt-center bg-primary");
            $(api.column(6).footer()).html(last2).addClass("bg-primary");
            $(api.column(7).footer()).html('').addClass("bg-primary");

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