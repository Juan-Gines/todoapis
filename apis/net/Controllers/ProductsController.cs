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

      List<Product> data = [];
      List<ProductMongo> dataMongo = [];

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

      return Ok(dbType == "mongodb" ? dataMongo : data);
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] Product product)
    {
      var dbType = Request.Headers["x-db-type"].ToString();

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

      return Ok("Producto creado correctamente.");
    }
  }
}