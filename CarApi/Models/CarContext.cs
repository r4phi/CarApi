using Microsoft.EntityFrameworkCore;

namespace CarApi.Models;

public class CarContext : DbContext
{
    public CarContext(DbContextOptions<CarContext> options) : base(options)
    {
    }

    public DbSet<Car> Cars { get; set; } = null!;
}