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
        public ActionResult StateOrderReportHorizontal()
        {
            return View();
        }
        public ActionResult StateOrderListView(int id)
        {
            TempData["id"] = id;

            return View();
        }
        public ActionResult StateOrderListViewForBranch(int id)
        {
            TempData["id"] = id;

            return View();
        }
        public ActionResult StateOrderListViewOff(int id)
        {
            TempData["id"] = id;

            return View();
        }
        public ActionResult StateOrderListViewOffForBranch(int id)
        {
            TempData["id"] = id;

            return View();
        }
        public ActionResult ProductCapacityListView(int? id = 0)
        {
            return View();
        }
        public ActionResult OrderShipmentSummary()
        {
            return View();
        }
        public ActionResult OrderShipmentDistributions(int? id = 0)
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
        public string GetStateOrderForBranch(int id)
        {
            TempData["id"] = id;
            string orderID = id.ToString();
            int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);

            var orderProductList = new
            {
                data = from order in db.Orders.Where(q => q.ID == id)
                       from orderdetails in order.orderDetails.DefaultIfEmpty()
                       from product in db.Products.Where(q => orderdetails.ProductID == q.ID).DefaultIfEmpty()
                       from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty().Take(1)
                       from branch in db.Branchs.Where(q => q.ID == order.BranchCode)
                       from QuantityModel in db.quantityModels.Where(q => q.StockCode == product.ProductCode && q.BranchCode == branch.BranchCode).DefaultIfEmpty()
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
                           Comment = orderdetails.Comment,
                           OrderNo = order.OrderNo


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
                           Comment = orderdetails.Comment,
                           Group2ID=Group2.ID,
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

        public ActionResult StateOrderReport()
        {
            return View();
        }
        public ActionResult WarehouseStockReport()
        {
            return View();
        }
        public ActionResult StockReportFollow()
        {
            return View();
        }
        public ActionResult PBWarehouseStockReport()
        {
            return View();
        }
        public ActionResult ProductPurchaseList()
        {
            return View();
        }
        public ActionResult ProductPurchaseReceipt()
        {
            return View();
        }
        public ActionResult ProductList()
        {
            return View();
        }
        public ActionResult UnitList()
        {
            return View();
        }
        public ActionResult NewStock()
        {
            return View();
        }
        public ActionResult StockReportUpdate(int id)
        {
            TempData["StockID"] = id;
            return View();
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


        [HttpPost]
        public JsonResult EditProducts(int id)
        {
            Product product = db.Products.Find(id);

            BarcodeModels barcode = db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).DefaultIfEmpty().First();
            if (barcode == null)
            {
                barcode = db.barcodeModels.Where(q => q.Code == "Tanımsız").First();
            }
            ProductGroup3 productGroup3 = db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID).DefaultIfEmpty().First();
            var nextid = db.Products.Where(q => string.Compare(q.Name,product.Name)==1).OrderBy(q => q.Name).Select(q => q.ID).Take(1).DefaultIfEmpty();
            //var nextid2 = db.Products.Where(q => q.ID > product.ID).OrderBy(q => q.ID).Select(q => q.ID).Take(1).DefaultIfEmpty();
            var backid = db.Products.Where(q => string.Compare(q.Name, product.Name) == -1).OrderByDescending(q => q.Name).Select(q => q.ID).Take(1).DefaultIfEmpty();
            Unit unit = db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).FirstOrDefault();
            string Name; double factor; double Weight;
            User user = db.Users.Find(product.LastUpdateUserID);
            User user2 = db.Users.Find(product.CreateUserID);
            if (unit == null)
            {
                Name = "Tanımsız";
                factor = 0;
                Weight = 0;
            }
            else
            {
                Name = unit.Name;
                factor = unit.Factor;
                Weight = unit.Weight;

            }
            if (productGroup3 == null)
            {
                var prdct = new
                {
                    Barcode = barcode.Code,
                    ProductCode = product.ProductCode,
                    Name = product.Name,
                    ProductForeignKey = product.ForeignKey,
                    RetailTaxPercentage = product.RetailTaxPercentage,
                    ShortName = product.ShortName,
                    WholeSaleTaxPercentage = product.WholeSaleTaxPercentage,
                    MainGroupCode = "Grupsuz",
                    SubGroupCode = "Grupsuz",
                    ManufacturerCode = product.ManufacturerCode,
                    SectionCode = product.SectionCode,
                    BrandCode = product.BrandCode,
                    SectorCode = product.SectorCode,
                    ModelCode = product.ModelCode,
                    CategoryCode = product.CategoryCode,
                    ProductTitleName = product.Name.ToUpper(),
                    LastUpdateDate = product.LastUpdateDate,
                    LastUpdateUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                    CreateDate = product.CreateDate,
                    CreateUser = user2.FirstName.ToUpper() + " " + user2.LastName.ToUpper(),
                    Visibile = product.Visible,
                    isDeleted = product.isDeleted,
                    nextid = nextid,
                    backid = backid,
                    UnitName = Name,
                    Factor = factor,
                    Weight = Weight,
                    Photo=product.Photo
                };
                return Json(prdct, JsonRequestBehavior.AllowGet);

            }
            else
            {
                ProductGroup2 productGroup2 = db.ProductGroup2s.Where(q => q.ID == productGroup3.ProductGroup2ID).DefaultIfEmpty().FirstOrDefault();
                ProductGroup productGroup = db.ProductGroups.Where(q => q.ID == productGroup2.ProductGroupID).DefaultIfEmpty().First();
                var prdct = new
                {
                    Barcode = barcode.Code,
                    ProductCode = product.ProductCode,
                    Name = product.Name,
                    ProductForeignKey = product.ForeignKey,
                    RetailTaxPercentage = product.RetailTaxPercentage,
                    ShortName = product.ShortName,
                    WholeSaleTaxPercentage = product.WholeSaleTaxPercentage,
                    MainGroupCode = productGroup2.Code,
                    SubGroupCode = productGroup3.Code,
                    ManufacturerCode = product.ManufacturerCode,
                    SectionCode = product.SectionCode,
                    BrandCode = product.BrandCode,
                    SectorCode = product.SectorCode,
                    ModelCode = product.ModelCode,
                    CategoryCode = product.CategoryCode,
                    ProductTitleName = product.Name.ToUpper(),
                    LastUpdateDate = product.LastUpdateDate,
                    LastUpdateUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                    CreateDate = product.CreateDate,
                    CreateUser = user2.FirstName.ToUpper() + " " + user2.LastName.ToUpper(),
                    Visibile = product.Visible,
                    isDeleted = product.isDeleted,
                    nextid = nextid,
                    backid = backid,
                    UnitName = Name,
                    Factor = factor,
                    Weight = Weight,
                    ProductGroupName = productGroup.Name.ToUpper() + ", " + productGroup2.Name.ToUpper() + ", " + productGroup3.Name.ToUpper(),
                    ProductGroup3Id = productGroup3.ID,
                    ProductGroup2Id = productGroup2.ID,
                    Photo = product.Photo


                };
                return Json(prdct, JsonRequestBehavior.AllowGet);
            }
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
        public JsonResult ProductCapacityListViewSave()
        {
            bool result = true;
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ReloadTable()
        {
            string result = "Güncelleme Tamamlandı.";
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult GetUnits()
        {
            var discountList = new
            {
                data =
                       from unitFormat in db.unitFormats
                       from user in db.Users.Where(q => q.ID == unitFormat.UserID)
                       select new
                       {
                           ID = unitFormat.ID,
                           UnitName = unitFormat.UnitName.ToUpper(),
                           Weight = unitFormat.Weight,
                           Factor = unitFormat.Factor,
                           CreatedDate = unitFormat.CreateDate,
                           CreatedUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                           UpdateDate = unitFormat.LastUpdateDate
                       }
            };
            return Json(discountList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult EditUnit(int id)
        {

            UnitFormat unitFormat = db.unitFormats.Find(id);
            User user = db.Users.Where(q => q.ID == unitFormat.UserID).First();
            var unit = new
            {
                ID = unitFormat.ID,
                UnitName = unitFormat.UnitName.ToUpper(),
                Weight = unitFormat.Weight,
                Factor = unitFormat.Factor,
                CreatedDate = unitFormat.CreateDate,
                CreatedUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                LastUpdateDate = unitFormat.LastUpdateDate
            };
            return Json(unit, JsonRequestBehavior.AllowGet);
        }
        public ActionResult NewUnit(int currentUser, string UnitName, int Format, int Weight)
        {
            UnitFormat unitFormat = new UnitFormat()
            {
                UnitName = UnitName,
                Factor = Format,
                Weight = Weight,
                CreateDate = DateTime.Now,
                UserID = currentUser,
                LastUpdateDate = DateTime.Now,
            };
            db.unitFormats.Add(unitFormat);
            db.SaveChanges();
            return RedirectToAction("UnitList", "Center");
        }
        public void SaveUnit(string unit, int id)
        {
            UnitFormat format = db.unitFormats.Where(q => q.UnitName == unit).FirstOrDefault();
            Product product = db.Products.Find(id);
            Unit unit2 = db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).FirstOrDefault();
            if (unit2 == null)
            {
                Unit unit1 = db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 1).FirstOrDefault();
                Unit unt = new Unit()
                {
                    UnitCode = 2,
                    CreateDate = DateTime.Now,
                    Factor = format.Factor,
                    Weight = format.Weight,
                    isDeleted = false,
                    Name = format.UnitName,
                    StockCode = product.ProductCode


                };
                db.Units.Add(unt);
                db.SaveChanges();
            }
            else
            {
                unit2.Name = format.UnitName;
                unit2.Weight = format.Weight;
                unit2.Factor = format.Factor;
            }
            db.SaveChanges();
        }
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