using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class REContext : DbContext
    {
        public REContext() : base("PRTDatabase")
        {

        }
        public DbSet<Prices> prices { get; set; }
        public DbSet<UnitFormat> unitFormats { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Unit> Units { get; set; }
        public DbSet<Branch> Branchs { get; set; }
        public DbSet<BranchFormat> branchFormats { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<QuantityModel> quantityModels { get; set; }
        public DbSet<ProductGroup> ProductGroups { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<BarcodeModels> barcodeModels { get; set; }
        public DbSet<BasketProduct> BasketProducts { get; set; }
        public DbSet<ProductGroup2> ProductGroup2s { get; set; }
        public DbSet<ProductGroup3> ProductGroup3s { get; set; }

        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<QuantityFormat> quantityFormats { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
