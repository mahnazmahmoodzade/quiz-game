using AustrianAssessment.Models;

namespace AustrianAssessment.Core;

public interface IGameRepository
{
    void AddSession(GameSession gameSession);
    void AddQuestionToSession(string sessionId, Question question);
    Question GetQuestion(string sessionId, string questionId);
    GameSession GetGame(string sessionId);
}

public class InMemoryGameRepository : IGameRepository
{
    private readonly Dictionary<string, GameSession> _sessions = new();

    public void AddSession(GameSession gameSession)
    {
        _sessions.Add(gameSession.Id, gameSession);
    }

    public void AddQuestionToSession(string sessionId, Question question)
    {
        if (!_sessions.ContainsKey(sessionId))
        {
            throw new InvalidOperationException("Session not found");
        }

        _sessions[sessionId].Questions.Add(question);
    }

    public Question GetQuestion(string sessionId, string questionId)
    {
        if (!_sessions.ContainsKey(sessionId))
        {
            throw new InvalidOperationException("Session not found");
        }

        var question = _sessions[sessionId].Questions.FirstOrDefault(q => q.Id == questionId);
        if (question == null)
        {
            throw new InvalidOperationException("Question not found");
        }

        return question;
    }

    public GameSession GetGame(string sessionId)
    {
        if (!_sessions.ContainsKey(sessionId))
        {
            throw new InvalidOperationException("Session not found");
        }

        return _sessions[sessionId];
    }
}