using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Query
    {
        private static REContext db = new REContext();
        public static List<ProductGroup> ProductGroups()
        {
            return db.ProductGroups.AsNoTracking().ToList();
        }
        public static List<Order> orders()
        {
            return db.Orders.AsNoTracking().ToList();
        }
        public static List<OrderDetail> orderDetails()
        {
            return db.OrderDetails.AsNoTracking().ToList();
        }
        public static List<Settings> settings()
        {
            return db.Settings.AsNoTracking().ToList();
        }
      
        public static List<Product> Product()
        {
            return db.Products.AsNoTracking().ToList();
        }
        public static List<Branch> Branches()
        {
            return db.Branchs.AsNoTracking().ToList();
        }

        public static List<User> Users()
        {
            return db.Users.AsNoTracking().ToList();
        }
        public static List<ProductGroup3> ProductGroup3s()
        {
            return db.ProductGroup3s.AsNoTracking().ToList();
        }
      
        public static List<ProductGroup2> ProductGroup2s(int id)
        {
            return db.ProductGroup2s.Where(x => x.ProductGroupID == id).AsNoTracking().ToList();
        }
        public static List<ProductGroup2> ProductGroup2ID(int id)
        {
            return db.ProductGroup2s.Where(x => x.ID == id).AsNoTracking().ToList();
        }
        public static List<ProductGroup2> ProductGroup2s()
        {
            return db.ProductGroup2s.AsNoTracking().ToList();
        }
        public static List<Branch> getBranches()
        {
            return db.Branchs.AsNoTracking().ToList();
        }
        public static List<Role> getRoles()
        {
            return db.Roles.AsNoTracking().ToList();
        }
        public static List<BranchFormat> getBranchFormat()
        {
            return db.branchFormats.AsNoTracking().ToList();
        }
    }
}
