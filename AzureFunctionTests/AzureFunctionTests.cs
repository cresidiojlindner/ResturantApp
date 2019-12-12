using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;
using Microsoft.Extensions.Primitives;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ResturantAppAzure.Models;
using ResturantAppAzure.Interfaces;
using Xunit;
using System.Collections.Generic;
using System.Linq;

namespace AzureFunctionTests
{
    [TestClass]
    public class AzureFunctionTests
    {
        private readonly ILogger logger = NullLoggerFactory.Instance.CreateLogger("Test");

        private DefaultHttpRequest GenerateHttpRequest()
        {
            var request = new DefaultHttpRequest(new DefaultHttpContext());
            var parms = new System.Collections.Generic.Dictionary<string, StringValues>()
            {
                { "Name", "Billy BBQ" },
                { "Id", "1" },
                { "City", "Northfork"},
                { "State", "MD"},
                { "ZipCode", "34763"},
                { "Addres1", "Rural Rd N"},
                { "Address2", ""},
                { "Rating", "4"},
                { "AverageRating", "3" },
                { "RatingTotal" ,"10" },
                { "NumberOfTimesRated", "NumberOfTimesRated" },
                { "Hours", "9 - 5" }                
            };
            request.Query = new QueryCollection(parms);
            return request;
        }

        [Theory]
        public void GetAllResturantsReturnsData()
        {
            var request = GenerateHttpRequest();
            var response = ResturantAppAzure.GetAllResturants.Run(request, logger);
            var result = response.Result;

            Assert.IsInstanceOfType(result, typeof(IEnumerable< Resturant>));

            Assert.IsTrue(result.Any());
        }
    }
}
