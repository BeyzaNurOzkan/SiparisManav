 using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Entity;
using Z.BulkOperations;


namespace PRMYTASSİST.Controllers
{
    [SessionFilter]

    public class HomeController : Controller
    {
        REContext db = new Entity.REContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Contact()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult SaveImage(string ImgBase64)
        {
            byte[] data = Convert.FromBase64String(ImgBase64.Substring(22));
            string fileName = Guid.NewGuid() + ".jpg";
            string savePath = Path.Combine(
               Server.MapPath("~/Upload"), fileName
            );
            System.IO.File.WriteAllBytes(savePath, data);

            return RedirectToAction("ShowImage", new { FileName = fileName });
        }

        public ActionResult ShowImage(string fileName)
        {
            ViewBag.fileName = fileName;
            return View();
        }
        [HttpPost]
        public JsonResult GetProduct()
        {
            var productList = new
            {
                data = from product in db.Products
                       where product.isDeleted == false
                       where product.Visible == true
                       orderby product.LastUpdateDate
                       select new
                       {
                           ID = product.ID,
                           Name = product.Name,
                           ProductCode = product.ProductCode,
                           Visible = product.Visible,
                           isDeleted = product.isDeleted,
                           CreatedDate = product.CreateDate,
                           LastUpdateDate = product.LastUpdateDate,
                           SectorCode = product.SectorCode,
                           RayonCode = product.RayonCode,
                           BrandCode = product.BrandCode,
                           ModelCode = product.ModelCode,
                           RawMaterialCode = product.RawMaterialCode,
                           SeasonCode = product.SeasonCode,
                           PlaceCode = product.PlaceCode
                       }
            };
            return Json(productList, JsonRequestBehavior.AllowGet);
        }
        public ActionResult ProductList(int id = 18)
        {

            ViewBag.Message = "Your application description page.";

            using (var Service = new Entity.MikroServiceReference.MikroServiceClient())
            {
                var Security = new Entity.MikroServiceReference.SecurityModel
                {
                    UserCode = "PramytMikroService",
                    Password = "M-k}AQ~$7s_-Qi9["
                };

                DateTime? BeginDate = db.UpdateDates.FirstOrDefault()?.LastUpdateDate;

                if (BeginDate == null)
                {
                    BeginDate = new DateTime(2000, 01, 01);

                    db.UpdateDates.Add(new UpdateDate()
                    {
                        CreateDate = DateTime.Now,
                        LastUpdateDate = DateTime.Now,
                    });

                    db.SaveChanges();
                }

                DateTime EndDate = DateTime.Now;

                var StockCountResult = Service.GetStockCardCount(Security,
                    (DateTime)BeginDate,
                    EndDate,
                    new List<Entity.MikroServiceReference.FilterModel>());

                var CurrentCountResult = Service.GetCurrentAccountCount(Security,
                    (DateTime)BeginDate,
                    EndDate);




                var depotlist = Service.GetDepotList(Security);
                var BrandResult = Service.GetBrandList(Security);
                #region getbrand
                if (BrandResult.Result)
                {
                    List<Brand> InsertBrand = new List<Brand>();
                    List<Brand> updateBrand = new List<Brand>();

                    foreach (var Brandlist in BrandResult.BrandList)
                    {
                        Brand checkBrand = db.Brands.FirstOrDefault(p => p.BrandCode == Brandlist.Code);
                        if (checkBrand == null)
                        {
                            InsertBrand.Add(new Brand()
                            {
                                BrandCode = Brandlist.Code,
                                BrandhName = Brandlist.Name,
                                CreateDate = DateTime.Now,
                                LastUpdateDate = DateTime.Now

                            });

                        }
                        else
                        {
                            checkBrand.BrandhName = Brandlist.Name;
                            checkBrand.LastUpdateDate = DateTime.Now;

                            updateBrand.Add(checkBrand);
                        }

                    }


                    if (InsertBrand.Count > 0)
                        db.BulkInsert(InsertBrand);

                    if (updateBrand.Count > 0)
                        db.BulkUpdate(updateBrand);

                }
                #endregion
                #region getbranch
                if (depotlist.Result)
                {

                    List<Branch> InsertBranch = new List<Branch>();
                    List<Branch> updateBranch = new List<Branch>();
                    foreach (var depolist in depotlist.DepotList)
                    {
                        int Depocode = Convert.ToInt32(depolist.Code);
                        Branch checkBranch = db.Branchs.FirstOrDefault(p => p.BranchCode == Depocode);

                        if (checkBranch == null)
                        {

                            InsertBranch.Add(new Branch()
                            {
                                BranchCode = Convert.ToInt32(depolist.Code),
                                BranchName = depolist.Name.ToUpper(),
                                CreateDate = DateTime.Now,
                                LastUpdateDate = DateTime.Now
                            });

                        }

                        else
                        {
                            checkBranch.BranchName = depolist.Name.ToUpper();
                            checkBranch.LastUpdateDate = DateTime.Now;
                            updateBranch.Add(checkBranch);
                        }
                    }

                    if (InsertBranch.Count > 0)
                    {
                        db.BulkInsert(InsertBranch);
                        foreach (var branch in InsertBranch)
                        {

                            Random rand = new Random();
                            Basket basket = new Basket()
                            {
                                Code = rand.Next(0, 25548612),
                                UserID = branch.ID,
                                CreateDate = DateTime.Now
                            };
                            db.Baskets.Add(basket);
                            db.SaveChanges();
                        }
                    }

                    if (updateBranch.Count > 0)
                        db.BulkUpdate(updateBranch);

                    db.SaveChanges();
                }
                #endregion
                #region getcurrent
                if (CurrentCountResult.Result)
                {
                    int CurrentCount = CurrentCountResult.RecordCount;
                    int ProcessCount = 0;
                    while (ProcessCount < CurrentCount)
                    {
                        var CurrentAccountResult = Service.GetCurrentAccounts(Security,
                            (DateTime)BeginDate,
                            EndDate,
                            ProcessCount,
                            100);
                        if (CurrentAccountResult.Result)
                        {
                            ProcessCount += CurrentAccountResult.CurrentAccounts.Count;
                            List<CurrentAccountModel> InsertcurrentAccountModels = new List<CurrentAccountModel>();
                            List<CurrentAccountAddressModel> InsertcurrentAccountAddressModels = new List<CurrentAccountAddressModel>();
                            List<CurrentAccountModel> UpdatecurrentAccountModels = new List<CurrentAccountModel>();
                            List<CurrentAccountAddressModel> UpdatecurrentAccountAddressModels = new List<CurrentAccountAddressModel>();

                            foreach (var currentaccounts in CurrentAccountResult.CurrentAccounts)
                            {
                                #region CurrentAccounts

                                CurrentAccountModel CheckCurrentAccount = db.currentAccounts.FirstOrDefault(p => p.CurrentAccountCode == currentaccounts.Code);

                                if (CheckCurrentAccount == null)
                                {
                                    InsertcurrentAccountModels.Add(new CurrentAccountModel()
                                    {
                                        CreateDate = DateTime.Now,
                                        CurrentAccountCode = currentaccounts.Code,
                                        title1 = currentaccounts.Title1,
                                        title2 = currentaccounts.Title2,
                                        RepresentativeCode = currentaccounts.RepresentativeCode,
                                        TaxNumber = currentaccounts.TaxNumber,
                                        TaxOffice = currentaccounts.TaxOffice,
                                        BillingAddressNo = currentaccounts.BillingAddressNo,
                                        ShippingAddressNo = currentaccounts.ShippingAddressNo,
                                        LastUpdateDate = DateTime.Now,
                                        Email = currentaccounts.EMail,
                                        MobilePhoneNumber = currentaccounts.MobilePhoneNumber,
                                        GroupCode = currentaccounts.GroupCode,
                                        SectorCode = currentaccounts.SectorCode,
                                        IsEInvoice = currentaccounts.IsEInvoice,

                                    });
                                }
                                else
                                {

                                    CheckCurrentAccount.title1 = currentaccounts.Title1;
                                    CheckCurrentAccount.title2 = currentaccounts.Title2;
                                    CheckCurrentAccount.RepresentativeCode = currentaccounts.RepresentativeCode;
                                    CheckCurrentAccount.TaxNumber = currentaccounts.TaxNumber;
                                    CheckCurrentAccount.TaxOffice = currentaccounts.TaxOffice;
                                    CheckCurrentAccount.BillingAddressNo = currentaccounts.BillingAddressNo;
                                    CheckCurrentAccount.ShippingAddressNo = currentaccounts.ShippingAddressNo;
                                    CheckCurrentAccount.LastUpdateDate = DateTime.Now;
                                    CheckCurrentAccount.Email = currentaccounts.EMail;
                                    CheckCurrentAccount.MobilePhoneNumber = currentaccounts.MobilePhoneNumber;
                                    CheckCurrentAccount.GroupCode = currentaccounts.GroupCode;
                                    CheckCurrentAccount.SectorCode = currentaccounts.SectorCode;
                                    CheckCurrentAccount.IsEInvoice = currentaccounts.IsEInvoice;

                                    UpdatecurrentAccountModels.Add(CheckCurrentAccount);
                                }

                                #endregion

                                #region Currentaccountaddress

                                CurrentAccountAddressModel CheckAddress = null;

                                foreach (var AccountAddress in currentaccounts.Addresses)
                                {
                                    if (CheckAddress != null)
                                        CheckAddress = db.currentAccountsAddress.FirstOrDefault(q => q.CurrentAccountCode == currentaccounts.Code && q.AddressNo == AccountAddress.AddressNo);

                                    if (CheckAddress == null)
                                    {
                                        InsertcurrentAccountAddressModels.Add(new CurrentAccountAddressModel()
                                        {
                                            CurrentAccountCode = currentaccounts.Code,
                                            AddressLine1 = AccountAddress.AddresLine1,
                                            AddressLine2 = AccountAddress.AddresLine2,
                                            AddressNo = AccountAddress.AddressNo,
                                            City = AccountAddress.City,
                                            Country = AccountAddress.Country,
                                            CreateDate = AccountAddress.CreateDate,
                                            LastUpdateDate = AccountAddress.UpdateDate,
                                            Phone1 = AccountAddress.Phone1,
                                            Phone2 = AccountAddress.Phone2,
                                            District = AccountAddress.District

                                        });
                                    }
                                    else
                                    {

                                        CheckAddress.AddressLine1 = AccountAddress.AddresLine1;
                                        CheckAddress.AddressLine2 = AccountAddress.AddresLine2;
                                        CheckAddress.City = AccountAddress.City;
                                        CheckAddress.Country = AccountAddress.Country;
                                        CheckAddress.CreateDate = AccountAddress.CreateDate;
                                        CheckAddress.LastUpdateDate = AccountAddress.UpdateDate;
                                        CheckAddress.Phone1 = AccountAddress.Phone1;
                                        CheckAddress.Phone2 = AccountAddress.Phone2;
                                        CheckAddress.District = AccountAddress.District;
                                        UpdatecurrentAccountAddressModels.Add(CheckAddress);
                                    }
                                }

                                #endregion

                            }
                            if (InsertcurrentAccountModels.Count > 0)
                                db.BulkInsert(InsertcurrentAccountModels);

                            if (UpdatecurrentAccountModels.Count > 0)
                                db.BulkUpdate(UpdatecurrentAccountModels);

                            if (InsertcurrentAccountAddressModels.Count > 0)
                                db.BulkInsert(InsertcurrentAccountAddressModels);

                            if (UpdatecurrentAccountModels.Count > 0)
                                db.BulkUpdate(UpdatecurrentAccountModels);
                        }


                    }

                    db.SaveChanges();
                }

                #endregion
                #region getstockcard
                if (StockCountResult.Result)
                {
                    int StockCount = StockCountResult.RecordCount;
                    int ProcessedCount = 0;

                    User users = db.Users.Find(id);

                    while (ProcessedCount < StockCount)
                    {
                        var StockCardsResult = Service.GetStockCards(Security,
                            (DateTime)BeginDate,
                            EndDate,
                            new List<Entity.MikroServiceReference.FilterModel>(),
                            ProcessedCount,
                            100);

                        if (StockCardsResult.Result)
                        {
                            ProcessedCount += StockCardsResult.StokCards.Count;

                            List<Product> InsertProductList = new List<Product>();
                            List<QuantityModel> InsertQuantityList = new List<QuantityModel>();
                            List<Unit> InsertUnitList = new List<Unit>();
                            List<BarcodeModels> InsertBarcodeList = new List<BarcodeModels>();
                            List<Prices> InsertPriceList = new List<Prices>();

                            List<Product> UpdateProductList = new List<Product>();
                            List<QuantityModel> UpdateQuantityList = new List<QuantityModel>();
                            List<Unit> UpdateUnitList = new List<Unit>();

                            //List<BarcodeModels> UpdateBarcodeList = new List<BarcodeModels>();
                            //List<Prices> UpdatePriceList = new List<Prices>();

                            foreach (var Stock in StockCardsResult.StokCards)
                            {
                                #region Products

                                Product CheckProduct = db.Products.FirstOrDefault(p => p.ProductCode == Stock.Code);
                                User CurrentUser = Session["CurrentUser"] as User;

                                if (CheckProduct == null)
                                {
                                    InsertProductList.Add(new Product()
                                    {
                                        Name = Stock.Name,
                                        ProductCode = Stock.Code,
                                        Visible = Stock.IsOrderStop,
                                        isDeleted = Stock.IsDisabled,
                                        CreateDate = Stock.CreateDate,
                                        LastUpdateDate = Stock.UpdateDate,
                                        BrandCode = Stock.BrandCode,
                                        SectorCode = Stock.SectorCode,
                                        RayonCode = Stock.SectionCode,
                                        ModelCode = Stock.ModelCode,
                                        RawMaterialCode = Stock.RawMaterialCode,
                                        SeasonCode = Stock.SeasonCode,
                                        PlaceCode = Stock.PlaceCode,
                                        ShortName = Stock.ShortName,
                                        ForeignKey = Stock.ForeignName,
                                        CategoryCode = Stock.CategoryCode,
                                        IsLocked = Stock.IsLocked,
                                        IsRegisterWeighted = Stock.IsRegisterWeighted,
                                        MainGroupCode = Stock.MainGroupCode,
                                        ManufacturerCode = Stock.ManufacturerCode,
                                        QualintyControlCode = Stock.QualityControlCode,
                                        ResponsibilityCenterCode = Stock.ResponsibilityCenterCode,
                                        RetailTaxCode = Stock.RetailTaxCode,
                                        RetailTaxPercentage = Stock.RetailTaxPercentage,
                                        SectionCode = Stock.SectionCode,
                                        Shelflife = Stock.ShelfLife,
                                        SubGroupCode = Stock.SubGroupCode,
                                        WholeSaleTaxCode = Stock.WholeSaleTaxCode,
                                        WholeSaleTaxPercentage = Stock.WholeSaleTaxPercentage,
                                        CreateUserID = CurrentUser.ID,
                                        LastUpdateUserID = CurrentUser.ID,
                                    });
                                }
                                else
                                {
                                    CheckProduct.Name = Stock.Name;
                                    CheckProduct.ProductCode = Stock.Code;
                                    CheckProduct.LastUpdateDate = Stock.UpdateDate;
                                    CheckProduct.BrandCode = Stock.BrandCode;
                                    CheckProduct.SectorCode = Stock.SectorCode;
                                    CheckProduct.RayonCode = Stock.SectionCode;
                                    CheckProduct.ModelCode = Stock.ModelCode;
                                    CheckProduct.RawMaterialCode = Stock.RawMaterialCode;
                                    CheckProduct.SeasonCode = Stock.SeasonCode;
                                    CheckProduct.PlaceCode = Stock.PlaceCode;
                                    CheckProduct.ShortName = Stock.ShortName;
                                    CheckProduct.ForeignKey = Stock.ForeignName;
                                    CheckProduct.CategoryCode = Stock.CategoryCode;
                                    CheckProduct.IsLocked = Stock.IsLocked;
                                    CheckProduct.IsRegisterWeighted = Stock.IsRegisterWeighted;
                                    CheckProduct.MainGroupCode = Stock.MainGroupCode;
                                    CheckProduct.ManufacturerCode = Stock.ManufacturerCode;
                                    CheckProduct.QualintyControlCode = Stock.QualityControlCode;
                                    CheckProduct.ResponsibilityCenterCode = Stock.ResponsibilityCenterCode;
                                    CheckProduct.RetailTaxCode = Stock.RetailTaxCode;
                                    CheckProduct.RetailTaxPercentage = Stock.RetailTaxPercentage;
                                    CheckProduct.SectionCode = Stock.SectionCode;
                                    CheckProduct.Shelflife = Stock.ShelfLife;
                                    CheckProduct.SubGroupCode = Stock.SubGroupCode;
                                    CheckProduct.WholeSaleTaxCode = Stock.WholeSaleTaxCode;
                                    CheckProduct.WholeSaleTaxPercentage = Stock.WholeSaleTaxPercentage;
                                    CheckProduct.LastUpdateUserID = CurrentUser.ID;
                                    CheckProduct.Visible = Stock.IsOrderStop;
                                    UpdateProductList.Add(CheckProduct);
                                }

                                #endregion

                                #region Quantity

                                QuantityModel CheckQuantity = null;

                                foreach (var Quantity in Stock.StockQuantity)
                                {
                                    if (CheckProduct != null)
                                        CheckQuantity = db.quantityModels.FirstOrDefault(q => q.BranchCode == Quantity.DepotNo && q.StockCode == Stock.Code);

                                    if (CheckQuantity == null)
                                    {
                                        InsertQuantityList.Add(new QuantityModel()
                                        {
                                            BranchCode = Quantity.DepotNo,
                                            StockCode = Stock.Code,
                                            StockQuantity = Quantity.StockQuantity,
                                            CreateDate = DateTime.Now
                                        });
                                    }
                                    else
                                    {
                                        CheckQuantity.StockQuantity = Quantity.StockQuantity;
                                        CheckQuantity.CreateDate = DateTime.Now;

                                        UpdateQuantityList.Add(CheckQuantity);
                                    }
                                }

                                #endregion

                                #region Units

                                Unit CheckUnit = null;

                                if (!Stock.Unit1Name.Trim().Equals(string.Empty))
                                {
                                    if (CheckProduct != null)
                                        CheckUnit = db.Units.FirstOrDefault(u => u.StockCode == Stock.Code && u.UnitCode == 1);

                                    if (CheckUnit == null)
                                    {
                                        InsertUnitList.Add(new Unit()
                                        {
                                            StockCode = Stock.Code,
                                            Name = Stock.Unit1Name,
                                            UnitCode = 1,
                                            Factor = Stock.Unit1Factor,
                                            Weight = Stock.Unit1Weight,
                                            CreateDate = DateTime.Now
                                        });
                                    }
                                    else
                                    {
                                        CheckUnit.Name = Stock.Unit1Name;
                                        CheckUnit.Factor = Stock.Unit1Factor;
                                        CheckUnit.Weight = Stock.Unit1Weight;
                                        CheckUnit.CreateDate = DateTime.Now;

                                        UpdateUnitList.Add(CheckUnit);
                                    }
                                }

                                if (!Stock.Unit2Name.Trim().Equals(string.Empty))
                                {
                                    if (CheckProduct != null)
                                        CheckUnit = db.Units.FirstOrDefault(u => u.StockCode == Stock.Code && u.UnitCode == 2);

                                    if (CheckUnit == null)
                                    {
                                        InsertUnitList.Add(new Unit()
                                        {
                                            StockCode = Stock.Code,
                                            Name = Stock.Unit2Name,
                                            UnitCode = 2,
                                            Factor = Stock.Unit2Factor,
                                            Weight = Stock.Unit2Weight,
                                            CreateDate = DateTime.Now
                                        });
                                    }
                                    // Unit 2 Güncellemesi bizim unit sistemimizi bozacağı için kaldırıldı.
                                    //else
                                    //{
                                    //    CheckUnit.Name = Stock.Unit2Name;
                                    //    CheckUnit.Factor = Stock.Unit2Factor;
                                    //    CheckUnit.Weight = Stock.Unit2Weight;
                                    //    CheckUnit.CreateDate = DateTime.Now;
                                    //    UpdateUnitList.Add(CheckUnit);
                                    //}
                                }

                                if (!Stock.Unit3Name.Trim().Equals(string.Empty))
                                {
                                    if (CheckProduct != null)
                                        CheckUnit = db.Units.FirstOrDefault(u => u.StockCode == Stock.Code && u.UnitCode == 3);

                                    if (CheckUnit == null)
                                    {
                                        InsertUnitList.Add(new Unit()
                                        {
                                            StockCode = Stock.Code,
                                            Name = Stock.Unit3Name,
                                            UnitCode = 3,
                                            Factor = Stock.Unit3Factor,
                                            Weight = Stock.Unit3Weight,
                                            CreateDate = DateTime.Now
                                        });
                                    }
                                    else
                                    {
                                        CheckUnit.Name = Stock.Unit3Name;
                                        CheckUnit.Factor = Stock.Unit3Factor;
                                        CheckUnit.Weight = Stock.Unit3Weight;
                                        CheckUnit.CreateDate = DateTime.Now;

                                        UpdateUnitList.Add(CheckUnit);
                                    }
                                }

                                if (!Stock.Unit4Name.Trim().Equals(string.Empty))
                                {
                                    if (CheckProduct != null)
                                        CheckUnit = db.Units.FirstOrDefault(u => u.StockCode == Stock.Code && u.UnitCode == 4);

                                    if (CheckUnit == null)
                                    {
                                        InsertUnitList.Add(new Unit()
                                        {
                                            StockCode = Stock.Code,
                                            Name = Stock.Unit4Name,
                                            UnitCode = 4,
                                            Factor = Stock.Unit4Factor,
                                            Weight = Stock.Unit4Weight,
                                            CreateDate = DateTime.Now
                                        });
                                    }
                                    else
                                    {
                                        CheckUnit.Name = Stock.Unit4Name;
                                        CheckUnit.Factor = Stock.Unit4Factor;
                                        CheckUnit.Weight = Stock.Unit4Weight;
                                        CheckUnit.CreateDate = DateTime.Now;

                                        UpdateUnitList.Add(CheckUnit);
                                    }
                                }

                                #endregion

                                #region Barcode/Price

                                if (CheckProduct != null)
                                {
                                    db.barcodeModels.BulkDelete(db.barcodeModels.Where(b => b.StockCode == Stock.Code));
                                    db.prices.BulkDelete(db.prices.Where(p => p.StockCode == Stock.Code));
                                }

                                foreach (var Barcode in Stock.Barcodes)
                                {
                                    InsertBarcodeList.Add(new BarcodeModels()
                                    {
                                        Code = Barcode.Code,
                                        BatchCode = Barcode.BatchCode,
                                        StockCode = Stock.Code,
                                        BarcodeCont = Barcode.BarcodeContent,
                                        BarcodeType = Barcode.BarcodeType,
                                        Colorcode = Barcode.ColorCode,
                                        Sizecode = Barcode.SizeCode,
                                        Lot = Barcode.LotNo,
                                        IsMaster = Barcode.IsMaster,
                                        ConnectionType = Barcode.ConnectionType,
                                        UnitCode = Barcode.UnitNo,
                                        CreateDate = Barcode.CreateDate,

                                    });

                                    foreach (var Price in Barcode.StockPrices)
                                    {
                                        InsertPriceList.Add(new Prices()
                                        {
                                            StockCode = Stock.Code,
                                            BranchNo = Price.DepotNo,
                                            UnitCode = Barcode.UnitNo,
                                            Price1 = Price.Price1,
                                            Price2 = Price.Price2,
                                            Price3 = Price.Price3,
                                            Price4 = Price.Price4,
                                            Price5 = Price.Price5,
                                            Price1Prev = Price.Price1Previous,
                                            Price2Prev = Price.Price2Previous,
                                            Price3Prev = Price.Price3Previous,
                                            Price4Prev = Price.Price4Previous,
                                            Price5Prev = Price.Price5Previous,
                                            Chance1date = Price.Price1ChanceDate,
                                            Chance2date = Price.Price2ChanceDate,
                                            Chance3date = Price.Price3ChanceDate,
                                            Chance4date = Price.Price4ChanceDate,
                                            Chance5date = Price.Price5ChanceDate,
                                            CreateDate = DateTime.Now
                                        });
                                    }
                                }

                                #endregion
                            }

                            if (InsertProductList.Count > 0)
                                db.BulkInsert(InsertProductList);

                            if (UpdateProductList.Count > 0)
                                db.BulkUpdate(UpdateProductList);

                            if (InsertQuantityList.Count > 0)
                                db.BulkInsert(InsertQuantityList);

                            if (UpdateQuantityList.Count > 0)
                                db.BulkUpdate(UpdateQuantityList);

                            if (InsertUnitList.Count > 0)
                                db.BulkInsert(InsertUnitList);

                            if (UpdateUnitList.Count > 0)
                                db.BulkUpdate(UpdateUnitList);

                            db.BulkInsert(InsertBarcodeList);
                            db.BulkInsert(InsertPriceList);
                        }
                    }

                    var Update = db.UpdateDates.First();
                    Update.LastUpdateDate = EndDate;

                    db.Entry(Update).State = EntityState.Modified;
                    db.SaveChanges();
                }
                #endregion
            }
            return RedirectToAction("Index", "Home");
        }
    }
}