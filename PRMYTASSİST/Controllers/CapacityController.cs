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

    public class CapacityController : Controller
    {
        REContext db = new Entity.REContext();

        // GET: Center
        public ActionResult StateOrderList()
        {
            return View();
        }
        public ActionResult StateOrderListView()
        {
            return View();
        }

        public JsonResult getCapacity(int groupId, int branchFormatID)
        {
            var Capacity = new
            {
                data =
                       from Group in db.ProductGroups.Where(q => q.ID == groupId)
                       from Group2 in Group.ProductGroup2s
                       from Group3 in Group2.ProductGroups3.OrderBy(q => q.Name)
                       from branchsFormat in db.branchFormats.Where(q => q.ID == branchFormatID)
                       from quantityFormat in db.quantityFormats.Where(q => q.FormatID == branchsFormat.ID)
                       from product in db.Products.Where(q => q.ProductCode == quantityFormat.StockCode && q.ProductGroup3ID == Group3.ID && q.Visible==false)
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barkode in db.barcodeModels.Where(q => q.StockCode == product.ProductCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()
                       select new
                       {
                           ID = quantityFormat.ID,
                           ProductGroup = Group2.Name.ToUpper(),
                           Code = barkode.Code,
                           Name = product.Name.ToUpper(),
                           ProductUnitName = unit.Name.ToUpper(),
                           OrderCount = 1,
                           Capacity = quantityFormat.Capacity,
                       }
            };

            return Json(Capacity, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddCapacity(int maxCapacity, int minCapacity, int ProductID, int branchID)
        {
            Product product = db.Products.Find(ProductID);
            Branch branch = db.Branchs.Find(branchID);
            QuantityModel quantity = db.quantityModels.Where(q => q.StockCode == product.ProductCode && q.BranchCode == branch.BranchCode).First();
            quantity.MaxCapacity = maxCapacity;
            quantity.MinCapacity = minCapacity;
            db.SaveChanges();
            return View();
        }
        public JsonResult ForSave(int id, int capacity)
        {
            bool result = false;
            try
            {
                QuantityFormat quantity = db.quantityFormats.Find(id);
                quantity.Capacity = capacity;
                db.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                result = false;
                throw;
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}