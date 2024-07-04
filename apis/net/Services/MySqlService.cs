using System.Data;
using MySql.Data.MySqlClient;
using Net.Models;

namespace Net.Services
{
  public class MySqlService
  {
    private readonly string _connectionString;
    private readonly MySqlConnection connection;

    public MySqlService()
    {
      _connectionString = Environment.GetEnvironmentVariable("MYSQL_CONNECTION")
          ?? throw new InvalidOperationException("MYSQL_CONNECTION environment variable is not set.");
      connection = new MySqlConnection(_connectionString);
    }

    public async Task<List<Product>> GetDataAsync()
    {
      var resultList = new List<Product>();

      try
      {

        await connection.OpenAsync();

        await using var command = new MySqlCommand("SELECT Id, Name, OnBasket FROM products;", connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
          var product = new Product
          {
            Id = reader.GetInt32("Id"),
            Name = reader.GetString("Name"),
            OnBasket = reader.GetBoolean("Onbasket")
          };
          resultList.Add(product);
        }
      }
      catch (MySqlException ex)
      {
        Console.WriteLine($"MySQL Error: {ex.Message}");
        throw;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"General Error: {ex.Message}");
        throw;
      }


      return resultList;
    }

    public async Task CreateProductAsync(Product product)
    {
      try
      {
        await connection.OpenAsync();

        await using var command = new MySqlCommand("INSERT INTO products (Name) VALUES (@Name);", connection);
        command.Parameters.AddWithValue("@Name", product.Name);

        await command.ExecuteNonQueryAsync();
      }
      catch (MySqlException ex)
      {
        Console.WriteLine($"MySQL Error: {ex.Message}");
        throw;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"General Error: {ex.Message}");
        throw;
      }
    }
  }
}
