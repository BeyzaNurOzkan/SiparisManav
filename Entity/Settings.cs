using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Settings : BaseEntity
    {
        public string Name { get; set; }
        public int SettingsCode { get; set; }
        public string Value { get; set; }
    }
}
