using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class CurrentAccountModel : BaseEntity
    {
        public string CurrentAccountCode { get; set; }
        public string title1 { get; set; }
        public string title2 { get; set; }
        public string RepresentativeCode { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public string TaxOffice { get; set; }
        public string TaxNumber { get; set; }
        public int BillingAddressNo { get; set; }
        public int ShippingAddressNo { get; set; }
        public string Email { get; set; }
        public string MobilePhoneNumber { get; set; }
        public string GroupCode { get; set; }
        public string SectorCode { get; set; }
        public bool IsEInvoice { get; set; }
        // Foreign Keys
    }
}
