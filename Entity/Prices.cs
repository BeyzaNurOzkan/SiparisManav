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

        [Index]
        public int BranchNo { get; set; }
        [Index]
        public int UnitCode { get; set; }
                        
        public DateTime Chance1date { get; set; }
        public double Price1Prev { get; set; }
        public double Price1 { get; set; }
        public DateTime Chance2date { get; set; }
        public double Price2Prev { get; set; }
        public double Price2 { get; set; }
        public DateTime Chance3date { get; set; }
        public double Price3Prev { get; set; }
        public double Price3 { get; set; }
        public DateTime Chance4date { get; set; }
        public double Price4Prev { get; set; }
        public double Price4 { get; set; }
        public DateTime Chance5date { get; set; }
        public double Price5Prev { get; set; }
        public double Price5 { get; set; }

        // Foreign Keys
     
      
    }
}
