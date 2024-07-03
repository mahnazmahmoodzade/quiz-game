namespace AustrianAssessment.Core.Opentdb;

public class OpentdbQuestionResponse
{
    public int Response_Code { get; set; }
    public ICollection<OpentdbQuestionResponseItem> Results { get; set; } = new List<OpentdbQuestionResponseItem>();
}