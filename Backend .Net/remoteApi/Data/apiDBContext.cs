using Microsoft.EntityFrameworkCore;
using remoteApi.Models;

namespace remoteApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<Solicitud> Solicitudes => Set<Solicitud>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Solicitud>(entity =>
        {
            entity.HasKey(x => x.Id);

            entity.Property(x => x.Id)
                .ValueGeneratedNever();
        });
    }
}