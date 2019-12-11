using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Primitives;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Xunit;

namespace AzureFunctionTests
{
    [TestClass]
    public class AzureFunctionTests
    {
        private readonly ILogger logger = NullLoggerFactory.Instance.CreateLogger("Test");

        private DefaultHttpRequest GenerateHttpRequest(object Resturant)
        {
            var request = new DefaultHttpRequest(new DefaultHttpContext());
            var parms = new System.Collections.Generic.Dictionary<string, StringValues>() { { "", "" } };
            request.Query = new QueryCollection(parms);
            return request;
        }

        [Theory]
        public void GetAllResturantsReturnsData()
        {
            
        }
    }
}
