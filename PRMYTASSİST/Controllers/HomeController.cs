 using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entity;
using Z.BulkOperations;


namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class HomeController : Controller
    {
        REContext db = new Entity.REContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        public JsonResult GetProduct()
        {
            var productList = new
            {
                data = from product in db.Products
                       where product.isDeleted == false
                       where product.Visible == true
                       orderby product.LastUpdateDate
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name,
                           ProductCode = product.ProductCode,
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
                           PlaceCode = product.PlaceCode
                       }
            };
            return Json(productList, JsonRequestBehavior.AllowGet);
        }
    }
}