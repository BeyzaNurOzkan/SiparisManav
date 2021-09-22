 using Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    public class NotificationController : Controller
    {
        REContext db = new Entity.REContext();

        // GET: Notification
        public ActionResult Index()
        {
            return View();
        }
        public void NotificationSendTotal(int?[] orderid, int userId)
        {
            foreach (var orders in orderid)
            {
                Order order = db.Orders.Find(orders);
                string message = "";
                if (order.ApprovalStatus == 1)
                    message = " Onaylandı..";
                if (order.ApprovalStatus == 0)
                    message = " Beklemeye Alındı..";
                if (order.ApprovalStatus == 2)
                    message = " Reddedildi..";
                Notification notification = new Notification()
                {
                    SendUser = db.Users.Find(userId),
                    Content = order.OrderNo.ToString() + " Nolu Siparişiniz " + db.Users.Find(userId).FirstName.ToUpper() + " " + db.Users.Find(userId).LastName.ToUpper() + " Tarafından" + message,
                    lastNotificationTime = DateTime.Now,
                    CreateDate = DateTime.Now,
                    Control2 = order.OrderNo,
                    ComeUser = db.Users.Find(order.userID),
                    Control = order.ApprovalStatus,
                };
                db.Notifications.Add(notification);
                db.SaveChanges();
            }
            
        }

        public void NotificationSend(int orderid, int userId)
        {
            Order order = db.Orders.Find(orderid);
            string message = "";
            if (order.ApprovalStatus == 1)
                message = " Onaylandı..";
            if (order.ApprovalStatus == 0)
                message = " Beklemeye Alındı..";
            if (order.ApprovalStatus == 2)
                message = " Reddedildi..";
            Notification notification = new Notification()
            {
                SendUser = db.Users.Find(userId),
                Content = order.OrderNo.ToString() + " Nolu Siparişiniz "+ db.Users.Find(userId).FirstName.ToUpper()+" "+ db.Users.Find(userId).LastName.ToUpper()+ " Tarafından" + message,
                lastNotificationTime = DateTime.Now,
                CreateDate = DateTime.Now,
                Control2 = order.OrderNo,
                ComeUser = db.Users.Find(order.userID),
                Control = order.ApprovalStatus,
            };
            db.Notifications.Add(notification);
            db.SaveChanges();
        }
        public void NotificationRead(int userId)
        {
            int count = db.Notifications.Where(q => q.ComeUser.ID == userId && q.isRead == false).Count();
            for (int i = 0; i < count; i++)
            {
                Notification notification = db.Notifications.Where(q => q.ComeUser.ID == userId && q.isRead == false).FirstOrDefault();
                notification.isRead = true;
                db.SaveChanges();
            }
        }
      
        public JsonResult LayoutNotificationList(int id)
        {
            DateTime date = DateTime.Now;
            var list = new
            {
                data = from Notification in db.Notifications.Where(q => q.ComeUser.ID == id)
                       from order in db.Orders.Where(q => q.OrderNo == Notification.Control2)
                       select new
                       {
                           ID = Notification.ID,
                           Content = Notification.Content,
                           lastNotTime = Notification.lastNotificationTime,
                           time = (DbFunctions.DiffDays(Notification.lastNotificationTime, DateTime.Now)).ToString(),
                           Hour = Notification.lastNotificationTime.Hour.ToString(),
                           Minute = Notification.lastNotificationTime.Minute.ToString(),
                           Control = Notification.Control,
                           OrderID = order.ID,
                           notReadCount = db.Notifications.Where(q => q.ComeUser.ID == id && q.isRead == false).Count(),
                       }
            };
            var c = list.data.OrderByDescending(q => q.lastNotTime);
            foreach (var item in c)
            {
                string a = item.time;
                string b = item.Hour;
                string n = item.Minute;
            }
            return Json(c, JsonRequestBehavior.AllowGet);
        }
    }
}