using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class EntryStockList : BaseEntity
    {
        [Index]
        public double StockQuantity { get; set; }
        public int ProductID { get; set; }
        //public int UnitCode { get; set; }
        public string Comment { get; set; }
        public int EntryStockID { get; set; }

    }
}

