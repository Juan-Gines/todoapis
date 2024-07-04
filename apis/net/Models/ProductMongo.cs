namespace Net.Models
{
  public class ProductMongo
  {
    public required string Id { get; set; }
    public required string Name { get; set; }
    public bool Onbasket { get; set; }
  }
}