namespace Entity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class mig02 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ProductGroup2", "ProductGroupID", "dbo.ProductGroups");
            DropIndex("dbo.BranchFormats", new[] { "FormatCode" });
            DropIndex("dbo.Prices", new[] { "BranchNo" });
            DropIndex("dbo.Prices", new[] { "UnitCode" });
            DropIndex("dbo.ProductGroup2", new[] { "ProductGroupID" });
            CreateIndex("dbo.BranchFormats", "Visible");
            CreateIndex("dbo.Prices", "Price1");
            DropColumn("dbo.BarcodeModels", "BatchCode");
            DropColumn("dbo.BarcodeModels", "UnitCode");
            DropColumn("dbo.BarcodeModels", "Lot");
            DropColumn("dbo.BarcodeModels", "BarcodeType");
            DropColumn("dbo.BarcodeModels", "BarcodeCont");
            DropColumn("dbo.BarcodeModels", "ConnectionType");
            DropColumn("dbo.BarcodeModels", "Sizecode");
            DropColumn("dbo.BarcodeModels", "Colorcode");
            DropColumn("dbo.BranchFormats", "FormatCode");
            DropColumn("dbo.BranchFormats", "LastUpdateDate");
            DropColumn("dbo.BranchFormats", "UserID");
            DropColumn("dbo.Branches", "RegionID");
            DropColumn("dbo.Branches", "UserID");
            DropColumn("dbo.Roles", "Visible");
            DropColumn("dbo.Roles", "isDeleted");
            DropColumn("dbo.Roles", "priority");
            DropColumn("dbo.Prices", "UnitCode");
            DropColumn("dbo.Prices", "Chance1date");
            DropColumn("dbo.Prices", "Price1Prev");
            DropColumn("dbo.Prices", "Chance2date");
            DropColumn("dbo.Prices", "Price2Prev");
            DropColumn("dbo.Prices", "Price2");
            DropColumn("dbo.Prices", "Chance3date");
            DropColumn("dbo.Prices", "Price3Prev");
            DropColumn("dbo.Prices", "Price3");
            DropColumn("dbo.Prices", "Chance4date");
            DropColumn("dbo.Prices", "Price4Prev");
            DropColumn("dbo.Prices", "Price4");
            DropColumn("dbo.Prices", "Chance5date");
            DropColumn("dbo.Prices", "Price5Prev");
            DropColumn("dbo.Prices", "Price5");
            DropColumn("dbo.ProductGroup2", "Code");
            DropColumn("dbo.ProductGroup2", "isVisible");
            DropColumn("dbo.ProductGroup2", "isDeleted");
            DropColumn("dbo.ProductGroups", "CodeRand");
            DropColumn("dbo.ProductGroups", "isVisible");
            DropColumn("dbo.ProductGroups", "isDeleted");
            DropColumn("dbo.ProductGroups", "Code");
            DropColumn("dbo.ProductGroup3", "CodeRand");
            DropColumn("dbo.ProductGroup3", "Code");
            DropColumn("dbo.ProductGroup3", "Photo");
            DropColumn("dbo.ProductGroup3", "isVisible");
            DropColumn("dbo.ProductGroup3", "isDeleted");
            DropColumn("dbo.Products", "LastUpdateUserID");
            DropColumn("dbo.Products", "CreateUserID");
            DropColumn("dbo.Products", "ManufacturerCode");
            DropColumn("dbo.Products", "ResponsibilityCenterCode");
            DropColumn("dbo.Products", "ProductGroupID");
            DropColumn("dbo.Products", "ProductGroup4ID");
            DropColumn("dbo.Products", "ProductGroup5ID");
            DropColumn("dbo.Products", "WholeSaleTaxCode");
            DropColumn("dbo.Products", "WholeSaleTaxPercentage");
            DropColumn("dbo.Products", "RetailTaxCode");
            DropColumn("dbo.Products", "IsLocked");
            DropColumn("dbo.Products", "IsRegisterWeighted");
            DropColumn("dbo.Products", "ShortName");
            DropColumn("dbo.Products", "ForeignKey");
            DropColumn("dbo.Products", "RetailTaxPercentage");
            DropColumn("dbo.Products", "CategoryCode");
            DropColumn("dbo.Products", "MainGroupCode");
            DropColumn("dbo.Products", "SubGroupCode");
            DropColumn("dbo.Products", "SectionCode");
            DropColumn("dbo.Products", "QualintyControlCode");
            DropColumn("dbo.Products", "Shelflife");
            DropColumn("dbo.QuantityModels", "MaxCapacity");
            DropColumn("dbo.QuantityModels", "MinCapacity");
            DropColumn("dbo.QuantityModels", "Comment");
            DropColumn("dbo.Settings", "Name");
            DropColumn("dbo.Units", "isDeleted");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Units", "isDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Settings", "Name", c => c.String());
            AddColumn("dbo.QuantityModels", "Comment", c => c.String());
            AddColumn("dbo.QuantityModels", "MinCapacity", c => c.Int(nullable: false));
            AddColumn("dbo.QuantityModels", "MaxCapacity", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "Shelflife", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "QualintyControlCode", c => c.String());
            AddColumn("dbo.Products", "SectionCode", c => c.String());
            AddColumn("dbo.Products", "SubGroupCode", c => c.String());
            AddColumn("dbo.Products", "MainGroupCode", c => c.String());
            AddColumn("dbo.Products", "CategoryCode", c => c.String());
            AddColumn("dbo.Products", "RetailTaxPercentage", c => c.Double(nullable: false));
            AddColumn("dbo.Products", "ForeignKey", c => c.String());
            AddColumn("dbo.Products", "ShortName", c => c.String());
            AddColumn("dbo.Products", "IsRegisterWeighted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Products", "IsLocked", c => c.Boolean(nullable: false));
            AddColumn("dbo.Products", "RetailTaxCode", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "WholeSaleTaxPercentage", c => c.Double(nullable: false));
            AddColumn("dbo.Products", "WholeSaleTaxCode", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "ProductGroup5ID", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "ProductGroup4ID", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "ProductGroupID", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "ResponsibilityCenterCode", c => c.String());
            AddColumn("dbo.Products", "ManufacturerCode", c => c.String());
            AddColumn("dbo.Products", "CreateUserID", c => c.Int(nullable: false));
            AddColumn("dbo.Products", "LastUpdateUserID", c => c.Int(nullable: false));
            AddColumn("dbo.ProductGroup3", "isDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductGroup3", "isVisible", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductGroup3", "Photo", c => c.String());
            AddColumn("dbo.ProductGroup3", "Code", c => c.String());
            AddColumn("dbo.ProductGroup3", "CodeRand", c => c.String());
            AddColumn("dbo.ProductGroups", "Code", c => c.String());
            AddColumn("dbo.ProductGroups", "isDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductGroups", "isVisible", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductGroups", "CodeRand", c => c.String());
            AddColumn("dbo.ProductGroup2", "isDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductGroup2", "isVisible", c => c.Boolean(nullable: false));
            AddColumn("dbo.ProductGroup2", "Code", c => c.String());
            AddColumn("dbo.Prices", "Price5", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Price5Prev", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Chance5date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Prices", "Price4", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Price4Prev", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Chance4date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Prices", "Price3", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Price3Prev", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Chance3date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Prices", "Price2", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Price2Prev", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Chance2date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Prices", "Price1Prev", c => c.Double(nullable: false));
            AddColumn("dbo.Prices", "Chance1date", c => c.DateTime(nullable: false));
            AddColumn("dbo.Prices", "UnitCode", c => c.Int(nullable: false));
            AddColumn("dbo.Roles", "priority", c => c.Int(nullable: false));
            AddColumn("dbo.Roles", "isDeleted", c => c.Boolean(nullable: false));
            AddColumn("dbo.Roles", "Visible", c => c.Boolean(nullable: false));
            AddColumn("dbo.Branches", "UserID", c => c.Int());
            AddColumn("dbo.Branches", "RegionID", c => c.Int());
            AddColumn("dbo.BranchFormats", "UserID", c => c.Int(nullable: false));
            AddColumn("dbo.BranchFormats", "LastUpdateDate", c => c.DateTime(nullable: false));
            AddColumn("dbo.BranchFormats", "FormatCode", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "Colorcode", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "Sizecode", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "ConnectionType", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "BarcodeCont", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "BarcodeType", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "Lot", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "UnitCode", c => c.Int(nullable: false));
            AddColumn("dbo.BarcodeModels", "BatchCode", c => c.String());
            DropIndex("dbo.Prices", new[] { "Price1" });
            DropIndex("dbo.BranchFormats", new[] { "Visible" });
            CreateIndex("dbo.ProductGroup2", "ProductGroupID");
            CreateIndex("dbo.Prices", "UnitCode");
            CreateIndex("dbo.Prices", "BranchNo");
            CreateIndex("dbo.BranchFormats", "FormatCode");
            AddForeignKey("dbo.ProductGroup2", "ProductGroupID", "dbo.ProductGroups", "ID", cascadeDelete: true);
        }
    }
}
