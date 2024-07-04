using System.Data;
using Npgsql;
using Net.Models;

namespace Net.Services
{
  public class PostgresService
  {
    private readonly string _connectionString;

    public PostgresService()
    {
      _connectionString = Environment.GetEnvironmentVariable("POSTGRES_CONNECTION")
          ?? throw new InvalidOperationException("POSTGRES_CONNECTION environment variable is not set.");
    }

    public async Task<List<Product>> GetDataAsync()
    {
      var resultList = new List<Product>();

      try
      {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand("SELECT Id, Name, OnBasket FROM products;", connection);
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
      catch (PostgresException ex)
      {
        Console.WriteLine($"PostgreSQL Error: {ex.Message}");
        throw;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"General Error: {ex.Message}");
        throw;
      }

      return resultList;
    }
  }
}