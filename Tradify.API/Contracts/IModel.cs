using FirebaseAdmin.Auth;
using Tradify.API.Dto;

namespace Tradify.API.Contracts
{
    public interface IModel
    {
        public Task<UserRecord> VerifyTokenAndReturnUserRecord(string idToken);
        public Task<int> GetUserId(string Email);
        public Task<IEnumerable<Job>> GetJobs(int UserId);
        public Task<Job> GetJob(int UserId, int Id);
        public int CreateJob(Job Job);
        public void EditJob(Job Job);
        public void DeleteJob(int Id, int UserId);
        public int AddNotePiece(int JobId, string NotePiece);
        public void DeleteNotePiece(int Id, string NotePiece);
    }
}
