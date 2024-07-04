using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Net.Filters
{
  public class AddRequiredHeaderParameter : IOperationFilter
  {
    public void Apply(OpenApiOperation operation, OperationFilterContext context)
    {
      if (operation.Parameters == null)
        operation.Parameters = new List<OpenApiParameter>();

      operation.Parameters.Add(new OpenApiParameter
      {
        Name = "x-db-type",
        In = ParameterLocation.Header,
        Required = true, // Set this to false if the header is not required
        Schema = new OpenApiSchema
        {
          Type = "string"
        },
        Description = "Specify the database type to use (mysql, sqlserver, mongodb, postgres)"
      });
    }
  }
}
