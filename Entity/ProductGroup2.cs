using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//DBCC CHECKIDENT (‘ders’, RESEED, 0)

namespace Entity
{
    public class ProductGroup2 : BaseEntity
    {
        
        public string CodeRand { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool isVisible { get; set; }
        public bool isDeleted { get; set; }
        // Foreign Keys
        public int ProductGroupID { get; set; }
        public int Priority { get; set; }

        public virtual ProductGroup ProductGroups { get; set; }
        public virtual ICollection<ProductGroup3> ProductGroups3 { get; set; }

    }
}
