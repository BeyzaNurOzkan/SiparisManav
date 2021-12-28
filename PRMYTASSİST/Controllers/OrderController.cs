using Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class OrderController : Controller
    {
        REContext db = new REContext();

        // GET: Order
        public ActionResult AddBPtoOrderDetails(int BranchCode, int orderNewCode2, int userID, string kt_datepicker_3, string userName)
        {
            DateTime date;
            if (kt_datepicker_3 == "")
                date = DateTime.Today;
            else
            {
                DateTime date2 = Convert.ToDateTime(kt_datepicker_3);
                DateTime date3 = DateTime.Now;
                date = new DateTime(date2.Year, date2.Month, date2.Day, date3.Hour, date3.Minute, date3.Second);
            }
            int orderCodeControl = db.Orders.OrderByDescending(q => q.OrderNo).Select(q => q.OrderNo).FirstOrDefault();
            orderNewCode2 = orderCodeControl + 1;
            Basket basket1 = db.Baskets.Where(q => BranchCode == q.UserID).First();
            int count = db.BasketProducts.Where(q => q.BasketID == basket1.ID).Count();
            int id = 0;

            for (int i = 0; i < count; i++)
            {
                BasketProduct basketProc1 = db.BasketProducts.Where(q => q.ID > id && q.BasketID == basket1.ID).OrderBy(q => q.ID).First();
                id = basketProc1.ID;

            }
            int count2 = db.BasketProducts.Where(q => q.BasketID == basket1.ID).Count();

            if (count2 != 0)
            {

                Order orders = new Order()
                {
                    OrderNo = orderNewCode2,
                    CreateDate = date,
                    ApprovalStatus = 0,
                    BranchCode = BranchCode,
                    userID = userID,
                    userName = userName
                };
                db.Orders.Add(orders);
                db.SaveChanges();
                orders.NumberofProduct = count2;

                for (int i = 0; i < count2; i++)
                {
                    BasketProduct basketProc = db.BasketProducts.Where(q => q.BasketID == basket1.ID).First();
                    OrderDetail orderDetail = new OrderDetail()
                    {
                        OrderID = orders.ID,
                        CreateDate = date,
                        BasketID = basketProc.BasketID,
                        Comment = basketProc.Comment,
                        ProductID = basketProc.ProductID,
                        Quantity = basketProc.Quantity,
                        SubTotal = basketProc.SubTotal,
                        CheckBox = basketProc.CheckBox
                    };
                    db.OrderDetails.Add(orderDetail);
                    db.BasketProducts.Remove(basketProc);
                    db.SaveChanges();
                }
                db.SaveChanges();
            }
            return RedirectToAction("OrderList", "Branch");
        }
        public JsonResult getProductGroup2(string ProductGroup, string branchID)
        {
            int productgroup2 = 0;
            if (ProductGroup == "0")
            {
                ProductGroup a = db.ProductGroups.Where(q => q.ID != 0 && q.Priority>0).OrderBy(q=>q.Priority).FirstOrDefault();
                if (a!=null)
                productgroup2 = db.ProductGroups.Where(q => q.ID != 0 && q.Priority > 0).OrderBy(q => q.Priority).ThenBy(q=>q.Name).FirstOrDefault().ID;
                else
                    productgroup2 = db.ProductGroups.Where(q => q.ID != 0).OrderBy(q=>q.Name).FirstOrDefault().ID;

            }
            else
            {
                productgroup2 = Convert.ToInt32(ProductGroup);
            }
            int branch = Convert.ToInt32(branchID);
            int Code = db.Branchs.Find(branch).BranchCode;
            var DetailsList = new
            {
                data = from productGroup2s in db.ProductGroup2s.Where(q => q.ProductGroupID == productgroup2).OrderBy(q=>q.Priority).ThenBy(q=>q.Name)


                       select new
                       {
                           ID = productGroup2s.ID,
                           Code = productGroup2s.CodeRand,
                           Name = productGroup2s.Name.ToUpper(),
                           Count = (from product in db.Products.Where(q => q.ProductGroup2ID == productGroup2s.ID)
                                    from count in db.quantityModels.Where(q => q.StockCode == product.ProductCode && q.BranchCode == Code)
                                    select count.BranchCode).Count(),
                          Priority=productGroup2s.Priority
                       }
            };
            return Json(DetailsList, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetOrderProductsListView(int groupId, int? branchCode, string date)
        {

            DateTime date2;

            if (date != "")
            {
                date2 = Convert.ToDateTime(date);
            }
            else
            {
                date2 = DateTime.Now;
            }

            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false).OrderBy(q => q.ProductGroup3ID)
                       //from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       //from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       //from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       //from price in db.prices.Where(q => q.StockCode == product.ProductCode && q.BranchNo == Branchs.BranchCode).Take(1).DefaultIfEmpty()
                       from basket in db.Baskets.Where(q => q.UserID == branchCode)
                       from basketPro in db.BasketProducts.Where(q => q.ProductID == product.ID && q.BasketID == basket.ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from settings in db.Settings.Where(q => q.SettingsCode == 1313).Take(1)

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = product.ProductCode,
                           Name = product.Name,
                           ProductUnitName ="Adet" ,
                           UnitWeight = "50",
                           UnitFactor = "50",
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           UnitPrices = "29,90",
                           subtotal = basketPro.SubTotal.ToString(),
                           quantity = basketPro.Quantity.ToString(),
                           Comment = basketPro.Comment,
                           CheckBox = basketPro.CheckBox.ToString(),
                           settings = settings.Value


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult DeleteBranchOrder(int id)
        {
            string result = "";
            try
            {
                Order order = db.Orders.Find(id);
                int sip = order.OrderNo;
                db.Orders.Remove(order);
                db.SaveChanges();
                result = sip + " Nolu Sipariş Silindi!";

            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult cancelToNewOrder(int id)
        {
            string result = "";
            try
            {
                Basket basket = db.Baskets.Where(q => q.UserID == id).FirstOrDefault();
                int bp = db.BasketProducts.Where(q => q.BasketID == basket.ID).Count();
                for (int i = 0; i < bp; i++)
                {
                    BasketProduct bpt = db.BasketProducts.Where(q => q.BasketID == basket.ID).FirstOrDefault();
                    db.BasketProducts.Remove(bpt);
                    db.SaveChanges();

                }

                result = " Siparişten Vazgeçildi";

            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ToBasketOtoOrder(int productId, int branchId, string subTotal, string count)
        {
            Basket b = db.Baskets.Where(x => x.UserID == branchId).FirstOrDefault(); // BranchId ile değişitir
            BasketProduct bp = db.BasketProducts.Where(x => x.ProductID == productId && x.BasketID == b.ID).FirstOrDefault();
            int subTotal2 = 0;
            int count2 = 0;

            if (subTotal != "")
                subTotal2 = Convert.ToInt32(subTotal);

            if (count != "")
                count2 = Convert.ToInt32(count);

            if (bp == null)
            {
                BasketProduct nbp = new BasketProduct()
                {
                    Quantity = subTotal2,
                    ProductID = productId,
                    BasketID = b.ID,
                    SubTotal = count2,
                    CreateDate = DateTime.Now
                };
                db.BasketProducts.Add(nbp);
                db.SaveChanges();
            }
            else
            {
                bp.Quantity = subTotal2;
                bp.SubTotal = count2;
                db.SaveChanges();
            }
            var Total = (from o in db.Baskets.Where(q => q.UserID == branchId)
                         from t in db.BasketProducts.Where(q => q.BasketID == o.ID)
                         select t).Count();

            return Json(Total, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BasketToCheck(bool CheckBox, int ProductID, int branchID, int discount)
        {
            var Subtotal = 0.0;
            Basket b = db.Baskets.Where(x => x.UserID == branchID).FirstOrDefault(); // BranchId ile değişitir
            BasketProduct bp = db.BasketProducts.Where(x => x.ProductID == ProductID && x.BasketID == b.ID).FirstOrDefault();
            QuantityFormat qf = db.quantityFormats.Where(q => (db.Products.Where(z => z.ID == ProductID).Select(u => u.ProductCode).FirstOrDefault()) == q.StockCode && db.Branchs.Where(t => t.ID == branchID).FirstOrDefault().FormatID == q.FormatID).FirstOrDefault();
            if (bp == null)
            {
                BasketProduct nbp = new BasketProduct()
                {
                    CheckBox = CheckBox,
                    ProductID = ProductID,
                    BasketID = b.ID,
                    SubTotal = 0,
                    CreateDate = DateTime.Now
                };
                db.BasketProducts.Add(nbp);
                db.SaveChanges();
                Subtotal = nbp.SubTotal;

            }
            else
            {
                bp.CheckBox = CheckBox;

                bp.SubTotal = 0;
                db.SaveChanges();
                Subtotal = bp.SubTotal;

            }
            return Json(Subtotal, JsonRequestBehavior.AllowGet);

        }
        public void ToBasket(int productId, int branchId, int subTotal)
        {
            Basket b = db.Baskets.Where(x => x.UserID == branchId).FirstOrDefault(); // BranchId ile değişitir
            BasketProduct bp = db.BasketProducts.Where(x => x.ProductID == productId && x.BasketID == b.ID).FirstOrDefault();
            if (bp == null)
            {
                BasketProduct nbp = new BasketProduct()
                {
                    Quantity = subTotal,
                    ProductID = productId,
                    BasketID = b.ID,

                    CreateDate = DateTime.Now
                };
                db.BasketProducts.Add(nbp);
                db.SaveChanges();
            }
            else
            {
                bp.Quantity = subTotal;
                db.SaveChanges();
            }
        }
        public JsonResult getOrderAbs(int branchID)
        {
            var ProductQuantityList = new
            {
                data =
                       from selectBranch in db.Baskets.Where(q => q.UserID == branchID)
                       from BasketDet in db.BasketProducts.Where(q => q.BasketID == selectBranch.ID).DefaultIfEmpty()
                       from product in db.Products.Where(q => q.ID == BasketDet.ProductID)
                       from Branch in db.Branchs.Where(q => q.ID == branchID)
                       from Quantity in db.quantityModels.Where(q => q.BranchCode == Branch.BranchCode && q.StockCode == product.ProductCode)
                       from Group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID)
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == Group3.ProductGroup2ID)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branch.FormatID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name.ToUpper(),
                           Name = product.Name,
                           Code = barcode.Code,
                           ProductUnitName = unit2.Name.ToUpper(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           subtotal = BasketDet.SubTotal.ToString(),
                           quantity = BasketDet.Quantity.ToString(),
                           Comment = BasketDet.Comment,
                           Group2 = Group2.ID,
                           CheckBox = BasketDet.CheckBox,
                       }
            };
            return Json(ProductQuantityList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult productCountTotal(int branchID)
        {

            var Total = (from o in db.Baskets.Where(q => q.UserID == branchID)
                         from t in db.BasketProducts.Where(q => q.BasketID == o.ID)
                         select t).Count();

            return Json(Total, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ProductFormat(int branchID)
        {

            var Total = from o in db.Branchs.Where(q => q.ID == branchID)
                        from t in db.branchFormats.Where(q => q.ID == o.FormatID)
                        select t.FormatName.ToUpper();

            return Json(Total, JsonRequestBehavior.AllowGet);
        }
        public JsonResult randomOrderNo()
        {
            int Rnd = db.Orders.Select(q => q.OrderNo).DefaultIfEmpty().Max() + 1;
            return Json(Rnd, JsonRequestBehavior.AllowGet);
        }
        public JsonResult orderAbsBranch(int branchID)
        {
            Branch branch = db.Branchs.Find(branchID);
            string brnch = branch.BranchName.ToUpper();
            return Json(brnch, JsonRequestBehavior.AllowGet);
        }
        public JsonResult OrderDetailChange(int orderid, int d)
        {
            int newOrderId = 0;
            if (d == 0)
            {
                Order order = db.Orders.Find(orderid);
                newOrderId = db.Orders.Where(q => q.ID < orderid).OrderByDescending(q => q.ID).Take(1).Select(q => q.ID).FirstOrDefault();
            }
            if (d == 1)
            {
                Order order = db.Orders.Find(orderid);
                newOrderId = db.Orders.Where(q => q.ID > orderid).OrderBy(q => q.ID).Take(1).Select(q => q.ID).FirstOrDefault();
            }
            return Json(newOrderId, JsonRequestBehavior.AllowGet);
        }
        public ActionResult OrderToBranch(int?[] orders)
        {
            string result = "";
            try
            {
                foreach (var ordersId in orders)
                {
                    Order order = db.Orders.Find(ordersId);
                    order.ApprovalStatus = 1;
                }
                db.SaveChanges();
                result = "Siparişler Onaylandı!";

            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public ActionResult OrderToBranchNeg(int?[] orders)
        {
            string result = "";
            try
            {
                foreach (var ordersId in orders)
                {
                    Order order = db.Orders.Find(ordersId);
                    order.ApprovalStatus = 2;
                }
                db.SaveChanges();
                result = "Siparişler Reddedildi!";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}