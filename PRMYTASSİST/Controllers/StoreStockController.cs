 using Entity;
using PRMYTASSİST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class StoreStockController : Controller
    {
        REContext db = new REContext();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        //ürün alış listesi 
        public JsonResult ProductStoreList(string Dateforsor)
        {
            DateTime date;
            DateTime date2;
            if (Dateforsor == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(Dateforsor);
                date2 = date.AddDays(1);
            }
            int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);

            var StockList = new
            {
                data = from storestock in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                       from current in db.currentAccounts.Where(q => q.ID == storestock.CurrentID)
                       from user in db.Users.Where(q => q.ID == storestock.UserID)

                       select new
                       {
                           CurrentName = current.title1,
                           ProductCount = storestock.NumberofProduct,
                           CreateDate = storestock.CreateDate,
                           StockCode = storestock.StoreCode,
                           CreateUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                           Safe = (from stockdet in storestock.storeStockDetails
                                   from product in db.Products.Where(q => q.ID == stockdet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select stockdet.StockQuantity).Sum().ToString(),
                           Point = (
                                    from stockdet in storestock.storeStockDetails
                                    from product in db.Products.Where(q => q.ID == stockdet.ProductID)
                                    from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "ADET")
                                    select stockdet.StockQuantity).Sum().ToString(),
                           Box = ((
                                   from stockdet in storestock.storeStockDetails
                                   from product in db.Products.Where(q => q.ID == stockdet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select stockdet.StockQuantity).Sum() / settings).ToString()

                       }
            };
            return Json(StockList, JsonRequestBehavior.AllowGet);
        }
        //ürün alış girişi
        public JsonResult SaveBasketStock(int Currentid, int productID, double StockQuantity, string Comment, int currentUser)
        {
            bool result = false;
            try
            {
                BasketStock Control = db.basketStocks.Where(q => q.ProductID == productID && q.CurrentID == Currentid && q.UserID == currentUser).FirstOrDefault();
                if (Control == null)
                {
                    BasketStock bs = new BasketStock()
                    {
                        ProductID = productID,
                        StockQuantity = StockQuantity,
                        Comment = Comment,
                        CurrentID = Currentid,
                        UserID = currentUser,
                        CreateDate = DateTime.Now
                    };
                    db.basketStocks.Add(bs);
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    if (StockQuantity != 0)
                        Control.StockQuantity = StockQuantity;
                    if (Comment != "")
                        Control.Comment = Comment;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
                result = false;
                throw;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveStoreStock(int Currentid, int currentUser, string Dateforsor)
        {
            DateTime date = Convert.ToDateTime(Dateforsor);

            bool result = false;
            try
            {
                int BasketCount = db.basketStocks.Where(q => q.CurrentID == Currentid && q.UserID == currentUser).Count();
                if (BasketCount > 0)
                {
                    int StoreStockCode = db.storeStocks.OrderByDescending(q => q.StoreCode).Select(q => q.StoreCode).FirstOrDefault();
                    StoreStock nbp = new StoreStock()
                    {
                        CurrentID = Currentid,
                        CreateDate = date,
                        UserID = currentUser,
                        StoreCode = StoreStockCode + 1
                    };
                    db.storeStocks.Add(nbp);
                    db.SaveChanges();
                    for (int i = 0; i < BasketCount; i++)
                    {
                        BasketStock bs = db.basketStocks.Where(q => q.CurrentID == Currentid && q.UserID == currentUser).FirstOrDefault();
                        if (bs.StockQuantity != 0)
                        {
                            StoreStockDetail storeStockDetail = new StoreStockDetail()
                            {
                                StoreStockID = nbp.ID,
                                ProductID = bs.ProductID,
                                StockQuantity = bs.StockQuantity,
                                Comment = bs.Comment,
                                CreateDate = date
                            };
                            db.storeStockDetails.Add(storeStockDetail);
                        }
                        db.basketStocks.Remove(bs);
                        db.SaveChanges();
                    }

                    int count = db.storeStockDetails.Where(q => q.StoreStockID == nbp.ID).Count();
                    nbp.NumberofProduct = count;
                    if (count == 0)
                        db.storeStocks.Remove(nbp);

                    db.SaveChanges();
                    result = true;
                }
            }
            catch (Exception)
            {
                result = false;
                throw;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //Depo stok raporu
        [HttpPost]
        public JsonResult GetStoreStockReport(string Dateforsor)
        {
            DateTime date;
            DateTime date2;
            if (Dateforsor == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(Dateforsor);
                date2 = date.AddDays(1);
            }

            var StockList = new
            {
                data = from storestock in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                       from StoreDetail in storestock.storeStockDetails
                       from product in db.Products.Where(q => StoreDetail.ProductID == q.ID)
                       from Group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID)
                       from Group in db.ProductGroup2s.Where(q => q.ID == Group3.ProductGroup2ID)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from Barcode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit in db.Units.Where(q => q.StockCode == product.ProductCode/* && q.UnitCode==storestock.UnitCode*/&& q.UnitCode == 2).DefaultIfEmpty()
                       select new
                       {
                           CurrentName = from current in db.currentAccounts.Where(q => q.ID == storestock.CurrentID)
                                         select current.title1.ToUpper(),
                           ProductGroup = Group.Name.ToUpper(),
                           StoreCode = storestock.StoreCode,
                           Barcode = Barcode.Code,
                           ProductName = product.Name,
                           UnitName = unit.Name.ToUpper(),
                           Stock = StoreDetail.StockQuantity,
                           Comment = StoreDetail.Comment,
                           createdate = StoreDetail.CreateDate,
                           createuser = from user in db.Users.Where(q => q.ID == storestock.UserID)
                                        select user.FirstName + " " + user.LastName

                       }
            };
            return Json(StockList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteStock(int id)
        {
            string result = "";
            try
            {
                EntryStock es = db.entryStocks.Find(id);
                int number = es.StoreCode;
                int count = db.entryStockLists.Where(q => q.EntryStockID == id).Count();
                for (int i = 0; i < count; i++)
                {
                    EntryStockList esl = db.entryStockLists.Where(q => q.EntryStockID == id).FirstOrDefault();
                    db.entryStockLists.Remove(esl);
                    db.SaveChanges();
                }
                db.entryStocks.Remove(es);
                db.SaveChanges();
                result = number + " Nolu Stok Silindi!";

            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        //ürün bazında depo stok raporu
        public JsonResult GetProductStoreStockReport(string StartDate, string EndDate, bool check)
        {
            DateTime date;
            DateTime date2;
            if (StartDate == "" || EndDate == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(StartDate);
                date2 = Convert.ToDateTime(EndDate);
                date2 = date2.AddDays(1);
            }
            if (check == true)
            {
                var ProductStockList = new
                {
                    data = from product in db.Products
                           from Group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID)
                           from Group in db.ProductGroup2s.Where(q => q.ID == Group3.ProductGroup2ID)
                           from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                           from Barcode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                           from unit in db.Units.Where(q => q.StockCode == product.ProductCode /* && q.UnitCode==storestock.UnitCode*/&& q.UnitCode == 2).DefaultIfEmpty()
                           select new
                           {
                               ProductGroup = Group.Name.ToUpper(),
                               Barcode = Barcode.Code,
                               ProductName = product.Name.ToUpper(),
                               UnitName = unit.Name.ToUpper(),
                               InComing = (from storestock in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                                           from stock in storestock.storeStockDetails.Where(q => q.ProductID == product.ID)
                                           select stock.StockQuantity).Sum().ToString(),
                               CommingOut = (from ord in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                             from ordet in ord.orderDetails.Where(q => q.ProductID == product.ID)
                                             select ordet.SubTotal).Sum().ToString(),
                               Remaining = ((from storestock in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                                             from stock in storestock.storeStockDetails.Where(q => q.ProductID == product.ID)
                                             select stock.StockQuantity).Sum() - (from ord in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                                                                  from ordet in ord.orderDetails.Where(q => q.ProductID == product.ID)
                                                                                  select ordet.SubTotal).Sum()).ToString(),
                           }
                };
                return Json(ProductStockList, JsonRequestBehavior.AllowGet);

            }
            else
            {
                var ProductStockList = new
                {
                    data = from product in db.Products
                           from stordet in db.storeStockDetails.Where(q => q.ProductID == product.ID).Take(1)
                           from storestocks in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2 && stordet.StoreStockID == q.ID)
                           from Group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID)
                           from Group in db.ProductGroup2s.Where(q => q.ID == Group3.ProductGroup2ID)
                           from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                           from Barcode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                           from unit in db.Units.Where(q => q.StockCode == product.ProductCode /* && q.UnitCode==storestock.UnitCode*/&& q.UnitCode == 2).DefaultIfEmpty()
                           select new
                           {
                               ProductGroup = Group.Name.ToUpper(),
                               Barcode = Barcode.Code,
                               ProductName = product.Name,
                               UnitName = unit.Name.ToUpper(),
                               InComing = (from storestock in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                                           from stock in storestock.storeStockDetails.Where(q => q.ProductID == product.ID)
                                           select stock.StockQuantity).Sum().ToString(),
                               CommingOut = (from ord in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                             from ordet in ord.orderDetails.Where(q => q.ProductID == product.ID)
                                             select ordet.SubTotal).Sum().ToString(),
                               Remaining = ((from storestock in db.storeStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                                             from stock in storestock.storeStockDetails.Where(q => q.ProductID == product.ID)
                                             select stock.StockQuantity).Sum() - (from ord in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                                                                  from ordet in ord.orderDetails.Where(q => q.ProductID == product.ID)
                                                                                  select ordet.SubTotal).Sum()).ToString(),
                           }
                };
                return Json(ProductStockList, JsonRequestBehavior.AllowGet);

            }
        }

        public string GetProductsForStock(int currentID, int UserID)
        {
            var productList = new
            {

                data = from product in db.Products
                       where product.isDeleted == false && product.Visible==false
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from ProductGroup3s in db.ProductGroup3s.Where(q => product.ProductGroup3ID == q.ID).DefaultIfEmpty()
                       from ProductGroup2ss in db.ProductGroup2s.Where(q => ProductGroup3s.ProductGroup2ID == q.ID).DefaultIfEmpty()
                       from ProductGroup1ss in db.ProductGroups.Where(q => ProductGroup2ss.ProductGroupID == q.ID).DefaultIfEmpty()
                       from basket in db.basketStocks.Where(q => q.ProductID == product.ID && q.CurrentID == currentID && q.UserID == UserID).DefaultIfEmpty()
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
                           ProductGroupUrl = ProductGroup2ss.Name.ToUpper(),
                           UnitName = unit2.Name.ToUpper(),
                           Comment = basket.Comment.ToString(),
                           StockQuantity = basket.StockQuantity.ToString()
                       }
            };

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(productList);
        }

        public JsonResult GetStockReportFollow( String StartDate, String EndDate)
        {
            DateTime date;
            DateTime date2;
            if (StartDate == "" || EndDate == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(StartDate);
                date2 = Convert.ToDateTime(EndDate);
                date2 = date2.AddDays(1);
            }
            int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);

            var StockList = new
            {
                data = from stock in db.entryStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                       from branch in db.Branchs.Where(q => q.ID == stock.BranchID)
                       from user in db.Users.Where(q => q.ID == stock.UserID)

                       select new
                       {
                           ID = stock.ID,
                           CurrentName = branch.BranchName.ToUpper(),
                           ProductCount = stock.NumberofProduct,
                           CreateDate = stock.CreateDate,
                           StockCode = stock.StoreCode,
                           CreateUser = stock.UserName.ToUpper(),
                           Safe = (from stockdet in stock.entryStockLists
                                   from product in db.Products.Where(q => q.ID == stockdet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select stockdet.StockQuantity).Sum().ToString(),
                           Point = (
                                    from stockdet in stock.entryStockLists
                                    from product in db.Products.Where(q => q.ID == stockdet.ProductID)
                                    from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "ADET")
                                    select stockdet.StockQuantity).Sum().ToString(),
                           Box = ((
                                   from stockdet in stock.entryStockLists
                                   from product in db.Products.Where(q => q.ID == stockdet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select stockdet.StockQuantity).Sum() / settings).ToString()

                       }
            };
            return Json(StockList, JsonRequestBehavior.AllowGet);
        }
        public string GetProductsForStockBranch(int BranchID, int UserID)
        {
            var productList = new
            {

                data = from product in db.Products
                       where product.isDeleted == false && product.Visible==false
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from ProductGroup3s in db.ProductGroup3s.Where(q => product.ProductGroup3ID == q.ID).DefaultIfEmpty()
                       from ProductGroup2ss in db.ProductGroup2s.Where(q => ProductGroup3s.ProductGroup2ID == q.ID).DefaultIfEmpty()
                       from ProductGroup1ss in db.ProductGroups.Where(q => ProductGroup2ss.ProductGroupID == q.ID).DefaultIfEmpty()
                       from basket in db.basketStockForBranches.Where(q => q.ProductID == product.ID && q.UserID == UserID && BranchID==q.BranchID).DefaultIfEmpty()
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
                           ProductGroupUrl = ProductGroup2ss.Name.ToUpper(),
                           UnitName = unit2.Name.ToUpper(),
                           Comment = basket.Comment.ToString(),
                           StockQuantity = basket.StockQuantity.ToString(),
                           Prodgrp2=product.ProductGroup2ID

                       }
            };

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(productList);
        }
        public JsonResult SaveStoreStockForBranch(int BranchID, int currentUser, string Dateforsor, string UserName)
        {
            DateTime date = Convert.ToDateTime(Dateforsor);

            bool result = false;
            try
            {
                int BasketCount = db.basketStockForBranches.Where(q => q.BranchID == BranchID && q.UserID == currentUser).Count();
                if (BasketCount > 0)
                {   

                    int StoreStockCode = db.entryStocks.OrderByDescending(q => q.StoreCode).Select(q => q.StoreCode).FirstOrDefault();
                    EntryStock nbp = new EntryStock()
                    {
                        BranchID = BranchID,
                        CreateDate = date,
                        UserID = currentUser,
                        StoreCode = StoreStockCode + 1,
                        UserName=UserName,
                    };
                    db.entryStocks.Add(nbp);
                    db.SaveChanges();
                    for (int i = 0; i < BasketCount; i++)
                    {
                        BasketStockForBranch bs = db.basketStockForBranches.Where(q => q.BranchID == BranchID && q.UserID == currentUser).FirstOrDefault();
                        if (bs.StockQuantity != 0)
                        {
                            EntryStockList storeStockDetail = new EntryStockList()
                            {
                                EntryStockID = nbp.ID,
                                ProductID = bs.ProductID,
                                StockQuantity = bs.StockQuantity,
                                Comment = bs.Comment,
                                CreateDate = date
                            };
                            db.entryStockLists.Add(storeStockDetail);
                        }
                        db.basketStockForBranches.Remove(bs);
                        db.SaveChanges();
                    }
                    int count = db.entryStockLists.Where(q => q.EntryStockID == nbp.ID).Count();
                    nbp.NumberofProduct = count;
                    if (count == 0)
                        db.entryStocks.Remove(nbp);

                    db.SaveChanges();
                    result = true;
                }
            }
            catch (Exception)
            {
                result = false;
                throw;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult SaveBasketStockBranch(int BranchID, int productID, double StockQuantity, string Comment, int currentUser)
        {
            bool result = false;
            try
            {
                BasketStockForBranch Control = db.basketStockForBranches.Where(q => q.ProductID == productID && q.BranchID == BranchID && q.UserID == currentUser).FirstOrDefault();
                if (Control == null)
                {
                    BasketStockForBranch bs = new BasketStockForBranch()
                    {
                        ProductID = productID,
                        StockQuantity = StockQuantity,
                        Comment = Comment,
                        BranchID = BranchID,
                        UserID = currentUser,
                        CreateDate = DateTime.Now
                    };
                    db.basketStockForBranches.Add(bs);
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    if (StockQuantity != 0.1)
                        Control.StockQuantity = StockQuantity;
                    if (Comment != "")
                        Control.Comment = Comment;
                    db.SaveChanges();
                }
            }
            catch (Exception)
            {
                result = false;
                throw;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SaveBasketStockBranchForUpdate(int StokID, double StockQuantity, string Comment, int ProdID)
        {
            bool result = false;
            try
            {
                EntryStockList Control = db.entryStockLists.Where(q => q.ProductID == ProdID && q.EntryStockID == StokID).FirstOrDefault();
                if (Control == null)
                {
                    EntryStockList bs = new EntryStockList()
                    {
                        ProductID = ProdID,
                        StockQuantity = StockQuantity,
                        Comment = Comment,
                        CreateDate = DateTime.Now,
                        EntryStockID=StokID
                        
                    };
                    db.entryStockLists.Add(bs);
                    db.SaveChanges();
                    result = true;
                }
                else
                {
                    if (StockQuantity != 0)
                        Control.StockQuantity = StockQuantity;
                    if (Comment != "")
                        Control.Comment = Comment;
                    db.SaveChanges();
                }
                EntryStock es = db.entryStocks.Find(StokID);
                es.NumberofProduct = db.entryStockLists.Where(q => q.EntryStockID == StokID).Count();
                db.SaveChanges();
            }
            catch (Exception)
            {
                result = false;
                throw;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public string GetProductsForStockBranchUpdate(int StokID)
        {
            var productList = new
            {

                data =
                       from product in db.Products
                       where product.isDeleted == false && product.Visible==false
                       from EntryStock in db.entryStocks.Where(q => q.ID == StokID)
                       from EntryStockList in db.entryStockLists.Where(q => q.EntryStockID == EntryStock.ID && q.ProductID == product.ID).DefaultIfEmpty()
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
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
                           ProductGroupUrl = ProductGroup2ss.Name.ToUpper(),
                           UnitName = unit2.Name.ToUpper(),
                           Comment = EntryStockList.Comment.ToString(),
                           StockQuantity = EntryStockList.StockQuantity.ToString()
                       }
            };

            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(productList);
        }
        public JsonResult GetProductsForStockBranchUpdateInfo(int StokID)
        {
            EntryStock EntryStock = db.entryStocks.Where(q => q.ID == StokID).FirstOrDefault();
            Branch branch = db.Branchs.Where(q => q.ID == EntryStock.BranchID).FirstOrDefault();

            var productList = new
            {
                BranchName = branch.BranchName.ToUpper(),
                CreateDate = EntryStock.CreateDate
            };
            return Json(productList, JsonRequestBehavior.AllowGet);
        }
    }
}