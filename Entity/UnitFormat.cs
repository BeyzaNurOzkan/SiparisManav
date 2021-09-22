using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class UnitFormat : BaseEntity
    {
        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string UnitName { get; set; }
        [Index]
        public DateTime LastUpdateDate { get; set; }
        public int UserID { get; set; }
        public double Factor { get; set; }
        public double Weight { get; set; }
    }
}
