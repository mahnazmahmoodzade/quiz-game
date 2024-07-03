using AustrianAssessment.Core;

namespace AustrianAssessment.Dtos;

public class GameSummaryDto
{
    public int Score { get; set; }
    public List<AnswersSummaryItemDto> Answers { get; set; }
}