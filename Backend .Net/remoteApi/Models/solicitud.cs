namespace remoteApi.Models;

public class Solicitud
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Payload { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending";
    public DateTime createdAt { get; set; }
}