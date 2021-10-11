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
        public string Name { get; set; }
        // Foreign Keys
        public int ProductGroup2ID { get; set; }
    }
}
