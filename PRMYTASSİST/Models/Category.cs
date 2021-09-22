using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PRMYTASSİST.Models
{
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Name3 { get; set; }
        public string Code3 { get; set; }
        public string Code { get; set; }
        public DateTime CreateDate { get; set; }
        public string ProfilePhoto { get; set; }
        public string CodeRand { get; set; }
        public bool isDeleted { get; set; }

    }
}