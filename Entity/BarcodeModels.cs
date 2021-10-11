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
        public string Code { get; set; }
        public Boolean IsMaster { get; set; }
    }
}
