using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class ProductGroup3 : BaseEntity
    {
        public string CodeRand { get; set; }
        public string Code { get; set; }
        public string Photo { get; set; }
        public string Name { get; set; }
        public bool isVisible { get; set; }
        public bool isDeleted { get; set; }
        // Foreign Keys
        public int ProductGroup2ID { get; set; }
        public virtual ProductGroup2 ProductGroups2 { get; set; }
        public virtual ICollection<ProductGroup4> ProductGroups4 { get; set; }
    }
}
