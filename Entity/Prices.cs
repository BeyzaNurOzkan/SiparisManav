using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Prices : BaseEntity
    {
        [Index]
        [Column(TypeName = "varchar")]
        [StringLength(27)]
        public string StockCode { get; set; }
        public int BranchNo { get; set; }
        [Index]
        public double Price1 { get; set; }


        // Foreign Keys
     
      
    }
}
