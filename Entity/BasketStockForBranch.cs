using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class BasketStockForBranch : BaseEntity
    {
        public double StockQuantity { get; set; }
        public int ProductID { get; set; }
        //public int UnitCode { get; set; }
        public string Comment { get; set; }
        public int UserID { get; set; }
        public int BranchID { get; set; }
    }
}
