using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class ProductGroup4 : BaseEntity
    {
        public string CodeRand { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool isVisible { get; set; }
        public bool isDeleted { get; set; }
        // Foreign Keys
        public int ProductGroup3ID { get; set; }
        public virtual ProductGroup3 ProductGroups3 { get; set; }
        public virtual ICollection<ProductGroup5> ProductGroups5 { get; set; }
    }
}
