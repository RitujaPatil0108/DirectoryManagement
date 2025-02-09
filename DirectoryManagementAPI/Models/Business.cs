using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DirectoryManagementAPI.Models
{
    public class Business
    {
        [Key]
        [Column("BusinessID")]
        public int BusinessID { get; set; } 

        [Required]
        public string Name { get; set; }
        
        public string Address { get; set; }
        
        public string City { get; set; }
        
        public string State { get; set; }
        
        public string ZipCode { get; set; }
        
        public string PhoneNumber { get; set; }
        
        public string Website { get; set; }
        
        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; }

        [ForeignKey("categoryId")]
        public int CategoryId { get; set; }

        public DateTime CreatedAt { get; set; }
        
        public DateTime UpdatedAt { get; set; }
    }
}
