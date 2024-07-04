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
            Onbasket = reader.GetBoolean("Onbasket")
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

    public async Task CreateProductAsync(Product product)
    {
      try
      {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand("INSERT INTO products (Name) VALUES (@Name);", connection);
        command.Parameters.AddWithValue("@Name", product.Name);
        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
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

    }

    public async Task UpdateProductAsync(Product product)
    {
      try
      {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand("UPDATE products SET OnBasket = @OnBasket WHERE Id = @Id;", connection);
        command.Parameters.AddWithValue("@Id", product.Id);
        command.Parameters.AddWithValue("@OnBasket", product.Onbasket);
        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
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

    }

    public async Task DeleteProductAsync(int id)
    {
      try
      {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new NpgsqlCommand("DELETE FROM products WHERE Id = @Id;", connection);
        command.Parameters.AddWithValue("@Id", id);
        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
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

    }
  }
}