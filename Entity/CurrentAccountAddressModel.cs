using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class CurrentAccountAddressModel : BaseEntity
    {
       
        public string CurrentAccountCode { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public string Phone1 { get; set; }
        public string Phone2 { get; set; }
        public int AddressNo { get; set; }



    }
}
