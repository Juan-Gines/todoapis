namespace Net.Models // Asegúrate de cambiar 'YourNamespace' al espacio de nombres correcto de tu proyecto
{
  public class Product
  {
    public long Id { get; set; }
    public required string Name { get; set; }
    public bool OnBasket { get; set; }
  }
}