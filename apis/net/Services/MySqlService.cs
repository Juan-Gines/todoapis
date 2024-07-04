using System.Data;
using MySql.Data.MySqlClient;
using Net.Models;

namespace Net.Services
{
  public class MySqlService
  {
    private readonly string _connectionString;

    public MySqlService()
    {
      _connectionString = Environment.GetEnvironmentVariable("MYSQL_CONNECTION")
          ?? throw new InvalidOperationException("MYSQL_CONNECTION environment variable is not set.");
    }

    public async Task<List<Product>> GetDataAsync()
    {
      var resultList = new List<Product>();

      try
      {
        await using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new MySqlCommand("SELECT * FROM products;", connection);
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
        await using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new MySqlCommand("INSERT INTO products (Name) VALUES (@Name);", connection);
        command.Parameters.AddWithValue("@Name", product.Name);

        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
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

    public async Task UpdateProductAsync(Product product)
    {
      try
      {
        await using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        await using var command = new MySqlCommand("UPDATE Products SET Name = @Name,  WHERE Id = @Id", connection);
        command.Parameters.AddWithValue("@Id", product.Id);
        command.Parameters.AddWithValue("@Name", product.Name);

        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
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

    public async Task DeleteProductAsync(int id)
    {
      try
      {
        await using var connection = new MySqlConnection(_connectionString);
        await connection.OpenAsync();
        await using var command = new MySqlCommand("DELETE FROM Products WHERE Id = @Id", connection);
        command.Parameters.AddWithValue("@Id", id);

        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
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
