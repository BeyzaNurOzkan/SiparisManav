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
    public class Chat : BaseEntity
    {
        public string chatSubject { get; set; }
        public virtual User User { get; set; }
        public bool ownerIsUser { get; set; }
        public virtual User User2 { get; set; }
        public DateTime lastMessageTime { get; set; }
    }
}
