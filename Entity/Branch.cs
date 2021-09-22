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
    public class Branch : BaseEntity
    {
        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string BranchName { get; set; }
        [Index]
        public int BranchCode { get; set; }
        [DefaultValue(0)]
        public int FormatID { get; set; }
        public DateTime LastUpdateDate { get; set; }
        [DefaultValue(true)]
        public bool Visible { get; set; }
        public bool isMaster { get; set; }

        public int? RegionID { get; set; }
        public int? UserID { get; set; }

        public virtual Region Regions { get; set; }
        // Foreign Keys
        public virtual ICollection<User> users { get; set; }

    }
}
