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
    public class Region : BaseEntity
    {
        public string Name { get; set; }
        public bool Visible { get; set; }
        public bool IsDeleted { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }
    }
}
