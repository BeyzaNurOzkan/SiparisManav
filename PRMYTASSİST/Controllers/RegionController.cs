 using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]
    public class RegionController : Controller
    {
        REContext db = new REContext();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetRegion()
        {
            var RegionList = new
            {
                data = from region in db.Regions
                       where region.IsDeleted == false
                       from branchs in db.Branchs.Where(q => q.RegionID == region.ID)
                       select new
                       {
                           Name = region.Name,
                           BranchName = branchs.BranchName.ToUpper(),
                           BranchCode = branchs.BranchCode
                       }
            };
            return Json(RegionList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult RegionDefinations()
        {
            return View();
        }
        public ActionResult BranchToRegions()
        {
            return View();
        }
        public ActionResult BranchToRegionsList()
        {
            return View();
        }
        public JsonResult GetBranchRegion()
        {
            var branchFormatList = new
            {
                data =
                       from regions in db.Regions
                       select new
                       {
                           ID = regions.ID,
                           Name = regions.Name,
                           Visible = regions.Visible,
                           CreatedDate = regions.CreateDate,
                       }
            };
            return Json(branchFormatList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EditBranchRegion(int id)
        {
            Region region = db.Regions.Find(id);
            var regionss = new
            {
                ID = region.ID,
                Name = region.Name,
                Visible = region.Visible,
            };
            return Json(regionss, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult UpdateRegionFormat(int regionID, bool isVisible, string RegionName)
        {
            string result = "";
            try
            {
                Region region = db.Regions.Find(regionID);
                region.Name = RegionName;
                region.Visible = isVisible;
                db.SaveChanges();
                result = "Bölge Durumu Güncellendi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteRegion(int id)
        {
            string result = "";
            try
            {
                Region region = db.Regions.Find(id);
                db.Regions.Remove(region);
                db.SaveChanges();
                int count = db.Branchs.Where(q => q.RegionID == id).Count();
                for (int i = 0; i < count; i++)
                {
                    Branch branch = db.Branchs.Where(q => q.RegionID == id).FirstOrDefault();
                    branch.RegionID = 0;
                    db.SaveChanges();
                }
                result = "Bölge Silindi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult InDontShowRegion(int id)
        {
            string result = "";
            try
            {
                Region region = db.Regions.Find(id);
                region.Visible = false;
                db.SaveChanges();
                result = "Bölge Durumu Pasif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InShowRegion(int id)
        {
            string result = "";
            try
            {
                Region region = db.Regions.Find(id);
                region.Visible = true;
                db.SaveChanges();
                result = "Bölge Durumu Aktif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult NewRegion(string RegionName)
        {
            Region region = new Region()
            {
                Name = RegionName,
                Visible = true,
                CreateDate = DateTime.Now,
                IsDeleted = false,
            };
            db.Regions.Add(region);
            db.SaveChanges();
            return RedirectToAction("RegionDefinations", "Region");
        }
        public JsonResult addBranchToRegion(int?[] branchs, int regionID)
        {
            string result = "";
            try
            {
                Region region = db.Regions.Find(regionID);
                if (branchs != null)
                {
                    foreach (var branchId in branchs)
                    {
                        db.Branchs.Find(branchId).Regions = region;
                        db.SaveChanges();
                    }
                }
                result = "Şube Bölgeye Atandı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
        public JsonResult deleteBranchToRegion(int?[] branchs, int regionID)
        {
            string result = "";
            try
            {
                if (branchs != null)
                {
                    foreach (var branchId in branchs)
                    {
                        Region region = db.Regions.Find(regionID);
                        Branch branch = db.Branchs.Find(branchId);
                        if (branch.Regions == region) { 
                            branch.Regions = null;
                            branch.RegionID = null;
                            db.SaveChanges();
                            }
                    }
                }
                result = "Şube Bölgesi Silindi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}