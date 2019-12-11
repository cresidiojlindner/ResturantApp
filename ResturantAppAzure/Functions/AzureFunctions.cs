using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ResturantAppAzure.Interfaces;
using ResturantAppAzure.Models;
using ResturantAppAzure.Services;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs.Host;

namespace ResturantAppAzure
{
    public static class GetAllResturants
    {
        [FunctionName("GetAllResturants")]
        public static async Task<IEnumerable<Resturant>> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function to get all resturants");

            IDbRepository<Resturant> Respository = new DbRepository<Resturant>();
            return await Respository.GetItemsAsync("Resturant");
        }
    }

    public static class GetResturant
    {
        [FunctionName("GetResturant")]
        public static async Task<Resturant> Run([HttpTrigger(AuthorizationLevel.Function, "get", Route = "Get/{id}/{zipCode}")]HttpRequest req, ILogger log, string id, string zipCode)
        {
            log.LogInformation($"C# HTTP trigger function to get resturant {id}-{zipCode}");

            IDbRepository<Resturant> Respository = new DbRepository<Resturant>();
            var resturants = await Respository.GetItemsAsync(d => d.Id == id && d.ZipCode == zipCode, "Resturant");

            return resturants
                .SingleOrDefault();
        }
    }

    public static class CreateOrUpdateResturant
    {
        [FunctionName("CreateOrUpdateResturant")]
        public static async Task<bool> Run([HttpTrigger(AuthorizationLevel.Function, "post", "put", Route = "CreateOrUpdateResturant")]HttpRequest req, ILogger log)
        {
            log.LogInformation($"C# HTTP trigger function to create or update a resturant");

            IDbRepository<Resturant> Respository = new DbRepository<Resturant>();
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var resturant = JsonConvert.DeserializeObject<Resturant>(requestBody);
                if (req.Method == "POST")
                {
                    resturant.Id = null;
                    resturant.NumberOfTimesRated = 1;
                    resturant.RatingTotal = resturant.Rating;
                    resturant.AverageRating = resturant.Rating;
                    await Respository.CreateItemAsync(resturant, "Resturant");
                }
                else
                {
                    resturant.NumberOfTimesRated++;
                    resturant.RatingTotal = resturant.RatingTotal + resturant.Rating;                    
                    resturant.AverageRating = resturant.RatingTotal / resturant.NumberOfTimesRated;
                    await Respository.UpdateItemAsync(resturant.Id, resturant, "Resturant");
                }
                return true;
            }
            catch (Exception ex)
            {
                log.LogError(ex, "Error occured: ");
                return false;
            }
        }

        public static class Delete
        {
            [FunctionName("Delete")]
            public static async Task<bool> Run([HttpTrigger(AuthorizationLevel.Function, "delete", Route = "Delete/{id}/{zipCode}")]HttpRequest req, ILogger log, string id, string zipCode)
            {
                log.LogInformation("C# HTTP trigger function to delete a resturant");

                IDbRepository<Resturant> Respository = new DbRepository<Resturant>();
                try
                {
                    await Respository.DeleteItemAsync(id, "Resturant", zipCode);
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }
        
    }
}
