using Microsoft.Data.SqlClient;
using Net.Models;
using System.Data;

namespace Net.Services
{
  public class SqlServerService
  {

    private readonly string _connectionString;

    public SqlServerService()
    {
      _connectionString = Environment.GetEnvironmentVariable("SQLSERVER_CONNECTION")
          ?? throw new InvalidOperationException("SQLSERVER_CONNECTION environment variable is not set.");
    }

    public async Task<List<Product>> GetDataAsync()
    {
      var resultList = new List<Product>();

      try
      {
        await using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new SqlCommand("SELECT Id, Name, OnBasket FROM products;", connection);
        await using var reader = await command.ExecuteReaderAsync();

        while (await reader.ReadAsync())
        {
          var product = new Product
          {
            Id = reader.GetInt64("Id"),
            Name = reader.GetString("Name"),
            Onbasket = reader.GetBoolean("Onbasket")
          };
          resultList.Add(product);
        }
      }
      catch (SqlException ex)
      {
        Console.WriteLine($"SQL Server Error: {ex.Message}");
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
        await using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new SqlCommand("INSERT INTO products (Name) VALUES (@Name);", connection);
        command.Parameters.Add("@Name", SqlDbType.VarChar).Value = product.Name;

        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
      }
      catch (SqlException ex)
      {
        Console.WriteLine($"SQL Server Error: {ex.Message}");
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
        await using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new SqlCommand("UPDATE products SET Name = @Name WHERE Id = @Id;", connection);
        command.Parameters.Add("@Name", SqlDbType.VarChar).Value = product.Name;
        command.Parameters.Add("@Id", SqlDbType.BigInt).Value = product.Id;

        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
      }
      catch (SqlException ex)
      {
        Console.WriteLine($"SQL Server Error: {ex.Message}");
        throw;
      }
      catch (Exception ex)
      {
        Console.WriteLine($"General Error: {ex.Message}");
        throw;
      }
    }

    public async Task DeleteProductAsync(long id)
    {
      try
      {
        await using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();

        await using var command = new SqlCommand("DELETE FROM products WHERE Id = @Id;", connection);
        command.Parameters.Add("@Id", SqlDbType.BigInt).Value = id;

        await command.ExecuteNonQueryAsync();
        await GetDataAsync();
      }
      catch (SqlException ex)
      {
        Console.WriteLine($"SQL Server Error: {ex.Message}");
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
