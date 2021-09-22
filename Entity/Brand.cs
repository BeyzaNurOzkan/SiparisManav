using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Brand : BaseEntity
    {
        [Column(TypeName = "varchar")]
        [StringLength(50)]
        public string BrandhName { get; set; }
        
        public string BrandCode { get; set; }
        public DateTime LastUpdateDate { get; set; }


        // Foreign Keys



    }
}
