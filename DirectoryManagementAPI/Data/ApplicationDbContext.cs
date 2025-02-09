using Microsoft.EntityFrameworkCore;
using DirectoryManagementAPI.Models;

namespace DirectoryManagementAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        public DbSet<Business> Businesses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Explicitly setting the schema as dbo
            modelBuilder.Entity<Business>().ToTable("Businesses", "dbo");
            modelBuilder.Entity<Category>().ToTable("Categories", "dbo");
        }
    }
}
