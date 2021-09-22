using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class ProductGroup5 : BaseEntity
    {
        public string CodeRand { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool isVisible { get; set; }
        public bool isDeleted { get; set; }
        // Foreign Keys
        public int ProductGroup4ID { get; set; }
        public virtual ProductGroup4 ProductGroups4 { get; set; }

    }
}
