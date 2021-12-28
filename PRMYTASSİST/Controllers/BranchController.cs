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
        public ActionResult NewOrder(int? id = 0)
        {
            TempData["groupId"] = id;
            return View();
        }
        public ActionResult OrderList()
        {
            return View();
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
                       //from format in db.branchFormats.Where(q => q.ID == branch.FormatID)
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
                           SaveDetails = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
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
                           //Format = format.FormatName.ToUpper()

                       }

            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
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
                fark = fark
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
    }
}