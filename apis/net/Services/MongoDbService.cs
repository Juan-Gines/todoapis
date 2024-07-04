using MongoDB.Bson;
using MongoDB.Driver;
using Net.Models;

namespace Net.Services
{
  public class MongoDbService
  {
    private readonly IMongoCollection<BsonDocument> _collection;

    public MongoDbService()
    {
      var mongoConnectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION")
          ?? throw new InvalidOperationException("MONGODB_CONNECTION environment variable is not set.");
      var client = new MongoClient(mongoConnectionString);
      var database = client.GetDatabase("basket");
      _collection = database.GetCollection<BsonDocument>("products");
    }

    public async Task<List<ProductMongo>> GetDataAsync()
    {
      var documents = await _collection.Find(new BsonDocument()).ToListAsync();
      var productList = new List<ProductMongo>();

      foreach (var doc in documents)
      {
        var product = new ProductMongo
        {
          Id = doc.GetValue("_id").ToString(),
          Name = doc.GetValue("name").AsString,
          Onbasket = doc.GetValue("onbasket").ToBoolean()
        };
        productList.Add(product);
      }

      return productList;
    }

    public async Task CreateProductAsync(Product product)
    {
      var document = new BsonDocument
      {
        { "name", product.Name },
        { "onbasket", false }
      };

      await _collection.InsertOneAsync(document);
    }
  }
}