using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class BranchFormat : BaseEntity
    {
        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string FormatName { get; set; }
        [Index]
        public int FormatCode { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public bool Visible { get; set; }
        public int UserID { get; set; }
    }
}
