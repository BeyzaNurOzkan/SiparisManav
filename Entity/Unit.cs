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
    public class Unit : BaseEntity
    {
        [Index]
        [Column(TypeName = "varchar")]
        [StringLength(27)]
        public string StockCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(10)]
        public string Name { get; set; }
        [Index]
        public int UnitCode { get; set; }

        public double Factor { get; set; }
        
        public double Weight { get; set; }
        
        public bool isDeleted { get; set; }
        // Foreign Keys
       
       
    }
}
