 using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PRMYTASSİST.Controllers
{
    public class CurrentController : Controller
    {
        REContext db = new REContext();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetAccount(int CurrentID)
        {
            CurrentAccountModel currentAccount = db.currentAccounts.Find(CurrentID);
            var Current = new
            {
                
                ID = currentAccount.ID,
                Title1 = currentAccount.title1,
                //GroupPhoto = group3.Photo,
                Title2 = currentAccount.title2,
                CreateDate = currentAccount.CreateDate.ToString("yyyy-MM-dd")
            };

            return Json(Current, JsonRequestBehavior.AllowGet);
        
    }
       
    }
}