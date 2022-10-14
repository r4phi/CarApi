namespace CarApi.Models;

public class Car
{
    public long Id { get; set; }
    public string Manufacturer { get; set; }
    public string Type { get; set; }
    public string Salesprice { get; set; }
    public DateTime NextCheck { get; set; }
    public int Power { get; set; }
    public int Km { get; set; }
}