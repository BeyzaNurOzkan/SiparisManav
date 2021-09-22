using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class EntryStock : BaseEntity
    {
        [Index]
        public int BranchID { get; set; }
        public string UserName { get; set; }
        public int StoreCode { get; set; }
        public int NumberofProduct { get; set; }
        //public int UnitCode { get; set; }
        public int UserID { get; set; }
        public ICollection<EntryStockList> entryStockLists { get; set; }

    }
}

