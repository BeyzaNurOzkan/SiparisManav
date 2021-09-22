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
    public class Message : BaseEntity
    {
        public DateTime Date { get; set; }
        public string Nessage { get; set; }
        public virtual Chat Chat { get; set; }
        public virtual User User { get; set; }
        public bool fromUser { get; set; }

        [DefaultValue(false)]
        public bool isRead { get; set; }

    }
}
