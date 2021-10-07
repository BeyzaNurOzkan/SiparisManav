using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class ProductGroup : BaseEntity
    {
        public string CodeRand { get; set; }
        public string Name { get; set; }
        public bool isVisible { get; set; }
        public bool isDeleted { get; set; }
        public int Priority { get; set; }

        public string Code { get; set; }
        // Foreign Keys
        public virtual ICollection<ProductGroup2> ProductGroup2s { get; set; }


    }
}
