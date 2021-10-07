namespace Entity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Mig00003 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ProductGroup2", "Priority", c => c.Int(nullable: false));
            AddColumn("dbo.ProductGroups", "Priority", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ProductGroups", "Priority");
            DropColumn("dbo.ProductGroup2", "Priority");
        }
    }
}
