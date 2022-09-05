CREATE TABLE [User] (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    Email VARCHAR(50) NOT NULL
)

CREATE TABLE [Job] (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    UserId INT NOT NULL,
    TItle VARCHAR(100) NOT NULL,
    Client VARCHAR(100),
    Status VARCHAR(300) NOT NULL,
    Created SDATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY (UserId) REFERENCES [User](Id)
)

CREATE TABLE [Notes] (
    Id INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    JobId INT NOT NULL,
    Content VARCHAR(400) NOT NULL,
    FOREIGN KEY (JobId) REFERENCES [Job](Id)
)