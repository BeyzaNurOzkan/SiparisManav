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
    public class Notification : BaseEntity
    {
        public string Content { get; set; }
        public virtual User SendUser { get; set; }
        public virtual User ComeUser { get; set; }
        public DateTime lastNotificationTime { get; set; }
        [DefaultValue(false)]
        public bool isRead { get; set; }
        public int Control { get; set; }
        public int Control2 { get; set; }
    }
}
