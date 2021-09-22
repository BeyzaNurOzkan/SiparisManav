using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PRMYTASSİST
{
    public class ImageUploader
    {
        //Hata Kodları:
        //0 => Dosya Bulunamadı Hatası
        //1 => Dosya Zaten Var Hatası
        //2 => Uzantı Hatası
        public static string UploadSingleImage(string serverPath, HttpPostedFileBase file)
        {
            if (file != null)
            {
                Guid uniqueName = Guid.NewGuid();
                serverPath = serverPath.Replace("~", string.Empty);
                string[] fileArr = file.FileName.Split('.');

                string extension = fileArr[fileArr.Length - 1];

                string fileName = uniqueName + "." + extension;

                if (extension == "jpg" || extension == "png" || extension == "jpeg" || extension == "gif")
                {
                    if (File.Exists(HttpContext.Current.Server.MapPath(serverPath + extension)))
                    {
                        return "1";
                    }
                    else
                    {
                        var filePath = HttpContext.Current.Server.MapPath(serverPath + fileName);
                        file.SaveAs(filePath);
                        return serverPath + fileName;
                    }
                }
                else
                {
                    return "2";
                }
            }
            else
            {
                return "0";
            }
        }
    }
}