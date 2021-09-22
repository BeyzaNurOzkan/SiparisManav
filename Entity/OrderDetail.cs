using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class OrderDetail : BaseEntity
    {

        public string Comment { get; set; }
        public int Quantity { get; set; }
        public double SubTotal { get; set; }
        public int ProductID { get; set; }
        public int BasketID { get; set; }
        // Foreign Keys
        public int  OrderID { get; set; }
        public bool CheckBox { get; set; }



    }
}
