using Entity;
using PRMYTASSİST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]
    public class BranchController : Controller
    {
        REContext db = new REContext();

        // GET: Branch 
        public ActionResult Index()
        { 
            return View();
        }
       
        public ActionResult BranchDefinition()
        {
            return View();
        }
        public ActionResult NewOrder(int? id = 0)
        {
            TempData["groupId"] = id;
            return View();
        }
        public ActionResult UpdateOrder(int id = 0)
        {
            TempData["branchID"] = id;
            return View();
        }
        public ActionResult OrderList()
        {
            return View();
        }
        public ActionResult BranchFormatDefinitions(int id = 0)
        {
            TempData["BranchFormatID"] = id;
            return View();
        }
        public ActionResult FormatDefinitions()
        {
            return View();
        }
        public ActionResult BranchToFormatList()
        {
            return View();
        }

        [HttpPost]
        public JsonResult getBranchesToSettings()
        {
            var brancList = new
            {
                data = from braches in db.Branchs
                       from region in db.Regions.Where(q => q.ID == braches.RegionID)

                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchCode = braches.BranchCode,
                           BranchCreatedDate = braches.LastUpdateDate,
                           Regions = region.Name.ToUpper(),
                           isMaster = braches.isMaster,
                           user = from bra in db.Branchs.Where(q=>q.UserID!=null).OrderBy(z => z.LastUpdateDate).Take(1)
                                  from user in db.Users.Where(q => q.ID == bra.UserID)
                                  select user.FirstName + " " + user.LastName,
                       }
            };
            return Json(brancList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult getBranchesFormat(int id)
        {
            var brancList = new
            {
                data = from braches in db.Branchs.Where(q => q.isMaster == false && q.FormatID != id)
                       from format in db.branchFormats.Where(q => q.ID == braches.FormatID).DefaultIfEmpty()
                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchCode = braches.BranchCode,
                           BranchCreatedDate = braches.CreateDate,
                           BranchFormat = format.FormatName
                       }
            };
            return Json(brancList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult getBranchesRegion()
        {
            var brancList = new
            {
                data = from braches in db.Branchs.Where(q => q.isMaster == false && (q.Regions.ID == 0))
                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchCode = braches.BranchCode,
                           BranchCreatedDate = braches.CreateDate,
                       }
            };
            return Json(brancList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult getBranchesRegionList(int id)
        {
            var brancList = new
            {
                data = from braches in db.Branchs.Where(q => q.isMaster == false && q.Regions.ID == id)
                       from region in db.Regions.Where(q => q.ID == id)
                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchCode = braches.BranchCode,
                           BranchCreatedDate = braches.CreateDate,
                           RegionName = region.Name
                       }
            };
            return Json(brancList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]

        public JsonResult getBranchesFormatList(int FormatID)
        {
            var brancList = new
            {
                data = from braches in db.Branchs.Where(q => (q.isMaster == false && q.FormatID == FormatID) || (q.isMaster == false && 0 == FormatID))
                       from format in db.branchFormats.Where(q => q.ID == braches.FormatID).DefaultIfEmpty()
                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchCode = braches.BranchCode,
                           BranchCreatedDate = braches.LastUpdateDate,
                           BranchFormat = format.FormatName

                       }
            };
            return Json(brancList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetUserBranch(int id)
        {
            User user = db.Users.Find(id);
            var userList = new
            {
                data = from braches in db.Branchs.Where(q => q.isMaster == false)
                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchCode = braches.BranchCode,
                           BranchCreatedDate = braches.CreateDate,
                           User = from x in braches.users
                                  where x.ID == user.ID
                                  select new
                                  {
                                      Branches = from y in x.Branches
                                                 select new
                                                 {
                                                     BranchId = y.ID
                                                 }
                                  }
                       }
            };
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetRegionsBranch(int id/*, string StartDate, string EndDate*/)
        {
            var regionList = new
            {
                data =
                       from braches in db.Branchs.Where(q => q.isMaster == false && ((id != 0 && q.RegionID == id) || id == 0))
                       from format in db.branchFormats.Where(q => q.ID == braches.FormatID).DefaultIfEmpty()

                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                           BranchFormat = format.FormatName

                       }
            };
            return Json(regionList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetRegionsBranchDis(int region, int format, string EndDate)
        {
            DateTime date;
            DateTime date2;
            if (EndDate == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(EndDate);
                date2 = date.AddDays(1);
            }
            var regionList = new
            {
                data =
                       from braches in db.Branchs.Where(q => q.isMaster == false && ((region != 0 && q.RegionID == region) || region == 0) && ((format != 0 && q.FormatID == format) || format == 0))
                       from order in db.Orders.Where(q=> q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode==braches.ID && q.ApprovalStatus==1)

                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),

                       }
            };
            return Json(regionList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult GetFormatBranch(int id/*, string StartDate, string EndDate*/)
        {
            var regionList = new
            {
                data =
                       from braches in db.Branchs.Where(q => q.isMaster == false && ((id != 0 && q.FormatID == id) || id == 0))
                       select new
                       {
                           ID = braches.ID,
                           BranchName = braches.BranchName.ToUpper(),
                       }
            };
            return Json(regionList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteBranchesFormat(int branchId)
        {
            string result = "";
            try
            {
                Branch branch = db.Branchs.Find(branchId);
                branch.FormatID = 0;
                db.SaveChanges();
                result = "Şube Formatı Silindi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetBranchName(string orderCode)
        {

            int branchId = Convert.ToInt32(orderCode);
            Branch branch = db.Branchs.Find(branchId);
            Region region = db.Regions.Find(branch.RegionID);
            BranchFormat branchFormat = db.branchFormats.Find(branch.FormatID);
            var userList = new
            {
                BranchName = branch.BranchName.ToUpper(),
                RegionName = region.Name,
                FormatName = branchFormat.FormatName
            };

            return Json(userList, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetUserBranch1(int ID)
        {
            var userList = new
            {
                data = (from braches in db.Branchs
                        from user in braches.users
                        where user.ID == ID
                        select new
                        {
                            ID = braches.ID,
                            BranchName = braches.BranchName.ToUpper(),
                            BranchCode = braches.BranchCode,
                            BranchCreatedDate = braches.CreateDate
                        })
                       .AsEnumerable()
                       .Select(t => new
                       {
                           t.ID,
                           t.BranchName,
                           t.BranchCode,
                           BranchCreatedDate = t.BranchCreatedDate.ToString("yyyy-MM-dd")
                       }).ToList()
            };

            return Json(userList, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public JsonResult CancelBranchUser(int? branchId, int? userId)
        {
            string result = "";
            try
            {
                Branch branch = db.Branchs.Find(branchId);
                User user = db.Users.Find(userId);
                branch.users.Remove(user);

                db.SaveChanges();
                result = "Kullanıcı Şubeden Çıkarıldı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBranchFormat()
        {
            var branchFormatList = new
            {
                data =
                       from branch in db.branchFormats
                       from user in db.Users.Where(q => q.ID == branch.UserID)
                       select new
                       {
                           ID = branch.ID,
                           FormatName = branch.FormatName,
                           FormatCode = branch.FormatCode,
                           Visible = branch.Visible,
                           CreatedDate = branch.CreateDate,
                           CreatedUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper()
                       }
            };
            return Json(branchFormatList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShowBranchStateOrderListTrue(string StartDate, string EndDate)
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

            var branchformatlist = new
            {
                data = 
                       from branch in db.Branchs.OrderBy(z => z.BranchName).ToList()
                       from order in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode==branch.ID).Take(1)
                       select new
                       {
                           BranchNameTrue = branch.BranchName.ToUpper(),
                       }
            };
            return Json(branchformatlist, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ShowBranchStateOrderListFalse(string StartDate, string EndDate)
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

            var branchformatlist = new
            {
                data = 
                       from branch in db.Branchs.Where(z=> z.isMaster!=true  && z.Visible == true && !db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(i => i.BranchCode).Contains(z.ID)).OrderBy(z=>z.BranchName).ToList()
                       select new
                       {
                           BranchNameFalse = branch.BranchName.ToUpper(),
                       }
            };
            return Json(branchformatlist, JsonRequestBehavior.AllowGet);
        }

        public ActionResult NewBranchFormat(int currentUser, string FormatCode, string FormatName)
        {
            BranchFormat tmpFormat = new BranchFormat()
            {
                FormatName = FormatName,
                FormatCode = Convert.ToInt32(FormatCode),
                Visible = true,
                CreateDate = DateTime.Now,
                UserID = currentUser,
                LastUpdateDate = DateTime.Now
            };
            db.branchFormats.Add(tmpFormat);
            db.SaveChanges();
            int id = 0;

            for (int i = 0; i < db.Products.Count(); i++)
            {
                Product product = db.Products.Where(q => q.ID > id).OrderBy(q => q.ID).First();
                id = product.ID;
                QuantityFormat tmpQuantityFormat = new QuantityFormat()
                {
                    FormatID = tmpFormat.ID,
                    StockCode = product.ProductCode,
                    CreateDate = DateTime.Now,
                    Capacity = 0,
                };
                db.quantityFormats.Add(tmpQuantityFormat);
                db.SaveChanges();
            }
            return RedirectToAction("FormatDefinitions", "Branch");
        }
        public JsonResult EditBranchFormat(int id)
        {

            BranchFormat branchFormat = db.branchFormats.Find(id);
            User user = db.Users.Where(q => q.ID == branchFormat.UserID).First();
            var branch = new
            {
                ID = branchFormat.ID,
                FormatName = branchFormat.FormatName,
                FormatCode = branchFormat.FormatCode,
                Visible = branchFormat.Visible,
                CreatedDate = branchFormat.CreateDate,
                CreatedUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                LastUpdateDate = branchFormat.LastUpdateDate
            };
            return Json(branch, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateBranchFormat(int ID, int currentUser, string lastname, string firstname)
        {
            BranchFormat branchFormat = db.branchFormats.Find(ID);
            branchFormat.FormatName = firstname;
            branchFormat.FormatCode = Convert.ToInt32(lastname);
            branchFormat.Visible = true;
            branchFormat.LastUpdateDate = DateTime.Now;
            branchFormat.UserID = currentUser;
            db.SaveChanges();
            return RedirectToAction("FormatDefinitions", "Branch");
        }
        [HttpPost]
        public JsonResult DeleteBranchFormat(int id)
        {
            string result = "";
            try
            {
                BranchFormat tmpUser = db.branchFormats.Find(id);
                db.branchFormats.Remove(tmpUser);
                db.SaveChanges();
                int count = db.quantityFormats.Where(q => q.FormatID == id).Count();
                for (int i = 0; i < count; i++)
                {
                    QuantityFormat quantityFormat = db.quantityFormats.Where(q => q.FormatID == id).FirstOrDefault();
                    db.quantityFormats.Remove(quantityFormat);
                    db.SaveChanges();
                }

                result = "Şube Formatı Silindi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InDontShow(int id)
        {
            string result = "";
            try
            {
                BranchFormat tmpUser = db.branchFormats.Find(id);
                tmpUser.Visible = false;
                db.SaveChanges();
                result = "Şube Format Durumu Pasif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InShow(int id)
        {
            string result = "";
            try
            {
                BranchFormat tmpUser = db.branchFormats.Find(id);
                tmpUser.Visible = true;
                db.SaveChanges();
                result = "Şube Format Durumu Aktif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateBranch()
        {
            using (var Service = new Entity.MikroServiceReference.MikroServiceClient())
            {
                var Security = new Entity.MikroServiceReference.SecurityModel
                {
                    UserCode = "PramytMikroService",
                    Password = "M-k}AQ~$7s_-Qi9["
                };

                var depotlist = Service.GetDepotList(Security);
                if (depotlist.Result)
                {
                    List<Branch> InsertBranch = new List<Branch>();
                    List<Branch> updateBranch = new List<Branch>();
                    foreach (var depolist in depotlist.DepotList)
                    {
                        int Depocode = Convert.ToInt32(depolist.Code);
                        Branch checkBranch = db.Branchs.FirstOrDefault(p => p.BranchCode == Depocode);
                        if (checkBranch == null)
                        {
                            InsertBranch.Add(new Branch()
                            {
                                BranchCode = Convert.ToInt32(depolist.Code),
                                BranchName = depolist.Name.ToUpper(),
                                CreateDate = DateTime.Now,
                                LastUpdateDate = DateTime.Now,
                            });
                        }

                        else
                        {
                            checkBranch.BranchName = depolist.Name.ToUpper();
                            checkBranch.LastUpdateDate = DateTime.Now;
                            updateBranch.Add(checkBranch);
                        }
                    }

                    if (InsertBranch.Count > 0)
                    {
                        db.BulkInsert(InsertBranch);
                        foreach (var branch in InsertBranch)
                        {

                            Random rand = new Random();
                            Basket basket = new Basket()
                            {
                                Code = rand.Next(0, 25548612),
                                UserID = branch.ID,
                                CreateDate = DateTime.Now
                            };
                            db.Baskets.Add(basket);
                            db.SaveChanges();
                        }
                    }
                    if (updateBranch.Count > 0)
                        db.BulkUpdate(updateBranch);

                    db.SaveChanges();
                }
            }
            return RedirectToAction("Index", "Branch");
        }
        public ActionResult UserAddToBranches(User user, Branch branch)
        {
            User tmpUser = db.Users.Find(user.ID);
            Branch branch1 = db.Branchs.Find(branch.ID);

            //tmpUser.Branches = db.Branchs.Find(branch);

            db.SaveChanges();
            return RedirectToAction("Index", "Branch");
        }
        public JsonResult branchToFormat(int?[] branchs, int formatID)
        {
            string result = "";
            try
            {
                BranchFormat branchFormat = db.branchFormats.Find(formatID);
                if (branchs != null)
                {
                    foreach (var branchId in branchs)
                    {
                        db.Branchs.Find(branchId).FormatID = formatID;
                        db.Branchs.Find(branchId).LastUpdateDate = DateTime.Now;
                        db.SaveChanges();
                    }
                }
                result = "Şube Format Durumu Aktif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public void UserToBranch(int?[] branchs, int? userId)
        {
            User user = db.Users.Find(userId);
            user.Branches.Clear();
            db.SaveChanges();
            foreach (var branchId in branchs)
            {
                user.Branches.Add(db.Branchs.Find(branchId));
            }
            db.SaveChanges();
        }
        public JsonResult GetDistributionsTable(string dateID, string OrderCode)
        {
            int branchCode = Convert.ToInt32(OrderCode);
            DateTime date;
            DateTime date2;
            if (dateID == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(dateID);
                date2 = date.AddDays(1);
            }

            var productList = new
            {

                data = from product in db.Products
                       from orderdetail in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID && z.BranchCode == branchCode).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.ProductID == product.ID && q.SubTotal != 0).Select(t => t.ProductID).Distinct()
                       from unit in db.Units.Where(q => product.ProductCode == q.StockCode && q.UnitCode == 2).DefaultIfEmpty()
                       from ProductGroup3s in db.ProductGroup3s.Where(q => product.ProductGroup3ID == q.ID).DefaultIfEmpty()
                       from ProductGroup2ss in db.ProductGroup2s.Where(q => ProductGroup3s.ProductGroup2ID == q.ID).DefaultIfEmpty()
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4).DefaultIfEmpty(barcode4)
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           GroupID = ProductGroup3s.ProductGroup2ID,
                           Code = product.ProductCode,
                           Barcode = barcode.Code,
                           Units = unit.Name.ToUpper(),
                           ProductGroupUrl = (ProductGroup2ss.Name).ToUpper(),
                           OrderCount = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && branchCode == q.BranchCode)
                                          from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                          select OrderDetail.SubTotal).Sum()).ToString(),
                       }
            };
            foreach (var item in productList.data)
            {
                int id = item.ID;
            }
            return Json(productList, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetDistributionsTable2(string dateID, string OrderCode)
        {
            int branchCode = Convert.ToInt32(OrderCode);
            int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);

            DateTime date;
            DateTime date2;
            if (dateID == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(dateID);
                date2 = date.AddDays(1);

            }

            var productList = new
            {
                data = from unitform in db.unitFormats
                       from count in (from orderdetails in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID && z.BranchCode == branchCode).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2)
                                      from prods in db.Products.Where(q => orderdetails.ProductID == q.ID)
                                      from units in db.Units.Where(q => prods.ProductCode == q.StockCode && q.UnitCode == 2 && q.Name.ToUpper() == unitform.UnitName.ToUpper())
                                      select orderdetails.SubTotal).ToList().Take(1)

                           //from units in db.Units.Where(q => db.Products.Where(y => db.OrderDetails.Where(a => db.Orders.Where(z => z.ID == a.OrderID && z.BranchCode == branchCode).Select(z => z.ApprovalStatus).FirstOrDefault() == 1 && a.CreateDate >= date && a.CreateDate < date2).Select(x => x.ProductID).FirstOrDefault() == y.ID).Select(y => y.ProductCode).FirstOrDefault() == q.StockCode && q.UnitCode == 2 && q.Name.ToUpper() == unitform.UnitName.ToUpper()).Take(1)
                       select new
                       {
                           UnitName = unitform.UnitName.ToUpper(),
                           UnitTotal = (from orderdetail in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID && z.BranchCode == branchCode).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2)
                                        from prod in db.Products.Where(q => orderdetail.ProductID == q.ID)
                                        from unit in db.Units.Where(q => prod.ProductCode == q.StockCode && q.UnitCode == 2 && q.Name.ToUpper() == unitform.UnitName.ToUpper())
                                        select orderdetail.SubTotal).Sum().ToString(),
                           Palet = ((from orderdetail in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID && z.BranchCode == branchCode).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2)
                                     from prod in db.Products.Where(q => orderdetail.ProductID == q.ID)
                                     from unit in db.Units.Where(q => prod.ProductCode == q.StockCode && q.UnitCode == 2 && q.Name.ToUpper() == unitform.UnitName.ToUpper())
                                     select orderdetail.SubTotal).Sum() / settings).ToString(),
                       }

            };
            return Json(productList, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult RegionToBranch(string StartDate, string EndDate, int[] branchs)
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
            List<ShipmentSummary> PrintList = new List<ShipmentSummary>();
            foreach (var item in branchs)
            {
                Branch findBranches = db.Branchs.Find(item);
                Order orderCont = db.Orders.Where(q => q.BranchCode == findBranches.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1).FirstOrDefault();
                // silme db.Branchs.Where(q => q.ID == (db.Orders.Where(z => z.CreateDate >= date && z.CreateDate < date2 && z.BranchCode == item).Select(y => y.BranchCode).Take(1)).FirstOrDefault()).FirstOrDefault();

                ShipmentSummary shipmentSummary = new ShipmentSummary();
                if (orderCont != null)
                {
                    shipmentSummary.ID = findBranches.ID;
                    shipmentSummary.Name = findBranches.BranchName.ToUpper();
                    int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);
                    int settings2 = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 47474).FirstOrDefault().Value);

                    var data = from order in db.Orders.Where(q => q.BranchCode == findBranches.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                               from orderDet in order.orderDetails
                               from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                               from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2)
                               select new
                               {
                                   orderDet, 
                                   unit,
                               };
                    shipmentSummary.Safe = (data.Where(q => q.unit.Name.ToUpper() == "KASA").Select(q => q.orderDet.SubTotal).DefaultIfEmpty().Sum()).ToString();
                    shipmentSummary.Point = (data.Where(q => q.unit.Name.ToUpper() == "ADET").Select(q => q.orderDet.SubTotal).DefaultIfEmpty().Sum()).ToString();
                    shipmentSummary.Box = (Convert.ToDouble(shipmentSummary.Safe) / settings).ToString();
                    shipmentSummary.Box2 = (Convert.ToDouble(shipmentSummary.Point) / settings2 / settings).ToString();
                    shipmentSummary.BoxAll = (Convert.ToDouble(shipmentSummary.Point) / settings2 / settings + Convert.ToDouble(shipmentSummary.Box)).ToString();
                    PrintList.Add(shipmentSummary);
                }
                else
                {
                    shipmentSummary.ID = findBranches.ID;
                    shipmentSummary.Name = findBranches.BranchName.ToUpper();
                    shipmentSummary.Safe = "0";
                    shipmentSummary.Point = "0";
                    shipmentSummary.Box = "0";
                    shipmentSummary.Box2 = "0";
                    shipmentSummary.BoxAll = "0";
                    PrintList.Add(shipmentSummary);
                }
            }

            var OrderList = new
            {
                data = from i in PrintList
                       select new
                       {
                           ID = i.ID,
                           BranchName = i.Name.ToUpper(),
                           Safe = i.Safe,
                           Point = i.Point,
                           Box = Math.Round(decimal.Parse(i.Box), 2),
                           Box2 = Math.Round(decimal.Parse(i.Box2), 2),
                           BoxAll = Math.Round(decimal.Parse(i.BoxAll), 2)
                       }
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RegionToBranchStart(int RegionID, string StartDate, string EndDate)
        {
            //List<Branch> branchs = new List<Branch>().Where(q => q.RegionID == regionsID).DefaultIfEmpty();

            //List<ShipmentSummary> PrintList = new List<ShipmentSummary>();
            //foreach (var item in branchs)
            //{
            //    Branch findBranches = db.Branchs.Find(item);
            //    ShipmentSummary shipmentSummary = new ShipmentSummary();
            //    shipmentSummary.ID = findBranches.ID;
            //    shipmentSummary.Name = findBranches.BranchName.ToUpper();
            //    PrintList.Add(shipmentSummary);
            //}
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
            int settings2 = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 47474).FirstOrDefault().Value);

            var OrderList = new
            {
                data = from branch in db.Branchs.Where(q => q.isMaster == false && ((RegionID != 0 && RegionID == q.RegionID) || RegionID == 0))
                       from Order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1).Take(1)

                       select new
                       {
                           ID = branch.ID,
                           BranchName = branch.BranchName.ToUpper(),
                           Safe = (from order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                   from orderDet in order.orderDetails
                                   from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select orderDet.SubTotal).Sum().ToString(),
                           Point = (from order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                    from orderDet in order.orderDetails
                                    from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                    from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "ADET")
                                    select orderDet.SubTotal).Sum().ToString(),
                           Box = ((from order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                   from orderDet in order.orderDetails
                                   from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                   from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                   select orderDet.SubTotal).Sum() / settings).ToString(),
                           Box2 = ((from order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                    from orderDet in order.orderDetails
                                    from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                    from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "ADET")
                                    select orderDet.SubTotal).Sum() / settings / settings2).ToString(),
                           BoxAll = ((from order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                      from orderDet in order.orderDetails
                                      from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                      from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "KASA")
                                      select orderDet.SubTotal).Sum() / settings)+0+ ((from order in db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2 && q.ApprovalStatus == 1)
                                                      from orderDet in order.orderDetails
                                                      from product in db.Products.Where(q => q.ID == orderDet.ProductID)
                                                      from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2 && q.Name.ToUpper() == "ADET")
                                                      select orderDet.SubTotal+1).Sum() / settings / settings2) .ToString()

                       }
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBranchesOrder(String StartDate, String EndDate)
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

            var OrderList = new
            {
                data = from order in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                       from branch in db.Branchs.Where(q => order.BranchCode == q.ID)
                       from user in db.Users.Where(q => q.ID == order.userID).DefaultIfEmpty()
                       from format in db.branchFormats.Where(q=>q.ID==branch.FormatID)
                       from region in db.Regions.Where(q=>q.ID==branch.RegionID)
                       select new
                       {
                           ID = order.ID,
                           OrderNo = order.OrderNo,
                           CreateDate = order.CreateDate,
                           NumberofProduct = order.NumberofProduct,
                           BranchCode = order.BranchCode,
                           ApprovalStatus = order.ApprovalStatus,
                           BranchName = branch.BranchName.ToUpper(),
                           UserName = order.userName.ToUpper(),
                           //Kasa=from orderget in db.OrderDetails.Where(q=> db.Units.Where(z=>z.StockCode==product.ProductCode && z.UnitCode==2).Select(y=>y.Name).FirstOrDefault().ToUpper() == "KASA" && q.OrderID==order.ID),
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
                          Region=region.Name.ToUpper(),
                          Format= format.FormatName.ToUpper()

                       }

            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBranchList()
        {
            var branchesList = new
            {
                data = from branch in db.Branchs
                       select new
                       {
                           ID = branch.ID,
                           BranchName = branch.BranchName.ToUpper(),
                           BranchCode = branch.BranchCode,
                           BranchCreatedDate = branch.CreateDate,
                           Regions = branch.Regions.Name.ToUpper(),
                           Visible = branch.Visible
                       }

            };
            return Json(branchesList, JsonRequestBehavior.AllowGet);
        }
        public void PassiveBranch(int id, int select)
        {
            Branch branch = db.Branchs.Find(id);

            if (select == 1)
            {
                branch.Visible = true;
            }
            else
            {
                branch.Visible = false;
            }
            db.SaveChanges();
        }

        public JsonResult GetOrder(string StartDate, string EndDate, int UserID)
        {
            DateTime date;
            DateTime date2;
            if (StartDate == "" || EndDate == "")
            {
                date2 = DateTime.Today;
                date = date2.AddDays(-7);
            }
            else
            {
                date = Convert.ToDateTime(StartDate);
                date2 = Convert.ToDateTime(EndDate);
                date2 = date2.AddDays(1);
            }
            int settings = Convert.ToInt32(db.Settings.Where(q => q.SettingsCode == 10398).FirstOrDefault().Value);

            var OrderList = new
            {
                data = from users in db.Users.Where(q => q.ID == UserID)
                       from Branch in users.Branches
                       from order in db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode == Branch.ID)
                       from user in db.Users.Where(q => q.ID == order.userID)
                       select new
                       {
                           ID = order.ID,
                           OrderNo = order.OrderNo,
                           CreateDate = order.CreateDate,
                           NumberofProduct = order.NumberofProduct,
                           BranchCode = order.BranchCode,
                           ApprovalStatus = order.ApprovalStatus,
                           BranchName = Branch.BranchName.ToUpper(),
                           UserName = order.userName.ToUpper(),
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
                                   select orderDet.SubTotal).Sum() / settings).ToString()
                       }
            };

            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult RefreshBranchOrderList(int id)
        {
            string result = "";
            try
            {
                Order tmporder = db.Orders.Find(id);
                tmporder.ApprovalStatus = 0;
                db.SaveChanges();
                result = "Şube Siparişi Beklemeye Alındı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult CancelBranchOrderList(int id)
        {
            string result = "";
            try
            {
                Order tmporder = db.Orders.Find(id);
                tmporder.ApprovalStatus = 2;
                db.SaveChanges();
                result = "Şube Siparişi Reddedildi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ConfirmBranchOrderList(int id)
        {
            string result = "";
            try
            {

                Order tmporder = db.Orders.Find(id);
                tmporder.ApprovalStatus = 1;
                db.SaveChanges();
                result = "Şube Siparişi Onaylandı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OrderCountAndAppCount(string BranchName, string StartDate, string EndDate)
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
            int fark = db.Branchs.Where(z => z.isMaster != true && z.Visible == true && !db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(i => i.BranchCode).Contains(z.ID)).Count();

            int a = 0;
            int b = 0;
            int c = 0;
            int d = 0;
            int branchc = db.Branchs.Where(q => q.isMaster == false && q.Visible == true).Count();
            if (BranchName == "")
            {
                int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                int appc0 = db.Orders.Where(q => q.ApprovalStatus == 0 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                int appc1 = db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                int appc2 = db.Orders.Where(q => q.ApprovalStatus == 2 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();

                a = orderc;
                b = appc0;
                c = appc1;
                d = appc2;
            }
            else
            {
                Branch branch = db.Branchs.Where(q => q.BranchName.ToUpper() == BranchName).FirstOrDefault();
                int orderc = db.Orders.Where(q => q.BranchCode == branch.ID && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                int appc0 = db.Orders.Where(q => q.BranchCode == branch.ID && q.ApprovalStatus == 0 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                int appc1 = db.Orders.Where(q => q.BranchCode == branch.ID && q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                int appc2 = db.Orders.Where(q => q.BranchCode == branch.ID && q.ApprovalStatus == 2 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();

                a = orderc;
                b = appc0;
                c = appc1;
                d = appc2;
            }
            var OrderList = new
            {
                ordercount = a,
                appcount0 = b,
                appcount1 = c,
                appcount2 = d,
                BranchCount = branchc,
                fark=fark
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getSettingsBranchForUpdate(int?[] branchess, int id)
        {
            string result = "";

            try
            {
                foreach (var item in db.Branchs)
                {
                    db.Branchs.Find(item.ID).isMaster = false;
                }
                foreach (var branchId in branchess)
                {
                    db.Branchs.Find(branchId).isMaster = true;
                    db.Branchs.Find(branchId).FormatID = 0;
                    db.Branchs.Find(branchId).LastUpdateDate = DateTime.Now;
                    db.Branchs.Find(branchId).UserID = id;

                    int basketId = db.Baskets.Where(q => q.UserID == branchId).Select(q => q.ID).FirstOrDefault();
                    int bp = db.BasketProducts.Where(q => q.BasketID == basketId).Count();
                    for (int i = 0; i < bp; i++)
                    {
                        BasketProduct basket = db.BasketProducts.Where(q => q.BasketID == basketId).FirstOrDefault();
                        db.BasketProducts.Remove(basket);
                        db.SaveChanges();
                    }
                }
                db.SaveChanges();
                result = "Merkez Depo Atama İşlemi Başarılı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}