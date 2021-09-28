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
         
        public JsonResult backToNewOrder(int id)
        {
            int orderCode = db.Orders.Where(q => q.ID == id).Select(q => q.OrderNo).FirstOrDefault();
            Order order = db.Orders.Where(q => q.OrderNo == orderCode).FirstOrDefault();
            int branchID = order.BranchCode;
            string branchName = db.Branchs.Where(q => q.ID == branchID).Select(q => q.BranchName).FirstOrDefault();

            //string formatname = db.branchFormats.Where(q => db.Branchs.Where(z => z.ID == branchID).Select(z => z.FormatID).FirstOrDefault() == q.ID).Select(q => q.FormatName).FirstOrDefault();
            DateTime createDate = order.CreateDate;
            int OrderNo = order.OrderNo;
            var list = new
            {
                branchId = branchID,
                createDate = createDate,
                orderNo = OrderNo,
                BranchName = branchName.ToUpper(),
                //formatName = formatname.ToUpper(),
                UserName = order.userName,
                approvalStatus = order.ApprovalStatus
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddBPtoOrderDetailsUpdate()
        {
            return RedirectToAction("OrderList", "Branch");
        }
        public ActionResult refreshPage()
        {
            return RedirectToAction("NewOrder", "Branch");
        }
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
        public JsonResult GetProductQuantity(int Code)
        {
            var ProductQuantityList = new
            {
                data = from Quantity in db.quantityModels.Where(q => q.BranchCode == Code)
                       from product in db.Products.Where(q => q.ProductCode == Quantity.StockCode)
                       from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).Take(1)

                       select new
                       {
                           ProductName = product.Name.ToUpper(),
                           StockQuantity = Quantity.StockQuantity,
                           UnitName = unit.Name.ToUpper(),
                       }
            };
            return Json(ProductQuantityList, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public JsonResult SaveAllForProductDet(int prodID, bool isVisible, int Category3ID, string ProductPhoto)
        {
            string result = "";
            try
            {
                Product product = db.Products.Find(prodID);
                int group2 = db.ProductGroup3s.Find(Category3ID).ProductGroup2ID;
                product.Visible = isVisible;
                product.ProductGroup3ID = Category3ID;
                product.ProductGroup2ID = group2;
              
                byte[] data = Convert.FromBase64String(ProductPhoto.Substring(22));
                string fileName = Guid.NewGuid() + ".jpg";
                string savePath = Path.Combine(
                   Server.MapPath("~/assets/media/productPhoto"), fileName
                );
                System.IO.File.WriteAllBytes(savePath, data);
                product.Photo = "/assets/media/productPhoto/"+fileName;
                db.SaveChanges();
                result = "Ürün Güncellemeleri Tamamlandı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }


        public JsonResult GetOrderDetails(int OrderId, int basketId)
        {
            var DetailsList = new
            {
                data = from orderDetails in db.OrderDetails.Where(q => q.OrderID == OrderId && q.BasketID == basketId)
                       from Products in db.Products.Where(q => q.ID == orderDetails.ProductID)
                       select new
                       {
                           ProductName = Products.Name,
                           Quantity = orderDetails.Quantity,
                           SubTotal = orderDetails.SubTotal,
                           Comment = orderDetails.Comment
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
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode && q.BranchNo == Branchs.BranchCode).Take(1).DefaultIfEmpty()
                       from basket in db.Baskets.Where(q => q.UserID == branchCode)
                       from basketPro in db.BasketProducts.Where(q => q.ProductID == product.ID && q.BasketID == basket.ID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= date2 && q.DiscountStartDate <= date2 && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from settings in db.Settings.Where(q => q.SettingsCode == 1313).Take(1)

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = basketPro.SubTotal.ToString(),
                           quantity = basketPro.Quantity.ToString(),
                           Comment = basketPro.Comment,
                           CheckBox = basketPro.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           settings = settings.Value


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult StateOrderReportedit(int productID, int branchID, string dateforSOR)
        {
            DateTime date;
            DateTime date2;
            if (dateforSOR == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(dateforSOR);
                date2 = date.AddDays(1);
            }

            var DetailsList = new
            {
                data = from orderDetails in db.OrderDetails.Where(q => q.BasketID == (db.Baskets.Where(z=>z.UserID==branchID).Select(z=>z.ID).FirstOrDefault()) && q.ProductID==productID && q.CreateDate >= date && q.CreateDate < date2)
                       from Products in db.Products.Where(q => q.ID == productID)
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == Products.ProductCode && q.FormatID == (db.Branchs.Where(z=>z.ID==branchID).Select(z => z.FormatID).FirstOrDefault()))
                       from order in db.Orders.Where(q=>q.ID==orderDetails.OrderID && q.ApprovalStatus==1)
                       from Branchs in db.Branchs.Where(q => q.ID == branchID)


                       select new
                       {
                           ProductName = Products.Name,
                           Quantity = orderDetails.Quantity,
                           SubTotal = orderDetails.SubTotal,
                           Comment = orderDetails.Comment,
                           Maxcapacity=quantityForm.Capacity,
                           OrderNo=order.OrderNo,
                           OrderID=order.ID,
                           CheckBox=orderDetails.CheckBox,
                           BranchName=Branchs.BranchName.ToUpper(),

                       }
            };
        
            return Json(DetailsList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProductsUpdate(int groupId, int branchCode, int orderID)
        {
            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false).OrderBy(q => q.ProductGroup3ID)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1).DefaultIfEmpty()
                       from Order in db.Orders.Where(q => q.ID == orderID)
                       from orderDet in db.OrderDetails.Where(q => q.ProductID == product.ID && q.OrderID == Order.ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= orderDet.CreateDate && q.DiscountStartDate <= Order.CreateDate && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MinCapacity = quantity.MinCapacity,
                           MaxCapacity = quantityForm.Capacity,
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = orderDet.SubTotal.ToString(),
                           quantity = orderDet.Quantity.ToString(),
                           Comment = orderDet.Comment,
                           CheckBox = orderDet.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString()

                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrderProductsUpdate1(int groupId, int branchCode, int orderID)
        {
            int id = 0;
            double count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            int count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            if (count == count2)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count2).First().ID;
            }
            else
            {

                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count2 + 1).First().ID;

            }
            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID < id)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1).DefaultIfEmpty()
                       from Order in db.Orders.Where(q => q.ID == orderID)
                       from orderDet in db.OrderDetails.Where(q => q.ProductID == product.ID && q.OrderID == Order.ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= orderDet.CreateDate && q.DiscountStartDate <= Order.CreateDate && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MinCapacity = quantity.MinCapacity,
                           MaxCapacity = quantityForm.Capacity,
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = orderDet.SubTotal.ToString(),
                           quantity = orderDet.Quantity.ToString(),
                           Comment = orderDet.Comment,
                           CheckBox = orderDet.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProductsUpdate2(int groupId, int branchCode, int orderID)
        {
            int id = 0;
            int id2 = 0;
            int count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            double count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            if (count == count2)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2).First().ID;

            }
            else if (count2 - count >= 0.50)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count + 1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 2).First().ID;

            }
            else
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count + 1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 1).First().ID;

            }
            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID < id2 && q.ID >= id)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1).DefaultIfEmpty()
                       from Order in db.Orders.Where(q => q.ID == orderID)
                       from orderDet in db.OrderDetails.Where(q => q.ProductID == product.ID && q.OrderID == Order.ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= orderDet.CreateDate && q.DiscountStartDate <= Order.CreateDate && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MinCapacity = quantity.MinCapacity,
                           MaxCapacity = quantityForm.Capacity,
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = orderDet.SubTotal.ToString(),
                           quantity = orderDet.Quantity.ToString(),
                           Comment = orderDet.Comment,
                           CheckBox = orderDet.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProductsUpdate3(int groupId, int branchCode, int orderID)
        {
            int id = 0;
            int id2 = 0;
            int count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            double count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            if (count == count2)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3).First().ID;

            }
            else if (count2 - count == 0.75)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 3).First().ID;

            }
            else if (count2 - count == 0.50)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 2).First().ID;

            }
            else
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 1).First().ID;

            }
            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID < id2 && q.ID >= id)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1).DefaultIfEmpty()
                       from Order in db.Orders.Where(q => q.ID == orderID)
                       from orderDet in db.OrderDetails.Where(q => q.ProductID == product.ID && q.OrderID == Order.ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= orderDet.CreateDate && q.DiscountStartDate <= Order.CreateDate && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MinCapacity = quantity.MinCapacity,
                           MaxCapacity = quantityForm.Capacity,
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = orderDet.SubTotal.ToString(),
                           quantity = orderDet.Quantity.ToString(),
                           Comment = orderDet.Comment,
                           CheckBox = orderDet.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProductsUpdate4(int groupId, int branchCode, int orderID)
        {
            int id = 0;
            int id2 = 0;
            int count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            double count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            if (count == count2)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4) - 1).First().ID;

            }
            else if (count2 - count == 0.75)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 3).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4 + 3) - 1).First().ID;

            }
            else if (count2 - count == 0.50)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4 + 2) - 1).First().ID;

            }
            else
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4 + 1) - 1).First().ID;

            }

            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID <= id2 && q.ID >= id)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode).Take(1).DefaultIfEmpty()
                       from Order in db.Orders.Where(q => q.ID == orderID)
                       from orderDet in db.OrderDetails.Where(q => q.ProductID == product.ID && q.OrderID == Order.ID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= orderDet.CreateDate && q.DiscountStartDate <= Order.CreateDate && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MinCapacity = quantity.MinCapacity,
                           MaxCapacity = quantityForm.Capacity,
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = orderDet.SubTotal.ToString(),
                           quantity = orderDet.Quantity.ToString(),
                           Comment = orderDet.Comment,
                           CheckBox = orderDet.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProducts1(int groupId, int? branchCode, string date)
        {

            DateTime date2;
            int id = 0;
            if (date != "")
            {
                date2 = Convert.ToDateTime(date);
            }
            else
            {
                date2 = DateTime.Now;
            }
            double count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t=>t.ID==branchCode).FirstOrDefault().BranchCode && z.StockCode==q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count())/4.0;
            int count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            if (count == count2)
            {
                 id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count2).First().ID;
            }
            else {

                 id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count2+1).First().ID;

            }
            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID<id)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1) 
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode && q.BranchNo == Branchs.BranchCode).Take(1).DefaultIfEmpty()
                       from basket in db.Baskets.Where(q => q.UserID == branchCode)
                       from basketPro in db.BasketProducts.Where(q => q.ProductID == product.ID && q.BasketID == basket.ID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= date2 && q.DiscountStartDate <= date2 && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from settings in db.Settings.Where(q=>q.SettingsCode==1313).Take(1)
                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = basketPro.SubTotal.ToString(),
                           quantity = basketPro.Quantity.ToString(),
                           Comment = basketPro.Comment,
                           CheckBox = basketPro.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage=Group3.Photo,
                           settings=settings.Value
                          

                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProducts2(int groupId, int? branchCode, string date)
        {
            int id=0;
            int id2 = 0;
            int count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            double count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            if (count == count2)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2).First().ID;

            }
            else if (count2 - count >= 0.50)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count+1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2+2).First().ID;

            }
            else  
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count + 1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2+1 ).First().ID;

            }

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
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID<id2 && q.ID>=id ).OrderBy(q => q.ProductGroup3ID)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode && q.BranchNo == Branchs.BranchCode).Take(1).DefaultIfEmpty()
                       from basket in db.Baskets.Where(q => q.UserID == branchCode)
                       from basketPro in db.BasketProducts.Where(q => q.ProductID == product.ID && q.BasketID == basket.ID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= date2 && q.DiscountStartDate <= date2 && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from settings in db.Settings.Where(q => q.SettingsCode == 1313).Take(1)

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = basketPro.SubTotal.ToString(),
                           quantity = basketPro.Quantity.ToString(),
                           Comment = basketPro.Comment,
                           CheckBox = basketPro.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,
                           settings = settings.Value


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProducts3(int groupId, int? branchCode, string date)
        {
            
            DateTime date2;

            if (date != "")
            {
                date2 = Convert.ToDateTime(date);
            }
            else
            {
                date2 = DateTime.Now;
            }int id = 0;
            int id2 = 0;
            int count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            double count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            if (count == count2)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3).First().ID;

            }
            else if (count2 - count == 0.75)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 3).First().ID;

            }
            else if (count2 - count == 0.50)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 2).First().ID;

            }
            else {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 2 + 1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3 + 1).First().ID;

            }
            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID<id2 && q.ID>=id).OrderBy(q => q.ProductGroup3ID)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode && q.BranchNo == Branchs.BranchCode).Take(1).DefaultIfEmpty()
                       from basket in db.Baskets.Where(q => q.UserID == branchCode)
                       from basketPro in db.BasketProducts.Where(q => q.ProductID == product.ID && q.BasketID == basket.ID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= date2 && q.DiscountStartDate <= date2 && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from settings in db.Settings.Where(q => q.SettingsCode == 1313).Take(1)

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = basketPro.SubTotal.ToString(),
                           quantity = basketPro.Quantity.ToString(),
                           Comment = basketPro.Comment,
                           CheckBox = basketPro.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,
                           settings = settings.Value


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProducts4(int groupId, int? branchCode, string date)
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
            int id = 0;
            int id2 = 0;
            int count = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4;
            double count2 = (db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).Count()) / 4.0;
            if (count == count2)
            {
                 id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3).First().ID;
                 id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4) - 1).First().ID;

            }
            else if (count2 - count == 0.75)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3+3).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4+3) - 1).First().ID;

            }
            else if (count2 - count == 0.50)
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3+2).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4+2) - 1).First().ID;

            }
            else
            {
                id = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip(count * 3+1).First().ID;
                id2 = db.Products.Where(q => q.ProductGroup2ID == groupId && q.ProductCode == db.quantityModels.Where(z => z.BranchCode == db.Branchs.Where(t => t.ID == branchCode).FirstOrDefault().BranchCode && z.StockCode == q.ProductCode).FirstOrDefault().StockCode && q.Visible == false).OrderBy(q => q.ID).Skip((count * 4+1) - 1).First().ID;

            }

            var orderProductList = new
            {
                data =
                       from Group2 in db.ProductGroup2s.Where(q => q.ID == groupId)
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from Branchs in db.Branchs.Where(q => q.ID == branchCode)
                       from quantity in db.quantityModels.Where(q => q.BranchCode == Branchs.BranchCode)
                       from product in db.Products.Where(q => q.ProductGroup3ID == Group3.ID && q.ProductCode == quantity.StockCode && q.Visible == false && q.ID <= id2 && q.ID >= id).OrderBy(q => q.ProductGroup3ID)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit2 in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode && q.BranchNo == Branchs.BranchCode).Take(1).DefaultIfEmpty()
                       from basket in db.Baskets.Where(q => q.UserID == branchCode)
                       from basketPro in db.BasketProducts.Where(q => q.ProductID == product.ID && q.BasketID == basket.ID).DefaultIfEmpty()
                       from DiscountBranch in db.discountBranches.Where(q => q.branchID == Branchs.ID && q.DiscountEndDate >= date2 && q.DiscountStartDate <= date2 && q.productID == product.ID).DefaultIfEmpty().Take(1)
                       from discount in db.Discounts.Where(q => q.ID == DiscountBranch.discountID).DefaultIfEmpty()
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == Branchs.FormatID).DefaultIfEmpty()
                       from settings in db.Settings.Where(q => q.SettingsCode == 1313).Take(1)

                       select new
                       {
                           ID = product.ID,
                           Group = Group2.Name,
                           Code = barcode.Code,
                           Name = product.Name,
                           ProductUnitName = unit2.Name,
                           UnitWeight = unit2.Weight.ToString(),
                           UnitFactor = unit2.Factor.ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           UnitPrices = price.Price1.ToString(), /* *unit.factor*/
                           subtotal = basketPro.SubTotal.ToString(),
                           quantity = basketPro.Quantity.ToString(),
                           Comment = basketPro.Comment,
                           CheckBox = basketPro.CheckBox.ToString(),
                           DiscountProd = DiscountBranch.productID.ToString(),
                           Coefficient = discount.Coefficient.ToString(),
                           GroupImage = Group3.Photo,
                           settings = settings.Value


                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }

        public void ForSaveOrder(int productId, int branchId, string comment)
        {
            Basket b = db.Baskets.Where(x => x.UserID == branchId).FirstOrDefault(); // BranchId ile değişitir
            BasketProduct bp = db.BasketProducts.Where(x => x.ProductID == productId && x.BasketID == b.ID).FirstOrDefault();
            if (bp == null)
            {
                BasketProduct nbp = new BasketProduct()
                {
                    ProductID = productId,
                    BasketID = b.ID,
                    Comment = comment,
                    CreateDate = DateTime.Now
                };
                db.BasketProducts.Add(nbp);
                db.SaveChanges();
            }
            else
            {
                bp.Comment = comment;
                db.SaveChanges();
            }
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
        public void ForSaveOrderUpdate(int productId, int GroupID, string comment)
        {
            Order or = db.Orders.Find(GroupID); // BranchId ile değişitir
            OrderDetail bp = db.OrderDetails.Where(x => x.ProductID == productId && x.OrderID == or.ID).FirstOrDefault();
            Basket b = db.Baskets.Where(q => or.BranchCode == q.UserID).FirstOrDefault();

            if (bp == null)
            {
                OrderDetail nbp = new OrderDetail()
                {
                    ProductID = productId,
                    BasketID = b.ID,
                    Comment = comment,
                    CreateDate = or.CreateDate,
                     OrderID=GroupID,
                      Quantity=0,
                       SubTotal=0,
                    
                };
                db.OrderDetails.Add(nbp);
                db.SaveChanges();
            }
            else
            {
                bp.Comment = comment;
                db.SaveChanges();
            }
        }
        public JsonResult ToBasketOtoOrder(int productId, int branchId, string subTotal, string count)
        {
            Basket b = db.Baskets.Where(x => x.UserID == branchId).FirstOrDefault(); // BranchId ile değişitir
            BasketProduct bp = db.BasketProducts.Where(x => x.ProductID == productId && x.BasketID == b.ID).FirstOrDefault();
            int subTotal2=0;
            int count2=0;

            if(subTotal!="")
                subTotal2 = Convert.ToInt32(subTotal);

            if(count!="")
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
        public JsonResult ToBasketOtoOrderUpdate(int productId, int OrderID, string subTotal, string count)
        {
            Order or = db.Orders.Find(OrderID);
            OrderDetail bp = db.OrderDetails.Where(q => q.ProductID == productId && q.OrderID == OrderID).FirstOrDefault();
            Basket b = db.Baskets.Where(q => or.BranchCode == q.UserID).FirstOrDefault();
            int subTotal2 = 0;
            int count2 = 0;

            if (subTotal != "")
                subTotal2 = Convert.ToInt32(subTotal);

            if (count != "")
                count2 = Convert.ToInt32(count);

            if (bp == null)
            {
                OrderDetail nbp = new OrderDetail()
                {
                    Quantity = subTotal2,
                    ProductID = productId,
                    OrderID = OrderID,
                    CreateDate = or.CreateDate,
                    BasketID = b.ID,
                    SubTotal = count2
                };
                db.OrderDetails.Add(nbp);
                or.NumberofProduct = or.NumberofProduct + 1;
                db.SaveChanges();
            }
            else
            {
                bp.Quantity = subTotal2;
                bp.SubTotal = count2;
                db.SaveChanges();
            }
            var Total = (from o in db.Orders.Where(q => q.ID == OrderID)
                         from t in db.OrderDetails.Where(q => q.OrderID == o.ID)
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
        public JsonResult BasketToCheckUpdateCap(bool CheckBox, int ProductID, int OrderID, int discount)
        {
            var Subtotal = 0.0;
            Order or = db.Orders.Find(OrderID);
            OrderDetail bp = db.OrderDetails.Where(q => q.ProductID == ProductID && q.OrderID == OrderID).FirstOrDefault();
            Basket b = db.Baskets.Where(q => or.BranchCode == q.UserID).FirstOrDefault();
            QuantityFormat qf = db.quantityFormats.Where(q => (db.Products.Where(z => z.ID == ProductID).Select(u => u.ProductCode).FirstOrDefault()) == q.StockCode && db.Branchs.Where(t => t.ID == or.BranchCode).FirstOrDefault().FormatID == q.FormatID).FirstOrDefault();
            if (bp == null)
            {
                OrderDetail nbp = new OrderDetail()
                {
                    CheckBox = CheckBox,
                    ProductID = ProductID,
                    BasketID = b.ID,
                    SubTotal = 0,
                    CreateDate = DateTime.Now,
                    Quantity = 0,
                    OrderID = OrderID,
                };
                db.OrderDetails.Add(nbp);
                db.SaveChanges();
                Subtotal = nbp.SubTotal;

            }
            else
            {
                bp.CheckBox = CheckBox;
                int value = (qf.Capacity - bp.Quantity) * discount;
                if (CheckBox == false && value >= 0)
                    bp.SubTotal = (qf.Capacity - bp.Quantity) * discount;

                else
                    bp.SubTotal = 0;
                db.SaveChanges();
                Subtotal = bp.SubTotal;

            }
            return Json(Subtotal, JsonRequestBehavior.AllowGet);

        }

        public JsonResult BasketToCheckUpdate(bool CheckBox, int ProductID, int OrderID, int discount)
        {
            var Subtotal = 0.0;
            Order or = db.Orders.Find(OrderID);
            OrderDetail bp = db.OrderDetails.Where(q => q.ProductID == ProductID && q.OrderID == OrderID).FirstOrDefault();
            Basket b = db.Baskets.Where(q => or.BranchCode == q.UserID).FirstOrDefault();
            QuantityFormat qf = db.quantityFormats.Where(q => (db.Products.Where(z => z.ID == ProductID).Select(u => u.ProductCode).FirstOrDefault()) == q.StockCode && db.Branchs.Where(t => t.ID == or.BranchCode).FirstOrDefault().FormatID == q.FormatID).FirstOrDefault();
            if (bp == null)
            {
                OrderDetail nbp = new OrderDetail()
                {
                    CheckBox = CheckBox,
                    ProductID = ProductID,
                    BasketID = b.ID,
                    SubTotal = 0,
                    CreateDate = DateTime.Now,
                    Quantity=0,
                    OrderID= OrderID,
                      

                };
                db.OrderDetails.Add(nbp);
                db.SaveChanges();
                Subtotal = nbp.SubTotal;

            }
            else
            {
                bp.CheckBox = CheckBox;
                int value = (qf.Capacity - bp.Quantity) * discount;
                
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
        public void ToBasketUpdate(int productId, int OrderID, int subTotal)
        {
            Order or = db.Orders.Find(OrderID);
            OrderDetail bp = db.OrderDetails.Where(q => q.ProductID == productId && q.OrderID == OrderID).FirstOrDefault();
            Basket b = db.Baskets.Where(q => or.BranchCode == q.UserID).FirstOrDefault();
            if (bp == null)
            {
                OrderDetail nbp = new OrderDetail()
                {
                    Quantity = subTotal,
                    ProductID = productId,
                    OrderID = OrderID,
                    CreateDate = or.CreateDate,
                    BasketID = b.ID
                };
                db.OrderDetails.Add(nbp);
                or.NumberofProduct = or.NumberofProduct + 1;
                db.SaveChanges();
            }
            else
            {
                bp.Quantity = subTotal;
                db.SaveChanges();
            }
        }
        public void ToBasket2Update(int productId, int OrderID, int count)
        {
            Order or = db.Orders.Find(OrderID);
            OrderDetail bp = db.OrderDetails.Where(q => q.ProductID == productId && q.OrderID == OrderID).FirstOrDefault();
            Basket b = db.Baskets.Where(q => or.BranchCode == q.UserID).FirstOrDefault();
            if (bp == null)
            {
                OrderDetail nbp = new OrderDetail()
                {
                    ProductID = productId,
                    OrderID = OrderID,
                    SubTotal = count,
                    CreateDate = or.CreateDate,
                    BasketID = b.ID,
                };
                or.NumberofProduct = or.NumberofProduct + 1;
                db.OrderDetails.Add(nbp);
                db.SaveChanges();
            }
            else
            {
                bp.SubTotal = count;
                db.SaveChanges();
            }
        }
        public void ToBasket2(int productId, int branchId, int count)
        {
            Basket b = db.Baskets.Where(x => x.UserID == branchId).FirstOrDefault(); // BranchId ile değişitir
            BasketProduct bp = db.BasketProducts.Where(x => x.ProductID == productId && x.BasketID == b.ID).FirstOrDefault();
            if (bp == null)
            {
                BasketProduct nbp = new BasketProduct()
                {
                    ProductID = productId,
                    BasketID = b.ID,
                    SubTotal = count,
                    CreateDate = DateTime.Now
                };
                db.BasketProducts.Add(nbp);
                db.SaveChanges();
            }
            else
            {
                bp.SubTotal = count;
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
                           MaxCapacity = quantityForm.Capacity,
                           subtotal = BasketDet.SubTotal.ToString(),
                           quantity = BasketDet.Quantity.ToString(),
                           Comment = BasketDet.Comment,
                           Group2 = Group2.ID,
                           CheckBox=BasketDet.CheckBox,
                       }
            };
            return Json(ProductQuantityList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getOrderAbsUpdate(int OrderID)
        {
            var ProductQuantityList = new
            {
                data = from order in db.Orders.Where(q => q.ID == OrderID)
                       from OrderDet in db.OrderDetails.Where(q => q.OrderID == OrderID)
                       from product in db.Products.Where(q => q.ID == OrderDet.ProductID)
                       from Branch in db.Branchs.Where(q => q.ID == order.BranchCode)
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
                           MaxCapacity = quantityForm.Capacity,
                           subtotal = OrderDet.SubTotal.ToString(),
                           quantity = OrderDet.Quantity.ToString(),
                           Comment = OrderDet.Comment,
                           Group2 = Group2.ID,
                           CheckBox = OrderDet.CheckBox,


                       }
            };
            return Json(ProductQuantityList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult productCountTotalUpdate(int OrderID)
        {

            var Total = (from o in db.Orders.Where(q => q.ID == OrderID)
                         from t in db.OrderDetails.Where(q => q.OrderID == o.ID)
                         select t).Count();

            return Json(Total, JsonRequestBehavior.AllowGet);
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
        public JsonResult randomDepoNo()
        {
            int Rnd = db.entryStocks.Select(q => q.StoreCode).DefaultIfEmpty().Max() + 1;
            return Json(Rnd, JsonRequestBehavior.AllowGet);
        }
        public JsonResult orderAbsBranch(int branchID)
        {
            Branch branch = db.Branchs.Find(branchID);
            string brnch = branch.BranchName.ToUpper();
            return Json(brnch, JsonRequestBehavior.AllowGet);
        }

        public void ToUpdateOrderProduct(int productId, int subTotal, int count, int OrderID)
        {
            OrderDetail orderDetail = db.OrderDetails.Where(q => q.ProductID == productId && q.OrderID == OrderID).FirstOrDefault();
            orderDetail.SubTotal = count;
            orderDetail.Quantity = subTotal;
            db.SaveChanges();
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