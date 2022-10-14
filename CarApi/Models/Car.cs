namespace CarApi.Models;

public class Car
{
    public int Id { get; set; }
    private string Manufacturer { get; set; }
    private string Type { get; set; }
    private double Salesprice { get; set; }
    private DateTime NextCheck { get; set; }
    private int Power { get; set; }
    private int Km { get; set; }
}