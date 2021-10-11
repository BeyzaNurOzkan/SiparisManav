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
    public class Product : BaseEntity
    {
        [Column(TypeName = "varchar")]
        [StringLength(150)]
        public string Name { get; set; }
        [Index(IsUnique=true) ]
        [Column(TypeName = "varchar")]
        [StringLength(27)]
        public string ProductCode { get; set; }
        //public string ProductPhoto { get; set; }
        public bool Visible { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public bool isDeleted { get; set; }

        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string SectorCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string RayonCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string BrandCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string ModelCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string RawMaterialCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string SeasonCode { get; set; }
        [Column(TypeName = "varchar")]
        [StringLength(25)]
        public string PlaceCode { get; set; }
        [DefaultValue(0)]
        public int ProductGroup2ID { get; set; }
        [DefaultValue(0)]
        public int ProductGroup3ID { get; set; }
        [DefaultValue(0)]
        public string Photo { get; set; }
        // Foreign Keys
    }
}
