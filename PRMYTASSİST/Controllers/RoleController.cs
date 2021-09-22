 using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PRMYTASSİST.Controllers
{
    public class RoleController : Controller
    {
        REContext db = new REContext();

        public ActionResult Index()
        {
            return View();
        }
        public JsonResult GetRoles()
        {
            var RoleList = new
            {
                data = from role in db.Roles
                       where role.isDeleted == false
                       select new
                       {
                           ID = role.ID,
                           Name = role.Name.ToUpper(),
                           CreateDate = role.CreateDate,
                           Visible = role.Visible,
                           isDeleted = role.isDeleted

                       }
            };
            return Json(RoleList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult UserToRole(int RoleId, int userId)
        {
            User users = db.Users.Find(userId);
            Role role = db.Roles.Find(RoleId);
            users.Roles = role;
            users.RoleID = RoleId;
            db.SaveChanges();
            return View();

        }
        public ActionResult AddRole(string RoleName)
        {
            Role roles = new Role()
            {
                Name = RoleName,
                CreateDate = DateTime.Now,
                isDeleted = false,
                Visible = true
            };
            db.Roles.Add(roles);
            db.SaveChanges();

            return RedirectToAction("RoleEdit", "User");
        }
        public ActionResult UpdateRole(int ID, string RoleName)
        {

            Role role = db.Roles.Find(ID);
            role.Name = RoleName;
            db.SaveChanges();
            return RedirectToAction("RoleEdit", "User");
        }

        [HttpPost]
        public JsonResult EditRoles(int id)
        {
            Role role = db.Roles.Find(id);
            var usr = new
            {
                ID = role.ID,
                Name = role.Name,
                CreatedDate = role.CreateDate,
                isDeleted = role.isDeleted,
                Visible = role.Visible
            };

            return Json(usr, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InDontShowRoles(int ID)
        {
            string result = "";
            try
            {
                Role role = db.Roles.Find(ID);
                role.Visible = false;
                db.SaveChanges();
                result = "Kullanıcı Durumu Pasif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InShowRoles(int ID)
        {
            string result = "";
            try
            {
                Role role = db.Roles.Find(ID);
                role.Visible = true;
                db.SaveChanges();
                result = "Kullanıcı Durumu Aktif...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult DeleteRoles(int ID)
        {
            string result = "";
            try
            {
                Role role = db.Roles.Find(ID);
                role.isDeleted = true;
                db.SaveChanges();
                result = "Kullanıcı Silindi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

    }
}