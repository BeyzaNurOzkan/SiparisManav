using Entity;
using PRMYTASSİST.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace PRMYTASSİST.Controllers
{
    [SessionFilter]
    public class DefinitionController : Controller
    {
        // GET: Definition
        REContext db = new REContext();
        public ActionResult ProductCategoryList()
        {
            return View();
        }
        public ActionResult AddNewCategory()
        {
            return View();
        }

        public JsonResult GetProductGroup()
        {
            var productlist = new
            {
                data = from product in db.Products
                       where product.isDeleted == false
                       where product.ProductGroup3ID == 0
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name,
                           Code = product.ProductCode,
                           CreatedDate = product.CreateDate
                       }
            };

            return Json(productlist, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetGroup()
        {
            List<Category> gruops = new List<Category>();
            List<ProductGroup> productGroupss = Query.ProductGroups();
            foreach (var item in productGroupss)
            {
                Category category = new Category();
                category.Name = item.Name.ToUpper();
                category.Code = "0" + item.Code;
                category.ID = item.ID;
                category.ProfilePhoto = "./assets/media/Sebze/manav.jpeg";
                category.CreateDate = item.CreateDate;
                category.CodeRand = item.CodeRand;
                category.isDeleted = item.isDeleted;

                gruops.Add(category);
                foreach (var itemx in item.ProductGroup2s)
                {
                    Category category2 = new Category();
                    category2.Name = item.Name.ToUpper() + ", " + itemx.Name.ToUpper();
                    category2.Code = "0" + item.Code + ", 0" + itemx.Code;
                    category2.ID = itemx.ID;
                    category2.ProfilePhoto = "./assets/media/Sebze/sebze.jpeg";
                    category2.CreateDate = itemx.CreateDate;
                    category2.CodeRand = itemx.CodeRand;
                    category2.isDeleted = itemx.isDeleted;

                    gruops.Add(category2);
                    {
                        foreach (var items in itemx.ProductGroups3)
                        {
                            Category category3 = new Category();
                            category3.Name = item.Name.ToUpper() + ", " + itemx.Name.ToUpper() + ", ";
                            category3.Name3 = items.Name.ToUpper();
                            category3.Code = "0" + item.Code + ", 0" + itemx.Code + ", ";
                            category3.Code3 = items.Code;
                            category3.ID = items.ID;
                            category3.ProfilePhoto = items.Photo;
                            category3.CreateDate = items.CreateDate;
                            category3.CodeRand = items.CodeRand;
                            category3.isDeleted = items.isDeleted;

                            gruops.Add(category3);
                            foreach (var itemd in items.ProductGroups4)
                            {
                                Category category4 = new Category();
                                category4.Name = item.Name.ToUpper() + ", " + itemx.Name.ToUpper() + ", " + items.Name.ToUpper() + ", " + itemd.Name.ToUpper();
                                category4.Code = "0" + item.Code + ", 0" + itemx.Code + ", 0" + items.Code + ", 0" + itemd.Code;
                                category4.ID = itemd.ID;
                                category4.ProfilePhoto = "./assets/media/domates-pembe-kg-c670.jpg";
                                category4.CreateDate = itemd.CreateDate;
                                category4.CodeRand = itemd.CodeRand;
                                category4.isDeleted = itemd.isDeleted;

                                gruops.Add(category4);
                                foreach (var itemz in itemd.ProductGroups5)
                                {
                                    Category category5 = new Category();
                                    category5.Name = item.Name.ToUpper() + ", " + itemx.Name.ToUpper() + ", " + items.Name.ToUpper() + ", " + itemd.Name.ToUpper() + ", " + itemz.Name.ToUpper();
                                    category5.Code = "0" + item.Code + ", 0" + itemx.Code + ", 0" + items.Code + ", 0" + itemd.Code + ", 0" + itemz.Code;
                                    category5.ID = itemz.ID;
                                    category5.ProfilePhoto = "./assets/media/domates-pembe-kg-c670.jpg";
                                    category5.CreateDate = itemz.CreateDate;
                                    category5.CodeRand = itemz.CodeRand;
                                    category5.isDeleted = itemz.isDeleted;

                                    gruops.Add(category5);
                                }
                            }
                        }
                    }
                }
            }

            var GroupList = new

            {
                data = from i in gruops
                       where i.isDeleted == false
                       select new
                       {
                           ID = i.ID,
                           Name = i.Name,
                           Code = i.Code,
                           CreateDate = i.CreateDate,
                           ProfilePhoto = i.ProfilePhoto,
                           CodeRand = i.CodeRand,
                           Name3 = i.Name3,
                           Code3 = i.Code3

                       }
            };

            return Json(GroupList, JsonRequestBehavior.AllowGet);
        }


        public ActionResult AddGroup3(ProductGroup3 productGroup3, int ProductGroups2ID)
        {
            Random rand = new Random();
            ProductGroup3 productGroup = new ProductGroup3()
            {

                Name = productGroup3.Name,
                CreateDate = DateTime.Now,
                Photo = productGroup3.Photo,
                ProductGroup2ID = ProductGroups2ID,
                Code = productGroup3.Code,
                isVisible = true,
                isDeleted = false,
            };
            return View();
        }
        public ActionResult DeleteProductCategory(int ProductID)
        {
            Product product = db.Products.Find(ProductID);
            product.ProductGroup3ID = 0;
            product.ProductGroup2ID = 0;
            db.SaveChanges();

            return View();
        }


        public ActionResult NewGroup(string categoryForProductSelect, string categoryName, string CategoryCode)
        {

            if (categoryForProductSelect == "0")
            {
                int Code = db.ProductGroups.Count();
                ProductGroup productGroup1 = new ProductGroup()
                {

                    Name = categoryName,
                    Code = (Code + 1).ToString(),
                    CreateDate = DateTime.Now,
                    isVisible = true,
                    CodeRand = (Code + 1).ToString()
                };
                db.ProductGroups.Add(productGroup1);
            }
            else
            {
                var GroupList1 = new
                {
                    data = from Group in db.ProductGroups


                           select new
                           {
                               Group1Value = Group.ID + Group.Code + Group.Name,
                               Group1ID = Group.ID,
                               Group1Code = Group.CodeRand,
                               Count2 = Group.ProductGroup2s.Count(),

                           }
                };
                var GroupList2 = new
                {
                    data =
                              from Group2 in db.ProductGroup2s
                              select new
                              {
                                  Group2Value = Group2.ID + Group2.Code + Group2.Name,
                                  Group2ID = Group2.ID,
                                  Group2Code = Group2.CodeRand,
                                  Count3 = Group2.ProductGroups3.Count(),
                              }
                };
                var GroupList3 = new
                {
                    data =
                               from Group3 in db.ProductGroup3s
                               select new
                               {
                                   Group3Value = Group3.ID + Group3.Code + Group3.Name,
                                   Group3ID = Group3.ID,
                                   Group3Code = Group3.CodeRand,
                                   Count4 = Group3.ProductGroups4.Count(),
                               }
                };
                var GroupList4 = new
                {
                    data =
                               from Group4 in db.ProductGroup4s
                               select new
                               {
                                   Group4Value = Group4.ID + Group4.Code + Group4.Name,
                                   Group4ID = Group4.ID,
                                   Group4Code = Group4.CodeRand,
                                   Count5 = Group4.ProductGroups5.Count(),
                               }
                };
                foreach (var item in GroupList1.data)
                {
                    if (item.Group1Value == categoryForProductSelect)
                    {
                        ProductGroup2 productGroup2 = new ProductGroup2()
                        {

                            Name = categoryName,
                            Code = (item.Count2 + 1).ToString(),
                            CreateDate = DateTime.Now,
                            isVisible = true,
                            ProductGroupID = item.Group1ID,
                            CodeRand = item.Group1Code + "00" + (item.Count2 + 1).ToString()
                        };
                        db.ProductGroup2s.Add(productGroup2);
                        break;
                    }
                }



                foreach (var item in GroupList2.data)
                {
                    if (item.Group2Value == categoryForProductSelect)
                    {

                        ProductGroup3 productGroup3 = new ProductGroup3()
                        {

                            Name = categoryName,
                            Code = (item.Count3 + 1).ToString(),
                            CreateDate = DateTime.Now,
                            isVisible = true,
                            ProductGroup2ID = item.Group2ID,
                            CodeRand = item.Group2Code + "00" + (item.Count3 + 1).ToString()
                        };
                        db.ProductGroup3s.Add(productGroup3);
                        break;
                    }
                }



                foreach (var item in GroupList3.data)
                {

                    if (item.Group3Value == categoryForProductSelect)
                    {

                        ProductGroup4 productGroup4 = new ProductGroup4()
                        {

                            Name = categoryName,
                            Code = (item.Count4 + 1).ToString(),
                            CreateDate = DateTime.Now,
                            isVisible = true,
                            ProductGroup3ID = item.Group3ID,
                            CodeRand = item.Group3Code + "00" + (item.Count4 + 1).ToString()
                        };
                        db.ProductGroup4s.Add(productGroup4);
                        break;
                    }
                }
                foreach (var item in GroupList4.data)
                {

                    if (item.Group4Value == categoryForProductSelect)
                    {

                        ProductGroup5 productGroup5 = new ProductGroup5()
                        {

                            Name = categoryName,
                            Code = (item.Count5 + 1).ToString(),
                            CreateDate = DateTime.Now,
                            isVisible = true,
                            ProductGroup4ID = item.Group4ID,
                            CodeRand = item.Group4Code + "00" + (item.Count5 + 1).ToString()
                        };
                        db.ProductGroup5s.Add(productGroup5);
                        break;
                    }
                }
            }
            db.SaveChanges();
            return RedirectToAction("AddNewCategory", "Definition");
        }


        public ActionResult UpdateCategory(string categoryCodeRand, string categoryName)
        {


            ProductGroup productGroup = db.ProductGroups.Where(q => q.CodeRand == categoryCodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup2 productGroup2 = db.ProductGroup2s.Where(q => q.CodeRand == categoryCodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup3 productGroup3 = db.ProductGroup3s.Where(q => q.CodeRand == categoryCodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup4 productGroup4 = db.ProductGroup4s.Where(q => q.CodeRand == categoryCodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup5 productGroup5 = db.ProductGroup5s.Where(q => q.CodeRand == categoryCodeRand).DefaultIfEmpty().FirstOrDefault();


            if (productGroup != null)
            {
                productGroup.Name = categoryName;
            }
            else if (productGroup2 != null)
            {
                productGroup2.Name = categoryName;
            }
            else if (productGroup3 != null)
            {
                productGroup3.Name = categoryName;
            }
            else if (productGroup4 != null)
            {
                productGroup4.Name = categoryName;
            }
            else if (productGroup5 != null)
            {
                productGroup5.Name = categoryName;
            }

            db.SaveChanges();
            return RedirectToAction("AddNewCategory", "Definition");
        }

        public JsonResult EditGroup3(string CodeRand)
        {

            ProductGroup productGroup = db.ProductGroups.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup2 productGroup2 = db.ProductGroup2s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup3 productGroup3 = db.ProductGroup3s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup4 productGroup4 = db.ProductGroup4s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup5 productGroup5 = db.ProductGroup5s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            string name = "";
            int ID = 0;
            string code = "";
            string codeRand = "";
            if (productGroup != null)
            {
                name = productGroup.Name;
                code = productGroup.Code;
                ID = productGroup.ID;
                codeRand = productGroup.CodeRand;
            }
            else if (productGroup2 != null)
            {
                name = productGroup2.Name;
                code = productGroup2.Code;
                ID = productGroup2.ID;
                codeRand = productGroup2.CodeRand;

            }
            else if (productGroup3 != null)
            {
                name = productGroup3.Name;
                code = productGroup3.Code;
                ID = productGroup3.ID;
                codeRand = productGroup3.CodeRand;

            }
            else if (productGroup4 != null)
            {
                name = productGroup4.Name;
                code = productGroup4.Code;
                ID = productGroup4.ID;
                codeRand = productGroup4.CodeRand;

            }
            else if (productGroup5 != null)
            {
                name = productGroup5.Name;
                code = productGroup5.Code;
                ID = productGroup5.ID;
                codeRand = productGroup5.CodeRand;

            }
            var usr = new
            {
                ID = ID,
                Name = name,
                Code = code,
                CodeRand = codeRand
            };

            return Json(usr, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddGroup2(ProductGroup2 productGroup2)
        {
            ProductGroup Group1 = db.ProductGroups.First();
            ProductGroup2 productGroup = new ProductGroup2()
            {
                Name = productGroup2.Name,
                CreateDate = DateTime.Now,
                ProductGroupID = Group1.ID,
                Code = productGroup2.Code,
                isVisible = true,
                isDeleted = false,
            };
            return View();
        }
        public ActionResult ProductToGroup(int[] productList, int ProductGroup3ID)
        {

            foreach (var item in productList)
            {
                Product product = db.Products.FirstOrDefault(p => p.ID == item);
                ProductGroup3 productGroup3 = db.ProductGroup3s.Find(ProductGroup3ID);
                product.ProductGroup3ID = ProductGroup3ID;
                product.ProductGroup2ID = productGroup3.ProductGroup2ID;
                db.SaveChanges();
            }
            return RedirectToAction("ProductCategoryList", "Definition");
        }

        public ActionResult DeleteCategory(string CodeRand)
        {

            ProductGroup productGroup = db.ProductGroups.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup2 productGroup2 = db.ProductGroup2s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup3 productGroup3 = db.ProductGroup3s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup4 productGroup4 = db.ProductGroup4s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            ProductGroup5 productGroup5 = db.ProductGroup5s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
            if (productGroup != null)
            {
                var list = new
                {
                    data = from group1 in db.ProductGroups.Where(q => q.ID == productGroup.ID)
                           from group2 in group1.ProductGroup2s
                           from group3 in group2.ProductGroups3
                           from product in db.Products.Where(q => q.ProductGroup3ID == group3.ID).DefaultIfEmpty()
                           select new
                           {
                               productID = product.ID
                           }
                };

                if (list.data.Count() == 0)
                {
                    db.ProductGroups.Remove(productGroup);
                }
            }
            else if (productGroup2 != null)
            {
                var list = new
                {
                    data =
                           from group2 in db.ProductGroup2s.Where(q => q.ID == productGroup2.ID)
                           from group3 in group2.ProductGroups3
                           from product in db.Products.Where(q => q.ProductGroup3ID == group3.ID).DefaultIfEmpty()
                           select new
                           {
                               productID = product.ID
                           }
                };

                if (list.data.Count() == 0)
                {
                    db.ProductGroup2s.Remove(productGroup2);
                }
            }
            else if (productGroup3 != null)
            {
                Product product = db.Products.Where(q => q.ProductGroup3ID == productGroup3.ID).FirstOrDefault();
                if (product == null)
                {
                    db.ProductGroup3s.Remove(productGroup3);
                }
            }
            else if (productGroup4 != null)
            {
                Product product = db.Products.Where(q => q.ProductGroup4ID == productGroup4.ID).FirstOrDefault();
                if (product == null)
                {
                    db.ProductGroup4s.Remove(productGroup4);
                }
            }
            else if (productGroup5 != null)
            {
                Product product = db.Products.Where(q => q.ProductGroup5ID == productGroup5.ID).FirstOrDefault();
                if (product == null)
                {
                    db.ProductGroup5s.Remove(productGroup5);
                }
            }

            db.SaveChanges();
            return RedirectToAction("AddNewCategory", "Definition");
        }
        public JsonResult GetProductGroup2ByProductGroup1Id(int id)
        {
            var list = new
            {
                data = from i in db.ProductGroup2s
                       where i.ProductGroupID == id
                       select new
                       {
                           Id = i.ID,
                           Name = i.Name
                       }
            };
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderProducts(int id)
        {
            var orderProductList = new
            {
                data = from ProductGroup2ss in db.ProductGroup2s.Where(q => q.ID == id)
                       from ProductGroup3 in ProductGroup2ss.ProductGroups3.Where(q => q.ProductGroup2ID == ProductGroup2ss.ID).OrderBy(q => q.Name)
                       from product in db.Products.Where(q => q.ProductGroup3ID == ProductGroup3.ID)
                       from unit in db.Units.Where(q => product.ProductCode == q.StockCode && q.UnitCode == 1).DefaultIfEmpty()
                       from price in db.prices.Where(q => q.StockCode == product.ProductCode  /* && q.branchNo==branchId*/ ).Take(1).DefaultIfEmpty()
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           Code = product.ProductCode,
                           ProductUnitName = unit.Name,
                           UnitFactor = unit.Factor,
                           UnitWeight = unit.Weight,
                           UnitPrices = price.Price1.ToString() /* *unit.factor*/
                       }
            };
            return Json(orderProductList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ChangeDatePlus(string dateforSOR, int d)
        {
            if (d == 0)
                d = -1;

            DateTime date = Convert.ToDateTime(dateforSOR);
            DateTime date2 = date.AddDays(d);
            string Month2 = date2.Month.ToString();
            string day2 = date2.Day.ToString();
            string Year2 = date2.Year.ToString();
            if (date2.Month < 10)
            {
                Month2 = "0" + Month2;
            }
            if (date2.Day < 10)
            {
                day2 = "0" + day2;
            }
            string datefor = day2 + "/" + Month2 + "/" + Year2;

            return Json(datefor, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetStatementOrderDet(int d, string dateforSOR)
        {
            DateTime date;
            DateTime date2;
            if (dateforSOR == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(dateforSOR);
                date2 = date.AddDays(1);
            }
            var StatementDetailList = new
            {
                data = from product in db.Products.Where(q => q.ID == d)
                       from quantity in db.quantityModels.Where(q => q.StockCode == product.ProductCode)
                       from branch in db.Branchs.Where(q => q.BranchCode == quantity.BranchCode)
                       from group3 in db.ProductGroup3s.Where(q => q.ID == product.ProductGroup3ID).DefaultIfEmpty()
                       from orderdetail in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID && z.BranchCode == branch.ID).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2 && product.ID == q.ProductID).Select(t => t.ProductID).Distinct()
                       from QuantityModels in db.quantityModels.Where(q => q.BranchCode == branch.BranchCode && q.StockCode == product.ProductCode)
                       from quantityForm in db.quantityFormats.Where(q => q.StockCode == product.ProductCode && q.FormatID == branch.FormatID).DefaultIfEmpty()
                       from unit in db.Units.Where(q => q.StockCode == product.ProductCode && q.UnitCode == 2).DefaultIfEmpty()

                       select new
                       {
                           Photo = group3.Photo,
                           BranchName = branch.BranchName.ToUpper(),
                           BranchID = branch.ID,
                           SubTotal = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode == branch.ID)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.SubTotal).Sum()).ToString(),
                           Quantity = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode == branch.ID)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.Quantity).Sum()).ToString(),
                           MaxCapacity = quantityForm.Capacity.ToString(),
                           Comment = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode == branch.ID)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.Comment)).ToList(),
                           MaxCapacity2 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.BranchCode == branch.ID)
                                            from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                            select OrderDetail.Quantity).Count()).ToString(),
                           PhotoGroup = group3.Photo,
                           Units = unit.Name.ToUpper()
                       }
            };

            return Json(StatementDetailList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getProductsReportHorizontal(string dateforSOR/*, int format, int region*/)
        {
            DateTime date;
            DateTime date2;
            if (dateforSOR == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(dateforSOR);
                date2 = date.AddDays(1);
            }
            var deneme = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).First();
            var deneme1 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(1).First();
            var deneme2 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(2).First();
            var deneme3 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(3).First();
            var deneme4 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(4).First();
            var deneme5 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(5).First();
            var deneme6 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(6).First();
            var deneme7 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(7).First();
            var deneme8 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(8).First();
            var deneme9 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(9).First();
            var deneme10 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(10).First();
            var deneme11 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(11).First();
            var deneme12 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(12).First();
            var deneme13 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(13).First();
            var deneme14 = db.Branchs.Where(z => z.isMaster == false && z.Visible == true).OrderBy(z => z.ID).Select(z => z.ID).Skip(14).First();


            var productList = new
            {

                data = from product in db.Products
                       from orderdetail in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID && db.Branchs.Where(y => y.ID == z.BranchCode && y.isMaster == false /*&& ((region != 0 && y.RegionID == region) || region == 0) && ((format != 0 && y.FormatID == format) || format == 0)*/).Select(y => y.ID).FirstOrDefault() == z.BranchCode).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.ProductID == product.ID).Select(t => t.ProductID).Distinct()

                       from unit in db.Units.Where(q => product.ProductCode == q.StockCode && q.UnitCode == 2).DefaultIfEmpty()
                       from ProductGroup3s in db.ProductGroup3s.Where(q => product.ProductGroup3ID == q.ID).DefaultIfEmpty()
                       from ProductGroup2ss in db.ProductGroup2s.Where(q => ProductGroup3s.ProductGroup2ID == q.ID).DefaultIfEmpty()
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           Barcode = barcode.Code,
                           Units = unit.Name.ToUpper(),
                           GroupID = ProductGroup3s.ProductGroup2ID,
                           ProductGroupUrl = (ProductGroup2ss.Name).ToUpper(),
                           OrderCount = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2)
                                          from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                          select OrderDetail.SubTotal).Sum()).ToString(),
                           branch0 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch1 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme1 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch2 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme2 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch3 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme3 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch4 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme4 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch5 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme5 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch6 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme6 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch7 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme7 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch8 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme8 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch9 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme9 == q.BranchCode)
                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                       select OrderDetail.SubTotal).Sum()).ToString(),
                           branch10 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme10 == q.BranchCode)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.SubTotal).Sum()).ToString(),
                           branch11 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme11 == q.BranchCode)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.SubTotal).Sum()).ToString(),
                           branch12 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme12 == q.BranchCode)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.SubTotal).Sum()).ToString(),
                           branch13 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme13 == q.BranchCode)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.SubTotal).Sum()).ToString(),
                           branch14 = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2 && deneme14 == q.BranchCode)
                                        from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                        select OrderDetail.SubTotal).Sum()).ToString(),
                           deneme = deneme,
                           deneme1 = deneme1,
                           deneme2 = deneme2,
                           deneme3 = deneme3,
                           deneme4 = deneme4,
                           deneme5 = deneme5,
                           deneme6 = deneme6,
                           deneme7 = deneme7,
                           deneme8 = deneme8,
                           deneme9 = deneme9,
                           deneme10 = deneme10,
                           deneme11 = deneme11,
                           deneme12 = deneme12,
                           deneme13 = deneme13,
                           deneme14 = deneme14,



                       }

            };
            foreach (var item in productList.data)
            {
                var s = item.ID;
            }
            return Json(productList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProductsForStateOrderReports(string dateforSOR)
        {
            DateTime date;
            DateTime date2;
            if (dateforSOR == "")
            {
                date = DateTime.Today;
                date2 = date.AddDays(1);
            }
            else
            {
                date = Convert.ToDateTime(dateforSOR);
                date2 = date.AddDays(1);
            }

            var productList = new
            {

                data = from product in db.Products
                       from orderdetail in db.OrderDetails.Where(q => (db.Orders.Where(z => z.ID == q.OrderID).Select(h => h.ApprovalStatus).FirstOrDefault()) == 1 && q.CreateDate >= date && q.CreateDate < date2 && q.ProductID == product.ID).Select(t => t.ProductID).Distinct()
                       from unit in db.Units.Where(q => product.ProductCode == q.StockCode && q.UnitCode == 2).DefaultIfEmpty()
                       from ProductGroup3s in db.ProductGroup3s.Where(q => product.ProductGroup3ID == q.ID).DefaultIfEmpty()
                       from ProductGroup2ss in db.ProductGroup2s.Where(q => ProductGroup3s.ProductGroup2ID == q.ID).DefaultIfEmpty()
                       from barcode4 in db.barcodeModels.Where(q => q.Code == "Tanımsız").Take(1)
                       from barcode in db.barcodeModels.Where(q => product.ProductCode == q.StockCode).OrderByDescending(q => q.IsMaster).Take(1).DefaultIfEmpty(barcode4)
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name.ToUpper(),
                           GroupID = ProductGroup3s.ProductGroup2ID,
                           ProductGroupUrl = (ProductGroup2ss.Name).ToUpper(),
                           Code = product.ProductCode,
                           Barcode = barcode.Code,
                           Units = unit.Name.ToUpper(),

                           DepotStock = ((from EntryStock in db.entryStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                                          from EntryStockList in EntryStock.entryStockLists.Where(q => q.ProductID == product.ID)
                                          select EntryStockList.StockQuantity).Sum()).ToString(),
                           OrderCount = ((from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2)
                                          from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                          select OrderDetail.SubTotal).Sum()).ToString(),
                           StockDist = ((from EntryStock in db.entryStocks.Where(q => q.CreateDate >= date && q.CreateDate < date2)
                                         from EntryStockList in EntryStock.entryStockLists.Where(q => q.ProductID == product.ID)
                                         select EntryStockList.StockQuantity).Sum() - (from order in db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2)
                                                                                       from OrderDetail in order.orderDetails.Where(q => q.ProductID == product.ID)
                                                                                       select OrderDetail.SubTotal).Sum()).ToString(),
                       }
            };

            return Json(productList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult productCountTotal(int branchID)
        {

            var Total = (from o in db.Baskets.Where(q => q.UserID == branchID)
                         from t in db.BasketProducts.Where(q => q.BasketID == o.ID)
                         select t).Count();

            return Json(Total, JsonRequestBehavior.AllowGet);
        }



        public JsonResult GetOrderStatusToday(string dateforStatus, string dateforStatus1)
        {
            DateTime date = Convert.ToDateTime(dateforStatus);
            DateTime date2 = Convert.ToDateTime(dateforStatus1);

            int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
            int appc0 = db.Orders.Where(q => q.ApprovalStatus == 0 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
            int appc1 = db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
            int appc2 = db.Orders.Where(q => q.ApprovalStatus == 2 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();

            int a = orderc;
            int b = appc0;
            int c = appc1;
            int d = appc2;

            var OrderList = new
            {
                ordercount = a,
                appcount0 = b,
                appcount1 = c,
                appcount2 = d
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetOrderCountByMonth()
        {
            int[] array = new int[13];
            for (int i = 1; i < 13; i++)
            {
                DateTime now = DateTime.Now;
                DateTime date = new DateTime(now.Year, i, 1);
                DateTime date2 = date.AddMonths(1);
                int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                array[i] = orderc;
            }
            var OrderList = new
            {
                mountcount0 = array[1],
                mountcount1 = array[2],
                mountcount2 = array[3],
                mountcount3 = array[4],
                mountcount4 = array[5],
                mountcount5 = array[6],
                mountcount6 = array[7],
                mountcount7 = array[8],
                mountcount8 = array[9],
                mountcount9 = array[10],
                mountcount10 = array[11],
                mountcount11 = array[12],
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderCountByWaiting()
        {
            int orderc = db.Orders.Where(q => q.ApprovalStatus == 0).Select(q => q.ID).Count();

            var OrderList = new
            {
                OrderCountW8 = orderc,
            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetOrderCountByQuarter()
        {
            int[] array = new int[13];
            for (int i = 1; i < 13; i++)
            {
                DateTime now = DateTime.Now;
                DateTime date = new DateTime(now.Year, i, 1);
                DateTime date2 = date.AddMonths(1);
                int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
                array[i] = orderc;
            }
            var OrderList = new
            {
                quartercount0 = array[1] + array[2] + array[3],
                quartercount1 = array[4] + array[5] + array[6],
                quartercount2 = array[7] + array[8] + array[9],
                quartercount3 = array[10] + array[11] + array[12],

            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }
        public JsonResult getOrderDescForDashBoard()
        {
            int[] array = new int[8];

            int productCount = db.Products.Where(q => q.isDeleted == false && q.Visible == false).Count();
            array[0] = productCount;
            int productGroup = db.ProductGroup2s.Where(q => q.isDeleted == false).Count();
            array[1] = productGroup;
            int user = db.Users.Where(q => q.isDeleted == false).Count();
            array[2] = user;
            int branch = db.Branchs.Where(q => q.Visible == true && q.isMaster == false).Count();
            array[3] = branch;
            int region = db.Regions.Where(q => q.IsDeleted == false).Count();
            array[4] = region;
            int format = db.branchFormats.Count();
            array[5] = format;
            int productCountt = db.Products.Count();
            array[6] = productCountt;
            int productCounttt = db.Products.Where(q => q.Visible == true).Count();
            array[7] = productCounttt;
            var OrderList = new
            {
                count1 = array[0],
                count2 = array[1],
                count3 = array[2],
                count4 = array[3],
                count5 = array[4],
                count6 = array[5],
                count7 = array[6],
                count8 = array[7],

            };
            return Json(OrderList, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult GetOrderStatusWeek(string dateforStatus)
        //{
        //    DateTime date;
        //    DateTime date2;
        //    if (dateforStatus == "")
        //    {
        //        date2 = DateTime.Today;
        //        date = date2.AddDays(-7);
        //    }
        //    else
        //    {
        //        date2 = Convert.ToDateTime(dateforStatus);
        //        date = date2.AddDays(-7);
        //    }

        //    int orderc = db.Orders.Where(q => q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
        //    int appc0 = db.Orders.Where(q => q.ApprovalStatus == 0 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
        //    int appc1 = db.Orders.Where(q => q.ApprovalStatus == 1 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();
        //    int appc2 = db.Orders.Where(q => q.ApprovalStatus == 2 && q.CreateDate >= date && q.CreateDate < date2).Select(q => q.ID).Count();

        //    int a = orderc;
        //    int b = appc0;
        //    int c = appc1;
        //    int d = appc2;

        //    var OrderList = new
        //    {
        //        ordercount = a,
        //        count0 = b,
        //        count1 = c,
        //        count2 = d
        //    };
        //    return Json(OrderList, JsonRequestBehavior.AllowGet);
        //}




        /* önemli */


        //public ActionResult ProductToGroup(int[] productList, string CodeRand)
        //{

        //    ProductGroup productGroup = db.ProductGroups.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
        //    ProductGroup2 productGroup2 = db.ProductGroup2s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
        //    ProductGroup3 productGroup3 = db.ProductGroup3s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
        //    ProductGroup4 productGroup4 = db.ProductGroup4s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
        //    ProductGroup5 productGroup5 = db.ProductGroup5s.Where(q => q.CodeRand == CodeRand).DefaultIfEmpty().FirstOrDefault();
        //    if (productGroup != null)
        //    {
        //        foreach (var item in productList)
        //        {
        //            Product product = db.Products.FirstOrDefault(p => p.ID == item);
        //            product.ProductGroupID = productGroup.ID;
        //            db.SaveChanges();
        //        }
        //    }
        //    else if (productGroup2 != null)
        //    {
        //        foreach (var item in productList)
        //        {
        //            Product product = db.Products.FirstOrDefault(p => p.ID == item);
        //            product.ProductGroup2ID = productGroup2.ID;
        //            product.ProductGroupID = productGroup2.ProductGroupID;
        //            db.SaveChanges();
        //        }

        //    }
        //    else if (productGroup3 != null)
        //    {
        //        foreach (var item in productList)
        //        {
        //            Product product = db.Products.FirstOrDefault(p => p.ID == item);
        //            product.ProductGroup3ID = productGroup3.ID;
        //            product.ProductGroup2ID = productGroup3.ProductGroup2ID;
        //            product.ProductGroupID = productGroup3.ProductGroups2.ProductGroupID;
        //            db.SaveChanges();
        //        }

        //    }
        //    else if (productGroup4 != null)
        //    {
        //        foreach (var item in productList)
        //        {
        //            Product product = db.Products.FirstOrDefault(p => p.ID == item);
        //            product.ProductGroup4ID = productGroup4.ID;
        //            product.ProductGroup3ID = productGroup4.ProductGroup3ID;
        //            product.ProductGroup2ID = productGroup4.ProductGroups3.ProductGroup2ID;
        //            product.ProductGroupID = productGroup4.ProductGroups3.ProductGroups2.ProductGroupID;
        //            db.SaveChanges();
        //        }

        //    }
        //    else if (productGroup5 != null)
        //    {
        //        foreach (var item in productList)
        //        {
        //            Product product = db.Products.FirstOrDefault(p => p.ID == item);
        //            product.ProductGroup5ID = productGroup5.ID;
        //            product.ProductGroup4ID = productGroup5.ProductGroup4ID;
        //            product.ProductGroup3ID = productGroup5.ProductGroups4.ProductGroup3ID;
        //            product.ProductGroup2ID = productGroup5.ProductGroups4.ProductGroups3.ProductGroup2ID;
        //            product.ProductGroupID = productGroup5.ProductGroups4.ProductGroups3.ProductGroups2.ProductGroupID;
        //            db.SaveChanges();
        //        }

        //    }

        //    return RedirectToAction("ProductCategoryList", "Definition");
        //}
    }
}
//public JsonResult GetGroupCode(string categoryForProductSelect)
//{
//    var GroupLisst = new
//    {
//        data = from Group in db.ProductGroups.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect)

//               from Group2 in db.ProductGroup2s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty()
//               from Group3 in db.ProductGroup3s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty()

//               select new
//               {
//                   Count = from x in Groupwhe,
//                   Count3 = Group2.ProductGroups3.Count() + 1,
//                   Count4 = Group3.ProductGroups4.Count() + 1

//               }
//    };
//    ProductGroup product = db.ProductGroups.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty().First();
//    ProductGroup2 productGroup2 = db.ProductGroup2s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty().First();
//    ProductGroup3 productGroup3 = db.ProductGroup3s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty().First();
//    ProductGroup4 productGroup4 = db.ProductGroup4s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty().First();


//    if (product!=null ) 
//    {
//       int ID = product.ProductGroup2s.Count()+1;

//    }
//    else if (productGroup2 != null)
//    {
//        int ID = productGroup2.ProductGroups3.Count()+1;
//    }
//    else if (productGroup3 != null)
//    {
//        int ID = productGroup3.ProductGroups4.Count()+1;
//    }
//    else if (productGroup4 != null)
//    {
//        int ID = productGroup4.ProductGroups5.Count()+1;
//    }

//    var GroupList = new
//    {
//        data = from Group in db.ProductGroups.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty()
//               from Group2 in db.ProductGroup2s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty()
//               from Group3 in db.ProductGroup3s.Where(q => (q.ID + q.Code + q.Name) == categoryForProductSelect).DefaultIfEmpty()
//               select new
//               {
//                   Count = Group.ProductGroup2s.Count()+1,
//                   Count3 = Group2.ProductGroups3.Count()+1,
//                   Count4 = Group3.ProductGroups4.Count()+1

//               }
//    };

//    return Json(GroupList, JsonRequestBehavior.AllowGet);
//}

