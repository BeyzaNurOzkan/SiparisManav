 using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Entity;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class CenterController : Controller
    {
        REContext db = new Entity.REContext();

        // GET: Center
        public ActionResult StateOrderList()
        {
            return View();
        }
        public ActionResult StateOrderListViewOff(int id)
        {
            TempData["id"] = id;

            return View();
        }
        public string GetStateOrder(int id)
        {
            TempData["id"] = id;
            var orderProductList = new
            {
                data = from order in db.Orders.Where(q => q.ID == id)
                       from orderdetails in order.orderDetails.DefaultIfEmpty()
                       from product in db.Products.Where(q => orderdetails.ProductID == q.ID).DefaultIfEmpty()
                       from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty().Take(1)
                       from branch in db.Branchs.Where(q => q.ID == order.BranchCode)
                       from QuantityModel in db.quantityModels.Where(q => q.StockCode == product.ProductCode && q.BranchCode == branch.BranchCode).DefaultIfEmpty()
                           //from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from Barcode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from Group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID).DefaultIfEmpty()
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == Group3.ProductGroup2ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == branch.FormatID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           Code = Barcode.Code,
                           ProductUnitName = unit.Name.ToUpper(),
                           SubTotal = orderdetails.SubTotal.ToString(),
                           Quantity = orderdetails.Quantity.ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           Group2 = Group2.Name.ToUpper(),
                           Comment = orderdetails.Comment


                       }
            };


            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(orderProductList);
        }
        public string GetStateOrderOff(int id)
        {

            TempData["id"] = id;
            string orderID = id.ToString();
            int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);

            var orderProductList = new
            {
                data = from order in db.Orders.Where(q => q.ID == id)
                       from orderdetails in order.orderDetails.DefaultIfEmpty()
                       from product in db.Products.Where(q => orderdetails.ProductID == q.ID).DefaultIfEmpty()
                       //from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty().Take(1)
                       from branch in db.Branchs.Where(q => q.ID == order.BranchCode)
                       from QuantityModel in db.quantityModels.Where(q => q.StockCode == product.ProductCode && q.BranchCode == branch.BranchCode).DefaultIfEmpty()
                           //from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1)
                       //from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       //from Barcode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from Group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID).DefaultIfEmpty()
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == Group3.ProductGroup2ID).DefaultIfEmpty()
                       //from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == branch.FormatID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           Code = product.ProductCode,
                           ProductUnitName ="Adet",
                           SubTotal = orderdetails.SubTotal.ToString(),
                           Quantity = orderdetails.Quantity.ToString(),
                           MaxCapacity = QuantityModel.StockQuantity.ToString(),
                           Group2 = Group2.Name.ToUpper(),
                           Comment = orderdetails.Comment,
                           CheckBox=orderdetails.CheckBox,
                           Group2ID =Group2.ID,
                           user= db.Notifications.Where(p => p.Content.Contains(order.OrderNo.ToString())).OrderByDescending(q => q.lastNotificationTime).Select(q=>q.SendUser.FirstName.ToUpper()+" "+q.SendUser.LastName.ToUpper()).FirstOrDefault(),
                           branchName=branch.BranchName,
                           userName = order.userName,
                           Safe = (from orderDet in order.orderDetails
                                   from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select orderDet.SubTotal).Sum().ToString(),
                           Point = (from orderDet in order.orderDetails
                                    from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                    from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "ADET")
                                    select orderDet.SubTotal).Sum().ToString(),
                           Box = ((from orderDet in order.orderDetails
                                   from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select orderDet.SubTotal).Sum() / settings).ToString(),
                       }
            };


            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(orderProductList);
        }
        public string GetProducts()
        {
            var productList = new
            {

                data = from product in db.Products
                       where product.isDeleted == false
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from ProductGroup3s in db.ProductGroup3s.Where(q => product.ProductGroup3ID == q.ID).DefaultIfEmpty()
                       from ProductGroup2ss in db.ProductGroup2s.Where(q => ProductGroup3s.ProductGroup2ID == q.ID).DefaultIfEmpty()
                       from ProductGroup1ss in db.ProductGroups.Where(q => ProductGroup2ss.ProductGroupID == q.ID).DefaultIfEmpty()
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           Code = product.ProductCode,
                           Visible = product.Visible,
                           isDeleted = product.isDeleted,
                           CreatedDate = product.CreateDate,
                           LastUpdateDate = product.LastUpdateDate,
                           SectorCode = product.SectorCode,
                           RayonCode = product.RayonCode,
                           BrandCode = product.BrandCode,
                           ModelCode = product.ModelCode,
                           RawMaterialCode = product.RawMaterialCode,
                           SeasonCode = product.SeasonCode,
                           PlaceCode = product.PlaceCode,
                           Barcode = barcode.Code,
                           Units = unit2.Name.ToUpper(),
                           Photo=product.Photo.ToString(),
                           ProductGroupUrl = (ProductGroup1ss.Name + ", " + ProductGroup2ss.Name + ", ").ToUpper(),
                           ProductGroupUr2= ProductGroup3s.Name.ToUpper(),
                           UnitName = from unit in db.unitFormats.Where(q => q.UnitName != unit2.Name)
                                      select unit.UnitName
                       }
            };
            foreach (var item in productList.data)
            {
                string a = item.Name;
            }
            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(productList);
        }
        public JsonResult productCountandOrderCode(int orderID)
        {
            Order order = db.Orders.Find(orderID);
            Branch branch = db.Branchs.Find(order.BranchCode);
            var productList = new
            {
                Id = order.ID,
                BranchName = branch.BranchName.ToUpper(),
                CountOrder = ((from orderdetail in db.OrderDetails.Where(q => q.OrderID == order.ID).DefaultIfEmpty()
                               select orderdetail).Count()).ToString(),
                OrderNo = order.OrderNo,
                ApprovalStatus = order.ApprovalStatus,
                CreateDate = order.CreateDate
            };

            return Json(productList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult ReloadTable()
        {
            string result = "Güncelleme Tamamlandı.";
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult UpdateUnit(int ID, int currentUser, int lastname, string firstname, int Weight)
        {
            UnitFormat format = db.unitFormats.Find(ID);
            format.UnitName = firstname;
            format.Weight = Weight;
            format.LastUpdateDate = DateTime.Now;
            format.CreateDate = DateTime.Now;
            format.UserID = currentUser;
            format.Factor = lastname;
            db.SaveChanges();
            return RedirectToAction("UnitList", "Center");
        }

    }
}