using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
        [DefaultValue("//")]
        public string ProfilePhoto { get; set; }
        [DefaultValue(true)]
        public bool Visible { get; set; }
        [DefaultValue(false)]
        public bool isDeleted { get; set; }
        public bool isCenter { get; set; }
        public int LastUpdateUserID { get; set; }
        public int CreateUserID { get; set; }
        public int CurrentBranch { get; set; }
        public DateTime LastUpdateDate { get; set; }
        // Foreign Keys
        public virtual Role Roles { get; set; }
        public int RoleID { get; set; }
        public virtual ICollection<Branch> Branches { get; set; }
        public int BasketID { get; set; }
        public bool IsOnline { get; set; }
        public DateTime LastLoginDate { get; set; }
    }
}
