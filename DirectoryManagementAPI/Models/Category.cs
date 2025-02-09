using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DirectoryManagementAPI.Models
{
    public class Category
    {
        [Key]
        [Column("CategoryID")]
        public int CategoryID { get; set; }

        public string Name { get; set; }
    }
}
