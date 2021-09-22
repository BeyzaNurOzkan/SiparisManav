 using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class DiscountController : Controller
    {
        REContext db = new REContext();
        // GET: Discount
        public ActionResult DiscountDefinitions()
        {
            return View();
        }
        public ActionResult DiscountAssignmentDefinitions()
        {
            return View();
        }
        
        public ActionResult DiscountProductDefinitions()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetDiscount()
        {
            var discountList = new
            {
                data =
                       from discount in db.Discounts
                       from user in db.Users.Where(q => q.ID == discount.UserID)
                       select new
                       {
                           ID = discount.ID,
                           DiscountName = discount.DiscountName,
                           DiscountCode = discount.DiscountCode,
                           Visible = discount.Visible,
                           CreatedDate = discount.CreateDate,
                           CreatedUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                           Coefficient = discount.Coefficient
                       }
            };
            return Json(discountList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UpdateDiscount(int ID, int currentUser, string lastname, string firstname, int Coefficient)
        {
            Discount discount = db.Discounts.Find(ID);
            discount.DiscountName = firstname;
            discount.DiscountCode = Convert.ToInt32(lastname);
            discount.Visible = true;
            discount.LastUpdateDate = DateTime.Now;
            discount.UserID = currentUser;
            discount.Coefficient = Coefficient;

            db.SaveChanges();
            return RedirectToAction("DiscountDefinitions", "Discount");
        }
        public JsonResult EditDiscount(int id)
        {

            Discount discount = db.Discounts.Find(id);
            User user = db.Users.Where(q => q.ID == discount.UserID).First();
            var branch = new
            {
                ID = discount.ID,
                FormatName = discount.DiscountName,
                FormatCode = discount.DiscountCode,
                Visible = discount.Visible,
                CreatedDate = discount.CreateDate,
                CreatedUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                LastUpdateDate = discount.LastUpdateDate,
                Coefficient = discount.Coefficient
            };
            return Json(branch, JsonRequestBehavior.AllowGet);
        }
        public ActionResult NewDiscount(int currentUser, string DiscountCode, string DiscountName, int Coefficient1)
        {
            Discount discount = new Discount()
            {
                DiscountName = DiscountName,
                DiscountCode = Convert.ToInt32(DiscountCode),
                Visible = true,
                CreateDate = DateTime.Now,
                UserID = currentUser,
                LastUpdateDate = DateTime.Now,
                Coefficient = Coefficient1
            };
            db.Discounts.Add(discount);
            db.SaveChanges();
            return RedirectToAction("DiscountDefinitions", "Discount");
        }
        [HttpPost]
        public JsonResult DeleteDiscount(int id)
        {
            string result = "";
            try
            {
                Discount tmpUser = db.Discounts.Find(id);
                db.Discounts.Remove(tmpUser);
                db.SaveChanges();
                result = "İndirim Silindi...";
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
                Discount tmpUser = db.Discounts.Find(id);
                tmpUser.Visible = false;
                db.SaveChanges();
                result = "İndirim Durumu Pasif...";
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
                Discount tmpUser = db.Discounts.Find(id);
                tmpUser.Visible = true;
                db.SaveChanges();
                result = "İndirim Durumu Aktif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public string GetProductForDiscount()
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
                           ProductGroupUrl = ProductGroup2ss.Name.ToUpper()
                       }
            };
            var serializer = new JavaScriptSerializer();
            serializer.MaxJsonLength = Int32.MaxValue;

            return serializer.Serialize(productList);
        }
        [HttpPost]
        public JsonResult DiscountToBranch(int?[] branchs, int?[] product, int discountID, string startDate, string endDate)
        {
            string result = "";
            try
            {
                if (branchs == null)
                {
                    result = "Lütfen Şube Seçiniz...";
                }
                else if (product == null)
                {
                    result = "Lütfen Ürün Seçiniz...";
                }
                else if (discountID == 0)
                {
                    result = "İndirim Seçiniz...";
                }
                else
                {
                    DateTime date;
                    DateTime date2;

                    date = Convert.ToDateTime(startDate);
                    date2 = Convert.ToDateTime(endDate);
                    date2 = date2.AddDays(1);

                    foreach (var branchId in branchs)
                    {
                        foreach (var item in product)
                        {
                            DiscountBranch discount = new DiscountBranch()
                            {
                                branchID = db.Branchs.Find(branchId).ID,
                                productID = db.Products.Find(item).ID,
                                CreateDate = DateTime.Now,
                                DiscountStartDate = date,
                                DiscountEndDate = date2,
                                discountID = discountID
                            };
                            db.discountBranches.Add(discount);
                            db.SaveChanges();
                        }
                    }
                    result = "İndirim Tanımlandı...";
                }
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}