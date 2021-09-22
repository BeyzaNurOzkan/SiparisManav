using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class BasketProduct :BaseEntity
    {
        public string Comment { get; set; }
        public int Quantity { get; set; }
        public double SubTotal { get; set; }
        public int ProductID { get; set; }
        public int BasketID { get; set; }
        public bool CheckBox { get; set; }


    }
}
