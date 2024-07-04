namespace Net.Models
{
  public class Product
  {
    public long Id { get; set; }
    public required string Name { get; set; }
    public bool Onbasket { get; set; }
  }
}