namespace Entity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mig01 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BarcodeModels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        StockCode = c.String(maxLength: 27, unicode: false),
                        BatchCode = c.String(),
                        Code = c.String(),
                        UnitCode = c.Int(nullable: false),
                        Lot = c.Int(nullable: false),
                        BarcodeType = c.Int(nullable: false),
                        BarcodeCont = c.Int(nullable: false),
                        ConnectionType = c.Int(nullable: false),
                        Sizecode = c.Int(nullable: false),
                        Colorcode = c.Int(nullable: false),
                        IsMaster = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.StockCode);
            
            CreateTable(
                "dbo.BasketProducts",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Quantity = c.Int(nullable: false),
                        SubTotal = c.Double(nullable: false),
                        ProductID = c.Int(nullable: false),
                        BasketID = c.Int(nullable: false),
                        CheckBox = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Baskets",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Code = c.Int(nullable: false),
                        UserID = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.Code);
            
            CreateTable(
                "dbo.BranchFormats",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FormatName = c.String(maxLength: 50, unicode: false),
                        FormatCode = c.Int(nullable: false),
                        LastUpdateDate = c.DateTime(nullable: false),
                        Visible = c.Boolean(nullable: false),
                        UserID = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.FormatCode);
            
            CreateTable(
                "dbo.Branches",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        BranchName = c.String(maxLength: 50, unicode: false),
                        BranchCode = c.Int(nullable: false),
                        FormatID = c.Int(nullable: false),
                        LastUpdateDate = c.DateTime(nullable: false),
                        Visible = c.Boolean(nullable: false),
                        isMaster = c.Boolean(nullable: false),
                        RegionID = c.Int(),
                        UserID = c.Int(),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.BranchCode);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FirstName = c.String(),
                        LastName = c.String(),
                        EMail = c.String(),
                        Password = c.String(),
                        ProfilePhoto = c.String(),
                        Visible = c.Boolean(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        isCenter = c.Boolean(nullable: false),
                        LastUpdateUserID = c.Int(nullable: false),
                        CreateUserID = c.Int(nullable: false),
                        CurrentBranch = c.Int(nullable: false),
                        LastUpdateDate = c.DateTime(nullable: false),
                        RoleID = c.Int(nullable: false),
                        BasketID = c.Int(nullable: false),
                        IsOnline = c.Boolean(nullable: false),
                        LastLoginDate = c.DateTime(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Roles", t => t.RoleID, cascadeDelete: true)
                .Index(t => t.RoleID);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Visible = c.Boolean(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        Name = c.String(),
                        priority = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Notifications",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Content = c.String(),
                        lastNotificationTime = c.DateTime(nullable: false),
                        isRead = c.Boolean(nullable: false),
                        Control = c.Int(nullable: false),
                        Control2 = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                        ComeUser_ID = c.Int(),
                        SendUser_ID = c.Int(),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Users", t => t.ComeUser_ID)
                .ForeignKey("dbo.Users", t => t.SendUser_ID)
                .Index(t => t.ComeUser_ID)
                .Index(t => t.SendUser_ID);
            
            CreateTable(
                "dbo.OrderDetails",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Comment = c.String(),
                        Quantity = c.Int(nullable: false),
                        SubTotal = c.Double(nullable: false),
                        ProductID = c.Int(nullable: false),
                        BasketID = c.Int(nullable: false),
                        OrderID = c.Int(nullable: false),
                        CheckBox = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.Orders", t => t.OrderID, cascadeDelete: true)
                .Index(t => t.OrderID);
            
            CreateTable(
                "dbo.Orders",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        OrderNo = c.Int(nullable: false),
                        NumberofProduct = c.Int(nullable: false),
                        BranchCode = c.Int(nullable: false),
                        ApprovalStatus = c.Int(nullable: false),
                        userID = c.Int(),
                        userName = c.String(),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.Prices",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        StockCode = c.String(maxLength: 27, unicode: false),
                        BranchNo = c.Int(nullable: false),
                        UnitCode = c.Int(nullable: false),
                        Chance1date = c.DateTime(nullable: false),
                        Price1Prev = c.Double(nullable: false),
                        Price1 = c.Double(nullable: false),
                        Chance2date = c.DateTime(nullable: false),
                        Price2Prev = c.Double(nullable: false),
                        Price2 = c.Double(nullable: false),
                        Chance3date = c.DateTime(nullable: false),
                        Price3Prev = c.Double(nullable: false),
                        Price3 = c.Double(nullable: false),
                        Chance4date = c.DateTime(nullable: false),
                        Price4Prev = c.Double(nullable: false),
                        Price4 = c.Double(nullable: false),
                        Chance5date = c.DateTime(nullable: false),
                        Price5Prev = c.Double(nullable: false),
                        Price5 = c.Double(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.StockCode)
                .Index(t => t.BranchNo)
                .Index(t => t.UnitCode);
            
            CreateTable(
                "dbo.ProductGroup2",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CodeRand = c.String(),
                        Code = c.String(),
                        Name = c.String(),
                        isVisible = c.Boolean(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        ProductGroupID = c.Int(nullable: false),
                        Priority = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.ProductGroups", t => t.ProductGroupID, cascadeDelete: true)
                .Index(t => t.ProductGroupID);
            
            CreateTable(
                "dbo.ProductGroups",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CodeRand = c.String(),
                        Name = c.String(),
                        isVisible = c.Boolean(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        Priority = c.Int(nullable: false),
                        Code = c.String(),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.ProductGroup3",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        CodeRand = c.String(),
                        Code = c.String(),
                        Photo = c.String(),
                        Name = c.String(),
                        isVisible = c.Boolean(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        ProductGroup2ID = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .ForeignKey("dbo.ProductGroup2", t => t.ProductGroup2ID, cascadeDelete: true)
                .Index(t => t.ProductGroup2ID);
            
            CreateTable(
                "dbo.Products",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 150, unicode: false),
                        ProductCode = c.String(maxLength: 27, unicode: false),
                        Visible = c.Boolean(nullable: false),
                        LastUpdateDate = c.DateTime(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        LastUpdateUserID = c.Int(nullable: false),
                        CreateUserID = c.Int(nullable: false),
                        SectorCode = c.String(maxLength: 25, unicode: false),
                        RayonCode = c.String(maxLength: 25, unicode: false),
                        BrandCode = c.String(maxLength: 25, unicode: false),
                        ModelCode = c.String(maxLength: 25, unicode: false),
                        RawMaterialCode = c.String(maxLength: 25, unicode: false),
                        SeasonCode = c.String(maxLength: 25, unicode: false),
                        PlaceCode = c.String(maxLength: 25, unicode: false),
                        ManufacturerCode = c.String(),
                        ResponsibilityCenterCode = c.String(),
                        ProductGroupID = c.Int(nullable: false),
                        ProductGroup2ID = c.Int(nullable: false),
                        ProductGroup3ID = c.Int(nullable: false),
                        ProductGroup4ID = c.Int(nullable: false),
                        ProductGroup5ID = c.Int(nullable: false),
                        WholeSaleTaxCode = c.Int(nullable: false),
                        WholeSaleTaxPercentage = c.Double(nullable: false),
                        RetailTaxCode = c.Int(nullable: false),
                        IsLocked = c.Boolean(nullable: false),
                        IsRegisterWeighted = c.Boolean(nullable: false),
                        ShortName = c.String(),
                        ForeignKey = c.String(),
                        RetailTaxPercentage = c.Double(nullable: false),
                        CategoryCode = c.String(),
                        MainGroupCode = c.String(),
                        SubGroupCode = c.String(),
                        Photo = c.String(),
                        SectionCode = c.String(),
                        QualintyControlCode = c.String(),
                        Shelflife = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.ProductCode, unique: true);
            
            CreateTable(
                "dbo.QuantityFormats",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        FormatID = c.Int(nullable: false),
                        StockCode = c.String(maxLength: 27, unicode: false),
                        Capacity = c.Int(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.FormatID)
                .Index(t => t.StockCode);
            
            CreateTable(
                "dbo.QuantityModels",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        BranchCode = c.Int(nullable: false),
                        StockQuantity = c.Double(nullable: false),
                        StockCode = c.String(maxLength: 27, unicode: false),
                        MaxCapacity = c.Int(nullable: false),
                        MinCapacity = c.Int(nullable: false),
                        Comment = c.String(),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.BranchCode)
                .Index(t => t.StockCode);
            
            CreateTable(
                "dbo.Settings",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        SettingsCode = c.Int(nullable: false),
                        Value = c.String(),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID);
            
            CreateTable(
                "dbo.UnitFormats",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        UnitName = c.String(maxLength: 50, unicode: false),
                        LastUpdateDate = c.DateTime(nullable: false),
                        UserID = c.Int(nullable: false),
                        Factor = c.Double(nullable: false),
                        Weight = c.Double(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.LastUpdateDate);
            
            CreateTable(
                "dbo.Units",
                c => new
                    {
                        ID = c.Int(nullable: false, identity: true),
                        StockCode = c.String(maxLength: 27, unicode: false),
                        Name = c.String(maxLength: 10, unicode: false),
                        UnitCode = c.Int(nullable: false),
                        Factor = c.Double(nullable: false),
                        Weight = c.Double(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        CreateDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.ID)
                .Index(t => t.StockCode)
                .Index(t => t.UnitCode);
            
            CreateTable(
                "dbo.UserBranches",
                c => new
                    {
                        User_ID = c.Int(nullable: false),
                        Branch_ID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.User_ID, t.Branch_ID })
                .ForeignKey("dbo.Users", t => t.User_ID, cascadeDelete: true)
                .ForeignKey("dbo.Branches", t => t.Branch_ID, cascadeDelete: true)
                .Index(t => t.User_ID)
                .Index(t => t.Branch_ID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ProductGroup3", "ProductGroup2ID", "dbo.ProductGroup2");
            DropForeignKey("dbo.ProductGroup2", "ProductGroupID", "dbo.ProductGroups");
            DropForeignKey("dbo.OrderDetails", "OrderID", "dbo.Orders");
            DropForeignKey("dbo.Notifications", "SendUser_ID", "dbo.Users");
            DropForeignKey("dbo.Notifications", "ComeUser_ID", "dbo.Users");
            DropForeignKey("dbo.Users", "RoleID", "dbo.Roles");
            DropForeignKey("dbo.UserBranches", "Branch_ID", "dbo.Branches");
            DropForeignKey("dbo.UserBranches", "User_ID", "dbo.Users");
            DropIndex("dbo.UserBranches", new[] { "Branch_ID" });
            DropIndex("dbo.UserBranches", new[] { "User_ID" });
            DropIndex("dbo.Units", new[] { "UnitCode" });
            DropIndex("dbo.Units", new[] { "StockCode" });
            DropIndex("dbo.UnitFormats", new[] { "LastUpdateDate" });
            DropIndex("dbo.QuantityModels", new[] { "StockCode" });
            DropIndex("dbo.QuantityModels", new[] { "BranchCode" });
            DropIndex("dbo.QuantityFormats", new[] { "StockCode" });
            DropIndex("dbo.QuantityFormats", new[] { "FormatID" });
            DropIndex("dbo.Products", new[] { "ProductCode" });
            DropIndex("dbo.ProductGroup3", new[] { "ProductGroup2ID" });
            DropIndex("dbo.ProductGroup2", new[] { "ProductGroupID" });
            DropIndex("dbo.Prices", new[] { "UnitCode" });
            DropIndex("dbo.Prices", new[] { "BranchNo" });
            DropIndex("dbo.Prices", new[] { "StockCode" });
            DropIndex("dbo.OrderDetails", new[] { "OrderID" });
            DropIndex("dbo.Notifications", new[] { "SendUser_ID" });
            DropIndex("dbo.Notifications", new[] { "ComeUser_ID" });
            DropIndex("dbo.Users", new[] { "RoleID" });
            DropIndex("dbo.Branches", new[] { "BranchCode" });
            DropIndex("dbo.BranchFormats", new[] { "FormatCode" });
            DropIndex("dbo.Baskets", new[] { "Code" });
            DropIndex("dbo.BarcodeModels", new[] { "StockCode" });
            DropTable("dbo.UserBranches");
            DropTable("dbo.Units");
            DropTable("dbo.UnitFormats");
            DropTable("dbo.Settings");
            DropTable("dbo.QuantityModels");
            DropTable("dbo.QuantityFormats");
            DropTable("dbo.Products");
            DropTable("dbo.ProductGroup3");
            DropTable("dbo.ProductGroups");
            DropTable("dbo.ProductGroup2");
            DropTable("dbo.Prices");
            DropTable("dbo.Orders");
            DropTable("dbo.OrderDetails");
            DropTable("dbo.Notifications");
            DropTable("dbo.Roles");
            DropTable("dbo.Users");
            DropTable("dbo.Branches");
            DropTable("dbo.BranchFormats");
            DropTable("dbo.Baskets");
            DropTable("dbo.BasketProducts");
            DropTable("dbo.BarcodeModels");
        }
    }
}
