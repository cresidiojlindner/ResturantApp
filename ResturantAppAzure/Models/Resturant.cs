using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace ResturantAppAzure.Models
{
    public class Resturant
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public double AverageRating { get; set; }
        public double RatingTotal { get; set; }
        public string Hours { get; set; }
        public int NumberOfTimesRated { get; set; }
    }
}
