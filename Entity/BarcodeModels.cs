using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class BarcodeModels : BaseEntity
    {
        [Column(TypeName = "varchar")]
        [StringLength(27)]
        [Index]
        public string StockCode { get; set; }
        public string BatchCode { get; set; }
        
        public string Code { get; set; }
        public int UnitCode { get; set; }
        public int Lot { get; set; }
        public int BarcodeType { get; set; }
        public int BarcodeCont { get; set; }
        public int ConnectionType { get; set; }
        public int Sizecode { get; set; }
        public int Colorcode { get; set; }
        public Boolean IsMaster { get; set; }
    }
}
