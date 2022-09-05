using Dapper;
using System.Data;
using Tradify.API.Contexts;
using Tradify.API.Dto;
using Tradify.API.Contracts;
using FirebaseAdmin.Auth;

namespace Tradify.API.Models
{
    public class Model : IModel
    {
        private readonly DapperContext _context;

        public Model(DapperContext context)
        {
            _context = context;
        }

        public async Task<UserRecord> VerifyTokenAndReturnUserRecord(string idToken)
        {
            FirebaseToken decodedToken = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(idToken);
            string uid = decodedToken.Uid;
            UserRecord userRecord = await FirebaseAuth.DefaultInstance.GetUserAsync(uid);
            return userRecord;

        }


        public async Task<int> GetUserId(string Email)
        {
            using (IDbConnection connection = _context.CreateConnection())
            {
                var query = String.Format("SELECT Id FROM [User] WHERE Email = '{0}';", Email);
                var id = await connection.QueryAsync<int>(query);
                if (id.Count() == 0) // User does not exist; create new account.
                {
                    query = String.Format("INSERT INTO [User] VALUES ('{0}'); SELECT SCOPE_IDENTITY();", Email);
                    return connection.QuerySingle<int>(query);
                } else
                {
                    return id.ToList()[0];
                }
                
            }
        }
        public async Task<IEnumerable<Job>> GetJobs(int UserId)
        {

            using (IDbConnection connection = _context.CreateConnection())
            {
                var query = String.Format("SELECT * FROM [Job] WHERE UserId = '{0}';", UserId);
                var jobs = await connection.QueryAsync<Job>(query);
                return jobs.ToList();
            }
        }

        public async Task<Job> GetJob(int UserId, int Id)
        {

            using (IDbConnection connection = _context.CreateConnection())
            {
                var query = String.Format("SELECT * FROM [Job] WHERE UserId = {0} AND Id = {1};", UserId, Id);
                var jobs = await connection.QueryAsync<Job>(query);
                if (jobs.Count() == 1)
                {
                    var job = jobs.ToList()[0];
                    query = String.Format("SELECT Content FROM Notes WHERE JobId = {0}", job.Id);
                    var notes = await connection.QueryAsync<string>(query);
                    job.Notes = notes.ToList();
                    return job;
                } else
                {
                    throw new KeyNotFoundException();
                }
                
            }
        }

        public int CreateJob(Job Job)
        {
            using (IDbConnection connection = _context.CreateConnection())
            {
                var query = @"INSERT INTO [Job] (UserId, Title, Client, Status) VALUES (@UserId, @Title, @Client, @Status); SELECT SCOPE_IDENTITY();";
                var executedJobId = connection.QuerySingle<int>(query, Job);

                foreach (string NotePiece in Job.Notes)
                {
                    query = String.Format("INSERT INTO [Notes] VALUES ({0}, '{1}');", executedJobId, NotePiece);
                    connection.Execute(query);
                }

                return executedJobId;
            }
        }

        public void EditJob(Job Job)
        {
            using (IDbConnection connection = _context.CreateConnection())
            {

                var query = @"
UPDATE [Job] 
SET Title = @Title, Client = @Client, Status = @Status 
WHERE Id = @Id";
                
                var executedJobId = connection.Execute(query, Job);
            }
        }

        public void DeleteJob(int Id, int UserId)
        {
            using (IDbConnection connection = _context.CreateConnection())
            {
                // Notes are also deleted on cascade
                var query = String.Format("DELETE FROM [Job] WHERE Id = {0} AND UserId = {1};", Id, UserId);
                connection.Execute(query);
            }
        }

        public int AddNotePiece(int JobId, string NotePiece)
        {
            using (IDbConnection connection = _context.CreateConnection())
            {

                var query = String.Format("INSERT INTO [Notes] (JobId, Content) VALUES ({0}, '{1}'); SELECT SCOPE_IDENTITY();", JobId, NotePiece);
                var noteId = connection.QuerySingle<int>(query);
                return noteId;
            }
        }

        public void DeleteNotePiece(int Id, string NotePiece)
        {
            using (IDbConnection connection = _context.CreateConnection())
            {

                var query = String.Format("DELETE TOP(1) FROM [Notes] WHERE JobId = {0} AND Content = '{1}'", Id, NotePiece);
                connection.Execute(query);
            }
        }
    }
}
