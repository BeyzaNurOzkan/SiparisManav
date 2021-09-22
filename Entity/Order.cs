using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Order : BaseEntity
    {
        public int OrderNo { get; set; }
        public int NumberofProduct { get; set; } 
        public int BranchCode { get; set; }
        [DefaultValue(0)]
        public int ApprovalStatus { get; set; }
        // Foreign Keys
       public ICollection<OrderDetail> orderDetails { get; set; }
        public int? userID { get; set; }
        public string userName { get; set; }


    }
}
