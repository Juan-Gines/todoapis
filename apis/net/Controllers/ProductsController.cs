using Microsoft.AspNetCore.Mvc;
using Net.Models;
using Net.Services;

namespace net.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly MySqlService _mySqlService;
    private readonly SqlServerService _sqlServerService;
    private readonly PostgresService _postgreSqlService;
    private readonly MongoDbService _mongoDbService;

    private List<Product> data = [];
    private List<ProductMongo> dataMongo = [];

    public ProductsController(MySqlService mySqlService, SqlServerService sqlServerService, PostgresService postgreSqlService, MongoDbService mongoDbService)

    {
      _mySqlService = mySqlService;
      _sqlServerService = sqlServerService;
      _postgreSqlService = postgreSqlService;
      _mongoDbService = mongoDbService;
    }

    [HttpGet]
    public async Task<IActionResult> GetData()
    {
      var dbType = Request.Headers["x-db-type"].ToString();

      try
      {
        switch (dbType.ToLower())
        {
          case "mysql":
            data = await _mySqlService.GetDataAsync();
            break;
          case "sqlserver":
            data = await _sqlServerService.GetDataAsync();
            break;
          case "postgres":
            data = await _postgreSqlService.GetDataAsync();
            break;
          case "mongodb":
            dataMongo = await _mongoDbService.GetDataAsync();
            break;
          default:
            return BadRequest("Unsupported database type.");
        }

      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

      return Ok(dbType == "mongodb" ? dataMongo : data);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
      var dbType = Request.Headers["x-db-type"].ToString();

      try
      {
        switch (dbType.ToLower())
        {
          case "mysql":
            await _mySqlService.CreateProductAsync(product);
            break;
          case "sqlserver":
            await _sqlServerService.CreateProductAsync(product);
            break;
          case "postgres":
            await _postgreSqlService.CreateProductAsync(product);
            break;
          case "mongodb":
            await _mongoDbService.CreateProductAsync(product);
            break;
          default:
            return BadRequest("Unsupported database type.");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

      return Ok(dbType == "mongodb" ? dataMongo : data);
    }

    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateProduct(string id, [FromBody] Product product)
    {
      var dbType = Request.Headers["x-db-type"].ToString();

      try
      {
        switch (dbType.ToLower())
        {
          case "mysql":
            await _mySqlService.UpdateProductAsync(product);
            break;
          case "sqlserver":
            await _sqlServerService.UpdateProductAsync(product);
            break;
          case "postgres":
            await _postgreSqlService.UpdateProductAsync(product);
            break;
          case "mongodb":
            await _mongoDbService.UpdateProductAsync(id, product);
            break;
          default:
            return BadRequest("Unsupported database type.");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

      return Ok(dbType == "mongodb" ? dataMongo : data);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(string id)
    {
      var dbType = Request.Headers["x-db-type"].ToString();

      try
      {
        switch (dbType.ToLower())
        {
          case "mysql":
            await _mySqlService.DeleteProductAsync(int.Parse(id));
            break;
          case "sqlserver":
            await _sqlServerService.DeleteProductAsync(long.Parse(id));
            break;
          case "postgres":
            await _postgreSqlService.DeleteProductAsync(int.Parse(id));
            break;
          case "mongodb":
            await _mongoDbService.DeleteProductAsync(id);
            break;
          default:
            return BadRequest("Unsupported database type.");
        }
      }
      catch (Exception ex)
      {
        return BadRequest(ex.Message);
      }

      return Ok(dbType == "mongodb" ? dataMongo : data);
    }
  }
}