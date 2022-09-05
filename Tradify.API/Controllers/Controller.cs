using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Tradify.API.Contracts;
using Tradify.API.Dto;

namespace Tradify.API.Controllers
{
    [Route("api/jobs")]
    [ApiController]
    public class Controller : ControllerBase
    {
        private readonly IModel _jobModel;
        public Controller(IModel jobModel)
        {
            _jobModel = jobModel;
        }


        // Get all jobs for a particular user
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                Console.WriteLine(IdToken);
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);
                int userId = await _jobModel.GetUserId(userRecord.Email);
                IEnumerable<Job> jobs = await _jobModel.GetJobs(userId);
                return Ok(jobs);
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        }

        // Get a particular job using its ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);
                int userId = await _jobModel.GetUserId(userRecord.Email);
                Job job = await _jobModel.GetJob(userId, id);
                return Ok(job);
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Create a new job
        public async Task<IActionResult> Post([FromBody] Job Job)
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);

                // Override any user Id in the body
                int userId = await _jobModel.GetUserId(userRecord.Email);
                Job.UserId = userId;
                int id = _jobModel.CreateJob(Job);
                return Ok(id);                
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }



        // Make changes to a job
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Job Job)
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);

                // Override any user Id in the body
                int userId = await _jobModel.GetUserId(userRecord.Email);
                Job.UserId = userId;
                Job.Id = id;
                _jobModel.EditJob(Job);
                return Ok();
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete a job
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);

                int userId = await _jobModel.GetUserId(userRecord.Email);

                _jobModel.DeleteJob(id, userId);
                return Ok();
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Add a new note piece
        [HttpPost("{id}/notes")]
        public async Task<IActionResult> AddNotePiece(int id, [FromBody] Note note)
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);
                int userId = await _jobModel.GetUserId(userRecord.Email);
                Job job = await _jobModel.GetJob(userId, id);
                var jobExistForUser = await _jobModel.GetJob(userId, id);
                int executedNoteId = _jobModel.AddNotePiece(id, note.NotePiece);
                return Ok(executedNoteId);
            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // Delete a note piece
        [HttpPost("{id}/notes/delete")]
        public async Task<IActionResult> DeleteNotePiece(int id, [FromBody] Note note)
        {
            try
            {
                string IdToken = Request.Headers["Authorization"];
                UserRecord userRecord = await _jobModel.VerifyTokenAndReturnUserRecord(IdToken);
                int userId = await _jobModel.GetUserId(userRecord.Email);
                var jobExistForUser = await _jobModel.GetJob(userId, id);
                _jobModel.DeleteNotePiece(id, note.NotePiece);
                return Ok();

            }
            catch (KeyNotFoundException ex)
            {
                return StatusCode(404, ex.Message);
            }
            catch (FirebaseAuthException ex)
            {
                return StatusCode(401, ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
