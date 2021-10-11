 using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class UserController : Controller
    {
        REContext db = new REContext();
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult RoleEdit()
        {
            return View();
        }

        public JsonResult GetUsers()
        {
            var userList = new
            {
                data = from user in db.Users.Where(q => q.isDeleted == false && q.Visible == true)
                       from role in db.Roles.Where(q => q.ID == user.RoleID)
                       from branch in db.Branchs.Where(q => q.ID == user.CurrentBranch)

                       select new
                       {
                           ID = user.ID,
                           FullName = (user.FirstName + " " + user.LastName).ToUpper(),
                           EMail = user.EMail,
                           Password = user.Password,
                           ProfilePhoto = user.ProfilePhoto,
                           Visible = user.Visible,
                           isDeleted = user.isDeleted,
                           LastUpdateUser = user.LastUpdateUserID,
                           LastUpdateDate = user.LastUpdateDate,
                           CreateDate = user.CreateDate,
                           CreateUser = user.CreateUserID,
                           IsCenter = user.isCenter,
                           BranchName = branch.BranchName.ToUpper(),
                           UserRole = role.Name.ToUpper()
                       }
            };
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult EditUser(int id)
        {

            User user = db.Users.Find(id);
            Role role = db.Roles.Where(q => q.ID == user.RoleID).First();
            Branch[] branch = new Branch[1];
            branch[0] = db.Branchs.Where(q => q.ID == user.CurrentBranch).FirstOrDefault();
            var usr = new
            {
                ID = user.ID,
                Name = user.FirstName,
                LastName = user.LastName,
                UserCountName = user.EMail,
                Password = user.Password,
                UserPhoto = user.ProfilePhoto,
                Visible = user.Visible,
                isDeleted = user.isDeleted,
                LastUpdateUser = db.Users.Find(user.LastUpdateUserID).FirstName + " " + db.Users.Find(user.LastUpdateUserID).LastName,
                LastUpdateDate = user.LastUpdateDate.ToString("dd.MM.yyyy hh:mm"),
                CreateDate = user.CreateDate.ToString("dd.MM.yyyy hh:mm"),
                CreateUser = db.Users.Find(user.CreateUserID).FirstName + " " + db.Users.Find(user.CreateUserID).LastName,
                UserRole = role.Name.ToUpper(),
                Branches = branch[0].BranchName.ToUpper(),
                CurrentBranch = user.CurrentBranch,
                RoleID = role.ID
            };

            return Json(usr, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult InDontShow(int id)
        {
            string result = "";
            try
            {
                User tmpUser = db.Users.Find(id);
                tmpUser.Visible = false;
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
        public JsonResult InShow(int id)
        {
            string result = "";
            try
            {
                User tmpUser = db.Users.Find(id);
                tmpUser.Visible = true;
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
        public JsonResult DeleteUser(int id)
        {
            string result = "";
            try
            {
                User tmpUser = db.Users.Find(id);
                tmpUser.isDeleted = true;
                db.SaveChanges();
                result = "Kullanıcı Silindi...";
            }
            catch (Exception)
            {
                result = "Bir hata ile karşılaşıldı.";
            }
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateProfile(User user, int currentUser, int userForBranchSelect1, int userForRoleSelect1)
        {

            Role role = db.Roles.Find(userForRoleSelect1);
            Branch branch = db.Branchs.Find(userForBranchSelect1);
            User tmpUser = db.Users.Find(user.ID);
            tmpUser.FirstName = user.FirstName;
            tmpUser.LastName = user.LastName;
            tmpUser.EMail = user.EMail;
            tmpUser.Password = user.Password;
            tmpUser.LastUpdateDate = DateTime.Now;
            tmpUser.LastUpdateUserID = currentUser;

            tmpUser.CurrentBranch = (userForBranchSelect1);
            int a = tmpUser.Branches.Where(q => q.ID == userForBranchSelect1).Count();
            if (a == 0)
            {
                tmpUser.Branches.Add(branch);
            }


            tmpUser.Roles = role;
            tmpUser.RoleID = (userForRoleSelect1);

            db.SaveChanges();
            return RedirectToAction("Index", "User");
        }

        public ActionResult NewProfile(User user, int currentUser, int userForBranchSelect1, int userForRoleSelect1)
        {
            Role role = db.Roles.Find(userForRoleSelect1);
            User users = db.Users.Where(q => q.EMail == user.EMail).FirstOrDefault();

            Branch[] branch = new Branch[1];
            branch[0] = db.Branchs.Find(userForBranchSelect1);
            if (users == null)
            {
                User tmpUser = new User()
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    ProfilePhoto = "//",
                    EMail = user.EMail,
                    Password = user.Password,
                    CreateDate = DateTime.Now,
                    CreateUserID = currentUser,
                    LastLoginDate = DateTime.Now,
                    LastUpdateDate = DateTime.Now,
                    LastUpdateUserID = currentUser,
                    Roles = role,
                    RoleID = (userForRoleSelect1),
                    CurrentBranch = (userForBranchSelect1),
                    Branches = branch,
                    Visible = true
                };
                db.Users.Add(tmpUser);
                db.SaveChanges();
            }
            else
            {
                // resultı yolla mustafa burdan actionresultta nasıl bilmiyom jkxgfd
            }
            return RedirectToAction("Index", "User");
        }
    }
}