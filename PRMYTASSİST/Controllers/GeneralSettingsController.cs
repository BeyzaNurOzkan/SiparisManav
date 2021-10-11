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
    }
}