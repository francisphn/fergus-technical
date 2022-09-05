namespace Tradify.API.Dto
{
    public class Job
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Client { get; set; } = "";
        public string Status { get; set; }
        public DateTime? Created { get; set; }
        public List<string> Notes { get; set; } = new List<string>();
    }
}
