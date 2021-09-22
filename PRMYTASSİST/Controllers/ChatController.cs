 using Entity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class ChatController : Controller
    {
        // GET: Chat
        REContext db = new Entity.REContext();

        public ActionResult MyChats()
        {
            return View();
        }

        User LoginUsers = null;

        int LoginUserID = -1;
        bool LoggedOut()
        {
            if (Session["currentUsers"] != null)
            {
                LoginUsers = Session["currentUsers"] as User;
                LoginUserID = LoginUsers.ID;
                ViewBag.OwnerID = LoginUsers;
                ViewBag.LoginEmail = LoginUsers.EMail;
                return false;
            }
            return true;
        }
        public JsonResult GetOnlineUserList(int id)
        {
            DateTime date = DateTime.Now;
            var list = new
            {
                data = from user in db.Users.Where(q => q.IsOnline == true && q.Visible == true && q.isDeleted == false && (DbFunctions.DiffHours(q.LastLoginDate, DateTime.Now) < 2)).OrderBy(x => x.FirstName).ToList()
                       select new
                       {
                           ID = user.ID,
                           UserName = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                           UserRole = user.Roles.Name.ToUpper(),
                           UserBranch = from branch in db.Branchs.Where(q => q.ID == user.CurrentBranch)
                                        select branch.BranchName.ToUpper(),
                           UserCount = (from users in db.Users
                                        select users).Count(),
                           UserNameFirst = user.FirstName.Substring(0, 1).ToUpper(),
                           dot = user.IsOnline,
                           LoginDate = user.LastLoginDate,
                           Order=user.Roles.priority
                       }
            };
            var OrderList = list.data.OrderByDescending(q => q.Order).ThenByDescending(q=>q.LoginDate);
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUSerChatList(int id)
        {
            DateTime date = DateTime.Now;
            var list = new
            {
                data = from user in db.Users.Where(q => q.ID != id && q.Visible == true && q.isDeleted == false)
                       from chatlist in db.Chats.Where(x => (x.User.ID == id || x.User2.ID == id) && (x.User.ID == user.ID || x.User2.ID == user.ID)).OrderByDescending(x => x.lastMessageTime).ToList().DefaultIfEmpty()
                       from chatden in db.Chats.Where(q => q.ID == chatlist.ID && q.User.ID == id).DefaultIfEmpty()
                       from chatdens in db.Chats.Where(q => q.ID == chatlist.ID && q.User2.ID == id).DefaultIfEmpty()
                       from user2 in db.Users.Where(q => q.ID == chatdens.User.ID || q.ID == chatden.User2.ID || q.ID == user.ID)
                       select new
                       {

                           ID = user2.ID,
                           Message = (from message in db.Messages.Where(x => x.Chat.ID == chatlist.ID).OrderByDescending(x => x.Date).Take(1).DefaultIfEmpty()
                                      select message.Nessage),
                           MessageCount = db.Messages.Where(q => q.Chat.ID == chatlist.ID).Count(),
                           UserName = user2.FirstName.ToUpper() + " " + user2.LastName.ToUpper(),
                           dontshow = ((from message2 in db.Messages.Where(x => x.Chat.ID == chatlist.ID && x.User.ID != id && x.isRead == false)
                                        select message2).Count()).ToString(),
                           lastmessagetime = (chatlist.lastMessageTime).ToString(),
                           time = (DbFunctions.DiffDays(chatlist.lastMessageTime, DateTime.Now)).ToString(),
                           Hour = chatlist.lastMessageTime.Hour.ToString(),
                           Minute = chatlist.lastMessageTime.Minute.ToString(),
                           UserNameFirst = user2.FirstName.ToUpper().Substring(0, 1),
                           dot =
                                 (from userx in db.Users.Where(q => q.ID == user2.ID)
                                  where DbFunctions.DiffHours(userx.LastLoginDate, DateTime.Now) < 2
                                  select userx.IsOnline).FirstOrDefault(),

                       }
            };
            var c = list.data.OrderByDescending(q => q.lastmessagetime ).ThenByDescending(q=>q.dot).ThenBy(q=>q.UserName);
            foreach (var item in list.data)
            {
                bool a = item.dot;
            }
            return Json(c, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserForChat(int id)
        {
            DateTime date = DateTime.Now;

            var userList = new
            {
                data =
                       from chatlist in db.Chats.Where(q => q.User.ID == id || q.User2.ID == id).OrderByDescending(x => x.lastMessageTime)
                       from message in db.Messages.Where(q => q.Chat.ID == chatlist.ID && q.User.ID != id).Select(z => z.User.ID).Distinct()
                       from user in db.Users.Where(q => q.ID == message).ToList()
                       select new
                       {

                           ID = user.ID,
                           Name = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                           NameSub = user.FirstName.Substring(0, 1).ToUpper(),
                           dontshow = ((
                                        from message2 in db.Messages.Where(x => x.Chat.ID == chatlist.ID && x.User.ID != id && !x.isRead)
                                        select message2).Count()).ToString(),
                           time = 5,
                           Hour = chatlist.lastMessageTime.Hour,
                           Minute = chatlist.lastMessageTime.Minute,
                           dot = (from chatden in db.Chats.Where(q => q.ID == chatlist.ID && q.User.ID == id).DefaultIfEmpty()
                                  from chatdens in db.Chats.Where(q => q.ID == chatlist.ID && q.User2.ID == id).DefaultIfEmpty()
                                  from users in db.Users.Where(q => q.ID == chatdens.User.ID || q.ID == chatden.User2.ID)
                                  where DbFunctions.DiffHours(users.LastLoginDate, DateTime.Now) < 2
                                  select users.IsOnline),
                       }
            };
            foreach (var item in userList.data)
            {
                string aasda = item.dot.ToString();
            }
            return Json(userList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ChatSendMessage(int UserID, int ChatID, int MyID, string Message)
        {
            if (ChatID == 0)
            {
                Chat chat1 = new Chat()
                {
                    CreateDate = DateTime.Now,
                    lastMessageTime = DateTime.Now,
                    chatSubject = "sohbet",
                    User = db.Users.Find(UserID),
                    User2 = db.Users.Find(MyID)
                };
                db.Chats.Add(chat1);
                db.SaveChanges();
                ChatID = chat1.ID;
            }
            Chat chat = db.Chats.Find(ChatID);
            User user = db.Users.Find(MyID);

            Message message = new Message()
            {
                Chat = chat,
                User = user,
                isRead = false,
                Nessage = Message,
                Date = DateTime.Now,
                fromUser = false,
                CreateDate = DateTime.Now,
            };
            chat.lastMessageTime = DateTime.Now;
            db.Messages.Add(message);
            db.SaveChanges();
            return Json(UserID, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ChatUserBodyChange(int UserID, int MyID)
        {

            Chat chat = db.Chats.Where(q => (q.User.ID == MyID && q.User2.ID == UserID) || (q.User2.ID == MyID && q.User.ID == UserID)).FirstOrDefault();


            if (chat != null)
            {
                int count = db.Messages.Where(x => x.Chat.ID == chat.ID && x.User.ID == UserID && x.isRead == false).Count();
                for (int i = 0; i < count; i++)
                {
                    Message message6 = db.Messages.Where(x => x.Chat.ID == chat.ID && x.User.ID == UserID && x.isRead == false).FirstOrDefault();
                    message6.isRead = true;
                    db.SaveChanges();
                }
                DateTime date = DateTime.Now;
                var userList = new
                {
                    data =
                           from message in db.Messages.Where(q => q.Chat.ID == (db.Chats.Where(y => (y.User.ID == MyID && y.User2.ID == UserID) || (y.User2.ID == MyID && y.User.ID == UserID))).Select(z => z.ID).FirstOrDefault()).OrderBy(q => q.CreateDate).ToList()
                           select new
                           {
                               ID = message.User.ID,
                               ChatID = message.Chat.ID,
                               Name = message.User.FirstName.ToUpper() + " " + message.User.LastName.ToUpper(),
                               NameUser = from user in db.Users.Where(q => q.ID == UserID)
                                          select user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                               NameSub = message.User.FirstName.Substring(0, 1).ToUpper(),
                               Message = message.Nessage,
                               MessageCount = ((from message2 in db.Messages.Where(x => x.Chat.ID == message.Chat.ID)
                                                select message2).Count()).ToString(),
                               dontshow = ((
                                            from message2 in db.Messages.Where(x => x.Chat.ID == message.Chat.ID && !x.isRead)
                                            select message2).Count()).ToString(),
                               time = (date - message.CreateDate).TotalDays,
                               Hour = (date - message.CreateDate).TotalHours,
                               Minute = (date - message.CreateDate).TotalMinutes,
                               dot = (from users in db.Users.Where(q => q.ID == UserID)
                                      where DbFunctions.DiffHours(users.LastLoginDate, DateTime.Now) < 2
                                      select users.IsOnline),
                               userID = UserID,
                               MyID = MyID,
                           }
                };
                return Json(userList, JsonRequestBehavior.AllowGet);
            }
            else
            {
                var userList = new
                {
                    data =
                           from user in db.Users.Where(q => q.ID == UserID)
                           select new
                           {
                               ID = user.ID,
                               Name = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                               NameUser = user.FirstName.ToUpper() + " " + user.LastName.ToUpper(),
                               NameSub = user.FirstName.Substring(0, 1).ToUpper(),
                               dontshow = "0",
                               time = 0,
                               Hour = 0,
                               Minute = 0,
                               dot = (from users in db.Users.Where(q => q.ID == UserID)
                                      where DbFunctions.DiffHours(users.LastLoginDate, DateTime.Now) < 2
                                      select users.IsOnline),
                               userID = UserID,
                               MyID = MyID,
                           }
                };
                return Json(userList, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult NewMessages()
        {
            if (LoggedOut())
                return RedirectToAction("login", "account");

            int i = 0;
            string kullaniciListesi = "";
            foreach (var item in db.Users)
            {
                if (i % 2 == 0)
                    ViewBag.Kullanicilar +=
                        "<div class='row mr-2 ml-2'>";
                string veri =
                    "<div class='col-md-6 mb-3'>" +
                        "<div class='kullanici' id='t" + item.ID + "'  >" +
                            "<img src='/assets/img/new_logo.png' />" +
                            "<h4>" + item.FirstName + " " + item.LastName + "</h4>" +
                        "</div>" +
                    "</div>";
                kullaniciListesi += (kullaniciListesi == "" ? "" : ",") + "[\"" + item.FirstName + " " + item.LastName + "\",\"" + veri + "\"]";
                ViewBag.Kullanicilar += veri;

                if (i % 2 != 0)
                    ViewBag.Kullanicilar +=
                         "</div>";
                i++;
            }

            ViewBag.kullaniciListesi = kullaniciListesi;
            return View();
        }

        //[Route("chat/chat/{chatId}")]
        //public ActionResult chat(int chatId)
        //{
        //    if (LoggedOut())
        //        return RedirectToAction("login", "account");

        //    Chat chat = db.Chats.FirstOrDefault(x => x.ID == chatId && x.User.ID == LoginUserID);
        //    if (chat == null)
        //        return RedirectToAction("sohbetlerim", "chat");

        //    ViewBag.Title = (oturumAcanOgrenciMi ? chat.Teacher.FirstName : chat.Student.FirstName) + " ile sohbet.";
        //    ViewBag.guncelChatId = chat.ID;

        //    Message[] mesajlar = context.Messages.Where(x => x.Student.ID == chat.Student.ID && x.Teacher.ID == chat.Teacher.ID && x.Chat.chatSubject == chat.chatSubject).ToArray();
        //    foreach (var item in mesajlar)
        //    {
        //        if (oturumAcanOgrenciMi ? (item.Student.ID == oturumAcanID && item.fromStudent) : (item.Teacher.ID == oturumAcanID && !item.fromStudent))
        //            item.isRead = true;
        //        string yon = oturumAcanOgrenciMi ? item.fromStudent ? "giden" : "gelen" : item.fromStudent ? "gelen" : "giden",
        //            mesaj = item.message,
        //            zaman = "";
        //        if (item.date.ToString("ddMMyyyy") == DateTime.Now.ToString("ddMMyyyy"))
        //        {
        //            zaman = item.date.ToString("HH:mm");
        //        }
        //        else if (item.date.ToString("ddMMyyyy") == DateTime.Now.AddDays(-1).ToString("ddMMyyyy"))
        //        {
        //            zaman = "Dün " + item.date.ToString("HH:mm");
        //        }
        //        else
        //        {
        //            zaman = item.date.ToString("dd.MM.yy HH:mm");
        //        }
        //        ViewBag.mesajlar +=
        //            "<div class='col-md-12 " + (yon == "gelen" ? "sol" : "sag") + "'>" +
        //                "<div class='mesajKutusu " + yon + "'>" +
        //                    mesaj +
        //                    "<i>" + zaman + "</i>" +
        //                "</div>" +
        //            "</div>";
        //    }
        //    context.SaveChanges();
        //    ViewBag.sohbetId = chat.ID;

        //    return View();
        //}

        //[Route("chat/sohbetOlustur/{kullanici}-{sohbetKonusu}")]
        //public ActionResult sohbetOlustur(string sohbetKonusu, string kullanici)
        //{
        //    if (LoggedOut())
        //        return RedirectToAction("login", "account");

        //    if (kullanici.Length < 2)
        //        return RedirectToAction("sohbetlerim", "chat");

        //    if (!int.TryParse(kullanici.Substring(1), out int kullaniciID))
        //        return RedirectToAction("sohbetlerim", "chat");

        //    string kullaniciTipi = kullanici.Substring(0, 1);
        //    if (!(kullaniciTipi == "s" || kullaniciTipi == "t"))
        //        return RedirectToAction("sohbetlerim", "chat");


        //    if ((kullaniciTipi == "s" && oturumAcanOgrenciMi) || (kullaniciTipi == "t" && !oturumAcanOgrenciMi))
        //        return RedirectToAction("sohbetlerim", "chat");

        //    Teacher chatOgretmen = oturumAcanOgrenciMi ? context.Teachers.FirstOrDefault(x => x.ID == kullaniciID) : oturumAcanOgretmen;
        //    Student chatOgrenci = !oturumAcanOgrenciMi ? context.Students.FirstOrDefault(x => x.ID == kullaniciID) : oturumAcanOgrenci;

        //    if ((!oturumAcanOgrenciMi && chatOgrenci == null) || (chatOgretmen == null && oturumAcanOgrenciMi))
        //        return RedirectToAction("sohbetlerim", "chat");


        //    Chat[] sohbetList = context.Chats.Where(x => oturumAcanOgrenciMi ? x.Teacher.ID == chatOgretmen.ID && x.Student.ID == oturumAcanID : x.Student.ID == chatOgrenci.ID && x.Teacher.ID == oturumAcanID).ToArray();

        //    Chat myChat = null;
        //    Chat chat = null;

        //    if (sohbetList.Length > 0)
        //    {
        //        foreach (var item in sohbetList)
        //        {
        //            if (item.chatSubject.ToLower() == sohbetKonusu.ToLower())
        //            {
        //                if (item.ownerIsStudent == oturumAcanOgrenciMi)
        //                    myChat = item;
        //                else
        //                    chat = item;
        //            }
        //        }
        //    }

        //    if (myChat == null)
        //    {
        //        myChat = new Chat();
        //        myChat.Student = oturumAcanOgrenciMi ? context.Students.FirstOrDefault(x => x.ID == oturumAcanOgrenci.ID) : chatOgrenci;
        //        myChat.Teacher = !oturumAcanOgrenciMi ? context.Teachers.FirstOrDefault(x => x.ID == oturumAcanOgretmen.ID) : chatOgretmen;
        //        myChat.lastMessageTime = DateTime.Now;
        //        myChat.ownerIsStudent = oturumAcanOgrenciMi;
        //        myChat.chatSubject = sohbetKonusu;
        //    }
        //    if (chat == null)
        //    {
        //        chat = new Chat();
        //        chat.Student = oturumAcanOgrenciMi ? context.Students.FirstOrDefault(x => x.ID == oturumAcanOgrenci.ID) : chatOgrenci;
        //        chat.Teacher = !oturumAcanOgrenciMi ? context.Teachers.FirstOrDefault(x => x.ID == oturumAcanOgretmen.ID) : chatOgretmen;
        //        chat.lastMessageTime = DateTime.Now;
        //        chat.ownerIsStudent = !oturumAcanOgrenciMi;
        //        chat.chatSubject = sohbetKonusu;
        //    }

        //    context.Chats.Add(chat);
        //    context.Chats.Add(myChat);
        //    context.SaveChanges();


        //    return Redirect("/chat/chat/" + myChat.ID);
        //}

        //[Route("chat/chatSil/{chatID}")]
        //public ActionResult chatSil(int chatID)
        //{
        //    if (LoggedOut())
        //        return RedirectToAction("login", "account");

        //    Chat chat = context.Chats.FirstOrDefault(x => x.ID == chatID && (oturumAcanOgrenciMi ? x.ownerIsStudent && x.Student.ID == oturumAcanID : !x.ownerIsStudent && x.Teacher.ID == oturumAcanID));
        //    if (chat != null)
        //    {
        //        context.Messages.RemoveRange(context.Messages.Where(x => x.Chat.ID == chat.ID));
        //        context.Chats.Remove(chat);
        //        context.SaveChanges();
        //    }
        //    return RedirectToAction("sohbetlerim", "chat");
        //}

        //[Route("chat/mesajSil/{mesajID}")]
        //public ActionResult mesajSil(int mesajID)
        //{
        //    if (LoggedOut())
        //        return RedirectToAction("login", "account");

        //    Message mesaj = context.Messages.FirstOrDefault(x => x.ID == mesajID && (oturumAcanOgrenciMi ? x.Chat.ownerIsStudent && x.Chat.Student.ID == oturumAcanID : !x.Chat.ownerIsStudent && x.Chat.Teacher.ID == oturumAcanID));
        //    if (mesaj != null)
        //    {
        //        context.Messages.Remove(mesaj);
        //        context.SaveChanges();
        //        return Redirect("/chat/chat/" + mesaj.Chat.ID);
        //    }
        //    return Redirect("/chat/sohbetlerim");
        //}

        //public async Task<ActionResult> MesajGonder(string[] veri)
        //{
        //    if (LoggedOut())
        //        return RedirectToAction("login", "account");

        //    var options = new PusherOptions
        //    {
        //        Cluster = "eu",
        //        Encrypted = true
        //    };

        //    var pusher = new Pusher(
        //      "1130001",
        //      "9c428fba897224950404",
        //      "308302a31c69a0305f3c",
        //      options);
        //    if (veri == null)
        //    {
        //        var sonuc2 = await pusher.TriggerAsync(
        //            oturumAcanOgrenciMi ? oturumAcanOgrenci.Email :
        //          oturumAcanOgretmen.Email,
        //          "hata",
        //          new { mesaj = "Veri alınırken hata oluştu." });
        //    }
        //    else
        //    {
        //        if (veri.Length != 3)
        //        {
        //            var sonuc2 = await pusher.TriggerAsync(
        //            oturumAcanOgrenciMi ? oturumAcanOgrenci.Email :
        //          oturumAcanOgretmen.Email,
        //              "hata",
        //              new { mesaj = "Veri alınırken hata oluştu." });

        //            return new HttpStatusCodeResult((int)HttpStatusCode.OK);
        //        }
        //    }

        //    string mesaj = veri[0];
        //    int sahipId = Convert.ToInt32(veri[1]);
        //    int sohbetId = Convert.ToInt32(veri[2]);

        //    Chat chatSahip = null;
        //    Chat chatKonusulan = null;

        //    Chat temp = context.Chats.FirstOrDefault(x => x.ID == sohbetId);

        //    if (temp == null)
        //        return null;

        //    if (oturumAcanOgrenciMi ? temp.ownerIsStudent : !temp.ownerIsStudent)
        //    {
        //        chatSahip = temp;
        //        chatKonusulan = context.Chats.FirstOrDefault(x => x.Student.ID == chatSahip.Student.ID && x.Teacher.ID == chatSahip.Teacher.ID && x.ownerIsStudent != chatSahip.ownerIsStudent && x.chatSubject == chatSahip.chatSubject);
        //    }
        //    else
        //    {
        //        chatKonusulan = temp;
        //        chatSahip = context.Chats.FirstOrDefault(x => x.Student.ID == chatKonusulan.Student.ID && x.Teacher.ID == chatKonusulan.Teacher.ID && x.ownerIsStudent != chatKonusulan.ownerIsStudent && x.chatSubject == chatKonusulan.chatSubject);
        //    }


        //    Message chatMesajSahip = new Message();
        //    chatMesajSahip.Student = chatSahip.Student;
        //    chatMesajSahip.Teacher = chatSahip.Teacher;
        //    chatMesajSahip.date = DateTime.Now;
        //    chatMesajSahip.message = mesaj;
        //    chatMesajSahip.Chat = chatSahip;
        //    chatMesajSahip.fromStudent = oturumAcanOgrenciMi;


        //    if ((oturumAcanOgrenciMi ? chatSahip.Student.ID : chatSahip.Teacher.ID) == sahipId)
        //    {
        //        Message[] mesajList = context.Messages.Where(x => (oturumAcanOgrenciMi ? !x.fromStudent : x.fromStudent) && (oturumAcanOgrenciMi ? chatSahip.Student.ID : chatSahip.Teacher.ID) == sahipId && x.Chat.ID == chatSahip.ID && !x.isRead).ToArray();
        //        foreach (var item in mesajList)
        //            item.isRead = true;

        //    }



        //    if (chatKonusulan == null)
        //    {
        //        chatKonusulan = chatSahip;
        //        chatKonusulan.ownerIsStudent = !chatSahip.ownerIsStudent;
        //        context.Chats.Add(chatKonusulan);
        //        context.SaveChanges();
        //    }

        //    Message chatMesajKonusulan = new Message();
        //    chatMesajKonusulan = chatMesajSahip;
        //    chatMesajKonusulan.Chat = chatKonusulan;
        //    context.Messages.Add(chatMesajSahip);
        //    context.Messages.Add(chatMesajKonusulan);
        //    context.SaveChanges();



        //    string clientId1 = "", clientId2 = "", yon1 = "", yon2 = "", oturumAcanChatId = "", konusulanChatId = "";
        //    if (sahipId == (oturumAcanOgrenciMi ? chatSahip.Student.ID : chatSahip.Teacher.ID))
        //    {
        //        yon1 = "giden";
        //        yon2 = "gelen";
        //        clientId1 = (chatSahip.ownerIsStudent ? chatSahip.Student.Email : chatSahip.Teacher.Email);
        //        oturumAcanChatId = chatSahip.ID.ToString();
        //        konusulanChatId = chatKonusulan.ID.ToString();
        //        clientId1 = clientId1 == null ? "" : clientId1;
        //        clientId2 = (chatKonusulan.ownerIsStudent ? chatSahip.Student.Email : chatSahip.Teacher.Email);
        //        clientId2 = clientId2 == null ? "" : clientId2;
        //        var sonuc2 = await pusher.TriggerAsync(
        //          clientId2,
        //          "bildirimGonder",
        //          new { mesaj = mesaj, ad = (chatSahip.ownerIsStudent ? chatSahip.Student.FirstName + " " + chatSahip.Student.LastName : chatSahip.Teacher.FirstName + " " + chatSahip.Teacher.LastName), resim = "/assets/img/new_logo.png", gelenChatId = konusulanChatId });
        //    }
        //    else
        //    {
        //        yon1 = "gelen";
        //        yon2 = "giden";
        //        oturumAcanChatId = chatKonusulan.ID.ToString();
        //        konusulanChatId = chatSahip.ID.ToString();
        //        clientId2 = (chatSahip.ownerIsStudent ? chatSahip.Student.Email : chatSahip.Teacher.Email);
        //        clientId2 = clientId2 == null ? "" : clientId2;
        //        clientId1 = (!chatSahip.ownerIsStudent ? chatSahip.Student.Email : chatSahip.Teacher.Email);
        //        clientId1 = clientId1 == null ? "" : clientId1;

        //    }
        //    string tarih = chatMesajKonusulan.date.ToString("HH:mm");

        //    var sonuc = await pusher.TriggerAsync(
        //      clientId1,
        //      "mesajGeldi",
        //      new { yon = yon1, mesaj = mesaj, zaman = tarih });

        //    sonuc = await pusher.TriggerAsync(
        //      clientId2,
        //      "mesajGeldi",
        //      new { yon = yon2, mesaj = mesaj, zaman = tarih });


        //    return new HttpStatusCodeResult((int)HttpStatusCode.OK);
        //}
    }
}