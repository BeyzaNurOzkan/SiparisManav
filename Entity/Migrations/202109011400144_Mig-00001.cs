namespace Entity.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Mig00001 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Roles", "priority", c => c.Int(nullable: false));
            AddColumn("dbo.EntryStocks", "UserName", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.EntryStocks", "UserName");
            DropColumn("dbo.Roles", "priority");
        }
    }
}
