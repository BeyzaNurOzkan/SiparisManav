using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]
    public class GeneralSettingsController : Controller
    {
        // GET: GeneralSettings
        REContext db = new REContext();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PaletteSettings()
        {
            return View();
        }
        public ActionResult CompanyLogo()
        {
            return View();
        }
        public ActionResult OrderSettings()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetcoefficientByID(int coefficientID)
        {
            Settings settings = db.Settings.Where(q => q.SettingsCode == coefficientID).FirstOrDefault();
            var settingsVal = new
            {
                SettingsVal = settings.Value
            };
            return Json(settingsVal, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult CompanyLogoGet(int companyLogoCode, int compantNameCode)
        {
            string[] array = new string[2];

            Settings settingsLogo = db.Settings.Where(q => q.SettingsCode == companyLogoCode).FirstOrDefault();
            array[0] = settingsLogo.Value;

            Settings settingsCompanyName = db.Settings.Where(q => q.SettingsCode == compantNameCode).FirstOrDefault();
            array[1] = settingsCompanyName.Value;


            var settingsVal = new
            {
                companyLogo = array[0],
                companyName = array[1],

            };
            return Json(settingsVal, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult companyLogoLayout(int companyLogoCode)
        {
            Settings settings = db.Settings.Where(q => q.SettingsCode == companyLogoCode).FirstOrDefault();
            var settingsVal = new
            {
                SettingsVal = settings.Value
            };
            return Json(settingsVal, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult MakeCenterBranch(int branchId)
        {
            string result = "";
            try
            {
                var data = db.Branchs.ToList();


                foreach (var item in data)
                {
                    item.isMaster = false;
                }

                Branch branch = db.Branchs.Find(branchId);
                branch.isMaster = true;
                db.SaveChanges();
                result = "Şube Merkez Depo Olarak Ayarlandı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveCoefficientVal(int coefficientID, string coefficientVal)
        {
            string result = "";
            try
            {
                Settings settings = db.Settings.Where(q => q.SettingsCode == coefficientID).FirstOrDefault();
                settings.Value = coefficientVal;
                db.SaveChanges();
                result = "Palet Katsayısı Ayarlandı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult AddCompanyLogo(HttpPostedFileBase Image, string companyName)
        {
            int settingPhotoCode = 50598;
            int settingCompanyCode = 100798;
            if (Image != null)
            {
                Settings settings = db.Settings.Where(q => q.SettingsCode == settingPhotoCode).FirstOrDefault();
                settings.Value = ImageUploader.UploadSingleImage("/assets/media/logos/", Image);

            }

            Settings settingCompanyName = db.Settings.Where(q => q.SettingsCode == settingCompanyCode).FirstOrDefault();
            settingCompanyName.Value = companyName;

            db.SaveChanges();
            return RedirectToAction("CompanyLogo", "GeneralSettings");
        }

        public JsonResult getLayoutCompanyName(int compantNameCode)
        {
            string[] array = new string[1];
            Settings settingsCompanyName = db.Settings.Where(q => q.SettingsCode == compantNameCode).FirstOrDefault();
            array[0] = settingsCompanyName.Value;


            var settingsVal = new
            {
                companyName = array[0]
            };
            return Json(settingsVal, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult getOrderSettings()
        {
            int orderSetting = 7474;
            int orderSetting2 = 1313;
            int orderSetting3 = 7070;

            Settings settings = db.Settings.Where(q => q.SettingsCode == orderSetting).FirstOrDefault();
            Settings settings2 = db.Settings.Where(q => q.SettingsCode == orderSetting2).FirstOrDefault();
            Settings settings3 = db.Settings.Where(q => q.SettingsCode == orderSetting3).FirstOrDefault();

            var settingsVal = new
            {
                SettingsVal = settings.Value,
                SettingsVal2 = settings2.Value,
                SettingsVal3 = settings3.Value

            };
            return Json(settingsVal, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult SaveAllForOrderSettings(int settingsID, string OrderSettingsVal, int settingsID2, string OrderSettingsVal2, int settingsID3, string OrderSettingsVal3)
        {
            string result = "";
            try
            {
                Settings settings = db.Settings.Where(q => q.SettingsCode == settingsID).FirstOrDefault();
                settings.Value = OrderSettingsVal;
                Settings settings2 = db.Settings.Where(q => q.SettingsCode == settingsID2).FirstOrDefault();
                settings2.Value = OrderSettingsVal2;
                Settings settings3 = db.Settings.Where(q => q.SettingsCode == settingsID3).FirstOrDefault();
                settings3.Value = OrderSettingsVal3;
                db.SaveChanges();
                result = "Sipariş Seçeneği Ayarlandı...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}