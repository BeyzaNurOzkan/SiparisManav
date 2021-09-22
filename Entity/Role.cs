using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Role : BaseEntity
    {
        public bool Visible { get; set; }
        public bool isDeleted { get; set; } 
        public string Name { get; set; }
        public int priority { get; set; }
        public virtual ICollection<User> Users { get; set; }


    }
}

