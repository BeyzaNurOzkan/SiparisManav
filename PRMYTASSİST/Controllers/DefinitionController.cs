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
    public class DefinitionController : Controller
    {
        // GET: Definition
        REContext db = new REContext();
        public JsonResult GetProductGroup()
        {
            var productlist = new
            {
                data = from product in db.Products
                       where product.isDeleted == false
                       where product.ProductGroup3ID == 0
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name,
                           Code = product.ProductCode,
                           CreatedDate = product.CreateDate
                       }
            };

            return Json(productlist, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProducts(int id)
        {
            var orderProductList = new
            {
                data = from ProductGroup2ss in db.ProductGroup2s.Where(q => q.ID == id)
                       from ProductGroup3 in ProductGroup2ss.ProductGroups3.Where(q => q.ProductGroup2ID == ProductGroup2ss.ID).OrderBy(q => q.Name)
                       from product in db.Products.Where(q => q.ProductGroup3ID == ProductGroup3.ID)
                       //from unit in db.Units.Where(q => product.ProductCode == q.StockCode && q.UnitCode == 1).DefaultIfEmpty()
                       //from price in db.prices.Where(q => q.StockCode == product.ProductCode  /* && q.branchNo==branchId*/ ).Take(1).DefaultIfEmpty()
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           Code = product.ProductCode,
                           ProductUnitName = "Adet",
                           UnitFactor = "1",
                           UnitWeight = "1",
                           UnitPrices ="50" /* *unit.factor*/
                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult productCountTotal(int branchID)
        {

            var Total = (from o in db.Baskets.Where(q => q.UserID == branchID)
                         from t in db.BasketProducts.Where(q => q.BasketID == o.ID)
                         select t).Count();

            return Json(Total, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderCountByMonth()
        {
            int[] array = new int[13];
            for (int i = 1; i < 13; i++)
            {
                DateTime now = DateTime.Now;
                DateTime date = new DateTime(now.Year, i, 1);
                DateTime date2 = date.AddMonths(1);
                int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                array[i] = orderc;
            }
            var OrderList = new
            {
                mountcount0 = array[1],
                mountcount1 = array[2],
                mountcount2 = array[3],
                mountcount3 = array[4],
                mountcount4 = array[5],
                mountcount5 = array[6],
                mountcount6 = array[7],
                mountcount7 = array[8],
                mountcount8 = array[9],
                mountcount9 = array[10],
                mountcount10 = array[11],
                mountcount11 = array[12],
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderCountByWaiting()
        {
            int orderc = db.Orders.Where(q => q.ApprovalStatus == 0).Select(q => q.ID).Count();

            var OrderList = new
            {
                OrderCountW8 = orderc,
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderCountByQuarter()
        {
            int[] array = new int[13];
            for (int i = 1; i < 13; i++)
            {
                DateTime now = DateTime.Now;
                DateTime date = new DateTime(now.Year, i, 1);
                DateTime date2 = date.AddMonths(1);
                int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                array[i] = orderc;
            }
            var OrderList = new
            {
                quartercount0 = array[1] + array[2] + array[3],
                quartercount1 = array[4] + array[5] + array[6],
                quartercount2 = array[7] + array[8] + array[9],
                quartercount3 = array[10] + array[11] + array[12],

            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
    }
}